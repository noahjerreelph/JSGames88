$(document).ready(function(){

	if($("#check_if_user_has_account").val() == false){
		$("#login_container").hide();
		$("#register_container").hide();
		$("#new_account_container").show();
	}

	$("body").on("submit", "#user_register", function(){
		var user_register = $(this);
		var json_post_data = user_register.serialize();

		$.post("/users/register", json_post_data, function(data){
			if(data.status){
				$("#register_container").hide();
				$("#new_account_container").show();
				$("#new_account_container form input[name=user_id]").val(data.user_id);
			}
			else{
				user_register.siblings("#register_error_message").empty().append(data.message);
			}
		}, "json");

		return false;
	});

	$("body").on("submit", "#user_login", function(){
		var user_login = $(this);

		$.post("/users/login", user_login.serialize(), function(data){
			if(data.status){
				location.reload();
			}
			else{
				user_login.siblings("#login_error_message").empty().append(data.message);
			}
		}, "json");

		return false
	});

	$("body").on("submit", "#add_user_account", function(){
		var user_account = $(this);

		$.post("/users/add_user_account", user_account.serialize(), function(data){
			if(data.status){
				location.reload();
			}
			else{
				user_account.siblings("#add_account_error_message").empty().append(data.message);
			}
		}, "json");

		return false
	});

	document.getElementById("show_register_content").onclick = function(){
		document.getElementById("login_container").style.display = "none";
		document.getElementById("register_container").style.display = "block";
	}
});