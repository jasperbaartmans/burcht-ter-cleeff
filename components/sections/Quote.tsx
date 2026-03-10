function IconStar() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="inline-block align-middle mx-1 shrink-0"
    >
      <circle cx="14" cy="14" r="14" fill="#789928" />
      <path
        d="M14 7l1.8 5.5H22l-4.9 3.6 1.9 5.8L14 18.4l-5 3.5 1.9-5.8L6 12.5h6.2L14 7z"
        fill="white"
      />
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="inline-block align-middle mx-1 shrink-0"
    >
      <circle cx="14" cy="14" r="14" fill="#789928" />
      <path
        d="M9 20c1-4 4-9 11-11-2 4-4 7-6 8.5C12 19 10.5 19.5 9 20z"
        fill="white"
      />
      <path d="M9 20c1-6 8-12 11-11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconCastle() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="inline-block align-middle mx-1 shrink-0"
    >
      <circle cx="14" cy="14" r="14" fill="#789928" />
      <rect x="7" y="15" width="14" height="8" fill="white" />
      <rect x="7" y="12" width="3" height="4" fill="white" />
      <rect x="11" y="12" width="3" height="4" fill="white" />
      <rect x="15" y="12" width="3" height="4" fill="white" />
      <rect x="19" y="12" width="3" height="4" fill="white" />
      <rect x="12" y="18" width="4" height="5" fill="#789928" />
    </svg>
  )
}

export default function Quote() {
  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-12 border-t border-grey">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Links: grote H2-tekst met groene iconen inline */}
        <div>
          <h2 className="text-h2 font-walsheim text-black leading-tight">
            Kinderen spelen{' '}
            <IconStar />
            {' '}beter buiten, vrijer{' '}
            <IconLeaf />
            {' '}in de natuur, avontuurlijker{' '}
            <IconCastle />
            {' '}op het kasteel.
          </h2>
        </div>

        {/* Rechts: body tekst */}
        <div className="flex flex-col gap-4 md:pt-2">
          <p className="text-body1 font-walsheim text-black/80">
            Bij Burcht ter Cleeff geloven we dat spelen meer is dan vermaak. Het is de manier
            waarop kinderen de wereld ontdekken, vriendschappen sluiten en zichzelf uitdagen.
          </p>
          <p className="text-body2 font-walsheim text-black/60">
            Onze speeltuin biedt een unieke combinatie van historische omgeving en creatieve
            speelruimte. Laat uw kind rennen, klimmen, dromen — terwijl u geniet van de rust
            van ons prachtige kasteelterrein.
          </p>
        </div>
      </div>
    </section>
  )
}
