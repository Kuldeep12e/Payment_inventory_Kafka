class PaymentEvent{
    constructor(orderId , status , amount , itemId){
        this.order = orderId;
        this.status = status;
        this.amount= amount;
        this.itemId = amount;
    }
}