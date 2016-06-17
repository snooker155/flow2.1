var employees_array = [];
var employees_arrayDep = new Tracker.Dependency();

var n_old = new ReactiveVar(0);

// var department_description_name = new ReactiveVar("Choose");

// var department_description = new ReactiveVar("Here will be department info.");



Template.game_team.onCreated(function(){
    
});


Template.game_team.onRendered(function(){

});


Template.game_team.helpers({

    has_team(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].company_team;
    },

    employees: function(){
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        return company.company_team; 
    },

    // department_description_name: function(){
    //     return department_description_name.get();
    // },

    // department_description: function(){
    //     return department_description.get();
    // },

    departments: function(){
        var company = Games.findOne({}).companies[Meteor.user().username];
        var departments = [];
        company.company_team.forEach(function (employee) {
            departments.push(employee.department_name);
        });
        return Departments.find({department_name: {$nin: departments}});
    },

    new_employees: function(){

        var company = Games.findOne({}).companies[Meteor.user().username];
        if (Departments.find().count() - company.company_team.length > 0 ){
            var n = Departments.find().count() - company.company_team.length;
        }else{
            var n = 0;
        }
        if(n_old.get() != n){
            employees_array = [];
            var price_for_employee = 0;
            var employee_number = 0;
            var max_employee_number = 10;
            for (i=0; i<n; i++){
                employees_array.push({
                    id: company.company_team[company.company_team.length - 1].id + 1,
                    value: company.company_team[company.company_team.length - 1].value + 1,
                    department_name: null,
                    employee_level: 1,
                    max_level: 3,
                    price_for_employee: price_for_employee,
                    employee_number: employee_number,
                    employee_number_at_work: 0,
                    max_employee_number: max_employee_number,
                });
            }
            n_old.set(n);
        }
        //console.log(employees_array);
        employees_arrayDep.depend();
        return employees_array;
    },

    sum_of_department(){
        return this.employee_number * this.price_for_employee;
    },


    sum_of_month: function(){
        var company = Games.findOne({}).companies[Meteor.user().username];
        var employees = company.company_team;
        var sum = 0;
        employees.forEach(function (employee) {
            sum += employee.employee_number * employee.price_for_employee;
        });
        employees_array.forEach(function (employee) {
            sum += employee.employee_number * employee.price_for_employee;
        });
        employees_arrayDep.depend();
        return sum;
    },




    level_plus_enabled:function(){
        return this.employee_level<this.max_employee_level?"":"disabled";
    },

    // level_minus_enabled:function(){
    //     return this.employee_level>0?"":"disabled";
    // },




    employee_number_plus_enabled:function(){
        if(this.employee_number_at_work == 0){
            return this.employee_number<this.max_employee_number?"":"disabled";    
        }else{
            return "hidden";
        }
    },

    employee_number_minus_enabled:function(){
        if(this.employee_number_at_work == 0){
            return this.employee_number>0?"":"disabled";
        }else{
            return "hidden";
        }
    },


    new_employee_number_plus_enabled:function(){
        return this.employee_number<this.max_employee_number?"":"disabled";
    },

    new_employee_number_minus_enabled:function(){
        return this.employee_number>0?"":"disabled";
    },

    at_work: function(){
        return this.employee_number_at_work;
    },

    free_employees: function(){
        return this.employee_number - this.employee_number_at_work;
    },

    sum_of_at_work: function(){
        return 0;
    },

    sum_of_free: function(){
        var company = Games.findOne({}).companies[Meteor.user().username];
        var employees = company.company_team;
        var sum = 0;
        employees.forEach(function (employee) {
            sum += employee.employee_number - employee.employee_number_at_work;
        });
        employees_array.forEach(function (employee) {
            sum += employee.employee_number - employee.employee_number_at_work;
        });
        employees_arrayDep.depend();
        return sum;
    },

});



Template.game_team.events({
    // 'click #department_info': function(event, template){
    //     var department = Departments.findOne({department_name: this.department_name});
    //     if (department){
    //         department_description_name.set(department.department_name);
    //         department_description.set(department.department_description);
    //     }else{
    //         department_description_name.set("Test");
    //         department_description.set("Test");
    //     }
    // },


    'change .department_name': function(event,template){
        event.preventDefault();
        var department_name = event.target.value;
        var department = Departments.findOne({department_name: department_name});
        if (department){
            this.price_for_employee = parseInt(department.employee_price);
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = department.department_name;
            employees_arrayDep.changed();
            // department_description_name.set(department.department_name);
            // department_description.set(department.department_description);
        }else{
            this.price_for_employee = 0;
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = null;
            employees_arrayDep.changed();
            // department_description_name.set("Test");
            // department_description.set("Test");
        }
    },



    // "click #level_minus": function(event){
    //         this.employee_level -= 1;
    //         console.log(this.employee_level);

    //         //Meteor.call('updateEmployeeLevel', this._id, -1, function (error, result) {});

    //         // var obj = {
    //         //     "feature": "employee_level_down",
    //         //     "value": this.employee_level
    //         // };
    //         // //Communication.send('company_change', obj);
    //         // console.log(obj);
    // },

    "click #level_plus": function(event){
        var self =  this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];

        company.company_team.forEach(function (dep) {
            if(dep.id == self.id){
                dep.employee_level += 1;
            }
        });

        //console.log(company);

        Meteor.call('updateGame', game);

    },


    "click .employee_number_minus": function(){
        var self =  this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];

        company.company_team.forEach(function (dep) {
            if(dep.id == self.id){
                dep.employee_number -= 1;
            }
        });

        //console.log(company);

        Meteor.call('updateGame', game);
    },


    "click .employee_number_plus": function(){
        var self =  this;
        console.log(self);
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];

        company.company_team.forEach(function (dep) {
            if(dep.id == self.id){
                dep.employee_number += 1;
            }
        });

        //console.log(company);

        Meteor.call('updateGame', game);
    },


    "click .new_employee_number_minus": function(){
        this.employee_number -= 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();
    },


    "click .new_employee_number_plus": function(){
        this.employee_number += 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();
    },


    'click #create_new_department': function(event, template){
        event.preventDefault();
        var self =  this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];

        //console.log(self);

        if(template.$("#new_department"+self.value).valid()){

            company.company_team.push(self);
            employees_arrayDep.changed();

            //console.log(company.company_team);

            Meteor.call('updateGame', game);
        }
    },


    'click #disband': function(){
        var self =  this;
        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];
        var count = 0;

        company.company_team.forEach(function (dep) {
            if(dep.id == self.id){
                company.company_team.splice(count, 1);
            }
            count++;
        });

        if(company.company_team.length == 0){
            delete company.company_team;
        }

        //console.log(company.company_team);

        Meteor.call('updateGame', game);
    },

});