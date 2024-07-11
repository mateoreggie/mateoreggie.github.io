var ids = new Map();
var promises = [];
var rightarrow = null;
var leftarrow = null;

window.addEventListener('load', function(){
	rightarrow = document.getElementById("carousel-arrow-right");
	leftarrow = document.getElementById("carousel-arrow-left");
	
	leftbt = document.getElementById("carousel-bt-left");
	rightbt = document.getElementById("carousel-bt-right");
	
	rightarrow.addEventListener("mouseover", fadeIn);
	rightarrow.addEventListener("mouseout", fadeOut);
	rightarrow.addEventListener("click", onClick);
	
	
	leftarrow.addEventListener("mouseover", fadeIn);
	leftarrow.addEventListener("mouseout", fadeOut);
	leftarrow.addEventListener("click", onClick);
	
	leftbt.addEventListener("click", onClick);
	rightbt.addEventListener("click", onClick);
	
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

async function onElementLoad(elem){
	return new Promise ((resolve, reject) => {
		elem.onload = () => resolve(elem);
		elem.onerror = reject;
	});
}

async function fetchText(path){
	var txt = fetch(path)
		.then((res) => res.text())
		.then((text) => {
			//console.log(text);
			return text;
			});
	return txt;
		}



async function onClick(event){
	/*update whenever you add more stuff to that tag */
	var illustrations = 5; 
	
	var elem = document.getElementById("carousel-img");
	var src = elem.src;
	var num = Number(src.slice(src.lastIndexOf("/")+1, src.indexOf(".")));
	var path = "./illustrations/";
	var newsrc = "";
	var newdesc = "";
	
	if (event.currentTarget.id.indexOf("right") > -1){
		if ((num + 1) <= illustrations - 1){
		newsrc  = `${path}${(num + 1)}.jpg`; 
		newdesc = `${path}${(num + 1)}.txt`;
		}
		else{
		 newsrc = path + "1.jpg";
		 newdesc = `${path}1.txt`;

		}
	}
	else{
		if ((num - 1) > 0){
		newsrc  = `${path}${(num - 1)}.jpg`;
		newdesc = `${path}${(num - 1)}.txt`;

		}
		else{
		 newsrc = path + `${illustrations - 1}.jpg`;
		 newdesc = `${path}${illustrations - 1}.txt`;

		}
	}
	
	var tag = "carousel-img";
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	//console.log(event.currentTarget);
	var elem = document.getElementById(tag);
	var desc = document.getElementById("image-description");
	var time = 0;
	var opacity=100;
	clearInterval(ids.get(tag));
	ids.set(tag, setInterval(frame, 2));
	
	var textfromdesc = await fetchText(newdesc);
	
	function frame(){
	if (opacity == 0){
		clearInterval(ids.get(tag));
	} else{
		time++;
		
		if (time == 100){ elem.src = newsrc; desc.innerText = textfromdesc;}
		if (time < 100){
		opacity--;
		}
		else{
		opacity++;
		}
		elem.style.opacity = (opacity * .01);
		desc.style.opacity = (opacity * .01);
	}
	}
	
	
	
	
}

function btFadeIn(event){
	var tag = "";
	
	if (event.target.tagName.includes("right")){
		tag = "carousel-arrow-right";
	}
	else{
		tag = "carousel-arrow-left";
	}
	
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	//console.log(event.currentTarget);
	var elem = document.getElementById(tag);
	var opacity=0;
	clearInterval(ids.get(tag));
	ids.set(tag, setInterval(frame, 5));
	
	function frame(){
	if (opacity == 40){
		clearInterval(ids.get(tag));
	} else{
		opacity++;
		elem.style.opacity = (opacity * .01);
	}
	}
}

function btFadeOut(event){
	var tag = "";
	
	if (event.target.tagName.includes("right")){
		tag = "carousel-arrow-right";
	}
	else{
		tag = "carousel-arrow-left";
	}
	
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	var elem=document.getElementById(tag);
	var opacity=40;
	clearInterval(ids.get(tag));
	ids.set(tag,setInterval(frame, 2));
	
	function frame(){
	if (opacity == 0){
		clearInterval(ids.get(tag));
	} else{
		opacity--;
		elem.style.opacity = (opacity * .01);
	}
	}
}

function fadeIn(event){
	var tag = event.target.tagName;
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	//console.log(event.currentTarget);
	var elem = event.target;
	var opacity=0;
	clearInterval(ids.get(tag));
	ids.set(tag, setInterval(frame, 5));
	
	function frame(){
	if (opacity == 40){
		clearInterval(ids.get(tag));
	} else{
		opacity++;
		elem.style.opacity = (opacity * .01);
	}
	}
	
}

function fadeOut(event){
	var tag = event.target.tagName;
	if (!ids.has(tag)){
		ids.set(tag, null);
	}
	var elem=event.target;
	var opacity=40;
	clearInterval(ids.get(tag));
	ids.set(tag,setInterval(frame, 2));
	
	function frame(){
	if (opacity == 0){
		clearInterval(ids.get(tag));
	} else{
		opacity--;
		elem.style.opacity = (opacity * .01);
	}
	}
}

