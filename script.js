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
        'class': 'alert alert-success fade show',
        text: text
    });
    $('#main').prepend(element);
}

showFlashDangerMessage = function(text) {
    element = $('<div></div>', {
        'class': 'alert alert-danger fade show',
        text: text
    });
    hideFlashMessage(element);
    $('#main').prepend(element);
}

hideFlashMessage = function(element) {
    setTimeout(function() {
        $(element).alert('close');
    }, 5000);
}
