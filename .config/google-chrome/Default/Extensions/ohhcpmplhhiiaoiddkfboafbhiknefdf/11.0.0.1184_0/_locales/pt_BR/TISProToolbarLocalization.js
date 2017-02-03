var D_TSRToolTipTitleString = "Classificação de página da Trend Micro";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "Sem resposta",
        Safe: "Seguro",
        Neutral: "Seguro",
        Dangerous: "Perigoso",
        Suspicious: "Suspeito",
        Untested: "Não testado",
        Trusted: "Confiável",
        Blocked: "Bloqueado",
        PCBlocked:"Bloqueado"
    },
    HelpString: {
        Nolink: "A Trend Micro não pode mostrar uma classificação para esta página. Se não for possível se conectar por causa desse problema, atualizar a página pode ajudar.",
        Safe: "Se desejar, abra essa página.",
        Neutral: "Esta página anteriormente continha conteúdo indesejável, mas a Trend Micro já a considera segura.",
        Dangerous: "Visitar essa página pode colocar sua segurança em risco. Suas configurações de proteção evitarão que ela abra.",
        Suspicious: "Esta página pode representar um risco de segurança. Suas configurações de proteção podem evitar que ela abra.",
        Untested: "A Trend Micro ainda não testou esta página e não pode mostrar uma classificação para ela neste momento.",
        Trusted: "Esta página está na Lista de exceções como Confiável, mas o Trend Micro não confirmou essa classificação.",
        Blocked: "O endereço desta página aparece na sua lista de sites bloqueados.",
        PCBlocked:"Os Controles Parentais neste computador não permitem acesso a esta página."
    },
    CheckUrlString: "<span id='TSRCheckUrl'>Peça que a Trend Micro</span> avalie este site.",
    SiteSafetyReportString: {
        Title: "Peça que a Trend Micro avalie este site.",
        Address: "Endereço:",
        SiteOwnerCheckBox: "Eu sou o proprietário do site",
        EmailAddressDefault: "Endereço de e-mail",
        AddDescriptionDefault: "Adicionar uma descrição",
        SendButton: "Enviar",
        CancelButton: "Cancelar"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "Avise seu amigo sobre este post.",
        ShareString: "Meu software de segurança Trend Micro™ relatou este link como perigoso. Você pode querer removê-lo e analisar o seu computador, no caso de precisar. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "Saiba mais",
    donotAsk: "Não perguntar novamente"
};

var g_oSafeSearchingString = {
    warnUserTitle: "Alguém que se preocupa com você decidiu que você não deve exibir esta imagem.",
    reallyNeedToSee: "Se você realmente precisar vê-la, <span class='provide_password'>forneça a senha</span> e desative esta proteção",
    reallyNeedToSeeUntilRestart: "Se você realmente precisar vê-la, <a class='provide_password'>forneça a senha</a> e desative esta proteção até a reinicialização do computador.",
    productName: "Classificação de página da Trend Micro"
};
