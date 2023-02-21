
const { Notification } = require('../models');
const userService = require('./user.service')
const admin = require("firebase-admin");
// NOTIFICATION

const createNotificationToken = async (request) => {
    return await Notification.create(request)
};

const getNotificationById = async (token) => {
    return await Notification.find({ token: token })
};

const oneToManyNotification = async (request) => {
    // const { title, body, data, sender } = request;
    const user = await userService.getAllUsers()
    const tokenArray = []
    console.log(tokenArray)
    for (var a = 0; a < user.length; a++) {
        if (user[a].token !== undefined) {
            tokenArray.push(user[a].token)
        }
    }

    console.log("tokenArray ", tokenArray)
    // const message = {
    //     notification: {
    //         title: title,
    //         body: body,
    //         imageUrl: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
    //     },
    //     data: data,
    //     tokens: tokenArray,
    //     apns: {
    //         payload: {
    //             aps: {
    //                 "mutable-content": 1,
    //             },
    //         },
    //         fcm_options: {
    //             image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
    //         },
    //     },
    //     android: {
    //         notification: {
    //             image: "https://i.ibb.co/vcw7Nbw/politic-Icon.png",
    //         },
    //     },
    // };
    // try {
    //     const response = await admin.messaging().sendMulticast(message)
    //     const notification = await Notification.insertMany(selectedUsers);
    // }
    // catch (err) {
    //     console.log(err)
    // }

};


module.exports = {
    createNotificationToken,
    getNotificationById,
    oneToManyNotification
};