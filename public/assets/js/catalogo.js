// public/assets/js/catalogo.js

const catalogo = document.querySelector('#catalogo');
const selector = document.querySelector('#servicio');
const aviso = document.querySelector('#estado-catalogo');

// Exportamos la lista en memoria para relacionar servicio_id en la tabla
export let listaServiciosGlobal = [];

/**
 * Crea una tarjeta usando DOM Seguro (evita vulnerabilidades XSS)
 */
function crearTarjeta(s) {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('service-card');
    tarjeta.setAttribute('tabindex', '0'); // Accesibilidad de foco

    const titulo = document.createElement('h3');
    const texto = document.createElement('p');
    const etiqueta = document.createElement('span');

    // DOM Seguro: Usar textContent evita ejecución de código malicioso
    titulo.textContent = s.nombre;
    texto.textContent = s.descripcion;
    etiqueta.textContent = `${s.categoria} • ${s.prioridad.toUpperCase()}`;
    etiqueta.classList.add('badge', `badge-${s.prioridad}`);

    tarjeta.append(titulo, texto, etiqueta);
    return tarjeta;
}

/**
 * Valida el contrato de datos del JSON
 */
function validarContrato(lista) {
    if (!Array.isArray(lista) || !lista.length) return false;
    const ids = new Set();
    const prioridadesValidas = ['alta', 'media', 'baja'];

    for (const item of lista) {
        if (!item.id || !item.nombre || !item.descripcion || !item.categoria || !item.prioridad) {
            return false;
        }
        if (ids.has(item.id)) return false; // ID duplicado
        ids.add(item.id);

        if (!prioridadesValidas.includes(item.prioridad.toLowerCase())) {
            return false;
        }
    }
    return true;
}

/**
 * Carga asíncrona de la fuente de datos
 */
async function cargarServicios() {
    aviso.textContent = 'Cargando servicios...';
    selector.disabled = true;

    try {
        const respuesta = await fetch('data/servicios.json');
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const lista = await respuesta.json();

        if (!validarContrato(lista)) {
            throw new Error('El contrato de datos del JSON es inválido o contiene IDs/prioridades incorrectos.');
        }

        listaServiciosGlobal = lista; // Guardar referencia global

        // Renderizar tarjetas con DOM seguro
        catalogo.replaceChildren(...lista.map(crearTarjeta));

        // Actualizar el selector del formulario con la misma fuente única
        selector.replaceChildren(new Option('Selecciona un servicio', ''));
        lista.forEach(s => selector.add(new Option(s.nombre, String(s.id))));

        selector.disabled = false;
        aviso.textContent = `${lista.length} servicios disponibles.`;
    } catch (error) {
        catalogo.replaceChildren();
        selector.replaceChildren(new Option('Servicios no disponibles', ''));
        aviso.textContent = 'No pudimos cargar los servicios. Recarga para reintentar.';
        console.error('Error al cargar el catálogo:', error);
    }
}

// Ejecución al inicializar el módulo
cargarServicios();