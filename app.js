
let students = [];

function renderStudents() {
    const query = document.getElementById("search").value.toLowerCase();
    const tbody = document.getElementById("studentList");
    tbody.innerHTML = "";

    students.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.roll.toLowerCase().includes(query)
    ).forEach(s => {
        const row = document.createElement("tr");
        [s.roll, s.name].forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        const actions = document.createElement("td");
        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.onclick = () => {
            const name = prompt("New student name:", s.name);
            if (name && name.trim()) {
                s.name = name.trim();
                renderStudents();
            }
        };

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = () => {
            students = students.filter(x => x !== s);
            renderStudents();
        };

        actions.append(edit, del);
        row.appendChild(actions);
        tbody.appendChild(row);
    });
}

document.getElementById("studentForm").onsubmit = e => {
    e.preventDefault();
    const roll = document.getElementById("roll").value.trim();
    const name = document.getElementById("name").value.trim();

    if (students.some(s => s.roll === roll)) {
        alert("Roll number already exists!");
        return;
    }

    students.push({ roll, name });
    e.target.reset();
    renderStudents();
};

document.getElementById("search").addEventListener("input", renderStudents);
