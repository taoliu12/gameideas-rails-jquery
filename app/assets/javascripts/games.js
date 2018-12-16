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
        // $.post({  
        // }).success(function(response) {

        // });
        // debugger
        url = this.action
        data = {
            'authenticity_token': $("input[name='authenticity_token']").attr('value'),
            'suggestion': { 
                'content':  $("#suggestion_content").val()
            }
        }
        console.log('data');
        e.preventDefault(); 
    });
});
