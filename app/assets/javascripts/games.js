class Game {
    constructor(attributes) {
        this.id = attributes.id;
        this.title = attributes.title;
        this.summary = attributes.summary;
        // this.created_at = attributes.created_at;
        // this.author = attributes.user.username;
    }
}

$(function() {
    Game.templateSource = $('#games-template').html();
    Game.template = Handlebars.compile(Game.templateSource);

    Game.prototype.gameLi = function() {
        return Game.template(this)
    }

    /////// Sort by Oldest & Newest Games ///////
    function bindEventListerners() {
        $('a.sort-game-newest').on('click', function(e) {
            $.get(this.href).success(function(response) {
                $('.sort-games').html(
                    '<p class="sort-games">All games: <a class="sort-game-oldest" href="/games">Oldest to Newest</a> | Newest to Oldest</p>'
                );
                bindEventListerners();
                let $ol = $('.all-games ol'); 
                $ol.html("");
                
                response.forEach(json => {
                    game = new Game(json);
                    $ol.append(game.gameLi());
                });
            });
            e.preventDefault(); 
        });
    
        $('a.sort-game-oldest').on('click', function(e) {
            $.get(this.href).success(function(response) {
                $('.sort-games').html(
                    '<p class="sort-games">All games: Oldest to Newest | <a href="/games/newest_to_oldest" , class="sort-game-newest">Newest to Oldest</a></p>'
                );
                bindEventListerners();
                let $ol = $('.all-games ol'); 
                $ol.html("");
                
                response.forEach(json => {
                    game = new Game(json);
                    $ol.append(game.gameLi());
                });
            });
            e.preventDefault(); 
        });
    }
    bindEventListerners();
})

/////// Prev & Next Game ///////
$(function () {
    $(".js-next").on("click", function(event) {
      event.preventDefault()
      let nextId = parseInt($(".js-next").attr("data-id")) + 1;
      $.get("/games/" + nextId + ".json", function(data) {
        $(".username").text('Created by ' + data["user"]["username"]);
        $(".genre").text('Genre: ' + data["genre"]['name']) ;
        $(".gameTitle").text(data["title"]) ;
        $(".gameSummary").text(data["summary"]);
        // re-set the id to current on the link
        $(".js-next").attr("data-id", data["id"]);
        // re-set id in load suggestions link
        $('a.load_suggestions').attr('href', "/games/" + data["id"] + "/suggestions");
        // clear any loaded suggestions
        $('.suggestions ol').text('');
        // re-set id in suggestions form
        $('#new_suggestion').attr('action', "/games/" + data["id"] + "/suggestions");
        // re_enable submit button
        $('#new_suggestion input').prop('disabled', false);
        // clear textarea
        $('#new_suggestion textarea').val('');
      });
    });
  
    $(".js-prev").on("click", function(event) {
      event.preventDefault()
      let nextId = parseInt($(".js-next").attr("data-id")) - 1;
      $.get("/games/" + nextId + ".json", function(data) {
        $(".username").text('Created by ' + data["user"]["username"]);
        $(".genre").text('Genre: ' + data["genre"]['name']) ;
        $(".gameTitle").text(data["title"]) ;
        $(".gameSummary").text(data["summary"]);
        // re-set the id to current on the link
        $(".js-next").attr("data-id", data["id"]);
        // re-set id in load suggestions link
        $('a.load_suggestions').attr('href', "/games/" + data["id"] + "/suggestions");
        // clear any loaded suggestions
        $('.suggestions ol').text('');
        // re-set id in suggestions form
        $('#new_suggestion').attr('action', "/games/" + data["id"] + "/suggestions");
        // re_enable submit button
        $('#new_suggestion input').prop('disabled', false);
        // clear textarea
        $('#new_suggestion textarea').val('');
      });
    });
});

$("a.js-Delete").on('click', function() {
    $(this).parent().fadeOut();
    $.post(this.href, "_method=delete", function(data) {
        addProjectListeners();
    });
    return false;
});