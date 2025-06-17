const consumer = require('./kafkaConsumer');        // Kafka Consumer client
const PaymentEvent = require('./paymentEvent');     // Not used here, probably schema/model (optional)

// Initial stock
const inventory = {
    'item-1': 100,
    'item-2': 150
};

// Function to update inventory based on payment result
const updateInventory = (paymentEvent) => {
    const itemId = paymentEvent.itemId || 'item-1';   // assuming itemId is in event
    const quantityToReduce = paymentEvent.quantity || 1;

    if (paymentEvent.status === 'SUCCESS') {
        if (inventory[itemId] && inventory[itemId] >= quantityToReduce) {
            inventory[itemId] -= quantityToReduce;
            console.log(`Inventory updated for ${itemId}. New stock: ${inventory[itemId]}`);
        } else {
            console.log(`Insufficient stock for ${itemId}.`);
        }
    } else {
        console.log(`Payment failed for ${itemId}. Inventory not updated.`);
    }
};

// Listen for Kafka messages
consumer.on('message', (message) => {
    try {
        const paymentEvent = JSON.parse(message.value);
        updateInventory(paymentEvent);
    } catch (err) {
        console.error("Error parsing Kafka message:", err);
    }
});

// Listen for Kafka errors
consumer.on('error', (err) => {
    console.error('Error with Kafka consumer:', err);
});
