<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Private.me | Dashboard</title>
    <link rel="stylesheet" href="../assets/css/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.css?<?= time(); ?>">
	<link rel="stylesheet" href="../assets/css/vendor/bootstrap/bootstrap.css?<?= time(); ?>">
	<link rel="stylesheet" href="assets/css/account_dashboard.css?<?= time(); ?>">
	<link rel="stylesheet" href="assets/css/global.css?<?= time(); ?>">

	<script src="assets/js/vendor/jquery.js?<?= time(); ?>"></script>
	<script src="../assets/js/vendor/bootstrap/bootstrap.min.js?<?= time(); ?>"></script>
	<script src="assets/js/account_dashboard.js?<?= time(); ?>"></script>
	<script src="https://code.highcharts.com/highcharts.js?<?= time(); ?>"></script>
	<script src="https://code.highcharts.com/modules/exporting.js?<?= time(); ?>"></script>
    <script src="../assets/js/vendor/moment/moment.js?<?= time(); ?>"></script>
    <script src="../assets/js/vendor/moment/moment-timezone-all-years.js?<?= time(); ?>"></script>
	<script src="../assets/js/vendor/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js?<?= time(); ?>"></script>
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
			      <li><a href="/dashboard">Dashboard</a></li>
			      <li><a href="/logout">Logout</a></li>
			    </ul>
				<span><?= $_SESSION["user_data"]["first_name"] ." ". $_SESSION["user_data"]["last_name"] ?></span>
			</div>
		</div>
		<div id="container">
			<div id="left_content" style="">
				<ul id="top_navigation">
					<li class="active_filter" id="budget_nav"><a href="#">Budget</a></li>
					<li id="report_nav"><a href="#">Reports</a></li>
					<li id="account_nav"><a href="#">All Accounts</a></li>
				</ul>
				<div id="bottom_navigation">
					<div id="bottom_accounts" style="">
						<?= $get_user_accounts ?>
					</div>
					<button id="add_account" class="btn btn-primary">Add Account</button>
				</div>
			</div>	
			<div id="main_content">
				<div id="budget_field" class="content_field" style="display:none;">
					<div class="budget_filter">
						<form action="" id="budget_filter" method="post">
							<input type="text" class="date_picker_input" name="budget_from" placeholder="Select date">
							<input type="text" class="date_picker_input " name="budget_to" placeholder="Select date">
							<input type="submit" value="submit">
						</form>
					</div>
					<div id="budget_content">
						<?= $budgets ?>
					</div>
				</div>
				<div id="report_field" class="content_field" style="display:none">
					<div class="report_filter">
						<form action="" method="post" id="report_form">
							<select name="account_filter" id="report_filter_all_account" class="form-control">
								<option value="">All Account</option>
							</select>
							<select name="type_filter" id="report_filter_spendings" class="form-control">
								<option value="">Spendings</option>
								<option value="">Income</option>
								<option value="">Balances</option>
							</select>
							<input type="text" class="date_picker_input" name="report_from" placeholder="Select date">
							<input type="text" class="date_picker_input " name="report_to" placeholder="Select date">
							<input type="submit" value=Submit>
						</form>
					</div>
					<div id="report_content">
						<h2>Spendings</h2>
						<h2>P 34,448.00</h2>

						<div id="report_highchart">
						</div>

						<h2>Activities</h2>
						<table>
							<thead>
								<tr>
									<th>Account</th>
									<th>Category</th>
									<th>Sub Category</th>
									<th>Payee</th>
									<th>Amount</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>New account 1</td>
									<td>Housing</td>
									<td>Rent</td>
									<td>Landlord</td>
									<td>P 4,000.00</td>
									<td>May 14, 2017 10:00:00</td>
								</tr>
								<tr>
									<td>New account 2</td>
									<td>Utilities</td>
									<td>Rent</td>
									<td>Landlord</td>
									<td>P 4,000.00</td>
									<td>May 14, 2017 10:00:00</td>
								</tr>
								<tr>
									<td>New account 3</td>
									<td>Housing</td>
									<td>Rent</td>
									<td>Landlord</td>
									<td>P 4,000.00</td>
									<td>May 14, 2017 10:00:00</td>
								</tr>
							</tbody>
						</table>
						<input type="submit" value="Prev">
						<input type="submit" value="Next">
					</div>
				</div>
				<div id="all_accounts_field" class="content_field" style="display:none">
					<select name="" id="all_account_option">
						<option value="1">Checkings</option>
						<option value="2">Savings</option>
					</select>

					<div id="all_account_field"></div>
				</div>
				<div id="account_saving_field" class="content_field" style="display:none">
					<h2>Saving</h2>
					<input type="text" class="date_picker_input saving_date_from" name="schedule_interview_date" placeholder="Select date">
					<input type="text" class="date_picker_input saving_date_to" name="schedule_interview_date" placeholder="Select date">
					<div class="account_append">
					</div>
				</div>
				<div id="account_checking_field" class="content_field" style="display:none">
					<h2>Checking</h2>
					<input type="text" class="date_picker_input checking_date_from" placeholder="Select date">
					<input type="text" class="date_picker_input checking_date_to" placeholder="Select date">
					<div class="account_append">
						
					</div>
				</div>
			</div>
		</div>
		<div id="budget_add_category" style="display:none">
			<form action="" method="post" id="budget_insert_category">
				<h1>New Category</h1>
				<input type="text" placeholder="Enter Category Name" class="form-control" name="budget_category_name">
				<table>
					<thead>
						<tr>
							<th>Sub Categories</th>
							<th>Budget</th>
							<th>Outflow <span class="glyphicon glyphicon-plus add_budget_subcategory" aria-hidden="true"></th>
						</tr>
					</thead>
					<tbody>
						<tr class="total_subcategory">
							<td>Total</td>
							<td>0</td>
							<td>0</td>
						</tr>
					</tbody>
				</table>
				<div class="budget_add_subcategories" style="display:none">
					<input type="text" placeholder="Enter Sub category Name" class="form-control" id="budget_subcategory_name">
					<input type="number" placeholder="Enter budget amount" class="form-control" id="budget_subcategory_amount">
					<input type="number" placeholder="Enter outflow if any" class="form-control" id="budget_subcategory_outflow">
					<a href="#" class="btn btn-default add_subcategory_td">Add</a>
					<a href="#" class="btn btn-default cancel_add_subcategory">Cancel</a>
					<div id="show_budget_error_message"></div>
				</div>
				<input type="submit" value="Add" class="btn btn-primary">
				<a href="#" class="btn btn-default cancel_budget">Cancel</a>
			</form>
		</div>

		<div id="user_add_account" style="display:none">
			<form action="" id="add_user_account" method="post">
				<input type="hidden" name="user_id" value="<?= (isset($_SESSION['user_data'])) ?  $_SESSION['user_data']['id'] : '' ?>">

				<h1>New Account</h1>
				<input type="text" placeholder="Enter Account Name" class="form-control" name="account_name">
				<textarea class="form-control" rows="3"  name="description" placeholder="Description"></textarea>
				<div class="user_add_account_balance">
					<h1>Account Types</h1>
					<input type="text" placeholder="Saving starting balance" class="form-control" name="savings_amount">
					<input type="text" placeholder="Checking starting balance" class="form-control" name="checkings_amount">
				</div>
				<input type="submit" value="Add" class="btn btn-primary">
				<a href="#" class="btn btn-default" id="add_account_exit">Cancel</a>
			</form>
			<div id="add_account_error_message" class="danger"></div>
		</div>
		<div id="user_checking_account" style="display:none">
			<form action="" id="checking_account_form" method="post">
				<h1>New Transaction</h1>
				<input type="text" placeholder="Enter Account Name" class="form-control" name="payee_name">
				<textarea class="form-control" rows="3"  name="description" placeholder="Enter Transaction Description"></textarea>
				<div class="user_checking_account_balance">
					<h2>Category Information</h2>
					<select name="category_id" id="checking_account_category" class="form-control">
						<option value="">Select Category</option>
					</select>
					<select name="sub_category_id" id="checking_account_sub_category" class="form-control">
						<option value="sub_category">Select category first</option>
					</select>
					<input type="text" placeholder="Enter sub-category name" class="form-control" name="subcategory_name" id="checking_account_sub_name" style="display:none">
					<input type="text" placeholder="Enter Amount" class="form-control" name="amount">
					<input id="checking_checkbox_input" type="checkbox" >Scheduled Transaction
					<input type="text" class="form-control date_picker_input" name="schedule_interview_date" id="checking_scheduled_input" style="display:none" placeholder="Select date">
				</div>
				<input type="submit" value="Add" class="btn btn-primary">
				<a href="#" class="btn btn-default" id="user_checking_account_exit">Cancel</a>
			</form>
			<div id="add_saving_account_error_message" class="danger"></div>
		</div>
		<div id="user_saving_account" style="display:none">
			<form action="" id="insert_saving_account" method="post">
				<h2>New Transaction</h2>
				<input type="text" placeholder="Payee Name" class="form-control" name="payee_name">
				<select name="type" id="saving_account_type" class="form-control">
					<option value="3">Withdraw</option>
					<option value="4">Deposit</option>
					<option value="5">Direct Payment</option>
				</select>
				<div class="user_saving_account_balance">
					<h2>Transction Information</h2>
					<textarea class="form-control" rows="3"  name="description" placeholder="Enter Transaction Description"></textarea>
				</div>
				<h2>Breakdown <span class="glyphicon glyphicon-plus" aria-hidden="true" id="add_saving_breakdown"></span></h2>
				<div class="user_saving_breakdown">
				</div>
				<ul>
					<!-- <li>Total <span>12312</span></li> -->
				</ul>
				<div id="saving_account_options" style="display:none">
					<select name="" id="" class="form-control" id="saving_category_select">
						<option value="">Select Category</option>
					</select>
					<select name="" id="" class="form-control"  id="saving_sub_category_select">
						<option value="">Select Sub Category</option>
						<option value="add_new_sub">Add new subcategory</option>
					</select>
					<input type="text" placeholder="Enter Subcategory Name" id="add_saving_new_subcategory" class="form-control add_saving_new_subcategory" style="display:none">
					<input type="text" placeholder="Input Amount" class="form-control" id="saving_sub_category_amount">
					<a href="#" class="btn btn-primary saving_account_add">Add</a>
					<a href="#" class="btn btn-default">Cancel</a>
				</div>

				<input type="checkbox" name="" id="saving_scheduled_information" ><p>Scheduled Information</p>
				<input type="text" class="form-control date_picker_input" name="schedule_interview_date" id="saving_scheduled_input" style="display:none">
				<input type="submit" value="Add" class="btn btn-primary">
				<a href="#" class="btn btn-default" id="user_saving_account_exit">Cancel</a>
			</form>
			<div id="add_checkout_account_error_message" class="danger"></div>
		</div>
	</div>
</body>
</html>