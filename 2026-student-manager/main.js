"use strict";

let students = [];

window.onload = () => {
  const stored = localStorage.getItem("students");
  if (stored) {
    students = JSON.parse(stored);
    displayStudents();
  }
};

function addStudent() {
  const name = document.getElementById("studentInput").value.trim();
  const grade = parseFloat(document.getElementById("gradeInput").value.trim());
  const status = grade >= 70 ? "passed" : "failed";

  const student = {
    name,
    grade,
    status,
  };

  if (name === "") {
    alert("Name cannot be empty!");
    return;
  }

  if (!isNaN(name)) {
    alert("Name must not be a number!");
    return;
  }

  if (grade > 100 || grade < 0) {
    alert("The grade must be greater than 0 or less than 100");
    return;
  }

  students.push(student);
  displayStudents();
  saveToLocalStorage();
  document.getElementById("studentInput").value = "";
  document.getElementById("gradeInput").value = "";
}

const displayStudents = () => {
  const list = document.getElementById("studentList");
  list.innerHTML = ``;
  let gradeList = [];

  for (let i = 0; i < students.length; i++) {
    const li = document.createElement("li");
    li.className = students[i].status;
    li.innerHTML = `
    <span class="studentName">${students[i].name}</span>
    <span class="studentGrade">${students[i].grade}</span>`;
    list.appendChild(li);
    gradeList[i] = students[i].grade;
  }

  updateAverage(gradeList);
};

const updateAverage = (gradeList) => {
  const gradeAvDisplay = document.getElementById("averageValue");
  let gradeTotal = 0;
  let gradeAverage = 0;

  for (let i = 0; i < gradeList.length; i++) {
    gradeTotal += gradeList[i];
    //gradeTotal = gradeTotal + gradeList[i];
  }

  gradeAverage = gradeTotal / gradeList.length;

  gradeList.length !== 0
    ? (gradeAvDisplay.textContent = gradeAverage.toFixed(2))
    : (gradeAvDisplay.textContent = "");
};

const saveToLocalStorage = () => {
  localStorage.setItem("students", JSON.stringify(students));
};

const resetAll = () => {
  const ok = confirm("Are you sure you wish to remove all student data?");
  if (!ok) return;

  students = [];
  localStorage.removeItem("students");
  displayStudents();
};

const seedDemo = () => {
  students = [
    {
      name: "Ana",
      grade: 100,
      status: "passed",
    },
    {
      name: "Jacob",
      grade: 67,
      status: "failed",
    },
    {
      name: "Martha",
      grade: 47,
      status: "failed",
    },
  ];
  displayStudents();
  saveToLocalStorage();
};