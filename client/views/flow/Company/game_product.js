

var features_array = [];
var features_arrayDep = new Tracker.Dependency();

var n_features_old = new ReactiveVar(0);

// var feature_description_name = new ReactiveVar("Choose");

// var feature_description = new ReactiveVar("");

//var test_createdAt = new Date();
//var test_progress = new ReactiveVar(0);



Template.game_product.onRendered(function(){

});


Template.game_product.onCreated(function(){

});




Template.game_product.helpers({

    has_products(){
        var game = Games.findOne({});
        var has_product = false;
        game.products.forEach(function(product) {
            if(product.product_creator == game.companies[Meteor.user().username].company_name){
                has_product = true;
            }
        });
        return has_product;
    },

    products(){
        var game = Games.findOne({});
        var company_products = [];
        game.products.forEach(function(product) {
            if(product.product_creator == game.companies[Meteor.user().username].company_name){
                company_products.push(product);
            }
        });
        return company_products;
    },

    features_lists: function(){
        var features = Features.find({});
        return features;
    },


    product_production_progress(){
        var game = Games.findOne({});
        var self = this;
        var total_time_to_achieve = 0;
        var total_start_period = 0;
        self.prop.forEach(function (property) {
            total_time_to_achieve += property.time_to_achieve;
            if(total_start_period < property.start_period){
                total_start_period = property.start_period;
            }
        });
        // console.log(total_time_to_achieve);
        // console.log(total_start_period);
        // console.log(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100));
        if(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100) >= 100){
            return 100;
        }else{
            return Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100); 
        }
    },


    prop_costs: function(){
        return this.prop_price * this.prop_level;
    },

    new_level: function(){
        if(this.progress == 100){
            return true;
        }else{
            return false;
        }
    },



    // is_published: function(){
    //     return this.is_published;
    // },

    // new_features_lists: function(){
    //     var game = Games.findOne({});
    //     var company = game.comapnies[Meteor.user().username];
    //     var product = false;
    //     game.products.forEach(function(product) {
    //         console.log(product.product_creator == game.companies[Meteor.user().username].company_name);
    //         if(product.product_creator == game.companies[Meteor.user().username].company_name){
    //             product = product;
    //         }
    //     });
    //     if (Features.find({neccessary_level: { $lte: company.company_level }}).count() - Feature_lists.find({owner: Meteor.userId()}).count() > 0 ){
    //          var n = Features.find({neccessary_level: { $lte: company.company_level }}).count() - Feature_lists.find({owner: Meteor.userId()}).count();
    //     }else{
    //         var n = 0;
    //     }
    //     if(n_features_old.get() != n){
    //         features_array = [];
    //         var feature_price = 0;
    //         var feature_level = 1;
    //         var max_feature_level = 10;
    //         var time_to_achieve = 0;
    //         var progress = 0;
    //         var neccessary_employees_number = 0;
    //         var available_employees_number = 0;
    //         for (i=0; i<n; i++){
    //             features_array.push({
    //                 id: i,
    //                 value: i+1,
    //                 company_name: company.company_name,
    //                 product_id: product.product_id,
    //                 feature_name: null,
    //                 feature_level: feature_level,
    //                 max_feature_level: max_feature_level,
    //                 feature_price: feature_price,
    //                 time_to_achieve: time_to_achieve,
    //                 neccessary_employees_number: neccessary_employees_number,
    //                 available_employees_number: available_employees_number,
    //                 progress: progress,
    //                 feature_sum: feature_price * feature_level,
    //             });
    //         }
    //         n_features_old.set(n);
    //     }
    //     //console.log(features_array);
    //     features_arrayDep.depend();
    //     return features_array;
    // },


    // features: function(){
    //     var game = Games.findOne({});
    //     var company = game.comapnies[Meteor.user().username];
    //     var features = [];
    //     var feature_lists = Features.find({owner: Meteor.userId()});
    //     feature_lists.forEach(function (feature_list) {
    //         features.push(feature_list.feature_name);
    //     });
    //     return Features.find({feature_name: {$nin: features}});
    // },


    feature_level_increase_enabled:function(){
        return this.prop_level<this.max_prop_level?"":"disabled";
    },

    feature_level_decrease_enabled:function(){
        return this.prop_level>0?"":"disabled";
    },


    new_feature_level_increase_enabled:function(){
        return this.prop_level<this.max_prop_level?"":"disabled";
    },

    new_feature_level_decrease_enabled:function(){
        return this.prop_level>0?"":"disabled";
    },


    // is_stop: function(){
    //     return this.is_stop;
    // },

    // not_first_level: function(){
    //     return this.feature_level !== 1? true: false;
    // },


});



Template.game_product.events({

    "click #delete_product": function(event){
        event.preventDefault();

        var self = this;

        var game = Games.findOne({});

        var count = 0;

        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                game.products.splice(count, 1);
            }
            count++;
        });

        Meteor.call('updateGame', game);
    },

    "click #edit_product": function(){
        event.preventDefault();

        var self = this;
        var game = Games.findOne({});

        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                product.product_editable = true;
            }
        });

        Meteor.call('updateGame', game);
    },


    "click #save_product": function(){
        event.preventDefault();

        var self = this;
        var game = Games.findOne({});

        var product_name = $("#product_name"+self.product_id).val();
        var product_price = $("#product_price"+self.product_id).val() * 1;

        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                product.product_name = product_name;
                product.product_price = product_price;
                product.product_editable = false;
            }
        });

        Meteor.call('updateGame', game);
    },



    'change #feature_name': function(event, template){
        event.preventDefault();
        var feature_name = event.target.value;
        var feature = Features.findOne({feature_name: feature_name});
        if (feature){
            this.feature_price = parseInt(feature.feature_price);
            this.feature_sum = this.feature_price * this.feature_level;
            this.feature_name = feature.feature_name;
            this.time_to_achieve = feature.time_to_achieve;
            this.progress = 0;
            this.neccessary_employees_number = feature.neccessary_employees_number * this.feature_level;
            this.available_employees_number = Employees.findOne({owner: Meteor.userId(), department_name: feature.neccessary_department}).employee_number;
            features_arrayDep.changed();
        }else{
            this.feature_price = 0;
            this.feature_sum = this.feature_price * this.feature_level;
            this.feature_name = null;
            this.time_to_achieve = 0;
            this.progress = 0;
            this.neccessary_employees_number = 0;
            this.available_employees_number = 0;
            features_arrayDep.changed();
        }
    },


    "click #feature_level_plus": function(event){
        var self =  this;
        var game = Games.findOne({});
        var selected_product = null;

        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                selected_product = product;
            }
        });

        selected_product.prop.forEach(function (property) {
            if(property.id == self.id){
                property.prop_level += 1;
                property.progress = 0;
                property.start_period = game.time_period;
                selected_product.product_status = "In production";
            }
        });

        //console.log(self);

        Meteor.call('updateGame', game);
    },



    // "click #publish": function(){
    //     //Meteor.call('publishFeature', this._id, Session.get("game"), function (error, result) {});
    //     //Meteor.call('updateCompanyExp', this.company_name, 5, function (error, result) {});

    // },


    // "click #create_new_feature": function(event, template){
    //     event.preventDefault();

    //     //console.log(this.product_id);
    //     //console.log(features_array[this.id]);


    //     if(template.$("#new_feature"+this.value).valid()){

    //         //Meteor.call('addFeatureList', this.product_id, features_array[this.id], function (error, result) {});

    //     }
    // },

    // 'click #stop': function(event){
    //     event.preventDefault();

    //     //Meteor.call('stopFeature', this._id, function (error, result) {});        
    // },

    // 'click #start': function(event){
    //     event.preventDefault();

    //     //Meteor.call('startFeature', this._id, function (error, result) {});        
    // },

    'click #delete_prop': function(){
        event.preventDefault();
        var self = this;
        var game = Games.findOne({});

        var count = 0;
        var selected_product = null;

        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                selected_product = product;
            }
        });

        selected_product.prop.forEach(function (property) {
            if(property.id == self.id){
                selected_product.prop.splice(count, 1);
            }
            count++;
        });


        Meteor.call('updateGame', game);
    },

});