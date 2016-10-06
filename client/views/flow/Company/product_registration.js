
var features_array = [];
var features_arrayDep = new Tracker.Dependency();




Template.product_registration.onCreated(function(){

    features_array = [];
    var company = Companies.findOne({owner: Meteor.user().username});
    var features = Features.find({neccessary_level: { $lte: company.company_level } });
    //var features = Features.find({});
    //console.log(features.fetch());
    var feature_price = 0;
    var feature_level = 0;
    var max_feature_level = 0;
    var time_to_achieve = 0;
    var progress = 0;
    var neccessary_employees_number = 0;
    var neccessary_department = null;
    //var available_employees_number = 0;
    var i = 0;
    for (j=0; j<company.company_level+2; j++){
        features_array.push({
            id: i,
            value: i,
            //company_name: Companies.findOne({owner: Meteor.userId()}).company_name,
            feature_name: null,
            feature_level: feature_level,
            max_feature_level: max_feature_level,
            feature_price: feature_price,
            time_to_achieve: time_to_achieve,
            neccessary_employees_number: neccessary_employees_number,
            neccessary_department: neccessary_department,
            progress: progress,
            //feature_sum: feature_price * feature_level,
        });
        i++;
    }


});





// var feature_description_name = new ReactiveVar("Choose");

// var feature_description = new ReactiveVar("");






Template.product_registration.helpers({

    features_list: function(){
        features_arrayDep.depend();
        return features_array;
    },

    features: function(){
        var company = Companies.findOne({owner: Meteor.user().username});
        var all_features = Features.find().fetch();
        var features = [];
        all_features.forEach(function (feat) {
            if(feat.neccessary_features_id != null){
               features.push(feat.feature_id); 
            }
        });
        var available_features = Features.find({neccessary_level: { $lte: company.company_level }, feature_id: {$nin: features}}).fetch();
        var selectable_features = [];
        for(var i = 0; i < available_features.length; i++){
            if(this.id != i){
                if($("#feature_name"+i).val() != available_features[i].feature_name){
                    selectable_features.push(available_features[i]);
                }
            }else{
                selectable_features.push(available_features[i]);
            }
        }
        return selectable_features;
    },

    feature_costs(){
        return this.feature_price * this.feature_level;
    },

    sum_of_production(){
        var sum = 0;
        features_arrayDep.depend();
        features_array.forEach(function (feature) {
            sum += feature.feature_price * feature.feature_level;
        });
        return sum;
    },

    current_employees_number(){
        var self = this;
        var company = Companies.findOne({owner: Meteor.user().username});
        var current_employees_number = null;
        var target_dep = null;
        company.company_team.forEach(function (dep) {
            if(self.neccessary_department == dep.department_name){
                target_dep = dep;
                current_employees_number = dep.employee_number - dep.employee_number_at_work;
            }
        });
        if(target_dep){
            if(current_employees_number > 0){
                return current_employees_number;
            }else{
                return 0;
            }
        }else{
            return "Not exist department";
        }
    },

    has_department(){
        var self = this;
        var company = Companies.findOne({owner: Meteor.user().username});
        if(self.neccessary_department){
            if(company.has_department(self.neccessary_department)){
                return "green";
            }else{
                return "red";
            }
        }
    },

    has_employees_number(){
        var self = this;
        var company = Companies.findOne({owner: Meteor.user().username});
        if(self.neccessary_department && self.neccessary_employees_number){
            if(company.has_employees_number(self.neccessary_department, self.neccessary_employees_number)){
                return "green";
            }else{
                return "red";
            }
        }
    },

    number_id(){
        var self = this;
        return self.value + 1;
    },

    can_add(){
        var company = Companies.findOne({owner: Meteor.user().username});
        features_arrayDep.depend();
        return features_array.length < company.company_level + 2;
    },

    can_remove(){
        features_arrayDep.depend();
        return features_array.length > 1;
    },

});





Template.product_registration.events({
    'change .feature_name': function(event, template){
        event.preventDefault();
        var feature_name = event.target.value;
        var feature = Features.findOne({feature_name: feature_name});
        if (feature){
            this.feature_price = feature.feature_price;
            this.feature_level = 1;
            this.max_feature_level = feature.max_feature_level,
            this.feature_name = feature.feature_name;
            this.time_to_achieve = feature.time_to_achieve;
            this.progress = 0;
            this.neccessary_employees_number = feature.neccessary_employees_number * this.feature_level;
            this.neccessary_department = feature.neccessary_department;
            //this.available_employees_number = Employees.findOne({owner: Meteor.userId(), department_name: feature.neccessary_department}).employee_number;
            features_arrayDep.changed();
            // feature_description_name.set(feature.feature_name);
            // feature_description.set(feature.feature_description);
        }else{
            this.feature_price = 0;
            this.feature_level = 0;
            this.feature_name = null;
            this.time_to_achieve = 0;
            this.progress = 0;
            this.neccessary_employees_number = 0;
            this.neccessary_department = null;
            //this.available_employees_number = 0;
            features_arrayDep.changed();
            // feature_description_name.set("Test");
            // feature_description.set("Test");
        }

        product_array = features_array;
    },


    "click #add_feature": function(event, template){
        event.preventDefault();
        var self = this;

        features_array.push({
            id: features_array.length,
            value: features_array.length,
            //company_name: Companies.findOne({owner: Meteor.userId()}).company_name,
            feature_name: null,
            feature_level: 0,
            max_feature_level: 0,
            feature_price: 0,
            time_to_achieve: 0,
            neccessary_employees_number: 0,
            neccessary_department: null,
            progress: 0,
            //feature_sum: feature_price * feature_level,
        });
        features_arrayDep.changed();
    },

    "click #remove_feature": function(event, template){
        event.preventDefault();
        var self = this;


        features_array.splice((features_array.length-1),1);
        features_arrayDep.changed();
    },

    // "click #feature_level_increase": function(){
    //     this.feature_level += 1;
    //     this.feature_sum = this.feature_price * this.feature_level;
    //     this.neccessary_employees_number = Features.findOne({feature_name: this.feature_name}).neccessary_employees_number  * this.feature_level;
    //     features_arrayDep.changed();

    //     product_array = features_array;
    // },

    // "click #feature_level_decrease": function(){
    //     this.feature_level -= 1;
    //     this.feature_sum = this.feature_price * this.feature_level;
    //     this.neccessary_employees_number = Features.findOne({feature_name: this.feature_name}).neccessary_employees_number * this.feature_level;
    //     features_arrayDep.changed();

    //     product_array = features_array;
    // },


    "click #create": function(event, template){
        event.preventDefault();
        var game = Games.findOne({});
        var company = Companies.findOne({owner: Meteor.user().username});
        var product = {};
        var prop = [];
        var can_create = true;
        var product_costs = 0;

        var product_name = template.$("#product_name").val();
        var product_price = template.$("#product_price").val();
        var product_color = template.$("#product_color").val();

        // console.log(product_name);
        // console.log(product_price);
        // console.log(product_color);
        // console.log(features_array);

        if(template.$("#product_form").valid()){

            features_array.forEach(function (feature) {
                if(company.has_department(feature.neccessary_department)){
                    if(company.has_employees_number(feature.neccessary_department, feature.neccessary_employees_number)){
                        prop.push({
                            prop_name: feature.feature_name,
                            id: feature.id,
                            value: feature.value,
                            prop_level: feature.feature_level,
                            max_prop_level: feature.max_feature_level,
                            prop_price: feature.feature_price,
                            time_to_achieve: feature.time_to_achieve,
                            neccessary_employees_number: feature.neccessary_employees_number,
                            neccessary_department: feature.neccessary_department,
                            progress: feature.progress,
                            start_period: game.time_period,
                            product_id: Products.find({}, {sort: {product_id: -1}, limit: 1}).fetch()[0].product_id + 1,
                            status: "active",
                        })

                        product_costs += feature.feature_price;
                    }else{
                        can_create = false;
                        alert("Not enough employees in department \""+feature.neccessary_department+"\".\n\nRequire "+feature.neccessary_employees_number+", has "+company.getDepEmployeeNumber(feature.neccessary_department)+".");
                    }
                }else{
                    can_create = false;
                    alert("Company does not have the neccessary department \""+feature.neccessary_department+"\".");
                }
            });


    
            if(can_create){
                // var regions = [];
                // company.company_region.forEach(function (region) {
                //     regions.push(region);
                // });

                var regions = ["NA", "SA", "CA", "CE", "NE", "RU", "AF", "OR", "IN", "AS", "SP", "IN"];
                //var regions = ["RU"];

                product = {
                    product_id: Products.find({}, {sort: {product_id: -1}, limit: 1}).fetch()[0].product_id + 1,
                    product_name: product_name,
                    product_price: parseInt(product_price),
                    product_color: product_color,
                    //product_quality: 1 + Math.floor(Math.random() * 10),
                    prop: prop,
                    product_quantity: 75,
                    product_creator: company.company_name,
                    product_status: "In production",
                    product_regions: regions,
                    product_editable: false,
                }


                // game.customers.forEach(function (customer) {
                //     customer.makeProductConservatism(product)
                // });

                features_array.forEach(function (feature) {
                    company.setToWork(feature.neccessary_department, feature.neccessary_employees_number);
                });

                company.company_balance -= product_costs;

                company.company_activities.push({
                    status: "In production",
                    title: "Product has gone in production",
                    start_time: game.time_period,
                    comments: "Product "+product_name+" has gone in production.",
                });

                Meteor.call('createProduct', product);

                Meteor.call('updateCompany', company);

                $("#collapse").attr("class", "collapse");

            }
        }
    }
});