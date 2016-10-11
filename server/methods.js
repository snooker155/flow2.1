



  Meteor.methods({



////////// Game methods ///////////////

    

    updateGame: function(game){
      Games.update(game._id, {
        players: game.players,
        customers: game.customers,
        //customers_data: game.customers_data,
        customers_history: game.customers_history,
        avg_price_history: game.avg_price_history,
        news: game.news,
        companies: game.companies,
        products: game.products,
        features: game.features,
        regions: game.regions,
        game_name: game.game_name,
        status: game.status,
        time_period: game.time_period,
      });
    },



////////// Company methods ///////////////

    

    createCompany: function(company){
      Companies.insert({
        company_name: company.company_name,
        company_region: company.company_region,
        company_level: company.company_level,
        company_exp: company.company_exp,
        company_balance: company.company_balance,
        owner: company.owner,
        company_activities: company.company_activities,
        company_history: company.company_history,
        company_team: company.company_team,
        status: company.status,
      });
    },


    deleteCompany: function(company){
      Companies.remove(company._id);
    },


    updateCompany: function(company){
        Companies.update(company._id, {
        company_name: company.company_name,
        company_region: company.company_region,
        company_level: company.company_level,
        company_exp: company.company_exp,
        company_balance: company.company_balance,
        owner: company.owner,
        company_activities: company.company_activities,
        company_history: company.company_history,
        company_team: company.company_team,
      });
    },





////////// Product methods ///////////////

    

    createProduct: function(product){
      Products.insert({
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        product_color: product.product_color,
        prop: product.prop,
        product_quantity: product.product_quantity,
        product_creator: product.product_creator,
        product_status: product.product_status,
        product_regions: product.product_regions,
        product_editable: product.product_editable,
      });
    },


    deleteProduct: function(product){
      Products.remove(product._id);
    },


    updateProduct: function(product){
        Products.update(product._id, {
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_color: product.product_color,
            prop: product.prop,
            product_quantity: product.product_quantity,
            product_creator: product.product_creator,
            product_status: product.product_status,
            product_regions: product.product_regions,
            product_editable: product.product_editable,
        });
    },


});