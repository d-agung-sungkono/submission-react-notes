import React from 'react';
import NoteList from './NoteList';
import { getInitialData } from '../utils/data';
import NoteFormInput from './NoteFormInput';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchingText: ''
    }
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchingTextChangeEventHandler = this.onSearchingTextChangeEventHandler.bind(this);
  }
  
  onArchiveNoteHandler(id) {
    const noteIndex = this.state.notes.findIndex((note) => note.id === id);
    const tmpDuplicateNotes = [...this.state.notes];
    tmpDuplicateNotes[noteIndex].archived = !tmpDuplicateNotes[noteIndex].archived;
    this.setState(() => {
      return {
        notes: [
          ...tmpDuplicateNotes
        ]
      }
    });
  }

  onDeleteNoteHandler(id) {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    const d = new Date();
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: prevState.notes.length+1,
            title,
            body,
            archived: false,
            createdAt: d.toString(),
          }
        ]
      }
    });
  }

  onSearchingTextChangeEventHandler(event) {
    this.setState(() => {
      return {
        searchingText: event.target.value
      }
    });
  }

  _prepareUnarchivedNotes(){
    const unarchivedNotes = this.state.notes.filter((note) => (!note.archived))
    if(this.state.searchingText == ''){
      return unarchivedNotes
    } else {
      const searchingText = this.state.searchingText;
      const filteredUnarchivedNotes = unarchivedNotes.filter((unarchiveNote) => unarchiveNote.title.toLowerCase().indexOf(searchingText.toLowerCase()) > -1)
      return filteredUnarchivedNotes
    }
  }

  _prepareArchivedNotes(){
    const archivedNotes = this.state.notes.filter((note) => (note.archived))
    return archivedNotes;
  }
  
  render() {
    const noData = <h3>Tidak ada catatan</h3>
    const unarchivedNotes = this._prepareUnarchivedNotes()
    const archivedNotes = this._prepareArchivedNotes()
    let unarchivedNotesList;
    let archivedNotesList;

    if(unarchivedNotes.length > 0){
      unarchivedNotesList = <NoteList notes={unarchivedNotes} onDelete={this.onDeleteNoteHandler} onArchive={this.onArchiveNoteHandler} />
    } else {
      unarchivedNotesList = noData
    }

    if(archivedNotes.length > 0){
      archivedNotesList = <NoteList notes={archivedNotes} onDelete={this.onDeleteNoteHandler} onArchive={this.onArchiveNoteHandler} />
    } else {
      archivedNotesList = noData
    }
    
    return (
      <div className="note-app">
        <h1>My Notes</h1>
        <h2>Tambah Catatan</h2>
        <NoteFormInput addNote={this.onAddNoteHandler} />
        <h2>Daftar Catatan</h2>
        <form className='note-input'>
          <label>Cari:</label>
          <input type="text" placeholder="Tuliskan Judul" value={this.state.searchingText} onChange={this.onSearchingTextChangeEventHandler} />
        </form>
        {unarchivedNotesList}
        <h2>Daftar Arsip</h2>
        {archivedNotesList}
      </div>
    );
  }
}

export default NoteApp;