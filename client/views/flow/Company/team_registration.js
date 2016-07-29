

var employees_array = [];
var employees_arrayDep = new Tracker.Dependency();



Template.team_registration.onCreated(function(){

    var game = Games.findOne({});
    // var company = game.companies[Meteor.user().username];
    // var n = company.company_level + 1;
    employees_array = [];
    var departments = Departments.find().fetch();
    var price_for_employee = 0;
    var employee_number = 0;
    var max_employee_number = 10;
    for (i=0; i<departments.length; i++){
        employees_array.push({
            id: i,
            value: i,
            number: i+1,
            department_name: null,
            employee_level: 1,
            max_level: 3,
            price_for_employee: price_for_employee,
            employee_number: employee_number,
            max_employee_number: max_employee_number,
            employee_number_at_work: 0,
        });
    }

});






Template.team_registration.helpers({

    available_departments: function(){
        employees_arrayDep.depend();
        return employees_array;
    },

    departments: function(){
        console.log(this);
        var departments = Departments.find().fetch();
        var selectable_departments = [];
        for(var i = 0; i < departments.length; i++){
            if(this.department_name != departments[i].department_name){
                selectable_departments.push(departments[i]);
            }
            if($("#department_name"+i)[0]){
                console.log($("#department_name"+i)[0].value);
            }
        }
        return selectable_departments;
    },

    new_employee_number_plus_enabled:function(){
        if(this.department_name != null){
            return this.employee_number<this.max_employee_number?"":"disabled";
        }else{
            return "hidden";
        }
    },

    new_employee_number_minus_enabled:function(){
        if(this.department_name != null){
            return this.employee_number>0?"":"disabled";
        }else{
            return "hidden";
        }
    },


    // department_description_name: function(){
    //     return department_description_name.get();
    // },

    // department_description: function(){
    //     return department_description.get();
    // },

    sum_of_month: function(){
        var sum = 0;
        employees_arrayDep.depend();
        employees_array.forEach(function (employee) {
            sum += employee.employee_number * employee.price_for_employee;
        });
        return sum;
    },

    sum_of_department(){
        return this.employee_number * this.price_for_employee;
    },

});





Template.team_registration.events({
    'change .department_name': function(event, template){
        event.preventDefault();
        var department_name = event.target.value;
        var department = Departments.findOne({department_name: department_name});
        if (department){
            this.price_for_employee = parseInt(department.employee_price);
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = department.department_name;
            employees_arrayDep.changed();
        }else{
            this.price_for_employee = 0;
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = null;
            employees_arrayDep.changed();
        }

    },

    'click .new_employee_number_plus_form': function(event){
        event.preventDefault();
        var self = this;
        self.employee_number += 1;
        self.sum_of_department = self.price_for_employee * self.employee_number;
        employees_arrayDep.changed();

    },

    'click .new_employee_number_minus_form': function(){
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
                comments: "Company "+company.company_name+" successfully formed the team.",
            });


            company.company_team = employees_array;


            Meteor.call('updateGame', game);

        }

        //console.log(game.companies);

    },


});
