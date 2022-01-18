const { MongoClient, ObjectId } = require('mongodb');
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "blog";

const usersData = [
    {
        _id: ObjectId("61e6b7b539f52bd9f3004f0c"),
        name: "Max",
        email: "test1@gmail.com"
    }, {
        _id: ObjectId("61e6b7b539f52bd9f3004f0d"),
        name: "Timmy",
        email: "test2@gmail.com"
    }
];

const postsData = [
    {
        title: "Lorem ipsum, dolor",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus doloremque esse id quidem, possimus quis eos, pariatur doloribus quo quas nesciunt consequuntur! Quibusdam rem dolores, debitis fugiat totam assumenda voluptates.",
        tags: ["bla", "aaa"],
        owner: ObjectId("61e6b7b539f52bd9f3004f0c"),
        comments: [{commentId: ObjectId("61e6b7b539f52bd9f3004f09")}, {commentId: ObjectId("61e6b7b539f52bd9f3004f0a")}]
    },
    {
        title: "Lorem ipsum, dolor",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus doloremque esse id quidem, possimus quis eos, pariatur doloribus quo quas nesciunt consequuntur! Quibusdam rem dolores, debitis fugiat totam assumenda voluptates.",
        tags: ["bla", "aaa"],
        owner: ObjectId("61e6b7b539f52bd9f3004f0d"),
        comments: [{commentId: ObjectId("61e6b7b539f52bd9f3004f0b")}]
    }
];

const commentsData = [
    {
        _id: ObjectId("61e6b7b539f52bd9f3004f09"),
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus doloremque esse id quidem, possimus quis eos, pariatur doloribus quo quas nesciunt consequuntur! Quibusdam rem dolores, debitis fugiat totam assumenda voluptates.",
        owner: ObjectId("61e6b7b539f52bd9f3004f0c"),
    },
    {
        _id: ObjectId("61e6b7b539f52bd9f3004f0a"),
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus doloremque esse id quidem, possimus quis eos, pariatur doloribus quo quas nesciunt consequuntur! Quibusdam rem dolores, debitis fugiat totam assumenda voluptates.",
        owner: ObjectId("61e6b7b539f52bd9f3004f0c"),
    },
    {
        _id: ObjectId("61e6b7b539f52bd9f3004f0b"),
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus doloremque esse id quidem, possimus quis eos, pariatur doloribus quo quas nesciunt consequuntur! Quibusdam rem dolores, debitis fugiat totam assumenda voluptates.",
        owner: ObjectId("61e6b7b539f52bd9f3004f0d"),
    }
];

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    db.collection('users').insertMany([usersData[0], usersData[1]], (error, result) => {
        if (error) {
            return console.log('Unable to insert  the users into the database!');
        }
        console.log(result);
    });

    db.collection('posts').insertMany([postsData[0], postsData[1]], (error, result) => {
        if (error) {
            return console.log('Unable to insert  the post into the database!');
        }
        console.log(result);
    });

    db.collection('comments').insertMany([commentsData[0], commentsData[1], commentsData[2]], (error, result) => {
        if (error) {
            return console.log('Unable to insert  the comment into the database!');
        }
        console.log(result);
    });

});