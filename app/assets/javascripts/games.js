function Game(attributes) {
    this.title = attributes.title;
    this.summary = attributes.summary;
    // this.created_at = attributes.created_at;
    // this.author = attributes.user.username;
}

function Suggestion(attributes) {
    this.status = attributes.status;
    this.content = attributes.content;
    this.id = attributes.id;
    this.author = attributes.user.username;
}
 
$(function() {
    
    // generate Handlebars suggestionLi template
    Suggestion.templateSource = $('#suggestions-template').html();
    Suggestion.template = Handlebars.compile(Suggestion.templateSource);
    
    // create a method on the prototype
    Suggestion.prototype.suggestionLi = function() {
        return Suggestion.template(this)
    }
});


$(function() {
    $('a.sort-game-oldest').on('click', function(e) {
        $.get(this.href).success(function(response) {
            $('.all-games').text("games"); 
        });
        e.preventDefault(); 
    });

    
})

/////// Make & Load suggestions //////
$(function() {
    //Load suggestions 
    $('a.load_suggestions').on('click', function(e) {
        $.get(this.href).success(function(response) {
            //good practice to use $ to prepend vars that ref jquery objects
            $ol = $('div.suggestions ol') 
            $ol.html("") 

            response.forEach(json => {
                var suggestion = new Suggestion(json);     
                $ol.append(suggestion.suggestionLi());
            });
        });
        e.preventDefault(); 
    });

    //Post suggestion
    $('#new_suggestion').on('submit', function(e) {
        // data = {
        //     'authenticity_token': $("input[name='authenticity_token']").attr('value'),
        //     'suggestion': { 
        //         'content':  $("#suggestion_content").val()
        //     }
        // }     
        $ol = $('div.suggestions ol')

        $.ajax({
            type: this.method,
            url: this.action,
            data: $(this).serialize(),
            dataType: 'JSON'
        })
        .success(function(json) {
            var suggestion = new Suggestion(json);     
            $ol = $('div.suggestions ol');
            $ol.append(suggestion.suggestionLi());
        })
        .error(function(response) {
            
        });
        e.preventDefault(); 
    });
});

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

$(function() {
    //Suggestions Checkbox 
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    });
}); 