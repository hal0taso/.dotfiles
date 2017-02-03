var D_TSRToolTipTitleString = "Classificazione pagine di Trend Micro";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "Nessuna risposta",
        Safe: "Sicuro",
        Neutral: "Sicuro",
        Dangerous: "Pericoloso",
        Suspicious: "Sospetto",
        Untested: "Non testato",
        Trusted: "Affidabile",
        Blocked: "Bloccato",
        PCBlocked:"Bloccato"
    },
    HelpString: {
        Nolink: "Impossibile visualizzare una classificazione per questa pagina. Se il problema è stato causato da una connessione instabile, provare ad aggiornare la pagina.",
        Safe: "È possibile visualizzare questa pagina.",
        Neutral: "In passato, in questa pagina erano presenti contenuti indesiderati; oggi Trend Micro la considera sicura.",
        Dangerous: "Visitare questa pagina può compromettere la sicurezza. Le impostazioni di protezione ne impediscono l'apertura.",
        Suspicious: "Questa pagina può compromettere la sicurezza. Le impostazioni di protezione possono impedirne l'apertura.",
        Untested: "Trend Micro non ha ancora classificato questa pagina e pertanto al momento non è possibile visualizzare una classificazione. ",
        Trusted: "Questa pagina è presente nell'Elenco eccezioni come Affidabile, ma Trend Micro non ha confermato questa classificazione.",
        Blocked: "L'indirizzo della pagina specificata è presente nell'elenco dei siti Web bloccati.",
        PCBlocked:"Gli Strumenti di controllo per genitori su questo computer non consentono l'accesso a questa pagina."
    },
    CheckUrlString: "<span id='TSRCheckUrl'>Chiedere a Trend Micro</span> di esaminare questo sito.",
    SiteSafetyReportString: {
        Title: "Chiedere a Trend Micro di esaminare questo sito.",
        Address: "Indirizzo:",
        SiteOwnerCheckBox: "Sono il proprietario del sito",
        EmailAddressDefault: "Indirizzo e-mail",
        AddDescriptionDefault: "Aggiungere una descrizione",
        SendButton: "Invia",
        CancelButton: "Annulla"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "Avvisare gli amici della pericolosità del post.",
        ShareString: "Il software di sicurezza Trend Micro™ ha segnalato questo link come pericoloso. Si consiglia di rimuoverlo ed effettuare la scansione del computer. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "Ulteriori informazioni",
    donotAsk: "Non chiedere più"
};

var g_oSafeSearchingString = {
    warnUserTitle: "Qualcuno che si prende cura dell'utente ha stabilito che non è opportuno visualizzare questa immagine.",
    reallyNeedToSee: "Se è veramente necessario visualizzarla, <span class='provide_password'>fornire la password</span> e disattivare questa protezione",
    reallyNeedToSeeUntilRestart: "Se è veramente necessario visualizzarla, <a class='provide_password'>fornire la password</a> e disattivare questa protezione fino al riavvio del computer.",
    productName: "Classificazione pagine di Trend Micro"
};
