import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{
    
    //get all employees
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    //get element by id
    async getDepartmentById(id: string): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne(id);
      }
    //create employee
    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }
    //update
    public async updateDepartmentbyId(id:string,departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.update(id,departmentDetails);
    }

     //delete
     public async softDeleteDepartmentById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({
            id
        });
    }
}
