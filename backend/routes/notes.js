require("dotenv").config();

// packages
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const fetchUsers = require("../middleware/fetchUsers");
const Notes = require("../models/Notes")

//------> #1. Fetch all notes of the user with it's auth-token on GET request with "/api/notes/fetchAllNotes" *Login required
router.get("/fetchAllNotes", fetchUsers, async (req, res) => {
     try {
          const findNotes = await Notes.find({ user: req.user.id });
          res.status(200).json(findNotes);

     } catch (error) {
          console.error("Error fetching notes:", error);
          res.status(500).json({ error: "Internal server error" });
     }

});



//-----> #2. Adding a note of the user POST request on "/api/notes/addnote" *Login required
// error messages
const addNoteChecks = [
     body("title", "title should atleast 5 characters").isLength({ min: 5 }),
     body("description", "description should atleast 10 characters").isLength({ min: 10 }),
];

router.post("/addnote", fetchUsers, addNoteChecks, async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          // If the error happens in entering values then send error message
          return res.status(400).json({ errors: errors.array() });
     };

     const { title, description, tags } = req.body;

     try {
          const createdNote = {
               user: req.user.id,
               title: title,
               description: description,
               tags: tags
          };
          // Adding the note of user
          const createNote = await Notes.create(createdNote);

          res.status(200).json({ sucess: "Your todo is added sucessfully.. !", createNote });

     } catch (error) {
          res.status(501).json({ error: `Error happens while adding note.. with: ${error}` });
     }


});



//-----> #3. Updating a note of  the user on PUT request on "/api/notes/updatenote" *Login required
// error messages
const updateNoteChecks = [
     body("title", "title should atleast 5 characters").isLength({ min: 5 }),
     body("description", "description should atleast 10 characters").isLength({ min: 10 }),
];
router.put("/updatenote/:id", fetchUsers, updateNoteChecks, async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          // If the error happens in entering values then send error message
          return res.status(400).json({ errors: errors.array() });
     };

     const { title, description, tags } = req.body;
     const newNote = {};

     if (title) {
          newNote.title = title
     };
     if (description) {
          newNote.description = description
     };
     if (tags) {
          newNote.tags = tags
     };

     try {

          const findedNote = await Notes.findById(req.params.id);
          // If the note will not available then send error message
          if (!findedNote) {
               res.status(401).send("Not found");
               return;
          }

          // If the user want's to acces the note of other user then
          if (findedNote.user.toString() !== req.user.id) {
               res.status(401).send("Not allowed... !");
               return;
          }

          await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
          // sending the sucess message
          res.status(200).json({ sucess: "Your note is updated sucessfully..", newNote })


     } catch (error) {
          res.status(500).json({ error: "Not Found" });
     }
});



//-----> #4. Deleting a note of  the useron Delete request on "/api/notes/deletenote" *Login required
router.delete("/deletenote/:id", fetchUsers, async (req, res) => {

     try {
          const findedNote = await Notes.findById(req.params.id);
          // If the note will not available then send error message
          if (!findedNote) {
               res.status(401).send("Not found");
               return;
          }

          // If the user want's to delete note if the not is it's own
          if (findedNote.user.toString() !== req.user.id) {
               res.status(401).send("Not allowed... !");
               return;
          }

          // Deleting the note
          await Notes.findByIdAndDelete(req.params.id);

          res.status(200).json({ sucess: "Your note is Deleted sucessfully.." })


     } catch (error) {
          console.error("Error deleting note:", error);
          res.status(500).json({ error: "Internal server error" });
     }
});




module.exports = router;