<ul>
<?  foreach ($activities as $key => $activity) {
		if(isset($activity["account_type"]) && $activity["transaction_type"] == 1){ 
			$account_type = "";
				switch ($activity["transaction_type"] ) {
					case 1:
						$account_type = "Outflow";
						break;
					case 2:
						$account_type = "Inflow";
						break;
					case 3:
						$account_type = "Withdraw";
						break;
					case 4:
						$account_type = "Deposit";
						break;
						$account_type = "Direct Payment";
					case 5:
						break;
				}
			?>
			<li>
				<div class="activity_name">
					<p>Added new expenses to <?= $activity["account_name"]?> / <?= $account_type ?></p>
					<p><?= time_ago($activity["date_created"]) ?></p>
				</div>
				<div class="activity_descriptions">
					<div class="left_description">
						<h2>P <?= number_format( $activity["amount"]  ,2)?></h2>
						<p><?= $activity["category_name"] ?> / <?= $activity["sub_category_name"] ?></p>
					</div>
					<div class="right_description">
						<p>Paid To:</p>
						<h2><?= $activity["payee"] ?></h2>
					</div>
				</div>
			</li>
		<?}
		else{ ?> 
				<li>
			<div class="activity_name">
				<p>Added new bank account</p>
				<p><?= time_ago($activity["date_created"]) ?></p>
			</div>
			<div class="activity_descriptions">
				<div class="left_description">
					<h2>P <?= number_format( $activity["amount"]  ,2)?></h2>
					<p> <?= $activity["account_name"]?></p>
				</div>
			</div>
		</li>
<?		}
	}
?>

</ul>