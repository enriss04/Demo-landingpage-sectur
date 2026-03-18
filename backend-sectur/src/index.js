const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/task.routes');
const path = require('path');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(taskRoutes)

app.use('/getImagenArticulo', express.static(path.join(__dirname + '/images/img_Articles')));

app.use('/getImagenInformacionArticulo', express.static(path.join(__dirname + '/images/imgs_ArticleInformation')));

app.use('/getImagenHotel', express.static(path.join(__dirname + '/images/img_Hotels')));

app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    })
})

app.listen(4005);

console.log("sevidor")