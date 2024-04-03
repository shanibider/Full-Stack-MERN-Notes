import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../RecordList.module.css"; 

import NoteForm from "./NoteForm";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

    // This method fetches the notes from the database.
  useEffect(() => {
    async function getNotes() {
      const response = await fetch(`http://localhost:5050/note/`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const notes = await response.json();
      setNotes(notes);
    }
    getNotes();
  }, []);

    // This method will delete a note
  function deleteNote(id) {
    fetch(`http://localhost:5050/note/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newNotes = notes.filter((el) => el._id !== id);
      setNotes(newNotes);
    });
  }

    // This method will map out the notes on the table
  function renderNotes() {
    return notes.map((note) => (
      <NoteForm
        key={note._id}
        note={note}
        deleteNote={deleteNote}
      />
    ));
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Notes</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderNotes()}</tbody>
      </table>
    </div>
  );
};

export default NoteList;
