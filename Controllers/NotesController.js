const { findByIdAndUpdate } = require('../Models/Notesmodel');
const Note = require('../Models/Notesmodel')

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.id });

        if (notes) {
            return res.status(200).json({ notes, sucess: true })

        }
    } catch (error) {
        return res.status(400).json({ message: error.message, sucess: false });

    }

}

exports.createNote = async (req, res) => {
    const { title, description } = req.body;

    if(title==="" || description===""){
        return res.status(404).json({ message: "enter valid title and description", sucess: false })
    }

    if (!title || !description) {
        return res.status(404).json({ message: "enter valid title and description", sucess: false })
    }
    try {

        const note = await Note.create({
            user: req.id,
            title,
            description
        });
        const notes = await Note.find({ user: req.id });
        notes.push(note)

        return res.status(200).json({ notes, sucess: true })
    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })
    }
}

exports.deleteNote = async (req, res) => {

    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ message: "note not found", sucess: false })
    } else if (note.user.toString() != req.id) {
        return res.status(401).json({ message: "not allowed", sucess: false })

    }

    try {
        await Note.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Deleted sucessfully", sucess: true })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })

    }

}

exports.updateNote = async (req, res) => {

  try {
    if(!req.params.id){
        return res.status(404).json({ message: "note not found", sucess: false })

    }
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ message: "note not found", sucess: false })
    }
    else if (note.user.toString() != req.id) {
        return res.status(401).json({ message: "not allowed", sucess: false })

    }

  

        const { title, description } = req.body;

        if(!title || !description){
        return res.status(200).json({ message: "enter valid title and description", sucess: false })

        }
         await Note.findByIdAndUpdate(req.params.id, { title, description });
        return res.status(200).json({ message: "updated sucessfully", sucess: true })

    } catch (error) {
        return res.status(404).json({ message: error.message, sucess: false })
    }
}