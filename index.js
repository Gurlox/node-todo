var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require('path');
var mongoose = require('mongoose');

// var todos = [
//    {
//       "id": 1,
//       "content": "Zrobić pranie",
//       "date": "01-01-2017",
//       "done": false
//    },
//    {
//       "id": 2,
//       "content": "Zabić kaczke",
//       "date": "02-01-2017",
//       "done": false
//    },
//    {
//       "id": 3,
//       "content": "Umyc sie",
//       "date": "04-01-2017",
//       "done": false
//    }
// ];

mongoose.connect('mongodb://gurlox:gurlox@ds131139.mlab.com:31139/todo');
mongoose.connection.once('open', function() {
   console.log("Connected to database");
});

var Schema = mongoose.Schema;

var todoSchema = new Schema({
   name: { type: String, default: "my todo" },
   date: { type: Date, default: Date.now() },
   done: { type: Boolean, default: false },
});

var Todo = mongoose.model('Todo', todoSchema);

// var todo = new Todo({
//    name: "testowy5"
// });
// todo.save();

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
   res.sendFile('index.html');
});

app.get('/api/todos', function(req, res){
   //res.status(200).send(todos);
   Todo.find({}, function(err, todos) { //pierwszy argument-pusty obiekt zwroci wszystko
      res.status(200).send(todos);
   });
});

app.get('/api/todos/:id', function(req, res){
   // res.status(200).send(todos.find(function(todo){
   //    return todo.id == req.params.id;
   // }));
   Todo.find({_id: req.params.id}, function(err, todos) {
      res.status(200).send(todos);
   });
});

app.post('/api/todos/', function(req, res){
   // var newTodo = {
   //    done: false,
   //    id: Date.now(),
   //    date: 04-01-2017,
   //    content: req.body.content
   // }
   // var date = Date.now();
   // todos.push(newTodo);
   // res.status(201).send(`/api/todos/${req.body.id}`);
   var todo = new Todo(req.body.name != undefined ? {name: req.body.name} : {});
   todo.save();
   res.status(201).send('api/todos/' + todo.id);
});

app.delete('/api/todos/:id', function(req, res){
   // var objectDeleteIndex = todos.findIndex(function(todo){
   //    return todo.id == req.params.id;
   // });
   //
   // todos.splice(objectDeleteIndex, 1);
   // res.status(200).send();

   Todo.remove({_id: req.params.id }, function(err) {
      if (err) {
         res.status(204).send("Can't remove");
      } else {
         res.status(200).send("Removed");
      }
   });
});

app.listen(3000, function(){
   console.log("Listening on port 3000!");
});
