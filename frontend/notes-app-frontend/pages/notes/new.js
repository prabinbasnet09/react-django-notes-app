import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateNote(){

    let [note, setNote] = useState(null)
    const router = useRouter()

    let handleChange = (value, att) => {
        if(att === "title"){
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

        router.push('/')
    }

    return (
        <div>
            <input onChange={(e) => (handleChange(e.target.value, "title"))} type="text" name="title" required></input>
            <textarea onChange={(e) => (handleChange(e.target.value, "body"))} value={note?.body}></textarea>
            <button onClick={createNote}>Done</button>
        </div>
    )
}