# Promesas y Async/Await
Ambos conceptos, promesas y async/await, son fundamentales para cualquier programador JavaScript moderno. El dominio de estas herramientas facilitará la creación de aplicaciones web más complejas y eficientes, al mismo tiempo que mejorará la legibilidad y la mantenibilidad del código.
La solución a este ejercicio esta dividida en el archivo `app.js`.

## Objetivo
Construir un sistema de reservas utilizando **promesas** y **`async/await`**, con manejo de errores adecuado.

### Problema: Sistema de Reservas para un Restaurante
Imagina que tienes un restaurante y deseas permitir a los clientes hacer reservas en línea. Para ello, el sistema debe hacer las siguientes acciones:
Instrucciones: 

1. Verificar Disponibilidad de Mesas: Completa la función `verificarDisponibilidad(mesasSolicitadas)` para comprobar si el número de mesas solicitadas es menor o igual a las mesas disponibles en el restaurante. Si es así, resuelve la promesa; si no, recházala con un mensaje de error.
2. Simular Envío de Confirmación por Correo: Completa la función `enviarConfirmacionReserva(nombreCliente)` para simular el envío de un correo electrónico de confirmación. Utiliza `Math.random()` para decidir si el correo se envía exitosamente o si ocurre un error.
3. Control de Flujo en la Función Principal: En la función `hacerReserva(nombreCliente, mesasSolicitadas)`, usa `await` para esperar a que se resuelva la promesa de disponibilidad de mesas. Si está disponible, procede a llamar a la función de envío de confirmación. Si ocurre un error en cualquiera de las promesas, maneja el error usando un bloque `catch()`.
4. Probar la solución: Llama a `hacerReserva()` con diferentes valores (ej. un número de mesas menor o igual a las disponibles y otro mayor) para verificar que el sistema maneja correctamente las reservas y los errores.

