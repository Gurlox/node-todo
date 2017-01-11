var rest = require("qwest");

var renderTodos = {
   init: function(response){
      this.cacheDom();
      this.render(response);
   },
   cacheDom: function(){
      this.container = document.getElementById("todo-list");
   },
   render: function(response){
      response.forEach(function(todo){
         console.log(this);
         var element = document.createElement("li");
         var content = document.createElement("div");
         var todoData = document.createElement("div");
         var todoDate = document.createElement("div");
         content.class = "todo-list";
         todoData.class = "todo-data";
         todoDate.class = "todo-date";
         content.textContent = todo.content;
         this.container.appendChild(element);
         element.appendChild(content);
         element.appendChild(todoData);
         todoData.appendChild(todoDate);
      }.this(bind));
   }
};

rest.get("/api/todos")
   .then(function(xhr, response){
      renderTodos.init(response);
   });
