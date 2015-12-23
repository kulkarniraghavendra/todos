var TodoItemTextBox = Backbone.View.extend({
	el: "#header",
	initialize:function(options){
		this.bus = options.bus;
		this.collection = options.model;
		this.bus.on('markAllItems',this.markAllItemsDone,this);
	},
	events:{
		"keypress": "onPressAddTodoItem",
		"click #toggle-all": "toggleAllTodos"
	},
	render:function(){
		var template = $('#text-box-template').html();
		this.$el.html(_.template(template));
		return this;
	},
	onPressAddTodoItem: function(event){
		if(event.keyCode == 13){
			this.bus.trigger("addTodoItemOnEnterKey",this.$("#newTodoItem").val());
			this.$("#newTodoItem").val("");
		}
	},
	toggleAllTodos: function(){
		this.bus.trigger("toggleAllTodoItems",this.$el.find('#toggle-all').prop('checked'));
	},
	markAllItemsDone: function(){
		var completeItemsCount = this.collection.completed().length;
		this.$el.find('#toggle-all').prop('checked',completeItemsCount != 0 ? completeItemsCount === this.collection.length : false);
	}
});