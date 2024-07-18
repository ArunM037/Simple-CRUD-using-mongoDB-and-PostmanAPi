const express = require('express');
const { ObjectId } = require('mongodb');
const { connectTodb, getDb } = require('./db');

// init app & middleware
const app = express();
//middleware
app.use(express.json());

// connect to db
let db;
connectTodb((err) => {
    // This should be 'connectTodb'
    if (!err) {
        app.listen(3000, () => {
            console.log('listening on port 3000');
        });
        db = getDb();
    }
});

//routes
app.get('/manga', (req, res) => {
    //current page
    const page = req.query.p || 0;
    const chapterspervolume = 3;


    let mangas = []
    // get data from db
    db.collection('manga')
        .find()
        .sort({ author: -1 })
        .skip(page * chapterspervolume)
        .limit(chapterspervolume)
        .forEach(manga => mangas.push(manga))
        .then(() => {
            res.status(200).json(mangas)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the data' })
        })

});

app.get('/manga/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('manga')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc)
                } else {
                    res.status(404).json({ error: 'No such document' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the data' })
            })
    } else {
        res.status(500).json({ error: 'Not a Valid Document id ' })
    }
})


// POST route to add a new manga
app.post('/manga', (req, res) => {
    const newManga = req.body;
    db.collection('manga')
        .insertOne(newManga)
        .then(result => {
            res.status(201).json(result); // Return the inserted document
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not create a new document' });
        });
});

app.delete('/manga/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('manga')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete the document' })
            })
    } else {
        res.status(500).json({ error: 'Not a Valid Document id ' })
    }
})

app.patch('/manga/:id', (req, res) => {
    const update = req.body;

    if (ObjectId.isValid(req.params.id)) {
        db.collection('manga')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document' })
            })
    } else {
        res.status(500).json({ error: 'Not a Valid Document id ' })
    }
})
