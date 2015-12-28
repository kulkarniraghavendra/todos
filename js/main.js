$(function(){
	var bus = _.extend({},Backbone.Events);
	var todoItems = new TodoItems;
	var todoItemTextBox = new TodoItemTextBox({model: todoItems,bus: bus});
	todoItemTextBox.render();
	var todoItemsView = new TodoItemsView({model: todoItems,bus: bus});
	todoItemsView.render();
	var todoStatsView = new TodoStatsView({model: todoItems,bus: bus});
	$('#todoapp').append(todoStatsView.render().$el);
	var router = new AppRouter({view: $('body')});
	Backbone.history.start();
});
