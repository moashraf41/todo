// Function to load tasks from local storage and display them
function loadTasks() {
  let content = document.getElementById("tasks");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    content.innerHTML += `
        <div class="d-flex parent full align-items-center mb-4">
          <i class="bi bi-check-circle text-success me-3"></i>
          <h5 class="title mb-0 flex-grow-1" style="text-decoration: ${
            task.completed ? "line-through" : ""
          }">${task.name}</h5>
          <div class="icon-circle">
            <i class="bi bi-x-circle text-danger"></i>
          </div>
        </div>
      `;
  });
}

// Function to save tasks in local storage
function updateLocalStorage() {
  let tasks = Array.from(document.querySelectorAll(".parent")).map(
    (taskElement) => {
      return {
        name: taskElement.querySelector(".title").innerText,
        completed:
          taskElement.querySelector(".title").style.textDecoration ===
          "line-through",
      };
    }
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Handle click events for the task list (using event delegation)
document.getElementById("tasks").addEventListener("click", (event) => {
  if (event.target.classList.contains("title")) {
    // Toggle line-through for the title
    event.target.style.textDecoration =
      event.target.style.textDecoration === "line-through"
        ? ""
        : "line-through";
    updateLocalStorage();
  }

  if (event.target.classList.contains("bi-x-circle")) {
    // Remove the parent div of the close icon
    event.target.closest(".parent").remove();
    updateLocalStorage();
  }
});

// Add a new task when button is clicked
document.getElementById("btn").addEventListener("click", () => {
  let taskInput = document.getElementById("task-text");
  let task = taskInput.value.trim();
  let content = document.getElementById("tasks");

  if (task) {
    // Add the task to the DOM
    content.innerHTML += `
        <div class="d-flex parent full align-items-center mb-4" ">
          <i class="bi bi-check-circle text-success me-3"></i>
          <h5 class="title mb-0 flex-grow-1">${task}</h5>
          <div class="icon-circle">
            <i class="bi bi-x-circle text-danger"></i>
          </div>
        </div>
      `;

    // Clear input field and update local storage
    taskInput.value = "";
    updateLocalStorage();
  } else {
    alert("Enter a Task");
  }
});

// Load tasks from local storage on page load
window.onload = loadTasks;
