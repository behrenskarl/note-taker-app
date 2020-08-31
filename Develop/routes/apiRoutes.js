const fs = require("fs");
const path = require("path");
const notesdb = require(path.join(__dirname, '../db/db.json'));



module.exports = function(app) {

    //gets notes array from db.json file upon app loading
    app.get('/api/notes', function(req, res) {
        return res.json(notesdb);
    });

    //gives notes an id via math.random
    function giveID() {

        let i = Math.floor(Math.random() * 1000); 
        notesdb.map(n => {
            n['id'] = i;
            i++;
            
            console.log('giving api calls an id: ', notesdb);
            console.log('---------');
        });
    };
    //creates new note and pushes it to db.json file, calls giveID function to assign ID
    app.post('/api/notes', function(req, res) {  

        const note = req.body;

        notesdb.push(note);
        res.json(note);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(notesdb), null, 2
        );
        giveID();
        console.log('api post note: ', notesdb);
        console.log('---------');


    });


//api delete based on id assigned to each note using the splice() function 
    app.delete('/api/notes/:id', function (req, res) {
        let grabID = req.params.id;
        console.log('grabID: ', grabID)
        console.log('---------');

        function deleteID() {
            for (let j = 0; j < notesdb.length; j++) {
                if (notesdb[j].id == grabID) {
                    notesdb.splice(j, 1);
                    fs.writeFileSync(
                        path.join(__dirname, '../db/db.json'),
                        JSON.stringify(notesdb), null, 2
                    );
                    console.log('deletes note: ', notesdb)
                    console.log('--------');
                     
                }
            }
        }
        deleteID();
        res.json(notesdb);
        console.log('json after delete: ', notesdb);
        console.log('--------');
    });
};