export const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Microsoft Purview: Jouw Complete Beginnersgids',
    date: 'May 15 2025',
    category: 'Purview',
    excerpt: 'Leer hoe je Microsoft Purview implementeert: licenties, setup-tijd (2-5 minuten), policy synchronisatie (60 minuten), en praktische stappen om aan de slag te gaan.',
    readTime: '12 min read',
    featured: true,
    content: `# Getting Started with Microsoft Purview: Jouw Complete Beginnersgids

Wil je aan de slag met data governance? Microsoft Purview is dé oplossing voor organisaties die hun data willen organiseren, beschermen en beheren. In deze gids leid ik je stap-voor-stap door het setupproces, de vereiste licenties, en wat je moet weten voordat je start.

## Wat is Microsoft Purview?

Microsoft Purview is een **unified data governance platform** waarmee je:
- Je data kunt **ontdekken** en **catalogeren** (Data Map)
- Data kunt **classificeren** en **beschermen** (Data Loss Prevention - DLP)
- **Compliance** en **regulatie** kunt beheren
- Je gehele data estate overzichtelijk kunt houden

In simpele termen: Purview helpt je antwoord te geven op de vraag "Welke data hebben we, waar staat het, en wie mag eraan?" Dit is cruciaal voor GDPR-compliance, beveiliging, en data governance.

## Welke Licentie Heb Je Nodig?

Dit is een veelgestelde vraag, dus ik geef je het antwoord meteen duidelijk:

### Optie 1: Trial (Gratis - Aanbevolen voor starters!)

Microsoft biedt een **gratis 90-daagse trial** aan!

**Vereisten voor de trial:**
- Microsoft 365 E3, OF
- Office 365 E3 + Enterprise Mobility and Security E3

**Wat krijg je in de trial:**
- Volledige access tot Microsoft Purview (functionaliteiten van Microsoft E5)
- 25-300 licenties (automatisch toegewezen voor 90 dagen)
- Alle compliance features om mee te experimenteren

**Hoe je de trial startet:**
1. Ga naar de Microsoft Purview portal (https://purview.microsoft.com)
2. Navigeer naar "Trials and recommendations"
3. Klik "View all trials and recommendations"
4. Selecteer "Get started" bij de Purview trial
5. Done! Je bent klaar!

**Opmerking:** Het kan tot 2 uur duren voordat alle Purview solutions zichtbaar zijn in je navigatiemenu. Log uit en in als je ze niet meteen ziet.

### Optie 2: Permanente Licenties

Na de trial kun je kiezen voor:
- Microsoft 365 E5 (volledig pakket met compliance features)
- Microsoft Purview Suite (alleen compliance, goedkoper dan E5)
- Per-solution licenties (alleen DLP, alleen Information Protection, etc.)

Tip: Discussieer licentie-opties met je Microsoft account manager - er zijn verschillende modellen beschikbaar.

## Hoe Lang Duurt Het Om Te Beginnen?

### Setup Initeel: 2-5 Minuten

De initiële setup van Microsoft Purview gaat erg snel:
- Login in je Microsoft 365 tenant
- Trial starten (of licentie activeren)
- Portal openen
- Klaar!

Heel wat beter dan traditionele data governance tools, toch?

### Wachten Op Alle Features: Tot 2 Uur

Hoewel je meteen kunt inloggen, kan het tot 2 uur duren voordat alle Purview solutions (Data Map, Data Loss Prevention, Information Protection, eDiscovery, etc.) verschijnen in je linkernavigatiemenu.

Dit is normaal en niets om je zorgen over te maken. Je hebt wat geduld nodig, maar dan ben je echt volledig setup.

Pro tip: Log uit en in na een uur. Dit versnelt soms het laadproces.

## Data Synchronisatie: Hoe Lang Duurt Dat?

Zodra je Purview hebt opgezet, wil je waarschijnlijk data gaan scannen en policies toepassen. Hier zijn de timing expectations:

### Data Discovery (Data Map)

Wanneer je een data source registreert en scant in Purview:
- Scanning: Hangt af van grootte van je data
  - Kleine bronnen (< 1TB): 15-30 minuten
  - Grote bronnen (> 10TB): Enkele uren tot dagen
- Indexing: Data verschijnt in je catalog (meestal meteen of binnen minuten)

### Policy Synchronisatie (DLP & Information Protection)

Dit is cruciaal: hoelang duurt het voordat je policies actief zijn?

**DLP Policies synchroniseren op apparaten: Tot 60 minuten**

Dit betekent:
- Je maakt een Data Loss Prevention policy aan
- Het duurt maximaal 60 minuten voordat alle gebruikersapparaten deze policy hebben ontvangen
- Daarna zal de policy actief zijn en gaan helpen data te beschermen

Dus maak je policy niet aan en test direct - wacht minimaal 1 uur!

Aanbeveling: Maak policies aan aan het einde van je werkdag. Ze zijn 's ochtends volledig actief.

## Stap-voor-Stap: Je Eerste Setup

### Stap 1: Trial Starten (2 minuten)

1. Ga naar https://purview.microsoft.com
2. Log in met je Microsoft 365 account
3. Klik "Trials and recommendations"
4. Selecteer "Get started" voor Purview trial
5. Bevestig

Status: Klaar!

### Stap 2: Wacht Tot Alle Features Laden (Tot 2 uur)

Na stap 1 zullen alle Purview solutions langzaam laden:
- Home (klaar)
- Data Map (Wachten...)
- Data Catalog (Wachten...)
- Data Loss Prevention (Wachten...)
- Information Protection (Wachten...)

Dit is normaal! Je ziet misschien even berichten zoals "Coming soon" of lege pagina's. Dit is OK. Wacht gewoon tot alles geladen is.

### Stap 3: Registreer Je Eerste Data Source (10 minuten)

Zodra Data Map beschikbaar is:

1. Ga naar "Data Map" → "Sources"
2. Klik "Register"
3. Kies je data source (Azure Storage, SQL Database, SharePoint, etc.)
4. Vul login gegevens in
5. Vul scan schema in
6. Click "Register"

Status: Je data source is geregistreerd! Scanning start automatisch.

### Stap 4: Maak Je Eerste Policy (5 minuten)

1. Ga naar "Data Loss Prevention" → "Policies"
2. Klik "Create policy"
3. Kies template (bijv. "PCI DSS for creditcard data")
4. Configureer scope (Outlook, Teams, OneDrive, etc.)
5. Review & Save

Belangrijk: Wacht nu 60 minuten voordat je test!

### Stap 5: Monitor Resultaten (Doorlopend)

Na 60 minuten kan je:
- Naar "Activity Explorer" gaan
- Zien welke data policies hebben gedetecteerd
- Monitoren of alles werkt

## Veelgestelde Vragen

### Kan ik Purview gebruiken zonder Microsoft E5?

Ja! Met de trial, of met E3 + Purview Suite licentie.

### Hoelang kan ik de trial gebruiken?

90 dagen, maar je kunt daarna een licentie kopen en verder gaan.

### Wat gebeurt er na de 90-daagse trial?

Je kunt kiezen om:
1. Licenties te kopen en verder te gaan
2. Trial te beëindigen en alles te verwijderen
3. Een nieuwe trial aanvragen (hangt af van Microsoft approvals)

### Kan ik data scannen terwijl ik op features wacht?

Nee, je moet even wachten tot Data Map beschikbaar is. Maar dit duurt meestal slechts 1-2 uur.

### Waarom duurt synchronisatie 60 minuten?

Microsoft synchroniseert policies in batches om serverlast te minimaliseren. Dit is normaal voor enterprise-systemen.

## Tips voor Success

### 1. Zorg voor Admin Access

Je hebt Compliance Administrator of Global Administrator rol nodig. Vraag je IT team dit eerst te controleren!

### 2. Plan Je Setup

- Start trial/licenties op dinsdag-donderdag (niet vrijdagnamiddag)
- Geef jezelf 24 uur om alles te exploreren
- Plan policies voor einde werkdag

### 3. Begin Klein

Start met één data source en één policy. Niet alles tegelijk!

### 4. Documenteer je Setup

Noteer welke policies je hebt aangemaakt en waarom. Dit helpt later bij audits.

### 5. Gebruik de Trial Maximaal

Je hebt 90 dagen! Experimenteer, test, leer. Dit is gratis!

## Volgende Stappen

Nu je weet hoe je Purview kunt starten, zijn je volgende stappen:

1. Start de trial (vandaag!)
2. Wacht tot alles laadt (2 uur)
3. Registreer je eerste data source (morgen)
4. Maak je eerste policy (morgen)
5. Monitor resultaten (volgende week)

## Conclusie

Microsoft Purview is geen ingewikkeld systeem - het is vrij intuïtief zodra je het begrijpt. De belangrijkste dingen om te onthouden:

- Trial is gratis en makkelijk
- Setup duurt slechts minuten
- Wacht tot features laden (tot 2 uur)
- Policies synchroniseren in 60 minuten
- Begin klein en experimenteer

Veel sterkte met je Purview journey! Als je vragen hebt of tegen problemen aanloopt, check dan de Microsoft Learn documentation of laat een opmerking achter.

---

**By Wesley de Marie** | Data Governance Advocate | Microsoft MVP Candidate

Heb je Purview al geprobeerd? Deel je ervaringen in de comments! 👇`
  }
];
