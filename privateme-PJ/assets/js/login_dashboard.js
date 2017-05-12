$(document).ready(function(){
	$("body").on("submit", "#user_register", function(){
		var user_register = $(this);
		var json_post_data = user_register.serialize();
		json_post_data += "&is_gmail=1";

		$.post("/users/register", json_post_data, function(data){
			if(data.status){
				location.reload();
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
			console.log(data)
			if(data.status){
				location.reload();
			}
			else{
				user_login.siblings("#login_error_message").empty().append(data.message);
			}
		}, "json");

		return false
	});

	// Highcharts.chart('container', {
	// chart: {
	// 	plotBackgroundColor: null,
	// 	plotBorderWidth: null,
	// 	plotShadow: false,
	// 	type: 'pie'
	// },
	// title: {
	// 	text: 'Browser market shares January, 2015 to May, 2015'
	// },
	// tooltip: {
	// 	pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	// },
	// plotOptions: {
	// 	pie: {
	// 		allowPointSelect: true,
	// 		cursor: 'pointer',
	// 		dataLabels: {
	// 		enabled: true,
	// 		format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	// 		style: {
	// 		color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	// 		}
	// 	}
	// }
	// },
	// series: [{
	// 	name: 'Brands',
	// 	colorByPoint: true,
	// 	data: [{
	// 		name: 'Microsoft Internet Explorer',
	// 		y: 8
	// 	}, {
	// 		name: 'Chrome',
	// 		y: 23,
	// 		sliced: true,
	// 		selected: true
	// 	}, {
	// 		name: 'Firefox',
	// 		y: 15
	// 	}, {
	// 		name: 'Safari',
	// 		y: 122
	// 	}, {
	// 		name: 'Opera',
	// 		y: 201
	// 	}, {
	// 		name: 'Proprietary or Undetectable',
	// 		y: 100
	// 	}]
	// }]
	// });
})