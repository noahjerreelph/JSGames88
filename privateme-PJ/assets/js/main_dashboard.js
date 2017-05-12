$(document).ready(function(){
	$("body").on("click", "#logout", function(){
		$.post("/users/logout",{},function(data){
			console.log(data)
			if(data)
				location.reload();
		}, "json")
	});

	Highcharts.chart('container', {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Browser market shares January, 2015 to May, 2015'
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
			enabled: true,
			format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			style: {
			color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			}
		}
	}
	},
	series: [{
		name: 'Brands',
		colorByPoint: true,
		data: [{
			name: 'Microsoft Internet Explorer',
			y: 8
		}, {
			name: 'Chrome',
			y: 23,
			sliced: true,
			selected: true
		}, {
			name: 'Firefox',
			y: 15
		}, {
			name: 'Safari',
			y: 122
		}, {
			name: 'Opera',
			y: 201
		}, {
			name: 'Proprietary or Undetectable',
			y: 100
		}]
	}]
	});
})