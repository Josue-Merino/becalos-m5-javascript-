// 🏠 ESTADO GLOBAL DEL RESTAURANTE 
const restaurante = {
    nombre: "El Rincón Asíncrono",
    mesasDisponibles: 5
};

// 1. Verificar Disponibilidad de Mesas
function verificarDisponibilidad(mesasSolicitadas) {
    return new Promise((resolve, reject) => {
        console.log(`Verificando disponibilidad para ${mesasSolicitadas} mesas...`);
        
        setTimeout(() => {
            // Comprobamos si hay suficientes mesas
            if (mesasSolicitadas <= restaurante.mesasDisponibles) {
                resolve("Mesas disponibles encontradas.");
            } else {
                // Si no hay cupo lanzamos Error 
                reject(new Error(`Lo sentimos, solo nos quedan ${restaurante.mesasDisponibles} mesas disponibles.`));
            }
        }, 1200); // Simulación de retraso
    });
}

// 2. Simular Envío de Confirmación por Correo
function enviarConfirmacionReserva(nombreCliente) {
    return new Promise((resolve, reject) => {
        console.log(`Intentando enviar correo a ${nombreCliente}...`);
        
        setTimeout(() => {
            // Simulación de fallo (30% de probabilidad de fallo)
            const envioExitoso = Math.random() > 0.3; 
            
            if (envioExitoso) {
                resolve(`Correo de confirmación enviado con éxito a ${nombreCliente}.`);
            } else {
                reject(new Error("Error de red: El servidor de correos no respondió."));
            }
        }, 1500); // Simulación de retraso
    });
}

// 3. Control de Flujo con async/await y try/catch
async function hacerReserva(nombreCliente, mesasSolicitadas) {
    try {
        
        console.log(`NUEVA SOLICITUD: ${nombreCliente} solicita ${mesasSolicitadas} mesas.`);

       
        
        await verificarDisponibilidad(mesasSolicitadas);
        console.log("Paso 1 aprobado: Mesas apartadas temporalmente.");

   
        const resultadoEmail = await enviarConfirmacionReserva(nombreCliente);
        console.log(`Paso 2 aprobado: ${resultadoEmail}`);

        
        // Cambiamos el estado real restando las mesas ocupadas
        restaurante.mesasDisponibles -= mesasSolicitadas;
        
        console.log(`\nRESERVA CONFIRMADA EXITOSAMENTE PARA ${nombreCliente.toUpperCase()}`);
        console.log(`Inventario actualizado del restaurante: ${restaurante.mesasDisponibles} mesas libres.`);

    } catch (error) {
        
        console.error(`\nRESERVA RECHAZADA para ${nombreCliente}:`);
        console.error(` Motivo: ${error.message}`);
        
    } finally {
        console.log(`Solicitud de ${nombreCliente} procesada por el sistema.`);
    }
}


// Usamos una función autoejecutable para hacer pruebas
(async () => {
    
    await hacerReserva("Luis Mendoza", 2);

    await hacerReserva("Ana Gómez", 4);

    await hacerReserva("Juan Perez", 3);
})();