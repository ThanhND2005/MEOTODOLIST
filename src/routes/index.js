const userAPI = require('./userAPI');
const taskAPI = require('./taskAPI');

const route = (app)=>{
    app.use('/',userAPI);
    app.use('/task',taskAPI);
}

module.exports = route;