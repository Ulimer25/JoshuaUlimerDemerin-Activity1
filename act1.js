const list = document.querySelector("#list");
const form = document.querySelector("#new_task_form");
const input = document.querySelector("#new_task_title");
const dueDateInput = document.querySelector("#due_date");
const calendarIcon = document.querySelector("#calendarIcon");
const sortOptions = document.querySelector("#sort_options");

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Show the date picker when the calendar icon is clicked
calendarIcon.addEventListener("click", function() {
  dueDateInput.style.display = "inline"; // Make the date input visible
  dueDateInput.focus(); // Open the date picker
});

// Add task event listener
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskTitle = input.value;
  const dueDate = dueDateInput.value;

  if (taskTitle === "" || taskTitle == null) return;

  addListItem(taskTitle, dueDate);
  saveTasksToLocalStorage();

  input.value = "";
  dueDateInput.value = "";
  dueDateInput.style.display = "none"; // Hide date input again after adding a task
});

// Sorting event listener
sortOptions.addEventListener("change", sortTasks);

// Add task to list function
function addListItem(task, dueDate) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delbtn = document.createElement("button");

  checkbox.type = "checkbox";

  // Task completion
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
    } else {
      label.style.textDecoration = "none";
    }
    saveTasksToLocalStorage(); // Save task status change
  });

  // Delete button
  delbtn.textContent = "Remove";
  delbtn.id = "delbtn";
  delbtn.addEventListener("click", function() {
    item.remove();
    saveTasksToLocalStorage(); // Update local storage after removal
  });

  // Add expired class if past due date
  if (dueDate && new Date(dueDate) < new Date()) {
    item.classList.add("expired");
  }

  label.append(checkbox, `${task} (Due: ${dueDate || "No date"})`);
  item.append(label, delbtn);
  list.append(item);
}

// Sort tasks function
function sortTasks() {
  const tasksArray = Array.from(list.children);

  if (sortOptions.value === "alphabetical") {
    tasksArray.sort((a, b) => a.textContent.localeCompare(b.textContent));
  } else if (sortOptions.value === "status") {
    tasksArray.sort((a, b) => {
      const aCompleted = a.querySelector("input").checked;
      const bCompleted = b.querySelector("input").checked;
      return aCompleted - bCompleted;
    });
  }

  list.innerHTML = "";
  tasksArray.forEach(task => list.appendChild(task));
  saveTasksToLocalStorage(); // Save order after sorting
}

// Local storage functions
function saveTasksToLocalStorage() {
  const tasks = Array.from(list.children).map(item => {
    const label = item.querySelector("label").textContent;
    const checked = item.querySelector("input").checked;
    return { label, checked };
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const [taskTitle, dueDate] = task.label.split("(Due: ");
    const cleanTitle = taskTitle.trim();
    const cleanDate = dueDate ? dueDate.replace(")", "").trim() : "";
    addListItem(cleanTitle, cleanDate);

    // Set task completion
    const checkbox = list.lastChild.querySelector("input");
    checkbox.checked = task.checked;
    if (task.checked) {
      checkbox.parentElement.style.textDecoration = "line-through";
    }
  });
}
