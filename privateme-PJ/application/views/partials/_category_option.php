<option value="">Select Category</option>
<?  foreach ($categories as $key => $category) { 
		if($category["name"] != "Income" && $account_type != 4){?> 
			<option value="<?= $category['id']?>"><?= $category["name"] ?></option>
<?		}
		else if($category["name"] == "Income" && $account_type == 4){?>
			<option value="<?= $category['id']?>"><?= $category["name"] ?></option>

<?		}
	} ?>