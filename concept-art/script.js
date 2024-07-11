let ids = new Map();

window.addEventListener("load", function(){
	
	var tag1 = "main-content";
	var tag2 = "main-sidebar";

	ids.set(tag1, null);
	ids.set(tag2, null);
	
	var elem1=document.getElementById(tag1);
	var elem2=document.getElementById(tag2);
	
	elem2.style.opacity = 0;
	
	elem1.style.opacity = 0;
	
	setTimeout(function(){
	clearInterval(ids.get(tag1));
	
	var opacity=0;
	ids.set(tag1,setInterval(frame, 2));
	// ids.set(tag2,setInterval(frame,2));
	
	function frame(){
	if (opacity == 100){
		clearInterval(ids.get(tag1));
	} else{
		opacity++;
		elem1.style.opacity = (opacity * .01);
		elem2.style.opacity = (opacity * .01);
	}
	}
	}, 500);
	
	});