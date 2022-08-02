import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import jsonwebtoken from "jsonwebtoken"

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
                
                
                dateofjoining: employeeDetails.dateofjoining,
                departmentId: employeeDetails.departmentId,
                role: employeeDetails.role,
                status: employeeDetails.status,
                experience: employeeDetails.experience,
                username: employeeDetails.username,
                // const data = await this.addressService.createEmployee(request.body);
                // createAddress(request.body.address)
                // request.body.address

                // password: employeeDetails.password

                // to encrypt password when while creating the employee
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : ' '
                // isActive: true,

            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            // throw new HttpException(400, "Failed to create employee", "FAILED");  //overwritten error
            throw(err);
        }
    }

    // //get element by id
    // async getEmployeeById(id: string) {
    //     return await this.employeeRepo.getEmployeeById(id);
    //   }


        // //error handle in get element by id
        public async getEmployeeById(id: string) {
            const employee = await this.employeeRepo.getEmployeeById(id);
            if(!employee){
                throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND)
            }
            return employee;
        }
    
      //update

      public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null },employeeDetails 
        //     {
        //     name: employeeDetails.name ? employeeDetails.name : undefined,
        //     dateofjoining: employeeDetails.dateofjoining ? employeeDetails.dateofjoining : undefined,
        //     role: employeeDetails.role ? employeeDetails.role : undefined,
        //     status: employeeDetails.status ? employeeDetails.status : undefined,
        //     experience: employeeDetails.experience ? employeeDetails.experience : undefined,
        //     username: employeeDetails.username ? employeeDetails.username : undefined,
        //     password: employeeDetails.password ? employeeDetails.password : undefined
        // }
        );
        return updateEmployeeDetails;
        

    }
     
      //delete
      async softDeleteEmployeeById(id: string){
        
        return await this.employeeRepo.softDeleteEmployeeById(id);
    }
   

    //for login page
    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);   // verify the raw password given by user an passwd in db same
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,    // what to print in payload    key: value
            "custom:name": employeeDetails.name,
             "role": "admin",
          };
          const token = this.generateAuthTokens(payload);

          return {          // should return token, and can give any details required by us
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD_EXCEPTION);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  

}