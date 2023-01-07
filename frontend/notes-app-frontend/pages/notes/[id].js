import { getAllNotesID } from '../../lib/notes';
import { useState } from 'react';
import DisplayNote from '../../components/note';

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
    let [note, setNote] = useState(getNote)

    return (
        <DisplayNote note = {note} setNote = {setNote} />
    )
}