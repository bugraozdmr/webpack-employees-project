//* başka dosyadan import
import { Requests } from "./request";
import { UI } from "./ui";

//* elementleri seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employees");
const UpdateEmployee = document.getElementById("update");
//? objeleri oluşturma
const request = new Requests("http://localhost:3000/employess");
const ui = new UI();

//* flag deger
let updateState = null;


//* eventListeners

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeeList.addEventListener("click",UpdateOrDelete);
    //* hidden button listener
    UpdateEmployee.addEventListener("click",updateEmp);
}

function UpdateOrDelete(e){
    if (e.target.id === "delete-employee"){

        deleteEmployee(e.target);
        
    }
    else if(e.target.id === "update-employee"){
        UpdateEmployeeController(e.target.parentElement.parentElement);
    }
}


function getAllEmployees(){
    //*get
    request.get()
    .then(response => {
        ui.AddAllEmp(response);
    })
    .catch(err => console.log(err));
}

function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const department = departmentInput.value.trim();
    const salary = salaryInput.value.trim();

    if(employeeName === "" || department === "" || salary === ""){
        alert("Tüm alanları doldurun !");
    }
    else{
        //*post
        request.post({name:employeeName,department:department,salary:Number(salary)})
        .then(response => {
            console.log(response);
            // sayfa yenilenmediği sürece ui'a eleman gelmezdi biz ondan dolayı bu fonk yazdık
            ui.addEmployee(response);
        })
        .catch(err => console.log(err));
    }

    ui.clearAllInput();

    e.preventDefault();
}


function deleteEmployee(emp){
    //? td içindeki id değeri lazım
    const id = emp.parentElement.previousElementSibling.previousElementSibling.textContent;

    //*delete
    request.delete(id)
    .then(response => {
        console.log(response);
        // bu yazıldı çünkü ekleme sonrası sayfa yenilenmezse eklemede olmaz ancak burda eklersek sorun çözülür
        // silme var ancak sayfa yenilenmesi ile api den çekilir
        ui.deleteEmp(emp.parentElement.parentElement);
    })
    .catch(err => console.log(err));
}

function UpdateEmployeeController(targetEmp){
    ui.toggledUpdateButton(targetEmp);

    if(updateState === null){
        updateState = {
            updateID : targetEmp.children[3].textContent,
            updateParent : targetEmp
        }

        // console.log(updateState.updateID);
    }
    //* birkere basıldığında state değişiyor bir kere daha basılırsa else'e düşer
    //* orda null'a eşitlenir
    else{
        updateState = null;
    }
}


function updateEmp(){
    // null değilse
    if(updateState){
        const data = {name:nameInput.value.trim(),
            department:departmentInput.value.trim(),
            salary:salaryInput.value.trim()
        };

        //*put -- olan değerleri değiştirir günceller
        request.put(data,updateState.updateID)
        .then(response => {
            ui.UpdateEmpUI(response,updateState.updateParent);

            ui.clearAllInput();
        })
        .catch(err => console.log(err));
    }
}





//*delete
// request.delete(4)
// .then(response => console.log(response))
// .catch(err => console.log(err));