// public/assets/js/interaccion.js
import { listaServiciosGlobal } from './catalogo.js';

/* ==========================================================================
   1. PANEL DE AYUDA ACCESIBLE
   ========================================================================== */
const ayuda = document.querySelector('#panel-ayuda');
const botonAyuda = document.querySelector('#boton-ayuda');

function cambiarAyuda(abierta) {
    ayuda.hidden = !abierta;
    botonAyuda.setAttribute('aria-expanded', String(abierta));
}

if (botonAyuda && ayuda) {
    botonAyuda.addEventListener('click', () => {
        cambiarAyuda(botonAyuda.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !ayuda.hidden) {
            cambiarAyuda(false);
            botonAyuda.focus();
        }
    });

    cambiarAyuda(false);
}

/* ==========================================================================
   2. CONTADOR DE CARACTERES Y VALIDACIÓN DE DESCRIPCIÓN
   ========================================================================== */
const form = document.querySelector('#form-incidencia');
const descripcion = document.querySelector('#descripcion');
const contador = document.querySelector('#contador');

function actualizarContador() {
    if (descripcion && contador) {
        contador.textContent = `${descripcion.value.length}/500 caracteres`;
    }
}

if (descripcion) {
    descripcion.addEventListener('input', actualizarContador);
    actualizarContador();
}

/* ==========================================================================
   3. VALIDACIÓN ACCESIBLE DEL FORMULARIO
   ========================================================================== */
function validarCampo(campo, errorElement, mensaje) {
    const valido = campo.checkValidity();
    if (errorElement) {
        errorElement.textContent = valido ? '' : mensaje;
    }
    campo.setAttribute('aria-invalid', String(!valido));
    return valido;
}

function validarFormulario() {
    let esValido = true;
    let primerControlInvalido = null;

    // A. Validar Servicio
    const servicio = document.querySelector('#servicio');
    const errServicio = document.querySelector('#error-servicio');
    if (servicio.disabled || !servicio.value) {
        errServicio.textContent = 'Selecciona un servicio válido de la lista.';
        servicio.setAttribute('aria-invalid', 'true');
        esValido = false;
        if (!primerControlInvalido) primerControlInvalido = servicio;
    } else {
        errServicio.textContent = '';
        servicio.setAttribute('aria-invalid', 'false');
    }

    // B. Validar Correo
    const correo = document.querySelector('#correo');
    const errCorreo = document.querySelector('#error-correo');
    if (!validarCampo(correo, errCorreo, 'Escribe un correo electrónico corporativo válido.')) {
        esValido = false;
        if (!primerControlInvalido) primerControlInvalido = correo;
    }

    // C. Validar Prioridad (Grupo Radio)
    const errPrioridad = document.querySelector('#error-prioridad');
    const prioridadSeleccionada = form.querySelector('input[name="prioridad"]:checked');
    const primerRadio = form.querySelector('input[name="prioridad"]');
    if (!prioridadSeleccionada) {
        errPrioridad.textContent = 'Selecciona un nivel de prioridad.';
        if (primerRadio) primerRadio.setAttribute('aria-invalid', 'true');
        esValido = false;
        if (!primerControlInvalido) primerControlInvalido = primerRadio;
    } else {
        errPrioridad.textContent = '';
        if (primerRadio) primerRadio.setAttribute('aria-invalid', 'false');
    }

    // D. Validar Descripción (Sin rechazar espacios vacíos)
    const errDescripcion = document.querySelector('#error-descripcion');
    const textoUtil = descripcion.value.trim();
    if (textoUtil.length < 10) {
        errDescripcion.textContent = 'Describe el problema con al menos 10 caracteres útiles.';
        descripcion.setAttribute('aria-invalid', 'true');
        esValido = false;
        if (!primerControlInvalido) primerControlInvalido = descripcion;
    } else {
        errDescripcion.textContent = '';
        descripcion.setAttribute('aria-invalid', 'false');
    }

    // Llevar el foco al primer error detectado
    if (primerControlInvalido) {
        primerControlInvalido.focus();
    }

    return esValido;
}

// Limpiar errores al escribir o cambiar
if (form) {
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.setAttribute('aria-invalid', 'false');
        });
        input.addEventListener('change', () => {
            input.setAttribute('aria-invalid', 'false');
        });
    });
}

/* ==========================================================================
   4. RETO INDIVIDUAL: SOLICITUDES EN MEMORIA Y CONTROL DE ENVÍO
   ========================================================================== */
const solicitudes = [];
const filasTabla = document.querySelector('#filas-solicitudes');
const estado = document.querySelector('#estado');
const enviar = document.querySelector('#enviar');
let procesando = false;

function crearSolicitud(datos) {
    const nueva = {
        id: solicitudes.length + 1,
        servicio_id: Number(datos.get('servicio')),
        correo: String(datos.get('correo')).trim(),
        prioridad: String(datos.get('prioridad')),
        descripcion: String(datos.get('descripcion')).trim(),
        estado: 'Pendiente',
        fecha: new Date().toISOString()
    };
    solicitudes.push(nueva);
    renderizarSolicitudes();
    return nueva;
}

function renderizarSolicitudes() {
    if (!filasTabla) return;

    const filas = solicitudes.map(s => {
        const tr = document.createElement('tr');

        const tdCodigo = document.createElement('td');
        tdCodigo.textContent = `SOL-${String(s.id).padStart(4, '0')}`;

        const tdServicio = document.createElement('td');
        // Buscar el nombre del servicio desde la fuente única JSON
        const objServicio = listaServiciosGlobal.find(item => item.id === s.servicio_id);
        tdServicio.textContent = objServicio ? objServicio.nombre : `Servicio #${s.servicio_id}`;

        const tdPrioridad = document.createElement('td');
        tdPrioridad.textContent = s.prioridad.toUpperCase();

        const tdEstado = document.createElement('td');
        tdEstado.textContent = s.estado;

        tr.append(tdCodigo, tdServicio, tdPrioridad, tdEstado);
        return tr;
    });

    filasTabla.replaceChildren(...filas);
}

// Escuchador Único del Evento Submit (Bloquea envíos duplicados)
if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (procesando) return; // Evita reenvío durante procesamiento

        estado.classList.remove('mensaje-ok');

        if (!validarFormulario()) {
            estado.textContent = 'Hay campos por corregir en el formulario.';
            return;
        }

        const datos = new FormData(form);
        procesando = true;
        enviar.disabled = true;
        estado.textContent = 'Procesando solicitud de práctica...';

        try {
            // Simulación de latencia de red (600ms)
            await new Promise(resolve => setTimeout(resolve, 600));

            const nueva = crearSolicitud(datos);
            const codigo = `SOL-${String(nueva.id).padStart(4, '0')}`;

            estado.textContent = `Simulación registrada: ${codigo}. Se conserva solo hasta recargar esta página.`;
            estado.classList.add('mensaje-ok');

            form.reset();
            actualizarContador();

            // Limpiar estados aria-invalid tras el reset
            form.querySelectorAll('[aria-invalid]').forEach(el => el.setAttribute('aria-invalid', 'false'));
        } catch (error) {
            estado.textContent = 'No se completó la simulación. Intenta de nuevo.';
            console.error('Error al procesar solicitud:', error);
        } finally {
            procesando = false;
            enviar.disabled = false;
        }
    });

    // Activar gestión manual de validación accesible
    form.noValidate = true;
}