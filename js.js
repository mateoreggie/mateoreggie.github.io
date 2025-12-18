var ids = new Map();
var promises = [];
//var selector = "div.link";
var overlaySelector = ".imageoverlay";
var windowExpanded = false;

window.parent.addEventListener("load", (event)=>{
  
    let query = window.parent.location.search;
    let pathname = window.location.pathname.split("/");
    let curr = pathname[pathname.length-1];
     
    if ((query) && (curr != "gallery.html")){

	//console.log(cookies);
	//console.log(curr);
	//console.log(window.location.pathname);
	window.location.href = "./" + query.split("?")[1] + "/gallery.html";
    }
    
})

function generateId(){
	const array=new Uint32Array(1);
	var n = self.crypto.getRandomValues(array);
	return n;
}

function fade(start, fin, direction, target, id){
	var tag = id;
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	
	var opacity= start;
	clearInterval(ids.get(tag));
	ids.set(tag, setInterval(frame, 1));
	
	function frame(){
	if (opacity == fin){
		clearInterval(ids.get(tag));
	}
	else{
		opacity += (2*direction);
		target.style.opacity = (opacity * .01);
	}
}
}



function colorIn(event){
		
	if (event.target.tagName == "IMG"){
	let div = event.target.parentElement.parentElement;
	let overlay = div.querySelector(overlaySelector);
	fade(60, 0, -1, overlay, event.target.src);
	}
}

function colorOut(event){
	let div = event.target.parentElement.parentElement;
	let overlay = div.querySelector(overlaySelector);
	
	if (event.target.tagName == "IMG"){
	fade(0, 60, 1, overlay, event.target.src);
	}
}


function addOverlay(to){
	let div = document.createElement("div");
	let img=to.querySelector("img");
	//console.log(img);
	div.className="buttonoverlay";
	
	//div.style.width= String(img.clientWidth)+"px";
	//div.style.height=String(img.clientHeight)+"px";
	
	//div.style.top=String(img.getBoundingClientRect().top)+"px";
	//div.style.left=String(img.getBoundingClientRect().left)+"px";
	
	to.appendChild(div);
}

function getSequentially(array, curr, doUntil){
		if (curr !== doUntil){
			fadeinDIV(array[curr], generateId(), 100)
			.then(article=>getSequentially(array, curr+1, doUntil))
		}
	}

function onExitBtClick(event){
	if (!windowExpanded){return;}
	let div = window.parent.document.querySelector("div#blowup");
	fade(100, 0, -1, div, div.id);
	div.style.pointerEvents="none";
	windowExpanded=false;
	
}

function makeWindow(parentDoc, event){
		var n = parentDoc.createElement("div");
		var bg = parentDoc.createElement("div");
		var frame = parentDoc.createElement("div");
		var img = parentDoc.createElement("img");
		var bt= parentDoc.createElement("button");
		
		
		n.id = "blowup";
		parentDoc.body.insertBefore(n, parentDoc.querySelector("DIV"));
		n.appendChild(frame);
		n.appendChild(bg);
		//console.log(window.parent);
		
		
		n.style.width="100%";n.style.height="100%";
		n.style.position="absolute";n.style.top="0";
		n.style.left="0";n.style.opacity="0";n.style.pointerEvents="auto";
		
		bg.style.width="100%";bg.style.height="100%";
		bg.style.backgroundColor="black";bg.style.opacity="0.6";
		
		frame.style.width="82%";frame.style.height="90%";frame.style.backgroundColor="white";
		frame.style.position="absolute";frame.style.left="9%";frame.style.top="5%";frame.style.zIndex="1";
		frame.style.textAlign="center";frame.style.overflow="scroll";
		
		img.style.width="auto";img.style.height="95%";img.style.display="inline-block";img.style.marginTop="1.2%";
		
		
		bt.innerText="X";bt.style.position="absolute";bt.style.left="15px";bt.style.top="9px";
		bt.className="blowupExit";bt.style.backgroundColor="white";bt.style.fontFamily="\'Roboto'\,sans-serif";
		bt.style.fontWeight="200";bt.style.borderStyle="none";bt.style.fontSize="30px";
		
		frame.appendChild(bt);
		frame.appendChild(img);
		
		if(event.target.querySelector("IMG")){ 
		img.alt = event.target.querySelector("IMG").alt;
		img.src = event.target.querySelector("IMG").src;}
		else {
			img.alt = event.target.alt;
			img.src=event.target.src;}
		
		bt.addEventListener("click", onExitBtClick);
		return n;
}

function onEscapePressed(event){
	if (windowExpanded){
	//console.log("key pressed");
	}
}

function expandImage(event){
	if (windowExpanded){return;}
	var parentDoc = window.parent.document;
	
	windowExpanded=true;
	
	if (!parentDoc.querySelector("div#blowup")){
		let div = makeWindow(parentDoc, event);
		let bt=div.querySelector("BUTTON");

		div.addEventListener("keydown", onEscapePressed,true);
		div.tabIndex="0";
		div.focus();
		fade(0, 100, 1, div, div.id);
	}
	else{
		let div = parentDoc.querySelector("div#blowup");
		let img=div.querySelector("IMG");
		let bt=div.querySelector("BUTTON");		
		bt.addEventListener("click", onExitBtClick);
		// bt.style.tabIndex="0";
		
		div.addEventListener("keydown", onEscapePressed,true);
		div.style.tabIndex="0";
		div.focus();

		
		
		if(event.target.querySelector("IMG")){ 
		img.alt = event.target.querySelector("IMG").alt;
		img.src = event.target.querySelector("IMG").src;}
		else {
			img.alt=event.target.querySelector("IMG").alt;
			img.src=event.target.src;}
		
		fade(0, 100, 1, div, div.id);
		div.style.pointerEvents="auto";
	}
}


function onloadIndex(event){
	let bts=document.querySelectorAll("button");
	let imgs=document.querySelectorAll("img");
	
	function fadeIn(event){
		let overlay=event.target.querySelector("DIV");
		let img= event.target.querySelector("img");

		fade(0, 50, 1, overlay, img.src);
	}
	function fadeOut(event){
		let overlay=event.target.querySelector("DIV");
		let img= event.target.querySelector("img");

		fade(50, 0, -1, overlay, img.src);
	}
	
	bts.forEach((button)=>{
		button.addEventListener("click", expandImage);
		addOverlay(button);
		button.addEventListener("mouseover",fadeIn);
		button.addEventListener("mouseout", fadeOut);
		button.addEventListener("focus",fadeIn);
		button.addEventListener("blur", fadeOut);
	});
		
	getSequentially(imgs, 0, imgs.length);
	}
	
async function onload(selector){
	var imgs = Array.from(document.querySelectorAll(selector));
    
	imgs.forEach((image)=>{
		//console.log(image);
		image.addEventListener("mouseover", colorIn);
		image.addEventListener("mouseout", colorOut);
		
		image.querySelector("A").addEventListener("blur", (event)=>{
			let overlay=event.target.parentElement.querySelector(overlaySelector);
			let img=event.target.querySelector("IMG");
			fade(0, 60, 1, overlay, img.src);
		});
		image.querySelector("A").addEventListener("focus", (event)=>{
			let overlay=event.target.parentElement.querySelector(overlaySelector);
			let img=event.target.querySelector("IMG");
			fade(60, 0, -1, overlay, img.src);

		});
	});

	getSequentially(imgs, 0, imgs.length);
}

//window.addEventListener("load", onload);

function fadeinDIV(target, identifier, finalopacity){
	
	return new Promise((resolve)=> {
	var tag = identifier;
		
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	
	var opacity=0;
	clearInterval(ids.get(tag));
	ids.set(tag, setInterval(frame, 1));
	
	function frame(){
		
	if (opacity >= finalopacity/4){
		
		clearInterval(ids.get(tag));
		resolve(new Promise((r)=>{
			
			ids.set(tag, setInterval(f, 5));
			
			function f(){
			if (opacity >= finalopacity){
				clearInterval(ids.get(tag));
				r("finished!");
				}
			else{
				opacity += 2;
				target.style.opacity = (opacity * .01);
			}
			}
		}));
	} 
	else{
		opacity += 2;
		target.style.opacity = (opacity * .01);
	}
	}
	
	});
}
