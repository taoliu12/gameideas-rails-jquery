function Suggestion(attributes) {
    this.content = attributes.content;
    this.id = attributes.id;
}

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
        .success(function(response) {
            // debugger
            var suggestion = new Suggestion(response);
            console.log(suggestion);
            $ol.append(`<li>${suggestion.content}</li>`);
        })
        .error(function(response) {
            
        });
        
        e.preventDefault(); 
    });
});
