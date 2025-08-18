const express = require('express');
const cors = require('cors');
const authRouter = require('./Routes/auth.js');
const noteRouter = require('./Routes/Note.js')

const connectToMongoDB = require('./db'); 


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter )

app.listen(3000, () => {
    connectToMongoDB();
    console.log("Server is running");
});
