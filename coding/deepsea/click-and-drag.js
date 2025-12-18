var mousedown = false;
var current_target = null;

var elements_to_links = {
    sonar_above: "lookup",
    sonar_below: "down",
    falling: "first_impressions",
    window: "look_inside",
    hydrophone:"listen"
};

function onMouseRelease(event){
    console.log("x: " + event.pageX + ", y: " + event.pageY);
    if (current_target){
		mousedown = false;
		//current_target.style.zIndex = "0";
		current_target = null;
    }
}

function init(){
    
    const draggable_elements = document.getElementsByClassName("draggable");
    
    for (let i = 0; i < draggable_elements.length; ++i){
	var element = draggable_elements[i];
	//var taskbar = element.querySelector(".taskbar");
	element.addEventListener("mousedown", (event) => {
	    if (!current_target){
		mousedown = true;
		current_target = event.currentTarget;
		current_target.style.zIndex = (Number(current_target.style.zIndex) + 1).toString();
	    }
	});

	//link buttons
	element.querySelector(".close").addEventListener("click", (event)=>{
	    //console.log("button clicked " + event.currentTarget.parentNode.parentNode);
	    event.currentTarget.parentNode.parentNode.style.display = "none";
	});
	
	element.querySelector(".minimize").addEventListener("click", (event)=>{
	    var container = event.currentTarget.parentNode.parentNode;
	    if (event.currentTarget.innerText.includes("_")){
		var content = container.querySelector(".content");

		    content.style.display = "none";

		event.currentTarget.innerText = "+";
	    }
	    else{
		//console.log("not visible");
		container.querySelector(".content").style.display = "inline-block";

		event.currentTarget.innerText = "_";
	    }
	});

	//make it so you can open a given element via a link somewhere on the document.
	var linkID = elements_to_links[element.id];

	let offset = 150;
	//console.log(elements_to_links);
	document.querySelector("#"+linkID).addEventListener("click", (event) => {
	    current_target = null;
	    
	    var id = event.currentTarget.id;
	    
	    var elementID = Object.keys(elements_to_links).find(key=> elements_to_links[key] === id);

	    
	    var popup = document.querySelector("#"+elementID);
	    
	    popup.style.left = (event.pageX + offset).toString()+"px";

	    popup.style.top = (event.pageY - offset).toString() + "px";

	    //console.log(popup.getBoundingClientRect());

	    
	    popup.style.display ="inline";
	    

	    
	    
	});
    }

    audio_bts.forEach((value)=>{
	let bt = document.querySelector("#"+value);
	bt.addEventListener("click", onAudioBtClick);
    });
}

function onKeyDown(event){
    if (event.code == "KeyM"){
	console.log("M pressed");
	let elem = document.documentElement;
	
	if (elem.requestFullscreen){elem.requestFullscreen();}
	else if (elem.webkitRequestFullscreen){elem.webkitRequestFullscreen();}
	else if (elem.msRequestFullscreen){elem.webkitRequestFullscreen();}
    }
}

function onMouseMove(event){
	
	if (current_target){ 
	    //console.log(current_target.getBoundingClientRect());
	    
	    let top = current_target.style.top;
	    let left = current_target.style.left;

	    let curX = Number(left.slice(0, left.search("px")));
	    let curY = Number(top.slice(0, top.search("px")));

	    //console.log("x: " + curX + " y: " + curY);
	    //console.log(event.movementX + ", " + event.movementY);
	    
	    current_target.style.left = (curX + event.movementX).toString() + "px";
	    current_target.style.top = (curY + event.movementY).toString() + "px";
	    
	}
}
    window.addEventListener("mouseup", onMouseRelease);
    //set body mousemove event
window.addEventListener("mousemove", onMouseMove);

window.addEventListener("keydown", onKeyDown);

window.onload = init();

