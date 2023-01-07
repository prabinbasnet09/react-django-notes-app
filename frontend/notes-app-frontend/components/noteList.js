import Date from "./date";
import Link from "next/link";
import listStyles from '../styles/NotesList.module.css';

let getContent = (body) => {

    if(body.length > 50){
      return body.slice(0, 50) + '...'
    }

  return body
}

export default function NoteList({note}){
  let {id, title, body, updated} = note;
    return(
    <div className={listStyles.notesListItem}>
      <b>{title}</b>
      <br />
      <Date dateString={updated} /> - &nbsp;{getContent(body)}
    </div>
    )
}