$(function() {
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    });

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
});
