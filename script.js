var lastElement = null;
var lastElementTimeout = null;

$('#registerform').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: 'action.php',
        data: $(this).serialize(),
        success: function(response)
        {
            var jsonData = JSON.parse(response);

            console.log(lastElement);
            if (lastElement) {
                clearTimeout(lastElementTimeout);
                $(lastElement).slideUp('linear', function() {
                    $(this).remove();
                });
                lastElement = null;
            }

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
    $(element).slideDown('linear');
    lastElement = element;
}

showFlashDangerMessage = function(text) {
    element = $('<div></div>', {
        'class': 'alert alert-danger',
        'style': 'display: none;',
        'role': 'alert',
        text: text
    });
    $('#main').prepend(element);
    $(element).slideDown('linear');
    lastElement = element;
    hideFlashMessage(element, 5000);
}

hideFlashMessage = function(element, timeout) {
    lastElementTimeout = setTimeout(function() {
        $(element).slideUp('linear', function() {
            $(element).remove();
        });
        lastElement = null;
    }, timeout);
}
