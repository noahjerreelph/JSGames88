$(document).ready(function(){
	$('.date_picker_input').datetimepicker({format: 'MM/DD/YYYY'});

	$("body").on("click", "#left_content li", function(){
		$("#left_content li.active_filter").removeClass("active_filter");
		$(this).addClass("active_filter");
		$(".date_picker_input").val("");
		$(".clone_popover").remove();
	});

/* adding new account */
	$("body").on("click", "#add_account", function(){
		$(".clone_popover").remove();
		var clone = $("#user_add_account").clone().show();

		clone.attr("id", "clone_user_add_account");
		clone.addClass("clone_popover");

		$("#wrapper").append(clone)
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
/* End of adding new account */

/* Adding Budget */
	$("body").on("click", ".show_checking_form", function(){
		$(".clone_popover").remove();

		var clone = $("#budget_add_category").clone().show();
		clone.attr("id", "clone_budget_add_category");
		clone.addClass("clone_popover");
		clone.find(".date_picker_input").datetimepicker({format: 'MM/DD/YYYY'});


		$("#wrapper").append(clone)
	})

	$("body").on("click", ".add_budget_subcategory", function(){
		$(this).closest("table").siblings(".budget_add_subcategories").show();
	});

	$("body").on("click", ".cancel_add_subcategory", function(){
		$(".budget_add_subcategories").hide();
	});

	$("body").on("click", ".cancel_budget", function(){
		$("#clone_budget_add_category").remove();
	});
	
	$("body").on("submit", "#budget_insert_category", function(){
		var budget_category = $(this);
		var budget_category_name = budget_category.find("input[name='budget_category_name']").val();; 
		var subcategory_data = [];

		$("#clone_budget_add_category table tbody tr:not(.total_subcategory)").each(function(index, data){
			subcategory_data[index] = {
				name : $(this).find("td:nth-child(1)").text(),
				amount : $(this).find("td:nth-child(2)").text(),
				outflow :$(this).find("td:nth-child(3)").text()
			};
		});

		$.post("/main/insert_budget_category",{budget_category_name, subcategory_data}, function(data){
			if(data){
				$(".user_accounts_selection .active_filter").trigger("click")
				$("#clone_budget_add_category").remove();
			}
		}, "json");

		return false;
	});

	$("body").on("click", ".add_subcategory_td", function(){
		var budget_subcategory_name = $(this).siblings("#budget_subcategory_name");
		var budget_subcategory_amount = $(this).siblings("#budget_subcategory_amount");
		var budget_subcategory_outflow = $(this).siblings("#budget_subcategory_outflow");

		if(budget_subcategory_name.val() != "" && budget_subcategory_amount.val() != "" && budget_subcategory_outflow.val() != ""){
			$("#clone_budget_add_category table tbody").prepend("<tr>\
					<td>"+budget_subcategory_name.val()+"</td>\
					<td>"+budget_subcategory_amount.val()+"</td>\
					<td>"+budget_subcategory_outflow.val()+"</td>\
					<td><span class='glyphicon glyphicon-minus remove_saving_subcategory' aria-hidden='true'></span></td>\
					</tr>");

			budget_subcategory_name.val("");
			budget_subcategory_amount.val("");
			budget_subcategory_outflow.val("");
			$(this).siblings("#show_budget_error_message").empty();

			var total_budget = 0;
			var total_outflow = 0;
			$("#clone_budget_add_category table tbody tr:not(.total_subcategory)").each(function(data, index){
				total_budget =  parseInt(total_budget) + parseInt($(this).find("td:nth-child(2)").text())
				total_outflow =  parseInt(total_outflow) + parseInt($(this).find("td:nth-child(3)").text())
			})

			$("#clone_budget_add_category table tbody tr.total_subcategory td:nth-child(2)").empty().html(total_budget);
			$("#clone_budget_add_category table tbody tr.total_subcategory td:nth-child(3)").empty().html(total_outflow);
		}
		else{
			$(this).siblings("#show_budget_error_message").empty().append("Fill up all the fields")
		}
	});
/* End of adding budget */

/* Checking account*/
	var is_checking_click = true;

	$("body").on("click", "#add_checking_account", function(){
		$(".clone_popover").remove();
		var clone = $("#user_checking_account").clone().show();
		clone.addClass("clone_popover");
		clone.find(".date_picker_input").datetimepicker({format: 'MM/DD/YYYY'});

		$("#wrapper").append(clone)

		$.get("/main/get_user_categories", function(data){
			if(data)
				clone.find("#checking_account_category").empty().append(data);
		}, "json")
	});

	$("body").on("change", "#checking_account_category", function(){
		$.post("/main/get_user_sub_categories", {category_id : $(this).val()}, function(data){
			if(data)
				$(".clone_popover #checking_account_sub_category").empty().append(data);
		}, "json")
	});

	$("body").on("change", "#checking_account_sub_category", function(){
		($(this).val() == "add_new_sub") ? $("#user_checking_account #checking_account_sub_name").show() : $("#user_checking_account #checking_account_sub_name").hide(); 
	});

	$("body").on("submit", "#checking_account_form", function(){
		var post_data = $(this).serialize();
		post_data += "&is_not_scheduled="+is_checking_click+"&account_id="+$("#bottom_navigation .active_filter").closest("ul").attr("data-account-id")+"&account_type_id="+$("#bottom_navigation .active_filter").attr("data-type-id");


		$.post("/main/insert_checking_account", post_data, function(data){
			if(data){
				$(".clone_popover").remove();
				$(".user_accounts_selection .active_filter").trigger("click");
			}
		}, "json");

		return false;
	});

	$("body").on("click", "#user_checking_account_exit", function(){
		$(".clone_popover").remove();
	})

	$("body").on("click", ".clone_popover #checking_checkbox_input", function(){
		if(is_checking_click == true){
			$(".clone_popover #checking_scheduled_input").show()
			is_checking_click = false;
		}
		else{
			$(".clone_popover #checking_scheduled_input").hide();
			is_checking_click = true;
		}
	})
/* end of Checking account*/

/* Saving account */
	$("body").on("click","#add_saving_account", function(){
		var clone = $("#user_saving_account").clone().show();
		clone.addClass("clone_popover");
		clone.find(".date_picker_input").datetimepicker({format: 'MM/DD/YYYY'});
		
		$("#wrapper").append(clone)
	});

	$("body").on("click","#user_saving_account_exit", function(){
		$(".clone_popover").remove();
	});

	$("body").on("submit", "#insert_saving_account", function(){
		var account = $(this);
		var post_data = account.serialize();
		var categories_info = [];

		$(".user_saving_breakdown table").each(function(index, data){
		    var category_id = $(this).attr("id");

		    categories_info[index] = {
				category_id : category_id.replace("category_id_", ""),
				sub_categories : [],
				schedule_transaction : []
			}

			if($("#saving_scheduled_information:checked").length > 0){
				categories_info[index].schedule_transaction.push($("#saving_scheduled_input").val());
			}

			for(var i = 1; i <= $(this).find("tbody tr").length; i ++){
				categories_info[index].sub_categories.push({
					new_sub_category_name : $(this).find("tbody tr:nth-child("+i+") td:nth-child(1)").text(),
					sub_category_id : ($(this).find("tbody tr:nth-child("+i+")").attr("data-id")),
					sub_category_amount : $(this).find("tbody tr:nth-child("+i+") td:nth-child(2)").text(),
					transcation_type : ($(this).find("tbody tr:nth-child("+i+")").attr("data-type"))
				})
			}
		});

		post_data += "&category_info="+ JSON.stringify(categories_info)+"&account_id="+$("#bottom_navigation .active_filter").closest("ul").attr("data-account-id")+"&account_type_id="+$("#bottom_navigation .active_filter").attr("data-type-id");

		$.post("/main/insert_saving_account", post_data, function(data){
			if(data){
				$(".clone_popover").remove();
				$(".user_accounts_selection .active_filter").trigger("click");
			}
		}, "json");


		return false;
	});

	$("body").on("change", "#saving_account_type", function(){
		$(".clone_popover #saving_account_options").hide()
	})

	var is_click = true;

	$("body").on("click",".clone_popover #saving_scheduled_information", function(){
		if(is_click == true){
			$(".clone_popover #saving_scheduled_input").show()
			is_click = false;
		}
		else{
			$(".clone_popover #saving_scheduled_input").hide();
			is_click = true;
		}
	})

	$("body").on("click", ".clone_popover #add_saving_breakdown", function(){
		$(".clone_popover #saving_account_options").show();

		$.post("/main/get_user_categories", {account_type : $(".clone_popover #saving_account_type").val()},function(data){
			if(data)
				$(".clone_popover #insert_saving_account select:nth-child(1)").empty().append(data);
		}, "json")
	});

	$("body").on("change", ".clone_popover #insert_saving_account select:nth-child(1)", function(){
		$.post("/main/get_user_sub_categories", {category_id : $(this).val()}, function(data){
			if(data)
				$(".clone_popover #insert_saving_account select:nth-child(2)").empty().append(data);
			else{
				$(".clone_popover #insert_saving_account select:nth-child(2)").empty().append('<option value="">Select Sub Category</option><option value="add_new_sub">Add new subcategory</option>');
			}
		}, "json")
	});

	$("body").on("change", ".clone_popover #insert_saving_account select:nth-child(2)", function(){
		if($(this).val() == "add_new_sub")
			$(".clone_popover #saving_account_options .add_saving_new_subcategory").show();
		else
			$(".clone_popover #saving_account_options .add_saving_new_subcategory").hide();
	});

	$("body").on("click", ".saving_account_add", function(){
		if($(".clone_popover #insert_saving_account select:nth-child(1) option:selected").val() != "" && $(".clone_popover #insert_saving_account select:nth-child(2) option:selected").val() != "" && $(".clone_popover #saving_sub_category_amount").val() != ""){
			if(!$("#category_id_"+$(".clone_popover  #insert_saving_account select:nth-child(1) option:selected").val()).length){
				$(".clone_popover .user_saving_breakdown").append("\
						<table id='category_id_"+$(".clone_popover #insert_saving_account select:nth-child(1) option:selected").val()+"'>\
						<thead>\
							<tr>\
								<th>"+$(".clone_popover #insert_saving_account select:nth-child(1) option:selected").text()+"</th>\
								<th id='total_saving_breakdown_account'>1,205</th>\
							</tr>\
						</thead>\
						<tbody>\
						</tbody>\
					</table> " );
			}

			var is_new_sub_categeroy = $(".clone_popover #insert_saving_account select:nth-child(2) option:selected").val() == "add_new_sub" && $("#add_saving_new_subcategory").val() != "";

			$(".clone_popover #category_id_"+$(".clone_popover #insert_saving_account select:nth-child(1) option:selected").val()+" tbody").append("\
				<tr data-type='"+$(".clone_popover #saving_account_type option:selected").val()+"' data-id='"+(is_new_sub_categeroy ? $(".clone_popover #add_saving_new_subcategory").val() : $(".clone_popover  #insert_saving_account select:nth-child(2) option:selected").val())+"'>\
					<td>"+($(".clone_popover  #insert_saving_account select:nth-child(2) option:selected").val() == "add_new_sub" && $(".clone_popover #add_saving_new_subcategory").val() != "" ? $(".clone_popover #add_saving_new_subcategory").val() : $(".clone_popover  #insert_saving_account select:nth-child(2) option:selected").text())+"</td>\
					<td>"+$(".clone_popover #saving_sub_category_amount").val() +"</td>\
					<td><span class='glyphicon glyphicon-minus remove_saving_subcategory' aria-hidden='true'></span></td>\
				</tr>");

			var total_saving_breakdown_account = 0;

			$("#category_id_"+$(".clone_popover #insert_saving_account select:nth-child(1) option:selected").val()+ " tbody tr td:nth-child(2)").each(function(index, data){
				total_saving_breakdown_account =  parseInt(total_saving_breakdown_account) + parseInt($(this).text())
			})

			$(".clone_popover #category_id_"+$(".clone_popover #insert_saving_account select:nth-child(1) option:selected").val() +" #total_saving_breakdown_account").empty().html(total_saving_breakdown_account);
			$(".clone_popover #insert_saving_account select:nth-child(2) option:selected").attr("disabled", "disabled");

			$('.clone_popover #insert_saving_account select:nth-child(1)').prop('selectedIndex',0);
			$('.clone_popover #insert_saving_account select:nth-child(2)').prop('selectedIndex',0);
			$('.clone_popover #saving_sub_category_amount').val("");
			$('.clone_popover #add_saving_new_subcategory').val("");
		}
	});

	$("body").on("click", ".remove_saving_subcategory", function(){
		if($(this).closest("tbody").children().length - 1 == 0){
			$(this).closest("table").remove();
		}
		else{
			$(this).closest("tr").remove();
		}
	});
	var date_from = ""; 
	$(".checking_date_from, .checking_date_from").datetimepicker({format: 'MM/DD/YYYY'}).on("dp.change", function(){
		date_from = $(this).val();
	});


	$('body').on("dp.change", ".checking_date_to, .saving_date_to", function(){
		var dates = $(this);

		if($(dates).val() != "" && $(dates).prev().val() != ""){
			var post_data = {
				account_id : $(".user_accounts_selection .active_filter").closest(".user_accounts_selection").attr("data-account-id"), 
				account_type_id : $(".user_accounts_selection .active_filter").attr("data-type-id"),
				date_from : $(dates).prev().val(),
				date_to : $(dates).val()
			}
			
			$.post("/main/get_user_selected_account", post_data, function(data){
				if(dates.hasClass("saving_date_to"))
					$("#account_saving_field .account_append").empty().append(data);
				else
					$("#account_checking_field .account_append").empty().append(data);
				
				$('.date_picker_input').datetimepicker({format: 'MM/DD/YYYY'});
			}, "json");
		}
	})
/* end of Saving account*/

/* Accounts */
	$("body").on("click", ".user_accounts_selection li", function(){
		var account = ($(this).attr("data-type-id") == 1) ? "#account_checking_field" : "#account_saving_field";

		$(".content_field").hide();
		$(account).show();
		$(account).siblings().hide();

		$.post("/main/get_user_selected_account", {account_id : $(this).closest(".user_accounts_selection").attr("data-account-id"), account_type_id : $(this).attr("data-type-id") }, function(data){
			$(account+" .account_append").empty().append(data)
   			$('.date_picker_input').datetimepicker({format: 'MM/DD/YYYY'});
		}, "json");
	});
/* End of Accounts */

/* All Acoounts */
	$("body").on("click", "#account_nav", function(){
		$(".content_field").hide();
		$("#all_accounts_field").show();

		get_all_account(1);
	});

	$("body").on("change", "#all_account_option", function(){
		get_all_account($(this).val());
	});
/* End of All Acoounts */

/* Report */
	$("body").on("click", "#report_nav", function(){
		$(".content_field").hide();
		$("#report_field").show();


		$.post("/main/get_reports_overview", {}, function(data){
			$("#report_content table tbody").empty().append(data.accounts);
			$("#report_field #report_filter_all_account").empty().append(data.all_accounts);
		}, "json");

		reports_chart_object.chart.renderTo = "report_highchart";
        new Highcharts.Chart(reports_chart_object);
	});

	$("body").on("submit", "#report_form", function(){

	});
/* End of Report */

/* Budget */
	$("#budget_field").show();
	
	$("body").on("click", "#budget_nav", function(){
		$(".content_field").hide();
		$("#budget_field").show();
	});

	$("body").on("submit", "#budget_filter", function(){

		$.post("/main/get_user_budgets", $(this).serialize(), function(data){
			$("#budget_content").empty().append(data)
		}, "json");

		return false;
	})
/* Budget */
	document.getElementById("add_account_exit").onclick = function(){
		document.getElementById("user_add_account").style.display = "none";
	}

    $('.date_picker_input').datetimepicker({format: 'MM/DD/YYYY'});

});


var all_account_chart_object = {
	chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    exporting: { enabled: false },
    title: {},
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: []
}

var reports_chart_object = {
    chart: {
        type: 'column'
    },

    title: {
        text: 'Highcharts responsive chart'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    xAxis: {
        categories: ['Apples', 'Oranges'],
        labels: {
            x: -10
        }
    },

    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Amount'
        }
    },

    series: [{
        name: 'Christmas Eve',
        data: [1, 4]
    }, {
        name: 'Christmas Day before dinner',
        data: [6, 4]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
};

function get_all_account(account_type){
	$.post("/main/get_all_accounts_overview", {account_type : account_type}, function(data){
		$("#all_account_field").empty().append(data.partial);

		$(".account_content tbody tr:last-child").each(function(index, data){
			var account_amount_total = $(this).closest(".account_content").children("h2:nth-child(2)").attr("data-account-total");
			$(this).closest("#all_account_right_content").siblings("#all_account_left_content").children("#current_month").children("h3:nth-child(2)").html(account_amount_total - ($(this).attr("data-total-category")) )
		})

		for (var key in data.chart_data){
			var container = "all_account_piechart_"+key;
			var categories = [];
			var chart_addseries = [];

			for (var category in data.chart_data[key].category_graph){
				categories.push( {
                    "name": data.chart_data[key].category_graph[category].sub_category_name,
                    "y" :   data.chart_data[key].category_graph[category].sub_category_amount
            	});
			}

			for(var chart_info in categories){
				chart_addseries.push({
					"name" : categories[chart_info].name,
					"y"    :  parseInt(categories[chart_info].y),
				})
    	    }

			all_account_chart_object.chart.renderTo = container;
            new Highcharts.Chart(all_account_chart_object);

    	    var chart = $("#"+container).highcharts();
    	    
			chart.setTitle({ text: data.chart_data[key].transaction_date });
            chart.addSeries({
				name: 'Total',
				colorByPoint: true,
				data: chart_addseries
			});
		}
	}, "json")
}