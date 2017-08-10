

function post(req, res, db) {
    // You'll create your note here.
    console.log(req.body);
    res.send('Hello');
}

function getUser(req, res, db) {

}

module.exports = function(app, db) {
    app.post('/users', post);
    app.get('/users', (req, res) => {
        console.log(req.body);
        db.collection('collection').findOne({}, (err, doc) => {
            const jsonString = JSON.stringify(doc);
            console.log(jsonString);
            res.json(doc);
        });
    });
};