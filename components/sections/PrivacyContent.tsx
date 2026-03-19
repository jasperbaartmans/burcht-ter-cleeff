export default function PrivacyContent() {
  return (
    <div>

      {/* Intro */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-10 border-t border-grey">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-8">
            <p className="text-[32px] leading-[38px] tracking-[-0.03em] md:text-h2 font-dm-sans text-black">
              Hier vind je de privacyverklaring van{' '}
              <span className="text-forest">Burcht ter Cleeff</span>.
            </p>
          </div>
          <div className="col-span-12 md:col-start-7 md:col-span-6 flex flex-col gap-4 mt-8 md:mt-12">
            <p className="text-body1 font-dm-sans text-black">
              In deze verklaring lees je hoe jouw persoonsgegevens worden verzameld en
              verwerkt: waar ze worden opgeslagen, voor welke doelen, en welke rechten
              jij hebt. De verklaring wordt periodiek bijgewerkt, bijvoorbeeld bij
              wetswijzigingen.
            </p>
            <p className="text-body2 font-dm-sans text-black/60">
              Vragen? Neem gerust contact op via{' '}
              <a
                href="mailto:penningmeester@burchttercleeff.nl"
                className="underline hover:text-black transition-colors"
              >
                penningmeester@burchttercleeff.nl
              </a>
              . Laatste update: maart 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="bg-ivory py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1360px] mx-auto divide-y divide-grey">

          {/* 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 py-10 md:py-14">
            <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
              <span className="text-body3 font-dm-sans text-forest">01</span>
              <h2 className="text-sub1 font-dm-sans text-black mt-1">Gegevens die we verzamelen</h2>
            </div>
            <div className="col-span-12 md:col-start-4 md:col-span-7 flex flex-col gap-8">

              <div>
                <h3 className="text-sub2 font-dm-sans text-black mb-2">1.1 — Nieuwsbrief</h3>
                <p className="text-body2 font-dm-sans text-black">
                  Burcht ter Cleeff stuurt via e-mail nieuwsbrieven — zowel informatief als
                  met actueel nieuws over de speeltuin. Je voornaam, achternaam en
                  e-mailadres worden verzameld via het aanmeldformulier op de website.
                  Aanmelding kan ook mondeling of schriftelijk.
                </p>
              </div>

              <div>
                <h3 className="text-sub2 font-dm-sans text-black mb-2">1.2 — Lidmaatschap & contact</h3>
                <p className="text-body2 font-dm-sans text-black">
                  Als je je aanmeldt als lid van de speeltuin, worden je naam,
                  e-mailadres, adres en eventueel IBAN-bankrekeningnummer verzameld.
                  Dit kan via de website of via een schriftelijk formulier bij de
                  beheerder. Wanneer je contact opneemt via e-mail, worden de gegevens
                  die je meestuurt (zoals naam en e-mailadres) opgeslagen op onze
                  mailserver.
                </p>
              </div>

            </div>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 py-10 md:py-14">
            <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
              <span className="text-body3 font-dm-sans text-forest">02</span>
              <h2 className="text-sub1 font-dm-sans text-black mt-1">Doel & bewaartermijn</h2>
            </div>
            <div className="col-span-12 md:col-start-4 md:col-span-7 flex flex-col gap-4">
              <p className="text-body2 font-dm-sans text-black">
                De website van Burcht ter Cleeff verzamelt geen trackingcookies of
                analysecookies om websitebezoek te meten.
              </p>
              <p className="text-body2 font-dm-sans text-black">
                Gegevens die je opgeeft bij aanmelding worden bewaard zolang dat
                nodig is voor de uitvoering van de activiteiten — en nooit langer
                dan wettelijk vereist. Je naam, e-mailadres, adres en eventueel
                IBAN worden opgeslagen in E-Boekhouden zolang je actief lid bent.
                Bij opzegging worden je gegevens verwijderd.
              </p>
              <p className="text-body2 font-dm-sans text-black">
                Je e-mailadres en naam worden ook opgeslagen in ons
                nieuwsbriefsysteem (Laposta) voor onbepaalde tijd. Je kunt je te
                allen tijde uitschrijven via de link onderaan elke nieuwsbrief, of
                door een e-mail te sturen naar{' '}
                <a
                  href="mailto:penningmeester@burchttercleeff.nl"
                  className="underline hover:text-black/80 transition-colors"
                >
                  penningmeester@burchttercleeff.nl
                </a>
                . E-mailberichten via onze mailserver worden maximaal twee jaar
                bewaard.
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 py-10 md:py-14">
            <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
              <span className="text-body3 font-dm-sans text-forest">03</span>
              <h2 className="text-sub1 font-dm-sans text-black mt-1">Jouw rechten</h2>
            </div>
            <div className="col-span-12 md:col-start-4 md:col-span-7 flex flex-col gap-6">
              <p className="text-body2 font-dm-sans text-black">
                Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je de
                volgende rechten. Je kunt gebruik maken van al deze rechten via{' '}
                <a
                  href="mailto:penningmeester@burchttercleeff.nl"
                  className="underline hover:text-black/80 transition-colors"
                >
                  penningmeester@burchttercleeff.nl
                </a>
                , onder toevoeging van een kopie van je ID-bewijs waarbij pasfoto,
                documentnummer en BSN onleesbaar zijn gemaakt. We streven ernaar binnen
                één week te reageren.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Recht op inzage', body: 'Je mag altijd opvragen welke gegevens wij over jou bewaren.' },
                  { title: 'Recht op rectificatie', body: 'Zijn je gegevens onjuist of veranderd? Laat het ons weten, wij passen ze aan.' },
                  { title: 'Recht op overdracht', body: 'Je kunt je gegevens opvragen in een overdraagbaar formaat, bijvoorbeeld bij overstap naar een andere dienst.' },
                  { title: 'Recht op wissen', body: 'Je kunt vragen je gegevens volledig te laten verwijderen uit onze systemen.' },
                  { title: 'Recht op bezwaar', body: 'Wil je niet dat wij je gegevens gebruiken? Dan kun je hier bezwaar tegen maken.' },
                  { title: 'Recht op klacht', body: <>Vind je dat wij niet correct omgaan met jouw gegevens? Je kunt een klacht indienen bij de{' '}<a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/80 transition-colors">Autoriteit Persoonsgegevens</a>.</> },
                ].map(({ title, body }) => (
                  <div key={title} className="bg-white rounded-2xl p-5 flex flex-col gap-1">
                    <p className="text-body3 font-dm-sans text-forest">{title}</p>
                    <p className="text-body2 font-dm-sans text-black">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 py-10 md:py-14">
            <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
              <span className="text-body3 font-dm-sans text-forest">04</span>
              <h2 className="text-sub1 font-dm-sans text-black mt-1">Beveiliging</h2>
            </div>
            <div className="col-span-12 md:col-start-4 md:col-span-7 flex flex-col gap-4">
              <p className="text-body2 font-dm-sans text-black">
                Van jouw persoonsgegevens worden geen fysieke kopieën gemaakt. Gegevens
                worden uitsluitend beheerd in de eerder genoemde systemen, die allen
                met een wachtwoord zijn beveiligd. Het aantal apparaten met toegang
                tot jouw gegevens wordt beperkt tot het strikt noodzakelijke.
              </p>
              <p className="text-body2 font-dm-sans text-black">
                De website is beveiligd met een SSL-certificaat: jouw verbinding is
                versleuteld en herkenbaar aan het slotje in de adresbalk van je browser.
              </p>
              <p className="text-body2 font-dm-sans text-black">
                Burcht ter Cleeff verwerkt persoonsgegevens op grond van een
                gerechtvaardigd belang — voor het aanbieden van diensten en
                activiteiten via e-mail. De gevraagde gegevens zijn altijd de minimale
                benodigde gegevens. Zo is je e-mailadres noodzakelijk voor het
                verzenden van de nieuwsbrief. Burcht ter Cleeff behoudt zich het recht
                voor gegevens te delen wanneer dit wettelijk verplicht is of ter
                bescherming van de rechten of veiligheid van de organisatie, met
                inachtneming van jouw privacybelangen.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
