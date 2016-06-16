

var employees_array = [];
var employees_arrayDep = new Tracker.Dependency();



Template.team_registration.onCreated(function(){

    var game = Games.findOne({});
    // var company = game.companies[Meteor.user().username];
    // var n = company.company_level + 1;
    employees_array = [];
    var n = 2;
    var price_for_employee = 0;
    var employee_number = 0;
    var max_employee_number = 10;
    for (i=0; i<n; i++){
        employees_array.push({
            id: i,
            number: i+1,
            department_name: null,
            employee_level: 1,
            max_level: 3,
            price_for_employee: price_for_employee,
            employee_number: employee_number,
            max_employee_number: max_employee_number,
            sum_of_department: price_for_employee * employee_number * 1,
        });
    }

});






var department_description_name = new ReactiveVar("Choose");

var department_description = new ReactiveVar("");




Template.team_registration.helpers({

    available_departments: function(){
        employees_arrayDep.depend();
        return employees_array;
    },

    departments: function(){
        return Departments.find();
    },

    new_employee_number_plus_enabled:function(){
        return this.employee_number<this.max_employee_number?"":"disabled";
    },

    new_employee_number_minus_enabled:function(){
        return this.employee_number>0?"":"disabled";
    },


    department_description_name: function(){
        return department_description_name.get();
    },

    department_description: function(){
        return department_description.get();
    },

    sum_of_month: function(){
        var sum = 0;
        employees_arrayDep.depend();
        employees_array.forEach(function (employee) {
            sum += employee.sum_of_department;
        });
        return sum;
    },

});





Template.team_registration.events({
    'change .department_name': function(event, template){
        event.preventDefault();
        var department_name = event.target.value;
        var department = Departments.findOne({department_name: department_name});
        if (department){
            //console.log(this);
            this.price_for_employee = parseInt(department.employee_price);
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = department.department_name;
            employees_arrayDep.changed();
            department_description_name.set(department.department_name);
            department_description.set(department.department_description);
        }else{
            this.price_for_employee = 0;
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = null;
            employees_arrayDep.changed();
            department_description_name.set("Test");
            department_description.set("Test");
        }

    },

    'click .new_employee_number_plus': function(event){
        event.preventDefault();
        var self = this;
        self.employee_number += 1;
        self.sum_of_department = self.price_for_employee * self.employee_number;
        employees_arrayDep.changed();

    },

    'click .new_employee_number_minus': function(){
        this.employee_number -= 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();

    },


    'click #create': function(event, template){
        event.preventDefault();
        var form = template.$("#team_form");

        var game = Games.findOne({});
        var company = game.companies[Meteor.user().username];

        if (form.valid()){

            //console.log(employees_array);

            company.company_activities.push({
                status: "Complete",
                title: "Team has formed",
                start_time: game.time_period,
                end_time: game.time_period,
                comments: "Company "+company.company_name+" successfully formed the team.",
            });


            company.company_team = employees_array;


            Meteor.call('updateGame', game);

        }

        //console.log(game.companies);

    },


});
