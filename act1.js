const list = document.querySelector("#list");
const form = document.querySelector("#new_task_form");
const input = document.querySelector("#new_task_title");

// This is where a new task added when the form is submitted.
form.addEventListener("submit", function(event) {
  event.preventDefault();  

  const taskTitle = input.value;  

  if (taskTitle === "" || taskTitle == null) return;  
  addListItem(taskTitle); 
  input.value = "";  
});

// This is the Function to add a task to the list.
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delbtn = document.createElement("button");

  checkbox.type = "checkbox"; 

  // This is the crossing out feature when a task is marked as complete.
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      label.style.textDecoration = "line-through"; 
    } else {
      label.style.textDecoration = "none"; 
    }
  });

  // For deleting feature
  delbtn.textContent = "Remove";
  delbtn.id = "delbtn"
  delbtn.addEventListener("click", function() {
    item.remove();  
  });

  // This is where it put everything together.
  label.append(checkbox, task); 
  item.append(label, delbtn);  
  list.append(item);  
}
