const kafka = require ('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: 'localhost:9082'});

const producer = new Producer(client);

producer.on('ready' , () =>{
    const PaymentEvent = JSON.stringify({
        orderId:'order-123',
        status:'Success',
        amount: 150.0,
        itemId: 'item-1'
    })
})


const payload = [{topic : 'payments' , message : PaymentEvent}];

producer.send (payload , (err,data) =>{
    if(err){
        console.log("Error in sending " , err);
    }
    else{
        console.log("Msg send succesfully", data)
    }
});

producer.on('error' , (err) =>{
  console.error("error with kafka producer" , err);
})