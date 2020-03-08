// Firebase 

var admin = require("firebase-admin");

var serviceAccount = require("./.env");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://housecal-4ff38.firebaseio.com"
});


let db = admin.firestore();

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const firebase = require('firebase');
const cors = require('cors')
const path = require('path')
const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', (req, res) =>  {
    res.send('Welcome to 2HouseCal!')
});

app.get('/api/users', async (req, res) => {

    let usersRef = db.collection('users');
    let users = [];
    let allUsers = await usersRef.get()
    if (allUsers) {
        allUsers.forEach((doc) => {
            users.push({
                userId: doc.id,
                ...doc.data()
            });
        })
        res.status(200).send(users);
    } else {
        res.status(404).send('Error getting users data');
    }  
});

app.get('/api/children', async (req, res) => {

    let childrenRef = db.collection('children');
    let children = [];
    let allChildren = await childrenRef.get()
    if (allChildren) {
        allChildren.forEach((doc) => {
            children.push({
                childId: doc.id,
                ...doc.data()
            });
        })
        res.status(200).send(children);
    } else {
        res.status(404).send('Error getting children data');
    } 
});












const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${3001}`));