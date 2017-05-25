<option value="">Select Sub Category</option>
<? foreach ($sub_categories as $key => $sub_category) { ?> 
		<option value="<?= $sub_category['id']?>"><?= $sub_category["name"] ?></option>
<?	} ?>
<option value="add_new_sub">Add new subcategory</option>
