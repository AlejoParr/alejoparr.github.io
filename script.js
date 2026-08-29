document.addEventListener('DOMContentLoaded', function () {
    // ACTUALIZACIÓN AUTOMÁTICA DEL AÑO
    actualizarAnio();

    // NAVEGACIÓN SUAVE (SMOOTH SCROLL)
    inicializarSmoothScroll();

    // DESTACAR SECCIÓN ACTIVA EN NAVEGACIÓN
    inicializarActiveNavigation();

    // MODO OSCURO/CLARO
    inicializarModoOscuro();

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

// NAVEGACIÓN SUAVE
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

// DESTACAR SECCIÓN ACTIVA
function inicializarActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

// Switch para el modo oscuro.
function inicializarModoOscuro() {
    const navbar = document.querySelector('.navbar');
    const button = document.createElement('button');
    button.className = 'btn btn-sm btn-outline-light ms-2 theme-toggle-minimal';
    button.innerHTML = '<span class="barra"></span><span class="circulo"></span>';
    button.setAttribute('aria-label', 'Cambiar modo oscuro/claro');

    navbar.querySelector('.navbar-nav').appendChild(button);

    const temaGuardado = localStorage.getItem('tema') || 'oscuro';
    if (temaGuardado === 'claro') {
        document.body.classList.add('light-mode');
        button.classList.add('activo');
        button.classList.remove('btn-outline-light');
        button.classList.add('btn-outline-dark');
    }

    button.addEventListener('click', () => {
        button.classList.toggle('activo');

        setTimeout(() => {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                button.classList.remove('btn-outline-light');
                button.classList.add('btn-outline-dark');
                localStorage.setItem('tema', 'claro');
            } else {
                button.classList.remove('btn-outline-dark');
                button.classList.add('btn-outline-light');
                localStorage.setItem('tema', 'oscuro');
            }
        }, 200);
    });
}

// BOTÓN VOLVER ARRIBA
function inicializarBotonArriba() {
    const boton = document.createElement('button');
    boton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Icono FontAwesome en lugar de texto
    boton.setAttribute('aria-label', 'Volver arriba');
    boton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #3a86ff;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transition: transform 0.2s;
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

// ANIMACIONES AL HACER SCROLL
function inicializarAnimacionesScroll() {
    const elementos = document.querySelectorAll('section, .list-group-item, .card');

    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.6s, transform 0.6s';
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