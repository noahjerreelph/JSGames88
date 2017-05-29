<?
foreach ($budgets as $transacation_date => $budget) {
?>
	<div class="budget_data">
		<div class="budget_info"> 
			<div class="budget_date">
				<h3><?= $transacation_date ?><h3>
			 </div> 
			<div class="budget_total">
				 <h3 class='<?= ($budget["over_all_balance"] < 0 ) ? "account_negative" : "" ?>'><?= number_format( $budget["over_all_balance"] ,2)?><h3>
			 </div>
		</div>
		<table>
			<thead>
				<tr>
					<th>
						<p class="category_head"><span class="glyphicon glyphicon-triangle-bottom show_checking_form" aria-hidden="true">Category</p>
					</th>
					<th>
						<p>Budget</p>
						<p><?= number_format( $budget["over_all_total_budget"] ,2)?></p>
					</th>
					<th>
						<p>Outflow</p>
						<p><?= number_format( $budget["over_all_total_outflow"] ,2)?></p>
					</th>
					<th>
						<p>Balance</p>
						<p><?= number_format( $budget["over_all_balance"] ,2)?></p>
					</th>
				</tr>
			</thead>
			<tbody>
				<?
				foreach ($budget["categories"] as $category_name => $category) { 
					foreach ($category as $sub_category) { ?>
					<tr>
						<td class="category_head"><span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span><?= $category_name ?></td>
						<td><?= $sub_category["total_budget"] ?></td>
						<td><?= $sub_category["total_outflow"] ?></td>
						<td><?= $sub_category["balance_amount"] ?></td>
					</tr>
<?						 foreach ($sub_category["data"] as $data) { ?>
							<tr>
								<td><?= $data["sub_category_name"] ?></td>
								<td><?= $data["sub_category_amount"] ?></td>
								<td><?= $data["outflow_amount"] ?></td>
								<td><?= $data["balance_amount"] ?></td>
							</tr>
<?						}
					}
				} 

				?>
			</tbody>
		</table>
	</div>

<? } ?>