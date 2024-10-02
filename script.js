let taskId = 1;

window.onload = function () {
  loadTask();
};

// Функция для создания таска, как нового, так и отрисовки тех, которые хранятся в localStorage
function addTask(newBool, taskHeadContent, taskTextContent) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.id = "task-" + taskId;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.id = "task-checkbox-" + taskId;

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("task-content");

  const taskHead = document.createElement("h2");
  taskHead.classList.add("task-head");
  taskHead.id = "task-head-" + taskId;
  if (taskHeadContent != "") {
    taskHead.textContent = taskHeadContent;
  } else {
    taskHead.textContent = "Your task head";
  }

  const taskText = document.createElement("p");
  taskText.classList.add("task-text");
  taskText.id = "task-text-" + taskId;
  if (taskTextContent != "") {
    taskText.textContent = taskTextContent;
  } else {
    taskText.textContent = "Your task text";
  }

  const btnsDiv = document.createElement("div");
  btnsDiv.classList.add("task-btns");

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "delete";
  deleteBtn.classList.add("task-btn");
  deleteBtn.id = "task-btn-delete-" + taskId;
  deleteBtn.addEventListener("click", function () {
    taskDelete(taskDiv.id);
  });

  const editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "edit";
  editBtn.classList.add("task-btn");
  editBtn.id = "task-btn-edit-" + taskId;
  editBtn.addEventListener("click", function () {
    taskEdit(taskHead.id, taskText.id, editBtn.id);
  });

  contentDiv.appendChild(taskHead);
  contentDiv.appendChild(taskText);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(contentDiv);
  btnsDiv.appendChild(deleteBtn);
  btnsDiv.appendChild(editBtn);
  taskDiv.appendChild(btnsDiv);

  document.getElementById("tasks-container").appendChild(taskDiv);

  if (newBool) {
    saveTaskToLocalStorage(taskId, taskHead.textContent, taskText.textContent);
  }

  taskId++;
}

// Функция для удаления задачи
function taskDelete(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let newTasks = [];
  tasks.forEach(function (task) {
    if (task.savedTaskId != id) {
      newTasks.push({
        savedTaskId: task.savedTaskId,
        savedTaskHead: task.savedTaskHead,
        savedTaskText: task.savedTaskText,
      });
    }
  });

  document.getElementById(id).remove();
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

// Функция для изменения задачи, принимающая ID заголовка, текста и самой кнопки
function taskEdit(headId, textId, editBtnId) {
  if (document.getElementById(editBtnId).value == "edit") {
    document.getElementById(headId).contentEditable = true;
    document.getElementById(headId).classList.toggle("content-edit");
    document.getElementById(textId).contentEditable = true;
    document.getElementById(textId).classList.toggle("content-edit");

    document.getElementById(editBtnId).value = "save";
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTasks = [];
    tasks.forEach(function (task) {
      if (task.savedTaskId == "task-" + headId.replace(/\D/g, "")) {
        newTasks.push({
          savedTaskId: document.getElementById(
            "task-" + headId.replace(/\D/g, "")
          ),
          savedTaskHead: document.getElementById(headId).textContent,
          savedTaskText: document.getElementById(textId).textContent,
        });
      } else {
        newTasks.push({
          savedTaskId: task.savedTaskId,
          savedTaskHead: task.savedTaskHead,
          savedTaskText: task.savedTaskText,
        });
      }
    });

    document.getElementById(headId).contentEditable = false;
    document.getElementById(headId).classList.toggle("content-edit");
    document.getElementById(textId).contentEditable = false;
    document.getElementById(textId).classList.toggle("content-edit");
    document.getElementById(editBtnId).value = "edit";

    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
}

// Функция для сохранения задачи в localStorage
function saveTaskToLocalStorage(taskIdSaved, taskHeadSaved, taskTextSaved) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({
    savedTaskId: "task-" + taskIdSaved,
    savedTaskHead: taskHeadSaved,
    savedTaskText: taskTextSaved,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    addTask(
      (newBool = false),
      (taskHeadContent = task.savedTaskHead),
      (taskTextContent = task.savedTaskText)
    );
  });
  taskId = tasks.length + 1;
}
