const ENDPOINT = 'https://soap.e-boekhouden.nl/soap.asmx'
const NS = 'http://www.e-boekhouden.nl/soap'

// ── XML helpers ──────────────────────────────────────────────────────────────

function esc(s: string): string {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<(?:[^:>]+:)?${name}[^>]*>([\\s\\S]*?)<\\/(?:[^:>]+:)?${name}>`, 'i'))
  return m ? m[1].trim() : ''
}

async function soap(action: string, body: string): Promise<string> {
  const envelope = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>${body}</soap:Body></soap:Envelope>`
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': `"${NS}/${action}"`,
    },
    body: envelope,
  })
  if (!res.ok) throw new Error(`SOAP ${action}: HTTP ${res.status}`)
  return res.text()
}

function checkFout(xml: string, actie: string): void {
  const code = tag(xml, 'LastErrorCode')
  if (code && code !== '') throw new Error(`${actie}: ${tag(xml, 'LastErrorDescription')} (code ${code})`)
}

// ── Sessie ───────────────────────────────────────────────────────────────────

export async function openSession(): Promise<string> {
  const xml = await soap('OpenSession', `
    <OpenSession xmlns="${NS}">
      <Username>${esc(process.env.EBOEKHOUDEN_GEBRUIKERSNAAM ?? '')}</Username>
      <SecurityCode1>${esc(process.env.EBOEKHOUDEN_SECURITYCODE1 ?? '')}</SecurityCode1>
      <SecurityCode2>${esc(process.env.EBOEKHOUDEN_SECURITYCODE2 ?? '')}</SecurityCode2>
      <Source>BurchtTerCleeff</Source>
    </OpenSession>`)

  checkFout(xml, 'OpenSession')
  const token = tag(xml, 'SessionID')
  if (!token) throw new Error('Geen sessietoken ontvangen van e-boekhouden')
  return token
}

export async function closeSession(token: string): Promise<void> {
  await soap('CloseSession', `
    <CloseSession xmlns="${NS}">
      <SessionID>${esc(token)}</SessionID>
    </CloseSession>`)
}

function creds(token: string): string {
  return `<SessionID>${esc(token)}</SessionID><SecurityCode2>${esc(process.env.EBOEKHOUDEN_SECURITYCODE2 ?? '')}</SecurityCode2>`
}

// ── Relaties ─────────────────────────────────────────────────────────────────

export type Relatie = {
  code: string      // lidnummer
  naam: string
  email: string
  adres: string
  postcode: string
  plaats: string
  telefoon: string
}

function relatieBody(r: Relatie): string {
  return `
    <ID>0</ID>
    <AddDatum>2000-01-01T00:00:00</AddDatum>
    <Code>${esc(r.code)}</Code>
    <Bedrijf>${esc(r.naam)}</Bedrijf>
    <Contactpersoon></Contactpersoon>
    <Email>${esc(r.email)}</Email>
    <Adres>${esc(r.adres)}</Adres>
    <Postcode>${esc(r.postcode)}</Postcode>
    <Plaats>${esc(r.plaats)}</Plaats>
    <Telefoon>${esc(r.telefoon)}</Telefoon>
    <BP>B</BP>
    <Land>NL</Land>`
}

/** Geeft true terug als de relatie (debiteur) al bestaat in e-boekhouden. */
export async function relatieBestaatAl(token: string, code: string): Promise<boolean> {
  const xml = await soap('GetRelaties', `
    <GetRelaties xmlns="${NS}">
      ${creds(token)}
      <cFilter>
        <Trefwoord></Trefwoord>
        <Code>${esc(code)}</Code>
        <ID>0</ID>
      </cFilter>
    </GetRelaties>`)

  const fout = tag(xml, 'LastErrorCode')
  if (fout && fout !== '') return false
  return xml.includes('<Code>') && xml.includes(code)
}

export async function addRelatie(token: string, r: Relatie): Promise<void> {
  const xml = await soap('AddRelatie', `
    <AddRelatie xmlns="${NS}">
      ${creds(token)}
      <oRel>${relatieBody(r)}</oRel>
    </AddRelatie>`)
  checkFout(xml, 'AddRelatie')
}

export async function updateRelatie(token: string, r: Relatie): Promise<void> {
  const xml = await soap('UpdateRelatie', `
    <UpdateRelatie xmlns="${NS}">
      ${creds(token)}
      <oRel>${relatieBody(r)}</oRel>
    </UpdateRelatie>`)
  checkFout(xml, 'UpdateRelatie')
}

/** Upsert: voeg toe of update bestaande relatie. Sessie moet al open zijn. */
export async function upsertRelatie(token: string, r: Relatie): Promise<void> {
  const bestaat = await relatieBestaatAl(token, r.code)
  if (bestaat) {
    await updateRelatie(token, r)
  } else {
    await addRelatie(token, r)
  }
}
