# 🛒 Kafka-Based Inventory Update Service

This microservice listens to Kafka messages for **payment events** and updates the product inventory accordingly. It ensures real-time, asynchronous communication between the **Payment Service** and the **Inventory Service** using **Apache Kafka**.

---

## 📦 Features

- Listens to `payment-events` topic via Kafka consumer.
- Updates inventory for items only if payment status is `SUCCESS`.
- Handles edge cases like insufficient stock or failed payments.
- Logs updates for traceability and debugging.

---

