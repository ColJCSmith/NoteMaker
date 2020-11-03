const express = require("express");
const path = require("path");
const app = express();
const PORT = 2000;
const fs = require("fs");
const DBnotes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes.html", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(DBnotes);
});

app.post("/api/notes", function (req, res) {

    var newNote = req.body
    newNote.id = Date.now()
    console.log(newNote);

    DBnotes.push(newNote);

    res.json(newNote);
});


app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});

app.delete("/api/notes/:id", function (req, res) {
    console.log("trying to delete" + req.params.id);
    const indexToDelete = DBnotes.findIndex(function (currentNote) {
        if (currentNote.id == req.params.id)
            return true

        else
            return false
    });
    DBnotes.splice(indexToDelete, 1);
    return res.json(DBnotes);
})