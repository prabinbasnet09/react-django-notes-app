import Head from 'next/head';
import Date from '../components/date';
import Link from 'next/link';
import { useEffect } from 'react'

export async function getStaticProps(){
  const res = await fetch('http://127.0.0.1:8000/notesApp/notes');
  const getAllNotes = await res.json(); 

  return {
      props: {
        getAllNotes,
      }
    }
}

export default function Home({ getAllNotes }){
  
  // useEffect
  return (
    <>
      <Head>
        <title>Notes App</title>
      </Head>
      <div>
        <div>
          <h1>Notes List</h1>
        </div>

        <section>
          <p>&#9782; Notes</p>
          <p>{getAllNotes.length}</p>
         
          <ul style={{listStyleType: "none"}}>
          {getAllNotes.map(({id, title, body, updated}) => (
            
            <li key={id}>
              <Link href={`notes/${id.toString()}`}>
                <b>{id} - {title}</b>
                <br />
                <Date dateString={updated} /> - &nbsp;{body}
              </Link>
              <br /> <br />
            </li>

            ))} 
          </ul>
        
        </section>

        <div>
          <Link href={`notes/new`}>
            <button>+</button>
          </Link>
        </div>

      </div>
    </>
  );
}