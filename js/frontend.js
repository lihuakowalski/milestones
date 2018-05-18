$(function () {
    "use strict";
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    // if browser doesn't support WebSocket, just show
    // some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>',
            { text:'Sorry, but your browser doesn\'t support WebSocket.'}
        ));
        return;
    }

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');
    connection.onopen = function () {
        // first we want users to enter their names
        $('#input').removeAttr('disabled');
        $('#status').text('Favorite color:');
    };

    connection.onerror = function (error) {
        // just in there were some problems with connection...
        content.html($('<p>', {
            text: 'Sorry, but there\'s some problem with your '
            + 'connection or the server is down.'
        }));
    };

    connection.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('Invalid JSON: ', message.data);
            return;
        }

        $('#content').text(json.data); //jason;
        console.log(message.data);
        $('#input').removeAttr('disabled').focus();
    }

    /**
     * Send message when user presses Enter key
     */
    $('#input').keydown(function(e) {
      if (e.keyCode === 13) {
        var msg = $(this).val();
        if (!msg) {
          return;
        }

        connection.send(msg);
        $(this).val('');
        // disable the input field to make the user wait until server
        // sends back response
        $('#input').attr('disabled', 'disabled');
      }
    });

    setInterval(function() {
        if (connection.readyState !== 1) {
            $('#status').text('Error');
            $('#input').attr('disabled', 'disabled').val(
            'Unable to communicate with the WebSocket server.');
        }
    }, 3000);
});
