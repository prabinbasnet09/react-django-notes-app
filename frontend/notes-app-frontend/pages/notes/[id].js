import { getAllNotesID } from '../../lib/notes';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export async function getStaticPaths(){
    const paths = await getAllNotesID();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}){
    const res = await fetch(`http://127.0.0.1:8000/notesApp/notes/${params.id}`)
    const getNote = await res.json()

    return {
        props: {
            getNote
        },
    }
}

export default function Note({ getNote }){
    let router = useRouter()
    let [note, setNote] = useState(getNote)
    
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
    }
    
    let handleChange = () => {
        if(note.body !== ""){
            updateNote()
        }
        else{
            deleteNote()
        }
        router.push('/')
    }

    return (
        <div>
            <button type="button" onClick={handleChange}>Back</button>
            <input onChange={(e) => handleSubmit(e.target.value, "title")} type="text" name="title" defaultValue={note.title}></input>
            <textarea onChange={(e) => handleSubmit(e.target.value, "body")} value={note.body}></textarea> 
        </div>
    )
}