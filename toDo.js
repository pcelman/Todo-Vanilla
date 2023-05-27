var toDoItems = [];

function ToDo(description) {
  this.description = description;
  this.complete = false;
}

ToDo.prototype.completeTask = function () {
  this.complete = true;
};

function createTask(todo, index) {
  var toDoTask = document.createElement("div");
  toDoTask.className = "todo";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = index;
  toDoTask.appendChild(checkbox);

  var eraseIcon = document.createElement("i");
  eraseIcon.className = "fa fa-trash-o erase-icon todo__icon";
  toDoTask.appendChild(eraseIcon);

  var toDoText = document.createElement("span");
  toDoText.innerHTML = todo.description;
  toDoText.id = index;

  if (todo.complete) {
    toDoText.className = "todo__complete";
    checkbox.checked = true;
  }

  toDoTask.appendChild(toDoText);

  toDoTask.addEventListener("click", function (event) {
    if (event.target === checkbox || event.target === toDoText) {
      toDoText.classList.toggle("todo__complete");

      toDoItems[index].complete = !toDoItems[index].complete;
    } else if (event.target.classList.contains("todo__icon")) {
      var divElement = event.target.parentNode;
      divElement.remove();
      toDoItems.splice(index, 1);
    }
  });

  return toDoTask;
}

function createTasks(toDos) {
  return toDos.map((todo, index) => createTask(todo, index));
}

function displayTask() {
  var taskContainer = document.querySelector("#task__container");
  taskContainer.innerHTML = "";

  var result = createTasks(toDoItems);

  result.forEach((todo) => taskContainer.appendChild(todo));
}

function addTask() {
  var input = document.querySelector("#toDoInput");
  var description = input.value.trim();

  if (description !== "") {
    var createTask = new ToDo(description);
    toDoItems.push(createTask);

    input.value = "";
    displayTask();
  }
}

document.querySelector("#addButton").addEventListener("click", addTask);

function completeTask() {
  var index = event.target.id;
  toDoItems[index].completeTask();
  displayTask();
}

displayTask();
