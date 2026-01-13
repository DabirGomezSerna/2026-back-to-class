"use strict";

function addTask() {
  const inputValue = document.getElementById("taskInput");
  const taskText = inputValue.value.trim();
  const lblMsg = document.getElementById("lblMessage");

  if (!taskText) {
    lblMsg.textContent = "Tasks can't be empty!";
    lblMsg.className = "fail";
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="completeTask(this)">${taskText}</span>
    <div class="task-buttons">
      <button id="delete-button" onclick="deleteTask(this)">Delete</button>
      <button id="edit-button" onclick="editTask(this)">Edit</button>
    </div>`;
  document.getElementById("taskList").appendChild(li);

  inputValue.value = "";
  //lblMsg.textContent = "";
  lblMsg.textContent = "Task added successfully!";
  lblMsg.className = "";
}

function deleteTask(btn) {
  btn.closest("li").remove();
  // A different way to remove would be to use
  // titleElement = document.getElementById(li)
  // titleElement.parentNode.removeChild(titleElement),
  // however that would require each li to have a unique id
}

function completeTask(span) {
  span.classList.toggle("task-completed");
}

function editTask(btn) {
  const li = btn.closest("li");
  let span = li.querySelector("span");
  const input = li.querySelector("input");
  const lblTask = document.getElementById("lblTaskMessage");

  if (input) {
    const newText = input.value.trim();
    if (!newText) {
      lblTask.textContent = "Tasks can't be empty!";
      return;
    }
    span = document.createElement("span");
    span.setAttribute("onclick", "completeTask(this)");
    //this one works too
    //span.onclick = function() { completeTask(this) };
    span.textContent = newText;
    input.replaceWith(span);
    btn.textContent = "Edit";
    lblTask.textContent = "";
  } else {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;
    editInput.className = "edit-input";

    span.replaceWith(editInput);

    btn.textContent = "Save";

    editInput.focus();
  }
}