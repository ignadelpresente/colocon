document.addEventListener("DOMContentLoaded", function(){

const cookieBtn = document.getElementById("cookie-btn");
const cookieModal = document.getElementById("cookie-modal");
const closeCookie = document.querySelector(".close-cookie");
const acceptAll = document.getElementById("accept-all");

const cookieAccepted = localStorage.getItem("cookiesAccepted");

// If elements are missing, bail gracefully
if(!cookieBtn || !cookieModal){
    console.warn('cookies.js: cookie button or modal not found');
    return;
}

// ensure the button is visible and clickable
cookieBtn.style.display = cookieBtn.style.display || 'flex';
cookieBtn.style.pointerEvents = 'auto';
cookieBtn.style.zIndex = cookieBtn.style.zIndex || '9999';

// Si ya aceptó, no mostrar modal ni botón
if(cookieAccepted === "true"){
    // previously hid modal via inline style; keep modal available and control via class
    // cookieModal.style.display = "none";
}

cookieBtn.addEventListener("click", function(){
    // toggle modal visibility
    cookieModal.classList.toggle('show');
    // toggle body class to prevent background scroll when cookie modal open
    if(cookieModal.classList.contains('show')){
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
    console.log('cookies.js: cookie modal toggled, visible=', cookieModal.classList.contains('show'));
});

if(closeCookie){
    closeCookie.addEventListener("click", function(){
        cookieModal.classList.remove("show");
        document.body.classList.remove('modal-open');
    });
}

if(acceptAll){
    acceptAll.addEventListener("click", function(){
        localStorage.setItem("cookiesAccepted", "true");
        cookieModal.classList.remove("show");
        document.body.classList.remove('modal-open');
    });
}

// expose global close for inline uses if needed
window.closeCookie = function(){
    const m = document.getElementById('cookie-modal');
    if(m) m.classList.remove('show');
};
});