Template.topGameNavbar.rendered = function(){
    //console.log(Meteor.user());

    // FIXED TOP NAVBAR OPTION
    // Uncomment this if you want to have fixed top navbar
    // $('body').addClass('fixed-nav');
    // $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');

};

Template.topGameNavbar.events({

    // Toggle left navigation
    'click #navbar-minimalize': function(event){

        event.preventDefault();

        // Toggle special class
        $("body").toggleClass("mini-navbar");

        // Enable smoothly hide/show menu
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 100);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(500);
                }, 300);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    },

    // Toggle right sidebar
    'click .right-sidebar-toggle': function(){
        $('#right-sidebar').toggleClass('sidebar-open');
    },

    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout(
            function(){
                Router.go('login');
            });
    },

    'click #leave': function(event){
        event.preventDefault();
        if(!Rooms.findOne({_id: Session.get("room")})){
            Session.set("room", null);
            Session.set("game", null);
            Router.go("/");
        }else{
            Router.go("/room");
        }
    },
});
