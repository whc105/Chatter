const mongoose = require('mongoose');
const Schema = mongoose.schema;
const IP = process.env.IP || 'localhost';
const mongoURI = `mongodb://${IP}/hw06`;

//Users
const UserSchema = new Schema({
    username: {type: String, unique: true}, //Username and passwords are required for authentication
    password: {type: String, unique: true, required: true}, //Passwords are hashed
    chatrooms: [ Number ], //Stores the list of chat rooms that the user is in
    email: String, //Email for authentication
    permission: Number //User's permission level
});

//Chatroom
const ChatRoomSchema = new Schema({
    name: String, //Stores the chatroom's name
    id: {type: Number, unique: true}, //Chatroom ID. Used for reference in User Schema
    users: [ String ], //List of users in the current chatroom
    messages: [{ //The list of messages that are in the chatroom
        username: String,
        message: String,
        time: Date
    }]
});

//Private messaging with two users
const PrivateRoomSchema = new Schema({
    users: [ String ], //The two users
    messages: [{ //The messages that are in the private chatroom
        username: String,
        message: String,
        time: Date
    }]
});

//Signup requires an unique key.
//When a key is used, it will be deleted.
const KeySchema = new Schema({
    key: {type: String, unique: true}, //Keys are NOT hashed
    type: String //Type of key. Either 'register' or chatroom id
});

//Currently unsure if slugs are necessary

mongoose.model('User', UserSchema);
mongoose.model('Chatroom', ChatRoomSchema);
mongoose.model('Privateroom', PrivateRoomSchema);
mongoose.model('Key', KeySchema);

mongoose.connect(mongoURI);