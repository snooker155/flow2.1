Template.news_info.onRendered(function(){

});





Template.news_info.helpers({
    news: function(){
        var game = Games.findOne({});
        //console.log(game.news);
        return game.news.sort(function(a, b){return b.time_period - a.time_period});
    },
});

