import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    //get all employees
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department','address']});
    }
    //create employee
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    //get element by id
    async getEmployeeById(id: string, relations: string[]=['department','address']): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id,{relations: relations});
      }
     //update
    
    public async updateEmployeebyId(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        console.log(employeeDetails)
        return employeeRepo.save(employeeDetails);
    }
      //delete
      public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employee= await this.getEmployeeById(id,['address']);
        return employeeRepo.softRemove(
            employee
        );
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
