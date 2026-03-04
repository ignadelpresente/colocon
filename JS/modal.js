// ================= MODAL FUNCIONAL COMPLETO =================

document.addEventListener("DOMContentLoaded", function(){

    // Inicializar EmailJS (solo si está cargado)
    if (typeof emailjs !== "undefined") {
        emailjs.init("Ic68PXNWRbq9tRGpF");
    }

    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close");
    const buttons = document.querySelectorAll(".top-buttons button");

    buttons.forEach(button => {

        button.addEventListener("click", function(){

            const section = this.textContent.trim().toLowerCase();
            let content = "";

            switch(section){

                // ================= MÚSICA =================
                case "música":
                case "musica":

                    const services = [
                        { key:'spotify', name:'Spotify', action:'Escuchar', color:'#1DB954', url:'https://open.spotify.com/' },
                        { key:'youtubemusic', name:'YouTube Music', action:'Escuchar', color:'#FF0000', url:'https://music.youtube.com/' },
                        { key:'youtube', name:'YouTube', action:'Ver', color:'#FF0000', url:'https://youtube.com/' },
                        { key:'apple', name:'Apple Music', action:'Escuchar', color:'#FA57C1', url:'https://music.apple.com/' },
                        { key:'amazon', name:'Amazon Music', action:'Escuchar', color:'#00A8E1', url:'https://music.amazon.com/' }
                    ];

                    const base = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';

                    content = '<h2>Escucha en</h2><div class="services-list"><ul>';

                    services.forEach(s => {
                        content += `
                            <li class="service-item">
                                <div class="service-left" style="background:${s.color}">
                                    <img src="${base}${s.key}.svg" class="service-icon">
                                </div>
                                <div class="service-name">${s.name}</div>
                                <button class="service-btn" data-url="${s.url}">
                                    ${s.action}
                                </button>
                            </li>
                        `;
                    });

                    content += '</ul></div>';
                break;


                // ================= VIDEOS =================
                case "videos":
                    content = `
                        <h2>VIDEO OFICIAL</h2>
                        <div class="video-container">
                            <iframe 
                                src="https://www.youtube.com/embed/zbmIv6HROGM"
                                frameborder="0"
                                allowfullscreen>
                            </iframe>
                        </div>
                    `;
                break;


                // ================= TOUR =================
                case "tour":
                    content = `
                        <h2>TOUR</h2>
                        <div id="seated-55fdf2c0"
                            data-artist-id="5491853f-887d-4225-a501-50842b2eb9ac"
                            data-css-version="3">
                        </div>
                    `;
                break;


                // ================= CONTACTO =================
                case "contacto":

                    content = `
                        <h2>CONTACTO</h2>

                        <div class="contact-simple">
   
                            <div class="contact-divider"></div>
                                <p class="contact-mail">
                                    Para contactarnos envíanos un mail o escríbenos directamente a:<br>
                                    <span class="contact-address">mgmt.colocon@gmail.com</span>
                                </p>
                            <a 
                                href="mailto:mgmt.colocon@gmail.com?subject=Consulta%20desde%20la%20web"
                                class="email-btn"
                            >
                                ✉ Enviar correo
                            </a>                            
                        </div>
                    `;
                break;
            }

            modalBody.innerHTML = content;
            modal.classList.add("show");
            document.body.classList.add("modal-open");


            // ================= LINKS MÚSICA =================
            const serviceButtons = modalBody.querySelectorAll(".service-btn");
            serviceButtons.forEach(btn => {
                btn.addEventListener("click", function(){
                    window.open(this.dataset.url, "_blank");
                });
            });


            // ================= SEATED =================
            if(section === "tour"){
                if(!document.querySelector('script[src="https://widget.seated.com/app.js"]')){
                    const script = document.createElement("script");
                    script.src = "https://widget.seated.com/app.js";
                    script.async = true;
                    document.body.appendChild(script);
                } else if(window.Seated){
                    window.Seated.load();
                }
            }


            // ================= CONTACTO CON EMAILJS =================
            if(section === "contacto"){

                const form = document.getElementById("contact-form");
                const messageBox = document.getElementById("form-message");
                const sendBtn = document.getElementById("send-btn");
                const startTime = Date.now();

                form.addEventListener("submit", function(e){

                    e.preventDefault();

                    const honeypot = form.querySelector('input[name="website"]').value;

                    if(honeypot !== ""){
                        return;
                    }

                    if(Date.now() - startTime < 3000){
                        messageBox.innerHTML = "Envío demasiado rápido 🤖";
                        messageBox.style.opacity = "1";
                        return;
                    }

                    sendBtn.disabled = true;
                    sendBtn.innerHTML = "Enviando...";

                    const templateParams = {
                        title: "Nuevo mensaje desde la web",
                        name: document.getElementById("from_name").value,
                        email: document.getElementById("reply_to").value,
                        message: document.getElementById("message").value
                    };

                    emailjs.send(
                        "service_al3beed",
                        "template_0wtrh52",
                        templateParams
                    )
                    .then(function(){

                        messageBox.innerHTML = "Mensaje enviado correctamente ✅";
                        messageBox.style.opacity = "1";

                        setTimeout(() => {
                            modal.classList.remove("show");
                            document.body.classList.remove("modal-open");
                            form.reset();
                        }, 1800);

                    })
                    .catch(function(error){

                        console.error("EmailJS error:", error);

                        messageBox.innerHTML = "Error al enviar ❌";
                        messageBox.style.opacity = "1";

                        sendBtn.disabled = false;
                        sendBtn.innerHTML = "ENVIAR";
                    });

                });
            }

        });
    });


    if(closeBtn){
        closeBtn.addEventListener("click", function(){
            modal.classList.remove("show");
            document.body.classList.remove("modal-open");
        });
    }
    // ================= COPIAR MAIL =================
    document.addEventListener("click", function(e){
        if(e.target.classList.contains("contact-address")){
            
            navigator.clipboard.writeText("mgmt.colocon@gmail.com");

            const originalText = e.target.innerText;
            e.target.innerText = "Copiado ✔";
            e.target.style.color = "#ff3366";

            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.color = "";
            }, 1500);
        }
    });

});

window.closeModal = function(){
    const m = document.getElementById('modal');
    if(m) m.classList.remove('show');
    document.body.classList.remove('modal-open');
};

/*

// ================= MODAL FUNCIONAL COMPLETO =================

document.addEventListener("DOMContentLoaded", function(){

    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close");
    const buttons = document.querySelectorAll(".top-buttons button");

    buttons.forEach(button => {
        button.addEventListener("click", function(){

            const section = this.textContent.trim().toLowerCase();
            let content = "";

            switch(section){

                // ================= MÚSICA =================
                case "música":
                case "musica":

                    const services = [
                        {
                            key:'spotify',
                            name:'Spotify',
                            action:'Escuchar',
                            color:'#1DB954',
                            url:'https://open.spotify.com/intl-es/artist/0Fg7GbmpoUaBjA57dnW9jG?si=rofVlosMQl6QOXw2eiLZ_w' // CAMBIA POR TU LINK
                        },
                        {
                            key:'youtubemusic',
                            name:'YouTube Music',
                            action:'Escuchar',
                            color:'#FF0000',
                            url:'https://music.youtube.com/channel/UCCBqTm9UI7eTu-9ZjRXxqZA' // CAMBIA POR TU LINK
                        },
                        {
                            key:'youtube',
                            name:'YouTube',
                            action:'Ver',
                            color:'#FF0000',
                            url:'https://www.youtube.com/channel/UCCBqTm9UI7eTu-9ZjRXxqZA' // CAMBIA POR TU LINK
                        },
                        {
                            key:'apple',
                            name:'Apple Music',
                            action:'Escuchar',
                            color:'#FA57C1',
                            url:'https://music.apple.com/ar/artist/colocón/1880979885' // CAMBIA POR TU LINK
                        },
                        {
                            key:'amazon',
                            name:'Amazon Music',
                            action:'Escuchar',
                            color:'#00A8E1',
                            url:'https://music.amazon.com/artists/B0GQNFC3GS/colocón' // CAMBIA POR TU LINK
                        }
                    ];

                    function iconFor(key){
                        const base = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';
                        switch(key){
                            case 'spotify': return `<img src="${base}spotify.svg" class="service-icon">`;
                            case 'youtubemusic': return `<img src="${base}youtubemusic.svg" class="service-icon">`;
                            case 'youtube': return `<img src="${base}youtube.svg" class="service-icon">`;
                            case 'apple': return `<img src="${base}apple.svg" class="service-icon">`;
                            case 'amazon': return `<img src="${base}amazon.svg" class="service-icon">`;
                            default: return `<img src="${base}music.svg" class="service-icon">`;
                        }
                    }

                    content = '<h2>Escucha en</h2>';
                    content += '<div class="services-list"><ul>';

                    services.forEach(s => {
                        const icon = iconFor(s.key);
                        content += `
                            <li class="service-item">
                                <div class="service-left" style="background:${s.color}">
                                    ${icon}
                                </div>
                                <div class="service-name">${s.name}</div>
                                <button class="service-btn" data-url="${s.url}">
                                    ${s.action}
                                </button>
                            </li>
                        `;
                    });

                    content += '</ul></div>';

                break;



                // ================= VIDEOS =================
                case "videos":

                    content = `
                        <h2>VIDEO OFICIAL</h2>
                        <div class="video-container">
                            <iframe 
                                src="https://www.youtube.com/embed/zbmIv6HROGM"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                    `;

                break;



                // ================= TOUR =================
                case "tour":

                    content = `
                        <h2>TOUR</h2>
                        <div id="seated-55fdf2c0"
                            data-artist-id="5491853f-887d-4225-a501-50842b2eb9ac"
                            data-css-version="3">
                        </div>
                    `;

                break;



                // ================= MERCH =================
                case "merch":
                    content = "<h2>MERCH</h2><p>Próximamente.</p>";
                break;



                // ================= CONTACTO =================
                case "contacto":

                    content = `
                        <h2>CONTACTO</h2>
                        <form id="contact-form">
                            <input type="text" id="nombre" placeholder="Nombre" required>
                            <input type="email" id="email" placeholder="Email" required>
                            <textarea id="mensaje" placeholder="Mensaje" required></textarea>
                            <button type="submit">ENVIAR</button>
                        </form>
                    `;

                    break;
            }

            // Insertar contenido
            modalBody.innerHTML = content;

            // Mostrar modal
            modal.classList.add("show");
            document.body.classList.add("modal-open");



            // ================= ACTIVAR LINKS DE MÚSICA =================
            const serviceButtons = modalBody.querySelectorAll(".service-btn");

            serviceButtons.forEach(btn => {
                btn.addEventListener("click", function(){
                    const url = this.getAttribute("data-url");
                    window.open(url, "_blank");
                });
            });



            // ================= CARGAR WIDGET DE SEATED =================
            if(section === "tour") {

                if(!document.querySelector('script[src="https://widget.seated.com/app.js"]')) {
                    const script = document.createElement("script");
                    script.src = "https://widget.seated.com/app.js";
                    script.async = true;
                    document.body.appendChild(script);
                } else {
                    if(window.Seated){
                        window.Seated.load();
                    }
                }
            }

        });
    });



    // ================= CERRAR MODAL =================
    if(closeBtn){
        closeBtn.addEventListener("click", function(){
            modal.classList.remove("show");
            document.body.classList.remove("modal-open");
        });
    }

});



// ================= CIERRE GLOBAL =================
window.closeModal = function(){
    const m = document.getElementById("modal");
    if(m) m.classList.remove("show");
    document.body.classList.remove("modal-open");
};


// ================= MODAL FUNCIONAL CON TU HTML =================

document.addEventListener("DOMContentLoaded", function(){

    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close");

    // attach to top-buttons only
    const buttons = document.querySelectorAll(".top-buttons button");

    buttons.forEach(button => {
        button.addEventListener("click", function(){

            const section = this.textContent.trim().toLowerCase();

            let content = "";

            switch(section){
                case "música":
                case "musica":
                    // Build services list for music modal
                    const services = [
                        {key:'youtubemusic', name: 'YouTube Music', action: 'Escuchar', color:'#FF0000'},
                        {key:'youtube', name: 'YouTube', action: 'Escuchar', color:'#FF0000'},
                        {key:'spotify', name: 'Spotify', action: 'Escuchar', color:'#1DB954'},
                        {key:'apple', name: 'Apple Music', action: 'Escuchar', color:'#FA57C1'},
                        {key:'amazon', name: 'Amazon Music', action: 'Escuchar', color:'#00A8E1'}
                    ];

                        function iconFor(key){
                            // Use CDN-hosted Simple Icons SVGs for better design
                            const base = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';
                            switch(key){
                                case 'spotify':
                                    return `<img src="${base}spotify.svg" alt="Spotify" class="service-icon">`;
                                case 'youtubemusic':
                                    return `<img src="${base}youtubemusic.svg" alt="YouTube Music" class="service-icon">`;
                                case 'youtube':
                                    return `<img src="${base}youtube.svg" alt="YouTube" class="service-icon">`;
                                case 'apple':
                                    return `<img src="${base}apple.svg" alt="Apple" class="service-icon">`;
                                case 'amazon':
                                    return `<img src="${base}amazon.svg" alt="Amazon" class="service-icon">`;
                                default:
                                    return `<img src="${base}music.svg" alt="Music" class="service-icon">`;
                            }
                        }

                    content = '<h2>Escucha en</h2>';
                    content += '<div class="services-list"><ul>';
                    services.forEach(s => {
                        const icon = iconFor(s.key);
                        content += `
                            <li class="service-item">
                                <div class="service-left" style="background:${s.color}">${icon}</div>
                                <div class="service-name">${s.name}</div>
                                <button class="service-btn">${s.action}</button>
                            </li>
                        `;
                    });
                    content += '</ul></div>';
                break;

                case "videos":
                    content = "<h2>VIDEOS</h2><p>Contenido de videos aquí.</p>";
                break;

                case "merch":
                    content = "<h2>MERCH</h2><p>Próximamente.</p>";
                break;

                case "tour":
                    content = "<h2>TOUR</h2><p>Fechas próximamente.</p>";
                break;

                case "contacto":
                    content = `
                        <h2>CONTACTO</h2>
                        <form>
                            <input type="text" name="nombre" placeholder="Nombre">
                            <input type="email" name="email" placeholder="Email">
                            <textarea name="mensaje" placeholder="Mensaje"></textarea>
                            <button type="submit">ENVIAR</button>
                        </form>
                    `;
                break;
            }

            modalBody.innerHTML = content;
            modal.classList.add("show");
            // prevent background scroll
            document.body.classList.add('modal-open');

        });
    });

    if(closeBtn){
        closeBtn.addEventListener("click", function(){
            modal.classList.remove("show");
            document.body.classList.remove('modal-open');
        });
    }

});

// expose global function for inline handlers in HTML
window.closeModal = function(){
    const m = document.getElementById('modal');
    if(m) m.classList.remove('show');
    document.body.classList.remove('modal-open');
};


*/