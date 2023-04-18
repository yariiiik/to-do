const express = require('express');
const path = require('path');

const app = express();
const todoRoutes = require('./routes/todos.js');

app.use(todoRoutes);
app.use(express.static(path.join(__dirname,'/')));

const exphbs = require('express-handlebars');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views'); 




const uri = "mongodb+srv://qwerty:NUueB0eOtMg4I0K7@cluster1.ritisqi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

console.log('app.js  __dirname=====> ', __dirname);


let start = async () => {
    try {
        await client.connect();
        app.locals.collection = client.db("momgo").collection("todo_users");
        console.log('connect+');
        // const collection = client.db("momgo").collection("todo_users");
        // collection.insertOne({tg_id: 555, todo: { t_1: 'eat', t_2: 'drink', t_3: 'sleep', t_4: "rest", t_5: "walk" }});
        // let user = await collection.find({'todo.t_1':{$exists:true}}).toArray();
        // collection.updateOne({tg_id:666},[{ $set:{'todo.t_6':'sing'}},{ $set:{lastUpdate: "$$NOW"}}]);
        app.listen(PORT, () => {
            console.log("server started on PORT:" + PORT);
        });
        


        // let user = await collection.findOne({ tg_id: 666 });
        // let dat = new Date(user.lastUpdate);
        // console.log('lastUpdate:=', dat.getFullYear() + "." + dat.getMonth() + 1 + "." + dat.getDate());
        // console.log('\n collection=', user);
    }
    catch (err) {
        console.log('err=', err);
    }
    // finally {
    //     await client.close();
    // }

}
start();

// app.render('index',{title:'My to-do',isIndex:true})
