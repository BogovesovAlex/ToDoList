let todoForm = document.querySelector("#todo-form"),
  addMessage = document.querySelector(".massage"),
  addButton = document.querySelector(".add"),
  todo = document.querySelector("#todo-list"),
  todoBut = document.querySelector("#todo-but");

let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!addMessage.value) return;

  for (let x of todoList) {
    if (x.todoText === addMessage.value) return;
  }

  let newTodo = {
    id: "",
    todoText: addMessage.value,
    checked: false,
    change: false,
    idCheck: '',
    idEditText: '',
  };
  todoList.push(newTodo);
  displayMessages();

  addMessage.value = "";
  addMessage.focus();
  localStorage.setItem("todo", JSON.stringify(todoList));
});

function displayMessages() {
  let displayMessage = "";

  if (todoList.length === 0) {
    todo.innerHTML = "";
    return;
  }

  todoList.forEach(function (item, i) {
    item.id = `list_${i}`;
    item.idCheck = `item_${i}`;
    item.idEditText = `text_${i}`;
    displayMessage += `
      <li id='${item.id}' class='task_list ${item.checked ? "done" : ""}'>
            <input type='checkbox' id='item_${i}' ${item.checked ? "checked" : ""}>
            <input type='text' value='${item.todoText}' class='edit ${item.change ? "" : "edit_text"} ${item.checked ? "edit_text" : ""}' id='text_${i}'}>
            <lable for='item_${i}' class='label_text ${item.change ? "edit_text" : ""} ${item.checked ? "edit_text" : ""}'>${item.todoText}</lable>
            <i class='fa-solid fa-pencil ${item.checked ? "edit_text" : ""}' ></i>
            <i class='fa-solid fa-trash-can ${item.checked ? "edit_text" : ""}'></i>
        </li>
        `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener("change", function (event) {
  let idInput = event.target.getAttribute('id')
  if (event.target.type === "checkbox") {
    todoList.forEach(function (item) {
      if (item.idCheck === idInput) {
        item.checked = !item.checked;
      }
    });
  }

  for (let x of todoList) {
    if (x.todoText === event.target.value) return;
  }
  let idEdit = event.target.getAttribute('id');
  if (event.target.type === "text") {
    todoList.forEach(function (item) {
      if (item.idEditText === idEdit) {
        item.todoText = event.target.value;
        item.change = !item.change;
      }
    });
  }
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList));
});

todoBut.addEventListener("click", () => {
  todoList = [];
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList));
});

todo.addEventListener("click", function (event) {
  let taskId = event.target.parentElement.id;
  const elemEditTask = ["I", "LABLE"];
    if (elemEditTask.includes(event.target.nodeName)) {
    todoList.forEach((item, i, arr) => {
      if (taskId === item.id) {
        const elemClassTask = ['fa-solid fa-pencil ', 'label_text  '];
        if (elemClassTask.includes(event.target.className)) {
          item.change = !item.change;
        }
        if (event.target.classList.contains("fa-trash-can")) {
          arr.splice(i, 1);
        }
      }
    });
    displayMessages();
    localStorage.setItem("todo", JSON.stringify(todoList));
  }
});
