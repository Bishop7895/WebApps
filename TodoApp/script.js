const todosOutput = document.querySelector("#todos-output");

const state = {
  todos: [
    {
      id: 1,
      description: "Learn JS",
      done: false,
    },
    {
      id: 2,
      description: "Learn HTML",
      done: true,
    },
    {
      id: 3,
      description: "Learn CSS",
      done: true,
    },
  ],

  filter: "all",
};

todosOutput.addEventListener("change", updateTodo);

renderTodos();

// State im HTML abbilden
function renderTodos() {
  // Bisherige Liste leeren und bisherige li-Elemente aus <ul> löschen
  todosOutput.innerText = "";

  // Für jedes Todo das HTML erstellen:
  state.todos.forEach(createTodoElement);
}

function createTodoElement(singleTodo) {
  // <li> erstellen
  const listEl = document.createElement("li");

  // <input type='checkbox' />
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "todo-" + singleTodo.id;

  // soll die Checkbox gecheckt werden?
  // Ja, wenn singleTodo.done = true
  checkbox.checked = singleTodo.done;

  // Das singleTodo aus dem State auf dem DOM-Element checkbox zwischenspeichern
  checkbox.todoState = singleTodo;

  // <label>
  const description = document.createElement("label");
  description.htmlFor = checkbox.id;
  description.innerText = singleTodo.description;

  // input und label zu li hinzufügen
  listEl.appendChild(checkbox);
  listEl.appendChild(description);

  // li an das ul anhängen
  todosOutput.appendChild(listEl);
}

// Neues Todo zum State hinzufügen und neuen State rendern

// Todos filtern (nach open, done, all)

// Fertigen Todos löschen

// Aktualisieren von Todo
function updateTodo(event) {
  const checkbox = event.target;
  const checkedTodo = checkbox.todoState;

  // Gechecktes Todo aus dem State updaten
  checkedTodo.done = checkbox.checked;
}
