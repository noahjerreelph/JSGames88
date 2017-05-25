
<h2>P <?= number_format( $checking_amount["amount"]  ,2)?></h2>
<div id="account_saving_content" style="">

	<table>
		<thead>
			<tr>
				<th>Description</th>
				<th>Payee</th>
				<th>Type</th>
				<th>Amount</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
<? 		foreach ($accounts as $account) {  ?> 
			 <tr>
				<td><?= $account[0]["description"]?></td>
				<td><?= $account[0]["payee"]?></td>
				<td><?= $account[0]["type"]?></td>
				<td><?
					$total = 0;
					
					foreach ($account as $key => $checking) {
						$total += $checking["transaction_amount"];
					}

					echo $total;
				?></td>
				<td><?= $account[0]["transactions_date"]?></td>
			</tr>
<? 			
		}
?>
		</tbody>
	</table>
	<button id="add_saving_account" class="btn btn-primary">Add Transaction</button>
</div>