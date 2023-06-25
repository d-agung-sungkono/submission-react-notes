import React from 'react';
import NoteItemBody from './NoteItemBody';
import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';

function NoteItem({ title, body, createdAt, id, archived, onDelete, onArchive }) {
  return (
    <div className="note-item">
      <NoteItemBody title={title} body={body} createdAt={createdAt} />
      <DeleteButton id={id} onDelete={onDelete} />
      <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
    </div>
  );
}

export default NoteItem;
