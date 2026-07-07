# Event Loopp y Asincronicidad
El Event Loop y la asincronicidad son pilares fundamentales de JavaScript. Comprender cómo funcionan te permitirá construir aplicaciones eficientes y reactivas, mejorando la experiencia del usuario. Aunque al principio puede ser un concepto complejo, con práctica y paciencia, dominarás estas herramientas esenciales.
La solución a este ejercicio esta dividida en el archivo `app.js` e `index.html`

## Objetivo

Crear una simulación interactiva que permita simular algunas actividades en una cafetería:
1. Reciba nuevos pedidos de clientes.
2. Procese cada pedido de manera asincrónica con un tiempo de preparación simulado.
3. Actualice el estado de cada pedido ('En Proceso' -> 'Completado') en la interfaz de usuario.


### Problema: Simulador de Pedidos en una Cafetería
En una cafetería moderna, es común que los clientes realicen pedidos que requieren preparación mientras se reciben nuevos pedidos. Una interfaz debe mostrar los pedidos en progreso, permitir que los baristas trabajen en ellos de manera asincrónica y actualizar el estado de los pedidos en tiempo real. El desafío consiste en simular este sistema mediante JavaScript, utilizando el Event Loop y diferentes mecanismos de asincronía como `setTimeout`, Promises y `async/await`.
Instrucciones: 


1. Configura el entorno:
2. Crea un archivo HTML con un botón para agregar pedidos y un contenedor para mostrar los pedidos en la interfaz.
3. Crea un archivo JavaScript donde desarrollarás la lógica principal.
4. Estructura del código - Define funciones que manejen:
5. Recepción de un nuevo pedido.
6. Actualización visual del estado de los pedidos.
7. Simulación de la preparación de pedidos.
8. Comportamiento del sistema cuando el usuario haga clic en 'Agregar Pedido':
9. Se generará un pedido con un identificador único.
10. Se mostrará en la interfaz con el estado 'En Proceso'.
11. Después de un tiempo aleatorio (simulando la preparación), el estado cambiará a 'Completado'.
12. Mecanismos asincrónicos:
13. Usa `setTimeout` para simular el tiempo de preparación de los pedidos.
14. Implementa **Promises** para manejar la finalización de los pedidos.
15. Utiliza `async/await` para actualizar el estado en tiempo real.

