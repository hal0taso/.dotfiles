var D_TSRToolTipTitleString = "Trend プロテクト";

var g_oRatingLevelToolTipString = {
    LevelString: {
        Nolink: "応答なし",
        Safe: "安全",
        Neutral: "安全",
        Dangerous: "危険",
        Suspicious: "不審",
        Untested: "未評価",
        Trusted: "許可済み",
        Blocked: "ブロック",
        PCBlocked:"ブロック"
    },
    HelpString: {
        Nolink: "このWebサイトの評価を表示できません。接続が不安定な場合は、画面表示を更新することで問題が解決することがあります。",
        Safe: "このWebサイトは安全です。",
        Neutral: "以前このWebサイトには望ましくないコンテンツが含まれていましたが、現在は安全と見なされます。",
        Dangerous: "このWebサイトにアクセスするとセキュリティを脅かす可能性があります。保護設定によってアクセスが拒否されます。",
        Suspicious: "このWebサイトを開くとセキュリティを脅かす可能性があります。保護設定によってアクセスが拒否される場合があります。",
        Untested: "このWebサイトは未評価です。評価を表示できません。 ",
        Trusted: "このWebサイトを許可するよう指定されていますが、このWebサイトの評価はまだ確認されていません。",
        Blocked: "このWebサイトのアドレスは、アクセスを禁止するWebサイトのリストに登録されています。",
        PCBlocked:"保護者による使用制限により、このWebサイトはブロックされています。"
    },
    CheckUrlString: "このWebサイトの再評価を<span id='TSRCheckUrl'>トレンドマイクロに依頼します</span>。",
    SiteSafetyReportString: {
        Title: "評価内容変更のリクエスト",
        Address: "URL:",
        SiteOwnerCheckBox: "このWebサイトの所有者です。",
        EmailAddressDefault: "メールアドレス",
        AddDescriptionDefault: "このWebサイトについてのコメント",
        SendButton: "送信",
        CancelButton: "キャンセル"
    }
};

var g_oToolTipString = {
    ShareToFriend: {
        ShareMsg: "このリンクについて友人に警告する。",
        ShareString: "このWebページ内のリンクはトレンドマイクロにより「危険」と評価されています。このリンクにはアクセスしないでください。"
    }
};

var g_oDirectPassPromotionString = {
    recommendDP: "",
    learnMore: "詳細の表示",
    donotAsk: "今後表示しない"
};

var g_oSafeSearchingString = {
    warnUserTitle: "保護者により、この画像が表示されないように設定されています。",
    reallyNeedToSee: "画像を表示するには<span class='provide_password'>パスワードを入力</span>する必要があります。",
 reallyNeedToSeeUntilRestart: "<a class='provide_password'>パスワードを入力</a>すれば、コンピュータを再起動するまで画像を表示させることができます。",
 productName: "Trend プロテクト"
};