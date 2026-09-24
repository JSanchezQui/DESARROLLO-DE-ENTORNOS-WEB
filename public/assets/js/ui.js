document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo accesible del menú desplegable móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        function toggleMenu() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-active');
        }

        menuToggle.addEventListener('click', toggleMenu);

        // Soporte de accesibilidad con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('is-active')) {
                toggleMenu();
                menuToggle.focus();
            }
        });
    }

    // 2. Validación y respuesta del formulario simulado
    const form = document.getElementById('support-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            feedback.innerHTML = '';

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const tipo = document.getElementById('tipo').value;
            const prioridad = form.querySelector('input[name="prioridad"]:checked');
            const descripcion = document.getElementById('descripcion').value.trim();

            let errores = [];

            if (nombre.length < 3) {
                errores.push('El nombre debe tener al menos 3 caracteres.');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                errores.push('Ingrese un correo electrónico válido.');
            }

            if (!tipo) {
                errores.push('Debe seleccionar un tipo de incidencia.');
            }

            if (!prioridad) {
                errores.push('Debe seleccionar una prioridad para su solicitud.');
            }

            if (descripcion.length < 10 || descripcion.length > 500) {
                errores.push('La descripción debe tener entre 10 y 500 caracteres.');
            }

            if (errores.length > 0) {
                feedback.innerHTML = `
                    <div class="feedback-error">
                        <p><strong>Corrija los siguientes campos obligatorios:</strong></p>
                        <ul>${errores.map(err => `<li>${err}</li>`).join('')}</ul>
                    </div>
                `;
            } else {
                const ticketNumber = Math.floor(100000 + Math.random() * 900000);
                feedback.innerHTML = `
                    <div class="feedback-success">
                        <p><strong>¡Solicitud de Soporte Procesada Exitosamente!</strong></p>
                        <p>Código de Ticket Ficticio: <strong>#NOV-${ticketNumber}</strong></p>
                        <p><small><em>Nota: Esta es una simulación técnica de evaluación. No se ha enviado ni guardado información.</em></small></p>
                    </div>
                `;
                form.reset();
            }
        });
    }
});
