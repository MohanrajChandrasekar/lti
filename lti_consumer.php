<?php
# ------------------------------
# START CONFIGURATION SECTION
#
$params = explode(",", $argv[1]);
$launch_url = $params[0];
$key = $params[1];
$secret = $params[2];

$launch_data = array(
	"user_id" => "292832126",
	"roles" => "Instructor",
	"resource_link_id" => "120988f929",
	// "resource_link_title" => "Weekly Blog",
	// "resource_link_description" => "A weekly blog.",
	"lis_person_name_full" => "Jane Q. Public",
	"lis_person_name_family" => "Public",
	"lis_person_name_given" => "Given",
	"lis_person_contact_email_primary" => "user@school.edu",
	"lis_person_sourcedid" => "school.edu:user",
	"context_id" => "456434513",
	"context_title" => "Design of Personal Environments",
	"context_label" => "SI182",
	"tool_consumer_instance_guid" => "LTI_116753",
	"tool_consumer_instance_description" => "Larson & Turbo - Technical Educations."
);

#
# END OF CONFIGURATION SECTION
# ------------------------------

$now = new DateTime();

$launch_data["lti_version"] = "LTI-1p0";
$launch_data["lti_message_type"] = "basic-lti-launch-request";

# Basic LTI uses OAuth to sign requests
# OAuth Core 1.0 spec: http://oauth.net/core/1.0/

$launch_data["oauth_callback"] = "about:blank";
$launch_data["oauth_consumer_key"] = $key;
$launch_data["oauth_version"] = "1.0";
$launch_data["oauth_nonce"] = uniqid('', true);
$launch_data["oauth_timestamp"] = $now->getTimestamp();
$launch_data["oauth_signature_method"] = "HMAC-SHA1";
$launch_data["lis_outcome_service_url"] = "http://52.172.30.16:8081/launch/lti/data";

# In OAuth, request parameters must be sorted by name
$launch_data_keys = array_keys($launch_data);
sort($launch_data_keys);

$launch_params = array();
foreach ($launch_data_keys as $key) {
  array_push($launch_params, $key . "=" . rawurlencode($launch_data[$key]));
}

$base_string = "POST&" . urlencode($launch_url) . "&" . rawurlencode(implode("&", $launch_params));
$secret = urlencode($secret) . "&";
$signature = base64_encode(hash_hmac("sha1", $base_string, $secret, true));

?>

<html>
<head></head>
<!-- <body onload="document.ltiLaunchForm.submit();"> -->
<body>
<form id="ltiLaunchForm" name="ltiLaunchForm" method="POST" action="<?php printf($launch_url); ?>">
<?php foreach ($launch_data as $k => $v ) { ?>
	<input type="hidden" name="<?php echo $k ?>" value="<?php echo $v ?>">
<?php } ?>
	<input type="hidden" name="oauth_signature" value="<?php echo $signature ?>">
	<button type="submit">Launch</button>
</form>
<body>
</html>