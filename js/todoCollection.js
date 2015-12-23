var TodoItems = Backbone.Collection.extend({
	model: TodoItem,
	comparator:'order',
	localStorage: new Backbone.LocalStorage("todos-backbone"),
	completed: function(){
		var completedItems = this.where({'completed':true});
		return completedItems;
	},
	remaining: function(){
		var remainingItems = this.where({'completed':false});
		return remainingItems;
	},
	nextOrder: function() {
	    if (!this.length) {
	      return 1;
	    }
	    return this.last().get('order') + 1;
	},
});