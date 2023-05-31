const express=require('express')
const { getAllNotes, createNote, deleteNote, updateNote } = require('../Controllers/NotesController')
const { isAuthenticated } = require('../middleware/Auth')
const router=express.Router()


router.route('/fetchallnotes').get(isAuthenticated,getAllNotes)
router.route('/createnote').post(isAuthenticated,createNote)
router.route('/deletenote/:id').delete(isAuthenticated,deleteNote)
router.route('/updatenote/:id').put(isAuthenticated,updateNote)

module.exports=router;