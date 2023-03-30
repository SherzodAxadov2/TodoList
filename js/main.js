let todo = [
  {
    id: Date.now(),
    text: "Hellloooooo",
    isCompleted: false,
  },
];

let filterLists = [
  { id: 1, text: "All", isActive: true },
  { id: 2, text: "Active", isActive: false },
  { id: 3, text: "Completed", isActive: false },
];

const input = document.querySelector(".input");
const todoLists = document.querySelector(".todo-lists");
const count = document.querySelectorAll(".list-count");
const clear = document.querySelector(".clear");
const filter = document.querySelector(".filters");
const filter2 = document.querySelector(".filters2");

let obj = {};
let todoList = JSON.parse(localStorage.getItem("todos"))
  ? JSON.parse(localStorage.getItem("todos"))
  : [
      {
        id: Date.now(),
        text: "Hellloooooo",
        isCompleted: false,
      },
    ];

const saveStorage = (todos) =>
  localStorage.setItem("todos", JSON.stringify(todos));

saveStorage(todoList);

// Clear
const clearAll = () => {
  todoList = todoList.filter((list) => !list.isCompleted);
  setTodos();
  saveStorage(todoList);
};

// For filter
const setFilters = (filterItem) => {
  filterItem.innerHTML = ``;
  filterLists.map((item) => {
    filterItem.innerHTML += `
      <li  class='${item.isActive ? "active" : ""}' onclick="selectFilter(${
      item.id
    })">${item.text}</li>
    `;
  });
};

setFilters(filter);
setFilters(filter2);
const selectFilter = (id) => {
  filterLists = filterLists.map((item) =>
    item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }
  );
  let newArr = [];
  if (filterLists.filter((list) => list.isActive)[0].text === "Active") {
    newArr = todoList.filter((todo) => !todo.isCompleted);
  } else if (
    filterLists.filter((list) => list.isActive)[0].text === "Completed"
  ) {
    newArr = todoList.filter((todo) => todo.isCompleted);
  } else newArr = todoList;

  saveStorage(newArr);
  setNewTodos(newArr);
  setFilters(filter);
  setFilters(filter2);
};

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && e.target.value) {
    obj.text = e.target.value;
    obj.id = Date.now();
    obj.isCompleted = false;
    todoList.push(obj);

    e.target.value = "";
    setTodos();
    saveStorage(todoList);
    obj = {};
  }
});

const showCount = () => {
  Array.from(count).map((item) => {
    item.innerHTML = `${
      todoList.filter((list) => !list.isCompleted).length
    } items left`;
  });
};

let setTodos = () => {
  showCount();
  todoLists.innerHTML = ``;
  return todoList.map((list) => {
    todoLists.innerHTML += `
        <li class="list-item ${
          list.isCompleted ? "done" : ""
        }" onclick="doneTodo(${list.id})">
          <div class="check">
              <div class="checkbox">
                <img src="images/tick.png" alt="img" class="tick ${
                  list.isCompleted ? "d-block" : "d-none"
                }">
              </div>
              <label for="check">${list.text}</label><br>
          </div>
          <div class="close" onclick="delTodo(${list.id})">
              <span></span>
              <span></span>
          </div>
        </li>
    `;
  });
};

new Sortable(todoLists, {
  animation: 150,
});

const delTodo = (id) => {
  todoList = todoList.filter((list) => list.id !== id);
  setTodos();
  saveStorage(todoList);
};

let setNewTodos = (arr) => {
  showCount();
  todoLists.innerHTML = ``;
  return arr.map((list) => {
    todoLists.innerHTML += `
        <li class="list-item ${
          list.isCompleted ? "done" : ""
        }" onclick="doneTodo(${list.id})">
          <div class="check">
              <div class="checkbox">
                <img src="images/tick.png" alt="img" class="tick ${
                  list.isCompleted ? "d-block" : "d-none"
                }">
              </div>
              <label for="check">${list.text}</label><br>
          </div>
          <div class="close">
              <span></span>
              <span></span>
          </div>
        </li>
    `;
  });
};

const doneTodo = (id) => {
  todoList.map((item) => {
    if (item.id === id) {
      item.isCompleted = !item.isCompleted;
    }
  });

  setTodos();
  saveStorage(todoList);
};

setTodos();
saveStorage(todoList);

// theme-toggle
var toggle = document.getElementById("theme-toggle");

var storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
if (storedTheme)
  document.documentElement.setAttribute("data-theme", storedTheme);

toggle.onclick = function () {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
};
