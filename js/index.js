var messages = {
        'postGranted': {
            'title': 'Push Notifications',
            'options': {
                'icon': 'js/logo.png',
                'body': 'This is the first push notification you have seen.'
            }
        },
        'hourlyMessage': {
            'title': 'An hour passed',
            'options': {
                'body': 'Give your eyes a 5 minute break',
                'icon': 'js/logo.png'
            }
        }
    },
    isNotificationEnabledBrowser = function() {
        if ('Notification' in window) {
            return true
        } else {
            return false
        }
    },
    currentNotification;
if (isNotificationEnabledBrowser()) {
    var notificationPermisssion = Notification.permission;
    if (notificationPermisssion === 'default') {
        requestPermission();
    } else if (notificationPermisssion === 'granted') {
        setTimeout(
            function() {
                currentNotification = new Notification(messages.hourlyMessage.title, messages.hourlyMessage.options)
                currentNotification.onclose = function() {
                    console.log('On closed')
                }

                currentNotification.onclick = function(event) {
                    console.log('clicked');
                    currentNotification.close();
                }
            }, 5000)
    } else {
        alert('You have disabled notifications for this site')
    }
} else {
    alert('I cannot run on your browser')
}

function requestPermission() {
    Notification.requestPermission(function(optionSelected) {
        if (optionSelected === 'granted') {
            new Notification(messages.postGranted.title, messages.postGranted.options);
        } else if (optionSelected === 'denied') {
            alert('oh no! we cannot help you without notification being enabled!!')
        } else if (optionSelected === 'default') {
            alert('Click allow button to get notifications')
        }
    });
}