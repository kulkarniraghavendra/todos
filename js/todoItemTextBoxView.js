var TodoItemTextBox = Backbone.View.extend({
	el: "#header",
	initialize:function(options){
		this.bus = options.bus;
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
		this.bus.trigger("toggleAllTodoItems");
	}
});