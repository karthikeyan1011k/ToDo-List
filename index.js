// set the express and path
const express = require('express');
const { rmSync } = require('fs');
const path = require('path');
const port = 8080;
// Require the Mongoose and Schema.
const db = require('./config/mongoose');
const TodoList = require('./models/todoList');

// use express and view engine.
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
// use the encode for input data 
app.use(express.urlencoded());
// access the css and scripts file.
app.use(express.static('assets'));

// test the and the check the server.
app.get('/', function(req, res){
     
     TodoList.find({})
     .then(function(list){
        res.render('index', {
            title: "MY TO-DO LIST",
            todo_list: list
          });
     }) 
     .catch(function(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
        });
    });

    // Creating TO-DO list
    app.post('/create-todoList', async (req, res) => {
        try {
          const newTodo = await TodoList.create({
            todoList: req.body.todoList,
            date: new Date(req.body.date).toLocaleDateString(),
            Category: req.body.Category
          });
          return res.redirect('/');
        } catch (err) {
          console.log(err);
          return res.redirect('/');
        }
      });
     
  // Delete the TO-DO items
  app.get('/delete-todo/' , async (req , res) => {
    try {
      let id = req.query.id;
      await TodoList.findOneAndDelete(id);
       return res.redirect('/');
      } catch (err) {
        console.log(err);
        return res.redirect('/');
        }
  });

// listen the express app server part. 
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})