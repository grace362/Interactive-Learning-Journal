const form = document.getElementById('journalForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const entriesContainer = document.getElementById('entriesContainer');

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entriesContainer.innerHTML = '';
  entries.forEach((entry, index) => {
    const entryEl = document.createElement('div');
    entryEl.className = 'entry';
    entryEl.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.content}</p>
      <button class="delete-btn" onclick="deleteEntry(${index})">X</button>
    `;
    entriesContainer.appendChild(entryEl);
  });
}

function saveEntry(title, content) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries.push({ title, content });
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  loadEntries();
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  loadEntries();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (title && content) {
    saveEntry(title, content);
    titleInput.value = '';
    contentInput.value = '';
  }
});

window.onload = loadEntries;