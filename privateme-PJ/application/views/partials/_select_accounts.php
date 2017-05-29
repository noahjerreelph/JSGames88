<? if(!$is_not_on_load){
	?>
<select name="" id="">
	<option value="">All Accounts</option>
	<? foreach ($accounts as $key => $account) { ?>
		<option value='<?= $account["id"] ?>'><?= $account["account_name"] ?></option>
	<? }
	?>
</select>

<? }
else{?>
	<option value=''>All Accounts</option>
	
<?	foreach ($accounts as $key => $account) { ?>
		<option value='<?= $account["id"] ?>'><?= $account["account_name"] ?></option>
<? } 
}?>