var D_TSRToolTipTitleString = "Trend Micro Page Rating";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "No Response",
        Safe: "Safe",
        Neutral: "Safe",
        Dangerous: "Dangerous",
        Suspicious: "Suspicious",
        Untested: "Untested",
        Trusted: "Trusted",
        Blocked: "Blocked",
        PCBlocked:"Blocked"
    },
    HelpString: {
        Nolink: "Trend Micro cannot show a rating for this page. If an unstable connection caused this problem, refreshing the page may help.",
        Safe: "Feel free to open this page.",
        Neutral: "This page previously contained undesirable content, but Trend Micro now considers it safe.",
        Dangerous: "Visiting this page may put your security at risk. Your protection settings will prevent it from opening.",
        Suspicious: "This page could pose a security risk. Your protection settings may prevent it from opening.",
        Untested: "Trend Micro has not yet tested this page, and cannot show a rating for it right now. ",
        Trusted: "This page is in the Exception List as Trusted, but Trend Micro has not confirmed this rating.",
        Blocked: "The address of this page appears on your list of blocked websites.",
        PCBlocked:"The Parental Controls on this computer do not allow access to this page."
    },
    CheckUrlString: "<span id='TSRCheckUrl'>Ask Trend Micro</span> to review this site.",
    SiteSafetyReportString: {
        Title: "Ask Trend Micro to review this site.",
        Address: "Address:",
        SiteOwnerCheckBox: "I am the site owner",
        EmailAddressDefault: "Email address",
        AddDescriptionDefault: "Add a description",
        SendButton: "Send",
        CancelButton: "Cancel"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "Warn your friend about this post.",
        ShareString: "My Trend Micro™ security software reported this link as dangerous. You might want to remove it and scan your computer, just in case. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "Learn More",
    donotAsk: "Don't Ask Again"
};

var g_oSafeSearchingString = {
    warnUserTitle: "Someone who cares about you has decided that you should not view this image.",
    reallyNeedToSee: "If you really need to see it, <span class='provide_password'>provide the password</span> and then switch off this protection",
    reallyNeedToSeeUntilRestart: "If you really need to see it, <a class='provide_password'>provide the password</a> and then switch off this protection until the computer restarts.",
    productName: "Trend Micro Page Rating"
};