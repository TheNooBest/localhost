$('#registerform').submit(function(e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
        type: "POST",
        url: 'action.php',
        data: $(this).serialize(),
        success: function(response)
        {
            var jsonData = JSON.parse(response);

            console.log(jsonData);
            if (jsonData['status'] == "1")
            {
                showFlashSuccessMessage(jsonData['message']);
                $('#registerform').remove();
            }
            else
            {
                showFlashDangerMessage(jsonData['message']);
            }
        }
    });
});

showFlashSuccessMessage = function(text) {
    element = $('<div></div>', {
        'class': 'alert alert-success',
        'style': 'display: none;',
        'role': 'alert',
        text: text
    });
    $('#main').prepend(element);
    $(element).slideDown();
}

showFlashDangerMessage = function(text) {
    element = $('<div></div>', {
        'class': 'alert alert-danger',
        'style': 'display: none;',
        'role': 'alert',
        text: text
    });
    $('#main').prepend(element);
    $(element).slideDown();
    hideFlashMessage(element);
}

hideFlashMessage = function(element) {
    setTimeout(function() {
        // $(element).alert('close');
        $(element).slideUp('slow', function() {
            $(element).remove();
        });
    }, 5000);
}
