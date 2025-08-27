import express, { json } from 'express';
import cors from 'cors'
import {} from 'dotenv/config';     
import { generate } from './chatBot.js';


const app = express();
const PORT = process.env.PORT;
app.use(cors());
// app.use(express.json());

app.use(express.json());

app.get('/', (req, res)=> {
    res.send("Welcome to BuddyBot");
});

app.post('/chat', async(req, res) => {
    const {message, threadId} = req.body;

    if(!message || !threadId){
        return res.status(400).json({message: 'All fields are required'});
    }

    console.log('Message', message);

    const result = await generate(message, threadId)

    res.json({message: result})
    
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})