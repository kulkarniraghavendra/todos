var TodoItemsView = Backbone.View.extend({
	el: "#todoItems",
	initialize:function(options){
		this.bus = options.bus;
		if(!(options && options.model)){
			throw new Error("Invalid collection");
		}
		this.model.on('add',this.addItemToCollection,this);
		this.model.on('remove',this.removeItemFromCollection,this);
		this.bus.on("addTodoItemOnEnterKey",this.addTodoItem,this);
		this.bus.on("toggleAllTodoItems",this.toggleItems,this);
	},
	render:function(){
		return this;
	},
	addTodoItem: function(value){
		if(!!$.trim(value)){
			var newTodoItemModel =  new TodoItem({
				"description":value
			});
			this.model.add(newTodoItemModel);
		}else{
			$("#errorMsg").html("Error: Please enter valid todo task!!!").css('display','block');
			setTimeout(function(){
				$("#errorMsg").html("").hide();
			},3000);
		}
	},
	addItemToCollection: function(todoitem){
		var newTodoItemView = new TodoItemView({model:todoitem});
		this.$el.append(newTodoItemView.render().$el);
	},
	removeItemFromCollection: function(todoitem){
		this.$el.find('#'+todoitem.cid).remove();
	},
	toggleItems:function(){
		this.model.each(function(todoitem){
			todoitem.toggle();
		})
	}
});