var TodoItemView = Backbone.View.extend({
	tagName: "li",
	className: "todo-item",
	initialize:function(options){
		this.bus = options.bus;
		if(!(options && options.model)){
			throw new Error("please enter valid todo item");
		}
		this.model.on('change',this.render,this);
		this.model.on('destroy',this.remove,this);
	},
	events:{
		"click #toggle": "toggleCompleteCheck",
		"click .destroy": "removeTodoItem",
		"click .edit-pen": "edit",
	},
	render:function(){
		this.$el.toggleClass("completed",this.model.get("completed"));
		//this.$el.attr('id',this.model.cid);
		var todoItemTemp = _.template($('#todo-item-template').html());
		var todoItemData =  this.model.toJSON();
		todoItemData.description = _.escape(todoItemData.description);
		todoItemTemp = todoItemTemp(todoItemData);
		this.$el.html(todoItemTemp);
		this.bus.trigger('markAllItems');
		return this;
	},
	toggleCompleteCheck: function(){
		this.model.toggle();
	},
	removeTodoItem: function(){
		this.model.destroy();
		this.bus.trigger('markAllItems');		
	},
	edit: function(){
		var value = this.$('.edit').val();
	    this.$el.addClass('editing');
	    this.$('.edit').val(value).focus();
	}
});