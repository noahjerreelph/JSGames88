<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
	public function __construct(){
		parent::__construct();
			$this->load->model("Main_model");
	}

	public function index(){
		if(isset($_SESSION["user_data"]['id'])){
			$this->load->model("User_model");

			if($this->User_model->get_user_account($_SESSION["user_data"]['id']))
				redirect(base_url().'dashboard');
			else{
				$this->load->view('index.php', array("user_has_account" => false, "user_id" => $_SESSION["user_data"]['id']));
			}
		}
		else{
			$this->load->view('index.php');
		}

	}

	public function dashboard(){
		$this->load->view('main_dashboard');
	}
	public function account(){
		$view_data["budgets"]		= $this->Main_model->get_user_budgets();
		$view_data["get_user_accounts"] = $this->Main_model->get_user_accounts();

		$this->load->view('account_dashboard', $view_data);
	}

	public function get_user_categories(){
		echo json_encode($this->Main_model->get_user_categories());
	}
	public function get_user_sub_categories(){
		echo json_encode($this->Main_model->get_user_sub_categories($this->input->post()));
	}
	
	public function get_user_selected_account(){
		echo json_encode($this->Main_model->get_user_selected_account($this->input->post()));
	}
	
	public function get_all_accounts_overview(){
		echo json_encode($this->Main_model->get_user_selected_account($this->input->post()));
	}

	public function insert_checking_account(){
		echo json_encode($this->Main_model->insert_checking_account($this->input->post()));
	}
	public function insert_budget_category(){
		echo json_encode($this->Main_model->insert_budget_category($this->input->post()));
	}
	public function insert_saving_account(){
		echo json_encode($this->Main_model->insert_saving_account($this->input->post()));
	}
}
