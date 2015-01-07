RandomItem = function(){
  var words='cras mattis consectetur purus sit amet fermentum praesent commodo cursus magna vel scelerisque nisl consectetur et nullam quis risus eget urna mollis ornare vel eu leo aenean eu leo quam pellentesque ornare sem lacinia quam venenatis vestibulum'.split(' ');
  var sizes = [100, 125, 150, 175, 200, 225, 250];
  var item = {};
  item.title = _.sample(words) + " " + _.sample(words);
  item.imageUrl = "http://lorempixel.com/"+ _.sample(sizes) + "/" + _.sample(sizes) + "/";
  item.description = _.sample(words) + " " + _.sample(words) + _.sample(words) + " " + _.sample(words);
  item.createdAt=new Date();
  return item;
};

if (Meteor.isClient) {

  Template.example.events({
    'click .js-add-item': function(e){
      e.preventDefault();
      Meteor.call('addItem');
    },
    'click .js-remove-item': function(e){
      e.preventDefault();
      Meteor.call('removeItem');
    },
    'click .js-reset': function(e){
      e.preventDefault();
      Meteor.call('reset');
    }
  });

  Template.example.helpers({
    exampleBlocksCursor: function () {
      return ExampleCollection.find({}, {sort: {createdAt: -1}, limit: 10})
    },
    examplePintrestCursor: function () {
      return ExampleCollection.find({}, {sort: {createdAt: 1}})
    }
  });
}

ExampleCollection = new Mongo.Collection('exampleCollection');

Meteor.methods({
  addItem: function() {
    ExampleCollection.insert(RandomItem());
  },
  removeItem: function() {
    var map=ExampleCollection.find().fetch().map(function(i){return i._id});
    ExampleCollection.remove(_.sample(map));
  },
  reset: function() {
    ExampleCollection.remove({});
    for (var i=0; i<8; i++){
      ExampleCollection.insert(RandomItem());
    }
  }
});

if (Meteor.isServer){
  Meteor.call('reset');
}