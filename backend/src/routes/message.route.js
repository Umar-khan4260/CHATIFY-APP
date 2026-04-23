import express from 'express';

const route=express.Router();

route.get('/send', (req, res) => {
    // Handle send messages logic here  
    res.send('Send messages successful');
});

route.get("/receive",(req,res)=>{
    // Handle receive messages logic here
    res.send('Receive messages successful'); 
})
export default route;   