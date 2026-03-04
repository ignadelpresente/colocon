const canvas = document.getElementById("bg");
const gl = canvas.getContext("webgl");

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0,0,canvas.width,canvas.height);
}
resize();
window.addEventListener("resize",resize);

const vertex = `
attribute vec2 position;
void main(){
gl_Position=vec4(position,0.0,1.0);
}
`;

const fragment = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

void main(){
vec2 uv = (gl_FragCoord.xy - resolution.xy*0.5) / resolution.y;

float wave = sin(uv.x*6.0 + time) + cos(uv.y*6.0 + time);

vec3 color = vec3(
0.5+0.5*sin(time+uv.x*3.0),
0.5+0.5*sin(time+uv.y*3.0),
0.5+0.5*sin(time)
);

gl_FragColor = vec4(color*wave,1.0);
}
`;

function compile(type,source){
const shader=gl.createShader(type);
gl.shaderSource(shader,source);
gl.compileShader(shader);
return shader;
}

const program=gl.createProgram();
gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));
gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));
gl.linkProgram(program);
gl.useProgram(program);

const buffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
-1,-1,1,-1,-1,1,
-1,1,1,-1,1,1
]),gl.STATIC_DRAW);

const position=gl.getAttribLocation(program,"position");
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

const timeLoc=gl.getUniformLocation(program,"time");
const resLoc=gl.getUniformLocation(program,"resolution");

function render(t){
gl.uniform1f(timeLoc,t*0.001);
gl.uniform2f(resLoc,canvas.width,canvas.height);
gl.drawArrays(gl.TRIANGLES,0,6);
requestAnimationFrame(render);
}
requestAnimationFrame(render);