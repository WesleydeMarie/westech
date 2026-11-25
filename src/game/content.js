// Inhoud van "Tenant Admin" — het Purview-beheerdersspel. Tweetalig (nl/en).
// Opdrachttypes:
//   choice : één juist antwoord
//   multi  : bouw een policy, kies alle juiste blokken
//   order  : zet de stappen in de juiste volgorde
// effects: invloed op de meters { sec: beveiliging, usr: gebruikers, cmp: compliance }.
// link: slug van een gepubliceerde blogpost op techwes.nl (alleen tonen als die bestaat).

export const COMPANY = 'Nordwind BV';

export const UI = {
  nl: {
    title: 'Tenant Admin',
    subtitle: 'Het Purview-spel voor beheerders',
    intro: `Je bent de nieuwe Purview-beheerder bij ${'Nordwind BV'} (800 medewerkers). Tickets stromen binnen van de CISO, HR, Legal en de helpdesk. Elke keuze heeft gevolgen. Houd beveiliging, gebruikers en compliance in balans.`,
    start: 'Start',
    locked: 'Op slot: haal eerst het vorige level',
    meters: { sec: 'Beveiliging', usr: 'Gebruikers', cmp: 'Compliance' },
    from: 'Van',
    submit: 'Controleer',
    next: 'Volgende',
    finish: 'Bekijk resultaat',
    correct: 'Goed!',
    wrong: 'Niet helemaal',
    partly: 'Bijna',
    readMore: 'Lees meer op de blog',
    tapOrder: 'Tik de stappen aan in de juiste volgorde',
    reset: 'Opnieuw',
    pickAll: 'Kies alle blokken die in de policy horen',
    task: 'Opdracht',
    of: 'van',
    score: 'Score',
    passed: 'Level gehaald!',
    failed: 'Nog niet gehaald',
    needed: 'Nodig om door te gaan: 70% goed',
    badge: 'Je badge',
    again: 'Speel opnieuw',
    levels: 'Naar de levels',
    nextLevel: 'Volgend level',
    share: 'Deel op LinkedIn',
    shareText: (b) => `Ik heb het level "${b}" gehaald in Tenant Admin, het Purview-spel van Techwes.`,
    minutes: '± 5 minuten',
    soon: 'Binnenkort: Defender, Entra en Conditional Access',
    disclaimer: 'Fictief bedrijf. Vereenvoudigde scenario\'s: controleer altijd de actuele Microsoft-documentatie voordat je iets in productie zet.',
    lang: 'English',
  },
  en: {
    title: 'Tenant Admin',
    subtitle: 'The Purview game for administrators',
    intro: `You are the new Purview administrator at ${'Nordwind BV'} (800 employees). Tickets keep coming in from the CISO, HR, Legal and the helpdesk. Every choice has consequences. Keep security, users and compliance in balance.`,
    start: 'Start',
    locked: 'Locked: pass the previous level first',
    meters: { sec: 'Security', usr: 'Users', cmp: 'Compliance' },
    from: 'From',
    submit: 'Check',
    next: 'Next',
    finish: 'See result',
    correct: 'Correct!',
    wrong: 'Not quite',
    partly: 'Almost',
    readMore: 'Read more on the blog (Dutch)',
    tapOrder: 'Tap the steps in the right order',
    reset: 'Reset',
    pickAll: 'Pick every block that belongs in the policy',
    task: 'Task',
    of: 'of',
    score: 'Score',
    passed: 'Level passed!',
    failed: 'Not passed yet',
    needed: 'To continue: 70% correct',
    badge: 'Your badge',
    again: 'Play again',
    levels: 'Back to levels',
    nextLevel: 'Next level',
    share: 'Share on LinkedIn',
    shareText: (b) => `I passed "${b}" in Tenant Admin, the Purview game by Techwes.`,
    minutes: '± 5 minutes',
    soon: 'Coming soon: Defender, Entra and Conditional Access',
    disclaimer: 'Fictional company. Simplified scenarios: always check current Microsoft documentation before changing production.',
    lang: 'Nederlands',
  },
};

export const LEVELS = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 1,
    name: { nl: 'Eerste werkdag', en: 'First day' },
    rank: { nl: 'Beginner', en: 'Beginner' },
    badge: { nl: 'Purview Starter', en: 'Purview Starter' },
    blurb: { nl: 'Rollen, audit en de basis van de portal.', en: 'Roles, audit and the basics of the portal.' },
    tasks: [
      {
        type: 'choice',
        from: { nl: 'IT-manager', en: 'IT manager' },
        prompt: {
          nl: 'Een nieuwe collega gaat de DLP-policies beheren. Welke rol geef je?',
          en: 'A new colleague will manage the DLP policies. Which role do you assign?',
        },
        options: [
          { text: { nl: 'Global Administrator', en: 'Global Administrator' }, effects: { sec: -2, usr: 0, cmp: -1 },
            feedback: { nl: 'Werkt, maar geeft toegang tot de hele tenant. Veel te breed voor DLP-beheer.', en: 'Works, but grants access to the whole tenant. Far too broad for DLP management.' } },
          { text: { nl: 'Compliance Administrator', en: 'Compliance Administrator' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Least privilege: genoeg om DLP te beheren, zonder de sleutels van de hele tenant.', en: 'Least privilege: enough to manage DLP without the keys to the whole tenant.' } },
          { text: { nl: 'Security Reader', en: 'Security Reader' }, effects: { sec: 0, usr: -1, cmp: 0 },
            feedback: { nl: 'Alleen lezen. Je collega kan geen policies maken of wijzigen.', en: 'Read-only. Your colleague cannot create or change policies.' } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Wat controleer je als allereerste, zodat je later incidenten kunt onderzoeken?',
          en: 'What do you check first, so you can investigate incidents later?',
        },
        options: [
          { text: { nl: 'Dat Audit (de unified audit log) aan staat', en: 'That Audit (the unified audit log) is on' }, correct: true, effects: { sec: 1, usr: 0, cmp: 2 },
            feedback: { nl: 'Zonder audit log heb je bij een incident geen sporen. Het staat meestal standaard aan, maar controleer het altijd.', en: 'Without the audit log you have no trail during an incident. It is usually on by default, but always verify.' } },
          { text: { nl: 'Dat alle gebruikers een sensitivity label moeten kiezen', en: 'That all users must pick a sensitivity label' }, effects: { sec: 0, usr: -1, cmp: 0 },
            feedback: { nl: 'Nuttig later, maar het helpt je niet om terug te kijken wat er gebeurd is.', en: 'Useful later, but it does not let you look back at what happened.' } },
          { text: { nl: 'Dat er een DLP-policy op blokkeren staat', en: 'That a DLP policy is set to block' }, effects: { sec: 1, usr: -2, cmp: 0 },
            feedback: { nl: 'Te vroeg en te streng. En ook dan heb je audit nodig om te zien wat er gebeurt.', en: 'Too early and too strict. And even then you need audit to see what happens.' } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'Helpdesk', en: 'Helpdesk' },
        prompt: {
          nl: 'Een beheerder werkt dagelijks met een permanente Global Administrator-rol. Wat adviseer je?',
          en: 'An admin works every day with a permanent Global Administrator role. What do you advise?',
        },
        options: [
          { text: { nl: 'Laat zo: hij is ervaren', en: 'Leave it: they are experienced' }, effects: { sec: -2, usr: 0, cmp: -1 },
            feedback: { nl: 'Ervaring beschermt niet tegen phishing of een gestolen token. Staande rechten zijn een risico.', en: 'Experience does not protect against phishing or a stolen token. Standing access is a risk.' } },
          { text: { nl: 'Privileged Identity Management: de rol alleen activeren wanneer nodig', en: 'Privileged Identity Management: activate the role only when needed' }, correct: true, effects: { sec: 2, usr: 0, cmp: 1 },
            feedback: { nl: 'Just-in-time: de rol is er alleen als het nodig is, met goedkeuring en logging.', en: 'Just-in-time: the role exists only when needed, with approval and logging.' } },
          { text: { nl: 'Rol direct intrekken', en: 'Remove the role immediately' }, effects: { sec: 1, usr: -2, cmp: 0 },
            feedback: { nl: 'Veiliger, maar je legt het werk stil. PIM geeft hetzelfde voordeel zonder blokkade.', en: 'Safer, but you halt the work. PIM gives the same benefit without blocking.' } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'Privacy officer', en: 'Privacy officer' },
        prompt: {
          nl: 'Welke ingebouwde classifier gebruik je om Nederlandse BSN\'s te herkennen?',
          en: 'Which built-in classifier do you use to detect Dutch citizen service numbers (BSN)?',
        },
        options: [
          { text: { nl: 'Een trainable classifier "Persoonsgegevens"', en: 'A trainable classifier "Personal data"' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Trainable classifiers herkennen soorten documenten, geen specifieke nummers.', en: 'Trainable classifiers recognise types of documents, not specific numbers.' } },
          { text: { nl: 'Het sensitive info type "Netherlands citizen\'s service (BSN) number"', en: 'The sensitive info type "Netherlands citizen\'s service (BSN) number"' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Dit ingebouwde SIT controleert patroon én checksum, en gebruikt woorden in de buurt voor extra zekerheid.', en: 'This built-in SIT checks pattern and checksum, and uses nearby keywords for extra confidence.' } },
          { text: { nl: 'Een eigen regex van 9 cijfers', en: 'A custom regex of 9 digits' }, effects: { sec: 0, usr: -1, cmp: 0 },
            feedback: { nl: 'Elk getal van 9 cijfers matcht dan: veel false positives. Het ingebouwde SIT is slimmer.', en: 'Every 9-digit number would match: lots of false positives. The built-in SIT is smarter.' } },
        ],
        link: 'custom-sensitive-information-types-in-purview-dlp-voorbij-de-templates',
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Waar zie je wáár in de tenant gevoelige data staat (welke sites, welke mailboxen)?',
          en: 'Where do you see where sensitive data lives in the tenant (which sites, which mailboxes)?',
        },
        options: [
          { text: { nl: 'Activity explorer', en: 'Activity explorer' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Activity explorer toont wat er mét data gebeurt (labelen, kopiëren), niet waar het staat.', en: 'Activity explorer shows what happens to data (labelling, copying), not where it lives.' } },
          { text: { nl: 'Content explorer', en: 'Content explorer' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Content explorer laat per locatie zien waar items met gevoelige info of labels staan.', en: 'Content explorer shows per location where items with sensitive info or labels live.' } },
          { text: { nl: 'De audit log', en: 'The audit log' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'De audit log vertelt wie wat deed, niet waar gevoelige data staat.', en: 'The audit log tells who did what, not where sensitive data lives.' } },
        ],
      },
    ],
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 2,
    name: { nl: 'Datalekken', en: 'Data leaks' },
    rank: { nl: 'Gevorderd', en: 'Intermediate' },
    badge: { nl: 'DLP Guardian', en: 'DLP Guardian' },
    blurb: { nl: 'DLP bouwen, testen en tunen zonder de business stil te leggen.', en: 'Build, test and tune DLP without stopping the business.' },
    tasks: [
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: '"Ik wil dat niemand nog BSN\'s naar buiten mailt. Vandaag nog." Wat doe je eerst?',
          en: '"I want nobody to email citizen service numbers outside anymore. Today." What do you do first?',
        },
        options: [
          { text: { nl: 'DLP-policy direct aan op blokkeren voor iedereen', en: 'DLP policy straight to block for everyone' }, effects: { sec: 2, usr: -3, cmp: 0 },
            feedback: { nl: 'Salarisadministratie kan niet meer met de Belastingdienst mailen: 40 tickets voor de lunch.', en: 'Payroll can no longer email the tax office: 40 tickets before lunch.' } },
          { text: { nl: 'DLP-policy in simulatiemodus met policy tips, na een paar dagen evalueren', en: 'DLP policy in simulation mode with policy tips, evaluate after a few days' }, correct: true, effects: { sec: 1, usr: 1, cmp: 1 },
            feedback: { nl: 'Je ziet 3 echte lekken en 25 false positives, en die werk je weg vóór je blokkeert.', en: 'You see 3 real leaks and 25 false positives, which you fix before you block.' } },
          { text: { nl: 'Een mail naar alle medewerkers', en: 'An email to all employees' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Bewustwording helpt, maar houdt technisch niets tegen.', en: 'Awareness helps, but technically stops nothing.' } },
        ],
        link: 'waarom-ik-bij-de-meeste-klanten-dlp-verkies-boven-encryptie',
      },
      {
        type: 'multi',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Bouw de policy: BSN\'s mogen niet zomaar per e-mail naar buiten, maar gebruikers mogen met een reden doorgaan.',
          en: 'Build the policy: citizen service numbers must not leave by email casually, but users may continue with a reason.',
        },
        options: [
          { text: { nl: 'Locatie: Exchange e-mail', en: 'Location: Exchange email' }, correct: true },
          { text: { nl: 'Locatie: alle Windows-endpoints', en: 'Location: all Windows endpoints' } },
          { text: { nl: 'Voorwaarde: bevat het SIT voor BSN', en: 'Condition: contains the BSN sensitive info type' }, correct: true },
          { text: { nl: 'Voorwaarde: gedeeld met mensen buiten de organisatie', en: 'Condition: shared with people outside the organisation' }, correct: true },
          { text: { nl: 'Actie: blokkeren, met override en motivatie', en: 'Action: block, with override and justification' }, correct: true },
          { text: { nl: 'Actie: alleen auditen', en: 'Action: audit only' } },
        ],
        feedback: {
          nl: 'Precies genoeg: de juiste locatie, alleen extern verkeer, en een override zodat legitiem werk doorgaat. Elke keuze wordt gelogd.',
          en: 'Exactly enough: the right location, only external traffic, and an override so legitimate work continues. Every choice is logged.',
        },
      },
      {
        type: 'choice',
        from: { nl: 'Helpdesk', en: 'Helpdesk' },
        prompt: {
          nl: 'Je hebt de policy 10 minuten geleden gemaakt, maar in Outlook verschijnt nog geen policy tip. Wat is de meest waarschijnlijke oorzaak?',
          en: 'You created the policy 10 minutes ago, but no policy tip shows in Outlook yet. Most likely cause?',
        },
        options: [
          { text: { nl: 'De policy is kapot: opnieuw aanmaken', en: 'The policy is broken: recreate it' }, effects: { sec: 0, usr: -1, cmp: 0 },
            feedback: { nl: 'Opnieuw aanmaken begint de wachttijd alleen opnieuw.', en: 'Recreating it only restarts the waiting time.' } },
          { text: { nl: 'Het verspreiden van een policy kan tot een uur duren', en: 'Policy distribution can take up to an hour' }, correct: true, effects: { sec: 0, usr: 1, cmp: 0 },
            feedback: { nl: 'Even geduld. Kijk daarna pas verder, bijvoorbeeld naar de status van de policy.', en: 'Be patient. Only then look further, for example at the policy status.' } },
          { text: { nl: 'Outlook ondersteunt geen policy tips', en: 'Outlook does not support policy tips' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Outlook ondersteunt policy tips wel.', en: 'Outlook does support policy tips.' } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'Inkoop', en: 'Procurement' },
        prompt: {
          nl: 'Inkoop krijgt steeds waarschuwingen: hun ordernummers van 9 cijfers worden als BSN herkend. Wat doe je?',
          en: 'Procurement keeps getting warnings: their 9-digit order numbers are detected as BSNs. What do you do?',
        },
        options: [
          { text: { nl: 'Policy uitzetten voor iedereen', en: 'Turn the policy off for everyone' }, effects: { sec: -2, usr: 1, cmp: -2 },
            feedback: { nl: 'Probleem weg, bescherming ook weg.', en: 'Problem gone, protection gone too.' } },
          { text: { nl: 'Hogere confidence eisen, zodat er bewijs in de buurt nodig is (bijv. het woord "BSN")', en: 'Require higher confidence, so supporting evidence is needed nearby (e.g. the word "BSN")' }, correct: true, effects: { sec: 1, usr: 2, cmp: 1 },
            feedback: { nl: 'Gericht tunen: de ruis verdwijnt, de echte BSN\'s blijven gevangen.', en: 'Targeted tuning: the noise goes away, the real BSNs are still caught.' } },
          { text: { nl: 'Inkoop uitzonderen van alle DLP', en: 'Exclude procurement from all DLP' }, effects: { sec: -1, usr: 1, cmp: -1 },
            feedback: { nl: 'Nu kan inkoop ongemerkt ook échte BSN\'s mailen.', en: 'Now procurement can also send real BSNs unnoticed.' } },
        ],
        link: 'auto-labeling-zonder-ruis-false-positives-wegwerken-voordat-je-de-policy-aanzet',
      },
      {
        type: 'choice',
        from: { nl: 'Helpdesk', en: 'Helpdesk' },
        prompt: {
          nl: 'Endpoint DLP grijpt niet in als een medewerker een bestand met BSN\'s naar een USB-stick kopieert. Wat controleer je eerst?',
          en: 'Endpoint DLP does not act when an employee copies a file with BSNs to a USB stick. What do you check first?',
        },
        options: [
          { text: { nl: 'Of het apparaat aan Purview is toegevoegd (onboarded)', en: 'Whether the device is onboarded to Purview' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Zonder onboarding ziet Purview het apparaat niet. Daarna pas de policy-instellingen.', en: 'Without onboarding Purview cannot see the device. Only then check the policy settings.' } },
          { text: { nl: 'Of de gebruiker een E5-licentie heeft', en: 'Whether the user has an E5 licence' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Licenties doen ertoe, maar de eerste technische oorzaak is bijna altijd onboarding.', en: 'Licences matter, but the first technical cause is almost always onboarding.' } },
          { text: { nl: 'USB-poorten in het BIOS uitschakelen', en: 'Disable USB ports in the BIOS' }, effects: { sec: 1, usr: -2, cmp: 0 },
            feedback: { nl: 'Grof middel: nu werkt geen enkele muis- of headset-dongle meer.', en: 'Blunt instrument: now no mouse or headset dongle works anymore.' } },
        ],
        link: 'endpoint-dlp-wordt-eindelijk-beheersbaar-device-scoping-health-reports-en-advanced-hunting',
      },
      {
        type: 'choice',
        from: { nl: 'Salarisadministratie', en: 'Payroll' },
        prompt: {
          nl: 'Salarisadministratie moet loonaangiftes met BSN\'s naar belastingdienst.nl kunnen sturen. Hoe regel je dat?',
          en: 'Payroll must be able to send payroll returns with BSNs to belastingdienst.nl. How do you arrange that?',
        },
        options: [
          { text: { nl: 'Een uitzondering in de policy: groep Salarisadministratie naar het domein belastingdienst.nl', en: 'An exception in the policy: group Payroll to the domain belastingdienst.nl' }, correct: true, effects: { sec: 1, usr: 2, cmp: 1 },
            feedback: { nl: 'Zo smal mogelijk: alleen deze groep, alleen dit domein. De rest blijft beschermd.', en: 'As narrow as possible: only this group, only this domain. Everything else stays protected.' } },
          { text: { nl: 'Salarisadministratie uitsluiten van de policy', en: 'Exclude payroll from the policy' }, effects: { sec: -1, usr: 1, cmp: -1 },
            feedback: { nl: 'Nu kunnen ze BSN\'s naar élk adres sturen.', en: 'Now they can send BSNs to any address.' } },
          { text: { nl: 'Laat ze maar elke keer de override gebruiken', en: 'Let them use the override every time' }, effects: { sec: 0, usr: -2, cmp: 0 },
            feedback: { nl: 'Werkt, maar frustreert en vervuilt je alerts met verwachte meldingen.', en: 'Works, but frustrates users and floods your alerts with expected events.' } },
        ],
      },
    ],
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 3,
    name: { nl: 'Labelen, bewaren en AI', en: 'Labelling, retention and AI' },
    rank: { nl: 'Ervaren', en: 'Advanced' },
    badge: { nl: 'Data Steward', en: 'Data Steward' },
    blurb: { nl: 'Auto-labeling, retentie en Copilot in je tenant.', en: 'Auto-labelling, retention and Copilot in your tenant.' },
    tasks: [
      {
        type: 'choice',
        from: { nl: 'Collega-admin', en: 'Fellow admin' },
        prompt: {
          nl: 'Je collega wil dit script draaien. Wat is het risico?',
          en: 'Your colleague wants to run this script. What is the risk?',
        },
        code: `New-AutoSensitivityLabelPolicy -Name "BSN auto" \`
  -ApplySensitivityLabel "Strikt vertrouwelijk" \`
  -ExchangeLocation All -Mode Enable
New-AutoSensitivityLabelRule -Policy "BSN auto" -Name "BSN" \`
  -ContentContainsSensitiveInformation @{Name="Netherlands citizen's service (BSN) number"; minCount="1"}`,
        options: [
          { text: { nl: 'Er ontbreekt een label', en: 'A label is missing' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Het label staat er wel: -ApplySensitivityLabel.', en: 'The label is there: -ApplySensitivityLabel.' } },
          { text: { nl: 'De policy staat direct op Enable, zonder simulatie', en: 'The policy goes straight to Enable, without simulation' }, correct: true, effects: { sec: 1, usr: 1, cmp: 1 },
            feedback: { nl: 'Begin met -Mode TestWithoutNotifications. Bekijk de simulatie en tune, en zet pas daarna aan.', en: 'Start with -Mode TestWithoutNotifications. Review the simulation and tune, and only then enable.' } },
          { text: { nl: 'Exchange ondersteunt geen auto-labeling', en: 'Exchange does not support auto-labelling' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Dat doet het wel: e-mail kan automatisch gelabeld worden.', en: 'It does: email can be labelled automatically.' } },
        ],
        link: 'simuleren-voordat-je-labelt-wat-de-nieuwe-insights-van-auto-labeling-wel-en-niet-laten-zien',
      },
      {
        type: 'choice',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: {
          nl: 'Een contract heeft het handmatige label "Vertrouwelijk". Auto-labeling vindt er BSN\'s in en wil "Strikt vertrouwelijk" zetten. Overschrijven van handmatige labels staat aan. Wat gebeurt er?',
          en: 'A contract has the manual label "Confidential". Auto-labelling finds BSNs and wants to apply "Highly confidential". Overwriting manual labels is on. What happens?',
        },
        options: [
          { text: { nl: 'Het label wordt overschreven, want het handmatige label heeft een lagere prioriteit', en: 'The label is overwritten, because the manual label has a lower priority' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Een hoger handmatig label zou wél blijven staan. Overschrijven gaat alleen omhoog.', en: 'A higher manual label would stay. Overwriting only goes up.' } },
          { text: { nl: 'Het handmatige label blijft altijd staan', en: 'The manual label always stays' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Niet als overschrijven aan staat en het nieuwe label een hogere prioriteit heeft.', en: 'Not when overwriting is on and the new label has a higher priority.' } },
          { text: { nl: 'De gebruiker krijgt een pop-up om te kiezen', en: 'The user gets a pop-up to choose' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Auto-labeling aan de servicekant werkt zonder tussenkomst van de gebruiker.', en: 'Service-side auto-labelling works without user interaction.' } },
        ],
        link: 'auto-labeling-in-productie-het-overschrijven-van-handmatige-labels-is-een-beleidskeuze-geen-vinkje',
      },
      {
        type: 'choice',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: {
          nl: 'Contracten moeten 7 jaar bewaard blijven en daarna weg, met een controle door Legal vooraf. Wat zet je in?',
          en: 'Contracts must be kept for 7 years and then removed, with a check by Legal beforehand. What do you use?',
        },
        options: [
          { text: { nl: 'Een retentiebeleid op alle SharePoint-sites: 7 jaar bewaren', en: 'A retention policy on all SharePoint sites: keep 7 years' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Te breed, en er gebeurt na 7 jaar niets: het blijft gewoon staan.', en: 'Too broad, and nothing happens after 7 years: it just stays.' } },
          { text: { nl: 'Een retentielabel: 7 jaar bewaren, daarna disposition review', en: 'A retention label: keep 7 years, then disposition review' }, correct: true, effects: { sec: 0, usr: 1, cmp: 2 },
            feedback: { nl: 'Per item geregeld, en Legal beoordeelt vóór de definitieve verwijdering.', en: 'Managed per item, and Legal reviews before final deletion.' } },
          { text: { nl: 'Een herinnering in de agenda over 7 jaar', en: 'A calendar reminder in 7 years' }, effects: { sec: 0, usr: 0, cmp: -2 },
            feedback: { nl: 'Dat gaat geheid mis, en je kunt niet aantonen dat het gebeurd is.', en: 'That will go wrong, and you cannot prove it happened.' } },
        ],
        link: 'disposition-review-in-purview-de-tussenstap-voordat-je-data-definitief-verwijdert',
      },
      {
        type: 'choice',
        from: { nl: 'HR-directeur', en: 'HR director' },
        prompt: {
          nl: '"Copilot liet een stagiair de salarissen zien!" Wat is de echte oorzaak, en wat doe je eerst?',
          en: '"Copilot showed an intern the salaries!" What is the real cause, and what do you do first?',
        },
        options: [
          { text: { nl: 'Copilot uitzetten voor iedereen', en: 'Turn Copilot off for everyone' }, effects: { sec: 1, usr: -3, cmp: 0 },
            feedback: { nl: 'Het lek blijft bestaan: de stagiair kan het bestand ook gewoon zelf openen.', en: 'The leak remains: the intern can simply open the file themselves.' } },
          { text: { nl: 'Oversharing: het bestand staat op een site die voor "iedereen" open staat. Rechten herstellen', en: 'Oversharing: the file is on a site open to "everyone". Fix the permissions' }, correct: true, effects: { sec: 2, usr: 0, cmp: 1 },
            feedback: { nl: 'Copilot laat alleen zien waar de gebruiker al bij kan. Het maakt je oversharing zichtbaar.', en: 'Copilot only shows what the user can already access. It makes your oversharing visible.' } },
          { text: { nl: 'Een melding sturen naar Microsoft', en: 'Report it to Microsoft' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Copilot doet wat het moet doen: het respecteert de rechten die jij hebt ingesteld.', en: 'Copilot works as designed: it respects the permissions you set.' } },
        ],
        link: 'copilot-maakt-je-oversharing-probleem-zichtbaar-en-dat-is-precies-de-waarde',
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Je hebt een DLP-regel voor Microsoft 365 Copilot, maar Copilot vat het fusiedossier nog steeds samen. Meest waarschijnlijke oorzaak?',
          en: 'You have a DLP rule for Microsoft 365 Copilot, but Copilot still summarises the merger file. Most likely cause?',
        },
        options: [
          { text: { nl: 'De regel werkt op sensitivity labels, en het fusiedossier heeft geen label', en: 'The rule works on sensitivity labels, and the merger file has no label' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Zonder label geen match. Label het dossier (handmatig of automatisch) en de regel grijpt in.', en: 'No label, no match. Label the file (manually or automatically) and the rule kicks in.' } },
          { text: { nl: 'Copilot negeert DLP altijd', en: 'Copilot always ignores DLP' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Niet waar: DLP kan Copilot verhinderen gelabelde inhoud te gebruiken.', en: 'Not true: DLP can stop Copilot from using labelled content.' } },
          { text: { nl: 'De gebruiker heeft geen licentie', en: 'The user has no licence' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Dan zou Copilot helemaal niet werken.', en: 'Then Copilot would not work at all.' } },
        ],
        link: 'dspm-for-ai-zichtbaarheid-is-niet-hetzelfde-als-bescherming',
      },
    ],
  },

  // ---------------- LEVEL 4 ----------------
  {
    id: 4,
    name: { nl: 'Incident!', en: 'Incident!' },
    rank: { nl: 'Expert', en: 'Expert' },
    badge: { nl: 'Incident Responder', en: 'Incident Responder' },
    blurb: { nl: 'Insider Risk, Adaptive Protection, eDiscovery en Audit onder druk.', en: 'Insider Risk, Adaptive Protection, eDiscovery and Audit under pressure.' },
    tasks: [
      {
        type: 'choice',
        from: { nl: 'HR', en: 'HR' },
        prompt: {
          nl: 'Je wilt de Insider Risk-template "Data theft by departing users" gebruiken. Wat heeft die nodig om te weten wie er vertrekt?',
          en: 'You want to use the Insider Risk template "Data theft by departing users". What does it need to know who is leaving?',
        },
        options: [
          { text: { nl: 'Een HR-connector met ontslagdata (of het verwijderen van het account in Entra)', en: 'An HR connector with resignation dates (or the account being deleted in Entra)' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Het vertrek is de trigger. Daarna let de policy op downloads, kopiëren en uploaden.', en: 'The departure is the trigger. Then the policy watches downloads, copying and uploads.' } },
          { text: { nl: 'Niets: hij monitort gewoon iedereen', en: 'Nothing: it simply monitors everyone' }, effects: { sec: 0, usr: -1, cmp: -1 },
            feedback: { nl: 'Zonder trigger weet de policy niet wie er vertrekt.', en: 'Without a trigger the policy does not know who is leaving.' } },
          { text: { nl: 'Een sensitivity label op het HR-dossier', en: 'A sensitivity label on the HR file' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Labels helpen bij het wegen van risico, maar zijn niet de trigger.', en: 'Labels help weigh risk, but they are not the trigger.' } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Hoe zorg je dat iemand met een verhoogd insider risk automatisch strengere toegang krijgt?',
          en: 'How do you make someone with an elevated insider risk automatically get stricter access?',
        },
        options: [
          { text: { nl: 'Adaptive Protection: het risiconiveau als voorwaarde in Conditional Access en DLP', en: 'Adaptive Protection: the risk level as a condition in Conditional Access and DLP' }, correct: true, effects: { sec: 2, usr: 1, cmp: 1 },
            feedback: { nl: 'Alleen de risicovolle gebruiker krijgt strengere regels. De rest merkt niets.', en: 'Only the risky user gets stricter rules. Everyone else notices nothing.' } },
          { text: { nl: 'Handmatig een groep "risico" bijhouden', en: 'Manually maintain a "risk" group' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Werkt, maar is traag en je vergeet mensen.', en: 'Works, but it is slow and you forget people.' } },
          { text: { nl: 'Voor iedereen USB en cloud-uploads blokkeren', en: 'Block USB and cloud uploads for everyone' }, effects: { sec: 1, usr: -3, cmp: 0 },
            feedback: { nl: 'Het hele bedrijf betaalt de prijs voor één persoon.', en: 'The whole company pays the price for one person.' } },
        ],
        link: 'insider-risk-als-conditie-in-conditional-access-zo-richt-je-adaptive-protection-veilig-in',
      },
      {
        type: 'choice',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: {
          nl: 'Legal wil zeker weten dat de mail en OneDrive van een verdachte medewerker niet verloren gaan. Wat doe je?',
          en: 'Legal wants to make sure the email and OneDrive of a suspected employee are not lost. What do you do?',
        },
        options: [
          { text: { nl: 'Alles nu meteen exporteren', en: 'Export everything right now' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Een export is een momentopname. Wat hij daarna verwijdert, ben je kwijt.', en: 'An export is a snapshot. Whatever they delete afterwards is lost.' } },
          { text: { nl: 'eDiscovery-case, de medewerker als custodian toevoegen en een hold plaatsen', en: 'An eDiscovery case, add the employee as a custodian and place a hold' }, correct: true, effects: { sec: 1, usr: 0, cmp: 2 },
            feedback: { nl: 'Met een hold blijft alles bewaard, ook wat hij nog probeert te verwijderen.', en: 'With a hold everything is preserved, including what they still try to delete.' } },
          { text: { nl: 'Zijn account direct verwijderen', en: 'Delete the account immediately' }, effects: { sec: 1, usr: 0, cmp: -2 },
            feedback: { nl: 'Dan raak je juist het bewijs kwijt.', en: 'That is exactly how you lose the evidence.' } },
        ],
        link: 'ediscovery-in-purview-van-verzoek-tot-exportpakket',
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: '"Welke bestanden heeft Jan de afgelopen 30 dagen gedownload?" Waar zoek je?',
          en: '"Which files did Jan download in the last 30 days?" Where do you look?',
        },
        options: [
          { text: { nl: 'Audit: zoeken op zijn account en de activiteit "Downloaded file"', en: 'Audit: search for his account and the activity "Downloaded file"' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'De audit log legt bestandsactiviteiten vast. Filter op gebruiker, activiteit en periode.', en: 'The audit log records file activity. Filter by user, activity and period.' } },
          { text: { nl: 'Content explorer', en: 'Content explorer' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Content explorer toont waar data staat, niet wie wat downloadde.', en: 'Content explorer shows where data lives, not who downloaded what.' } },
          { text: { nl: 'Jan zelf vragen', en: 'Ask Jan himself' }, effects: { sec: -1, usr: 0, cmp: -1 },
            feedback: { nl: 'Dan weet hij dat hij in de gaten wordt gehouden.', en: 'Then he knows he is being watched.' } },
        ],
      },
      {
        type: 'order',
        from: { nl: 'HR', en: 'HR' },
        prompt: {
          nl: 'Boss level. Jan (sales) heeft ontslag genomen en vertrekt vrijdag. Er zijn signalen dat hij klantdata meeneemt. Zet je acties in de juiste volgorde.',
          en: 'Boss level. Jan (sales) has resigned and leaves on Friday. There are signs he is taking customer data. Put your actions in the right order.',
        },
        steps: [
          { nl: 'eDiscovery-hold op zijn mailbox en OneDrive', en: 'eDiscovery hold on his mailbox and OneDrive' },
          { nl: 'In de audit log zijn downloads van de afgelopen 30 dagen zoeken', en: 'Search the audit log for his downloads in the last 30 days' },
          { nl: 'Risiconiveau verhogen, zodat Adaptive Protection USB en uploads blokkeert', en: 'Raise his risk level so Adaptive Protection blocks USB and uploads' },
          { nl: 'Op zijn laatste werkdag het account blokkeren', en: 'Block the account on his last working day' },
        ],
        feedback: {
          nl: 'Eerst bewijs veiligstellen, dan onderzoeken, dan stil het lek dichten, en pas op het laatst het account blokkeren. Direct blokkeren alarmeert hem en kost bewijs.',
          en: 'First preserve evidence, then investigate, then quietly close the leak, and only at the end block the account. Blocking right away alerts him and costs evidence.',
        },
      },
    ],
  },
];
