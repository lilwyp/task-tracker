let taskId = 1;

window.onload = function () {
  loadTask();
};

document.getElementById("add-task-btn").addEventListener("click", function () {
  const taskHeadValue = document.getElementById(
    "task-head-" + taskId
  ).textContent;
  const taskTextValue = document.getElementById("task-p-" + taskId).textContent;

  if (taskHeadValue && taskTextValue) {
    addTask(taskHeadValue, taskTextValue);
    saveTask(taskHeadValue, taskTextValue);
  }
});

// Function for add task on screen and save task if redacted
function addTask(taskHeadValue, taskTextValue) {
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
  checkbox.id = "task-head-" + taskId;
  taskHead.textContent = taskHeadValue;
  taskHead.contentEditable = true;

  const taskText = document.createElement("p");
  taskText.classList.add("task-p");
  checkbox.id = "task-p-" + taskId;
  taskText.textContent = taskTextValue;
  taskText.contentEditable = true;

  taskHead.addEventListener("input", function () {
    updateTask(taskDiv.id, taskHead.textContent, taskText.textContent);
  });

  taskText.addEventListener("input", function () {
    updateTask(taskDiv.id, taskHead.textContent, taskText.textContent);
  });

  contentDiv.appendChild(taskHead);
  contentDiv.appendChild(taskText);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(contentDiv);

  document.getElementById("tasks-container").appendChild(taskDiv);
  taskId++;
}

// Function for save task to localStorage
function saveTask(taskHeadValue, taskTextValue) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({
    id: "task-" + taskId,
    head: taskHeadValue,
    text: taskTextValue,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function for load task from localStorage
function loadTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.head, task.text);
  });
  taskId = tasks.length + 1;
}
