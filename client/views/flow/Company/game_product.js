

var features_obj = {};
var features_objDep = new Tracker.Dependency();

// var feature_description_name = new ReactiveVar("Choose");

// var feature_description = new ReactiveVar("");

//var test_createdAt = new Date();
//var test_progress = new ReactiveVar(0);


Template.game_product.onCreated(function(){

});



Template.game_product.onRendered(function(){

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

    features: function(){
        var self = this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        var properties = [];
        var bad_properties = [];
        var selected_product = null;
        game.products.forEach(function(product) {
            if(product.product_id == self.product_id){
                selected_product = product;
            }
        });
        selected_product.prop.forEach(function (property) {
            properties.push(property.prop_name);
            bad_properties.push(property.prop_name);
        });
        var all_features = Features.find().fetch();
        all_features.forEach(function (feat) {
            if(feat.neccessary_features_name != null && _.intersection(feat.neccessary_features_name, properties).length != feat.neccessary_features_name.length){
               bad_properties.push(feat.feature_name); 
            }
        });
        return Features.find({feature_name: {$nin: bad_properties}, neccessary_level: { $lte: company.company_level } });
    },


    product_production_progress(){
        var game = Games.findOne({});
        var self = this;
        var total_time_to_achieve = 0;
        var total_start_period = 0;
        var target_property = null;
        self.prop.forEach(function (property) {
            if(property.status == 'active'){
                if(total_time_to_achieve < property.start_period + property.time_to_achieve * property.prop_level){
                    total_time_to_achieve = property.start_period + property.time_to_achieve * property.prop_level;
                    target_property = property;
                }
            }
        });
        // console.log(total_time_to_achieve);
        // console.log(total_start_period);
        // console.log(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100));
        if(target_property){
            if(Math.round((game.time_period - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100) >= 100){
                return 100;
            }else{
                return Math.round((game.time_period - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100); 
            }
        }else{
            return 100;
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

    available_employees_number(){
        var self = this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        var current_employees_number = null;
        company.company_team.forEach(function (dep) {
            if(self.neccessary_department == dep.department_name){
                current_employees_number = dep.employee_number - dep.employee_number_at_work;
            }
        });
        if(current_employees_number){
            return current_employees_number;
        }else{
            //return "Not exist department";
            return 0;
        }
    },



    // is_published: function(){
    //     return this.is_published;
    // },

    new_features_lists: function(){
        var self = this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        if (Features.find({neccessary_level: { $lte: company.company_level }}).count() - self.prop.length > 0 ){
            var n = company.company_level + 2 - self.prop.length;
        }else{
            var n = 0;
        }
        if(!features_obj[self.product_name]){
            features_obj[self.product_name] = [];
        }
        if(features_obj[self.product_name].length != n){
            var features_array = [];
            var feature_price = 0;
            var feature_level = 1;
            var max_feature_level = 3;
            var time_to_achieve = 0;
            var progress = 0;
            var neccessary_employees_number = 0;
            var available_employees_number = 0;
            for (j=0; j<n; j++){
                features_array.push({
                    id: self.prop[self.prop.length - 1].id + 1,
                    value: self.prop[self.prop.length - 1].id + 1,
                    //company_name: company.company_name,
                    product_id: self.product_id,
                    prop_name: null,
                    prop_level: feature_level,
                    max_prop_level: max_feature_level,
                    prop_price: feature_price,
                    time_to_achieve: time_to_achieve,
                    neccessary_department: null,
                    neccessary_employees_number: neccessary_employees_number,
                    available_employees_number: available_employees_number,
                    progress: progress,
                    prop_sum: feature_price * feature_level,
                });
            }
            features_obj[self.product_name] = features_array;
        }
        features_objDep.depend();
        return features_obj[self.product_name];
    },


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

    product_price(){
        var self = this;
        return parseFloat(self.product_price.toFixed(2));
    },

    time_to_achieve(){
        var self = this;
        return self.time_to_achieve * self.prop_level;
    },


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



    'change .feature_name': function(event, template){
        event.preventDefault();
        var self = this;
        var prop_name = event.target.value;
        var feature = Features.findOne({feature_name: prop_name});
        if (feature){
            self.prop_price = feature.feature_price;
            self.prop_level = 1;
            self.max_feature_level = feature.max_feature_level,
            self.prop_name = feature.feature_name;
            self.time_to_achieve = feature.time_to_achieve;
            self.progress = 0;
            self.neccessary_employees_number = feature.neccessary_employees_number * self.prop_level;
            self.neccessary_department = feature.neccessary_department;
            features_objDep.changed();
        }else{
            self.feature_price = 0;
            self.feature_level = 0;
            self.feature_name = null;
            self.time_to_achieve = 0;
            self.progress = 0;
            self.neccessary_employees_number = 0;
            self.neccessary_department = null;
            //self.available_employees_number = 0;
            features_objDep.changed();
        }
    },


    "click #feature_level_plus": function(event){
        var self =  this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        var selected_product = null;

        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                selected_product = product;
            }
        });

        if(company.has_employees_number(self.neccessary_department, self.neccessary_employees_number)){
            selected_product.prop.forEach(function (property) {
                if(property.id == self.id){
                    property.prop_level += 1;
                    property.progress = 0;
                    property.status = 'active';
                    property.start_period = game.time_period;
                    selected_product.product_status = "Updated";
                }
            });

            company.setToWork(self.neccessary_department, self.neccessary_employees_number);

            Meteor.call('updateGame', game);
        }else{
            can_create = false;
            alert("Not enough employees in department \""+self.neccessary_department+"\".\n\nRequire "+self.neccessary_employees_number+", has "+company.getDepEmployeeNumber(self.neccessary_department)+".");
        }

    },



    // "click #publish": function(){
    //     //Meteor.call('publishFeature', this._id, Session.get("game"), function (error, result) {});
    //     //Meteor.call('updateCompanyExp', this.company_name, 5, function (error, result) {});

    // },


    "click #create_new_feature": function(event, template){
        event.preventDefault();
        var self = this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        var selected_product = null;
        game.products.forEach(function (product) {
            if(product.product_id == self.product_id){
                selected_product = product;
            }
        });

        if(template.$("#new_feature"+self.value).valid()){
            if(company.has_department(self.neccessary_department)){
                if(company.has_employees_number(self.neccessary_department, self.neccessary_employees_number)){
                    self.start_period = game.time_period;
                    self.status = 'active';
                    selected_product.prop.push(self);
                    selected_product.product_status = "Updated";
                    features_objDep.changed();

                    //console.log(selected_product.prop);

                    company.setToWork(self.neccessary_department, self.neccessary_employees_number);

                    Meteor.call('updateGame', game);
                }else{
                    can_create = false;
                    alert("Not enough employees in department \""+self.neccessary_department+"\".\n\nRequire "+self.neccessary_employees_number+", has "+company.getDepEmployeeNumber(self.neccessary_department)+".");
                }
            }else{
                can_create = false;
                alert("Company does not have the neccessary department \""+self.neccessary_department+"\".");
            }

        }
    },

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