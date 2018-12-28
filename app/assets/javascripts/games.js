function Suggestion(attributes) {
    this.status = attributes.status;
    this.content = attributes.content;
    this.id = attributes.id;
}

$(function() {
    Suggestion.templateSource = $('#suggestions-template').html();
    Suggestion.template = Handlebars.compile(Suggestion.templateSource);

    Suggestion.prototype.suggestionLi = function() {
        return Suggestion.template(this)
    }
});

$(function() {
    //Suggestions Checkbox 
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    });

    //Load suggestions 
    $('a.load_suggestions').on('click', function(e) {
        $.get(this.href).success(function(response) {
            $ol = $('div.suggestions ol') //good practice to use $ to prepend vars that ref jquery objects
            $ol.html("") 

            response.forEach(suggestion => {
                $ol.append(`<li>${suggestion.content}</li>`);
            });
        });
        // debugger
        e.preventDefault(); 
        // e.stopImmediatePropagation();
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

////////////////////////////////
/////// Prev & Next Game ///////
////////////////////////////////
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
        $('a.load_suggestions').attr('href', "/games/" + data["id"] + "/suggestions")
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
        $('a.load_suggestions').attr('href', "/games/" + data["id"] + "/suggestions")
      });
    });
  
  });
