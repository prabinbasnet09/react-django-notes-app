import { useState } from 'react';
import DisplayNote from '../../components/note';

export default function CreateNote(){

    let [note, setNote] = useState(null)

    return (
        <DisplayNote note = {note} setNote = {setNote} />
    )
}