

let submit = document.getElementById("btn");
let tbody = document.getElementById("body");
let editingRow = null;


submit.addEventListener("click", function(e) {
    e.preventDefault();
    let name = document.getElementById("empname").value;
    let email = document.getElementById("email").value;
    let salary = document.getElementById("Salary").value;
    let phone = document.getElementById("phone").value;
    let dept = document.getElementById("dept").value;


    if (name == "" || email == "" || salary == "" || phone == "" || dept == "") {
        alert("Please fill all fields");
        return;
    }


      let row;
    if (editingRow == null) {
        row = document.createElement("tr");
        tbody.appendChild(row);
    } else {
        row = editingRow;
    }

      row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${salary}</td>
        <td>${phone}</td>
        <td>${dept}</td>
        <td>
        <button onclick="editEmployee(this)">Edit</button>
        <button onclick="deleteEmployee(this)">Delete</button>
        </td>`;



    editingRow = null;
    submit.innerText = "Submit";
    document.querySelector("form").reset();
    filterEmployees();
});




function editEmployee(btn) {
    let row = btn.parentElement.parentElement;
    document.getElementById("empname").value = row.cells[0].innerText;
    document.getElementById("email").value = row.cells[1].innerText;
    document.getElementById("Salary").value = row.cells[2].innerText;
    document.getElementById("phone").value = row.cells[3].innerText;
    document.getElementById("dept").value = row.cells[4].innerText;
    editingRow = row;
    submit.innerText = "Update";
}

function deleteEmployee(btn) {
    let row = btn.parentElement.parentElement;
    if (confirm("Delete this employee?")) {
        if (editingRow == row) {
            editingRow = null;
            submit.innerText = "Submit";
            document.querySelector("form").reset();
        }
        row.remove();
        filterEmployees();
    }
}


document.getElementById("search").addEventListener("input", function() {
    filterEmployees();
});


document.getElementById("departmentFilter").addEventListener("change", function() {
    filterEmployees();
});


function filterEmployees() {
    let search = document.getElementById("search").value.toLowerCase();
    let dept = document.getElementById("departmentFilter").value;
    let rows = tbody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let name = rows[i].cells[0].innerText.toLowerCase();
        let employeeDept = rows[i].cells[4].innerText;
        if (name.includes(search) &&
            (dept == "" || employeeDept == dept)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}