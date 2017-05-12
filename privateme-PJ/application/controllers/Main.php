<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->session->unset_userdata('user_session');
	}

	public function index(){
		if(isset($_SESSION['user_id'])){
			redirect(base_url().'dashboard');
		}
		else{
			$this->load->view('index.php');
		}
	}

	public function dashboard(){
		$this->load->view('main_dashboard');
	}

}
