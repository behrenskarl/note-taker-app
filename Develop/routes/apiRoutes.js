const fs = require("fs");
const path = require("path");
const notesdb = require(path.join(__dirname, '../db/db.json'));

//assigns id to notesdb array
let i = Math.random();
notesdb.map(n => {
    n['id'] = i;
    i++;
});

module.exports = function (app) {

    app.get('/api/notes', function (req, res) {
    res.json(notesdb);
    });


    app.post('/api/notes', function (req, res) {  
    //res.json(db); might not be what's needed here
        const note = req.body;

        notesdb.push(note);
        res.json(note);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(notesdb)    
        );
    });

//API PUT TO ADD ID TO NOTES BEFORE DELETE
//add id to json array, math.random 



//API DELETE BASED ON /api/notes/:id
    app.delete('/api/notes:id', function (req, res) {
        notesdb.delete(req.body.id);
        res.json(notesdb);
    });

//   app.post('/api/clear', function (req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
};