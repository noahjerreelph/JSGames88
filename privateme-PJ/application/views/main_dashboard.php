<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Private.me | Dashboard</title>
	<link rel="stylesheet" href="../assets/css/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.css?<?= time(); ?>">
	<link rel="stylesheet" href="../assets/css/vendor/bootstrap/bootstrap.css?<?= time(); ?>">
	<link rel="stylesheet" href="assets/css/main_dashboard.css?<?= time(); ?>">
	<link rel="stylesheet" href="assets/css/global.css?<?= time(); ?>">

	<script src="assets/js/vendor/jquery.js?<?= time(); ?>"></script>
	<script src="../assets/js/vendor/bootstrap/bootstrap.min.js?<?= time(); ?>"></script>
	<script src="assets/js/main_dashboard.js?<?= time(); ?>"></script>
	<script src="https://code.highcharts.com/highcharts.js?<?= time(); ?>"></script>
	<script src="https://code.highcharts.com/modules/exporting.js?<?= time(); ?>"></script>
    <script src="../assets/js/vendor/moment/moment.js?<?= time(); ?>"></script>
    <script src="../assets/js/vendor/moment/moment-timezone-all-years.js?<?= time(); ?>"></script>
	<script src="../assets/js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js?<?= time(); ?>"></script>
</head>
</head>
<body>
	<div id="wrapper">
		<div id="header">
			<div class="dashboard_logo pull-left">
				<img src="assets/images/agent.png" alt="" class="agent_dashboard">
				<span>Private.me</span>
			</div>
			<div class="dashboard_setting pull-right">
				<span class="glyphicon glyphicon-cog dropdown-toggle" aria-hidden="true" data-toggle="dropdown"></span>
			    <ul id="dropdown_setting" class="dropdown-menu">
			      <!-- <li><a href="#">Dashboard</a></li> -->
			      <li><a href="/account">Accounts</a></li>
			      <li><a href="/logout">Logout</a></li>
			    </ul>
				<span><?= $_SESSION["user_data"]["first_name"] ." ". $_SESSION["user_data"]["last_name"]?></span>
			</div>

		</div>
		<div id="container">
			<div id="left_content">
				<h1>Recent Activity</h1>
				<div id="activities">
					<?= $activities["activity"] ?>
				</div>
			</div>
			<div id="main_content">
				<h1>Financial Snapshot</h1>
				<div id="highcharts_section">
					<div id="highchart_filter">
						<?= $select_account ?>
						<select name="" id="">
							<option value="">All Category</option>
							<option value="">Income</option>
							<option value="">Expenses</option>
						</select>
						<div style="position:relative;display: inline-block; ">
							<input type="text" class="date_picker_input" placeholder="Select date">
							<input type="text" class="date_picker_input " placeholder="Select date">
						</div>
						<input type="submit" value="submit">
					</div>
					<h1>Income and Expenses</h1>
					<h3>P 112, 500.00</h3>
					<div id="highchart_table"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>