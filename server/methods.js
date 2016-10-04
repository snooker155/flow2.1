



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
      });
    },



});