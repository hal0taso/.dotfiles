var D_TSRToolTipTitleString = "Fonction d'évaluation des pages Web de Trend Micro";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "Pas de réponse",
        Safe: "Sécurisé",
        Neutral: "Sécurisé",
        Dangerous: "Dangereux",
        Suspicious: "Suspect",
        Untested: "Non testé",
        Trusted: "De confiance",
        Blocked: "Bloqué",
        PCBlocked:"Bloqué"
    },
    HelpString: {
        Nolink: "Trend Micro ne peut pas afficher d'évaluation pour cette page. Si une connexion instable a provoqué ce problème, l'actualisation de la page peut permettre de le résoudre.",
        Safe: "Vous pouvez ouvrir cette page.",
        Neutral: "Cette page comportait auparavant un contenu indésirable, mais Trend Micro considère maintenant qu'elle ne présente aucun danger.",
        Dangerous: "L'ouverture de cette page peut présenter un risque pour la sécurité. Vos paramètres de protection empêcheront cette ouverture.",
        Suspicious: "Cette page peut présenter un risque pour la sécurité. Vos paramètres de protection peuvent empêcher son ouverture.",
        Untested: "Trend Micro n'a pas encore testé cette page et ne peut pas en afficher une évaluation pour le moment. ",
        Trusted: "Cette page est évaluée comme étant de confiance dans la liste des exceptions, mais Trend Micro n'a pas confirmé votre évaluation.",
        Blocked: "L'adresse de cette page figure dans votre liste de sites Web bloqués.",
        PCBlocked:"Le contrôle parental de cet ordinateur n'autorise pas l'accès à cette page."
    },
    CheckUrlString: "<span id='TSRCheckUrl'>Demandez à Trend Micro</span> de vérifier ce site.",
    SiteSafetyReportString: {
        Title: "Demandez à Trend Micro de vérifier ce site.",
        Address: "Adresse :",
        SiteOwnerCheckBox: "Je suis le propriétaire du site",
        EmailAddressDefault: "Adresse e-mail",
        AddDescriptionDefault: "Ajouter une description",
        SendButton: "Envoyer",
        CancelButton: "Annuler"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "Prévenez vos amis pour ce commentaire.",
        ShareString: "Mon logiciel de sécurité Trend Micro™ m'a indiqué que ce lien était dangereux. Il serait préférable de le supprimer et de scanner votre ordinateur, au cas où. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "En savoir plus",
    donotAsk: "Ne plus demander"
};

var g_oSafeSearchingString = {
    warnUserTitle: "Une personne soucieuse de votre intérêt a décidé que vous ne deviez pas regarder cette image.",
    reallyNeedToSee: "Si vous avez absolument besoin de la voir, <span class='provide_password'>indiquez le mot de passe</span> puis désactivez cette protection",
    reallyNeedToSeeUntilRestart: "Si vous avez absolument besoin de la voir, <a class='provide_password'>indiquez le mot de passe</a>, puis désactivez cette protection jusqu'au redémarrage de l'ordinateur.",
    productName: "Fonction d’évaluation des pages Web de Trend Micro"
};
