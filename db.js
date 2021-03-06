const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const IP = process.env.IP || 'localhost';
const mongoURI = require('./config/config').KEYS.mongoURI;

const connection = mongoose.createConnection(mongoURI);

//Users
const UserSchema = new Schema({
    username: {type: String, unique: true}, //Username and passwords are required for authentication
    password: {type: String, unique: true, required: true}, //Passwords are hashed
    chatrooms: [ Number ], //Stores the list of chat rooms that the user is in
    email: String, //Email for authentication
    permission: Number //User's permission level. If no key is entered, it will be a student.
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
    }],
    createdBy: String
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
//Only System admins can generate admin keys
const KeySchema = new Schema({
    key: {type: String, unique: true}, //Keys are NOT hashed
    type: String, //Type of key. Either 'register' or chatroom id
    uses: Number //Number of uses for the key
});

mongoose.model('User', UserSchema);
mongoose.model('Chatroom', ChatRoomSchema);
mongoose.model('Privateroom', PrivateRoomSchema);
mongoose.model('Key', KeySchema);

mongoose.connect(mongoURI);

autoIncrement.initialize(connection);

ChatRoomSchema.plugin(autoIncrement.plugin, {model: 'Chatroom', field: 'id'});