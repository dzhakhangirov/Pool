function setting_animation_panel (model_viewer_element, data_array, width_param, height_param) {
	
	var drag_start = 0;
	var drag_coord_x = 0;
	
	$("#div_for_text")[0].style.width = width_param + "px";
	$("#div_for_text")[0].style.height = height_param + "px";
	
	$(".thumb_div")[0].addEventListener("mousedown", function (e) {
		
	sessionStorage.setItem("stop_interval", 1);	
	
	drag_start = 1;
	drag_coord_x = e.clientX - $(".thumb_div")[0].getBoundingClientRect().left;
	
	});
	
	document.documentElement.addEventListener("mouseup", function () {
		
	sessionStorage.removeItem("stop_interval");	
	
	if (drag_start == 1) {
		
	drag_start = 0;	
	}
	
	});
	
	$(".dlitelnost_div_1")[0].addEventListener("mousemove", function (e) {
		
	if (drag_start) {
		
	var distance_x = e.clientX - $(".dlitelnost_div_1")[0].getBoundingClientRect().left;	
	
	$(".dlitelnost_div_1_zapolneno")[0].style.width = distance_x + "px";
	
	var animation_duration = model_viewer_element.duration;
	
	var cur_anim_sec = distance_x * animation_duration / 156;
	
	cur_anim_sec = Math.round(cur_anim_sec);
	
	if (cur_anim_sec > animation_duration) {
		
	model_viewer_element.currentTime = animation_duration;	
	
	cur_anim_sec = animation_duration;
	
	model_viewer_element.pause();
	
	$(".pause_button")[0].setAttribute("data-paused", true);
	
	} else {
		
	model_viewer_element.currentTime = cur_anim_sec;		
	}
	
	if (cur_anim_sec < 0) {
		
	model_viewer_element.currentTime = 0;	
	
	cur_anim_sec = 0;
	}
	
	$(".number_value_span")[0].textContent = cur_anim_sec;
	}	
		
	});
	
	$("#settings_animation_block").fadeIn(0);
	
	var is_paused = model_viewer_element.paused;
	
	if (is_paused) {
	
	model_viewer_element.play();
	} else {
	
	$(".pause_button")[0].setAttribute("data-paused", false);
	}
	
	$(".go_to_start")[0].onclick = function () {
	
	model_viewer_element.currentTime = 0;
	
	/* $(".range_element")[0].value = 0; */
	
	$(".dlitelnost_div_1_zapolneno")[0].style.width = "0";
	$(".number_value_span")[0].textContent = 0;
	
	model_viewer_element.pause();
	};
	
	var animation_name = model_viewer_element.availableAnimations;
	
	var animation_duration = model_viewer_element.duration;
	
	if (is_paused) {
	
	model_viewer_element.pause();
	}
	
	$(".dlitelnost_div_1_zapolneno")[0].setAttribute("max", animation_duration);
	
	/* $(".range_element")[0].addEventListener("input", function () {
	
	var cur_value = $(".range_element")[0].value;
	
	model_viewer_element.currentTime = cur_value;
	}); */
	
	$(".go_to_end")[0].onclick = function () {
	
	model_viewer_element.currentTime = animation_duration - 0.2;
	
	$(".dlitelnost_div_1_zapolneno")[0].style.width = "156px";
	
	var max_animation_duration = Math.round(animation_duration);
	
	$(".number_value_span")[0].textContent = max_animation_duration;
	
	model_viewer_element.pause();
	};
	
	$(".pause_button")[0].onclick = function () {
	
	var cur_attr = $(".pause_button")[0].getAttribute("data-paused");
	
	if (cur_attr == "true") {
	
	model_viewer_element.play();
	
	$(".pause_button")[0].setAttribute("data-paused", false);
	
	} else {
	
	model_viewer_element.pause();
	
	$(".pause_button")[0].setAttribute("data-paused", true);
	}
	
	};
	
	setInterval( function () {
		
	if ( !sessionStorage.getItem("stop_interval") ) {	
	
	var currentTime = model_viewer_element.currentTime;
	
	var cur_width = currentTime * 156 / animation_duration; 
	
	$(".dlitelnost_div_1_zapolneno")[0].style.width = cur_width + "px";
	
	currentTime = Math.round(currentTime);
	
	$(".number_value_span")[0].textContent = currentTime;
	
	/* $(".range_element")[0].value = currentTime; */
	
	console.log(currentTime);
	console.log(animation_duration);
	
	if (currentTime >= (animation_duration - 0.8) ) {
		
	console.log(1);	
	
	model_viewer_element.pause();
	
	model_viewer_element.currentTime = animation_duration - 0.3;
	
	/* $(".range_element")[0].value = animation_duration - 0.3; */
	
	$(".dlitelnost_div_1_zapolneno")[0].style.width = "156px";
	
	$(".pause_button")[0].setAttribute("data-paused", true);
	}
	
	}
	
	}, 100);
	
	
	var index_of_slide = -1;
	
	var user = detect.parse(navigator.userAgent);
	var is_mobile = 0;
	
	if ( user.device.type == "Mobile" ) {
		
	is_mobile = 1;	
	}
	
	
	$(".skip_back")[0].onclick = function () {
	
	if (data_array.length > 0) {
	
	index_of_slide--;
	
	if (index_of_slide < 0) {
	
	index_of_slide = data_array.length-1;
	}
	
	var cur_second = data_array[index_of_slide][0];
	
	if (cur_second) {
	
	model_viewer_element.currentTime = cur_second;
	
	model_viewer_element.pause();
	
	$(".pause_button")[0].setAttribute("data-paused", true);
	}
	
	var cur_point_data = data_array[index_of_slide][1];
	
	if (cur_point_data) {
	
	var cur_point_data_1 = cur_point_data[0];
	var cur_point_data_2 = cur_point_data[1];
	var cur_point_data_3 = cur_point_data[2];
	
	model_viewer_element.cameraTarget = cur_point_data_1;
    model_viewer_element.cameraOrbit = cur_point_data_2;
    model_viewer_element.fieldOfView = cur_point_data_3;
	}
	
	var cur_point_text = data_array[index_of_slide][2];
	
	if (cur_point_text) {
		
	cur_point_text = "<span class='close_span_icon'>x</span>" + cur_point_text;	
		
	$("#div_for_text")[0].innerHTML = cur_point_text;	
	
	
	$("#div_for_text .close_span_icon").click( function () {
		
	$("#div_for_text").fadeOut(0);	
		
	});
	
	
	if (is_mobile == 0) {
	
	$("#div_for_text").fadeIn(0);
	}
	
	}
	
	}
	
	};
	
	$(".skip_forward")[0].onclick = function () {
	
	if (data_array.length > 0) {
	
	index_of_slide++;
	
	if ( index_of_slide > (data_array.length-1) ) {
	
	index_of_slide = 0;
	}
	
	var cur_second = data_array[index_of_slide][0];
	
	if (cur_second) {
	
	model_viewer_element.currentTime = cur_second;
	
	model_viewer_element.pause();
	
	$(".pause_button")[0].setAttribute("data-paused", true);
	}
	
	var cur_point_data = data_array[index_of_slide][1];
	
	if (cur_point_data) {
	
	var cur_point_data_1 = cur_point_data[0];
	var cur_point_data_2 = cur_point_data[1];
	var cur_point_data_3 = cur_point_data[2];
	
	model_viewer_element.cameraTarget = cur_point_data_1;
    model_viewer_element.cameraOrbit = cur_point_data_2;
    model_viewer_element.fieldOfView = cur_point_data_3;
	}
	
	var cur_point_text = data_array[index_of_slide][2];
	
	if (cur_point_text) {
		
	cur_point_text = "<span class='close_span_icon'>x</span>" + cur_point_text;	
		
	$("#div_for_text")[0].innerHTML = cur_point_text;	
	
	$("#div_for_text .close_span_icon").click( function () {
		
	$("#div_for_text").fadeOut(0);	
		
	});
	
	
	if (is_mobile == 0) {
	
	$("#div_for_text").fadeIn(0);
	}
	
	}
	
	}
	
	};
	
	}