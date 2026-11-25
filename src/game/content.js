// Inhoud van "Tenant Admin" — het Purview-beheerdersspel. Tweetalig (nl/en).
// Opdrachttypes:
//   choice : één juist antwoord
//   multi  : bouw een policy, kies alle juiste blokken
//   order  : zet de stappen in de juiste volgorde
//   portal : DLP-wizard in de gesimuleerde portal (DlpPortal.js, level 2)
//   console: opdracht in de generieke gesimuleerde portal (Portal.js): section, fields, checks
// release: datum waarop het level op techwes.nl vrijkomt (wekelijks één nieuw level).
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
    releaseOn: 'Beschikbaar vanaf',
    blogs: 'Lees verder op de blog',
    weekly: 'Elke week komt er een nieuw level bij.',
    previewNote: 'Preview: alle levels zijn hier speelbaar. Op techwes.nl komen ze wekelijks vrij.',
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
    releaseOn: 'Available from',
    blogs: 'Read more on the blog (Dutch)',
    weekly: 'A new level is added every week.',
    previewNote: 'Preview: all levels are playable here. On techwes.nl they are released weekly.',
    disclaimer: 'Fictional company. Simplified scenarios: always check current Microsoft documentation before changing production.',
    lang: 'Nederlands',
  },
};

export const LEVELS = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 1,
    release: '2026-11-25',
    name: { nl: 'Eerste werkdag', en: 'First day' },
    rank: { nl: 'Beginner', en: 'Beginner' },
    badge: { nl: 'Purview Starter', en: 'Purview Starter' },
    blurb: { nl: 'Rollen toewijzen, audit aanzetten en gevoelige data vinden.', en: 'Assign roles, turn on audit and find sensitive data.' },
    tasks: [
      {
        type: 'console', section: 'roles',
        from: { nl: 'IT-manager', en: 'IT manager' },
        prompt: {
          nl: 'Sanne de Vries begint maandag en gaat de DLP-policies beheren. Geef haar in de portal precies de rechten die ze nodig heeft, niet meer.',
          en: 'Sanne de Vries starts on Monday and will manage the DLP policies. Give her exactly the rights she needs in the portal, no more.',
        },
        page: { nl: 'Rol toewijzen: Sanne de Vries', en: 'Assign role: Sanne de Vries' },
        fields: [
          { id: 'role', kind: 'radio', label: { nl: 'Rol', en: 'Role' }, options: [
            { v: 'ga', label: 'Global Administrator' }, { v: 'ca', label: 'Compliance Administrator' }, { v: 'sr', label: 'Security Reader' }] },
          { id: 'type', kind: 'radio', label: { nl: 'Type toewijzing', en: 'Assignment type' }, options: [
            { v: 'perm', label: { nl: 'Permanent actief', en: 'Permanently active' } },
            { v: 'pim', label: { nl: 'In aanmerking (eligible) via PIM: activeren wanneer nodig', en: 'Eligible via PIM: activate when needed' } }] },
        ],
        checks: [
          { test: (v) => v.role === 'ca', good: { nl: 'Compliance Administrator: genoeg voor DLP, zonder de sleutels van de hele tenant.', en: 'Compliance Administrator: enough for DLP, without the keys to the whole tenant.' },
            bad: { nl: 'Verkeerde rol: Global Administrator is veel te breed, Security Reader kan niets wijzigen.', en: 'Wrong role: Global Administrator is far too broad, Security Reader cannot change anything.' }, effects: { sec: -2 } },
          { test: (v) => v.type === 'pim', good: { nl: 'Eligible via PIM: geen staande rechten, activeren met logging.', en: 'Eligible via PIM: no standing access, activation is logged.' },
            bad: { nl: 'Permanent actief: een gestolen account heeft dan altijd deze rechten.', en: 'Permanently active: a stolen account always has these rights.' }, effects: { sec: -1 } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'IT-manager', en: 'IT manager' },
        prompt: { nl: 'Waarom gaf je Sanne de rol "eligible" via PIM en niet permanent?', en: 'Why did you make Sanne "eligible" via PIM rather than permanent?' },
        options: [
          { text: { nl: 'Zo heeft ze de rechten alleen als ze ze nodig heeft. Een gestolen sessie is dan minder waard, en elke activatie wordt gelogd.', en: 'That way she only has the rights when she needs them. A stolen session is worth less, and every activation is logged.' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Just-in-time in plaats van staande rechten: een van de sterkste maatregelen tegen accountmisbruik.', en: 'Just-in-time instead of standing access: one of the strongest measures against account abuse.' } },
          { text: { nl: 'Omdat PIM goedkoper is dan een permanente rol', en: 'Because PIM is cheaper than a permanent role' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Het gaat om risico, niet om kosten.', en: 'It is about risk, not cost.' } },
          { text: { nl: 'Omdat de Compliance Administrator-rol niet permanent kan', en: 'Because the Compliance Administrator role cannot be permanent' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Dat kan wel, het is alleen minder veilig.', en: 'It can, it is just less secure.' } },
        ],
      },
      {
        type: 'console', section: 'audit',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Voordat je iets bouwt: zorg dat je later kunt terugzien wie wat deed. Controleer de audit-instellingen van Nordwind.',
          en: 'Before you build anything: make sure you can later see who did what. Check Nordwind\'s audit settings.',
        },
        page: { nl: 'Instellingen', en: 'Settings' },
        info: { nl: 'Status: opname van gebruikers- en beheeractiviteit staat UIT.', en: 'Status: recording of user and admin activity is OFF.' },
        fields: [
          { id: 'on', kind: 'toggle', label: { nl: 'Gebruikers- en beheeractiviteit vastleggen', en: 'Record user and admin activity' } },
        ],
        checks: [
          { test: (v) => v.on === true, good: { nl: 'Audit staat aan: vanaf nu wordt alles vastgelegd.', en: 'Audit is on: everything is recorded from now on.' },
            bad: { nl: 'Audit staat nog uit: bij een incident heb je geen sporen.', en: 'Audit is still off: during an incident you have no trail.' }, effects: { cmp: -2, sec: -1 } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: { nl: 'Kun je met de audit log terugkijken naar wat er gebeurde vóórdat je hem aanzette?', en: 'Can the audit log show what happened before you turned it on?' },
        options: [
          { text: { nl: 'Nee: wat niet is vastgelegd, kun je later ook niet terugzien. Daarom eerst audit, dan bouwen.', en: 'No: what was not recorded cannot be seen later. That is why you turn on audit first, then build.' }, correct: true, effects: { sec: 0, usr: 0, cmp: 2 },
            feedback: { nl: 'Precies. Bij de meeste tenants staat audit standaard aan, maar controleren is stap één.', en: 'Exactly. In most tenants audit is on by default, but checking is step one.' } },
          { text: { nl: 'Ja, Microsoft bewaart alles toch al', en: 'Yes, Microsoft keeps everything anyway' }, effects: { sec: 0, usr: 0, cmp: -2 },
            feedback: { nl: 'Zonder vastleggen is er niets om terug te zoeken.', en: 'Without recording there is nothing to search.' } },
          { text: { nl: 'Alleen voor beheerders, niet voor gebruikers', en: 'Only for admins, not for users' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Ook voor beheerders geldt: niet vastgelegd is niet terug te zien.', en: 'For admins too: not recorded means not visible.' } },
        ],
      },
      {
        type: 'console', section: 'explorer',
        from: { nl: 'Privacy officer', en: 'Privacy officer' },
        prompt: {
          nl: 'Waar staan bij Nordwind eigenlijk BSN\'s? Zoek het uit en wijs de locatie aan die als eerste aangepakt moet worden.',
          en: 'Where are citizen service numbers (BSN) actually stored at Nordwind? Find out and point to the location that must be tackled first.',
        },
        page: { nl: 'Content explorer', en: 'Content explorer' },
        fields: [
          { id: 'sit', kind: 'select', label: { nl: 'Sensitive info type', en: 'Sensitive info type' }, options: [
            { v: 'bsn', label: "Netherlands citizen's service (BSN) number" }, { v: 'cc', label: 'Credit card number' }, { v: 'iban', label: 'IBAN' }] },
          { id: 'site', kind: 'radio', showIf: (v) => v.sit === 'bsn', label: { nl: 'Welke locatie pak je als eerste aan?', en: 'Which location do you tackle first?' }, options: [
            { v: 'hr', label: { nl: 'HR-Personeelsdossiers', en: 'HR-Personnel files' } },
            { v: 'arch', label: { nl: 'Oud-Archief-2019', en: 'Old-Archive-2019' } },
            { v: 'mail', label: { nl: 'Mailbox salarisadministratie', en: 'Payroll mailbox' } }] },
        ],
        table: {
          after: 'sit',
          head: [{ nl: 'Locatie', en: 'Location' }, { nl: 'Items met match', en: 'Items with match' }, { nl: 'Toegang', en: 'Access' }],
          rows: (v) => (v.sit === 'bsn' ? [
            [{ nl: 'HR-Personeelsdossiers', en: 'HR-Personnel files' }, '1.240', { nl: 'Alleen HR', en: 'HR only' }],
            [{ nl: 'Oud-Archief-2019', en: 'Old-Archive-2019' }, '318', { nl: 'Iedereen behalve externe gebruikers', en: 'Everyone except external users' }],
            [{ nl: 'Mailbox salarisadministratie', en: 'Payroll mailbox' }, '86', { nl: 'Salarisadministratie', en: 'Payroll' }],
          ] : v.sit ? [[{ nl: '(geen relevante treffers)', en: '(no relevant matches)' }, '—', '—']] : null),
        },
        checks: [
          { test: (v) => v.sit === 'bsn', good: { nl: 'Je zocht op het juiste sensitive info type.', en: 'You searched for the right sensitive info type.' }, bad: { nl: 'Verkeerd sensitive info type: de vraag gaat over BSN\'s.', en: 'Wrong sensitive info type: the question is about BSNs.' } },
          { test: (v) => v.site === 'arch', good: { nl: 'Oud-Archief-2019: minder items, maar open voor iedereen. Dat is het grootste risico.', en: 'Old-Archive-2019: fewer items, but open to everyone. That is the biggest risk.' },
            bad: { nl: 'Kijk naar wie erbij kan: Oud-Archief-2019 staat open voor iedereen, en dat weegt zwaarder dan het aantal items.', en: 'Look at who has access: Old-Archive-2019 is open to everyone, which outweighs the number of items.' }, effects: { sec: -1, cmp: -1 } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'Privacy officer', en: 'Privacy officer' },
        prompt: { nl: 'Je wilt ook weten wie de afgelopen week bestanden uit het oude archief heeft gekopieerd. Welk hulpmiddel gebruik je dan?', en: 'You also want to know who copied files from the old archive last week. Which tool do you use?' },
        options: [
          { text: { nl: 'Activity explorer: die toont wat er mét data gebeurt', en: 'Activity explorer: it shows what happens to data' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Content explorer: wáár data staat. Activity explorer: wat er mee gebeurt.', en: 'Content explorer: where data lives. Activity explorer: what happens to it.' } },
          { text: { nl: 'Weer Content explorer', en: 'Content explorer again' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Content explorer laat zien waar data staat, niet wie wat kopieerde.', en: 'Content explorer shows where data lives, not who copied what.' } },
          { text: { nl: 'Het rollenoverzicht', en: 'The roles overview' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Rollen gaan over beheerrechten, niet over activiteit op bestanden.', en: 'Roles are about admin rights, not file activity.' } },
        ],
      },
    ],
  },

  // ---------------- LEVEL 2 ----------------
  // Ritme: eerst doen in de portal, dan een vraag die het inzicht vastzet.
  {
    id: 2,
    release: '2026-11-30',
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
    release: '2026-12-07',
    name: { nl: 'Labelen en bewaren', en: 'Labelling and retention' },
    rank: { nl: 'Ervaren', en: 'Advanced' },
    badge: { nl: 'Data Steward', en: 'Data Steward' },
    blurb: { nl: 'Auto-labeling in simulatie, labelprioriteit en retentie met disposition review.', en: 'Auto-labelling in simulation, label priority and retention with disposition review.' },
    tasks: [
      {
        type: 'console', section: 'labels',
        from: { nl: 'Privacy officer', en: 'Privacy officer' },
        prompt: {
          nl: 'Alle documenten en mails met BSN\'s moeten automatisch het label "Strikt vertrouwelijk" krijgen. Maak de auto-labeling-policy, maar laat de business niet schrikken.',
          en: 'All documents and emails with citizen service numbers must automatically get the label "Highly confidential". Create the auto-labelling policy, but do not startle the business.',
        },
        page: { nl: 'Auto-labeling-policy maken', en: 'Create auto-labelling policy' },
        fields: [
          { id: 'label', kind: 'select', label: { nl: 'Toe te passen label', en: 'Label to apply' }, options: [
            { v: 'public', label: { nl: 'Openbaar', en: 'Public' } }, { v: 'conf', label: { nl: 'Vertrouwelijk', en: 'Confidential' } }, { v: 'hc', label: { nl: 'Strikt vertrouwelijk', en: 'Highly confidential' } }] },
          { id: 'sit', kind: 'select', label: { nl: 'Inhoud bevat', en: 'Content contains' }, options: [
            { v: 'bsn', label: "Netherlands citizen's service (BSN) number" }, { v: 'cc', label: 'Credit card number' }] },
          { id: 'locs', kind: 'checks', label: { nl: 'Locaties', en: 'Locations' }, options: [
            { v: 'exo', label: 'Exchange' }, { v: 'spo', label: 'SharePoint' }, { v: 'odb', label: 'OneDrive' }] },
          { id: 'mode', kind: 'radio', label: { nl: 'Modus', en: 'Mode' }, options: [
            { v: 'sim', label: { nl: 'Simulatie', en: 'Simulation' } }, { v: 'on', label: { nl: 'Direct aan', en: 'Turn on now' } }] },
        ],
        checks: [
          { test: (v) => v.label === 'hc', good: { nl: 'Het juiste label: Strikt vertrouwelijk.', en: 'The right label: Highly confidential.' }, bad: { nl: 'Verkeerd label voor BSN\'s.', en: 'Wrong label for BSNs.' }, effects: { sec: -1, cmp: -1 } },
          { test: (v) => v.sit === 'bsn', good: { nl: 'Het juiste sensitive info type.', en: 'The right sensitive info type.' }, bad: { nl: 'Verkeerd sensitive info type.', en: 'Wrong sensitive info type.' }, effects: { sec: -1 } },
          { test: (v) => ['exo', 'spo', 'odb'].every((x) => (v.locs || []).includes(x)), good: { nl: 'Alle drie de locaties: mail én documenten.', en: 'All three locations: email and documents.' }, bad: { nl: 'Er ontbreekt een locatie: de opdracht gaat over documenten én mail.', en: 'A location is missing: the task covers documents and email.' }, effects: { cmp: -1 } },
          { test: (v) => v.mode === 'sim', good: { nl: 'Eerst simulatie: je ziet wat er gelabeld zou worden, zonder iets te veranderen.', en: 'Simulation first: you see what would be labelled, without changing anything.' }, bad: { nl: 'Direct aan: duizenden bestanden krijgen ineens versleuteling, inclusief false positives.', en: 'Straight on: thousands of files suddenly get encryption, false positives included.' }, effects: { usr: -2 } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'Collega-admin', en: 'Fellow admin' },
        prompt: { nl: 'Je collega wil dezelfde policy met een script maken. Wat is het risico?', en: 'Your colleague wants to create the same policy with a script. What is the risk?' },
        code: `New-AutoSensitivityLabelPolicy -Name "BSN auto" \`
  -ApplySensitivityLabel "Strikt vertrouwelijk" \`
  -ExchangeLocation All -Mode Enable
New-AutoSensitivityLabelRule -Policy "BSN auto" -Name "BSN" \`
  -ContentContainsSensitiveInformation @{Name="Netherlands citizen's service (BSN) number"; minCount="1"}`,
        options: [
          { text: { nl: 'Er ontbreekt een label', en: 'A label is missing' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Het label staat er wel: -ApplySensitivityLabel.', en: 'The label is there: -ApplySensitivityLabel.' } },
          { text: { nl: 'De policy staat direct op Enable, zonder simulatie', en: 'The policy goes straight to Enable, without simulation' }, correct: true, effects: { sec: 1, usr: 1, cmp: 1 },
            feedback: { nl: 'Gebruik -Mode TestWithoutNotifications: hetzelfde als "Simulatie" in de portal.', en: 'Use -Mode TestWithoutNotifications: the same as "Simulation" in the portal.' } },
          { text: { nl: 'Exchange ondersteunt geen auto-labeling', en: 'Exchange does not support auto-labelling' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Dat doet het wel.', en: 'It does.' } },
        ],
        link: 'simuleren-voordat-je-labelt-wat-de-nieuwe-insights-van-auto-labeling-wel-en-niet-laten-zien',
      },
      {
        type: 'console', section: 'labels',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: {
          nl: 'Na de simulatie zet je de policy aan. Legal wil dat handmatig gekozen, láger geprioriteerde labels worden opgewaardeerd, maar dat een handmatig "Strikt vertrouwelijk" nooit wordt aangetast. Stel het in.',
          en: 'After the simulation you turn the policy on. Legal wants manually applied, lower-priority labels to be upgraded, but a manual "Highly confidential" must never be touched. Set it up.',
        },
        page: { nl: 'Auto-labeling-policy "BSN auto" bewerken', en: 'Edit auto-labelling policy "BSN auto"' },
        info: { nl: 'Labelprioriteit (laag → hoog): Openbaar · Algemeen · Vertrouwelijk · Strikt vertrouwelijk', en: 'Label priority (low → high): Public · General · Confidential · Highly confidential' },
        fields: [
          { id: 'overwrite', kind: 'radio', label: { nl: 'Bestaande handmatige labels', en: 'Existing manual labels' }, options: [
            { v: 'never', label: { nl: 'Nooit overschrijven', en: 'Never replace' } },
            { v: 'lower', label: { nl: 'Overschrijven als het handmatige label een lagere prioriteit heeft', en: 'Replace if the manual label has a lower priority' } }] },
          { id: 'mode', kind: 'radio', label: { nl: 'Modus', en: 'Mode' }, options: [
            { v: 'sim', label: { nl: 'Simulatie', en: 'Simulation' } }, { v: 'on', label: { nl: 'Aan', en: 'On' } }] },
        ],
        checks: [
          { test: (v) => v.overwrite === 'lower', good: { nl: 'Lagere labels worden opgewaardeerd, hogere blijven staan.', en: 'Lower labels are upgraded, higher ones stay.' }, bad: { nl: 'Met "nooit" blijft een te laag handmatig label staan.', en: 'With "never" a label that is too low stays.' }, effects: { cmp: -1 } },
          { test: (v) => v.mode === 'on', good: { nl: 'De policy staat aan.', en: 'The policy is on.' }, bad: { nl: 'De policy staat nog in simulatie.', en: 'The policy is still in simulation.' }, effects: { sec: -1 } },
        ],
        link: 'auto-labeling-in-productie-het-overschrijven-van-handmatige-labels-is-een-beleidskeuze-geen-vinkje',
      },
      {
        type: 'choice',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: { nl: 'Een document heeft handmatig "Strikt vertrouwelijk". Auto-labeling vindt geen BSN, maar wel een creditcardnummer, en wil "Vertrouwelijk" zetten. Wat gebeurt er?', en: 'A document is manually labelled "Highly confidential". Auto-labelling finds no BSN but a credit card number, and wants to apply "Confidential". What happens?' },
        options: [
          { text: { nl: 'Het handmatige label blijft staan: overschrijven gaat alleen omhoog', en: 'The manual label stays: replacing only goes up' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Een hoger handmatig label wordt nooit verlaagd.', en: 'A higher manual label is never downgraded.' } },
          { text: { nl: 'Het wordt "Vertrouwelijk"', en: 'It becomes "Confidential"' }, effects: { sec: -1, usr: 0, cmp: -1 },
            feedback: { nl: 'Dat zou een verlaging zijn; dat gebeurt niet.', en: 'That would be a downgrade; that does not happen.' } },
          { text: { nl: 'Het document krijgt twee labels', en: 'The document gets two labels' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Een item heeft altijd maar één sensitivity label.', en: 'An item always has just one sensitivity label.' } },
        ],
      },
      {
        type: 'console', section: 'retention',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: {
          nl: 'Contracten moeten 7 jaar bewaard blijven en daarna weg, maar Legal wil vóór het verwijderen meekijken. Maak het retentielabel.',
          en: 'Contracts must be kept for 7 years and then removed, but Legal wants to review before deletion. Create the retention label.',
        },
        page: { nl: 'Retentielabel maken: Contracten', en: 'Create retention label: Contracts' },
        fields: [
          { id: 'years', kind: 'number', min: 0, max: 50, label: { nl: 'Bewaren gedurende (jaren)', en: 'Retain for (years)' } },
          { id: 'end', kind: 'radio', label: { nl: 'Aan het einde van de bewaartermijn', en: 'At the end of the retention period' }, options: [
            { v: 'delete', label: { nl: 'Automatisch verwijderen', en: 'Delete automatically' } },
            { v: 'review', label: { nl: 'Disposition review starten', en: 'Start a disposition review' } },
            { v: 'nothing', label: { nl: 'Niets doen', en: 'Do nothing' } }] },
          { id: 'reviewer', kind: 'select', showIf: (v) => v.end === 'review', label: { nl: 'Reviewer', en: 'Reviewer' }, options: [
            { v: 'legal', label: { nl: 'Groep Legal', en: 'Legal group' } }, { v: 'it', label: { nl: 'Groep IT', en: 'IT group' } }, { v: 'all', label: { nl: 'Alle medewerkers', en: 'All employees' } }] },
        ],
        checks: [
          { test: (v) => v.years === 7, good: { nl: '7 jaar bewaren.', en: 'Retain for 7 years.' }, bad: { nl: 'De bewaartermijn klopt niet: Legal vroeg om 7 jaar.', en: 'The retention period is wrong: Legal asked for 7 years.' }, effects: { cmp: -2 } },
          { test: (v) => v.end === 'review', good: { nl: 'Disposition review: Legal beoordeelt vóór de definitieve verwijdering.', en: 'Disposition review: Legal reviews before final deletion.' }, bad: { nl: 'Zonder disposition review kijkt Legal niet mee.', en: 'Without disposition review Legal does not get to review.' }, effects: { cmp: -1 } },
          { test: (v) => v.end !== 'review' || v.reviewer === 'legal', good: { nl: 'Legal is de reviewer.', en: 'Legal is the reviewer.' }, bad: { nl: 'De verkeerde reviewer: het moet Legal zijn.', en: 'The wrong reviewer: it must be Legal.' }, effects: { cmp: -1 } },
        ],
        link: 'disposition-review-in-purview-de-tussenstap-voordat-je-data-definitief-verwijdert',
      },
      {
        type: 'choice',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: { nl: 'Bij de disposition review vindt Legal een contract dat nog in een geschil zit. Wat kan de reviewer doen?', en: 'During the disposition review Legal finds a contract that is still in a dispute. What can the reviewer do?' },
        options: [
          { text: { nl: 'De bewaartermijn verlengen of een ander retentielabel toepassen', en: 'Extend the retention period or apply a different retention label' }, correct: true, effects: { sec: 0, usr: 0, cmp: 2 },
            feedback: { nl: 'Daarvoor is de review: niets verdwijnt zonder dat iemand het heeft beoordeeld.', en: 'That is what the review is for: nothing disappears without someone reviewing it.' } },
          { text: { nl: 'Alleen goedkeuren; de verwijdering is niet te stoppen', en: 'Only approve; deletion cannot be stopped' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'De reviewer kan ook verlengen of opnieuw labelen.', en: 'The reviewer can also extend or relabel.' } },
          { text: { nl: 'Het contract naar zijn eigen OneDrive kopiëren', en: 'Copy the contract to their own OneDrive' }, effects: { sec: -1, usr: 0, cmp: -2 },
            feedback: { nl: 'Dan omzeil je het hele retentiebeleid.', en: 'That bypasses the whole retention policy.' } },
        ],
      },
    ],
  },

  // ---------------- LEVEL 4 ----------------
  {
    id: 4,
    release: '2026-12-14',
    name: { nl: 'Incident!', en: 'Incident!' },
    rank: { nl: 'Expert', en: 'Expert' },
    badge: { nl: 'Incident Responder', en: 'Incident Responder' },
    blurb: { nl: 'Een vertrekkende medewerker neemt data mee. eDiscovery, Audit en Adaptive Protection onder druk.', en: 'A departing employee is taking data. eDiscovery, Audit and Adaptive Protection under pressure.' },
    tasks: [
      {
        type: 'console', section: 'ediscovery',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: {
          nl: 'Jan Bakker (sales) vertrekt vrijdag en er zijn signalen dat hij klantdata meeneemt. Legal wil dat zijn mail en OneDrive niet verloren gaan. Regel het in eDiscovery.',
          en: 'Jan Bakker (sales) leaves on Friday and there are signs he is taking customer data. Legal wants his email and OneDrive preserved. Handle it in eDiscovery.',
        },
        page: { nl: 'Nieuwe case: Vertrek Jan Bakker', en: 'New case: Jan Bakker departure' },
        fields: [
          { id: 'custodian', kind: 'select', label: { nl: 'Custodian', en: 'Custodian' }, options: [
            { v: 'jan', label: 'Jan Bakker' }, { v: 'sanne', label: 'Sanne de Vries' }, { v: 'sales', label: { nl: 'Hele afdeling Sales', en: 'Entire Sales department' } }] },
          { id: 'locs', kind: 'checks', label: { nl: 'Locaties', en: 'Locations' }, options: [
            { v: 'mail', label: { nl: 'Mailbox', en: 'Mailbox' } }, { v: 'odb', label: 'OneDrive' }, { v: 'teams', label: 'Teams-chats' }] },
          { id: 'action', kind: 'radio', label: { nl: 'Actie', en: 'Action' }, options: [
            { v: 'hold', label: { nl: 'Hold plaatsen (alles bewaren, ook wat hij verwijdert)', en: 'Place a hold (preserve everything, including what he deletes)' } },
            { v: 'export', label: { nl: 'Nu exporteren', en: 'Export now' } }] },
        ],
        checks: [
          { test: (v) => v.custodian === 'jan', good: { nl: 'Jan als custodian: gericht, niet de hele afdeling.', en: 'Jan as custodian: targeted, not the whole department.' }, bad: { nl: 'De verkeerde custodian: het gaat om Jan.', en: 'Wrong custodian: this is about Jan.' }, effects: { usr: -1, cmp: -1 } },
          { test: (v) => (v.locs || []).includes('mail') && (v.locs || []).includes('odb'), good: { nl: 'Mailbox en OneDrive zijn meegenomen.', en: 'Mailbox and OneDrive are included.' }, bad: { nl: 'Mailbox én OneDrive moeten erin, zoals Legal vroeg.', en: 'Mailbox and OneDrive must both be included, as Legal asked.' }, effects: { cmp: -1 } },
          { test: (v) => v.action === 'hold', good: { nl: 'Een hold: alles blijft bewaard, ook wat hij nog verwijdert.', en: 'A hold: everything is preserved, including what he still deletes.' }, bad: { nl: 'Een export is een momentopname: wat hij daarna verwijdert, ben je kwijt.', en: 'An export is a snapshot: whatever he deletes afterwards is lost.' }, effects: { cmp: -2 } },
        ],
        link: 'ediscovery-in-purview-van-verzoek-tot-exportpakket',
      },
      {
        type: 'choice',
        from: { nl: 'Legal', en: 'Legal' },
        prompt: { nl: 'Merkt Jan dat er een hold op zijn mailbox staat?', en: 'Will Jan notice the hold on his mailbox?' },
        options: [
          { text: { nl: 'Nee: een hold werkt op de achtergrond. Hij kan gewoon werken en verwijderen, maar alles blijft bewaard.', en: 'No: a hold works in the background. He can keep working and deleting, but everything is preserved.' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Daarom is een hold de eerste stap: stil bewijs veiligstellen.', en: 'That is why a hold comes first: quietly preserve evidence.' } },
          { text: { nl: 'Ja: hij krijgt een melding in Outlook', en: 'Yes: he gets a notification in Outlook' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Een hold geeft geen melding aan de gebruiker (tenzij je zelf een notificatie stuurt).', en: 'A hold does not notify the user (unless you send a notice yourself).' } },
          { text: { nl: 'Ja: hij kan niets meer verwijderen', en: 'Yes: he can no longer delete anything' }, effects: { sec: 0, usr: -1, cmp: 0 },
            feedback: { nl: 'Hij kan wel verwijderen; de kopie blijft alleen bewaard.', en: 'He can delete; a copy is simply preserved.' } },
        ],
      },
      {
        type: 'console', section: 'audit',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: '"Welke bestanden heeft Jan de afgelopen 30 dagen gedownload?" Zoek het uit in de audit log.',
          en: '"Which files did Jan download in the last 30 days?" Find out in the audit log.',
        },
        page: { nl: 'Zoeken', en: 'Search' },
        fields: [
          { id: 'user', kind: 'select', label: { nl: 'Gebruiker', en: 'User' }, options: [
            { v: 'jan', label: 'Jan Bakker' }, { v: 'all', label: { nl: 'Alle gebruikers', en: 'All users' } }] },
          { id: 'acts', kind: 'checks', label: { nl: 'Activiteiten', en: 'Activities' }, options: [
            { v: 'dl', label: { nl: 'Bestand gedownload', en: 'Downloaded file' } }, { v: 'sync', label: { nl: 'Bestand gesynchroniseerd naar computer', en: 'Synced file to computer' } },
            { v: 'login', label: { nl: 'Aangemeld', en: 'Signed in' } }] },
          { id: 'range', kind: 'select', label: { nl: 'Periode', en: 'Period' }, options: [
            { v: '1', label: { nl: 'Laatste 24 uur', en: 'Last 24 hours' } }, { v: '7', label: { nl: 'Laatste 7 dagen', en: 'Last 7 days' } }, { v: '30', label: { nl: 'Laatste 30 dagen', en: 'Last 30 days' } }] },
        ],
        table: {
          after: 'range',
          head: [{ nl: 'Datum', en: 'Date' }, { nl: 'Activiteit', en: 'Activity' }, { nl: 'Items', en: 'Items' }],
          rows: (v) => (v.user === 'jan' && (v.acts || []).includes('dl') && v.range === '30' ? [
            ['02-12', { nl: 'Bestand gedownload', en: 'Downloaded file' }, '14'],
            ['09-12', { nl: 'Bestand gedownload', en: 'Downloaded file' }, '412 ⚠️'],
            ['09-12', { nl: 'Gesynchroniseerd', en: 'Synced' }, '96 ⚠️'],
          ] : null),
        },
        checks: [
          { test: (v) => v.user === 'jan', good: { nl: 'Gericht op Jan.', en: 'Focused on Jan.' }, bad: { nl: 'Zoek gericht op Jan; alle gebruikers geeft ruis.', en: 'Search specifically for Jan; all users adds noise.' } },
          { test: (v) => (v.acts || []).includes('dl') && (v.acts || []).includes('sync'), good: { nl: 'Downloaden én synchroniseren: allebei manieren om data mee te nemen.', en: 'Download and sync: both ways to take data.' }, bad: { nl: 'Neem ook synchroniseren mee: dat is ook een manier om bestanden mee te nemen.', en: 'Include sync too: that is another way to take files.' } },
          { test: (v) => v.range === '30', good: { nl: '30 dagen: de periode waar de CISO om vroeg. Op 9-12 zie je een piek.', en: '30 days: the period the CISO asked for. On 9-12 you see a spike.' }, bad: { nl: 'De periode is te kort: de CISO vroeg om 30 dagen.', en: 'The period is too short: the CISO asked for 30 days.' } },
        ],
      },
      {
        type: 'choice',
        from: { nl: 'HR', en: 'HR' },
        prompt: { nl: 'Hoe weet een Insider Risk-policy "Data theft by departing users" eigenlijk dát Jan vertrekt?', en: 'How does an Insider Risk policy "Data theft by departing users" actually know that Jan is leaving?' },
        options: [
          { text: { nl: 'Via een HR-connector met de ontslagdatum (of het verwijderen van het account in Entra)', en: 'Through an HR connector with the resignation date (or the account being deleted in Entra)' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Het vertrek is de trigger. Daarna let de policy op activiteiten zoals de piek op 9-12.', en: 'The departure is the trigger. Then the policy watches activity such as the spike on 9-12.' } },
          { text: { nl: 'Dat raadt het systeem op basis van zijn downloads', en: 'The system guesses it from his downloads' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Zonder trigger weet de policy niet wie vertrekt.', en: 'Without a trigger the policy does not know who is leaving.' } },
          { text: { nl: 'Via zijn sensitivity labels', en: 'Through his sensitivity labels' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Labels helpen bij het wegen van risico, maar zijn geen trigger.', en: 'Labels help weigh risk, but are not a trigger.' } },
        ],
      },
      {
        type: 'console', section: 'insider',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Insider Risk geeft Jan het risiconiveau "Verhoogd". Stel Adaptive Protection zo in dat alleen risicovolle gebruikers strenger worden behandeld, zonder dat de rest er last van heeft.',
          en: 'Insider Risk gives Jan the risk level "Elevated". Set up Adaptive Protection so that only risky users are treated more strictly, without bothering everyone else.',
        },
        page: { nl: 'Adaptive Protection', en: 'Adaptive Protection' },
        fields: [
          { id: 'on', kind: 'toggle', label: { nl: 'Adaptive Protection inschakelen', en: 'Turn on Adaptive Protection' } },
          { id: 'elevated', kind: 'select', label: { nl: 'Bij risiconiveau "Verhoogd"', en: 'At risk level "Elevated"' }, options: [
            { v: 'block', label: { nl: 'Uploads en USB blokkeren (DLP) en toegang beperken (Conditional Access)', en: 'Block uploads and USB (DLP) and restrict access (Conditional Access)' } },
            { v: 'mfa', label: { nl: 'Alleen extra MFA', en: 'Extra MFA only' } }, { v: 'none', label: { nl: 'Niets', en: 'Nothing' } }] },
          { id: 'minor', kind: 'select', label: { nl: 'Bij risiconiveau "Laag"', en: 'At risk level "Minor"' }, options: [
            { v: 'block', label: { nl: 'Blokkeren', en: 'Block' } }, { v: 'tips', label: { nl: 'Alleen policy tips / bewustwording', en: 'Policy tips / awareness only' } }] },
        ],
        checks: [
          { test: (v) => v.on === true, good: { nl: 'Adaptive Protection staat aan.', en: 'Adaptive Protection is on.' }, bad: { nl: 'Adaptive Protection staat nog uit.', en: 'Adaptive Protection is still off.' }, effects: { sec: -1 } },
          { test: (v) => v.elevated === 'block', good: { nl: 'Bij "Verhoogd" gaat het lek dicht: uploads en USB geblokkeerd.', en: 'At "Elevated" the leak is closed: uploads and USB blocked.' }, bad: { nl: 'Bij "Verhoogd" is meer nodig dan MFA: Jan heeft zijn wachtwoord al.', en: 'At "Elevated" more than MFA is needed: Jan already has his password.' }, effects: { sec: -2 } },
          { test: (v) => v.minor === 'tips', good: { nl: 'Bij "Laag" alleen bewustwording: niemand wordt onnodig geblokkeerd.', en: 'At "Minor" only awareness: nobody is blocked needlessly.' }, bad: { nl: 'Blokkeren bij "Laag" raakt veel collega\'s die niets fout doen.', en: 'Blocking at "Minor" hits many colleagues who did nothing wrong.' }, effects: { usr: -2 } },
        ],
        link: 'insider-risk-als-conditie-in-conditional-access-zo-richt-je-adaptive-protection-veilig-in',
      },
      {
        type: 'order',
        from: { nl: 'HR', en: 'HR' },
        prompt: {
          nl: 'Boss level. Je hebt nu alle bouwstenen gezien. In welke volgorde zet je ze in bij de volgende vertrekkende medewerker met verdachte signalen?',
          en: 'Boss level. You have now seen all the building blocks. In what order do you use them for the next departing employee with suspicious signals?',
        },
        steps: [
          { nl: 'eDiscovery-hold op mailbox en OneDrive', en: 'eDiscovery hold on mailbox and OneDrive' },
          { nl: 'In de audit log de downloads van de afgelopen 30 dagen zoeken', en: 'Search the audit log for downloads in the last 30 days' },
          { nl: 'Adaptive Protection laten ingrijpen bij risiconiveau "Verhoogd"', en: 'Let Adaptive Protection act at risk level "Elevated"' },
          { nl: 'Op de laatste werkdag het account blokkeren', en: 'Block the account on the last working day' },
        ],
        feedback: {
          nl: 'Eerst bewijs veiligstellen, dan onderzoeken, dan stil het lek dichten, en pas op het laatst het account blokkeren. Direct blokkeren alarmeert de medewerker en kost bewijs.',
          en: 'First preserve evidence, then investigate, then quietly close the leak, and only at the end block the account. Blocking right away alerts the employee and costs evidence.',
        },
      },
    ],
  },
  // ---------------- LEVEL 5 ----------------
  {
    id: 5,
    release: '2026-12-21',
    name: { nl: 'AI in de tenant', en: 'AI in the tenant' },
    rank: { nl: 'Expert+', en: 'Expert+' },
    badge: { nl: 'AI Data Guardian', en: 'AI Data Guardian' },
    blurb: { nl: 'Copilot, DSPM for AI, oversharing en shadow AI. Vier portal-opdrachten die op elkaar voortbouwen.', en: 'Copilot, DSPM for AI, oversharing and shadow AI. Four portal tasks that build on each other.' },
    tasks: [
      {
        type: 'console', section: 'dspm',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: '"Iedereen gebruikt AI, maar ik heb geen idee wat erin gaat." Copilot wordt uitgerold en medewerkers gebruiken ook ChatGPT en Gemini. Zorg eerst voor inzicht.',
          en: '"Everyone uses AI, but I have no idea what goes in." Copilot is being rolled out and staff also use ChatGPT and Gemini. Get visibility first.',
        },
        page: { nl: 'Aan de slag', en: 'Get started' },
        info: { nl: 'Nog geen AI-interacties zichtbaar.', en: 'No AI interactions visible yet.' },
        fields: [
          { id: 'audit', kind: 'toggle', label: { nl: 'AI-interacties vastleggen (prompts en antwoorden via audit)', en: 'Capture AI interactions (prompts and responses via audit)' } },
          { id: 'apps', kind: 'checks', label: { nl: 'Welke AI-apps wil je zichtbaar maken?', en: 'Which AI apps do you want visibility into?' }, options: [
            { v: 'copilot', label: 'Microsoft 365 Copilot' }, { v: 'chatgpt', label: 'ChatGPT' }, { v: 'gemini', label: 'Gemini' }] },
          { id: 'approach', kind: 'radio', label: { nl: 'Aanpak', en: 'Approach' }, options: [
            { v: 'monitor', label: { nl: 'Eerst inzicht: alleen monitoren', en: 'Visibility first: monitor only' } },
            { v: 'blockall', label: { nl: 'Alle AI-apps meteen blokkeren', en: 'Block all AI apps right away' } }] },
        ],
        checks: [
          { test: (v) => v.audit === true, good: { nl: 'Interacties worden vastgelegd: zonder die data heb je niets om naar te kijken.', en: 'Interactions are captured: without that data there is nothing to look at.' }, bad: { nl: 'Zonder vastleggen blijft DSPM for AI leeg.', en: 'Without capturing, DSPM for AI stays empty.' }, effects: { cmp: -1 } },
          { test: (v) => ['copilot', 'chatgpt', 'gemini'].every((x) => (v.apps || []).includes(x)), good: { nl: 'Alle drie: ook de apps die je niet beheert. Daar zit het grootste risico.', en: 'All three: including the apps you do not manage. That is where the biggest risk is.' }, bad: { nl: 'Neem ook de niet-beheerde apps mee: daar gaat de data het makkelijkst naar buiten.', en: 'Include the unmanaged apps too: that is where data leaves most easily.' }, effects: { sec: -1 } },
          { test: (v) => v.approach === 'monitor', good: { nl: 'Eerst meten, dan beslissen.', en: 'Measure first, then decide.' }, bad: { nl: 'Alles blokkeren drijft medewerkers naar privé-telefoons, buiten je zicht.', en: 'Blocking everything drives staff to personal phones, out of sight.' }, effects: { usr: -3 } },
        ],
        link: 'dspm-voor-ai-van-de-eerste-prompt-tot-een-policy',
      },
      {
        type: 'choice',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: { nl: 'Een week later toont DSPM for AI: 40 prompts met BSN\'s naar ChatGPT. "Mooi, dan is dat dus opgelost?"', en: 'A week later DSPM for AI shows: 40 prompts with BSNs to ChatGPT. "Great, so that is solved?"' },
        options: [
          { text: { nl: 'Nee: zichtbaarheid is geen bescherming. Nu weet je wát er gebeurt; tegenhouden vraagt een policy.', en: 'No: visibility is not protection. Now you know what happens; stopping it needs a policy.' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Precies het punt: inzicht is stap één, maar er is nog niets tegengehouden.', en: 'Exactly the point: visibility is step one, but nothing has been stopped yet.' } },
          { text: { nl: 'Ja: DSPM for AI blokkeert gevoelige prompts automatisch', en: 'Yes: DSPM for AI blocks sensitive prompts automatically' }, effects: { sec: -2, usr: 0, cmp: -1 },
            feedback: { nl: 'Nee: DSPM for AI laat zien en adviseert. Tegenhouden doe je met DLP.', en: 'No: DSPM for AI shows and recommends. Blocking is done with DLP.' } },
          { text: { nl: 'Ja, als je de rapportage maandelijks exporteert', en: 'Yes, if you export the report monthly' }, effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: { nl: 'Een rapport houdt niets tegen.', en: 'A report stops nothing.' } },
        ],
        link: 'dspm-for-ai-zichtbaarheid-is-niet-hetzelfde-als-bescherming',
      },
      {
        type: 'console', section: 'dspm',
        from: { nl: 'HR-directeur', en: 'HR director' },
        prompt: {
          nl: '"Copilot vatte voor een stagiair het fusiedossier samen!" Zoek in het oversharing-overzicht de oorzaak en pak de juiste site aan.',
          en: '"Copilot summarised the merger file for an intern!" Find the cause in the oversharing overview and fix the right site.',
        },
        page: { nl: 'Oversharing-overzicht', en: 'Oversharing overview' },
        table: {
          head: [{ nl: 'Site', en: 'Site' }, { nl: 'Gevoelige items', en: 'Sensitive items' }, { nl: 'Toegang', en: 'Access' }],
          rows: [
            ['Directie-Fusie2027', '212', { nl: 'Iedereen behalve externe gebruikers ⚠️', en: 'Everyone except external users ⚠️' }],
            ['Kantine-Menu', '0', { nl: 'Iedereen behalve externe gebruikers', en: 'Everyone except external users' }],
            ['HR-Personeelsdossiers', '1.240', { nl: 'Alleen HR', en: 'HR only' }],
          ],
        },
        fields: [
          { id: 'site', kind: 'radio', label: { nl: 'Welke site eerst?', en: 'Which site first?' }, options: [
            { v: 'fusie', label: 'Directie-Fusie2027' }, { v: 'kantine', label: 'Kantine-Menu' }, { v: 'hr', label: 'HR-Personeelsdossiers' }] },
          { id: 'action', kind: 'select', label: { nl: 'Maatregel', en: 'Action' }, options: [
            { v: 'restrict', label: { nl: 'Toegang beperken tot de directie en eigenaren', en: 'Restrict access to the board and owners' } },
            { v: 'delete', label: { nl: 'Site verwijderen', en: 'Delete the site' } },
            { v: 'nocopilot', label: { nl: 'Copilot uitzetten voor alle medewerkers', en: 'Turn off Copilot for all employees' } }] },
        ],
        checks: [
          { test: (v) => v.site === 'fusie', good: { nl: 'De fusiesite: gevoelig én open voor iedereen.', en: 'The merger site: sensitive and open to everyone.' }, bad: { nl: 'Kijk naar de combinatie: gevoelige items én toegang voor iedereen.', en: 'Look at the combination: sensitive items and access for everyone.' }, effects: { sec: -2 } },
          { test: (v) => v.action === 'restrict', good: { nl: 'Rechten herstellen: de oorzaak weg, Copilot blijft voor iedereen werken.', en: 'Fix the permissions: the cause is removed, Copilot keeps working for everyone.' },
            bad: { nl: 'Verwijderen kost data; Copilot uitzetten bestrijdt het symptoom. De stagiair kan het bestand dan nog steeds zelf openen.', en: 'Deleting loses data; turning off Copilot treats the symptom. The intern can still open the file directly.' }, effects: { usr: -2, cmp: -1 } },
        ],
        link: 'copilot-maakt-je-oversharing-probleem-zichtbaar-en-dat-is-precies-de-waarde',
      },
      {
        type: 'choice',
        from: { nl: 'HR-directeur', en: 'HR director' },
        prompt: { nl: '"Dus Copilot had een lek in de beveiliging?"', en: '"So Copilot had a security hole?"' },
        options: [
          { text: { nl: 'Nee: Copilot toont alleen wat de gebruiker al mocht openen. Het maakte een bestaand rechtenprobleem zichtbaar.', en: 'No: Copilot only shows what the user could already open. It exposed an existing permissions problem.' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Copilot is de zaklamp, niet de inbreker.', en: 'Copilot is the flashlight, not the burglar.' } },
          { text: { nl: 'Ja: Copilot omzeilt SharePoint-rechten', en: 'Yes: Copilot bypasses SharePoint permissions' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Copilot respecteert de rechten van de gebruiker.', en: 'Copilot respects the user\'s permissions.' } },
          { text: { nl: 'Ja: het moet een licentiefout zijn', en: 'Yes: it must be a licensing error' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'Licenties bepalen wie Copilot heeft, niet wat Copilot ziet.', en: 'Licences decide who has Copilot, not what Copilot sees.' } },
        ],
      },
      {
        type: 'console', section: 'dlp',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Fusiedocumenten krijgen voortaan het label "Strikt vertrouwelijk". Zorg dat Copilot die documenten nooit gebruikt om antwoorden te maken, ook niet voor de directie.',
          en: 'Merger documents will now get the label "Highly confidential". Make sure Copilot never uses those documents to build answers, not even for the board.',
        },
        page: { nl: 'Policy maken', en: 'Create policy' },
        fields: [
          { id: 'loc', kind: 'radio', label: { nl: 'Locatie', en: 'Location' }, options: [
            { v: 'copilot', label: 'Microsoft 365 Copilot' }, { v: 'exo', label: 'Exchange' }, { v: 'devices', label: { nl: 'Apparaten', en: 'Devices' } }] },
          { id: 'cond', kind: 'select', label: { nl: 'Voorwaarde', en: 'Condition' }, options: [
            { v: 'label', label: { nl: 'Inhoud heeft sensitivity label "Strikt vertrouwelijk"', en: 'Content has sensitivity label "Highly confidential"' } },
            { v: 'word', label: { nl: 'Bestandsnaam bevat "fusie"', en: 'File name contains "merger"' } }] },
          { id: 'act', kind: 'radio', label: { nl: 'Actie', en: 'Action' }, options: [
            { v: 'noprocess', label: { nl: 'Copilot mag deze inhoud niet verwerken', en: 'Prevent Copilot from processing this content' } },
            { v: 'alert', label: { nl: 'Alleen een melding sturen', en: 'Only send an alert' } }] },
        ],
        checks: [
          { test: (v) => v.loc === 'copilot', good: { nl: 'De Copilot-locatie: daar grijpt de regel in.', en: 'The Copilot location: that is where the rule acts.' }, bad: { nl: 'Verkeerde locatie: het gaat om wat Copilot verwerkt.', en: 'Wrong location: this is about what Copilot processes.' }, effects: { sec: -2 } },
          { test: (v) => v.cond === 'label', good: { nl: 'Op label: elk fusiedocument, hoe het ook heet.', en: 'On label: every merger document, whatever its name.' }, bad: { nl: 'Op bestandsnaam mis je "Project Noord.docx".', en: 'On file name you miss "Project North.docx".' }, effects: { sec: -1 } },
          { test: (v) => v.act === 'noprocess', good: { nl: 'Copilot laat deze documenten buiten zijn antwoorden.', en: 'Copilot leaves these documents out of its answers.' }, bad: { nl: 'Een melding houdt niets tegen.', en: 'An alert stops nothing.' }, effects: { sec: -1 } },
        ],
        link: 'dlp-houdt-externe-e-mail-buiten-copilot',
      },
      {
        type: 'choice',
        from: { nl: 'Directiesecretaris', en: 'Board secretary' },
        prompt: { nl: 'Een week later vat Copilot tóch een fusiedocument samen. Het bestand heet "Notulen-Noord.docx". Wat is de meest waarschijnlijke oorzaak?', en: 'A week later Copilot still summarises a merger document. The file is called "Minutes-North.docx". Most likely cause?' },
        options: [
          { text: { nl: 'Het document heeft (nog) geen label, dus de regel matcht niet', en: 'The document has no label (yet), so the rule does not match' }, correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: { nl: 'Label-gebaseerde regels zijn zo sterk als je labeling. Combineer met auto-labeling.', en: 'Label-based rules are only as strong as your labelling. Combine with auto-labelling.' } },
          { text: { nl: 'De DLP-regel werkt alleen in Outlook', en: 'The DLP rule only works in Outlook' }, effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: { nl: 'De regel staat op de Copilot-locatie.', en: 'The rule is on the Copilot location.' } },
          { text: { nl: 'Copilot negeert DLP', en: 'Copilot ignores DLP' }, effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: { nl: 'Niet waar, mits het document het label heeft.', en: 'Not true, provided the document has the label.' } },
        ],
        link: 'externe-mail-uit-je-copilot-grounding-houden',
      },
      {
        type: 'console', section: 'dlp',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Laatste stap: shadow AI. Medewerkers plakken BSN\'s in ChatGPT en Gemini via de browser. Copilot is wél toegestaan. Richt Endpoint DLP zo in dat plakken van BSN\'s naar niet-beheerde AI-sites wordt tegengehouden, met een uitweg voor uitzonderingen.',
          en: 'Final step: shadow AI. Staff paste BSNs into ChatGPT and Gemini in the browser. Copilot is allowed. Configure Endpoint DLP so pasting BSNs into unmanaged AI sites is stopped, with an escape hatch for exceptions.',
        },
        page: { nl: 'Endpoint DLP-instellingen: groep gevoelige domeinen', en: 'Endpoint DLP settings: sensitive domain group' },
        fields: [
          { id: 'domains', kind: 'checks', label: { nl: 'Domeinen in de groep "Generatieve AI (niet beheerd)"', en: 'Domains in the group "Generative AI (unmanaged)"' }, options: [
            { v: 'chatgpt', label: 'chatgpt.com' }, { v: 'gemini', label: 'gemini.google.com' }, { v: 'copilot', label: 'copilot.microsoft.com' }] },
          { id: 'paste', kind: 'select', label: { nl: 'Actie bij plakken van BSN naar deze groep', en: 'Action when pasting a BSN into this group' }, options: [
            { v: 'audit', label: { nl: 'Alleen auditen', en: 'Audit only' } }, { v: 'override', label: { nl: 'Blokkeren met override', en: 'Block with override' } }, { v: 'block', label: { nl: 'Altijd blokkeren', en: 'Always block' } }] },
        ],
        checks: [
          { test: (v) => (v.domains || []).includes('chatgpt') && (v.domains || []).includes('gemini'), good: { nl: 'ChatGPT en Gemini zitten in de groep.', en: 'ChatGPT and Gemini are in the group.' }, bad: { nl: 'Er ontbreekt een niet-beheerde AI-site.', en: 'An unmanaged AI site is missing.' }, effects: { sec: -2 } },
          { test: (v) => !(v.domains || []).includes('copilot'), good: { nl: 'Copilot blijft erbuiten: dat is je beheerde, toegestane AI.', en: 'Copilot stays out: that is your managed, allowed AI.' }, bad: { nl: 'Copilot hoort hier niet in: dan blokkeer je je eigen toegestane AI.', en: 'Copilot does not belong here: you would block your own allowed AI.' }, effects: { usr: -2 } },
          { test: (v) => v.paste === 'override', good: { nl: 'Blokkeren met override: veilig, met een uitweg die wordt gelogd.', en: 'Block with override: safe, with an escape hatch that is logged.' }, bad: { nl: 'Alleen auditen houdt niets tegen; altijd blokkeren laat geen ruimte voor uitzonderingen.', en: 'Audit only stops nothing; always block leaves no room for exceptions.' }, effects: { sec: -1, usr: -1 } },
        ],
        link: 'dlp-op-de-netwerklaag-purview-gaat-shadow-ai-achterna-waar-de-browser-ophoudt',
      },
      {
        type: 'order',
        from: { nl: 'CISO', en: 'CISO' },
        prompt: {
          nl: 'Eindbaas: de raad van bestuur wil een AI-uitrolplan voor de hele organisatie. Zet de stappen in de juiste volgorde.',
          en: 'Final boss: the board wants an AI rollout plan for the whole organisation. Put the steps in the right order.',
        },
        steps: [
          { nl: 'Inzicht: AI-interacties vastleggen in DSPM for AI', en: 'Visibility: capture AI interactions in DSPM for AI' },
          { nl: 'Oversharing opruimen: rechten op gevoelige sites herstellen', en: 'Clean up oversharing: fix permissions on sensitive sites' },
          { nl: 'Labelen: gevoelige documenten (automatisch) labelen', en: 'Label: label sensitive documents (automatically)' },
          { nl: 'Afdwingen: DLP voor Copilot en Endpoint DLP tegen shadow AI', en: 'Enforce: DLP for Copilot and Endpoint DLP against shadow AI' },
        ],
        feedback: {
          nl: 'Eerst zien, dan opruimen, dan labelen, en pas dan afdwingen. DLP op labels werkt pas als de labels er zijn.',
          en: 'First see, then clean up, then label, and only then enforce. DLP on labels only works once the labels exist.',
        },
      },
    ],
  },

];

// Aangekondigde levels (nog niet gebouwd): tonen als teaser in het menu.
export const UPCOMING = [
  { id: 6, release: '2026-12-28', name: { nl: 'Endpoint DLP en apparaten', en: 'Endpoint DLP and devices' } },
];

// Blogposts per opdracht (aanvulling op task.link) en per level ("Lees verder op de blog").
// Sleutel: "<level>-<opdrachtnummer vanaf 0>". Alleen gepubliceerde posts worden getoond.
export const TASK_LINKS = {
  '1-4': 'copilot-maakt-je-oversharing-probleem-zichtbaar-en-dat-is-precies-de-waarde',
  '2-3': 'custom-sensitive-information-types-in-purview-dlp-voorbij-de-templates',
  '2-4': 'gericht-externe-toegang-blokkeren-in-sharepoint-en-onedrive-dlp-wordt-granulair',
  '2-5': 'dlp-alert-aggregation-de-ruis-daalt-het-werk-blijft',
  '3-3': 'auto-labeling-in-productie-het-overschrijven-van-handmatige-labels-is-een-beleidskeuze-geen-vinkje',
  '3-5': 'retentie-in-purview-waarom-bewaren-en-vernietigen-bij-elkaar-horen',
  '4-1': 'ediscovery-in-purview-van-verzoek-tot-exportpakket',
  '4-2': 'purview-configureert-defender-onderzoekt-de-rolverdeling-die-je-soc-nog-moet-inhalen',
  '4-3': 'insider-risk-management-en-ai-apps-monitoring-is-nu-ook-een-kostenbeslissing',
  '4-5': 'insider-risk-als-conditie-in-conditional-access-zo-richt-je-adaptive-protection-veilig-in',
};

export const LEVEL_BLOGS = {
  1: ['copilot-maakt-je-oversharing-probleem-zichtbaar-en-dat-is-precies-de-waarde', 'custom-sensitive-information-types-in-purview-dlp-voorbij-de-templates', 'purview-configureert-defender-onderzoekt-de-rolverdeling-die-je-soc-nog-moet-inhalen'],
  2: ['waarom-ik-bij-de-meeste-klanten-dlp-verkies-boven-encryptie', 'auto-labeling-zonder-ruis-false-positives-wegwerken-voordat-je-de-policy-aanzet', 'custom-sensitive-information-types-in-purview-dlp-voorbij-de-templates', 'dlp-alert-aggregation-de-ruis-daalt-het-werk-blijft'],
  3: ['simuleren-voordat-je-labelt-wat-de-nieuwe-insights-van-auto-labeling-wel-en-niet-laten-zien', 'auto-labeling-in-productie-het-overschrijven-van-handmatige-labels-is-een-beleidskeuze-geen-vinkje', 'retentie-in-purview-waarom-bewaren-en-vernietigen-bij-elkaar-horen', 'disposition-review-in-purview-de-tussenstap-voordat-je-data-definitief-verwijdert'],
  5: ['dspm-voor-ai-van-de-eerste-prompt-tot-een-policy', 'dspm-for-ai-zichtbaarheid-is-niet-hetzelfde-als-bescherming', 'copilot-maakt-je-oversharing-probleem-zichtbaar-en-dat-is-precies-de-waarde', 'dlp-op-de-netwerklaag-purview-gaat-shadow-ai-achterna-waar-de-browser-ophoudt'],
  4: ['ediscovery-in-purview-van-verzoek-tot-exportpakket', 'insider-risk-als-conditie-in-conditional-access-zo-richt-je-adaptive-protection-veilig-in', 'insider-risk-management-en-ai-apps-monitoring-is-nu-ook-een-kostenbeslissing'],
};
