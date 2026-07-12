document.addEventListener('DOMContentLoaded', () => {

    // 1. Nuestro objeto de evento
    const evento = {
        nombre: '',
        correo: '',
        telefono: '',
        intereses: [], // Guardará un array de strings
        horario: '',   // Guardará un solo string
        fecha: '',
        hora: ''
    }

    // Variables - Referencias del DOM
    const formulario = document.getElementById('registroEvento'); 
    const botonEnviar = document.querySelector('button[type="submit"]'); 
    
    const correo = document.getElementById('correo');
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const intereses = document.querySelectorAll('input[name="intereses"]');
    const horario = document.querySelectorAll('input[name="horario"]');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');


    // Event Listeners para Inputs de Texto / Fecha
    nombre.addEventListener('blur', validar);
    correo.addEventListener('blur', validar);
    telefono.addEventListener('blur', validar);
    fecha.addEventListener('blur', validar);
    hora.addEventListener('blur', validar);

    // Event Listeners para Checkboxes y Radios 
    intereses.forEach(checkbox => {
        checkbox.addEventListener('change', manejarIntereses);
    });

    horario.forEach(radio => {
        radio.addEventListener('change', manejarHorario);
    });

    // Event Listener para el Envío del Formulario
    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault(); 
            alert('¡Registro exitoso! Evento confirmado.');
            console.log('Datos enviados con éxito:', evento);
        });
    }


    function manejarIntereses(event) {
        const valor = event.target.value;
        
        if (event.target.checked) {
            // Si lo marca y no está en el array, lo agregamos
            if (!evento.intereses.includes(valor)) {
                evento.intereses.push(valor);
            }
        } else {
            // Si lo desmarca, filtramos el array para quitarlo
            evento.intereses = evento.intereses.filter(interes => interes !== valor);
        }
        
        comprobarObjeto();
    }

    function manejarHorario(event) {
        // Al ser radio button, solo guardamos el que se acaba de marcar
        evento.horario = event.target.value;
        comprobarObjeto();
    }

    // FUNCIÓN DE VALIDACIÓN 

    function validar(event) {
        const entradaInput = event.target.value;
        const contenedor = event.target.parentElement;
        const campo = event.target.name;

        // Validación global de campo vacío
        if (entradaInput === '') {
            alerta(`El campo "${event.target.previousElementSibling.innerText}" está vacío`, contenedor);

            // Si se vacía el campo, limpiamos su valor en el objeto global
            evento[campo] = '';
            comprobarObjeto();
            return;
        }

        // Diccionario de Validación
        const validadores = {
            correo: () => validarEmail(entradaInput, contenedor),
            telefono: () => validarTelefono(entradaInput, contenedor),
            fecha: () => validarFecha(entradaInput, contenedor),
            hora: () => validarHora(entradaInput, contenedor),
        };

        if (validadores[campo]) {
            // Si la validación pasa con éxito, guardamos el dato en el objeto
            const esValido = validadores[campo]();
            if (esValido) {
                evento[campo] = entradaInput;
            } else {
                evento[campo] = ''; // Si falla la validación, borramos el dato anterior
            }
        } else {
            
            limpiarAlertas(contenedor);
            evento[campo] = entradaInput;
        }

        comprobarObjeto();
    }

    //REVISIÓN DEL DEL BOTÓN 

    function comprobarObjeto() {
        // Comprobamos que las propiedades no estén vacías, que intereses tenga elementos, y que horario tenga una selección.
        const todoLleno = 
            evento.nombre !== '' &&
            evento.correo !== '' &&
            evento.telefono !== '' &&
            evento.fecha !== '' &&
            evento.hora !== '' &&
            evento.intereses.length > 0 &&
            evento.horario !== '';

        if (botonEnviar) {
            if (todoLleno) {
                botonEnviar.disabled = false;
                botonEnviar.style.opacity = 1; 
            } else {
                botonEnviar.disabled = true;
                botonEnviar.style.opacity = .3
            }
        }
    }

    // VALIDACIONES DE FORMATO

    function validarEmail(email, contenedor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const esEmail = regex.test(email);

        if (!esEmail) {
            alerta('Ingrese un correo electrónico válido', contenedor);
            return false;
        } else {
            limpiarAlertas(contenedor);
            return true;
        }
    }

    function validarTelefono(telefono, contenedor) {
        const regexTelefono = /^[0-9]{10}$/;
        const esTelefonoValido = regexTelefono.test(telefono);

        if (!esTelefonoValido) {
            alerta('Ingrese un número de teléfono válido (10 dígitos)', contenedor);
            return false;
        } else {
            limpiarAlertas(contenedor);
            return true;
        }
    }

    function validarFecha(fechaUsuario, contenedor) {
        const fechaElegida = new Date(fechaUsuario + 'T00:00:00');
        const fechaActual = new Date();
        
        fechaActual.setHours(0, 0, 0, 0);
        fechaElegida.setHours(0, 0, 0, 0);

        if (fechaElegida.getTime() < fechaActual.getTime()) {
            alerta('La fecha seleccionada no puede ser anterior al día de hoy', contenedor);
            return false;
        } else {
            limpiarAlertas(contenedor);
            
            const horaInput = document.getElementById('hora');
            if (horaInput && horaInput.value !== '') {
                validarHora(horaInput.value, horaInput.parentElement);
            }
            return true;
        }
    }

    function validarHora(horaUsuario, contenedor) {
        const fechaSeleccionada = document.getElementById('fecha').value;
        if (!fechaSeleccionada) return false;

        const ahora = new Date();
        const fechaElegida = new Date(fechaSeleccionada + 'T00:00:00');
        
        ahora.setHours(0, 0, 0, 0);
        fechaElegida.setHours(0, 0, 0, 0);

        if (fechaElegida.getTime() === ahora.getTime()) {
            const tiempoActual = new Date(); 
            const [horasUsuario, minutosUsuario] = horaUsuario.split(':').map(Number);
            
            const horaElegidaData = new Date();
            horaElegidaData.setHours(horasUsuario, minutosUsuario, 0, 0);

            if (horaElegidaData.getTime() < tiempoActual.getTime()) {
                alerta('La hora seleccionada ya ha pasado', contenedor);
                return false;
            }
        }

        limpiarAlertas(contenedor);
        return true;
    }

    // INTERFAZ 

    function alerta(mensaje, contenedor) {
        limpiarAlertas(contenedor);
        const alerta = document.createElement('P');
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');
        contenedor.appendChild(alerta);
    }

    function limpiarAlertas(contenedor) {
        const existeAlerta = contenedor.querySelector('.alerta');
        if (existeAlerta) {
            existeAlerta.remove();
        }
    }
});