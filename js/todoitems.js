var TodoItems = Backbone.Collection.extend({
	model: "TodoItem",
	completed: function(){
		debugger;
		var completedItems = this.where({'completed':true});
		return (completedItems.length == this.length);
	},
	remaining: function(){
		var remainingItems = this.where({'completed':false});
		debugger;
		return (remainingItems.length > 0);
	}
});