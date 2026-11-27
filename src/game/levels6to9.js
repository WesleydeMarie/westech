// Tenant Admin, levels 6 t/m 9. Zelfde opbouw als de levels in content.js
// (zie de uitleg bovenaan dat bestand). T(nl, en) is alleen een verkorte schrijfwijze.
const T = (nl, en) => ({ nl, en });

export const LEVELS_6_9 = [
  // ---------------- LEVEL 6 ----------------
  {
    id: 6,
    visible: '2026-12-07', // verschijnt dan op techwes.nl (op slot tot release)
    release: '2026-12-28',
    name: T('Endpoint DLP en apparaten', 'Endpoint DLP and devices'),
    rank: T('Specialist', 'Specialist'),
    badge: T('Endpoint Guardian', 'Endpoint Guardian'),
    blurb: T('USB, printers en de laptop in het veld. DLP op het apparaat, gescoped op gebruiker én apparaat.', 'USB, printers and the laptop in the field. DLP on the device, scoped on user and device.'),
    tasks: [
      {
        type: 'console', section: 'devices',
        from: T('Finance-manager', 'Finance manager'),
        prompt: T(
          '"Onze buitendienst kopieert klantlijsten naar USB-sticks." Blokkeer USB op de veldlaptops van finance, maar niet op de vaste werkplekken op kantoor. De CISO wil eerst zien wat het effect is.',
          '"Our field staff copy customer lists to USB sticks." Block USB on finance\'s field laptops, but not on the fixed office workstations. The CISO wants to see the impact first.',
        ),
        page: T('Endpoint DLP-policy: bereik en actie', 'Endpoint DLP policy: scope and action'),
        info: T('Apparaatgroepen komen uit Microsoft Entra (dynamische groepen).', 'Device groups come from Microsoft Entra (dynamic groups).'),
        fields: [
          { id: 'scope', kind: 'radio', label: T('Bereik', 'Scope'), options: [
            { v: 'users', label: T('Finance-gebruikers, op al hun apparaten', 'Finance users, on all their devices') },
            { v: 'group', label: T('Finance-gebruikers op apparaatgroep "Laptops-Veld"', 'Finance users on device group "Laptops-Field"') }] },
          { id: 'usb', kind: 'select', label: T('Actie bij kopiëren naar USB', 'Action when copying to USB'), options: [
            { v: 'audit', label: T('Alleen auditen', 'Audit only') }, { v: 'override', label: T('Blokkeren met override', 'Block with override') }, { v: 'block', label: T('Blokkeren', 'Block') }] },
          { id: 'mode', kind: 'radio', label: T('Status', 'Status'), options: [
            { v: 'sim', label: T('Simulatiemodus', 'Simulation mode') }, { v: 'on', label: T('Direct aan', 'On right away') }] },
        ],
        checks: [
          { test: (v) => v.scope === 'group', good: T('Gebruiker plus apparaatgroep: de regel geldt alleen op de veldlaptops.', 'User plus device group: the rule only applies on the field laptops.'), bad: T('Op gebruikers alleen raak je ook de vaste werkplekken. Dat is precies wat finance niet wil.', 'Scoping on users alone also hits the office workstations. That is exactly what finance does not want.'), effects: { usr: -2 } },
          { test: (v) => v.usb === 'block', good: T('Een strenge blokkade, zoals gevraagd.', 'A strict block, as requested.'), bad: T('Finance vroeg om een blokkade op de veldlaptops.', 'Finance asked for a block on the field laptops.'), effects: { sec: -1 } },
          { test: (v) => v.mode === 'sim', good: T('Eerst simuleren: je ziet wat er geblokkeerd zou worden, zonder dat iemand vastloopt.', 'Simulate first: you see what would be blocked without anyone getting stuck.'), bad: T('De CISO wilde eerst het effect zien. Begin in simulatie.', 'The CISO wanted to see the impact first. Start in simulation.'), effects: { usr: -1 } },
        ],
        link: 'endpoint-dlp-wordt-eindelijk-beheersbaar-device-scoping-health-reports-en-advanced-hunting',
      },
      {
        type: 'choice',
        from: T('Finance-medewerker', 'Finance employee'),
        prompt: T('"Op mijn MacBook op kantoor kan ik gewoon naar USB kopiëren. Is de regel kapot?"', '"On my MacBook in the office I can still copy to USB. Is the rule broken?"'),
        options: [
          { text: T('Nee: de policy geldt alleen op de apparaatgroep met veldlaptops. Dit is zo bedoeld.', 'No: the policy only applies to the device group of field laptops. This is by design.'), correct: true, effects: { sec: 0, usr: 1, cmp: 1 },
            feedback: T('Precies: het beleid gaat nu over de combinatie van gebruiker en apparaat.', 'Exactly: the policy is now about the combination of user and device.') },
          { text: T('Ja: Endpoint DLP werkt niet op macOS', 'Yes: Endpoint DLP does not work on macOS'), effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: T('Endpoint DLP ondersteunt ook macOS. Hier is het de scoping.', 'Endpoint DLP also supports macOS. Here it is the scoping.') },
          { text: T('Ja: de policy moet opnieuw worden gepubliceerd', 'Yes: the policy has to be republished'), effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: T('Er is niets mis. Het apparaat valt buiten de groep.', 'Nothing is wrong. The device is outside the group.') },
        ],
      },
      {
        type: 'console', section: 'devices',
        from: T('Helpdesk', 'Helpdesk'),
        prompt: T(
          'De policy draait een week. Het health report laat zien dat niet elk apparaat goed meedoet. Kies het apparaat dat het grootste risico is en de juiste vervolgstap.',
          'The policy has run for a week. The health report shows not every device is taking part properly. Pick the device with the biggest risk and the right next step.',
        ),
        page: T('Apparaten: health report', 'Devices: health report'),
        table: {
          head: [T('Apparaat', 'Device'), T('Groep', 'Group'), T('Status', 'Status')],
          rows: [
            ['LT-0412', 'Laptops-Veld', T('Geen DLP-signaal sinds 14 dagen ⚠️', 'No DLP signal for 14 days ⚠️')],
            ['LT-0518', 'Laptops-Veld', T('Gezond', 'Healthy')],
            ['PC-0033', T('Kantoor', 'Office'), T('Configuratie 2 dagen oud', 'Configuration 2 days old')],
          ],
        },
        fields: [
          { id: 'device', kind: 'radio', label: T('Welk apparaat eerst?', 'Which device first?'), options: [
            { v: 'lt0412', label: 'LT-0412' }, { v: 'lt0518', label: 'LT-0518' }, { v: 'pc0033', label: 'PC-0033' }] },
          { id: 'action', kind: 'select', label: T('Vervolgstap', 'Next step'), options: [
            { v: 'repair', label: T('Onderzoeken en herstellen via apparaatbeheer (onboarding, sensor, updates)', 'Investigate and repair via device management (onboarding, sensor, updates)') },
            { v: 'exclude', label: T('Uit de policy halen, dan zeurt het rapport niet meer', 'Remove it from the policy so the report stops complaining') },
            { v: 'ignore', label: T('Niets doen: het staat in de goede groep', 'Do nothing: it is in the right group') }] },
        ],
        checks: [
          { test: (v) => v.device === 'lt0412', good: T('LT-0412: een veldlaptop zonder signaal is een blinde vlek precies waar de regel moet werken.', 'LT-0412: a field laptop without signal is a blind spot exactly where the rule must work.'), bad: T('Kijk naar het apparaat dat niets meer meldt, in de groep waar de blokkade moet gelden.', 'Look at the device that reports nothing, in the group where the block must apply.'), effects: { sec: -2 } },
          { test: (v) => v.action === 'repair', good: T('Herstellen: zonder werkende sensor geldt de policy daar in de praktijk niet.', 'Repair: without a working sensor the policy does not apply there in practice.'), bad: T('Uitzonderen of negeren maakt de blinde vlek permanent.', 'Excluding or ignoring makes the blind spot permanent.'), effects: { sec: -1, cmp: -1 } },
        ],
      },
      {
        type: 'choice',
        from: T('CISO', 'CISO'),
        prompt: T('"Wat heeft LT-0412 de afgelopen week naar USB gekopieerd? Ik wil het per bestand zien."', '"What did LT-0412 copy to USB last week? I want to see it per file."'),
        options: [
          { text: T('Advanced Hunting: een query op de endpointgebeurtenissen van dat apparaat', 'Advanced Hunting: a query on that device\'s endpoint events'), correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: T('Met Advanced Hunting zoek je per apparaat en per bestand, en kun je het combineren met andere signalen.', 'With Advanced Hunting you search per device and per file, and can combine it with other signals.') },
          { text: T('Content explorer', 'Content explorer'), effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: T('Content explorer laat zien waar gevoelige data staat, niet wat er met een bestand is gebeurd.', 'Content explorer shows where sensitive data is stored, not what happened to a file.') },
          { text: T('Track & Revoke', 'Track & Revoke'), effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: T('Track & Revoke werkt alleen voor versleutelde gelabelde bestanden en toont alleen openingspogingen.', 'Track & Revoke only works for encrypted labelled files and only shows open attempts.') },
        ],
        link: 'track-revoke-intrekken-werkt-maar-pas-als-de-use-license-verloopt',
      },
      {
        type: 'console', section: 'devices',
        from: T('HR-directeur', 'HR director'),
        prompt: T(
          '"Er lag een personeelsdossier op de printer in de openbare hal." Documenten met het label "HR-vertrouwelijk" mogen alleen nog op de HR-printers in de afgesloten ruimte worden geprint.',
          '"A personnel file was lying on the printer in the public hall." Documents labelled "HR confidential" may only be printed on the HR printers in the locked room.',
        ),
        page: T('Endpoint DLP-instellingen: printergroepen', 'Endpoint DLP settings: printer groups'),
        fields: [
          { id: 'group', kind: 'radio', label: T('Printergroep', 'Printer group'), options: [
            { v: 'hr', label: T('"HR-printers" (afgesloten ruimte)', '"HR printers" (locked room)') }, { v: 'all', label: T('Alle printers', 'All printers') }] },
          { id: 'act', kind: 'select', label: T('Actie bij printen van "HR-vertrouwelijk"', 'Action when printing "HR confidential"'), options: [
            { v: 'allowgroup', label: T('Toestaan op de printergroep, elders blokkeren', 'Allow on the printer group, block elsewhere') },
            { v: 'block', label: T('Printen overal blokkeren', 'Block printing everywhere') },
            { v: 'audit', label: T('Alleen auditen', 'Audit only') }] },
        ],
        checks: [
          { test: (v) => v.group === 'hr', good: T('Een aparte groep voor de veilige printers.', 'A separate group for the safe printers.'), bad: T('Met alle printers in één groep kun je geen onderscheid maken.', 'With all printers in one group you cannot tell them apart.'), effects: { sec: -1 } },
          { test: (v) => v.act === 'allowgroup', good: T('HR kan blijven printen, maar alleen waar niemand meekijkt.', 'HR can keep printing, but only where nobody looks over their shoulder.'), bad: T('Overal blokkeren stopt het HR-werk; alleen auditen stopt het lek niet.', 'Blocking everywhere stops HR\'s work; audit only does not stop the leak.'), effects: { usr: -2, sec: -1 } },
        ],
      },
      {
        type: 'choice',
        from: T('Medewerker', 'Employee'),
        prompt: T('"Ik werk vanavond thuis op mijn eigen pc. Geldt Endpoint DLP daar ook?"', '"Tonight I am working at home on my own PC. Does Endpoint DLP apply there too?"'),
        options: [
          { text: T('Nee: Endpoint DLP werkt alleen op onboarded apparaten. Voor niet-beheerde apparaten beperk je de toegang, bijvoorbeeld alleen via de browser zonder downloaden.', 'No: Endpoint DLP only works on onboarded devices. For unmanaged devices you limit access, for example browser-only without downloads.'), correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: T('Klopt. Een privé-pc is voor Endpoint DLP onzichtbaar, dus daar regel je het met toegangsbeleid.', 'Correct. A personal PC is invisible to Endpoint DLP, so you handle it with access policy.') },
          { text: T('Ja: de policy volgt de gebruiker overal', 'Yes: the policy follows the user everywhere'), effects: { sec: -2, usr: 0, cmp: -1 },
            feedback: T('Alleen op apparaten waar de sensor draait.', 'Only on devices where the sensor runs.') },
          { text: T('Ja, zodra hij inlogt op Outlook op het web', 'Yes, as soon as they sign in to Outlook on the web'), effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: T('Dan gelden de DLP-regels van Exchange, niet die van het apparaat.', 'Then Exchange DLP rules apply, not the device rules.') },
        ],
        link: 'insider-risk-als-conditie-in-conditional-access-zo-richt-je-adaptive-protection-veilig-in',
      },
      {
        type: 'order',
        from: T('CISO', 'CISO'),
        prompt: T('Eindbaas: Endpoint DLP gaat naar alle 800 apparaten. Zet het uitrolplan in de juiste volgorde.', 'Final boss: Endpoint DLP goes to all 800 devices. Put the rollout plan in the right order.'),
        steps: [
          T('Apparaten onboarden en apparaatgroepen maken in Entra', 'Onboard devices and create device groups in Entra'),
          T('Policies in simulatie zetten per apparaatgroep', 'Put policies in simulation per device group'),
          T('Health report en activiteiten bekijken, regels bijstellen', 'Review the health report and activity, tune the rules'),
          T('Afdwingen: blokkeren, met override waar het werk het vraagt', 'Enforce: block, with override where the work needs it'),
        ],
        feedback: T('Eerst zorgen dat de apparaten meedoen, dan meten, dan bijstellen en pas daarna blokkeren.', 'First make sure the devices take part, then measure, then tune, and only then block.'),
      },
    ],
  },

  // ---------------- LEVEL 7 ----------------
  {
    id: 7,
    visible: '2026-12-14', // verschijnt dan op techwes.nl (op slot tot release)
    release: '2027-01-04',
    name: T('DLP overal', 'DLP everywhere'),
    rank: T('Specialist+', 'Specialist+'),
    badge: T('Cloud DLP Architect', 'Cloud DLP Architect'),
    blurb: T('Box, Salesforce, het netwerk en de zoekopdrachten van Copilot. DLP voorbij de grenzen van je tenant.', 'Box, Salesforce, the network and Copilot\'s web searches. DLP beyond your tenant\'s borders.'),
    tasks: [
      {
        type: 'choice',
        from: T('Collega-beheerder', 'Fellow admin'),
        prompt: T('"Onze DLP-file policies in Defender for Cloud Apps op Box en Salesforce blijven toch gewoon werken?"', '"Our DLP file policies in Defender for Cloud Apps on Box and Salesforce will just keep working, right?"'),
        options: [
          { text: T('Nee: Microsoft depreceert ze op 6 januari 2027. Daarna worden ze niet meer afgedwongen. We moeten ze opnieuw bouwen in Purview DLP.', 'No: Microsoft deprecates them on 6 January 2027. After that they are no longer enforced. We have to rebuild them in Purview DLP.'), correct: true, effects: { sec: 1, usr: 0, cmp: 2 },
            feedback: T('En ze migreren niet vanzelf. Wie wacht op een migratietool, plant met andermans agenda.', 'And they do not migrate by themselves. Waiting for a migration tool means planning on someone else\'s schedule.') },
          { text: T('Ja: ze worden automatisch naar Purview gemigreerd', 'Yes: they are migrated to Purview automatically'), effects: { sec: -1, usr: 0, cmp: -2 },
            feedback: T('Er is een tool aangekondigd, maar een aankondiging is geen planning. Je bouwt ze opnieuw op.', 'A tool has been announced, but an announcement is not a plan. You rebuild them.') },
          { text: T('Alleen de policies op SharePoint stoppen, de rest blijft', 'Only the SharePoint policies stop, the rest stays'), effects: { sec: -1, usr: 0, cmp: -1 },
            feedback: T('Het raakt ook de gekoppelde apps van derden, zoals Box en Salesforce.', 'It also affects the connected third-party apps, such as Box and Salesforce.') },
        ],
        link: 'dlp-in-defender-for-cloud-apps-verdwijnt-wat-je-voor-6-januari-2027-geregeld-moet-hebben',
      },
      {
        type: 'console', section: 'dlp',
        from: T('CISO', 'CISO'),
        prompt: T(
          'Bouw de oude regel na in Purview: BSN\'s die in Box en Salesforce staan, moeten worden gevonden en beschermd. Dropbox gebruiken we niet meer. Het moet eerst zonder impact draaien.',
          'Rebuild the old rule in Purview: BSNs stored in Box and Salesforce must be found and protected. We no longer use Dropbox. It must run without impact first.',
        ),
        page: T('Policy maken: apps van derden (data at rest)', 'Create policy: third-party apps (data at rest)'),
        info: T('Connectors in Defender for Cloud Apps: Box ✅ · Salesforce ✅ · Dropbox ❌ niet gekoppeld', 'Connectors in Defender for Cloud Apps: Box ✅ · Salesforce ✅ · Dropbox ❌ not connected'),
        fields: [
          { id: 'apps', kind: 'checks', label: T('Apps', 'Apps'), options: [
            { v: 'box', label: 'Box' }, { v: 'sf', label: 'Salesforce' }, { v: 'dropbox', label: 'Dropbox' }, { v: 'gws', label: 'Google Workspace' }] },
          { id: 'sit', kind: 'select', label: T('Gevoelige informatie', 'Sensitive information'), options: [
            { v: 'bsn', label: T('Burgerservicenummer (BSN)', 'Dutch citizen service number (BSN)') }, { v: 'cc', label: T('Creditcardnummer', 'Credit card number') }] },
          { id: 'mode', kind: 'radio', label: T('Status', 'Status'), options: [
            { v: 'sim', label: T('Simulatiemodus', 'Simulation mode') }, { v: 'on', label: T('Direct aan', 'On right away') }] },
        ],
        checks: [
          { test: (v) => { const a = v.apps || []; return a.includes('box') && a.includes('sf') && !a.includes('dropbox') && !a.includes('gws'); }, good: T('Precies de apps die in gebruik zijn en een connector hebben.', 'Exactly the apps that are in use and have a connector.'), bad: T('Kies alleen Box en Salesforce: Dropbox is niet gekoppeld en Google Workspace gebruikt Nordwind niet.', 'Pick only Box and Salesforce: Dropbox is not connected and Nordwind does not use Google Workspace.'), effects: { sec: -1 } },
          { test: (v) => v.sit === 'bsn', good: T('Zelfde classificatie als in Microsoft 365: één regelset voor alles.', 'Same classification as in Microsoft 365: one rule set for everything.'), bad: T('Het ging om BSN\'s.', 'This was about BSNs.'), effects: { cmp: -1 } },
          { test: (v) => v.mode === 'sim', good: T('Eerst simuleren, vergelijken met de oude regel, dan aanzetten.', 'Simulate first, compare with the old rule, then switch on.'), bad: T('De CISO vroeg om eerst zonder impact te draaien.', 'The CISO asked to run without impact first.'), effects: { usr: -1 } },
        ],
        link: 'purview-dlp-beschermt-nu-ook-data-at-rest-in-box-dropbox-google-workspace-en-salesforce',
      },
      {
        type: 'choice',
        from: T('Sales-manager', 'Sales manager'),
        prompt: T('"We zijn toch weer met Dropbox begonnen. Kun je die even in de policy zetten?" Waarom kan dat nu niet?', '"We started using Dropbox again after all. Can you add it to the policy?" Why is that not possible right now?'),
        options: [
          { text: T('Er is geen werkende app-connector in Defender for Cloud Apps. Zonder connector kan Purview niet bij de data.', 'There is no working app connector in Defender for Cloud Apps. Without a connector Purview cannot reach the data.'), correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: T('Dit traject begint dus niet in Purview, maar bij de connector en de API-toegang van Dropbox.', 'So this starts not in Purview, but with the connector and Dropbox API access.') },
          { text: T('Purview ondersteunt Dropbox helemaal niet', 'Purview does not support Dropbox at all'), effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: T('Dropbox is een van de ondersteunde apps. Het ontbreekt hier aan de connector.', 'Dropbox is one of the supported apps. What is missing here is the connector.') },
          { text: T('Je hebt een aparte Dropbox-licentie van Microsoft nodig', 'You need a separate Dropbox licence from Microsoft'), effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: T('Het gaat om de koppeling, niet om een extra licentie.', 'It is about the connection, not an extra licence.') },
        ],
      },
      {
        type: 'console', section: 'dlp',
        from: T('CISO', 'CISO'),
        prompt: T(
          'Medewerkers gebruiken AI-desktopapps en add-ins. Endpoint DLP in de browser ziet dat niet. Laat Purview het verkeer onderweg controleren via Global Secure Access en houd BSN\'s tegen die naar niet-beheerde AI gaan.',
          'Staff use AI desktop apps and add-ins. Endpoint DLP in the browser does not see that. Let Purview inspect the traffic in transit via Global Secure Access and stop BSNs going to unmanaged AI.',
        ),
        page: T('Policy maken: netwerk (Global Secure Access)', 'Create policy: network (Global Secure Access)'),
        fields: [
          { id: 'scope', kind: 'radio', label: T('Welke apps?', 'Which apps?'), options: [
            { v: 'catalog', label: T('Adaptive app scope: All unmanaged AI apps', 'Adaptive app scope: All unmanaged AI apps') },
            { v: 'one', label: T('Alleen chatgpt.com', 'Only chatgpt.com') }] },
          { id: 'acts', kind: 'checks', label: T('Activiteiten', 'Activities'), options: [
            { v: 'send', label: T('Tekst die naar de app gaat', 'Text sent to the app') }, { v: 'upload', label: T('Bestand uploaden', 'File upload') },
            { v: 'recv', label: T('Tekst die terugkomt', 'Text coming back') }, { v: 'dl', label: T('Bestand downloaden', 'File download') }] },
          { id: 'act', kind: 'select', label: T('Actie', 'Action'), options: [
            { v: 'audit', label: 'Audit' }, { v: 'block', label: 'Block' }] },
        ],
        checks: [
          { test: (v) => v.scope === 'catalog', good: T('Een hele categorie: ook de AI-app die volgende maand populair wordt.', 'A whole category: including the AI app that becomes popular next month.'), bad: T('Eén domein mist Gemini, Claude en alles wat er nog bijkomt.', 'One domain misses Gemini, Claude and everything still to come.'), effects: { sec: -2 } },
          { test: (v) => (v.acts || []).includes('send') && (v.acts || []).includes('upload'), good: T('Tekst en bestanden die naar buiten gaan: daar zit het lek.', 'Text and files going out: that is where the leak is.'), bad: T('Voor een uitgaand lek heb je in elk geval tekst naar de app en uploads nodig.', 'For an outbound leak you need at least text to the app and uploads.'), effects: { sec: -1 } },
          { test: (v) => v.act === 'block', good: T('Tegenhouden, zoals gevraagd.', 'Stop it, as requested.'), bad: T('Audit houdt niets tegen.', 'Audit stops nothing.'), effects: { sec: -1 } },
        ],
        link: 'purview-dlp-op-de-netwerklaag-wat-global-secure-access-wel-en-niet-tegenhoudt',
      },
      {
        type: 'choice',
        from: T('Medewerker', 'Employee'),
        prompt: T('"Geldt die netwerkcontrole ook als ik thuis op mijn privé-laptop ChatGPT gebruik?"', '"Does that network check also apply when I use ChatGPT at home on my personal laptop?"'),
        options: [
          { text: T('Nee: Global Secure Access stuurt het verkeer van beheerde apparaten door. Een privé-laptop valt erbuiten.', 'No: Global Secure Access routes traffic from managed devices. A personal laptop is outside it.'), correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: T('Elke laag heeft een grens. Daarom combineer je netwerk-DLP met toegangsbeleid voor niet-beheerde apparaten.', 'Every layer has a boundary. That is why you combine network DLP with access policy for unmanaged devices.') },
          { text: T('Ja: alle internetverkeer van Nordwind-medewerkers gaat via Microsoft', 'Yes: all internet traffic of Nordwind staff goes through Microsoft'), effects: { sec: -1, usr: 0, cmp: -1 },
            feedback: T('Alleen verkeer van apparaten met de client, niet van iemands privé-laptop.', 'Only traffic from devices with the client, not from someone\'s personal laptop.') },
          { text: T('Ja, als hij inlogt met zijn werkaccount bij ChatGPT', 'Yes, if they sign in to ChatGPT with their work account'), effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: T('Inloggen verandert niets aan de route van het verkeer.', 'Signing in does not change the traffic route.') },
        ],
        link: 'dlp-op-de-netwerklaag-purview-gaat-shadow-ai-achterna-waar-de-browser-ophoudt',
      },
      {
        type: 'console', section: 'dlp',
        from: T('Sales-manager', 'Sales manager'),
        prompt: T(
          'Sales vraagt Copilot: "Zoek concurrentie-info voor klant NW-4471023." Copilot zoekt daarvoor op het web, buiten de tenant. Zorg dat klantnummers en BSN\'s niet in die zoekopdrachten meereizen, zonder Copilot onbruikbaar te maken.',
          'Sales asks Copilot: "Find competitor info for customer NW-4471023." Copilot searches the web for that, outside the tenant. Make sure customer numbers and BSNs do not travel along in those searches, without making Copilot useless.',
        ),
        page: T('Policy maken: Microsoft 365 Copilot (zoekopdrachten op het web)', 'Create policy: Microsoft 365 Copilot (web searches)'),
        fields: [
          { id: 'web', kind: 'radio', label: T('Aanpak', 'Approach'), options: [
            { v: 'off', label: T('Zoeken op het web helemaal uitzetten', 'Turn off web search completely') },
            { v: 'dlp', label: T('Zoeken op het web aan, DLP controleert elke zoekopdracht', 'Web search on, DLP checks every search query') }] },
          { id: 'sits', kind: 'checks', label: T('Gevoelige informatie', 'Sensitive information'), options: [
            { v: 'bsn', label: 'BSN' }, { v: 'nw', label: T('Nordwind-klantnummer (eigen type)', 'Nordwind customer number (custom type)') }, { v: 'postcode', label: T('Postcode', 'Postal code') }] },
        ],
        checks: [
          { test: (v) => v.web === 'dlp', good: T('Copilot blijft actueel, en gevoelige zoekopdrachten gaan de deur niet uit.', 'Copilot stays current, and sensitive search queries do not leave.'), bad: T('Uitzetten kost Copilot veel bruikbaarheid. Dat wilde Sales juist niet.', 'Turning it off costs Copilot much of its usefulness. That is exactly what Sales did not want.'), effects: { usr: -2 } },
          { test: (v) => { const s = v.sits || []; return s.includes('bsn') && s.includes('nw') && !s.includes('postcode'); }, good: T('BSN en het eigen klantnummer. Een postcode alleen is geen geheim.', 'BSN and the own customer number. A postal code on its own is not a secret.'), bad: T('Het klantnummer hoort erbij, de postcode niet: die blokkeert te veel gewone zoekopdrachten.', 'The customer number belongs in, the postal code does not: it blocks too many normal searches.'), effects: { sec: -1, usr: -1 } },
        ],
        link: 'copilot-zoekt-op-het-web-en-jouw-data-reist-mee-dlp-voor-web-searches',
      },
      {
        type: 'order',
        from: T('CISO', 'CISO'),
        prompt: T('Eindbaas: de migratie uit Defender for Cloud Apps moet vóór 6 januari 2027 klaar zijn, en dat valt midden in de change freeze. Zet het plan in de juiste volgorde.', 'Final boss: the migration out of Defender for Cloud Apps must be done before 6 January 2027, right in the middle of the change freeze. Put the plan in the right order.'),
        steps: [
          T('Inventariseren: welke file policies draaien er, op welke apps?', 'Inventory: which file policies run, on which apps?'),
          T('Connectors controleren in Defender for Cloud Apps', 'Check the connectors in Defender for Cloud Apps'),
          T('De regels opnieuw bouwen in Purview DLP, in simulatie', 'Rebuild the rules in Purview DLP, in simulation'),
          T('Resultaten vergelijken met de oude policies en aanzetten', 'Compare results with the old policies and switch on'),
          T('De oude policies in Defender for Cloud Apps uitzetten', 'Switch off the old policies in Defender for Cloud Apps'),
        ],
        feedback: T('Eerst weten wat je hebt, dan zorgen dat Purview erbij kan, dan nabouwen en vergelijken. Pas als het nieuwe werkt, zet je het oude uit.', 'First know what you have, then make sure Purview can reach it, then rebuild and compare. Only when the new works do you switch off the old.'),
      },
    ],
  },

  // ---------------- LEVEL 8 ----------------
  {
    id: 8,
    visible: '2026-12-21', // verschijnt dan op techwes.nl (op slot tot release)
    release: '2027-01-11',
    name: T('Je eigen gevoelige data', 'Your own sensitive data'),
    rank: T('Architect', 'Architect'),
    badge: T('Classification Architect', 'Classification Architect'),
    blurb: T('Eigen informatietypes, Exact Data Match en een DLP-omgeving die niet verzuipt in ruis.', 'Custom information types, Exact Data Match and a DLP environment that does not drown in noise.'),
    tasks: [
      {
        type: 'console', section: 'classifiers',
        from: T('Klantenservice', 'Customer service'),
        prompt: T(
          'Nordwind-klantnummers zien eruit als "NW-" gevolgd door 7 cijfers, bijvoorbeeld NW-4471023. Er bestaat geen ingebouwd type voor. Maak er een dat betrouwbaar genoeg is om op te blokkeren.',
          'Nordwind customer numbers look like "NW-" followed by 7 digits, for example NW-4471023. There is no built-in type for it. Create one reliable enough to block on.',
        ),
        page: T('Eigen gevoelig informatietype maken', 'Create custom sensitive information type'),
        fields: [
          { id: 'pattern', kind: 'select', label: T('Patroon (regex)', 'Pattern (regex)'), options: [
            { v: 'nw7', label: 'NW-\\d{7}' }, { v: 'd7', label: '\\d{7}' }, { v: 'nwany', label: 'NW.*' }] },
          { id: 'kw', kind: 'checks', label: T('Ondersteunende trefwoorden in de buurt', 'Supporting keywords nearby'), options: [
            { v: 'klant', label: 'klantnummer' }, { v: 'deb', label: 'debiteurnummer' }, { v: 'de', label: 'de' }] },
          { id: 'conf', kind: 'radio', label: T('Vertrouwen voor de blokkeerregel', 'Confidence for the blocking rule'), options: [
            { v: 'high', label: T('Hoog: patroon plus trefwoord in de buurt', 'High: pattern plus keyword nearby') },
            { v: 'low', label: T('Laag: alleen het patroon', 'Low: pattern only') }] },
        ],
        checks: [
          { test: (v) => v.pattern === 'nw7', good: T('Precies het formaat: niet meer en niet minder.', 'Exactly the format: no more, no less.'), bad: T('Zeven losse cijfers vangt elk telefoonnummer; "NW.*" vangt elke zin met NW.', 'Seven bare digits catch every phone number; "NW.*" catches every sentence with NW.'), effects: { usr: -2 } },
          { test: (v) => { const k = v.kw || []; return k.includes('klant') && !k.includes('de'); }, good: T('Trefwoorden die echt bij een klantnummer horen.', 'Keywords that really belong with a customer number.'), bad: T('"de" staat in elke Nederlandse zin en voegt niets toe.', '"de" is in every Dutch sentence and adds nothing.'), effects: { usr: -1 } },
          { test: (v) => v.conf === 'high', good: T('Blokkeren op hoog vertrouwen: minder valse meldingen.', 'Block on high confidence: fewer false positives.'), bad: T('Blokkeren op alleen het patroon raakt te veel gewone documenten.', 'Blocking on the pattern alone hits too many normal documents.'), effects: { usr: -1 } },
        ],
        link: 'custom-sensitive-information-types-in-purview-dlp-voorbij-de-templates',
      },
      {
        type: 'choice',
        from: T('Inkoop', 'Purchasing'),
        prompt: T('"Mijn bestelling bij een leverancier werd geblokkeerd. Hun ordernummers beginnen óók met NW-." Wat helpt het meest?', '"My order with a supplier was blocked. Their order numbers also start with NW-." What helps most?'),
        options: [
          { text: T('Voor blokkeren eisen dat er een trefwoord als "klantnummer" in de buurt staat', 'Require a keyword like "customer number" nearby before blocking'), correct: true, effects: { sec: 0, usr: 2, cmp: 1 },
            feedback: T('Het patroon klopt, de context ontbreekt. Ondersteunend bewijs maakt het onderscheid.', 'The pattern matches, the context is missing. Supporting evidence makes the difference.') },
          { text: T('Het informatietype verwijderen', 'Delete the information type'), effects: { sec: -2, usr: 1, cmp: -1 },
            feedback: T('Dan beschermt niets meer de echte klantnummers.', 'Then nothing protects the real customer numbers anymore.') },
          { text: T('Inkoop uitzonderen van alle DLP-regels', 'Exclude Purchasing from all DLP rules'), effects: { sec: -1, usr: 1, cmp: -1 },
            feedback: T('Een gat voor een hele afdeling, om één vals alarm op te lossen.', 'A hole for a whole department, to fix one false alarm.') },
        ],
        link: 'auto-labeling-zonder-ruis-false-positives-wegwerken-voordat-je-de-policy-aanzet',
      },
      {
        type: 'console', section: 'classifiers',
        from: T('Legal', 'Legal'),
        prompt: T(
          '"Alleen BSN\'s van onze échte klanten mogen alarm geven, niet elk getal dat op een BSN lijkt." Zet Exact Data Match op met de export uit het CRM.',
          '"Only BSNs of our real customers should raise alarms, not every number that looks like a BSN." Set up Exact Data Match with the CRM export.',
        ),
        page: T('Exact Data Match: schema en upload', 'Exact Data Match: schema and upload'),
        table: {
          head: [T('Kolom in de CRM-export', 'Column in the CRM export'), T('Voorbeeld', 'Example')],
          rows: [
            ['BSN', '123456782'], [T('Naam', 'Name'), 'J. de Vries'], [T('Postcode', 'Postal code'), '1234 AB'], [T('Klantcategorie', 'Customer category'), 'Particulier'],
          ],
        },
        fields: [
          { id: 'primary', kind: 'radio', label: T('Primair zoekveld (waarop DLP eerst zoekt)', 'Primary match field (what DLP searches for first)'), options: [
            { v: 'bsn', label: 'BSN' }, { v: 'naam', label: T('Naam', 'Name') }, { v: 'cat', label: T('Klantcategorie', 'Customer category') }] },
          { id: 'extra', kind: 'checks', label: T('Aanvullend bewijs (verhoogt het vertrouwen)', 'Supporting evidence (raises confidence)'), options: [
            { v: 'naam', label: T('Naam', 'Name') }, { v: 'postcode', label: T('Postcode', 'Postal code') }, { v: 'cat', label: T('Klantcategorie', 'Customer category') }] },
          { id: 'upload', kind: 'radio', label: T('Hoe gaat de data naar de tenant?', 'How does the data go to the tenant?'), options: [
            { v: 'hash', label: T('Lokaal hashen met een geheime waarde, alleen de hashes uploaden', 'Hash locally with a secret value, upload only the hashes') },
            { v: 'csv', label: T('Het CSV-bestand uploaden', 'Upload the CSV file') }] },
        ],
        checks: [
          { test: (v) => v.primary === 'bsn', good: T('Het BSN is uniek en heeft een herkenbaar patroon: een goed primair veld.', 'The BSN is unique and has a recognisable pattern: a good primary field.'), bad: T('Kies het unieke veld met een vast patroon: het BSN.', 'Pick the unique field with a fixed pattern: the BSN.'), effects: { sec: -2 } },
          { test: (v) => { const e = v.extra || []; return e.includes('naam') && !e.includes('cat'); }, good: T('BSN plus naam in de buurt maakt een match pas echt overtuigend.', 'BSN plus name nearby makes a match truly convincing.'), bad: T('Neem de naam mee; "Particulier" zegt niets over wie het is.', 'Include the name; "Private customer" says nothing about who it is.'), effects: { sec: -1 } },
          { test: (v) => v.upload === 'hash', good: T('Klopt: de leesbare data verlaat je omgeving niet.', 'Correct: the readable data never leaves your environment.'), bad: T('Een leesbaar klantbestand uploaden is precies wat je niet wilt. EDM werkt met hashes.', 'Uploading a readable customer file is exactly what you do not want. EDM works with hashes.'), effects: { cmp: -2 } },
        ],
        link: 'exact-data-match-in-purview-hash-based-dlp-voor-je-echte-klantdata',
      },
      {
        type: 'choice',
        from: T('SOC-analist', 'SOC analyst'),
        prompt: T('Drie maanden later: BSN\'s van nieuwe klanten geven geen DLP-match. Die van oude klanten wel. Oorzaak?', 'Three months later: BSNs of new customers give no DLP match. Those of old customers do. Cause?'),
        options: [
          { text: T('De hashes zijn sinds de eerste upload niet ververst', 'The hashes have not been refreshed since the first upload'), correct: true, effects: { sec: 1, usr: 0, cmp: 1 },
            feedback: T('EDM is zo actueel als je laatste upload. Plan het verversen vast in, bijvoorbeeld wekelijks.', 'EDM is only as current as your last upload. Schedule the refresh, for example weekly.') },
          { text: T('EDM werkt maar drie maanden', 'EDM only works for three months'), effects: { sec: 0, usr: 0, cmp: 0 },
            feedback: T('Er is geen houdbaarheidsdatum; de referentiedata is verouderd.', 'There is no expiry date; the reference data is outdated.') },
          { text: T('Nieuwe klanten hebben een ander BSN-formaat', 'New customers have a different BSN format'), effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: T('Het formaat is hetzelfde; ze staan alleen niet in je gehashte bestand.', 'The format is the same; they are just not in your hashed file.') },
        ],
      },
      {
        type: 'console', section: 'dlp',
        from: T('CISO', 'CISO'),
        prompt: T(
          'Na jaren DLP is het een wildgroei. De DLP Policy Optimizer heeft aanbevelingen klaarstaan. Pak de grootste bron van ruis aan, op een verantwoorde manier.',
          'After years of DLP it has grown wild. The DLP Policy Optimizer has recommendations ready. Tackle the biggest source of noise, responsibly.',
        ),
        page: T('DLP Policy Optimizer: aanbevelingen', 'DLP Policy Optimizer: recommendations'),
        table: {
          head: [T('Aanbeveling', 'Recommendation'), T('Impact', 'Impact')],
          rows: [
            [T('Regel "Alles met 9 cijfers" veroorzaakt 61% van alle alerts', 'Rule "Anything with 9 digits" causes 61% of all alerts'), T('Hoog', 'High')],
            [T('Policies "AVG 2023" en "BSN Exchange" overlappen grotendeels', 'Policies "GDPR 2023" and "BSN Exchange" largely overlap'), T('Middel', 'Medium')],
            [T('Policy "Test Jan" staat 400 dagen in simulatie', 'Policy "Test Jan" has been in simulation for 400 days'), T('Laag', 'Low')],
          ],
        },
        fields: [
          { id: 'first', kind: 'radio', label: T('Wat pak je eerst aan?', 'What do you tackle first?'), options: [
            { v: 'nine', label: T('"Alles met 9 cijfers"', '"Anything with 9 digits"') }, { v: 'overlap', label: T('De overlappende policies', 'The overlapping policies') }, { v: 'test', label: '"Test Jan"' }] },
          { id: 'how', kind: 'select', label: T('Hoe?', 'How?'), options: [
            { v: 'review', label: T('Bespreken met de eigenaar, aanpassen in simulatie, dan doorvoeren', 'Discuss with the owner, adjust in simulation, then roll out') },
            { v: 'apply', label: T('De aanbeveling direct in productie toepassen', 'Apply the recommendation directly in production') },
            { v: 'ignore', label: T('Negeren: het is maar een AI-advies', 'Ignore it: it is only AI advice') }] },
        ],
        checks: [
          { test: (v) => v.first === 'nine', good: T('De grootste winst: meer dan de helft van alle ruis.', 'The biggest win: more than half of all noise.'), bad: T('Begin waar de meeste ruis vandaan komt.', 'Start where most of the noise comes from.'), effects: { usr: -1 } },
          { test: (v) => v.how === 'review', good: T('Bewijs uit de optimizer, de beslissing bij een mens die de context kent.', 'Evidence from the optimizer, the decision with a human who knows the context.'), bad: T('Blind toepassen kan iets breken wat de optimizer niet kent; negeren laat het bewijs liggen.', 'Applying blindly can break something the optimizer does not know about; ignoring leaves the evidence unused.'), effects: { sec: -1, usr: -1 } },
        ],
        link: 'de-dlp-policy-optimizer-ai-die-je-policy-wildgroei-doorzoekt',
      },
      {
        type: 'choice',
        from: T('SOC-analist', 'SOC analyst'),
        prompt: T('"Ik krijg nog steeds tientallen losse alerts per dag over dezelfde medewerker en hetzelfde bestand."', '"I still get dozens of separate alerts per day about the same employee and the same file."'),
        options: [
          { text: T('Alert aggregation aanzetten: verwante meldingen worden gebundeld. Minder ruis, maar elke bundel moet nog steeds beoordeeld worden.', 'Turn on alert aggregation: related alerts are bundled. Less noise, but every bundle still needs a review.'), correct: true, effects: { sec: 1, usr: 1, cmp: 1 },
            feedback: T('De ruis daalt, het werk blijft. Dat moet de SOC ook weten.', 'The noise drops, the work remains. The SOC needs to know that too.') },
          { text: T('Alerts voor die medewerker uitzetten', 'Turn off alerts for that employee'), effects: { sec: -2, usr: 0, cmp: -1 },
            feedback: T('Dan zie je het niet meer als het wél misgaat.', 'Then you no longer see it when something does go wrong.') },
          { text: T('De drempel verhogen naar 1000 items', 'Raise the threshold to 1000 items'), effects: { sec: -1, usr: 0, cmp: -1 },
            feedback: T('Dan mis je de kleine lekken die er écht toe doen.', 'Then you miss the small leaks that really matter.') },
        ],
        link: 'dlp-alert-aggregation-de-ruis-daalt-het-werk-blijft',
      },
      {
        type: 'order',
        from: T('CISO', 'CISO'),
        prompt: T('Eindbaas: de raad van bestuur wil weten hoe de classificatie volwassen wordt. Zet de stappen in de juiste volgorde.', 'Final boss: the board wants to know how classification matures. Put the steps in the right order.'),
        steps: [
          T('Beginnen met de ingebouwde informatietypes, in simulatie', 'Start with the built-in information types, in simulation'),
          T('Eigen informatietypes voor Nordwind-nummers, met trefwoorden', 'Custom information types for Nordwind numbers, with keywords'),
          T('Exact Data Match voor de echte klantdata', 'Exact Data Match for the real customer data'),
          T('Hashes periodiek verversen en policies opschonen met de optimizer', 'Refresh hashes regularly and clean up policies with the optimizer'),
        ],
        feedback: T('Van breed naar precies, en dan onderhouden. Classificatie is nooit af.', 'From broad to precise, and then maintain. Classification is never finished.'),
      },
    ],
  },

  // ---------------- LEVEL 9 ----------------
  {
    id: 9,
    visible: '2026-12-28', // verschijnt dan op techwes.nl (op slot tot release)
    release: '2027-01-18',
    name: T('Agents aan het werk', 'Agents at work'),
    rank: T('Architect+', 'Architect+'),
    badge: T('Agent Governor', 'Agent Governor'),
    blurb: T('Agents als nieuwe gebruikers: registreren, rechten beperken, prompt injection en de EU AI Act.', 'Agents as the new users: register, limit permissions, prompt injection and the EU AI Act.'),
    tasks: [
      {
        type: 'console', section: 'agents',
        from: T('CISO', 'CISO'),
        prompt: T(
          '"Hoeveel agents draaien er eigenlijk bij ons?" Het agentregister laat zien wat er is. Pak de agent aan met het grootste risico.',
          '"How many agents are actually running here?" The agent registry shows what is there. Deal with the agent with the biggest risk.',
        ),
        page: T('Agentregister', 'Agent registry'),
        table: {
          head: [T('Agent', 'Agent'), T('Gebouwd in', 'Built in'), T('Eigenaar', 'Owner'), T('Status', 'Status')],
          rows: [
            [T('Offerte-assistent', 'Quote assistant'), 'Copilot Studio', 'Sales', T('Geregistreerd', 'Registered')],
            [T('Cv-sorteerder', 'CV sorter'), 'Foundry', T('Onbekend', 'Unknown'), T('Niet geregistreerd ⚠️', 'Not registered ⚠️')],
            [T('Mail-samenvatter', 'Mail summariser'), 'Copilot Studio', T('Klantenservice', 'Customer service'), T('Geregistreerd', 'Registered')],
          ],
        },
        fields: [
          { id: 'agent', kind: 'radio', label: T('Welke agent eerst?', 'Which agent first?'), options: [
            { v: 'offerte', label: T('Offerte-assistent', 'Quote assistant') }, { v: 'cv', label: T('Cv-sorteerder', 'CV sorter') }, { v: 'mail', label: T('Mail-samenvatter', 'Mail summariser') }] },
          { id: 'action', kind: 'select', label: T('Maatregel', 'Action'), options: [
            { v: 'register', label: T('Registreren: eigen Entra Agent ID en een eigenaar toewijzen', 'Register: own Entra Agent ID and assign an owner') },
            { v: 'delete', label: T('Direct verwijderen zonder overleg', 'Delete right away without consultation') },
            { v: 'ignore', label: T('Laten draaien, het is maar een test', 'Leave it running, it is only a test') }] },
        ],
        checks: [
          { test: (v) => v.agent === 'cv', good: T('Geen eigenaar, niet geregistreerd en hij beoordeelt mensen. Dat is de eerste.', 'No owner, not registered and it judges people. That is the first one.'), bad: T('Kijk naar de agent zonder eigenaar en zonder registratie.', 'Look at the agent without an owner and without registration.'), effects: { sec: -2, cmp: -1 } },
          { test: (v) => v.action === 'register', good: T('Met een eigen identiteit valt de agent onder Conditional Access, reviews en audit.', 'With its own identity the agent falls under Conditional Access, reviews and audit.'), bad: T('Verwijderen zonder overleg breekt mogelijk een proces; negeren laat het risico staan.', 'Deleting without consultation may break a process; ignoring leaves the risk in place.'), effects: { usr: -1, sec: -1 } },
        ],
        link: 'agents-zijn-de-nieuwe-gebruikers-en-jouw-tenant-is-er-nog-niet-klaar-voor',
      },
      {
        type: 'choice',
        from: T('HR-directeur', 'HR director'),
        prompt: T('"De cv-sorteerder rangschikt sollicitanten voor de recruiters. We hebben hem niet zelf ontwikkeld, dus de EU AI Act raakt ons niet?"', '"The CV sorter ranks applicants for the recruiters. We did not develop it ourselves, so the EU AI Act does not affect us?"'),
        options: [
          { text: T('Wel: AI die sollicitanten beoordeelt valt in de hoog-risicohoek, en ook als gebruiker (deployer) heb je eigen plichten, zoals menselijk toezicht en logging.', 'It does: AI that assesses applicants falls in the high-risk corner, and as a user (deployer) you have your own duties, such as human oversight and logging.'), correct: true, effects: { sec: 0, usr: 0, cmp: 2 },
            feedback: T('De wet legt ook plichten op aan organisaties die AI inzetten. Laat de juridische kant toetsen door een jurist.', 'The law also places duties on organisations that use AI. Have the legal side checked by a lawyer.') },
          { text: T('Klopt: alleen de leverancier heeft verplichtingen', 'Correct: only the supplier has obligations'), effects: { sec: 0, usr: 0, cmp: -2 },
            feedback: T('Deployers hebben zelfstandige verplichtingen.', 'Deployers have their own obligations.') },
          { text: T('Alleen als de agent in de EU-cloud draait', 'Only if the agent runs in the EU cloud'), effects: { sec: 0, usr: 0, cmp: -1 },
            feedback: T('Het gaat om wat de AI doet en wie hem inzet, niet om de datacenterlocatie.', 'It is about what the AI does and who uses it, not the datacentre location.') },
        ],
        link: '2-augustus-2026-wat-de-eu-ai-act-van-jou-vraagt-ook-voor-je-agents',
      },
      {
        type: 'console', section: 'agents',
        from: T('CISO', 'CISO'),
        prompt: T(
          'De Mail-samenvatter vat binnenkomende klantmail samen en zoekt er documenten bij. Geef de agent alleen de rechten die hij voor die taak nodig heeft.',
          'The Mail summariser summarises incoming customer mail and finds related documents. Give the agent only the permissions it needs for that task.',
        ),
        page: T('Agent: Mail-samenvatter › rechten', 'Agent: Mail summariser › permissions'),
        fields: [
          { id: 'perms', kind: 'checks', label: T('Rechten', 'Permissions'), options: [
            { v: 'read', label: T('Mail lezen in de klantenservice-mailbox', 'Read mail in the customer service mailbox') },
            { v: 'site', label: T('Alleen de site "Klantenservice" lezen', 'Read only the "Customer service" site') },
            { v: 'all', label: T('Alle SharePoint-sites lezen', 'Read all SharePoint sites') },
            { v: 'ext', label: T('Mail versturen naar externe adressen', 'Send mail to external addresses') }] },
          { id: 'group', kind: 'radio', label: T('Groep voor de DLP- en auditpolicies', 'Group for the DLP and audit policies'), options: [
            { v: 'dyn', label: T('Dynamische Entra-groep "Agents-Klantdata"', 'Dynamic Entra group "Agents-CustomerData"') },
            { v: 'rag', label: T('Role-assignable groep "Agent-Admins"', 'Role-assignable group "Agent-Admins"') }] },
        ],
        checks: [
          { test: (v) => { const p = v.perms || []; return p.includes('read') && p.includes('site') && !p.includes('all') && !p.includes('ext'); }, good: T('Alleen wat de taak vraagt. Een samenvatting hoeft niet naar buiten.', 'Only what the task needs. A summary does not need to go outside.'), bad: T('Alle sites lezen en extern mailen heeft deze agent niet nodig, en dat is precies wat een aanvaller wil.', 'This agent does not need to read all sites or mail externally, and that is exactly what an attacker wants.'), effects: { sec: -3 } },
          { test: (v) => v.group === 'dyn', good: T('Het gebruikersaccount van een agent mag in gewone en dynamische groepen, niet in role-assignable groepen.', 'An agent\'s user account may be in normal and dynamic groups, not in role-assignable groups.'), bad: T('Een agent kan niet in een role-assignable groep, en hoort ook geen beheerrol te krijgen.', 'An agent cannot be in a role-assignable group, and should not get an admin role either.'), effects: { sec: -1 } },
        ],
        link: 'agents-in-purview-een-gebruiker-met-drie-uitzonderingen',
      },
      {
        type: 'choice',
        from: T('SOC-analist', 'SOC analyst'),
        prompt: T('Een week vóór je wijziging stuurde de Mail-samenvatter tien documenten naar een extern adres. In de laatste mail stond onderaan witte tekst op een witte achtergrond. Wat was dit?', 'A week before your change, the Mail summariser sent ten documents to an external address. The last mail had white text on a white background at the bottom. What was this?'),
        options: [
          { text: T('Indirect prompt injection. Het echte probleem waren de rechten: de agent mocht extern mailen.', 'Indirect prompt injection. The real problem was the permissions: the agent was allowed to mail externally.'), correct: true, effects: { sec: 2, usr: 0, cmp: 1 },
            feedback: T('Voor een taalmodel is data ook tekst die instructies kan bevatten. Beperk wat de agent mag en let op afwijkend gedrag van de agent-identiteit.', 'To a language model, data is also text that can contain instructions. Limit what the agent may do and watch for unusual behaviour of the agent identity.') },
          { text: T('Malware in de mail: de antivirus heeft gefaald', 'Malware in the mail: the antivirus failed'), effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: T('Er werd geen code uitgevoerd. Het was een zin, en daar zoekt antivirus niet naar.', 'No code was run. It was a sentence, and antivirus does not look for that.') },
          { text: T('Een slecht model: overstappen naar een ander model lost het op', 'A bad model: switching to another model fixes it'), effects: { sec: -1, usr: 0, cmp: 0 },
            feedback: T('Elk model leest data en instructies als tekst. Het is een permissieprobleem, geen modelprobleem.', 'Every model reads data and instructions as text. It is a permissions problem, not a model problem.') },
        ],
        link: 'prompt-injection-is-geen-modelprobleem-maar-een-permissieprobleem',
      },
      {
        type: 'console', section: 'dlp',
        from: T('CISO', 'CISO'),
        prompt: T(
          'Purview behandelt een agent als gebruiker. De DLP-policy "Klantdata extern" is jaren geleden voor mensen geschreven. Zorg dat hij ook voor de agents geldt.',
          'Purview treats an agent as a user. The DLP policy "Customer data external" was written for people years ago. Make sure it also applies to the agents.',
        ),
        page: T('Policy "Klantdata extern": bereik', 'Policy "Customer data external": scope'),
        info: T('Huidig bereik: groep "Alle medewerkers"', 'Current scope: group "All employees"'),
        fields: [
          { id: 'scope', kind: 'checks', label: T('Geldt voor', 'Applies to'), options: [
            { v: 'staff', label: T('Groep "Alle medewerkers"', 'Group "All employees"') }, { v: 'agents', label: T('Groep "Agents-Klantdata"', 'Group "Agents-CustomerData"') }] },
          { id: 'audit', kind: 'toggle', label: T('Agent-activiteit vastleggen in audit', 'Capture agent activity in audit') },
        ],
        checks: [
          { test: (v) => { const s = v.scope || []; return s.includes('staff') && s.includes('agents'); }, good: T('Mensen én agents: dezelfde regel, dezelfde bescherming.', 'People and agents: same rule, same protection.'), bad: T('Laat de medewerkers in het bereik staan en voeg de agents toe.', 'Keep the employees in scope and add the agents.'), effects: { sec: -2 } },
          { test: (v) => v.audit === true, good: T('Zonder audit kun je achteraf niet nagaan wat een agent deed.', 'Without audit you cannot trace afterwards what an agent did.'), bad: T('Zet audit aan: anders is een incident met een agent niet te onderzoeken.', 'Turn on audit: otherwise an incident with an agent cannot be investigated.'), effects: { cmp: -2 } },
        ],
      },
      {
        type: 'choice',
        from: T('IT-manager', 'IT manager'),
        prompt: T('"Copilot kan nu ook op een model van een andere aanbieder draaien. Moeten wij daar iets mee?"', '"Copilot can now also run on a model from another provider. Do we need to do anything about that?"'),
        options: [
          { text: T('Ja: modelkeuze is een governancebeslissing. Kijk waar de data verwerkt wordt en onder welke voorwaarden, en leg de keuze vast.', 'Yes: model choice is a governance decision. Check where the data is processed and under which terms, and record the decision.'), correct: true, effects: { sec: 1, usr: 0, cmp: 2 },
            feedback: T('Een ander model kan andere verwerkingsvoorwaarden betekenen. Dat besluit je bewust, niet per ongeluk.', 'A different model can mean different processing terms. You decide that deliberately, not by accident.') },
          { text: T('Nee: het blijft Copilot, dus er verandert niets', 'No: it is still Copilot, so nothing changes'), effects: { sec: 0, usr: 0, cmp: -2 },
            feedback: T('De naam blijft gelijk, de verwerking mogelijk niet.', 'The name stays the same, the processing may not.') },
          { text: T('Alle AI-modellen verbieden tot de wet duidelijk is', 'Ban all AI models until the law is clear'), effects: { sec: 0, usr: -3, cmp: 0 },
            feedback: T('Dan gaan medewerkers naar niet-beheerde AI, buiten je zicht.', 'Then staff go to unmanaged AI, out of sight.') },
        ],
        link: 'copilot-draait-nu-ook-op-claude-en-dat-maakt-modelkeuze-een-governance-beslissing',
      },
      {
        type: 'order',
        from: T('CISO', 'CISO'),
        prompt: T('Eindbaas: elke nieuwe agent moet voortaan door hetzelfde proces. Zet de stappen in de juiste volgorde.', 'Final boss: every new agent must go through the same process from now on. Put the steps in the right order.'),
        steps: [
          T('Registreren en een eigenaar toewijzen', 'Register and assign an owner'),
          T('Risico bepalen, ook onder de EU AI Act', 'Assess the risk, including under the EU AI Act'),
          T('Een eigen identiteit met alleen de rechten die nodig zijn', 'Its own identity with only the permissions it needs'),
          T('Opnemen in de Purview-policies: DLP en audit', 'Include it in the Purview policies: DLP and audit'),
          T('Gedrag monitoren en periodiek herzien', 'Monitor behaviour and review periodically'),
        ],
        feedback: T('Een agent is een nieuwe collega: eerst weten wie hij is en wat hij mag, dan beschermen en blijven volgen.', 'An agent is a new colleague: first know who it is and what it may do, then protect it and keep watching.'),
      },
    ],
  },
];

export const TASK_LINKS_6_9 = {
  '6-2': 'endpoint-dlp-wordt-eindelijk-beheersbaar-device-scoping-health-reports-en-advanced-hunting',
  '6-3': 'endpoint-dlp-wordt-eindelijk-beheersbaar-device-scoping-health-reports-en-advanced-hunting',
  '7-2': 'purview-dlp-beschermt-nu-ook-data-at-rest-in-box-dropbox-google-workspace-en-salesforce',
  '7-6': 'dlp-in-defender-for-cloud-apps-verdwijnt-wat-je-voor-6-januari-2027-geregeld-moet-hebben',
  '8-3': 'exact-data-match-in-purview-hash-based-dlp-voor-je-echte-klantdata',
  '9-4': 'agents-in-purview-een-gebruiker-met-drie-uitzonderingen',
};

export const LEVEL_BLOGS_6_9 = {
  6: ['endpoint-dlp-wordt-eindelijk-beheersbaar-device-scoping-health-reports-en-advanced-hunting', 'dlp-op-de-netwerklaag-purview-gaat-shadow-ai-achterna-waar-de-browser-ophoudt', 'track-revoke-intrekken-werkt-maar-pas-als-de-use-license-verloopt'],
  7: ['dlp-in-defender-for-cloud-apps-verdwijnt-wat-je-voor-6-januari-2027-geregeld-moet-hebben', 'purview-dlp-beschermt-nu-ook-data-at-rest-in-box-dropbox-google-workspace-en-salesforce', 'purview-dlp-op-de-netwerklaag-wat-global-secure-access-wel-en-niet-tegenhoudt', 'copilot-zoekt-op-het-web-en-jouw-data-reist-mee-dlp-voor-web-searches'],
  8: ['custom-sensitive-information-types-in-purview-dlp-voorbij-de-templates', 'exact-data-match-in-purview-hash-based-dlp-voor-je-echte-klantdata', 'de-dlp-policy-optimizer-ai-die-je-policy-wildgroei-doorzoekt', 'dlp-alert-aggregation-de-ruis-daalt-het-werk-blijft'],
  9: ['agents-zijn-de-nieuwe-gebruikers-en-jouw-tenant-is-er-nog-niet-klaar-voor', 'agents-in-purview-een-gebruiker-met-drie-uitzonderingen', 'prompt-injection-is-geen-modelprobleem-maar-een-permissieprobleem', '2-augustus-2026-wat-de-eu-ai-act-van-jou-vraagt-ook-voor-je-agents'],
};
