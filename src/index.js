const express = require('express');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;

// routers
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port,()=>{
    console.log('Server is up on port ' + port);
});
