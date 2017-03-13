var D_TSRToolTipTitleString = "Trend Micro-sidevurdering";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "Får ikke svar",
        Safe: "Sikker",
        Neutral: "Sikker",
        Dangerous: "Farlig",
        Suspicious: "Mistenkelig",
        Untested: "Ikke kontrollert",
        Trusted: "Klarert",
        Blocked: "Blokkert",
        PCBlocked:"Blokkert"
    },
    HelpString: {
        Nolink: "Trend Micro kan ikke vise en vurdering for denne siden. Hvis en ustabil tilkobling forårsaket dette problemet, kan det hjelpe å oppdatere siden.",
        Safe: "Du må gjerne åpne denne siden.",
        Neutral: "Denne siden inneholdt tidligere uønsket materiale, men Trend Micro anser den nå som trygg.",
        Dangerous: "Det kan utgjøre en sikkerhetsrisiko å gå til denne siden. Beskyttelsesinnstillingene hindrer deg i å åpne siden.",
        Suspicious: "Denne siden kan utgjøre en risiko. Beskyttelsesinnstillingene kan hindre deg i å åpne siden.",
        Untested: "Trend Micro har ikke testet denne siden ennå, og kan derfor ikke vise en vurdering av den",
        Trusted: "Denne siden er på den klarerte unntakslisten, men Trend Micro har ikke bekreftet denne vurderingen.",
        Blocked: "Adressen til denne siden vises i listen over blokkerte nettsteder.",
        PCBlocked:"Foreldrestyringen på denne datamaskinen gir ikke adgang til denne siden."
    },
    CheckUrlString: "<span id='TSRCheckUrl'>Be Trend Micro</span> om å vurdere dette nettstedet.",
    SiteSafetyReportString: {
        Title: "Be Trend Micro om å vurdere dette nettstedet.",
        Address: "Adresse:",
        SiteOwnerCheckBox: "Jeg er eieren av nettstedet.",
        EmailAddressDefault: "E-postadresse",
        AddDescriptionDefault: "Legg til en beskrivelse",
        SendButton: "Send",
        CancelButton: "Avbryt"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "Advar vennen din om dette innlegget.",
        ShareString: "Min Trend Micro™ sikkerhetsprogramvare rapporterte denne koblingen som farlig. Det er kanskje best at du fjerner den og skanner datamaskinen, bare i tilfelle. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "Les mer",
    donotAsk: "Ikke spør igjen"
};

var g_oSafeSearchingString = {
    warnUserTitle: "Noen som er glad i deg, har bestemt at du ikke bør åpne dette bildet.",
    reallyNeedToSee: "Hvis du virkelig må se det, må du <span class='provide_password'>oppgi passordet</span> og slå av denne beskyttelsen.",
    reallyNeedToSeeUntilRestart: "Hvis du virkelig må se det, må du <a class='provide_password'>oppgi passordet</a> og slå av denne beskyttelsen til datamaskinen starter på nytt.",
    productName: "Trend Micro-sidevurdering"
};
