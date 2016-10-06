var companies_methods = {

	getUsers: function(){
		var self = this;
		var game = Games.findOne({});
		var world_state = game.getWorldState();
		var customers_number = 0;
		world_state.region_products.forEach(function (product) {
			if(product.product_creator == self.company_name){
				customers_number += product.product_customers_number;
			}
		});
		return customers_number;
	},

	getRevenue: function(){
		var self = this;
		var company_product;
		var game = Games.findOne({});
		var world_state = game.getWorldState();
		world_state.region_products.forEach(function (product) {
			if(product.product_creator == self.company_name){
				company_product = product;
			}
		});
		if(company_product){
			return parseFloat((self.getUsers(game) * company_product.product_price).toFixed(2));
		}else{
			return 0;
		}
	},

	getCosts: function(){
		var self = this;
		var costs = 0;
		if(self.company_team){
			self.company_team.forEach(function (dep) {
				costs += dep.price_for_employee * dep.employee_number;
			});
		}
		return costs;
	},

	setCompaniesHistory: function(game){
		var self = this;
		if(self.company_history.length < 20){
			self.company_history.push({
				company_balance: self.company_balance,
				company_users: self.getUsers(),
				company_revenue: self.getRevenue(),
				company_costs: self.getCosts(),
				time_period: game.time_period,
			});
		}else{
			self.company_history.splice(0, 1);
			self.company_history.push({
				company_balance: self.company_balance,
				company_users: self.getUsers(),
				company_revenue: self.getRevenue(),
				company_costs: self.getCosts(),
				time_period: game.time_period,
			});
		}
	},


	has_department: function(department_name){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});
		if(target_department){
			return true;
		}else{
			return false;
		}
	},


	has_employees_number: function(department_name, employee_number){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});

		if(target_department.employee_number - target_department.employee_number_at_work >= employee_number){
			return true;
		}else{
			return false;
		}
	},

	getDepEmployeeNumber: function(department_name){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});
		if(target_department){
			return target_department.employee_number - target_department.employee_number_at_work;
		}else{
			return 0;
		}
	},

	setToWork: function(department_name, employee_number){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});
		if(target_department){
			target_department.employee_number_at_work = employee_number;
		}
	},


	changeCompanyBalance: function(){
		var self= this;
		self.company_balance += self.getRevenue() - self.getCosts();
	},

};

Companies = new Mongo.Collection("companies", {
	transform: function(doc){

		var newInstance = Object.create(companies_methods);

		return _.extend(newInstance, doc);
	}
});