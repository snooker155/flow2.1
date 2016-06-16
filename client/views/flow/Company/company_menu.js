

Template.company_menu.helpers({
    
    has_company(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username];
    },

    has_team(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].company_team;
    },

    has_product(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].company_product_name;
    },
    
});