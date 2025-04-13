const attendanceData = {};

function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (user === "admin" && pass === "admin@123") {
    showPage('adminPage');
  } else if (user === pass && /^12\d{2}$/.test(user)) {
    showPage('studentPage');
    const studentName = getStudentName(user);
    document.getElementById('studentName').innerHTML = "Student: " + studentName;
    document.getElementById("attendanceTable").style.display = "none";
    document.getElementById("studentLogout").style.display = "none";
  } else {
    alert("Invalid credentials.");
  }
}

function getStudentName(rollNumber) {
  const students = {
    "1201": "Abhishek Band",
    "1202": "Yash Barbaile",
  };
  return students[rollNumber] || "Unknown Student";
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function markAttendance(button, status) {
  const studentDiv = button.closest('.student');
  const roll = studentDiv.getAttribute('data-roll');
  const name = studentDiv.getAttribute('data-name');
  const date = document.getElementById('attendanceDate').value;
  const subject = document.getElementById('subjectSelectAdmin').value;

  const presentBtn = studentDiv.querySelector('.present-btn');
  const absentBtn = studentDiv.querySelector('.absent-btn');

  presentBtn.classList.remove('selected');
  absentBtn.classList.remove('selected');
  if (status === 'Present') presentBtn.classList.add('selected');
  else absentBtn.classList.add('selected');

  if (!attendanceData[subject]) attendanceData[subject] = {};
  if (!attendanceData[subject][roll]) attendanceData[subject][roll] = {};

  attendanceData[subject][roll][date] = status;
}

function submitAttendance() {
  alert("Attendance submitted (not saved permanently - demo only).");
}

function displayAttendance() {
  const subject = document.getElementById("subjectSelectStudent").value;
  if (subject === "") {
    alert("Please select a subject.");
    return;
  }

  const tbody = document.getElementById("attendanceBody");
  tbody.innerHTML = "";

  const studentRoll = document.getElementById("username").value;
  const attendance = attendanceData[subject] && attendanceData[subject][studentRoll] || {};

  for (let day = 1; day <= 31; day++) {
    const dateStr = `2025-04-${String(day).padStart(2, '0')}`;
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = day;
    tr.appendChild(tdDate);

    const tdStatus = document.createElement("td");
    const status = attendance[dateStr] || "";
    tdStatus.textContent = status;
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  }

  document.getElementById("attendanceTable").style.display = "table";
  document.getElementById("studentLogout").style.display = "block";
}

function logout() {
  showPage('loginPage');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}
