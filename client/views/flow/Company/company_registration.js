Template.company_registration.onCreated(function(){

});



Template.company_registration.helpers({
    // spheres:function(){
    //     return Spheres.find();
    // },

    // segments:function(){
    //     return Segments.find({sphere_name: "IT"});
    // },

    regions:function(){
        var game = Games.findOne({});
        var regions = [];
        for (var region in game.regions){
            regions.push(game.regions[region]);
        }
        return regions;
    },

    // countries:function(){
    //     return Countries.find();
    // },

    create_primary: function(){
        var game = Games.findOne({});
        if(!game.companies[Meteor.user().username]){
            return "primary";
        }else{
            return "default";
        }
    },

    create_disabled: function(){
        var game = Games.findOne({});
        if(game.companies[Meteor.user().username]){
            return "disabled";
        }
    },

    // next_primary: function(){
    //     var game = Games.findOne({});
    //     if(game.companies[Meteor.user().username]){
    //         return "primary";
    //     }else{
    //         return "default";
    //     }
    // },

    // delete_danger: function(){
    //     var game = Games.findOne({});
    //     if(game.companies[Meteor.user().username]){
    //         return "danger";
    //     }else{
    //         return "default";
    //     }
    // },

    // delete_disabled: function(){
    //     var game = Games.findOne({});
    //     if(!game.companies[Meteor.user().username]){
    //         return "disabled";
    //     }
    // },

    // next_disabled: function(){
    //     var game = Games.findOne({});
    //     if(!game.companies[Meteor.user().username]){
    //         return "disabled";
    //     }
    // },
});





Template.company_registration.events({
    // 'change #sphere': function(event, template){
    //     event.preventDefault();
    //     var sphere_name = event.target.value;
    //     var segments = Segments.find({sphere_name: sphere_name}).fetch();
    //     var segment_list = document.getElementById("segment");
    //     segment_list.innerHTML = "";
    //     var default_option = document.createElement("option");
    //     default_option.text = "Select segment";
    //     segment_list.add(default_option);
    //     segments.forEach(function (segment) {
    //         var option = document.createElement("option");
    //         option.text = segment.segment_name;
    //         segment_list.add(option);
    //     });

    //     company_array[0].company_sphere = sphere_name;
    // },

    // 'change #segment': function(){
    //     event.preventDefault();
    //     var company_segment = event.target.value;
    //     company_array[0].company_segment = company_segment;
    // },

    // 'change #region': function(){
    //     event.preventDefault();
    //     var company_region = event.target.value;
    //     company_array[0].company_region = company_region;
    // },

    // 'change #country': function(){
    //     event.preventDefault();
    //     var company_country = event.target.value;
    //     company_array[0].company_country = company_country;
    // },

    // 'change #org_structure': function(){
    //     event.preventDefault();
    //     var company_org_structure = event.target.value;
    //     company_array[0].company_org_structure = company_org_structure;
    // },


    'click #create': function(event, template){
        event.preventDefault();
        var form = template.$("#company_form");
        var company_activities = [];

        var game = Games.findOne({});

        if (form.valid()){

            company_activities.push({
                status: "Complete",
                title: "Company created",
                start_time: game.time_period,
                comments: "Company "+template.$("#company_name").val()+" in region "+template.$("#region").val()+" by "+Meteor.user().username+" successfully created.",
            });


            // game.companies[Meteor.user().username] = {
            //     company_name: template.$("#company_name").val(),
            //     company_region: [template.$("#region").val()],
            //     company_level: 0,
            //     company_exp: 0,
            //     company_balance: 100000,
            //     owner: Meteor.user().username,
            //     company_activities: company_activities,
            //     company_history: [{
            //         company_balance: 100000,
            //         company_users: 0,
            //         company_revenue: 0,
            //         company_costs: 0,
            //         time_period: game.time_period,
            //     }],
            // };

            // game.news.push({
            //     time_period: game.time_period,
            //     type: "user", /////Types: usd, newspaper-o, user, warning
            //     header: "New company created",
            //     text: "Company "+template.$("#company_name").val()+" in region "+template.$("#region").val()+" by "+Meteor.user().username+" successfully created.",
            // });

            // Meteor.call('updateGame', game);


            var company = {
                company_name: template.$("#company_name").val(),
                company_region: [template.$("#region").val()],
                company_level: 0,
                company_exp: 0,
                company_balance: 100000,
                owner: Meteor.user().username,
                company_activities: company_activities,
                company_history: [{
                    company_balance: 100000,
                    company_users: 0,
                    company_revenue: 0,
                    company_costs: 0,
                    time_period: game.time_period,
                }],
                company_team: [],
            };



            Meteor.call('createCompany', company);

        }

        //console.log(game.companies);

    },

});