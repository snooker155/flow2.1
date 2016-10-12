var rooms_methods = {

	

};

Rooms = new Mongo.Collection("rooms", {
	transform: function(doc){

		var newInstance = Object.create(rooms_methods);

		return _.extend(newInstance, doc);
	}
});