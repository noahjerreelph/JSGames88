<?php 
class Main_model extends CI_Model {

	public function __construct(){
		parent::__construct();

		if(isset($_SESSION['user_id'])){
			return false;
		}
	}

/* Budget */
	public function get_user_budgets($post_data = NULL){
		$date_from = ($post_data == NULL) ? "first day of last month" : $post_data["budget_from"];
		$date_to = ($post_data == NULL) ? "last day of next month" : $post_data["budget_to"];

		$fields = "users.id as user_id, users.email_address, categories.id as category_id, categories.name as category_name, 
				   sub_categories.id as sub_category_id, sub_categories.name as sub_category_name, 
				   budgets.amount as sub_category_amount, budgets.created_at as budget_date, transactions.created_at as transaction_date,
				   transactions.type_id, transactions.amount as outflow_amount";
		$budgets = $this->db->select($fields)
				 ->from("users")
				 ->join("categories", "categories.user_id = users.id")
				 ->join("sub_categories", "sub_categories.category_id = categories.id")
				 ->join("budgets", "budgets.sub_category_id = sub_categories.id")
				 ->join("transactions", "transactions.budget_id = budgets.id")
				 ->where("users.id", $_SESSION["user_data"]["id"])
				 ->where("transactions.created_at >=", date("Y-m-d", strtotime($date_from)))
				 ->where("transactions.created_at <=", date("Y-m-d", strtotime($date_to)))
				 ->order_by("categories.id ASC")
				 ->get()->result_array();

		$budget_data = array(); 
		$total_outflow = array();
		$total_budget = array();
		$over_all_total_budget = array();
		$over_all_total_outflow = array();

		foreach ($budgets as $key => $budget) {
			$transaction_date = date("M Y", strtotime($budget["transaction_date"]));
			$category_id = $budget["category_id"];

			if(empty($total_outflow[$transaction_date][$category_id]))
				$total_outflow[$transaction_date][$category_id] = 0;

			$total_outflow[$transaction_date][$category_id] += $budget["outflow_amount"];

			if(empty($total_budget[$transaction_date][$category_id]))
				$total_budget[$transaction_date][$category_id] = 0;

			$total_budget[$transaction_date][$category_id] += $budget["sub_category_amount"];

			if(empty($over_all_total_budget[$transaction_date]))
				$over_all_total_budget[$transaction_date] = 0;

			$over_all_total_budget[$transaction_date]  += $budget["sub_category_amount"];

			if(empty($over_all_total_outflow[$transaction_date]))
				$over_all_total_outflow[$transaction_date] = 0;


			$over_all_total_outflow[$transaction_date] += $budget["outflow_amount"];

			$budget_data[$transaction_date]["over_all_total_budget"] = $over_all_total_budget[$transaction_date];
			$budget_data[$transaction_date]["over_all_total_outflow"] = $over_all_total_outflow[$transaction_date];
			$budget_data[$transaction_date]["over_all_balance"] = $over_all_total_budget[$transaction_date] - $over_all_total_outflow[$transaction_date];

			$budget_data[$transaction_date]["categories"][$budget["category_name"]][$budget["category_id"]]["total_budget"]  =	$total_budget[$transaction_date][$category_id];
			$budget_data[$transaction_date]["categories"][$budget["category_name"]][$budget["category_id"]]["total_outflow"] =  $total_outflow[$transaction_date][$category_id];
			$budget_data[$transaction_date]["categories"][$budget["category_name"]][$budget["category_id"]]["balance_amount"] = $total_budget[$transaction_date][$category_id] - $total_outflow[$transaction_date][$category_id];

			$budget_data[$transaction_date]["categories"][$budget["category_name"]][$budget["category_id"]]["data"][] = array(
				"category_id"			=> $budget["category_id"],
				"category_name" 		=> $budget["category_name"],
				"sub_category_id" 		=> $budget["sub_category_id"],
				"sub_category_name" 	=> $budget["sub_category_name"],
				"sub_category_amount" 	=> $budget["sub_category_amount"],
				"outflow_amount" 		=> $budget["outflow_amount"],
				"balance_amount" 		=> $budget["outflow_amount"] - $budget["sub_category_amount"],
				"type_id" 				=> $budget["type_id"],
			);
		}

		return $this->load->view("partials/_budget_table", array("budgets" => $budget_data), TRUE);
	}

	public function insert_income_category(){
		if(empty($this->category(FALSE, TRUE))){
			$insert_category = $this->db->insert("categories", array(
				"user_id"	 => $_SESSION["user_data"]['id'], 
				"name"		 => "Income", 
				"created_at" => date("Y-m-d H:i:s")
			));

		}
	}

	public function insert_budget_category($post_data){
		
		$insert_category = $this->db->insert("categories", array(
			"user_id"	 => $_SESSION["user_data"]['id'], 
			"name"		 =>$post_data["budget_category_name"], 
			"created_at" => date("Y-m-d H:i:s")
		));

		$category_id = $this->db->insert_id();

		foreach ($post_data["subcategory_data"] as $key => $subcategory) {
			$this->db->insert("sub_categories", array(
				"category_id" => $category_id,
				"name"		  => $subcategory["name"],
				"created_at"  => date("Y-m-d H:i:s")
			));

			$sub_category_id = $this->db->insert_id();
			
			$this->db->insert("budgets", array(
				"user_id" 		  => $_SESSION["user_data"]['id'],
				"sub_category_id" => $sub_category_id,
				"amount"		  => $subcategory["amount"],
				"created_at" 	  => date("Y-m-d H:i:s")
			));

			$budget_id = $this->db->insert_id();	

			$this->db->insert("transactions", array(
				"user_id" 		  => $_SESSION["user_data"]['id'],
				"budget_id"		  => $budget_id,
				"type_id"		  => 1,
				"amount"		  => $subcategory["outflow"],
				"created_at" 	  => date("Y-m-d H:i:s")
			));
		}

		return $insert_category;
	}
/*End of Budget */

/* Checking account*/
	public function insert_checking_account($post_data){
		$account_type_id = $this->get_account_type($post_data["account_id"], $post_data["account_type_id"])["id"];

		if($post_data["sub_category_id"] == "add_new_sub"){
			$this->db->insert("sub_categories", array(
				"category_id" => $post_data["category_id"],
				"name" 		  => $post_data["subcategory_name"],
				"created_at"  => date("Y-m-d H:i:s")
			));

			$new_sub_id = $this->db->insert_id();

			$this->db->insert("budgets", array(
				"user_id"		  => $_SESSION["user_data"]["id"],
				"sub_category_id" => $new_sub_id,
				"amount" 		  => $post_data["amount"],
				"created_at" 	  => date("Y-m-d H:i:s")
			));

			$budget_id = $this->db->insert_id();
		}
		else{
			$budget_id = $this->get_budget_id($post_data)["budget_id"];
		}

		$transaction_data = array(
			"user_id"			=> $_SESSION["user_data"]["id"],
			"budget_id" 		=> $budget_id,
			"type_id"			=> 1,
			"account_type_id"	=> $account_type_id,
			"payee" 			=> $post_data["payee_name"],
			"description" 		=> $post_data["description"],
			"amount" 			=> $post_data["amount"],
			"transacted_at" 	=> (($post_data["is_not_scheduled"] == "false") ? date("Y-m-d", strtotime($post_data["schedule_interview_date"]))."00:00:00" : NULL),
			"created_at" 		=> date("Y-m-d H:i:s"),
		);

		$insert_transaction = $this->db->insert("transactions", $transaction_data);


		return ($insert_transaction) ? $transaction_data : false;
	}

	public function get_budget_id($post_data){
		return $this->db->select("budgets.id as budget_id")
			   ->from("budgets")
			   ->join("sub_categories", "sub_categories.id = budgets.sub_category_id")
			   ->join("categories", "categories.id = sub_categories.category_id")
			   ->where("sub_categories.category_id", $post_data["category_id"])
			   ->where("sub_categories.id", $post_data["sub_category_id"])
			   ->get()->row_array();
	}
/* End of Checking account*/

/* Saving Account*/
	public function insert_saving_account($post_data){
		$account_type_id = $this->get_account_type($post_data["account_id"], $post_data["account_type_id"])["id"];
		$categories_info = json_decode($post_data["category_info"], true);
		$parent_transaction_id = 0;

		foreach ($categories_info as $key => $category_info) {
			foreach ($category_info["sub_categories"] as $key => $sub_category) {
				if($sub_category["sub_category_id"] == "add_new_sub"){
					$this->db->insert("sub_categories", array(
						"category_id" => $category_info["category_id"],
						"name"		  => $sub_category["new_sub_category_name"],
						"created_at"  => date("Y-m-d H:i:s")
					));

					if($sub_category["transcation_type"] != 4){
						$budget_data = array(
							"user_id"		  => $_SESSION["user_data"]["id"],
							"amount" 		  => $sub_category["sub_category_amount"],
							"sub_category_id" => $this->db->insert_id(),
							"created_at" 	  => date("Y-m-d H:i:s")
						);

						$this->db->insert("budgets", $budget_data);

						$new_budget_id = $this->db->insert_id();
					}
					else{
						$new_budget_id = -1;
					}
				}
				else{
					$budget["category_id"]     = $category_info["category_id"];
					$budget["sub_category_id"] = $sub_category["sub_category_id"];

					if($sub_category["transcation_type"] != 4)
						$new_budget_id = $this->get_budget_id($budget)["budget_id"];
					else
						$new_budget_id = -1;
				}

				$this->db->insert("transactions", array(
					"user_id"				=> $_SESSION["user_data"]["id"],
					"parent_transaction_id"	=> $parent_transaction_id,
					"budget_id" 			=> $new_budget_id,
					"type_id" 				=> $post_data["type"],
					"account_type_id" 		=> $account_type_id,
					"payee" 				=> $post_data["payee_name"],
					"amount" 				=> $sub_category["sub_category_amount"],
					"transacted_at"		 	=> ((isset($sub_category["schedule_transaction"][0])) ? date("Y-m-d h:i:s", strtotime($sub_category["schedule_transaction"][0])) : NULL),
					"description" 			=> $post_data["description"],
					"created_at" 			=> date("Y-m-d H:i:s")
				));

				if($key == 0)
					$parent_transaction_id = $this->db->insert_id();
			}
		}

		return true;
	}
/* End of Saving Account*/

/* All accounts overview*/
	public function get_all_accounts_overview($post_data){
		$current_date_accounts = $this->all_account($post_data, TRUE);
		$last_month_accounts = $this->all_account($post_data);

		$partial_data = array();

		foreach ($current_date_accounts as $key => $account) {
			$category = array(
				"transaction_name"			=> $account["transaction_name"],
				"transaction_description"	=> $account["transaction_description"],
				"transaction_amount"		=> $account["transaction_amount"],
				"sub_category_name"			=> $account["sub_category_name"],
				"sub_category_amount"		=> $account["sub_category_amount"],
				"transaction_date"			=> $account["transaction_date"],
				"category_name"				=> $account["category_name"],
				"category_id"				=> $account["category_id"],
			);

			$partial_data[$account["account_id"]]["account_name"] = $account["account_name"];
			$partial_data[$account["account_id"]]["account_description"] = $account["account_description"];
			$partial_data[$account["account_id"]]["account_amount"] = $account["account_amount"];
			$partial_data[$account["account_id"]]["transaction_date"] = date("M Y", strtotime($account["transaction_date"]));
			$partial_data[$account["account_id"]]["categories"][$account["category_name"]][] = $category;
			$partial_data[$account["account_id"]]["category_graph"][$account["transaction_id"]] = $category;
		}

		return array("partial" => $this->load->view("partials/_all_accounts_overview", array("accounts" => $partial_data, "last_month_accounts" => $last_month_accounts), TRUE), "chart_data" => $partial_data);
	}

	public function all_account($post_data, $is_current_month = FALSE, $for_report = FALSE){
		if($for_report === FALSE){
			$from_date = (($is_current_month) ? date("Y-m-d", strtotime("first day of this month")). " 00:00:00" : date("Y-m-d", strtotime("first day of last month")). " 00:00:00");
			$to_date   = (($is_current_month) ? date("Y-m-d", strtotime("last day of this month")). " 23:59:59" : date("Y-m-d", strtotime("last day of last month")). " 23:59:59");
		}
		else{
			$from_date = (isset($post_data["from_date"]) ?   $post_data["from_date"] : date("Y-m-d", strtotime("first day of this month")). " 00:00:00");
			$to_date =	 (isset($post_data["from_to"])   ?   $post_data["from_to"] : date("Y-m-d", strtotime("last day of next month")). " 00:00:00");
		}

		$this->db->select("accounts.id as account_id, accounts.account_name, accounts.description as account_description, account_types.amount as account_amount, 
									transactions.id as transaction_id, transactions.payee as transaction_name, transactions.description as transaction_description, transactions.amount as transaction_amount, transactions.created_at as transaction_date,
									sub_categories.name as sub_category_name, budgets.amount as sub_category_amount, categories.name as category_name, categories.id as category_id")
						 ->from("accounts")
						 ->join("account_types", "account_types.account_id = accounts.id")
						 ->join("transactions", "transactions.account_type_id = account_types.id")
						 ->join("budgets", "budgets.id = transactions.budget_id")
						 ->join("sub_categories", "sub_categories.id = budgets.sub_category_id")
						 ->join("categories", "categories.id = sub_categories.category_id")
						 ->where("accounts.user_id", $_SESSION["user_data"]["id"])
						 ->where("transactions.created_at >=", $from_date)
						 ->where("transactions.created_at <=", $to_date)
						 ->where("transactions.type_id", OUTFLOW);

			if(!$for_report)			 
				$this->db->where("account_types.type", $post_data["account_type"]);

			return $this->db->get()->result_array();
	}
/* end of All accounts overview*/

/* Report overview*/
	public function get_reports_overview($post_data){
		$accounts = $this->all_account($post_data, FALSE, TRUE);

		$view_data["accounts"] = $this->load->view("partials/_reports_table", array("accounts" => $accounts), TRUE);
		$view_data["all_accounts"] = $this->accounts(TRUE);

		$date_from = ($post_data == NULL) ? "first day of last month" : $post_data["budget_from"];
		$date_to = ($post_data == NULL) ? "last day of next month" : $post_data["budget_to"];

		$fields = "users.id as user_id, users.email_address, categories.id as category_id, categories.name as category_name, 
				   sub_categories.id as sub_category_id, sub_categories.name as sub_category_name, 
				   budgets.amount as sub_category_amount, budgets.created_at as budget_date, transactions.created_at as transaction_date,
				   transactions.type_id, transactions.amount as outflow_amount";
		$budgets = $this->db->select($fields)
				 ->from("users")
				 ->join("categories", "categories.user_id = users.id")
				 ->join("sub_categories", "sub_categories.category_id = categories.id")
				 ->join("budgets", "budgets.sub_category_id = sub_categories.id")
				 ->join("transactions", "transactions.budget_id = budgets.id")
				 ->where("users.id", $_SESSION["user_data"]["id"])
				 ->where("transactions.created_at >=", date("Y-m-d", strtotime($date_from)))
				 ->where("transactions.created_at <=", date("Y-m-d", strtotime($date_to)))
				 ->order_by("categories.id ASC")
				 ->get()->result_array();

		$budget_data = array(); 
		$over_all_total_outflow = array();

		foreach ($budgets as $key => $budget) {
			$transaction_date = date("M Y", strtotime($budget["transaction_date"]));

			if(empty($over_all_total_outflow[$transaction_date]))
				$over_all_total_outflow[$transaction_date] = 0;

			$over_all_total_outflow[$transaction_date] += $budget["outflow_amount"];
			$budget_data[$transaction_date]["over_all_total_outflow"] = $over_all_total_outflow[$transaction_date];
		}

		return $view_data;
	}
/* End of Report overview*/

/* Re used codes */
	public function get_user_categories($post_data){
		$categories = $this->db->select("id, categories.name")
					    ->from("categories")
					    ->where("user_id", $_SESSION["user_data"]["id"])
					    ->get()->result_array();

		$partial["categories"] = $categories;

		if(!empty($post_data))
			$partial["account_type"] = $post_data["account_type"];
 
		return $this->load->view("partials/_category_option",$partial, TRUE);
	}

	public function get_user_sub_categories($post_data){
		$categories = $this->db->select("id, sub_categories.name")
					    ->from("sub_categories")
					    ->where("category_id", $post_data["category_id"])
					    ->get()->result_array();

		return $this->load->view("partials/_sub_category_option", array("sub_categories" =>$categories), TRUE);
	}

	public function get_user_accounts(){
		$accounts = $this->db->select("accounts.id as account_id, account_name, account_types.id as account_type_id")
					    ->from("accounts")
					    ->join("account_types", "account_types.account_id = accounts.id")
					    ->join("transactions", "transactions.account_type_id = accounts.id", "left")
					    ->where("accounts.user_id", $_SESSION["user_data"]["id"])
					    ->where("account_types.type", 1) #checking
					    ->get()->result_array();

		$user_accounts = array();	

		foreach ($accounts as $key => $account) {
			$user_accounts[$account["account_id"]]["account_id"] = $account["account_id"];
			$user_accounts[$account["account_id"]]["name"] = $account["account_name"];
		}	

		return $this->load->view("partials/_user_accounts_nav", array("accounts" => $user_accounts) , TRUE);
	}

	public function user_accounts($post_data){
		$fields = "categories.id as category_id, categories.name as category_name, 
					transactions.payee, transactions.created_at as transactions_date,  transactions.amount as transaction_amount, transactions.type_id as transcation_type_id,  
					budgets.amount as sub_category_amount, account_types.type as account_type, account_types.id as account_type_id,";

		$fields .= ($post_data["account_type_id"] == 1) ? "sub_categories.name as sub_category_name," : "transactions.id as transaction_id,transactions.parent_transaction_id, transactions.description, ";

		$this->db->select($fields)
				 ->from("categories")
				 ->join("sub_categories", "sub_categories.category_id = categories.id")
				 ->join("budgets", "budgets.sub_category_id = sub_categories.id")
				 ->join("transactions", "transactions.budget_id = budgets.id")
				 ->join("account_types", "account_types.id = transactions.account_type_id")
				 ->where("categories.user_id", $_SESSION["user_data"]["id"])
				 ->where("account_types.account_id", $post_data["account_id"])
				 ->where("account_types.type", $post_data["account_type_id"]) 
				 ->where_in("type_id", ($post_data["account_type_id"] == CHECKINGS ? array(OUTFLOW, INFLOW) : array(WITHDRAW, DEPOSIT, DIRECT_PAYMENT)));

		if(isset($post_data["date_from"]) && isset($post_data["date_to"])){
			$this->db->where("transactions.created_at >=", date("Y-m-d", strtotime($post_data["date_from"])). " 00:00:00");
			$this->db->where("transactions.created_at <=", date("Y-m-d", strtotime($post_data["date_to"])). " 23:59:59");
		}

		return  $this->db->get()->result_array();
	}

	public function get_user_selected_account($post_data){
		$accounts = $this->user_accounts($post_data, TRUE);
		$view_data = array();

		foreach ($accounts as $key => $account) {
			if($post_data["account_type_id"] == CHECKINGS){
				$view_data[$account["category_name"]][] = array(
					"payee"  				=> $account["payee"],
					"transaction_amount" 	=> $account["transaction_amount"],
					"sub_category_amount" 	=> $account["sub_category_amount"],
					"sub_category_name" 	=> $account["sub_category_name"],
					"type" 					=>  (($account["transcation_type_id"] == CHECKINGS) ? "Outflow" : "Inflow"),
					"transactions_date" 	=> date("M d, Y", strtotime($account["transactions_date"]))
				);
			}
			else{
				if($account["parent_transaction_id"] == 0)
					$account["parent_transaction_id"] = $account["transaction_id"];
					
				$account["type"] = ($account["transcation_type_id"] == WITHDRAW) ? "Withdraw" : (($account["transcation_type_id"] == DEPOSIT) ? "Deposit" : "Direct Payment");

				$view_data[$account["parent_transaction_id"]][] = $account;
			}
		}

		$checking_amount = $this->db->select("*")
								->from("accounts")
								->join("account_types", "account_types.account_id = accounts.id")
								->where("accounts.user_id", $_SESSION["user_data"]["id"])
								->where("accounts.id", $post_data["account_id"])
								->where("account_types.type", ($post_data["account_type_id"] == CHECKINGS ? CHECKINGS : SAVINGS))
								->get()->row_array();

		$partial_name = ($post_data["account_type_id"] == CHECKINGS) ? "partials/_checking_account_table" : "partials/_saving_account_table";

		return $this->load->view($partial_name, array("accounts" => $view_data, "checking_amount" => $checking_amount) , TRUE);
	}

	public function get_account_type($account_id, $account_type_id){
		return $this->db->select("*")
					 	->from("account_types")
					 	->where("account_types.account_id", $account_id)
						->where("account_types.type", $account_type_id) 
						->get()->row_array();
	}
/* End of Re used codes */

/* Main Dashboard*/
	public function dashboard_highchart_data($post_data){

	}

	public function get_user_activities(){
		$this->load->helper("time_ago");

		/* Activities */
		$activities = $this->activities();

		$user_activities = array(); 

		foreach ($activities as $activity) 
		{   
			$user_activities[] = $activity['date_created'];
		}

		array_multisort($user_activities, SORT_DESC, $activities);
		/*End of  Activities*/

		/* highcharts*/

		/* end of highcharts*/


		$view_data["activity"] = $this->load->view("partials/_dashboard_activity", array("activities" => $activities) , TRUE);

		return $view_data;
	}

	public function activities(){
		$user_added_accounts = $this->db->select("users.id as user_id, accounts.account_name, accounts.description, account_types.type, account_types.amount, account_types.created_at as date_created")
									   ->from("users")
									   ->join("accounts", "accounts.user_id = users.id")
									   ->join("account_types", "account_types.account_id = accounts.id")
									   ->where("users.id",$_SESSION["user_data"]["id"])
									   ->get()->result_array();

		// $user_added_categories = $this->db->select("users.id as user_id, categories.name as category_name, sub_categories.name as sub_category_name, budgets.amount, budgets.created_at as date_created")
		// 							   ->from("users")
		// 							   ->join("categories", "categories.user_id = users.id")
		// 							   ->join("sub_categories", "sub_categories.category_id = categories.id")
		// 							   ->join("budgets", "budgets.sub_category_id = sub_categories.id")
		// 							   ->where("users.id",$_SESSION["user_data"]["id"])
		// 							   ->get()->result_array();

		$user_added_transaction = $this->db->select("users.id as user_id, categories.name as category_name, sub_categories.name as sub_category_name,accounts.account_name, account_types.type as account_type, transactions.amount, transactions.payee, transactions.type_id as transaction_type,  transactions.created_at as date_created")
									   ->from("users")
									   ->join("categories", "categories.user_id = users.id")
									   ->join("sub_categories", "sub_categories.category_id = categories.id")
									   ->join("budgets", "budgets.sub_category_id = sub_categories.id")
									   ->join("transactions", "transactions.budget_id = budgets.id")
									   ->join("account_types", "account_types.id = transactions.account_type_id")
									   ->join("accounts", "accounts.id = account_types.account_id")
									   ->where("users.id",$_SESSION["user_data"]["id"])
									   ->get()->result_array();

		return  array_merge($user_added_accounts, $user_added_transaction);
	}

	public function accounts($is_not_on_load = FALSE){
		$accounts = $this->db->select("id, account_name")
				 ->from("accounts")
				 ->where("accounts.user_id", $_SESSION["user_data"]["id"])
				 ->get()->result_array();

		return  $this->load->view("partials/_select_accounts", array("accounts" => $accounts, "is_not_on_load" => $is_not_on_load) , TRUE);
	}
	public function category($is_not_on_load = FALSE, $is_for_checking = FALSE){
		$categories = $this->db->select("id, name")
				 ->from("categories")
				 ->where("categories.user_id", $_SESSION["user_data"]["id"])
				 ->get()->result_array();

		if(!$is_for_checking)
			return  $this->load->view("partials/_select_category", array("categories" => $categories, "is_not_on_load" => $is_not_on_load) , TRUE);
		else 
			return $categories;
	}
/* End of Main Dashboard*/

}
//eof