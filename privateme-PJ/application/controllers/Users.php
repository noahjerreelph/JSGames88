<?php
defined('BASEPATH') OR exit('No direct script access allowed');
include( APPPATH .'libraries/google_lib/google/googleapi.php' );

class Users extends CI_Controller {
	public $google_client;
	public function __construct(){
		parent::__construct();
		$this->google_client = new Google_Client();
		$this->google_client->setScopes(array('email'));
		$this->load->model('User_model');
	}

	public function login(){
		echo json_encode($this->User_model->login($this->input->post()));
	}

	public function logout(){
		$this->session->sess_destroy();
		redirect(base_url());
	}


	public function register(){
		echo json_encode($this->User_model->register($this->input->post()));
	}

	public function authenticate_google_user(){
		if(isset($_GET['code'])){
			$this->google_client->authenticate();
			$token = json_decode($this->google_client->getAccessToken(),TRUE);
			$token["id_token"] = NULL;
			$this->session->set_userdata('google_token', $token);	
			$this->google_token = (object) $token;
			$user_session = $this->User_model->get_google_user($this->google_token);
			$this->session->set_userdata("user_data", $user_session);
		}
		
		redirect(base_url());
	}
	
	public function add_user_account(){
		echo json_encode($this->User_model->add_user_account($this->input->post()));
	}
}
