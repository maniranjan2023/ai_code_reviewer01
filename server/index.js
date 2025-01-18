import express from 'express';
import cors from 'cors'
import generateCodeReview from './getreview.js';
const app=express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/v1/reviews',async (req,res)=>{
    const code = req.body.code;

    try {
        const review =  await generateCodeReview(code);
        return res.send({
            review
        });
        
    } catch (error) {
        return res.status(500).send({
            message:"something went wrong"
        })
    }
})

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})