var Person = Backbone.Model.extend({
	defaults:{
		firstname: '',
		lastname:''
	},
	initialize:function(){
		this.on('invalid',function(model, error){
			console.log(error);		
		});
	},
	validate: function(attrs){
		if(!attrs.firstname){
			return 'First name is required.';
		}
	}
});


var firstPerson = new Person({
	firstname: 'Craig',
	lastname: 'McKeachie',
	id: 1		
});

console.log(firstPerson);
console.log(JSON.stringify(firstPerson)); //does the converting to object literal internally
console.log(firstPerson.toJSON());
console.log(JSON.stringify(firstPerson.toJSON()));



firstPerson.set("firstname",'',{validate:true});

var People = Backbone.Collection.extend({
		model: Person
});



var people = new People([firstPerson]);
console.log("Number of people is:" + people.length );

var secondPerson = new Person({
	firstname:'Emily',
	lastname:'McKeachie',
	id: 2
}
);
people.on('add',function(person){
	console.log("I am being notified second person was added: " + JSON.stringify(person.toJSON()));
});
people.add(secondPerson);

console.log(JSON.stringify(people.toJSON()));
console.log('Number of people now:' + people.length);

var me = people.get(1);
console.log("I found me: " + JSON.stringify(me.toJSON()));

//find by client id
var personCId = people.get(me.cid);
console.log(personCId===me);

people.on('change:lastname', function(person){
	console.log("Changed my last name to ",person.get('lastname'));
});

var emily = people.get(2);
emily.set("lastname","Roedersheimer McKeachie");

var PersonView = Backbone.View.extend({
	tagName: 'li',	
	personTemplate: _.template( $('#person-template').html() ),
	initialize:function(){
		this.$el = $("#people");
	},
	render: function(){
		this.$el.html( this.personTemplate( this.model.toJSON() ) );
		return this;
	},
});

var personView = new PersonView({model:emily});

console.log(personView.$el);
//personView.render();

//people.remove(firstPerson);
//console.log('Number of people now:' + people.length);

