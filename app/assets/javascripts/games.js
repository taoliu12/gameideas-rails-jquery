$(function() {
    $('.greenlit-chkbox').on('change', function() {
        $(this).parents('form').trigger('submit')
    })
});