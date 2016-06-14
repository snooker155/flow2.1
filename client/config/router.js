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
    if(Meteor.userId()){
      this.render('outer');
      this.layout('gameLayout');
    }else{
      Router.go('/login');
    }
  },

});


Router.route('/company', function () {
  if(Meteor.userId()){
    //if(Companies.findOne({owner: Meteor.userId()})){
      this.render('company_menu');
      this.layout('gameLayout');
    // }else{
    //   Router.go('/company_creation');
    // }
  }else{
    Router.go('/login');
  }
});


Router.route('/world', function () {
  if(Meteor.userId()){
    this.render('outer2');
    this.layout('gameLayout');
  }else{
    Router.go('/login');
  }
});

Router.route('/segment', function () {
  if(Meteor.userId()){
    this.render('segment_outer');
    this.layout('gameLayout');
  }else{
    Router.go('/login');
  }
});

Router.route('/news', function () {
  if(Meteor.userId()){
    this.render('news_info');
    this.layout('gameLayout');
  }else{
    Router.go('/login');
  }
});


Router.route('/customers', function () {
  if(Meteor.userId()){
    this.render('outer3');
    this.layout('gameLayout');
  }else{
    Router.go('/login');
  }
});



//////////////  TEST ENV Routers  ///////////////////

Router.route('/admin', function(){
  if(Meteor.userId()){
    this.render('admin');
  }else{
    Router.go('/login');
  }
});


Router.route('/login', function(){
   this.render('login');
   this.layout('blankLayout');
});


Router.route('/register', function(){
   this.render('register');
   this.layout('blankLayout');
});



//
// Other pages routes
//
Router.route('/notFound', function () {
    this.render('notFound');
});




