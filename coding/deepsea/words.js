//put any functions that help to generate little ascii art things here
var particles = [".", "*", ":", "v", "-"];
var dense = ["@", "#", "$", "%", "&", "+"];
var medium = ["~", "_", "?", "<", ">", "//"];
function random(max, min = 0){return Math.floor(Math.random()*max) + min;}

let is_setup = false;

let intro_poem = [
    "vacuums pull releasing",
    "screeching against each",
    "componant as you",
    "rattle apart in", 
    "the burning",
    "fall against the ocean",
    "shattering on impact",
    "with tides circling",
    "fragments drifting",
    "down",
    "a crash with no ears to hear",   
    "the only tremor",
    "metal returning",
    "to earth",
    "and cradle" 
];

function setupIntro(){
    let content = document.querySelector("#poem1");
    var bg = content.querySelector(".bg");

//    console.log("set up intro");
    
    intro_poem.forEach((value, index)=>{

	var new_p = document.createElement("p");
	new_p.innerText = value;
	content.insertBefore(new_p, bg);
    });
}

function generateWaves(length, c = "."){
    var string = "";
    
    var m = random(15, 5);
    for (let i = 0; i < length; ++i){

	var offset = Math.abs(Math.floor(Math.sin(i) * m));
	

	string += "\n";
	
	for (let ii = 0; ii < offset; ++ii){
	    string += "  ";
	}
	string += c; string.padEnd(string.length + 3, " ");
	string += "\n";
    }
    return string;
}

function generateLayer(charset, width, embed = ""){
    
    //if (embed != ""){
    //console.log("displaying "+ embed);
    //}
    
    var placement = random(width, (width/3));
	
//    console.log("placing text @ " + placement + " compared to a width of " + width);
	
    var c = charset[random(charset.length)];
    var string = "";

    string = string.padEnd(string.length + width, c);
    string = string.slice(0, placement) + embed + string.slice(placement); 
    string = string.padEnd(string.length + random(width/3, 25), " ");
  
    string += "\n";
    
    return string;
}

function poetry_main(){

    //debugger;
    
    console.log("main called from words.js");
    const drift = document.querySelector("#longfall");
    const p = document.querySelector("#ground");

    setupIntro();
    
    p.innerText = ` breathe in,\n
 breathe out, \n`;

    //drift.innerText += "\nand again.\n";
    //drift.innerText += "\nand again.\n";

    drift.innerText += generateWaves(32, particles[3]);
    drift.innerText+= generateWaves(32, particles[random(particles.length - 1)]);
    drift.innerText+= generateWaves(64);
    drift.innerText+= generateWaves(32, particles[random(particles.length)]);
    drift.innerText+= generateWaves(64);
    drift.innerText+= generateWaves(128);
    for (let i = 0; i < 16; ++i){
	switch(i){
	default:
	    p.innerText += generateLayer(particles, i*5);
	}
   
    }
    for (let i = 16; i < 48; ++i){

	switch(i){
	default:
	    p.innerText += generateLayer(medium, i*5);
	}
    }

    for (let i = 64; i < 256; ++ i){
	let n_layer ="";
	switch(i){
	case 64:{n_layer=generateLayer(medium, i*5,"");
		 break;}
	case 65:{
	    n_layer= generateLayer(medium, i*5, " your body crushed out ");
	    break;}
	case 66:
	    {
		n_layer= generateLayer(dense, i*5," besides the microplastic grit ");
		break;}
	case 67:{
	    n_layer= generateLayer(medium, i*5," fading under the weight ");
	    break;}
	case 68:{
	    n_layer= generateLayer(dense, i*5," of the ocean depths ");
	    break;}
	case 69:{
	    n_layer= generateLayer(dense, i*5," and the flow of time ");
	    break;}
	case 70:{n_layer = generateLayer(medium, i*5, " finally settling your bones ");
		 break;}
	case 71:{n_layer = generateLayer(medium, i*5, " in to rest. ");
		 break;}
	case 72:{n_layer = generateLayer(medium, i*5, " new sensations: ");
		 break;}
	case 73:{n_layer = generateLayer(medium, i*5, " the creeping of mycellium ");
		 break;}
	case 74:{n_layer = generateLayer(medium, i*5, "throughout your hull");
		 break;}
	case 75:{n_layer = generateLayer(dense, i*5, " waterlogged sensors dissolving ");
		 break;}
	case 76:{n_layer = generateLayer(dense, i*5, " sonar echoes kiss the gravel and ");
		 break;}
	case 77:{n_layer = generateLayer(medium, i*5, " recollections of the ocean ");
		 break;}
	case 78:{n_layer = generateLayer(dense, i*5, " which you once surveyed ");
		 break;}
	case 79:{n_layer = generateLayer(medium, i*5, " collide within ");
		 break;}
	case 80:{n_layer = generateLayer(medium, i*5, " the oceans hum which conducts ");
		 break;}
	case 81:{n_layer = generateLayer(dense, i*5, " the secrets of every creature ");
		 break;}
	case 82:{n_layer = generateLayer(medium, i*5, " calling out for their fellows ");
		 break;}
	case 83:{n_layer = generateLayer(medium, i*5, " the resounding silence of the past ");
		 break;}
	case 84:{n_layer = generateLayer(medium, i*5, " makes way for your present. ");
		 break;}
	default: {
	if (i < 100){
	    if (random(2)){
		n_layer = generateLayer(dense, i*6);
	    }
	    else{n_layer= generateLayer(medium, i*6);}
	}
	else{
	    n_layer = generateLayer(dense, i*6);
	}
	}
	}
	p.innerText += n_layer;
    }
}

poetry_main();
