<option value="">Select Category</option>
<? foreach ($categories as $key => $category) { ?> 
		<option value="<?= $category['id']?>"><?= $category["name"] ?></option>
<?	} ?>