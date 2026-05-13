export const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Microsoft Purview: Jouw Complete Beginnersgids',
    date: 'May 15 2025',
    category: 'Purview',
    excerpt: 'Leer hoe je Microsoft Purview implementeert: licenties, setup-tijd (2-5 minuten), policy synchronisatie (60 minuten), en praktische stappen om aan de slag te gaan.',
    readTime: '12 min read',
    featured: false,
    content: `# Getting Started with Microsoft Purview: Jouw Complete Beginnersgids

Wil je aan de slag met data governance? Microsoft Purview is dé oplossing voor organisaties die hun data willen organiseren, beschermen en beheren. In deze gids leid ik je stap-voor-stap door het setupproces, de vereiste licenties, en wat je moet weten voordat je start.

## Wat is Microsoft Purview?

Microsoft Purview is een unified data governance platform waarmee je:
- Je data kunt ontdekken en catalogeren (Data Map)
- Data kunt classificeren en beschermen (Data Loss Prevention - DLP)
- Compliance en regulatie kunt beheren
- Je gehele data estate overzichtelijk kunt houden

In simpele termen: Purview helpt je antwoord te geven op de vraag "Welke data hebben we, waar staat het, en wie mag eraan?" Dit is cruciaal voor GDPR-compliance, beveiliging, en data governance.

## Hoe Lang Duurt Het Om Te Beginnen?

### Setup Initeel: 2-5 Minuten

De initiële setup van Microsoft Purview gaat erg snel:
- Login in je Microsoft 365 tenant
- Portal openen
- Klaar!

Heel wat beter dan traditionele data governance tools, toch?

### Wachten Op Alle Features: Tot 2 Uur

Hoewel je meteen kunt inloggen, kan het tot 2 uur duren voordat alle Purview solutions (Data Map, Data Loss Prevention, Information Protection, eDiscovery, etc.) verschijnen in je linkernavigatiemenu.

Dit is normaal en niets om je zorgen over te maken. Je hebt wat geduld nodig, maar dan ben je echt volledig setup.

Pro tip: Log uit en in na een uur. Dit versnelt soms het laadproces.

## Stap-voor-Stap: Je Eerste Setup

### Stap 1: Portal Openen (1 minuut)

1. Ga naar https://purview.microsoft.com
2. Log in met je Microsoft 365 account
3. Wacht tot de portal laadt
4. Je bent erin!

### Stap 2: Wacht Tot Alle Features Laden (Tot 2 uur)

Na stap 1 zullen alle Purview solutions langzaam laden:
- Home (klaar)
- Data Map (Wachten...)
- Data Catalog (Wachten...)
- Data Loss Prevention (Wachten...)
- Information Protection (Wachten...)

Dit is normaal! Je ziet misschien even berichten zoals "Coming soon" of lege pagina's. Dit is OK. Wacht gewoon tot alles geladen is.

### Stap 3: Verken de Dashboard (10 minuten)

Zodra alles geladen is:
1. Klik op "Home" tab
2. Explore "Solutions" section
3. Kijk naar "Data Map", "Data Loss Prevention", "Information Protection"
4. Maak jezelf vertrouwd met de interface

Dit is waar je later je beleid zal maken en data zal beheren.

## De Basis: DLP, Labels en Retentie

Nu gaan we dieper in op drie kernconcepten die je MOET begrijpen voordat je verder gaat.

### 1. Data Loss Prevention (DLP) - De Bodyguard van Je Data

DLP is als een bodyguard voor je gevoelige informatie. Het detecteert en beschermt gegevens voor ze verloren gaan.

Wat doet DLP precies?

DLP policies scan je data (in Exchange, Teams, OneDrive, SharePoint) op zoek naar gevoelige informatie zoals:
- Creditcard nummers
- Burgerservicenummers (BSN)
- Bankrekening nummers
- Persoonlijke gegevens (PII)

Wanneer DLP iets detecteert, kan het:
- De actie blokkeren (email niet versturen)
- Een waarschuwing tonen ("Ben je zeker?")
- Dit loggen in Activity Explorer
- Meldingen sturen naar admins

Praktisch voorbeeld:

Stel je hebt een DLP policy die creditcard nummers blokkeert. Als een werknemer probeert een email te sturen met 16 cijfers (creditcard format):
1. DLP detecteert het
2. De email wordt GEBLOKKEERD
3. De werknemer krijgt melding: "Deze email bevat gevoelige informatie"
4. Je admin ziet dit in Activity Explorer

Hoelang duurt synchronisatie?

DLP Policies synchroniseren op alle apparaten en clients: Tot 60 minuten

Dit betekent dat als je vandaag een DLP policy aanmaakt, het tot 1 uur kan duren voordat alle employees het voelen. Plan dus policies voor aan het einde van je werkdag.

### 2. Sensitivity Labels - De Classificatie Systeem

Labels zijn zoals stickers op documenten. Ze helpen je data te classificeren en beschermen.

Er zijn twee soorten labels:

Sensitivity Labels:
- Public (geen beperking)
- Internal (alleen voor employees)
- Confidential (gevoelig, beperkt delen)
- Highly Confidential (zeer gevoelig, strenge controle)

Retention Labels:
- Bepalen hoe lang je iets moet bewaren
- Automatisch verwijderen na bepaalde periode
- Compliance en archivering helpen

Waarom zijn labels belangrijk?

Labels doen meerdere dingen tegelijk:
1. Classificatie - Iedereen weet wat het document is
2. Versleuteling - Confidential docs zijn encrypted
3. Watermerk - "CONFIDENTIAL" verschijnt op het document
4. Toegangsbeperking - Alleen bepaalde people kunnen het openen
5. Retention - Auto delete na contract einde

Praktisch voorbeeld:

Een HR medewerker maakt een document met salarissen. Met één klik:
1. Label "Highly Confidential - HR" toepassen
2. Document wordt versleuteld
3. Alleen HR kan het openen
4. Watermark "CONFIDENTIAL" verschijnt
5. Na 3 jaar wordt het automatisch verwijderd (retention)

Alles in één actie!

### 3. Retention - Het Archief Systeem

Retention bepaalt hoe lang je data moet/mag bewaren. Dit is cruciaal voor compliance.

Waarom is retention belangrijk?

Regelingen vereisen bepaalde bewaartermijnen:
- GDPR: Verwijder persoonlijke data als niet meer nodig
- Belastingwet: Bewaar 7 jaar
- Contracten: Bewaar tot 5 jaar na einde
- Email: Soms oneindig, soms 3 jaar

Retention policies automatiseren dit proces.

Hoe werkt retention?

1. Je stelt policy in: "Email ouder dan 3 jaar moet verwijderd worden"
2. Purview scant automatisch
3. Items die 3 jaar oud zijn gaan naar "Records Management"
4. Na grace period worden ze verwijderd
5. Dit is compliant met regelgeving

Drie scenario's:

Scenario A - Retention Only:
- Bewaar email 7 jaar
- Daarna automatisch verwijderen
- Compliance maintained

Scenario B - Legal Hold:
- Normaal: Verwijder na 3 jaar
- Maar: Als rechtszaak begint, NIETS verwijderen
- Totdat rechtszaak voorbij is
- Dan pas verwijderen

Scenario C - Deletion + Archive:
- Bewaar 5 jaar in live mailbox
- Daarna verplaats naar Archive
- Daarna verwijder na 10 jaar totaal
- Layered approach

## DLP + Labels + Retention Samenwerken

Dit is waar het interessant wordt. Deze drie werken samen voor totale data governance.

Voorbeeld Scenario: Contract Management

Document: "Service Contract met Klant XYZ"

Stap 1 - Label (Tag het):
- Label: "Confidential - Legal"
- Versleuteling activeren
- Watermark toevoegen

Stap 2 - DLP (Bescherm het):
- DLP detecteert gevoelige gegevens (contractcijfers)
- Blokkeert extern delen
- Logt alle pogingen

Stap 3 - Retention (Beheer het):
- Retention policy: "Bewaar 5 jaar na contract einde"
- Purview telt af
- Daarna auto-delete
- Compliance solved

Alles automatisch, geen handwerk meer!

## Praktische Stappen: Je Eerste DLP Policy

Laten we een eenvoudige DLP policy maken om te beginnen.

1. Ga naar Data Loss Prevention
2. Klik "Create Policy"
3. Kies template: "Protect Financial Data"
4. Voeg toe: Exchange, Teams, OneDrive
5. Stel in: "Block with override"
6. Publish

Na 60 minuten is het live!

## Praktische Stappen: Je Eerste Label

1. Ga naar Information Protection
2. Klik "Create Label"
3. Naam: "Confidential"
4. Instellingen:
   - Encryption: Required
   - Watermark: Yes
   - Visual Marking: Yes
5. Publish naar alle users

Gebruikers zien nu in Word/Outlook een "Confidential" label om toe te passen.

## Praktische Stappen: Je Eerste Retention Policy

1. Ga naar Records Management
2. Klik "Create Retention Label"
3. Naam: "Delete After 3 Years"
4. Instellingen:
   - Action: Delete
   - Retentie: 3 years
5. Publish

Documenten ouder dan 3 jaar worden automatisch verwijderd.

## Veelgestelde Vragen

### Wat is het verschil tussen DLP en Labels?

DLP = Detectie en blokkering (reactive)
Labels = Classificatie en bescherming (proactive)

Gebruik beide!

### Kan ik DLP policies testen zonder ze live te zetten?

Ja! Maak policy in "Test mode" eerst. Dit toont alleen waarschuwingen, blokkeert niet.

### Hoe lang duurt het tot labels zichtbaar zijn in Word/Outlook?

Tot 24 uur. Gebruikers zien dan dropdown met labels in Word/Outlook.

### Kan ik retention policies terugdraaien?

Ja, tot een bepaald punt. Eenmaal verwijderd gaat naar Recycle Bin, daarna permanent delete. Dus wees voorzichtig!

### Werkt DLP ook in Teams Direct Messages?

Ja! DLP scant ook Teams DMs, niet alleen channels.

## Tips voor Success

1. Begin klein: Start met 1 DLP policy, 1 label, 1 retention rule
2. Test: Gebruik test mode eerst
3. Communicate: Vertel gebruikers wat je doet
4. Monitor: Kijk Activity Explorer regelmatig
5. Iterate: Pas policies aan op feedback

## Volgende Stappen

Nu je DLP, Labels en Retention begrijpt:

1. Login Purview vandaag
2. Maak je eerste DLP policy https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp
3. Maak je eerste label https://learn.microsoft.com/en-us/purview/sensitivity-labels
4. Maak je eerste retention policy https://learn.microsoft.com/en-us/purview/get-started-with-data-lifecycle-management


Veel sterkte met je Purview journey! Dit is powerful stuff.

---

By Wesley de Marie | Data Governance Advocate | Microsoft MVP Candidate


  }
];