var TodoStatsView = Backbone.View.extend({
	tagName: 'footer',
	id: 'footer',
	initialize:function(options){
		this.bus = options.bus;
		this.collection = options.model;
		this.collection.on('all',this.render,this);
	},
	events:{
		'click #clear-completed': 'clearAllItems'
	},
	render:function(){
		var template = $('#stats-template').html();
		template = _.template(template);
		template = template({'remaining':this.collection.remaining().length,'completed':this.collection.completed().length})
		this.$el.html(template);
		return this;
	},
	clearAllItems: function(){
		_.invoke(this.collection.completed(), 'destroy');
		this.bus.trigger('markAllItems');
    	this.render();
	}
});