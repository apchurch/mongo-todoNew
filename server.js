var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')

var MongoClient = mongo.MongoClient
ObjectID = mongo.ObjectID

MongoClient.connect('mongodb://localhost:27017/todo-app', function(err, db){


    app.use(express.static('./'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/', function(req, res){
        res.sendFile('./index.html', {root: './'})
    })

    app.post('/item', function(req, res){
        req.body['todo-things'] = parseInt(req.body['todo-things'])
        db.collection('items').insert(req.body, function(err){
            console.log(err)
            res.send({success:'success!'})
        })
    })

    // use different HTTP verbs for different actions we want to take on our database
    app.get('/item', function(req, res){
        db.collection('items').find({}).toArray(function(err, docs){
            console.log(err)
            res.send(docs)
        })
    })

    app.post('/item', function(req, res){
        console.log('thing-todo ', req.body)
        db.collection('items').updateMany(
            {'item-stuff': req.body['item-stuff'] },
            {$inc: {'todo-things': 1}},
            function(err){
                console.log(err)
                res.send({success:'success!'})
            }
        )
    })

    app.listen(8080)

})

    