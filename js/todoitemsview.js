var TodoItemsView = Backbone.View.extend({
	el: "#todoItems",
	initialize:function(options){
		this.bus = options.bus;
		if(!(options && options.model)){
			throw new Error("Invalid collection");
		}
		this.collection = options.model;
		this.collection.on('add',this.addItemToCollection,this);
		this.collection.on('reset',this.addAll,this);
		//this.model.on('remove',this.removeItemFromCollection,this);
		this.bus.on("addTodoItemOnEnterKey",this.addTodoItem,this);
		this.bus.on("toggleAllTodoItems",this.toggleItems,this);
	},
	render:function(){
		try{
			this.collection.fetch();
		} catch(err){
			console.log("ended in "+err);
		}
		return this;
	},
	addTodoItem: function(value){
		if(!!$.trim(value)){
			var newTodoItemModel =  new TodoItem({
				"description":value,
				"order": this.collection.nextOrder()
			});
			this.model.create(newTodoItemModel);
		}else{
			$("#errorMsg").html("Error: Please enter valid todo task!!!").css('display','block');
			setTimeout(function(){
				$("#errorMsg").html("").hide();
			},3000);
		}
	},
	addItemToCollection: function(todoitem){
		var newTodoItemView = new TodoItemView({model:todoitem,bus:this.bus});
		this.$el.append(newTodoItemView.render().$el);
	},
	addAll: function() {
	    this.$('#todoItems').html('');
	    this.collection.each(this.addItemToCollection, this);
  	},
	/*removeItemFromCollection: function(todoitem){
		this.$el.find('#'+todoitem.cid).remove();
	},*/
	toggleItems:function(completed){
		this.collection.each(function(todoitem){
			/*var isCompleted = todoitem.get('completed');
			if(eventTarget[0].prop('checked')){
				if(!isCompleted){
					todoitem.toggle();
				}
			}else{
				if(isCompleted){
					todoitem.toggle();
				}
			}*/
			todoitem.save({completed});
		});
	}
});