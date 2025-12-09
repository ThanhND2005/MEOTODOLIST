require('dotenv').config();
const express = require('express');
const app = express();
const route = require('./routes/index');
const configDatabase = require('./config/database');
const configViewEngine = require('./config/viewEngine');
const configSession = require('./config/session');
const port = process.env.PORT;
const methodOverride = require('method-override');
const flash = require('connect-flash');
configViewEngine(app);
configSession(app);
app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(methodOverride('_method'));
app.use((req, res, next) => {
  if (req.method === 'POST' && req.body && req.body._method) {
      req.method = req.body._method.toUpperCase(); 
      delete req.body._method; 
  }
  next();
});

route(app);

(async() =>{
    try {
        await configDatabase();
        app.listen(port,()=> console.log(`app listening at http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
})()