$(function() {
    $('input.greenlit').on('change', function() {
        $(this).parents('form').trigger('submit')
    })
});