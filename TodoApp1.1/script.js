let state = {
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
  ],

  filter: "all",
};

const todosOutput = document.querySelector("#todos-output");
const filtersWrapper = document.querySelector("#filters-wrapper");
const btnAdd = document.querySelector("#btn-add");
const btnRemove = document.querySelector("#remove-btn");

todosOutput.addEventListener("change", updateTodo);

renderTodos();

function removeDoneTodos(state) {
  const updatedTodos = state.todos.filter((todo) => !todo.done);
  return {
    ...state,
    todos: updatedTodos,
  };
}

btnRemove.addEventListener("click", function (event) {
  event.preventDefault();
  state = removeDoneTodos(state);
  renderTodos();
});

btnAdd.addEventListener("click", function (event) {
  // Neuladen der Seite vermeiden
  event.preventDefault();

  // Input-Feld
  const todoInput = document.querySelector("#description");
  // Wert aus dem Input-Feld in description speichern
  const todoDescription = todoInput.value;

  // Wenn description leer ist, Funktion beenden
  if (todoDescription.length === 0) return;

  const newTodo = {
    id: crypto.randomUUID(),
    description: todoDescription,
    done: false,
  };

  // Neues Todo in den State hinzufügen
  state.todos.push(newTodo);

  // State wurde verändert, also neuen veränderten State ausgeben
  renderTodos();
});

filtersWrapper.addEventListener("change", function (event) {
  state.filter = event.target.id; // "all", "open" od. "done"

  if (state.filter === "all") {
    // Wenn "all" ausgewählt ist: Gesamten State (alle Todos) rendern
    renderTodos();
    return;
  }

  if (state.filter === "open") {
    // Wenn "open" ausgewählt ist: Nur Todos rendern, die "done: false" haben
    const openTodos = state.todos.filter(function (singleTodo) {
      return singleTodo.done === false;
    });

    // Render-Funktion aufrufen und die open Todos reingeben zum Rendern
    renderTodos(openTodos);
    return;
  }

  if (state.filter === "done") {
    // Wenn "done" ausgewählt ist: Nur Todos rendern, die "done: true" haben
    const doneTodos = state.todos.filter(function (singleTodo) {
      return singleTodo.done === true;
    });

    // Render-Funktion aufrufen und die fertigen Todos reingeben zum Rendern
    renderTodos(doneTodos);
    return;
  }
});

function renderTodos(todos = state.todos) {
  todosOutput.innerText = "";

  // Unsere Todos aus dem State auf der Website ausgeben
  todos.forEach(function (singleTodo) {
    // Für jedes Todo ein li erstellen mit document.createElement()
    const listEl = document.createElement("li");

    // In das li kommen eine Checkbox und ein Label
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "todo-" + singleTodo.id;
    checkbox.checked = singleTodo.done;
    checkbox.todoState = singleTodo;

    const description = document.createElement("label");
    // htmlFor verweist auf die Checkbox-Id, damit Checkbox und Label verknüpft sind
    description.htmlFor = checkbox.id;
    // Text vom Label ist die Todo-Description
    description.innerText = singleTodo.description;

    // checkbox und label an das li hängen
    listEl.append(checkbox, description);

    // dieses li ans ul hängen
    todosOutput.append(listEl);
  });
}
function updateTodo(event) {
  const checkbox = event.target;
  const checkedTodo = checkbox.todoState;

  // Gechecktes Todo aus dem State updaten
  checkedTodo.done = checkbox.checked;
}
