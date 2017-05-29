<div id="all_account_content">
<?  foreach ($accounts as $key => $account) { 
	?>
	<div class="account_content">
		<h2><?= $account["account_name"]?></h2>
		<h2 data-account-total='<?= $account["account_amount"] ?>'>P <?= number_format( $account["account_amount"]  ,2)?></h2>
		<p><?= $account["account_description"] ?></p>

		<div id="all_account_left_content">
			<div class="all_account_piechart" id="all_account_piechart_<?= $key ?>" data-highcharts-chart="1"><div id="highcharts-wwvu6zi-3" class="highcharts-container " style="position: relative; overflow: hidden; width: 310px; height: 300px; text-align: left; line-height: normal; z-index: 0; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><svg version="1.1" class="highcharts-root " style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="310" height="300" viewBox="0 0 310 300"><desc>Created with Highcharts 5.0.12</desc><defs><clipPath id="highcharts-wwvu6zi-4"><rect x="0" y="0" width="290" height="116" fill="none"></rect></clipPath></defs><rect fill="#ffffff" class="highcharts-background" x="0" y="0" width="310" height="300" rx="0" ry="0"></rect><rect fill="none" class="highcharts-plot-background" x="10" y="74" width="290" height="116"></rect><rect fill="none" class="highcharts-plot-border" x="10" y="74" width="290" height="116"></rect><g class="highcharts-series-group"><g class="highcharts-series highcharts-series-0 highcharts-pie-series highcharts-color-undefined highcharts-tracker " transform="translate(10,74) scale(1 1)" style="cursor:pointer;"><path fill="#7cb5ec" d="M 144.99022368622263 10.000000995586582 A 48 48 0 1 1 121.14126980558528 99.65046210440076 L 121.14126980558528 99.65046210440076 A 48 48 0 1 0 144.99022368622263 10.000000995586582 Z" class="highcharts-halo highcharts-color-0" fill-opacity="0.25"></path><path fill="#7cb5ec" d="M 144.99022368622263 10.000000995586582 A 48 48 0 1 1 121.14126980558528 99.65046210440076 L 145 58 A 0 0 0 1 0 145 58 Z" transform="translate(0,0)" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" class="highcharts-point highcharts-color-0 "></path><path fill="#434348" d="M 121.09963127978673 99.62658255295348 A 48 48 0 0 1 103.16479513005578 34.4667122252373 L 145 58 A 0 0 0 0 0 145 58 Z" transform="translate(-10,3)" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" class="highcharts-point highcharts-point-select highcharts-color-1"></path><path fill="#90ed7d" d="M 103.18834933150902 34.4248887939828 A 48 48 0 0 1 127.04485314021454 13.484691383260788 L 145 58 A 0 0 0 0 0 145 58 Z" transform="translate(0,0)" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" class="highcharts-point highcharts-color-2"></path><path fill="#f7a35c" d="M 127.08937741898475 13.466758497045973 A 48 48 0 0 1 141.48049024067976 10.129204612268559 L 145 58 A 0 0 0 0 0 145 58 Z" transform="translate(0,0)" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" class="highcharts-point highcharts-color-3"></path><path fill="#8085e9" d="M 141.52836278784378 10.125709038491522 A 48 48 0 0 1 144.30935277436143 10.004968940423446 L 145 58 A 0 0 0 0 0 145 58 Z" transform="translate(0,0)" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" class="highcharts-point highcharts-color-4"></path><path fill="#f15c80" d="M 144.35734814274545 10.004302290826452 A 48 48 0 0 1 144.93332896297255 10.000046302388768 L 145 58 A 0 0 0 0 0 145 58 Z" transform="translate(0,0)" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" class="highcharts-point highcharts-color-5"></path></g><g class="highcharts-markers highcharts-series-0 highcharts-pie-series highcharts-color-undefined " transform="translate(10,74) scale(1 1)"></g></g><text x="155" text-anchor="middle" class="highcharts-title" style="color:#333333;font-size:18px;fill:#333333;" y="24"><tspan>Browser market shares</tspan><tspan dy="21" x="155">January, 2015 to May, 2015</tspan><title>Browser market shares January, 2015 to May, 2015</title></text><g class="highcharts-legend" transform="translate(32,202)"><rect fill="none" class="highcharts-legend-box" rx="0" ry="0" x="0" y="0" width="245" height="83" visibility="visible"></rect><g><g><g class="highcharts-legend-item highcharts-pie-series highcharts-color-0" transform="translate(8,3)"><text x="21" style="color:#333333;font-size:12px;font-weight:bold;cursor:pointer;fill:#333333;" text-anchor="start" y="15"><tspan>Microsoft Internet Explorer</tspan></text><rect x="2" y="4" width="12" height="12" fill="#7cb5ec" rx="6" ry="6" class="highcharts-point"></rect></g><g class="highcharts-legend-item highcharts-pie-series highcharts-color-1" transform="translate(8,21)"><text x="21" y="15" style="color:#333333;font-size:12px;font-weight:bold;cursor:pointer;fill:#333333;" text-anchor="start"><tspan>Chrome</tspan></text><rect x="2" y="4" width="12" height="12" fill="#434348" rx="6" ry="6" class="highcharts-point"></rect></g><g class="highcharts-legend-item highcharts-pie-series highcharts-color-2" transform="translate(97.421875,21)"><text x="21" y="15" style="color:#333333;font-size:12px;font-weight:bold;cursor:pointer;fill:#333333;" text-anchor="start"><tspan>Firefox</tspan></text><rect x="2" y="4" width="12" height="12" fill="#90ed7d" rx="6" ry="6" class="highcharts-point"></rect></g><g class="highcharts-legend-item highcharts-pie-series highcharts-color-3" transform="translate(182.140625,21)"><text x="21" y="15" style="color:#333333;font-size:12px;font-weight:bold;cursor:pointer;fill:#333333;" text-anchor="start"><tspan>Safari</tspan></text><rect x="2" y="4" width="12" height="12" fill="#f7a35c" rx="6" ry="6" class="highcharts-point"></rect></g><g class="highcharts-legend-item highcharts-pie-series highcharts-color-4" transform="translate(8,39)"><text x="21" y="15" style="color:#333333;font-size:12px;font-weight:bold;cursor:pointer;fill:#333333;" text-anchor="start"><tspan>Opera</tspan></text><rect x="2" y="4" width="12" height="12" fill="#8085e9" rx="6" ry="6" class="highcharts-point"></rect></g><g class="highcharts-legend-item highcharts-pie-series highcharts-color-5" transform="translate(8,57)"><text x="21" y="15" style="color:#333333;font-size:12px;font-weight:bold;cursor:pointer;fill:#333333;" text-anchor="start"><tspan>Proprietary or Undetectable</tspan></text><rect x="2" y="4" width="12" height="12" fill="#f15c80" rx="6" ry="6" class="highcharts-point"></rect></g></g></g></g><text x="300" class="highcharts-credits" text-anchor="end" style="cursor:pointer;color:#999999;font-size:9px;fill:#999999;" y="295">Highcharts.com</text><g class="highcharts-label highcharts-tooltip highcharts-color-1" style="cursor:default;pointer-events:none;white-space:nowrap;" transform="translate(66,-9999)" opacity="0" visibility="visible"><path fill="none" class="highcharts-label-box highcharts-tooltip-box" d="M 3.5 0.5 L 98.5 0.5 C 101.5 0.5 101.5 0.5 101.5 3.5 L 101.5 44.5 C 101.5 47.5 101.5 47.5 98.5 47.5 L 3.5 47.5 C 0.5 47.5 0.5 47.5 0.5 44.5 L 0.5 3.5 C 0.5 0.5 0.5 0.5 3.5 0.5" isShadow="true" stroke="#000000" stroke-opacity="0.049999999999999996" stroke-width="5" transform="translate(1, 1)"></path><path fill="none" class="highcharts-label-box highcharts-tooltip-box" d="M 3.5 0.5 L 98.5 0.5 C 101.5 0.5 101.5 0.5 101.5 3.5 L 101.5 44.5 C 101.5 47.5 101.5 47.5 98.5 47.5 L 3.5 47.5 C 0.5 47.5 0.5 47.5 0.5 44.5 L 0.5 3.5 C 0.5 0.5 0.5 0.5 3.5 0.5" isShadow="true" stroke="#000000" stroke-opacity="0.09999999999999999" stroke-width="3" transform="translate(1, 1)"></path><path fill="none" class="highcharts-label-box highcharts-tooltip-box" d="M 3.5 0.5 L 98.5 0.5 C 101.5 0.5 101.5 0.5 101.5 3.5 L 101.5 44.5 C 101.5 47.5 101.5 47.5 98.5 47.5 L 3.5 47.5 C 0.5 47.5 0.5 47.5 0.5 44.5 L 0.5 3.5 C 0.5 0.5 0.5 0.5 3.5 0.5" isShadow="true" stroke="#000000" stroke-opacity="0.15" stroke-width="1" transform="translate(1, 1)"></path><path fill="rgba(247,247,247,0.85)" class="highcharts-label-box highcharts-tooltip-box" d="M 3.5 0.5 L 98.5 0.5 C 101.5 0.5 101.5 0.5 101.5 3.5 L 101.5 44.5 C 101.5 47.5 101.5 47.5 98.5 47.5 L 3.5 47.5 C 0.5 47.5 0.5 47.5 0.5 44.5 L 0.5 3.5 C 0.5 0.5 0.5 0.5 3.5 0.5" stroke="#434348" stroke-width="1"></path><text x="8" style="font-size:12px;color:#333333;fill:#333333;" y="20"><tspan style="font-size: 10px">Chrome</tspan><tspan x="8" dy="15">Brands: </tspan><tspan style="font-weight:bold" dx="0">24.9%</tspan></text></g></svg></div></div>
			
			<? 
			$last_month_total = 0;
			$last_month_account_total = 0;
			if(!empty($last_month_accounts)){ 
					foreach ($last_month_accounts as $key => $last_month_account) {
						$last_month_total += $last_month_account["sub_category_amount"];
						$last_month_account_total = $last_month_account["account_amount"];
					}
				?>
				<div id="last_month">
					<h3><?= date("M Y", strtotime($last_month_account["transaction_date"]));?></h3>	
					<h3 class='<?= ($last_month_account_total - $last_month_total < 0) ? "error_account" : ""?>'><?= $last_month_account_total - $last_month_total ?></h3>
				</div>
			<?	
				}	?>
			<div id="current_month">
				<h3>May 2017</h3>
				<h3>-4250.00</h3>
			</div>
		</div>
		<div id="all_account_right_content">
			<div class="all_account_data">
				<table>
					<thead>
						<tr>
							<th>Categories</th>
							<th>Outflow</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
<? 				
		$total_sub = 0;
		foreach ($account["categories"] as $category_name => $categories) {  
	?>
						<tr class="head_category" >
							<td><?= $category_name ?></td>
							<td></td>
							<td></td>
						</tr>
<?					foreach ($categories as $category) {
						$total_sub = $total_sub + (int)$category["sub_category_amount"];
 ?> 
						<tr data-total-category="<?= $total_sub ?>" >
							<td><?= $category["sub_category_name"] ?></td>
							<td><?= number_format($category["sub_category_amount"] ,2) ?></td>
							<td><?=$category["transaction_date"]?></td>
							<!-- <td>2%</td> -->
						</tr>
<? 					}	?> 
<? 				}	?> 
					</tbody>
				</table>
			</div>
		</div>
	</div>
<?		} ?>
</div>