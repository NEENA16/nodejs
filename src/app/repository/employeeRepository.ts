import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    //get all employees
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }
    //create employee
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    //get element by id
    async getEmployeeById(id: string): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
      }
     //update
    
    public async updateEmployeebyId(id:string,employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.update(id,employeeDetails);
    }
      //delete
      public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({
            id
        });
    }

    // for login page
    public async getEmployeeByName(userName: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username: userName },
        });
        return employeeDetail;
    }

}
