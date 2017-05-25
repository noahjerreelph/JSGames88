<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Private.me</title>
	<link rel="stylesheet" href="../assets/css/vendor/bootstrap/bootstrap.css">
	<link rel="stylesheet" href="assets/css/login.css">
	<link rel="stylesheet" href="assets/css/global.css">
	<script src="assets/js/vendor/jquery.js"></script>
	<script src="assets/js/login_dashboard.js"></script>
	<script src="../assets/js/vendor/bootstrap/bootstrap.min.js?<?= time(); ?>"></script>
</head>
<body>
	<div id="wrapper">
		<input type="hidden" id="check_if_user_has_account" value="<?= (isset($_SESSION['user_data'])) ? $user_has_account : 'true'?>">
		<div id="login_container" style="">
			<img src="assets/images/agent.png" alt="" class="agent">
			<h2>Login</h2>
			<form action="" id="user_login" method="post">
				<input type="text" name="email_address" placeholder="Enter your email" class="form-control">
				<input type="password" name="password" placeholder="password" class="form-control">
				<p>Don't have an account yet? Click <a href="#" id="show_register_content">Here</a> to register.</p>
				<input type="submit" value="Login" class="btn btn-primary btn-md btn-block">
			</form>
				<a href="<?= GOOGLE_AUTH_URI ?>" id=""  class="btn btn-primary btn-md btn-block"> Login with Google </a>
				<div id="login_error_message" class="danger"></div>
		</div>
		<div id="register_container" style="display:none">
			<img src="assets/images/agent.png" alt="" class="agent">
			<h2>Register</h2>
			<form action="" id="user_register" method="post">
				<div class="form-group">
					<label for="exampleInputEmail1">First Name</label>
					<input type="text" class="form-control" id="exampleInputEmail1" name="first_name">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Last Name</label>
					<input type="text" class="form-control" id="exampleInputPassword1"  name="last_name">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Email Address </label>
					<input type="email" class="form-control" id="exampleInputPassword1"  name="email_address">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" class="form-control" id="exampleInputPassword1" name="password">
				</div>
				<input type="submit" value="Register" class="btn btn-primary btn-md btn-block">
			</form>
			<input type="submit" value="Login" class="btn btn-default btn-md btn-block">
		</div>
		<div id="new_account_container" style="display:none">
			<img src="assets/images/agent.png" alt="" class="agent">
			<h2>New Account</h2>
			<form action="" id="add_user_account" method="post">
				<input type="hidden" name="user_id" value="<?= (isset($_SESSION['user_data'])) ?  $_SESSION['user_data']['id'] : '' ?>">
				<div class="form-group">
					<label for="exampleInputEmail1">Account Name</label>
					<input type="text" class="form-control" id="exampleInputEmail1" name="account_name">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Savings</label>
					<input type="number" class="form-control" id="exampleInputPassword1" name="savings_amount">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Checkings</label>
					<input type="number" class="form-control" id="exampleInputPassword1" name="checkings_amount">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Description</label>
					<textarea class="form-control" rows="3"  name="description"></textarea>
				</div>

				<input type="submit" value="Add Acount" class="btn btn-primary btn-md btn-block">
			</form>
			<div id="add_account_error_message" class="danger"></div>

		</div>
	</div>
</body>
</html>