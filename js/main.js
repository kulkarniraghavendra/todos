$(document).ready(function(){
  var bus = _.extend({},Backbone.Events);
  var todoItems = new TodoItems();
  var todoItemTextBox = new TodoItemTextBox({bus: bus});
  todoItemTextBox.render();
  var todoItemsView = new TodoItemsView({model: todoItems,bus: bus});
  todoItemsView.render();
});
