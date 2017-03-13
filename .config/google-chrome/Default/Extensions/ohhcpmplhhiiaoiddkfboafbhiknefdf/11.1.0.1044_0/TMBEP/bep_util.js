var BEPScanResult = {
	ERROR: 0,
	UNDETERMINED: 1,
	PASS: 2,
	ALLOW_ONCE_PASS: 3,
	FEEDBACK: 10,
	MON_URL: 11,
	MON_SCRIPT: 12,
	MON_HTML: 13,
	SUSPICIOUS: 20,
	SUS_URL: 21,
	SUS_SCRIPT: 22,
	SUS_SHELLCODE: 23,
	SUS_HTML: 24,
	MALICIOUS: 30,
	MAL_URL: 31,
	MAL_SCRIPT: 32,
	SHELLCODE: 33,
	MAL_HTML: 34
};

/* backgroud -> host */
var BEP_B2H_MSG_CREATE_HTML_FILE = "b2h_create_html_file";
var BEP_B2H_MSG_DOC_START = "b2h_doc_start";
var BEP_B2H_MSG_DOC_COMPLETE = "b2h_doc_complete";
var BEP_B2H_MSG_CHECK_CONTRIBUTION_FB = "b2h_check_contribution_fb";
var BEP_B2H_MSG_GET_ALERT_PAGE_CONTENT = "b2h_get_alert_page_content";
var BEP_B2H_MSG_CHECK_URL = "b2h_check_url";
var BEP_B2H_MSG_CHECK_JPS_URLS = "b2h_check_jps_urls";
var BEP_B2H_MSG_HANDLE_CONTINUE_BROWSING = "b2h_handle_continue_browsing";
var BEP_B2H_MSG_PARSE_JNLP_ENCODE_CONTENT = "b2h_parse_jnlp_encode_content";
var BEP_B2H_MSG_FIND_JAVA_URL_CHAIN = "b2h_find_java_url_chain";
var BEP_B2H_MSG_READ_CONFIG = "b2h_read_config";
var BEP_B2H_MSG_UPDATE_FRAME_URL_INFO = "b2h_update_frame_url_info";
var BEP_B2H_MSG_UPDATE_HTML_CONTENT = "b2h_update_html_content";

/* host -> backgroud */
var BEP_B2H_RES_MSG_CHECK_URL = "b2h_res_check_url";
var BEP_B2H_RES_MSG_CHECK_JPS_URLS = "b2h_res_check_jps_urls";
var BEP_B2H_RES_MSG_HANDLE_CONTINUE_BROWSING = "b2h_res_handle_continue_browsing";
var BEP_B2H_RES_MSG_GET_ALERT_PAGE_CONTENT = "b2h_res_get_alert_page_content";
var BEP_B2H_RES_MSG_READ_CONFIG = "b2h_res_read_config";
var BEP_B2H_RES_MSG_CHECK_CONTRIBUTION_FB = "b2h_res_check_contribution_fb";

/* host -> content script */
var BEP_B2C_MSG_SHOW_ALERT_PAGE = "b2c_show_alert_page";
var BEP_B2C_MSG_GET_JPS_URLS_BY_DOM = "b2c_get_jps_urls_by_dom";
var BEP_B2C_MSG_GET_JAVA_CHAIN = "b2c_get_java_chain";
var BEP_B2C_MSG_GET_HTML_CONTENT = "b2c_get_html_content";

/* content script -> host */
var BEP_B2C_RES_MSG_GET_JAVA_CHAIN = "b2c_res_get_java_chain";
var BEP_B2C_RES_MSG_GET_JPS_URLS_BY_DOM = "b2c_res_get_jps_urls_by_dom";
var BEP_B2C_RES_MSG_GET_HTML_CONTENT = "b2c_res_get_html_content";

/* backgroud -> host test msg */
var BEP_B2H_MSG_INTERGRATE_WITH_TOOLBAR = "b2h_intergate_with_toolbar";
var BEP_B2H_RES_MSG_INTERGRATE_WITH_TOOLBAR = "b2h_res_intergate_with_toolbar";

var BEP_B2H_MSG_HELLO = "b2h_hello";
var BEP_B2H_RES_MSG_HELLO = "b2h_res_hello";

var BEP_HOST_MSG_RES_HB = "b2h_empty_msg";
