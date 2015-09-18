$(document).ready(function () {
    $('.submit').on('click', function () {

        var name = $('input[name=FNAME]').val();
        var email = $('input[name=EMAIL]').val();

        var endpoint = 'https://us11.api.mailchimp.com/2.0/lists/subscribe';
        var data = {
            apikey: "0f78d4d50ceecfea27dab203527dfe1e-us11",
            id: "ffd7ecc2b3",
            email: {
                email: "alexperry5@gmail.com"
            },
            double_optin: false
        };

        $.ajax({
            type: "POST",
            url: endpoint,
            data: JSON.stringify(data),
            error: function(err) {
                console.log(err, 'err');
            },
            success: function (response) {
                console.log(response, 'response from server');
                alert('success');
            }
        });
    });
});
