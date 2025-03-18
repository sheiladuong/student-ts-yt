import data from './data.js' ;

const students = JSON.parse(data);
console.log(students);

interface Student {
    id: string,
    firstName: string,
    lastName: string,
    dateAdmission: string,
    birthYear: string,
    focusArea?: string | string[],
    dateRegistrationSuspended?: string
}

function addRow(table : HTMLTableElement, student : Student) {
    
    let tr = table.querySelector("tbody")!.insertRow();
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(`${student.firstName} ${student.lastName}`));

    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseInt(student.birthYear)).toString()));

    const majors = tr.insertCell();
    if (student.focusArea) {
        if (typeof student.focusArea == "string") {
            majors.appendChild(document.createTextNode(student.focusArea));
        } else {
            let areas = "";
            student.focusArea.forEach(area=>{
                areas += area + ", "
            });
            majors.appendChild(document.createTextNode(areas.slice(0,-2)));
        }
    } else {
        majors.appendChild(document.createTextNode("--"));
    }
    
    const status = tr.insertCell();
    if (student.dateRegistrationSuspended) {
        status.appendChild(document.createTextNode("Inactive"));
    } else {
        status.appendChild(document.createTextNode("Active"));
    }
}

// select HTML table
function selectTable() {
    return <HTMLTableElement>document.querySelector("#students-table");
    // return document.querySelector("#students-table") as HTMLTableElement;
}

function refreshTable(table : HTMLTableElement, student : Student[]) {
    table.querySelector("tbody")!.innerHTML = "";
    students.forEach(student => {
        addRow(table, student);
    });
}

// // add a row
// addRow(selectTable(), students[0]);

window.onload = function() {
    refreshTable(selectTable(), students);
}