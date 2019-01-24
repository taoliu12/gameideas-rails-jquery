function Game(attributes) {
    this.title = attributes.title;
    this.summary = attributes.summary;
    // this.created_at = attributes.created_at;
    // this.author = attributes.user.username;
}

$(function() {
    $('a.sort-game-oldest').on('click', function(e) {
        $.get(this.href).success(function(response) {
            $('.all-games').text("games"); 
            console.log(response)
        });
        e.preventDefault(); 
    });

    
})

/////// Prev & Next Game ///////
$(function () {
    $(".js-next").on("click", function(event) {
      event.preventDefault()
      var nextId = parseInt($(".js-next").attr("data-id")) + 1;
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
      var nextId = parseInt($(".js-next").attr("data-id")) - 1;
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