import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";

export class EmployeeService{

    constructor(private employeeRepo: EmployeeRespository){

    }
    //get all employee
    async getAllEmployees(){
        
        return await this.employeeRepo.getAllEmployees();
    }

    //create employee
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                
                dateofjoining: employeeDetails.dateofjoining,
                departmentId: employeeDetails.departmentId,
                role: employeeDetails.role,
                status: employeeDetails.status,
                experience: employeeDetails.experience
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee", "FAILED");
        }
    }

    //get element by id
    async getEmployeeById(id: string) {
        return await this.employeeRepo.getEmployeeById(id);
      }
    
      //update

      public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
            name: employeeDetails.name ? employeeDetails.name : undefined,
            dateofjoining: employeeDetails.dateofjoining ? employeeDetails.dateofjoining : undefined,
            role: employeeDetails.role ? employeeDetails.role : undefined,
            status: employeeDetails.status ? employeeDetails.status : undefined,
            experience: employeeDetails.experience ? employeeDetails.experience : undefined,
        });
        return updateEmployeeDetails;
    }
   
      //delete
      async softDeleteEmployeeById(id: string){
        
        return await this.employeeRepo.softDeleteEmployeeById(id);
    }
   
}