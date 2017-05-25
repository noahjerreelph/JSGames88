<? 
foreach ($accounts as $key => $user_account) { ?>
	<h4><?= $user_account["name"] ?></h4>
	<ul class="user_accounts_selection" data-account-id='<?= $user_account["account_id"] ?>'>
		<li data-type-id="1"> <a href="#">Checkings</a></li>
		<li data-type-id="2"> <a href="#">Savings</a></li>
	</ul>
<?}?>
