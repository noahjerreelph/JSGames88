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
				$this->Main_model->insert_income_category();
				redirect(base_url().'dashboard');
			}
		}
		else{
			$this->load->view('index.php');
		}

	}

	public function dashboard(){
		$view_data["activities"] = $this->Main_model->get_user_activities();
		$view_data["select_account"] = $this->Main_model->accounts();

		$this->load->view('main_dashboard', $view_data);
	}
	public function account(){
		$view_data["budgets"]	 = $this->Main_model->get_user_budgets();
		$view_data["get_user_accounts"] = $this->Main_model->get_user_accounts();

		$this->load->view('account_dashboard', $view_data);
	}

	public function get_user_budgets(){
		echo json_encode($this->Main_model->get_user_budgets($this->input->post()));
	}

	public function get_user_categories(){
		echo json_encode($this->Main_model->get_user_categories($this->input->post()));
	}

	public function dashboard_highchart_data(){
		echo json_encode($this->Main_model->dashboard_highchart_data($this->input->post()));
	}

	public function get_user_sub_categories(){
		echo json_encode($this->Main_model->get_user_sub_categories($this->input->post()));
	}
	
	public function get_user_selected_account(){
		echo json_encode($this->Main_model->get_user_selected_account($this->input->post()));
	}
	
	public function get_all_accounts_overview(){
		echo json_encode($this->Main_model->get_all_accounts_overview($this->input->post()));
	}

	public function get_reports_overview(){
		echo json_encode($this->Main_model->get_reports_overview($this->input->post()));
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
