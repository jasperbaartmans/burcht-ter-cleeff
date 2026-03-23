const ENDPOINT = 'https://soap.e-boekhouden.nl/boekhouden.asmx'
const NS = 'http://www.e-boekhouden.nl/boekhouden'

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
  const code = tag(xml, 'Foutcode')
  if (code && code !== '0') throw new Error(`${actie}: ${tag(xml, 'Omschrijving')} (code ${code})`)
}

// ── Sessie ───────────────────────────────────────────────────────────────────

export async function openSession(): Promise<string> {
  const xml = await soap('OpenSession', `
    <OpenSession xmlns="${NS}">
      <oLoginData>
        <Gebruikersnaam>${esc(process.env.EBOEKHOUDEN_GEBRUIKERSNAAM ?? '')}</Gebruikersnaam>
        <Beveiligingscode1>${esc(process.env.EBOEKHOUDEN_SECURITYCODE1 ?? '')}</Beveiligingscode1>
        <Beveiligingscode2>${esc(process.env.EBOEKHOUDEN_SECURITYCODE2 ?? '')}</Beveiligingscode2>
        <AppName>BurchtTerCleeff</AppName>
      </oLoginData>
    </OpenSession>`)

  checkFout(xml, 'OpenSession')
  const token = tag(xml, 'Sessietoken')
  if (!token) throw new Error('Geen sessietoken ontvangen van e-boekhouden')
  return token
}

export async function closeSession(token: string): Promise<void> {
  await soap('CloseSession', `
    <CloseSession xmlns="${NS}">
      <Sessietoken>${esc(token)}</Sessietoken>
    </CloseSession>`)
}

function creds(token: string): string {
  return `<oCredentials><Sessietoken>${esc(token)}</Sessietoken><SecurityCode2>${esc(process.env.EBOEKHOUDEN_SECURITYCODE2 ?? '')}</SecurityCode2></oCredentials>`
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
    <Rel_Code>${esc(r.code)}</Rel_Code>
    <Rel_Bedrijf>${esc(r.naam)}</Rel_Bedrijf>
    <Rel_Contactpersoon></Rel_Contactpersoon>
    <Rel_Email>${esc(r.email)}</Rel_Email>
    <Rel_Adres>${esc(r.adres)}</Rel_Adres>
    <Rel_Postcode>${esc(r.postcode)}</Rel_Postcode>
    <Rel_Plaats>${esc(r.plaats)}</Rel_Plaats>
    <Rel_Telefoon>${esc(r.telefoon)}</Rel_Telefoon>
    <Rel_Bp>D</Rel_Bp>
    <Rel_Land>NL</Rel_Land>`
}

/** Geeft true terug als de relatie (debiteur) al bestaat in e-boekhouden. */
export async function relatieBestaatAl(token: string, code: string): Promise<boolean> {
  const xml = await soap('GetRelaties', `
    <GetRelaties xmlns="${NS}">
      ${creds(token)}
      <oFilter>
        <Trefwoord></Trefwoord>
        <Code>${esc(code)}</Code>
        <Bp>D</Bp>
      </oFilter>
    </GetRelaties>`)

  const fout = tag(xml, 'Foutcode')
  if (fout && fout !== '0') return false
  return xml.includes('<Rel_ID>')
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
