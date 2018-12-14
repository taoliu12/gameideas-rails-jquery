$(function() {
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    });

    $('a.load_suggestions').on('click', function(e) {
        alert('Yo');
        $.get(this.href).success(function(response) {
            $('div.suggestions').html(response);
        });
        e.preventDefault();
    });
});
