var D_TSRToolTipTitleString = "Valoración de páginas de Trend Micro";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "Sin respuesta",
        Safe: "Seguro",
        Neutral: "Seguro",
        Dangerous: "Peligroso",
        Suspicious: "Sospechoso",
        Untested: "Sin evaluar",
        Trusted: "De confianza",
        Blocked: "Bloqueado",
        PCBlocked:"Bloqueado"
    },
    HelpString: {
        Nolink: "Trend Micro no puede mostrar una valoración para esta página. Si la causa del problema es una conexión inestable, es posible que actualizar la página le ayude a solucionarlo.",
        Safe: "Puede abrir esta página.",
        Neutral: "Antes esta página incluía contenido no deseado, pero ahora Trend Micro la considera segura.",
        Dangerous: "Si visita esta página, la seguridad puede verse comprometida. La configuración de protección impedirá que se abra.",
        Suspicious: "Esta página podría suponer un riesgo de seguridad. La configuración de protección puede impedir que se abra.",
        Untested: "Trend Micro todavía no ha comprobado esta página y no puede mostrar ninguna valoración de la misma en este momento. ",
        Trusted: "Esta página está en la Lista de excepciones valoradas como de confianza, pero Trend Micro no ha confirmado esta valoración.",
        Blocked: "La dirección de esta página aparece en la lista de sitios Web bloqueados.",
        PCBlocked:"Los controles paternos de este equipo no permiten el acceso a esta página."
    },
    CheckUrlString: "<span id='TSRCheckUrl'>Solicite a Trend Micro</span> que revise esta página.",
    SiteSafetyReportString: {
        Title: "Solicite a Trend Micro que revise esta página.",
        Address: "Dirección:",
        SiteOwnerCheckBox: "Soy el propietario del sitio",
        EmailAddressDefault: "Dirección de correo electrónico",
        AddDescriptionDefault: "Agregar una descripción",
        SendButton: "Enviar",
        CancelButton: "Cancelar"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "Avise a su amigo sobre esta publicación.",
        ShareString: "Mi software de seguridad de Trend Micro™ ha notificado que este enlace es peligroso. Por si acaso, elimínelo y realice una exploración en el equipo. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "Más información",
    donotAsk: "No volver a preguntar"
};

var g_oSafeSearchingString = {
    warnUserTitle: "Alguien que se preocupa por usted ha decidido que no debe ver esta imagen.",
    reallyNeedToSee: "Si realmente necesita verla, <span class='provide_password'>introduzca la contraseña</span> y, a continuación, desactive esta protección.",
    reallyNeedToSeeUntilRestart: "Si realmente necesita verla, <a class='provide_password'>introduzca la contraseña</a> y, a continuación, desactive esta protección hasta que el equipo se reinicie.",
    productName: "Valoración de páginas de Trend Micro"
};
