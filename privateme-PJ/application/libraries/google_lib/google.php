<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
* Name:  Google
* 
* Author: Jan Dreau Ganggangan
* 	 	  jganggangan@village88.com
*
* Created:  10/26/2016
* 
* Description:  Bunar's Ticket to Stardom
* 
*/
include_once("google/Google_Client.php");
include_once("google/contrib/Google_Oauth2Service.php");

class Google {
	public function __construct() {
		######### edit details ##########
		$clientId = GOOGLE_CLIENT_ID; //Google CLIENT ID
		$clientSecret = GOOGLE_CLIENT_SECRET; //Google CLIENT SECRET
		$redirectUrl = 'http://localhost/login-with-google-using-php';  //return url (url to script)
		$homeUrl = 'http://localhost/login-with-google-using-php';  //return to home

		##################################

		$gClient = new Google_Client();
		$gClient->setApplicationName('Login to codexworld.com');
		$gClient->setClientId($clientId);
		$gClient->setClientSecret($clientSecret);
		$gClient->setRedirectUri($redirectUrl);

		$google_oauthV2 = new Google_Oauth2Service($gClient);
	}

	public function set_google_data($client_id, $client_secret){

	}
}