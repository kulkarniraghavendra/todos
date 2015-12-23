var TodoItem = Backbone.Model.extend({
	defaults:{
		"completed": false
	},
	validate:function(attrs){
		if(!attrs.description){
			throw new Error("please enter valid description of todo item");
		}
	},
	toggle: function(){
		this.save("completed",!this.get("completed"));
	}
});