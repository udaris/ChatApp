import Firebase from './firebaseConfig';
import moment from "moment";

export const SendMeassage = (currentUid, geustUid, message, imgSource) => {
    var todayDate=moment();
    try {
        return Firebase.database()
            .ref('messages/' + currentUid)
            .child(geustUid)
            .push({
                message: {
                    sender: currentUid,
                    receiver: geustUid,
                    msg: message,
                    image:imgSource,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A ')
                },

            });
    } catch (error) {
        return error;
    }
}


export const ReceiveMeassage = (currentUid, geustUid, message,imgSource) => {
    try {
        var todayDate=moment();
        return Firebase.database()
            .ref('messages/' + geustUid)
            .child(currentUid)
            .push({
                message: {
                    sender: currentUid,
                    receiver: geustUid,
                    msg: message,
                    image:imgSource,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A ')
                }
            });
    } catch (error) {
        return error;
    }
}