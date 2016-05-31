Template.outer.onCreated(function(){
  // subscribe to the publication responsible for sending the Pushups
  // documents down to the client
  this.subscribe("games");
});