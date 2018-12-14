$(function() {
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    });

    $('a.load_suggestions').on('click', function(e) {
        alert('Yo');
        e.preventDefault();
    });
});
