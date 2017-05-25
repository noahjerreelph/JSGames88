<h2>P <?= number_format( $checking_amount["amount"]  ,2)?></h2>
<div id="account_checking_content" style="">
	<div class="account_checking_data">
		<table>
			<thead>
				<tr>
					<th>Categories <span class="glyphicon glyphicon-plus show_checking_form" aria-hidden="true"></span></th>
					<th>Payee Name</th>
					<th>Type</th>
					<th>Amount</th>
					<th>date</th>
				</tr>
			</thead>
			<tbody>

		<? foreach ($accounts as $key => $account) {  ?>
				<tr>
					<td><span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span><?=$key ?></td>
					<td></td>
					<td></td>
					<td></td>		
				</tr>
		<? 		foreach ($account as $key => $user) {  ?>
				<tr>
					<td><?= $user["sub_category_name"] ?></td>
					<td><?= $user["payee"] ?></td>
					<td><?= $user["type"] ?></td>
					<td><?= $user["transaction_amount"] ?></td>
					<td><?= $user["transactions_date"] ?></td>
				</tr>
		<? 		} ?>
		<? } ?>
			</tbody>
		</table>
	</div>
	<button id="add_checking_account" class="btn btn-primary">Add Transaction</button>
</div>