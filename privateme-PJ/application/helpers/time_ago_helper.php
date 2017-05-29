<?php

function time_ago($time)
{
   // $periods = array("sec", "min", "hr", "day", "week", "month", "year", "decade");
   $periods = array("sec", "min", "hr", "day", "wk", "mo", "yr", "decade");
   $lengths = array("60","60","24","7","4.35","12","10");
   // $difference = time() - strtotime($time);
   $difference = time() - strtotime($time);

   for($counter = 0; $difference >= $lengths[$counter] && $counter < count($lengths)-1; $counter++)
   {
       $difference /= $lengths[$counter];
   }

   $difference = round($difference);

   if($difference != 1)
       $periods[$counter].= "s";

   return $difference. " " .$periods[$counter]." ago";
}

function time_remaining($time, $bootcamp_location_id, $need_class = FALSE){
    if(isset($time) && (date("Y", strtotime($time)) != '1970' && $time != null)){
      $time = ($time != NULL) ? get_location_timezone_and_convert_UTC_datetime($bootcamp_location_id, $time) : $time;

      /* Accesing models and helper from helper */
      $CodeIgniter =& get_instance();
      // $CodeIgniter->load->helper('convert_UTC_datetime');
      $CodeIgniter->load->model('Bootcamp_model');
      $applicants_bootcamp_location_timezone = $CodeIgniter->Bootcamp_model->get_bootcamp_location_timezone($bootcamp_location_id);

      $time_left = floor((strtotime(date('Y-m-d', strtotime($time))) - strtotime(date('Y-m-d').convert_timezone_hours($applicants_bootcamp_location_timezone['timezone'], FALSE) )) / (60*60*24) );
      $data["status_date"] = date("d M  Y", strtotime($time));

      if($time_left == 0) {
        $class_color = ($need_class === TRUE) ? "color_green" : "";
        $data["time_remaining"] =  ($_SESSION['selected_results_view'] != "sales_view") ? "<span class='".$class_color."'> today</span>" : "today";
      }
      elseif($time_left > 0){
        $data["time_remaining"] = ($_SESSION['selected_results_view'] != "sales_view") ? "<span>in ". (($time_left == 1) ? $time_left . ' day':  $time_left . ' days') ."</span>" : (($time_left == 1) ? $time_left . ' day':  $time_left . ' days') ;
      }
      else{
        $class_color = ($need_class === TRUE) ? "color_red" : "";
        $data["time_remaining"] = ($_SESSION['selected_results_view'] != "sales_view") ? "<span class='".$class_color."'>". time_ago($time) ."</span>" : time_ago($time) ;
      }
    }
    else{
      $data["status_date"] =   "<span>n/a</span>";
      $data["time_remaining"] = "";
    }

    return $data;
}

function convert_timezone_hours($timezone, $need_to_negate = FALSE){
  $negate_value = ($need_to_negate === TRUE) ? -1 : 1;

  $exploded = explode(':',$timezone);
    return ( intval($exploded[0]) * $negate_value )." hours ".intval($exploded[1])." minutes";
}

function convert_UTC_datetime($date, $bootcamp_location_timezone, $need_to_negate = FALSE){
  return date("Y-m-d H:i:s", strtotime( $date. convert_timezone_hours($bootcamp_location_timezone, $need_to_negate) ));
}

function get_location_timezone_and_convert_UTC_datetime($bootcamp_location_id, $date){
  /* Accesing models and helper from helper */
  $CodeIgniter =& get_instance();
  $CodeIgniter->load->model('Bootcamp_model');
  $CodeIgniter->load->helper('time_ago');

  $applicants_bootcamp_location_timezone = $CodeIgniter->Bootcamp_model->get_bootcamp_location_timezone($bootcamp_location_id);

  $converted_date = $date;
  if( explode(" ", $date)[1] != "00:00:00" ){
    $converted_date = convert_UTC_datetime($date, $applicants_bootcamp_location_timezone['timezone']);
  }

  return date("d M  Y", strtotime($converted_date));
}

function get_admin_timezone_and_convert_UTC_datetime($admin_timezone, $date, $need_to_negate = FALSE){
  $converted_date = $date;
  if( explode(" ", $date)[1] != "00:00:00" ){
    $converted_date = convert_UTC_datetime($date, $admin_timezone, $need_to_negate);
  }

  return date("Y-m-d H:i:s", strtotime($converted_date));
}
