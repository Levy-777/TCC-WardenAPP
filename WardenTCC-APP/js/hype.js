document.addEventListener('deviceready', function(){
    window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
       console.log(token);
    }, function(error) {
        console.error(error);
    });

    // Get notified when a token is refreshed
    window.FirebasePlugin.onTokenRefresh(function(token) {
        // save this server-side and use it to push notifications to this device
        console.log("Refresh to get new token: " + token);
    }, function(error) {
        alert(error);
    });

    // Get notified when the user opens a notification
    window.FirebasePlugin.onMessageReceived(function(message) {
        console.log("Message type: " + message.messageType);
        if(message.messageType === "notification"){
            console.log("Notification message received");
            if(message.tap){
                console.log("Tapped in " + message.tap);
            }
        }
    }, function(error) {
        console.error(error);
    }); 
    
}, false);
