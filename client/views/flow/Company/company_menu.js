

Template.company_menu.helpers({
    
    has_company(){
        return Companies.findOne({owner: Meteor.user().username});
    },

    has_team(){
        return Companies.findOne({owner: Meteor.user().username}).company_team;
    },

    has_product(){
        return Companies.findOne({owner: Meteor.user().username}).company_product_name;
    },
    
});