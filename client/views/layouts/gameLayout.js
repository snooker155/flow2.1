Template.gameLayout.rendered = function(){

    // Add gray color for background in blank layout
    $('body').addClass('gray-bg');

}

Template.gameLayout.destroyed = function(){

    // Remove special color for blank layout
    $('body').removeClass('gray-bg');
};


Template.gameLayout.onCreated(function(){
  // subscribe to the publication responsible for sending the Pushups
  // documents down to the client
  this.subscribe("games");
});