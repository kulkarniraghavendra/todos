var TodoItemView = Backbone.View.extend({
	tagName: "li",
	className: "todo-item",
	initialize:function(options){
		if(!(options && options.model)){
			throw new Error("please enter valid todo item");
		}
		this.model.on('change',this.render,this);
	},
	events:{
		"click #toggle": "toggleCompleteCheck",
		"click .destroy": "removeTodoItem"
	},
	render:function(){
		this.$el.toggleClass("completed",this.model.get("completed"));
		this.$el.attr('id',this.model.cid);
		var todoItemTemp = _.template($('#todo-item-template').html());
		var todoItemData =  this.model.toJSON();
		todoItemData.description = _.escape(todoItemData.description);
		todoItemTemp = todoItemTemp(todoItemData);
		this.$el.html(todoItemTemp);
		return this;
	},
	toggleCompleteCheck: function(){
		this.model.toggle();
	},
	removeTodoItem: function(){
		this.model.destroy();
	}
});