const audio=document.getElementById("ambient");
let playing=false;

function toggleMusic(){
if(!playing){
audio.play();
document.querySelector(".music-btn").innerText="Pausar sonido";
}else{
audio.pause();
document.querySelector(".music-btn").innerText="Activar sonido";
}
playing=!playing;
}