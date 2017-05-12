<?php 

class Main_model extends CI_Model {

	public function __construct(){
		parent::__construct();

		if(isset($_SESSION['user_id'])){
			return false;
		}
	}
}
//eof