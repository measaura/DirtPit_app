// @flow
import React, {Component} from 'react';
import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';

// Optional flow type
// import type { RemoteMessage } from 'react-native-firebase';


// This is a temporary workaround for the background notification. 
// Will need to remove once updated on the server side.
// bgmessaging will be handled by android_channel_id payload in push notification.

export default async (message: RemoteMessage) => {
    // handle your message
    console.log("bgMessaging RemoteMessage", message);

    // Build a channel
//       const sosChannel = new firebase.notifications.Android.Channel('sos-channel', 'SOS Channel', firebase.notifications.Android.Importance.High)
//           .setDescription('SOS Alert Channel')
//           .setSound('sos.wav');
      const defaultChannel = new firebase.notifications.Android.Channel('default-channel', 'Default Channel', firebase.notifications.Android.Importance.Default)
          .setDescription('Default Notification Channel')
          .setSound('default');

      // Create the channel
      firebase.notifications().android.createChannels(defaultChannel);

    const newNotification = new firebase.notifications.Notification()
        .setNotificationId(message.messageId)
        .setTitle(message.data.title)
        .setBody(message.data.body)
        .setData(message.data)
        .android.setSmallIcon('ic_notif')
        if (message.data.bigpic){
        	newNotification.android.setBigPicture(message.data.bigpic, message.data.lgicon, message.data.title, message.data.bigsummary)
        }
//         .android.setChannelId('default-channel')
        if (Platform.OS === 'android'){
          newNotification
            .setSound('default')
			.android.setChannelId('default-channel');
        } else {
          newNotification
            .setSound('default')
        }

		if (message.data.title === 'RequestMonitor'){
			data = JSON.parse(message.data.body);
			deviceName = data.deviceName;
			requesterEmail = data.requesterEmail;
			newNotification
				.setTitle('Device Manager')
				.setBody(requesterEmail + " is requesting to monitor: " + deviceName)
		}


    if (message.data.title === 'SOS!') {
        if (Platform.OS === 'android'){
          newNotification
            .setSound(sosChannel.sound)
            .android.setChannelId(sosChannel.channelId);
        } else {
          newNotification
            .setSound('sos.wav')
        }

    }else{
        if (Platform.OS === 'android'){
          newNotification
            .setSound('default')
			.android.setChannelId('default-channel')
        } else {
          newNotification
            .setSound('default')
        }
    }

	if(message.data.bigpic) {
		newNotification.android.setBigPicture(message.data.bigpic, message.data.lgicon, message.data.title, message.data.bigsummary);
	}
	if(message.data.lgicon) {
		newNotification.android.setLargeIcon(message.data.lgicon);
	}
	if(message.data.color) {
		newNotification.android.setColor(message.data.color);
	}
  
    console.log("bgMessaging newNotification: ", newNotification)
// 			if ((message.data.title === 'SOS!')||(message.data.title === 'Notification')||(message.data.title === 'Device Manager')||(message.data.title === 'RequestMonitor')) {
            	firebase.notifications().displayNotification(newNotification)
//             }


    return Promise.resolve();
}
