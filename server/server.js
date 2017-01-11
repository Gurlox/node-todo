var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var todos = [
   {
      "id": 1,
      "content": "Zrobić pranie",
      "date": "01-01-2017",
      "done": false
   },
   {
      "id": 2,
      "content": "Zabić kaczke",
      "date": "02-01-2017",
      "done": false
   },
   {
      "id": 3,
      "content": "Umyc sie",
      "date": "04-01-2017",
      "done": false
   }
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/todos', function(req, res){
   res.status(200).send(todos);
});

app.get('/api/todos/:id', function(req, res){
   res.status(200).send(todos.find(function(todo){
      return todo.id == req.params.id;
   }));
});

app.post('/api/todos/', function(req, res){
   var newTodo = {
      done: false,
      id: Date.now(),
      date: 04-01-2017,
      content: req.body.content
   }
   var date = Date.now();
   todos.push(newTodo);
   res.status(201).send(`/api/todos/${req.body.id}`);
});

app.delete('/api/todos/:id', function(req, res){
   var objectDeleteIndex = todos.findIndex(function(todo){
      return todo.id == req.params.id;
   });

   todos.splice(objectDeleteIndex, 1);
   res.status(200).send();
});

app.listen(3000, function(){
   console.log("Listening on port 3000!");
});
