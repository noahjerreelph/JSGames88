<?php 

class User_model extends CI_Model {

	public function __construct(){
		parent::__construct();

		if(isset($_SESSION['user_id'])){
			return false;
		}
	}

	public function login($post_data){
		$this->load->library('session');
		$this->load->library('form_validation');
		$this->form_validation->set_rules('email_address', 'Email Address', 'required|valid_email');
		$this->form_validation->set_rules('password', 'Password', 'required|min_length[4]');

		if($this->form_validation->run() == FALSE){
			$data['message'] = validation_errors();
			$data['status'] = FALSE;
		}
		else{
			$user_email = $this->get_user($post_data["email_address"]);

			if(!empty($user_email)){
				$user_data = $this->get_user($post_data["email_address"], $post_data["password"]);

				if(!empty($user_email) && empty($user_data)){
					$data["status"]  = FALSE;
					$data["message"] = "Wrong email address or password!";
				}
				else if (!empty($user_email) && !empty($user_data)){
					if($user_email["is_gmail"] == 0){
						$this->session->set_userdata($user_data);
						$data["status"] = TRUE;
					}
					else if($user_email["is_gmail"] == 1){
						$data["status"] = FALSE;
						$data["message"] = "Use google login";
					}
				}
			}
			else{
				$data["status"]  = FALSE;
				$data["message"] = "Not found in our database!";
			}
		}

		return $data;
	}

	public function register($post_data){
		$this->load->library('form_validation');
		$this->form_validation->set_rules('email_address', 'Email Address', 'required|valid_email');
		$this->form_validation->set_rules('password', 'Password', 'required|min_length[4]');
		$this->form_validation->set_rules('first_name', 'First Name', 'required|min_length[2]');
		$this->form_validation->set_rules('last_name', 'Last Name', 'required|min_length[2]');
		$this->form_validation->set_rules('confirm_password', 'Confirm Password', 'required|min_length[4]|matches[password]');

		if($this->form_validation->run() == FALSE){
			$data['message'] = validation_errors();
			$data['status'] = FALSE;
		}
		else{
			unset($post_data["confirm_password"]);
			$post_data["created_at"] = date("Y-m-d H:i:s");

			$valid_email = $this->db->where("email_address", $post_data["email_address"])->get("users")->row_array();

			if(empty($valid_email)){
				$data['status'] = $this->insert_user($post_data["email_address"]);
			}
			else{
				$data['status'] = FALSE;
				$data['message'] = "Email Already Exist!";
			}	
		}

		return $data;
	}

	public function get_user($email_address, $password = NULL){
		#return $this->db->where("email_address", $email_address)->get("users")->row_array();

		$this->db->select("id as user_id, email_address, first_name, last_name, is_gmail") 
				 ->where("email_address", $email_address);

		if($password != null)
			$this->db->where("password", $password) ;

		return	$this->db->get("users")->row_array();
	}

	/* Google login function */
	public function get_google_user($fetched_google_token)
	{
		$url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='. $fetched_google_token->access_token;
		$curl_request = curl_init();
		curl_setopt($curl_request, CURLOPT_URL, $url);
		curl_setopt($curl_request, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl_request, CURLOPT_PROXYPORT, 3128);
		curl_setopt($curl_request, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($curl_request, CURLOPT_SSL_VERIFYPEER, 0);
		$curl_response = curl_exec($curl_request);
		curl_close($curl_request);

		$google_array = json_decode($curl_response, true);
		$google_token = $this->session->userdata('google_token');
		$google_token = array_merge($google_token, $google_array);

		$user = $this->get_user($google_token["email"]);

		if(!empty($user)){
			$update_user = array(
				"first_name"	=> $google_token["given_name"],
				"last_name"		=> $google_token["family_name"],
				"is_gmail" 		=> 1,
				"updated_at" 	=> date("Y-m-d H:i:s")
			);

			$this->db->where("users.id", $user["id"])->update("users", $update_user);

			$user_id = $user["id"];
			$email_address = $user["email_address"];
		}
		else{
			$add_user = array(
				"first_name"	=> $google_token["given_name"],
				"last_name"		=> $google_token["family_name"],
				"email_address" => $google_token["email"],
				"password" 		=> "googleuser",
				"is_gmail" 		=> 1,
				"created_at" 	=> date("Y-m-d H:i:s")
			);

			$adding_user = $this->insert_user($add_user);

			if($adding_user){
				$user_id = $this->db->insert_id();
				$email_address = $google_token["email"];
			}
		}

		$user_data = array(
			"id"			 => $user_id,
			"first_name"   	 => $google_token["given_name"],
			"last_name"   	 => $google_token["family_name"],
			"email_address"  => $google_token["email"],
		);

		return $user_data;
	}

	/* Insert user function */
	public function insert_user($user_data){
		return $this->db->insert('users', $user_data);
	}

}
//eof