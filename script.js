let taskId = 1;

// window.onload = function () {
//   loadTask();
// };

// Функция для создания пустого(?) таска
function addTask() {
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
  taskHead.textContent = "Your task head";
  // taskHead.contentEditable = true;

  const taskText = document.createElement("p");
  taskText.classList.add("task-text");
  taskText.id = "task-text-" + taskId;
  taskText.textContent = "Your task text";

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "delete";
  deleteBtn.classList.add("task-btn-delete");
  deleteBtn.id = "task-btn-delete-" + taskId;
  deleteBtn.addEventListener("click", function () {
    taskDelete(taskDiv.id);
  });

  contentDiv.appendChild(taskHead);
  contentDiv.appendChild(taskText);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(contentDiv);
  taskDiv.appendChild(deleteBtn);

  document.getElementById("tasks-container").appendChild(taskDiv);
  taskId++;
}

function taskDelete(id) {
  document.getElementById(id).remove();
  console.log(id);
}

// // Function for save task to localStorage
// function saveTask(taskHeadValue, taskTextValue) {
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   tasks.push({
//     id: "task-" + taskId,
//     head: taskHeadValue,
//     text: taskTextValue,
//   });
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// // Function for load task from localStorage
// function loadTask() {
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   tasks.forEach((task) => {
//     addTask(task.head, task.text);
//   });
//   taskId = tasks.length + 1;
// }
