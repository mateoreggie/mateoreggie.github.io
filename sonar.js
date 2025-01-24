
var textures = [];
var sources = [];

function loadImage(url){
	
    return new Promise((resolve, reject) => {
	var image = new Image();
	image.src = url;
	image.onload = () => resolve(image);
	image.onerror = reject;
	 
	});
}

async function loadTextures(sources){

    var new_textures = [];
    
    sources.forEach(async (url, i)=>{
	const result = await loadImage(url);
	new_textures.push(result);
    });

    return new_textures;
}


async function init(){
    
    let getUrls = (path) => {
	for (var i = 1; i < 8; ++i) {
	var num = i.toString();
	if (i < 10) {num = "0" + num;}
	
	sources.push("./images/" + num + ".jpg");
    }
	for (var i = 1; i < 9; ++i){
		var num = i.toString();
		if (i < 10) {num = "0" + num;}
		sources.push("./images/above/"+num+".png");
	}
			   };

    getUrls("./images/");
//    v("./images/above/");
    //load textures for second canvas
    console.log(sources);
    textures = await loadTextures(sources);

    //alert('init completed');
}

function createProgram(gl, vertexShader, fragmentShader){
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {return program;}

    console.log(gl.getProgramInfo(program));
    gl.deleteProgram(program);
}

function createShader(gl, type, source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if (success) { return shader; }

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
    }

function createAndSetupTextures(gl, images){
    var textures = [];
    
    for (var ii = 0; ii < images.length; ++ii){
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[ii]);

	//console.log(texture);
	
	textures.push(texture);
    }
    return textures;

}

async function main() {
    await init();
    var overlay = new Image();
    overlay.src = "./images/OVERLAY.jpg";
    overlay.onload = function(){
	textures.push(overlay);
	render(textures);
	render_above(textures);
      }
}

function generateGeometry(size){
    
    var segments = 16.0;
    var inc = 1.0/segments;
    var positions = []

    for (var ii = 0; ii < segments; ++ii){

	positions.push(size); positions.push(inc*ii);
	positions.push(size); positions.push(inc * ii + inc);
	positions.push(0); positions.push(0);
    }

    for (var ii = segments; ii >= 0; --ii){
	positions.push(inc*ii);positions.push(size);
	positions.push(inc*ii + inc);positions.push(size);
	positions.push(0);positions.push(0);
    }

    for (var ii = 0; ii < segments; ++ii){
	positions.push(-inc*ii);positions.push(size);
	positions.push(-(inc*ii + inc));positions.push(size);
	positions.push(0);positions.push(0);
    }

    for (var ii = segments+1; ii >= 0; --ii){
	positions.push(-size); positions.push(inc*ii);
	positions.push(-size); positions.push(inc * ii + inc);
	positions.push(0); positions.push(0);
    }

    for (var ii = 0; ii < segments; ++ii){
	positions.push(-size); positions.push(-(inc*ii));
	positions.push(-size); positions.push(-(inc * ii + inc));
	positions.push(0); positions.push(0);
    }
	
    for (var ii = segments+1; ii >= 0; --ii){
	positions.push(-inc*ii);positions.push(-size);
	positions.push(-(inc*ii + inc));positions.push(-size);
	positions.push(0);positions.push(0);
    }

    for (var ii = 0; ii < segments; ++ii){
	positions.push(inc*ii);positions.push(-size);
	positions.push(inc*ii + inc);positions.push(-size);
	positions.push(0);positions.push(0);
    }

    for (var ii = segments+1; ii >= 0; --ii){
	positions.push(size); positions.push(-(inc*ii));
	positions.push(size); positions.push(-(inc * ii + inc));
	positions.push(0); positions.push(0);
    }
	
    //console.log(positions.length);
    return new Float32Array(positions);
    
}

function generateReverseGeometry(size){
    
    var segments = 16.0;
    var inc = 1.0/segments;
    var positions = []

    for (var ii = 0; ii < segments; ++ii){
	positions.push(size); positions.push(-(inc*ii));
	positions.push(size); positions.push(-(inc * ii + inc));
	positions.push(0); positions.push(0);
    }

    for (var ii = segments+1; ii >= 0; --ii){
	positions.push(inc*ii);positions.push(-size);
	positions.push(inc*ii + inc);positions.push(-size);
	positions.push(0);positions.push(0);
    }
    
    for (var ii = 0; ii < segments; ++ii){
	positions.push(-inc*ii);positions.push(-size);
	positions.push(-(inc*ii + inc));positions.push(-size);
	positions.push(0);positions.push(0);
    }

    for (var ii = segments+1; ii >= 0; --ii){
	positions.push(-size); positions.push(-(inc*ii));
	positions.push(-size); positions.push(-(inc * ii + inc));
	positions.push(0); positions.push(0);
    }

    for (var ii = 0; ii < segments; ++ii){
	positions.push(-size); positions.push(inc*ii);
	positions.push(-size); positions.push(inc * ii + inc);
	positions.push(0); positions.push(0);
    }

    for (var ii = segments+1; ii >= 0; --ii){
	positions.push(-inc*ii);positions.push(size);
	positions.push(-(inc*ii + inc));positions.push(size);
	positions.push(0);positions.push(0);
    }

    for (var ii = 0; ii < segments; ++ii){
	positions.push(inc*ii);positions.push(size);
	positions.push(inc*ii + inc);positions.push(size);
	positions.push(0);positions.push(0);
    }
////
    for (var ii = segments+1; ii >= 0; --ii){

	positions.push(size); positions.push(inc*ii);
	positions.push(size); positions.push(inc * ii + inc);
	positions.push(0); positions.push(0);
    }
	
    //console.log(positions.length);
    return new Float32Array(positions);    
}


const delay = (ms) => new Promise(res => setTimeout(res, ms));
function random(min, max){ 
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))+Math.ceil(min));}

function render(images) {
    const time = 100;
    const canvas = document.querySelector("#c");
    const gl = document.querySelector("#c").getContext("webgl");

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    
    if (!gl){
	alert("webgl not supported!");
	return;}
    
    const vs_source = `

attribute vec4 a_position;
//uniform vec2 u_resolution;

attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
//vec2 clipspace = ((a_position/u_resolution) * 2.0) - 1.0;

gl_Position = a_position;
v_texCoord = a_texCoord;
}

`;

    const fs_source = `
precision mediump float;

uniform sampler2D u_image;
uniform sampler2D u_overlay;
uniform vec2 u_mouse;


varying vec2 v_texCoord;

void main() {

vec4 color0 = texture2D(u_image, v_texCoord) * vec4(1, 1, 1, 1);
vec4 color1 = texture2D(u_overlay, v_texCoord) * vec4(0.2, 0.2, 0.2, 0);

gl_FragColor = color0 + color1;

}
`;
    var size = 1.0;
    var inc = 0.1;

    var cur_css_bg = "url(" + textures[0] + ");";
    
    var positions = generateGeometry(1);
    var tex_positions = generateGeometry(1);

    var reverse_positions = generateReverseGeometry(1);
    var reverse_tex_positions = generateReverseGeometry(1);
    
    tex_positions.forEach((val, i, arr)=>{arr[i] = (val+1)/2; });

    reverse_tex_positions.forEach((val, i, arr)=>{arr[i] = (val+1)/2;});

    
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fs_source);
    const vs = createShader(gl, gl.VERTEX_SHADER, vs_source);

    const program = createProgram(gl, vs, fs);

    var a_position_location = gl.getAttribLocation(program, "a_position");
   
    var position_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
 		
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    var texCoord_location = gl.getAttribLocation(program,"a_texCoord");
    var texCoord_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tex_positions, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(texCoord_location);
    gl.vertexAttribPointer(texCoord_location, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    var baseTextures = createAndSetupTextures(gl, images);
    
    var u_image_location = gl.getUniformLocation(program, "u_image");
    var u_overlay_location = gl.getUniformLocation(program, "u_overlay");

    gl.uniform1i(u_image_location, 0);
    gl.uniform1i(u_overlay_location, 1);

    //alert(baseTextures);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, baseTextures[random(0, (baseTextures.length/2)-1)]);
    
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, baseTextures[baseTextures.length - 1]);
    
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    //gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);

    gl.enableVertexAttribArray(a_position_location);
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);

    gl.vertexAttribPointer(a_position_location, 2, gl.FLOAT, false, 0, 0);
	
	canvas.style.backgroundImage = "url(\"./images/OVERLAY.png\"), url(\"" + sources[random(0, (sources.length/2)-1)] + "\")"; 

    let fin = async () => {
	while (true){
	for (let iii = positions.length/2; iii >= 0; iii -= 3){
	    
	    gl.drawArrays(gl.TRIANGLES, iii, (positions.length/2)-iii);

	    await(delay(time));
	}
	
	await(delay(1000));
	
	    gl.drawArrays(gl.TRIANGLES, 0, positions.length/2);

	    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
 	    gl.bufferData(gl.ARRAY_BUFFER, reverse_positions, gl.STATIC_DRAW);
	    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord_buffer);
	    gl.bufferData(gl.ARRAY_BUFFER, reverse_tex_positions, gl.STATIC_DRAW);
		
		let r = random(0, (sources.length/2)-1);
	    canvas.style.backgroundImage = "url(\"./images/OVERLAY.png\"), url(\"" + sources[r] + "\")"; 
		
		// console.log(sources[r]);

	for (let iii = 0; iii < positions.length/2; iii += 3){
	    
	    gl.drawArrays(gl.TRIANGLES, iii, (positions.length/2)-iii);

	    await(delay(time));
	}
	    let rt = random(0, (baseTextures.length/2)-1);
	    console.log("background: "+r+"; texture: "+rt);
	    
		gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, baseTextures[rt]);
	    //console.log(rt);

	    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
 	    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
   
	    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord_buffer);
	    gl.bufferData(gl.ARRAY_BUFFER, tex_positions, gl.STATIC_DRAW);

	}

    };

    fin();

}


main();
