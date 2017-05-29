<select name="" id="">
	<option value="">All Category</option>
	<? foreach ($categories as $key => $category) { ?>
		<option value='<?= $category["id"] ?>'><?= $category["name"] ?></option>
	<? }
	?>
</select>
