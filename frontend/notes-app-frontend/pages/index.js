import Head from 'next/head';
import Link from 'next/link';
import LoginPage from './notes/login';
import NoteList from '../components/noteList';
import styles from '../styles/Home.module.css';
import listStyles from '../styles/NotesList.module.css';

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
  return (
    <div className={styles.container}>
      <Head>
        <title>Notes App</title>
      </Head>
      <div className={styles.app}>
        
        <div className={styles.appHeader}>
          <h1 className={styles.appTitle}>Notes List</h1>
          <div>
            <Link href={`notes/new`}>
              <button className={styles.button}>+</button>
            </Link>
          </div>
        </div>

        <section className={listStyles.notes}>
          <div className={listStyles.notesHeader}>
            <h1 className={listStyles.notesTitle}>&#9782; Notes</h1>
            <p className={listStyles.notesCount}>{getAllNotes.length}</p>
          </div>
          <div className={listStyles.notesList}>
          
            <ul style={{listStyleType: "none"}}>
            {getAllNotes.map((note) => (
              <Link href={`notes/${note.id.toString()}`} key={note.id}>
                <li key={note.id}>
                <NoteList note={note} />
                </li>
              </Link>
              ))} 
            </ul>
          </div>
        </section>

        {/* <div className={listStyles.floatingButton}>
          <Link href={`notes/new`}>
            <button>+</button>
          </Link>
        </div> */}

      </div>
    </div>
  );
}