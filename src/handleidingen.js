export const handleidingen = [
  {
    id: 1,
    title: "DLP Policy Setup Quick Reference",
    description: "Snelle referentie voor het opzetten van Data Loss Prevention policies in Microsoft Purview. Inclusief templates en best practices.",
    category: "Purview",
    date: "May 25 2026",
    type: "markdown",
    icon: "📋",
    content: "# DLP Policy Setup Quick Reference\n\nEen praktische handleiding voor het opzetten van Data Loss Prevention policies.\n\n## Voordat je begint\n\n- Compliance Administrator rol vereist\n- Microsoft 365 E3 of E5 licentie\n- Test environment beschikbaar\n\n## Stap-voor-stap\n\n### 1. Open Purview Portal\n\nGa naar https://purview.microsoft.com\n\n### 2. Navigeer naar DLP\n\nSolutions → Data Loss Prevention → Policies\n\n### 3. Create Policy\n\nKlik Create policy → Kies template (PCI DSS, GDPR, etc.) of Custom\n\n![Create DLP Policy in Microsoft Purview](/images/DLP.png)\n\n### 4. Configureer Scope\n\nSelecteer locations: Exchange, Teams, SharePoint, OneDrive, Devices\n\n### 5. Test Mode\n\nALTIJD eerst in test mode publishen. Wacht 60 minuten voor synchronisatie.\n\n### 6. Monitor Activity\n\nActivity Explorer → bekijk wat de policy zou doen\n\n### 7. Productie\n\nNa 1-2 weken testing → switch naar Enforce mode\n\n## Templates Cheatsheet\n\n- PCI DSS - Creditcard data\n- GDPR - Persoonlijke EU data\n- HIPAA - Medische data\n- Custom - Eigen content\n\n## Common Issues\n\nIf DLP niet werkt:\n- Check synchronisatie tijd (60 min)\n- Verifieer device onboarding\n- Check license assignment\n\n---\n\nLast updated: May 25 2026"
  },
  {
    id: 2,
    title: "Conditional Access Best Practices",
    description: "Volledige checklist voor het implementeren van Conditional Access policies in Entra ID. Veiligheid versus gebruiksvriendelijkheid.",
    category: "Entra",
    date: "May 25 2026",
    type: "markdown",
    icon: "🔐",
    content: "# Conditional Access Best Practices\n\nDe complete checklist voor het opzetten van Conditional Access in Microsoft Entra ID.\n\n## Standaard Policies (Must Have)\n\n### 1. Require MFA for Admins\n\n- Target: Alle admin rollen\n- Actie: Require MFA\n- Priority: HOOG\n\n### 2. Block Legacy Authentication\n\n- Target: Alle users\n- Conditions: Client apps = Legacy auth\n- Actie: Block\n\n### 3. Require MFA voor Users\n\n- Target: Alle users\n- Excluded: Service accounts\n- Actie: Require MFA\n\n### 4. Block Untrusted Locations\n\n- Conditions: Sign-in from blocked countries\n- Actie: Block access\n\n### 5. Require Compliant Device\n\n- Target: Users met M365 access\n- Actie: Require compliant device\n\n## Testing Approach\n\n1. Always start in Report-only mode\n2. Wacht 7-14 dagen, analyze logs\n3. Test met pilot users\n4. Pas dan algemene rollout\n\n## Emergency Access Accounts\n\nMaak ALTIJD 2 break-glass accounts:\n- Excluded van alle CA policies\n- Sterke wachtwoorden in safe\n- Monitor sign-ins continuous\n\n## Common Mistakes\n\n- Geen exclusions voor service accounts\n- Te brede block policies (productie verstoring)\n- Geen testing in report-only mode\n- Vergeten break-glass accounts\n\n---\n\nLast updated: May 25 2026"
  },
  {
    id: 3,
    title: "Intune Autopilot Deployment Guide",
    description: "Stap-voor-stap gids voor het opzetten van Windows Autopilot deployment via Intune. Van zero touch naar productie laptop.",
    category: "Intune",
    date: "May 25 2026",
    type: "markdown",
    icon: "💻",
    content: "# Intune Autopilot Deployment Guide\n\nZero-touch deployment van Windows devices via Microsoft Intune en Windows Autopilot.\n\n## Voorbereidingen\n\n### Required Roles\n\n- Intune Administrator\n- Global Reader (voor visibility)\n\n### Required Licenses\n\n- Microsoft 365 E3/E5 (Intune included)\n- Of: Intune standalone licentie\n\n## Setup Stappen\n\n### 1. Configure Intune as MDM Authority\n\nIntune Admin Center → Tenant Administration → Connectors and tokens\n\n### 2. Apple Business Manager Setup (voor Mac)\n\nVoor iOS/macOS devices via DEP enrollment.\n\n### 3. Windows Autopilot Profile\n\nDevices → Windows → Windows Enrollment → Deployment Profiles\n\nSettings:\n- Deployment mode: User-Driven of Self-Deploying\n- Join type: Microsoft Entra joined\n- Skip: Privacy settings, EULA\n\n### 4. Enrollment Status Page (ESP)\n\nConfigure ESP to show progress tijdens setup:\n- Show app and profile installation\n- Show installation progress\n- Block device use until all apps installed\n\n### 5. Device Groups\n\nMaak dynamic groups gebaseerd op:\n- Group Tag (voor verschillende profielen)\n- Order ID\n- Purchase order\n\n### 6. Configuration Profiles Assign\n\nKoppel alle profiles aan de device group:\n- Compliance Policy\n- Configuration Profile\n- App Assignment\n- WiFi Profile\n\n## Test Procedure\n\n1. Order test device met Group Tag\n2. Wacht op auto-registration in Autopilot\n3. Reset device naar OOBE\n4. Boot en monitor ESP progress\n5. Verifieer alles na enrollment\n\n## Troubleshooting\n\n### Device niet zichtbaar in Autopilot\n\n- Check hardware hash upload\n- Verifieer tenant association\n- Check device serial number\n\n### ESP blijft hangen\n\n- Check app installation status\n- Increase timeout values\n- Check assigned apps requirements\n\n---\n\nLast updated: May 25 2026"
  }
];