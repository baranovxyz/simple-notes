const notesEl = document.querySelector('#notes');
const filterEl = document.querySelector('#filter');

function Note(note) {
  const { title, text } = note;

  return `
        <div class='Note'>
            <div class='Note-Title'>
                ${title}
            </div>
            <div class='Note-Text'>
                ${text}
            </div>
        </div>
    `;
}

let notes = [];

function render() {
  const filter = filterEl.value.trim();

  const filteredNotes = notes.filter(note => {
    if (!filter) return true;

    return note.title.includes(filter) || note.text.includes(filter);
  });

  notesEl.innerHTML = filteredNotes.map(Note).join('');
}

// if you use keypress or keydown, than we don't have a value in input yet
filterEl.addEventListener('keyup', render);

fetch('src/notes.json')
  .then(response => response.json())
  .then(_notes => (notes = _notes))
  .then(render)
  .catch(e => console.error(e));
