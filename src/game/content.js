// Inhoud van "Tenant Admin" — het Purview-beheerdersspel. Tweetalig (nl/en).
// Opdrachttypes:
//   choice : één juist antwoord
//   multi  : bouw een policy, kies alle juiste blokken
//   order  : zet de stappen in de juiste volgorde
//   portal : voer de opdracht uit in de gesimuleerde beheerportal (DlpPortal.js)
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
  // Ritme: eerst doen in de portal, dan een vraag die het inzicht vastzet.
  {
    id: 2,
    name: { nl: 'Datalekken', en: 'Data leaks' },
    rank: { nl: 'Gevorderd', en: 'Intermediate' },
    badge: { nl: 'DLP Guardian', en: 'DLP Guardian' },
    blurb: { nl: 'Bouw, test en tune een DLP-policy in de portal.', en: 'Build, test and tune a DLP policy in the portal.' },
    tasks: [
      {
        type: 'portal', step: 'create',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: '"Niemand mag nog BSN\'s naar buiten mailen. Maar de business mag niet stilvallen." Maak in de portal een DLP-policy die precies dat doet.',
          en: '"Nobody may email citizen service numbers (BSN) outside anymore. But the business must not grind to a halt." Create a DLP policy in the portal that does exactly that.',
        },
        link: 'waarom-ik-bij-de-meeste-klanten-dlp-verkies-boven-encryptie',
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: '"Waarom staat die policy op simulatie? Ik wilde dat het vandaag werkte!" Wat antwoord je?',
          en: '"Why is that policy in simulation? I wanted it working today!" What do you answer?',
        },
        options: [
          { text: { nl: 'Simulatie laat zien wat de policy zou raken, zonder iemand te blokkeren. Zo werk ik false positives weg vóór ik aanzet.', en: 'Simulation shows what the policy would hit, without blocking anyone. That way I remove false positives before turning it on.' }, correct: true, effects: { sec: 0, usr: 1, cmp: 1 },
            feedback: { nl: 'Precies. En met policy tips worden gebruikers al gewaarschuwd, zonder blokkade.', en: 'Exactly. And with policy tips users are already warned, without being blocked.' } },
          { text: { nl: 'Simulatie is verplicht: je kunt een DLP-policy niet direct aanzetten.', en: 'Simulation is mandatory: you cannot turn a DLP policy on directly.' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Niet waar: het kan wel. Het is alleen niet verstandig.', en: 'Not true: you can. It just is not wise.' } },
          { text: { nl: 'In simulatie werkt de policy al, alleen zonder logging.', en: 'In simulation the policy already works, just without logging.' }, effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: { nl: 'Andersom: in simulatie wordt gelogd, maar niets tegengehouden.', en: 'The other way round: simulation logs, but blocks nothing.' } },
        ],
      },
      {
        type: 'portal', step: 'tune',
        from: { nl: 'Inkoop', en: 'Procurement' },
        prompt: {
          nl: 'Drie dagen later. Inkoop klaagt: hun ordernummers worden als BSN gezien. Open je policy, bekijk het simulatieresultaat en tune de regel zó dat de ruis verdwijnt, maar echte lekken gevangen blijven.',
          en: 'Three days later. Procurement complains: their order numbers are detected as BSNs. Open your policy, review the simulation result and tune the rule so the noise disappears but real leaks are still caught.',
        },
        link: 'auto-labeling-zonder-ruis-false-positives-wegwerken-voordat-je-de-policy-aanzet',
      },
      {
        type: 'choice',
        from: { nl: 'Collega-admin', en: 'Fellow admin' },
        prompt: {
          nl: 'Waarom verdwijnen de ordernummers bij een hoge confidence, maar blijven echte BSN\'s gevangen?',
          en: 'Why do the order numbers disappear at high confidence, while real BSNs are still caught?',
        },
        options: [
          { text: { nl: 'Hoge confidence vraagt naast een geldig nummer ook ondersteunend bewijs in de buurt, zoals het woord "BSN"', en: 'High confidence requires, besides a valid number, supporting evidence nearby, such as the word "BSN"' }, correct: true, effects: { sec: 1, usr: 1, cmp: 0 },
            feedback: { nl: 'Een kaal getal van 9 cijfers is niet genoeg. Een echte BSN staat meestal naast woorden als "BSN" of "burgerservicenummer".', en: 'A bare 9-digit number is not enough. A real BSN usually sits next to words like "BSN" or "burgerservicenummer".' } },
          { text: { nl: 'Hoge confidence kijkt alleen naar Excel-bestanden', en: 'High confidence only looks at Excel files' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Confidence gaat over bewijs rond de match, niet over bestandstypen.', en: 'Confidence is about evidence around the match, not file types.' } },
          { text: { nl: 'Hoge confidence vraagt minimaal 10 BSN\'s per bericht', en: 'High confidence requires at least 10 BSNs per message' }, effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: { nl: 'Dat is het minimaal aantal, een andere instelling.', en: 'That is the minimum instance count, a different setting.' } },
        ],
      },
      {
        type: 'portal', step: 'finish',
        from: { nl: 'Salarisadministratie', en: 'Payroll' },
        prompt: {
          nl: 'Salarisadministratie moet loonaangiftes met BSN\'s naar belastingdienst.nl kunnen sturen. Voeg de juiste uitzondering toe en zet de policy daarna echt aan.',
          en: 'Payroll must be able to send payroll returns with BSNs to belastingdienst.nl. Add the right exception and then actually turn the policy on.',
        },
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'De policy staat aan. "Ik wil zien wie de override gebruikt en met welke reden." Waar kijk je?',
          en: 'The policy is on. "I want to see who uses the override and with what reason." Where do you look?',
        },
        options: [
          { text: { nl: 'In de DLP-activiteiten in Activity explorer, en in de DLP-alerts', en: 'In the DLP activity in Activity explorer, and in the DLP alerts' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Daar zie je de regelmatches, wie een override deed en de opgegeven motivatie.', en: 'There you see the rule matches, who overrode and the justification given.' } },
          { text: { nl: 'In Content explorer', en: 'In Content explorer' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Content explorer toont waar data staat, niet wie een override gebruikte.', en: 'Content explorer shows where data lives, not who used an override.' } },
          { text: { nl: 'Dat wordt niet vastgelegd', en: 'That is not recorded' }, effects: { sec: -1, usr: 0, cmp: -1 },
            feedback: { nl: 'Wel: elke override met motivatie wordt gelogd. Dat is juist de waarde van "blokkeren met override".', en: 'It is: every override with justification is logged. That is the point of "block with override".' } },
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
