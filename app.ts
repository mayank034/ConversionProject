/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import "reflect-metadata";
 import {createConnection} from "typeorm";    //<--------------
 import {User} from "./db/models/User";       //<--------------
 import {router} from "./routes/index"; //imports ./routes/index module here, in app.js
 import path from "path"; //path module is imported and stored in 'path' variable
 import expressLayouts from "express-ejs-layouts"; //importing express-ejs-layouts.


 dotenv.config();      //loads any environmental variables from the local .env

 /**
 * App Variables
 */

 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

 /**
 *  App Configuration
 */
  app.set('views', path.join(__dirname, 'views'));  //Here, 'views' is the application's views for which we provide the directory path. Here, 'app.set()' sets the property or 
  // application's views to the path 'path.join(__dirname, 'views')' i.e /myapp3/views. Here __dirname is the directory in which the currently executing script resides.
  
  app.set('view engine', 'ejs');  //sets the property 'view engine' to 'ejs'. 'view engine' means whatever extension we assign to files in 'views' folder. Sets files in ./views to ejs files
  
  app.use(expressLayouts);//enables us to use Layouts.
  

 app.use(helmet());
 app.use(cors());
 app.use(express.json());
 app.use('/', router);

 /**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); //${} is an embedded expresion. It means the same as "Listening on port " + PORT; 
  });

  let msg = "| Hi 👋! Welcome to my site! |"; 
console.log(' -----------------------------')
console.log(msg);
console.log('| Port in use: ' + PORT +'          |');
console.log('| URL: http://localhost:' + PORT +' |');
console.log(' -----------------------------')

createConnection().then(async connection => {               //<--------------

  console.log("Inserting a new user into the database..."); //<-------------
  const user = new User();                                  //<-------------
  user.firstName = "Timber";                                //<-------------
  user.lastName = "Saw";                                    //<-------------
  user.age = 25;                                            //<-------------
  await connection.manager.save(user);                      //<-------------
  console.log("Saved a new user with id: " + user.id);      //<-------------

  console.log("Loading users from the database...");         //<-------------
  const users = await connection.manager.find(User);        //<-------------
  console.log("Loaded users: ", users);                     //<-------------

  console.log("Here you can setup and run express/koa/any other framework.");//<-------------

}).catch(error => console.log(error));    //<-------------

