var AppRouter = Backbone.Router.extend({
	initialize: function(options){
		this.view = options.view;
	},
	routes: {
		"active": "displayActive",
		"completed": "displayCompleted",
		"*other": "displayAll"
	},
	displayActive: function(){
		this.view.find('li.todo-item').removeClass('hidden');
		this.view.find('li.completed').addClass('hidden');
		this.view.find('#filters li a').removeClass('selected');
		this.view.find('#filters li.active a').addClass('selected');
	},
	displayCompleted: function(){
		this.view.find('li.todo-item').addClass('hidden');
		this.view.find('li.completed').removeClass('hidden');
		this.view.find('#filters li a').removeClass('selected');
		this.view.find('#filters li.complete a').addClass('selected');
	},
	displayAll: function(){
		this.view.find('li.todo-item').removeClass('hidden');
		this.view.find('#filters li a').removeClass('selected');
		this.view.find('#filters li.all a').addClass('selected');	
	}
});