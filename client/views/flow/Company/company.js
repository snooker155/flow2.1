

Template.company_menu.helpers({
    has_team(){
        var game = Games.findOne({});
        var company;
        game.companies.forEach(function (company) {
            if(company.owner == Meteor.user().username){
                company = company;
            }
        });
        return company;
    },

    has_product(){
        var game = Games.findOne({});
        var company;
        game.companies.forEach(function (company) {
            if(company.owner == Meteor.user().username){
                company = company;
            }
        });
        return company;
    },
});