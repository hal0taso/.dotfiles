var D_TSRToolTipTitleString = "Trend Micro 페이지 등급";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "응답 없음",
        Safe: "안전함",
        Neutral: "안전함",
        Dangerous: "위험함",
        Suspicious: "의심스러움",
        Untested: "테스트되지 않음",
        Trusted: "신뢰할 수 있음",
        Blocked: "차단됨",
        PCBlocked:"차단됨"
    },
    HelpString: {
        Nolink: "Trend Micro에서 이 페이지의 등급을 표시할 수 없습니다. 연결이 불안정하여 이 문제가 발생한 경우 페이지를 새로 고치면 문제를 해결할 수 있습니다.",
        Safe: "원하는 경우 이 페이지를 여십시오.",
        Neutral: "이전에는 이 페이지에 원하지 않는 콘텐츠가 있었지만 지금은 Trend Micro에서 안전한 것으로 간주하고 있습니다.",
        Dangerous: "이 페이지를 열면 보안 위험이 초래될 수 있습니다. 보호 기능 설정으로 인해 이 페이지를 열 수 없습니다.",
        Suspicious: "이 페이지는 보안 위험에 노출될 수 있습니다. 보호 기능 설정으로 인해 이 페이지를 열지 못할 수 있습니다.",
        Untested: "아직 Trend Micro에서 테스트하지 않은 페이지이므로 현재는 등급을 표시할 수 없습니다. ",
        Trusted: "이 페이지는 예외 목록에 신뢰할 수 있음으로 포함되어 있으나 Trend Micro에서는 이 등급을 확인하지 못했습니다.",
        Blocked: "이 페이지의 주소는 차단된 웹 사이트 목록에 나타납니다.",
        PCBlocked:"이 컴퓨터에 설정된 자녀보호로 이 페이지에 액세스할 수 없습니다."
    },
    CheckUrlString: "이 사이트를 검토하도록 <span id='TSRCheckUrl'>Trend Micro에 요청</span>합니다.",
    SiteSafetyReportString: {
        Title: "이 사이트를 검토하도록 Trend Micro에 요청합니다.",
        Address: "주소:",
        SiteOwnerCheckBox: "사이트 소유자입니다.",
        EmailAddressDefault: "전자 메일 주소",
        AddDescriptionDefault: "설명 추가",
        SendButton: "보내기",
        CancelButton: "취소"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "이 포스트에 대해 친구에게 경고하십시오.",
        ShareString: "Trend Micro™ 보안 소프트웨어에서 이 링크가 위험하다고 보고되었습니다. 만일을 대비하여 이를 제거하고 컴퓨터를 검색하려 할 수 있습니다. https://www.facebook.com/Trendmicro/app_366801130018338"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "자세히 보기",
    donotAsk: "이 메시지를 다시 표시 안 함"
};

var g_oSafeSearchingString = {
    warnUserTitle: "보호자의 결정에 따라 이 페이지를 열 수 없습니다.",
    reallyNeedToSee: "이 페이지를 열어야 하는 경우에는 <span class='provide_password'>암호 입력</span> 후 이 보호 기능을 끄십시오.",
    reallyNeedToSeeUntilRestart: "이 페이지를 열어야 하는 경우에는 <a class='provide_password'>암호 입력</a> 후 이 보호 기능을 끄고 컴퓨터를 다시 시작하십시오.",
    productName: "Trend Micro 페이지 등급"
};
