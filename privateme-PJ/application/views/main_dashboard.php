<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Private.me | Dashboard</title>
	<script src="assets/js/vendor/jquery.js"></script>
	<script src="../assets/js/vendor/bootstrap/bootstrap.min.js?<?= time(); ?>"></script>
	<script src="assets/js/main_dashboard.js"></script>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<link rel="stylesheet" href="../assets/css/vendor/bootstrap/bootstrap.css">
	<link rel="stylesheet" href="assets/css/main_dashboard.css">
	<link rel="stylesheet" href="assets/css/global.css">
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
				<span>Noah Guillen</span>
			</div>

		</div>
		<div id="container">
			<div id="left_content">
				<h1>Recent Activity</h1>
				<div id="activities">
					<ul>
						<li>
							<div class="activity_name">
								<p>Added new bank account</p>
								<p>3 hours ago</p>
							</div>
							<div class="activity_descriptions">
								<div class="left_description">
									<h2>P 2,500.00</h2>
									<p>New Account 3</p>
								</div>
							</div>
						</li>
						<li>
							<div class="activity_name">
								<p>Added new exoeses to new Account1 / Checking</p>
								<p>5 hours ago</p>
							</div>
							<div class="activity_descriptions">
								<div class="left_description">
									<h2>P 2,500.00</h2>
									<p>Utilities / Electric Bill</p>
								</div>
								<div class="right_description">
									<p>Paid To:</p>
									<h2>Lueco</h2>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div id="main_content">
				<h1>Financial Snapshot</h1>
				<div id="highcharts_section">
					<div id="highchart_filter">
						<select name="" id="">
							<option value="">All Accounts</option>
							<option value="">Account 2</option>
							<option value="">Account 3</option>
						</select>
						<select name="" id="">
							<option value="">All Categories</option>
							<option value="">Account 2</option>
							<option value="">Account 3</option>
						</select>
						<input type="datepicker">
						<input type="datepicker">
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