# Design System — Burcht ter Cleeff

Gebaseerd op Figma: [Burcht ter Cleeff Shared](https://www.figma.com/design/5ziT6D1Fye8GofmWlP6KKV/Burcht-ter-Cleeff--Shared-)

---

## Kleurenpalet

| Token     | Hex       | Tailwind       | Gebruik                        |
|-----------|-----------|----------------|--------------------------------|
| Black     | `#262628` | `text-black`   | Body tekst, koppen             |
| White     | `#FFFFFF` | `text-white`   | Tekst op donkere achtergronden |
| Ivory     | `#F3EEE2` | `bg-ivory`     | Pagina achtergrond             |
| Grey      | `#E0E1DA` | `bg-grey`      | Subtiele achtergronden         |
| Forest    | `#789928` | `bg-forest`    | Primary CTA, actief, open      |
| Moss      | `#8D9462` | `bg-moss`      | Secundaire groentint           |
| Sienna    | `#853F21` | `bg-sienna`    | Destructief, verhuurd, mobiel menu |
| Caramel   | `#B07826` | `bg-caramel`   | Waarschuwing, verhuurd         |

---

## Typografie

| Token  | Size  | Weight | Line-height | Letter-spacing | Gebruik       |
|--------|-------|--------|-------------|----------------|---------------|
| H1     | 72px  | 400    | 70px        | -2.16px        | Hero heading  |
| H2     | 56px  | 400    | 60px        | -1.68px        | Sectie koppen |
| H3     | 40px  | 500    | 44px        | -0.8px         | Sub-koppen    |
| H4     | 29px  | 500    | 30px        | -0.29px        | Card koppen   |
| Sub1   | 20px  | 500    | 20px        | -0.2px         | —             |
| Sub2   | 18px  | 500    | 20px        | -0.18px        | —             |
| Sub3   | 16px  | 500    | 20px        | -0.16px        | —             |
| Body1  | 20px  | 400    | 26px        | -0.6px         | Grote body    |
| Body2  | 17px  | 400    | 23px        | -0.51px        | Standaard body|
| Body3  | 14px  | 500    | 20px        | -0.14px        | Labels, badges|

Font: **GT Walsheim Pro** (`font-walsheim`)

---

## Componenten

### Navbar

| Element          | Default                              | Hover                                      | Active                          |
|------------------|--------------------------------------|--------------------------------------------|---------------------------------|
| Nav link         | `text-white/70`                      | `text-white`                               | `text-white` + `border-b-4 border-white` |
| Inloggen cirkel  | `border border-white/40` (outline)   | `bg-forest border-forest` (filled groen)   | —                               |
| Inloggen tekst   | `text-white/70`                      | `text-white`                               | —                               |

### Buttons

| Variant          | Default                              | Hover                          | Kleur tokens           |
|------------------|--------------------------------------|--------------------------------|------------------------|
| `primary`        | `bg-forest text-white rounded-full`  | `bg-forest/80`                 | Forest + White         |
| `ghost`          | `border border-forest text-forest`   | `bg-forest text-white`         | Forest                 |
| `arrow`          | `bg-forest text-white rounded-full`  | `scale-105`                    | Forest + White         |
| `text-arrow`     | `text-forest` + `→`                  | `text-forest/80` + pijl beweegt| Forest                 |
| `caramel`        | `bg-caramel text-white rounded-full` | `bg-caramel/80`                | Caramel + White        |
| `sienna`         | `bg-sienna text-white rounded-full`  | `bg-sienna/80`                 | Sienna + White         |
| arrow-outline    | `border border-white` (op donker bg) | `bg-forest border-forest`      | White → Forest (hover) |

> **arrow-outline** wordt gebruikt in de hero ("Koop een kaartje") en Inloggen — witte cirkel outline op transparante navbar, vult met forest groen bij hover.

### StatusBadge

| Variant  | Status    | Achtergrond | Tekst  | Border      |
|----------|-----------|-------------|--------|-------------|
| filled   | open      | Forest      | White  | —           |
| filled   | gesloten  | Sienna      | White  | —           |
| filled   | verhuurd  | Caramel     | White  | —           |
| outline  | open      | —           | Forest | Forest      |
| outline  | gesloten  | —           | Sienna | Sienna      |
| outline  | verhuurd  | —           | Caramel| Caramel     |

Padding: `py-[10px] pl-4 pr-[26px]` · Border-radius: 40px · Gap: 6px · Font: Body3

---

## Iconografie

| Naam             | Afmetingen | Gebruik                         |
|------------------|------------|---------------------------------|
| logo/icon        | 33.9 × 40  | Navbar, footer                  |
| Icons/Arrow Right| 24 × 24    | Buttons, Inloggen, Koop kaartje |
| Icons/Close      | 32 × 32    | Mobiel menu sluiten             |
| circle           | 32 × 32    | Inloggen button achtergrond     |

---

## Mobiel menu

- Achtergrond: **Sienna** (`#853F21`)
- Top bar: logo links, ✕ sluiten rechts
- Nav links: `text-h3 text-white/60` → hover `text-white`
- Acties: **Caramel** cirkel + pijl + witte tekst
