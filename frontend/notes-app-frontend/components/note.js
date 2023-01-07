import { useRouter } from 'next/router';
import noteStyles from '../styles/Note.module.css';
import styles from '../styles/Home.module.css';

export default function DisplayNote({note, setNote}){
    let router = useRouter()

    let handleSubmit = (value, attr) => {
        if(attr === "title"){
            setNote(note => ({
                ...note,
                title: value
            }))
        }
        else{
            setNote(note => ({
                ...note,
                body: value
            }))
        }
    }

    let updateNote = async () => {
        await fetch(`http://127.0.0.1:8000/notesApp/notes/${note.id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:8000/notesApp/notes/${note.id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        router.push('/')
    }
    
    let createNote = async () => {
        if(note.title && note.body){
            await fetch(`http://127.0.0.1:8000/notesApp/notes/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" ,
                },
                body: JSON.stringify(note)
            })
        }
    }
    
    let handleChange = () => {
        if(note?.id){
            updateNote()
        }
        else if(note && (note.title && note.body)){
            createNote()
        }
        router.push('/')
    }

return(
        <div className={noteStyles.noteContainer}>
            <div className={noteStyles.note}>
                <div className={noteStyles.noteHeader}>

                        <input  onChange={(e) => handleSubmit(e.target.value, "title")} 
                                type="text" 
                                name="title" 
                                defaultValue={note?.title}
                                placeholder = "Title"
                                maxlength="50" />

                    <button type="button" onClick={handleChange}>Back</button>

                    {
                        (note?.id)?
                        <button onClick={deleteNote}>Delete</button> :
                        <button onClick={handleChange}>Done</button>
                    }
                
                </div>
                
                <textarea   onChange={(e) => handleSubmit(e.target.value, "body")} 
                            value={note?.body}></textarea>    
            </div>
            
        </div>
    )
}