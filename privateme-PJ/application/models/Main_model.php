<?php 
class Main_model extends CI_Model {

	public function __construct(){
		parent::__construct();

		if(isset($_SESSION['user_id'])){
			return false;
		}
	}

	/* Budget */
	public function get_user_budgets(){
		$fields = "users.id as user_id, users.email_address, categories.id as category_id, categories.name as category_name, 
				   sub_categories.id as sub_category_id, sub_categories.name as sub_category_name, 
				   budgets.amount as sub_category_amount, budgets.created_at as budget_date,
				   transactions.type_id, transactions.amount as outflow_amount";
		$budgets = $this->db->select($fields)
						 ->from("users")
						 ->join("categories", "categories.user_id = users.id")
						 ->join("sub_categories", "sub_categories.category_id = categories.id", "left")
						 ->join("budgets", "budgets.sub_category_id = sub_categories.id")
						 ->join("transactions", "transactions.budget_id = budgets.id")
						 ->where("users.id", $_SESSION["user_data"]["id"])
						 #->where("categories.created_at >=", date("Y-m-d", strtotime("first day of last month")))
						# ->where("categories.created_at <=", date("Y-m-d", strtotime("last day of next month")))
						 ->group_by("budgets.created_at")
						 ->get()->result_array();



		$budget_data = array(); 
		$total_budget = 0;

		foreach ($budgets as $key => $budget) {
			$total_budget = $total_budget + $budget["sub_category_amount"];

			$budget["budget_date"] = date("Y-m", strtotime($budget["budget_date"]));
			$budget_data[$budget["budget_date"]][$budget["category_id"]][] = array(
				"category_id"			=> $budget["category_id"],
				"category_name" 		=> $budget["category_name"],
				"sub_category_id" 		=> $budget["sub_category_id"],
				"sub_category_name" 	=> $budget["sub_category_name"],
				"sub_category_amount" 	=> $budget["sub_category_amount"],
				"outflow_amount" 		=> $budget["outflow_amount"],
				"type_id" 				=> $budget["type_id"],
				"total_budget" 			=> $total_budget,
			);
		}

		return $this->load->view("partials/_budget_table", array("budgets" => $budget_data), TRUE);
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
			"user_id"		=> $_SESSION["user_data"]["id"],
			"budget_id" 	=> $budget_id,
			"type_id"		=> 1,
			"account_id"	=> $post_data["account_id"],
			"payee" 		=> $post_data["payee_name"],
			"description" 	=> $post_data["description"],
			"amount" 		=> $post_data["amount"],
			"transacted_at" => (($post_data["is_not_scheduled"] == "false") ? date("Y-m-d", strtotime($post_data["schedule_interview_date"]))."00:00:00" : NULL),
			"created_at" 	=> date("Y-m-d H:i:s"),
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
		$categories_info = json_decode($post_data["category_info"], true);
		$parent_transaction_id = 0;

		foreach ($categories_info as $key => $category_info) {
			foreach ($category_info["sub_categories"] as $key => $sub_category) {

				if($sub_category["is_new_sub_category"] == "new_sub"){
					$this->db->insert("sub_categories", array(
						"category_id" => $category_info["category_id"],
						"name"		  => $sub_category["sub_category_id"],
						"created_at"  => date("Y-m-d H:i:s")
					));

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
					$budget["category_id"]     = $category_info["category_id"];
					$budget["sub_category_id"] = $sub_category["sub_category_id"];

					$new_budget_id = $this->get_budget_id($budget)["budget_id"];
				}

				$this->db->insert("transactions", array(
					"user_id"		=> $_SESSION["user_data"]["id"],
					"parent_transaction_id"	=> $parent_transaction_id,
					"budget_id" 	=> $new_budget_id,
					"type_id" 		=> $post_data["type"],
					"account_id" 	=> $post_data["account_id"],
					"payee" 		=> $post_data["payee_name"],
					"amount" 		=> $sub_category["sub_category_amount"],
					"transacted_at" => ((isset($sub_category["schedule_transaction"][0])) ? date("Y-m-d h:i:s", strtotime($sub_category["schedule_transaction"][0])) : NULL),
					"description" 	=> $post_data["description"],
					"created_at" 	=> date("Y-m-d H:i:s")
				));

				if($key == 0)
					$parent_transaction_id = $this->db->insert_id();
			}
		}

		return TRUE;
	}
	/* End of Saving Account*/

	public function get_user_categories(){
		$categories = $this->db->select("id, categories.name")
					    ->from("categories")
					    ->where("user_id", $_SESSION["user_data"]["id"])
					    ->get()->result_array();

		return $this->load->view("partials/_category_option", array("categories" =>$categories), TRUE);
	}

	public function get_user_sub_categories($post_data){
		$categories = $this->db->select("id, sub_categories.name")
					    ->from("sub_categories")
					    ->where("category_id", $post_data["category_id"])
					    ->get()->result_array();

		return $this->load->view("partials/_sub_category_option", array("sub_categories" =>$categories), TRUE);
	}

	public function get_user_accounts(){
		$accounts = $this->db->select("accounts.id as account_id, account_name, account_types.id as account_type_id, account_types.type")
					    ->from("accounts")
					    ->join("account_types", "account_types.account_id = accounts.id")
					    ->join("transactions", "transactions.account_id = accounts.id", "left")
					    ->where("accounts.user_id", $_SESSION["user_data"]["id"])
					    ->where("account_types.type", 1) #checking
					    ->get()->result_array();

		$user_accounts = array();	

		foreach ($accounts as $key => $account) {
			$user_accounts[$account["account_id"]]["account_id"] = $account["account_id"];
			$user_accounts[$account["account_id"]]["name"] = $account["account_name"];
			$user_accounts[$account["account_id"]]["account_types"][] = array("account_name" => $account["account_name"], "account_type_id" => $account["account_type_id"], "type" => $account["type"]);
		}	

		return $this->load->view("partials/_user_accounts_nav", array("accounts" => $user_accounts) , TRUE);
	}

	public function get_user_selected_account($post_data){
		$fields = "categories.id as category_id, categories.name as category_name, transactions.payee, transactions.created_at as transactions_date,  transactions.amount as transaction_amount, transactions.type_id as transcation_type_id,  budgets.amount as sub_category_amount,";

		if($post_data["account_type"] == 1){
			$fields .= " sub_categories.name as sub_category_name,";
		}
		else{
			$fields .= "transactions.id as transaction_id,transactions.parent_transaction_id, transactions.description, ";
		}


		$this->db->select($fields)
				 ->from("categories")
				 ->join("sub_categories", "sub_categories.category_id = categories.id")
				 ->join("budgets", "budgets.sub_category_id = sub_categories.id")
				 ->join("transactions", "transactions.budget_id = budgets.id")
				 ->where("categories.user_id", $_SESSION["user_data"]["id"])
				 ->where("transactions.account_id", $post_data["account_id"])
				 ->where_in("type_id", ($post_data["account_type"] == CHECKINGS ? array(OUTFLOW, INFLOW) : array(WITHDRAW, DEPOSIT, DIRECT_PAYMENT)));

		if(isset($post_data["date_from"]) && isset($post_data["date_to"])){
			$this->db->where("transactions.created_at >=", date("Y-m-d", strtotime($post_data["date_from"])). " 00:00:00");
			$this->db->where("transactions.created_at <=", date("Y-m-d", strtotime($post_data["date_to"])). " 23:59:59");
		}

		$accounts = $this->db->get()->result_array();

		$view_data = array();

		foreach ($accounts as $key => $account) {

			if($post_data["account_type"] == CHECKINGS){
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
								->where("account_types.type", ($post_data["account_type"] == CHECKINGS ? CHECKINGS : SAVINGS))
								->get()->row_array();

		$partial_name = ($post_data["account_type"] == CHECKINGS) ? "partials/_checking_account_table" : "partials/_saving_account_table";

		return $this->load->view($partial_name, array("accounts" => $view_data, "checking_amount" => $checking_amount) , TRUE);
	}
}
//eof