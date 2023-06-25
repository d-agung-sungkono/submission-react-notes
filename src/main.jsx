import React from 'react'
import ReactDOM from 'react-dom/client'
import NoteApp from './components/NoteApp'
import './styles/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
)
