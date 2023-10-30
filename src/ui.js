export class UI{
    constructor(){
        this.employeeList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
    }

    AddAllEmp(response){
        response.forEach((emp) => {
            this.employeeList.innerHTML += `
            <tr>                            
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>${emp.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
            `;

        });
    }

    addEmployee(response){
        
        this.employeeList.innerHTML += `
        <tr>
            <td>${response.name}</td>
            <td>${response.department}</td>
            <td>${response.salary}</td>
            <td>${response.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `;

    }

    clearAllInput(){
        this.nameInput.value = "";
        this.salaryInput.value = "";
        this.departmentInput.value = "";
    }

    deleteEmp(element){
        eelement.remove();
    }

    toggledUpdateButton(target){
        // guncelleye 2 kere bassan calisir
        if(this.updateButton.style.display === "none"){
            this.updateButton.style.display = "block";
            // console.log(target);
            this.changeInputWithInfo(target);
            
        }
        else{
            this.updateButton.style.display = "none"; 

            this.clearAllInput();
        }
    }

    changeInputWithInfo(target){
        const children = target.children;

        this.nameInput.value = target.children[0].textContent;
        this.departmentInput.value = target.children[1].textContent;
        this.salaryInput.value = target.children[2].textContent;

        
    }


    UpdateEmpUI(emp,parent){
        parent.innerHTML = `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>${emp.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `;
    }
}