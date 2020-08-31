const fs = require("fs");
const path = require("path");
const notesdb = require(path.join(__dirname, '../db/db.json'));

//assigns id to notesdb array


module.exports = function(app) {


    app.get('/api/notes', function(req, res) {
        res.json(notesdb);
        console.log('api get notes');
    });


    app.post('/api/notes', function(req, res) {  
    //res.json(db); might not be what's needed here
        let i = Math.floor(Math.random() * 1000); 
        notesdb.map(n => {
            n['id'] = i;
            i++;
            console.log('giving api calls an id')
        });
    
        const note = req.body;



        notesdb.push(note);
        res.json(note);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(notesdb), null, 2
        );
        console.log('api post note');


    });

//API PUT TO ADD ID TO NOTES BEFORE DELETE
//add id to json array, math.random 



//API DELETE BASED ON /api/notes/:id
    app.delete('/api/notes/:id', function (req, res) {
        let grabID = req.params.id;
        console.log(grabID);

        function deleteID() {
            for (let j = 0; j < notesdb.length; j++) {
                if (notesdb[j].id = grabID) {
                    notesdb.splice(j, 1);
                    console.log(notesdb.id);
                    fs.writeFileSync(
                        path.join(__dirname, '../db/db.json'),
                        JSON.stringify(notesdb), null, 2
                    );
                    
                     
                }
            }
        }
        deleteID();
        res.json(notesdb);
        console.log(notesdb);
    });
};