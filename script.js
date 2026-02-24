
document.addEventListener('DOMContentLoaded', function () {
    // ACTUALIZACIÓN AUTOMÁTICA DEL AÑO
    actualizarAnio();

    // NAVEGACIÓN SUAVE (SMOOTH SCROLL)
    inicializarSmoothScroll();

    // DESTACAR SECCIÓN ACTIVA EN NAVEGACIÓN
    inicializarActiveNavigation();

    // EFECTO DE ESCRITURA PARA EL PERFIL
    inicializarEfectoEscritura();

    // MODO OSCURO/CLARO
    inicializarModoOscuro();
    ;

    // BOTÓN PARA VOLVER ARRIBA
    inicializarBotonArriba();

    // ANIMACIÓN AL HACER SCROLL
    inicializarAnimacionesScroll();
});

// ACTUALIZACIÓN AUTOMÁTICA DEL AÑO
function actualizarAnio() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const anioActual = new Date().getFullYear();
        footer.innerHTML = `© ${anioActual} Alejandro Parra`;
    }
}

//  NAVEGACIÓN SUAVE
function inicializarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

//  DESTACAR SECCIÓN ACTIVA
function inicializarActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// EFECTO DE ESCRITURA - PRIMER PÁRRAFO RÁPIDO, SEGUNDO INICIA AL TERMINAR
function inicializarEfectoEscritura() {
    const parrafos = document.querySelectorAll('#perfil p');

    if (parrafos.length >= 2) {
        // Guardar textos originales
        const textoOriginal1 = parrafos[0].textContent;
        const textoOriginal2 = parrafos[1].textContent;

        // Limpiar párrafos
        parrafos[0].textContent = '';
        parrafos[1].textContent = '';

        // Establecer altura mínima
        parrafos[0].style.minHeight = '120px';
        parrafos[1].style.minHeight = '100px';

        // Añadir indicador visual de que está escribiendo
        parrafos[0].classList.add('escribiendo');

        let i = 0;
        let j = 0;
        let primerCompletado = false;
        const velocidad = 14;

        function escribirPrimerParrafo() {
            if (i < textoOriginal1.length) {
                let caracteresPorVez = 3;
                let fragmento = textoOriginal1.substr(i, caracteresPorVez);
                parrafos[0].textContent += fragmento;
                i += caracteresPorVez;

                parrafos[0].classList.add('escribiendo');

                setTimeout(escribirPrimerParrafo, velocidad);
            } else {
                // Asegurar que el texto completo esté escrito
                parrafos[0].textContent = textoOriginal1;
                parrafos[0].classList.remove('escribiendo');
                parrafos[0].classList.add('completado');

                // Iniciar segundo párrafo
                primerCompletado = true;
                parrafos[1].classList.add('escribiendo');
                escribirSegundoParrafo();
            }
        }

        function escribirSegundoParrafo() {
            if (j < textoOriginal2.length) {
                let caracteresPorVez = 3;
                let fragmento = textoOriginal2.substr(j, caracteresPorVez);
                parrafos[1].textContent += fragmento;
                j += caracteresPorVez;

                setTimeout(escribirSegundoParrafo, velocidad);
            } else {
                parrafos[1].textContent = textoOriginal2;
                parrafos[1].classList.remove('escribiendo');
                parrafos[1].classList.add('completado');
            }
        }

        // Activar efecto cuando la sección sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && i === 0 && j === 0) {
                    escribirPrimerParrafo();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(document.querySelector('#perfil'));
    }
}



// MODO OSCURO/CLARO
function inicializarModoOscuro() {
    const navbar = document.querySelector('.navbar');
    const button = document.createElement('button');
    button.className = 'btn btn-sm btn-outline-light ms-2';
    button.innerHTML = '🌓';
    button.setAttribute('aria-label', 'Cambiar modo oscuro/claro');

    navbar.querySelector('.navbar-nav').appendChild(button);

    button.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            document.body.style.backgroundColor = '#f8f9fa';
            document.body.style.color = '#212529';
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
    });
}

// BOTÓN VOLVER ARRIBA
function inicializarBotonArriba() {
    const boton = document.createElement('button');
    boton.innerHTML = '⬆️';
    boton.setAttribute('aria-label', 'Volver arriba');
    boton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
    `;

    document.body.appendChild(boton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            boton.style.display = 'block';
        } else {
            boton.style.display = 'none';
        }
    });

    boton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// 12. ANIMACIONES AL HACER SCROLL
function inicializarAnimacionesScroll() {
    const elementos = document.querySelectorAll('section, .list-group-item');

    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.5s, transform 0.5s';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elementos.forEach(elemento => observer.observe(elemento));
}