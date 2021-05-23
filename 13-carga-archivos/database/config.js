const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
    } catch (error) {
        console.log(error);
    }

    console.log('Base de datos online');

}

module.exports = {
    dbConnection,
}