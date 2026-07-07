const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

async function processOrder(order) {
    try {
        console.log(`Iniciando preparación del pedido #${order.id}...`);

        // TODO: Simular la preparación usando setTimeout y Promise
        // Creamos una promesa que se resolverá tras un tiempo aleatorio entre 2 y 5 segundos
        await new Promise((resolve) => {
            // Generamos un tiempo aleatorio en milisegundos
            const tiempoPreparacion = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
            
            setTimeout(() => {
                resolve(); 
            }, tiempoPreparacion);
        });

        // TODO: Actualizar el estado del pedido a "Completado"
        // Como el await de arriba ya terminó, pasamos a actualizar la interfaz
        order.status = 'Completado';
        updateOrderStatus(order, 'Completado');
        
        console.log(`Pedido #${order.id} listo para entregar`);

    } catch (error) {
        // Captura de un posible error
        console.error("Hubo un error procesando el pedido:", error);
    }
}