<? foreach ($accounts as $key => $account) { ?> 
	<tr>
		<td><?= $account["account_name"] ?></td>
		<td><?= $account["category_name"] ?></td>
		<td><?= $account["sub_category_name"] ?></td>
		<td><?= $account["transaction_name"] ?></td>
		<td><?= $account["transaction_amount"] ?></td>
		<td><?= date("M d, Y h:i:s", strtotime($account["transaction_date"])) ?></td>
	</tr>
<? } ?>
