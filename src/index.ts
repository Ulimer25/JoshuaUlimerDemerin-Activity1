import { v4 as uuidV4} from "uuid"

type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")!
const form = document.querySelector<HTMLFormElement>("#new-task-form")!
const input = document.querySelector<HTMLInputElement>("#new-task-title")!

const tasks: Task[] = []
tasks.forEach(addListItem)

// For adding tasks
form.addEventListener("submit", e => {
  e.preventDefault()

  if (input.value == "" || input.value == null)
    return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date
  }

  // appending each task to the list
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

//Elemets in the list of tasks
function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  const deleteButton = document.createElement("button")

  // For checkboxes
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked

    // for corssing out the task
    
    if (task.completed) {
      label.classList.add("completed");
    } else {
      label.classList.remove("completed");
    }
  })

  checkbox.type = "checkbox"
  checkbox.checked = task.completed

  // Delete button for removing the task
  deleteButton.textContent = "Delete"
  deleteButton.id = "delbtn"
  

  deleteButton.addEventListener("click", () => {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasks.splice(index, 1); // Remove task from the array
    }
    item.remove(); // Remove task from the UI
  });

  label.append(checkbox, task.title)
  item.append(label, deleteButton)
  list.append(item)
}
