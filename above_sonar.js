
var textures_above = [];
var sources_above = [];

async function init_above(){
    
    let getUrls = (path) => {
	for (var i = 1; i < 27; ++i) {
	var num = i.toString();
	if (i < 10) {num = "0" + num;}
	sources_above.push(path + num + ".png");
    }
			   };

    getUrls("./images/above/");
//    v("./images/above/");
    //load textures for second canvas

    textures_above = await loadTextures(sources_above);
    console.log(textures_above);
    //alert('init completed');
}

async function main_above() {
	
    await init_above();
    var overlay = new Image();
    overlay.src = "./images/OVERLAY.jpg";
    overlay.onload = function(){
	textures_above.push(overlay);
	
	render_above(textures_above);
      }
	  
}


function render_above(images) {
    const time = 90;
    const canvas = document.querySelector("#c2");
    const gl = document.querySelector("#c2").getContext("webgl");

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

    console.log(baseTextures);
    
    var u_image_location = gl.getUniformLocation(program, "u_image");
    var u_overlay_location = gl.getUniformLocation(program, "u_overlay");

    gl.uniform1i(u_image_location, 0);
    gl.uniform1i(u_overlay_location, 1);

    //alert(baseTextures);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, baseTextures[random(baseTextures.length/2, baseTextures.length-2)]);
    
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
	
	canvas.style.backgroundImage = "url(\"./images/OVERLAY.png\"), url(\"" + sources[random(sources.length/2, sources.length-1)] + "\")"; 

	
    let fin = async () => {
//	console.log(sources);
	
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
		
		let r = random(sources.length/2, sources.length-1);
	    canvas.style.backgroundImage = "url(\"./images/OVERLAY.png\"), url(\"" + sources[r] + "\")"; 

	for (let iii = 0; iii < positions.length/2; iii += 3){
	    
	    gl.drawArrays(gl.TRIANGLES, iii, (positions.length/2)-iii);

	    await(delay(time));
	}

	    let rt = random(baseTextures.length/2, baseTextures.length-1);
	    
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, baseTextures[rt]);

	    //console.log(rt);
		console.log("background: "+r+"; texture: "+rt);

	    
	    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
 	    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
   
	    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord_buffer);
	    gl.bufferData(gl.ARRAY_BUFFER, tex_positions, gl.STATIC_DRAW);

	}

    };

    fin();

}


/*main_above();*/
