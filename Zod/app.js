import { z } from 'https://cdn.jsdelivr.net/npm/zod@4.4.3/+esm';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Esquema de Validación con Zod
    const usuarioSchema = z.object({
        nombre: z.string()
            .min(1, { message: "El nombre es obligatorio" })
            .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
        correo: z.string()
            .min(1, { message: "El correo es obligatorio" })
            .email({ message: "Ingrese un correo electrónico válido" }),
        password: z.string()
            .min(1, { message: "La contraseña es obligatoria" })
            .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    });

    // Estado local para acumular los datos
    let datosFormulario = { 
        nombre: '', 
        correo: '', 
        password: '' 
    };

    
    const formulario = document.getElementById('registroEvento');
    const botonEnviar = document.querySelector('.btn');
    const inputs = formulario.querySelectorAll('input');


    
    inputs.forEach(input => {
        input.addEventListener('blur', validarCampo);
    });

    // Manejo del Submit
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const resultado = usuarioSchema.safeParse(datosFormulario);

        if (resultado.success) {
            alert('¡Registro exitoso con Zod! Formulario confirmado.');
            console.log('Datos listos para enviar al backend:', resultado.data);
            
            formulario.reset();
            // Reseteamos el objeto local
            datosFormulario = { 
                nombre: '', 
                correo: '', 
                password: '' 
            };
            
            // Bloqueamos el botón 
            if (botonEnviar) {
                botonEnviar.disabled = true;
                botonEnviar.style.opacity = '0.3';
            } 
        }
    });

    // FUNCIÓN DE VALIDACIÓN 
    function validarCampo(event) {
        const input = event.target;
        const campo = input.name;
        const valor = input.value;
        const contenedor = input.parentElement;

        // Guardamos el valor actual en nuestro objeto de datos
        datosFormulario[campo] = valor;

        // Validamos el estado actual del objeto con Zod
        const resultado = usuarioSchema.safeParse(datosFormulario);

        if (!resultado.success) {
            const errores = resultado.error.format();
            
            // Si el campo actual en el que ocurrió el blur tiene error, lo mostramos
            if (errores[campo] && errores[campo]._errors.length > 0) {
                const mensajeError = errores[campo]._errors[0];
                alerta(mensajeError, contenedor);
            } else {
                limpiarAlertas(contenedor);
            }
        } else {
            // Si todo el objeto es válido para Zod, limpiamos la alerta del campo actual
            limpiarAlertas(contenedor);
        }

        
        if (botonEnviar) {
            if (resultado.success) {
                botonEnviar.disabled = false;
                botonEnviar.style.opacity = '1';   
            } else {
                botonEnviar.disabled = true;
                botonEnviar.style.opacity = '0.3'; 
            }
        }
    }

    // MANEJO DE ALERTAS
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