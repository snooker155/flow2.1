



  Meteor.methods({



////////// Game methods ///////////////

    

    updateGame: function(game){
      Games.update(game._id, {
        players: game.players,
        customers: game.customers,
        customers_history: game.customers_history,
        avg_price_history: game.avg_price_history,
        news: game.news,
        companies: game.companies,
        products: game.products,
        regions: game.regions,
        game_name: game.game_name,
        status: game.status,
        time_period: game.time_period,
      });
    },




});