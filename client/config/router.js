Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});



// Default route
// You can use direct this.render('template')
// We use Router.go method because dashboard1 is our nested view in menu


Router.route('/', {

  action: function () {
    //this.render('gameScreen');
    this.render('outer');
    this.layout('gameLayout');
  },

});


Router.route('/world', function () {
  this.render('world_info');
  this.layout('gameLayout');
});

Router.route('/segment', function () {
  this.render('segment_info');
  this.layout('gameLayout');
});


Router.route('/customers', function () {
  this.render('customers_info');
  this.layout('gameLayout');
});




//
// Other pages routes
//
Router.route('/notFound', function () {
    this.render('notFound');
});




