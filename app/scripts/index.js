const anotaciones = document.getElementById("text-el");
const saveBtn = document.getElementById("save-btn");
const selectTareas = document.getElementById("selected-btn");
const selectAll = document.getElementById("select-all");
const listaAnotaciones = document.getElementById("ul-el");
const downloadBtn = document.getElementById("download");
const notes = JSON.parse(localStorage.getItem("notes")) || [];

render(notes);
//funcion para guardar una tarea
saveBtn.addEventListener("click", function() {
    const note = anotaciones.value.trim();
    if (note) {
        notes.push({ text: note, checked: false });
        anotaciones.value = "";
        updateLocalStorage();
        render(notes);
    }
});
// Funcion para seleccionar todas las tareas
selectAll.addEventListener("click", function() {
    notes.forEach(note => note.checked = true);
    updateLocalStorage();
    render(notes);
});

// Funcion para eliminar las tareas seleccionadas
selectTareas.addEventListener("click", function() {
    const newNotes = notes.filter(note => !note.checked);
    notes.length = 0;
    notes.push(...newNotes);
    updateLocalStorage();
    render(newNotes);
});


downloadBtn.addEventListener("click", function() {
    downloadNotes();
});

// Funcion para renderizar las notas
function render(notas) {
    listaAnotaciones.innerHTML = "";  
    for (let i = 0; i < notas.length; i++) {
        const li = document.createElement("li");
        const label = document.createElement("label");
        label.className = "checkbox-button";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = notas[i].checked;
        checkbox.addEventListener("change", function() {
            notas[i].checked = this.checked;
            span.className = this.checked ? 'terminado' : '';
            updateLocalStorage();
        });

        const span = document.createElement("span");
        span.textContent = notas[i].text;
        span.className = notas[i].checked ? 'terminado' : '';

        label.appendChild(checkbox);
        label.appendChild(span);
        li.appendChild(label);
        listaAnotaciones.appendChild(li);
    }
}
// funcion para actualizar el local Storage
function updateLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
// funcion para descargar la lista actual en un txt

function downloadNotes() {
    const data = notes.map(note => `${note.checked ? '[x]' : 'Tarea: '} ${note.text}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}