document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('year').textContent = new Date().getFullYear();
    loadNotes();
});

function saveNote() {
    const noteTitle = document.getElementById('note-title').value;
    const noteInput = document.getElementById('note-input').value;

    if (noteTitle && noteInput) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ title: noteTitle, text: noteInput });
        localStorage.setItem('notes', JSON.stringify(notes));

        document.getElementById('note-title').value = '';
        document.getElementById('note-input').value = '';
        loadNotes();
    }
}

function loadNotes() {
    const savedNotesDiv = document.getElementById('saved-notes');
    savedNotesDiv.innerHTML = '';

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        const noteTitleElement = document.createElement('div');
        noteTitleElement.className = 'note-title';
        noteTitleElement.textContent = note.title;

        const noteTextElement = document.createElement('div');
        noteTextElement.className = 'note-text';
        noteTextElement.textContent = note.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        noteElement.appendChild(noteTitleElement);
        noteElement.appendChild(noteTextElement);
        noteElement.appendChild(deleteButton);
        savedNotesDiv.appendChild(noteElement);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));

    loadNotes();
}
