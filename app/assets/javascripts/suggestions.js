class Suggestion {
    constructor(attributes) {
        this.status = attributes.status;
        this.content = attributes.content;
        this.id = attributes.id;
        this.author = attributes.user.username;
    }
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

/////// Make & Load suggestions //////
$(function() {
    //Load suggestions 
    $('a.load_suggestions').on('click', function(e) {
        $.get(this.href).success(function(response) {
            //good practice to use $ to prepend vars that ref jquery objects
            $ol = $('div.suggestions ol') 
            $ol.html("") 

            response.forEach(json => {
                const suggestion = new Suggestion(json);     
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
            const suggestion = new Suggestion(json);     
            $ol = $('div.suggestions ol');
            $ol.append(suggestion.suggestionLi());
        })
        .error(function(response) {
            
        });
        e.preventDefault(); 
    });
});

$(function() {
    //Suggestions Checkbox 
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    });
}); 