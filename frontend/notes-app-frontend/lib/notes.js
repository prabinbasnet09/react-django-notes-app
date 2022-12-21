export async function getAllNotesID(){
    const res = await fetch('http://127.0.0.1:8000/notesApp/notes')
    const getAllNotes = await res.json()

    return getAllNotes.map(({id}) => {
        return {
            params: {
                id: id.toString(),
            },
        }
    })
}