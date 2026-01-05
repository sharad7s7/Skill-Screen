import express from 'express';
import { ENV } from './lib/env.js';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({msg:"Server is running successfully"});
})

const PORT = ENV.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});