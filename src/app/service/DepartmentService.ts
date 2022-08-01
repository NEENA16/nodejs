import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";

export class DepartmentService{

    constructor(private departmentRepo: DepartmentRespository){

    }
    //get all department
    async getAllDepartments(){
        
        return await this.departmentRepo.getAllDepartments();
    }

    //create department
    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                // departmentId: departmentDetails.departmentId,
                // isActive: true,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "FAILED");
        }
    }

    //update

    public async updateDepartmentDetails(departmentId: string, departmentDetails: any) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update({ id: departmentId }, {
            name: departmentDetails.name ? departmentDetails.name : undefined,
        });
        return updateDepartmentDetails;
    }

    //delete
    async softDeleteDepartmentById(id: string){
        
        return await this.departmentRepo.softDeleteDepartmentById(id);
    }
}

