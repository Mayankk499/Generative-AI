import express from 'express';
import {} from 'dotenv/config';     
import { generate } from './chatBot.js';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res)=> {
    res.send("Server is On");
});

app.post('/chat', async(req, res) => {
    const {message} = req.body;

    console.log('Message', message);

    const result = await generate(message)

    res.json({message: result})
    
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})