import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import {CreateEmployeeDto} from "../dto/CreateEmployeeDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { EmployeeParamsDto } from "../dto/EmployeeParamsDto";
import authorize from "../middleware/authorize";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`,   //getallemployee
    authorize(['Admin']),    //to authorize  , a middleware
    this.employeeResponse);

    this.router.get(`${this.path}/:id`,       //getemployeebyid
    authorize(['Admin','hr']), 
    validationMiddleware(EmployeeParamsDto, APP_CONSTANTS.params),
    this.getEmployeeById);

    this.router.put(`${this.path}/:id`,       //updateemployee
    authorize(['Admin']), 
    validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
    validationMiddleware(EmployeeParamsDto, APP_CONSTANTS.params),
    this.updateEmployeeById);

    this.router.delete(`${this.path}/:id`,    //deleteemployee
    authorize(['Admin']), 
    validationMiddleware(EmployeeParamsDto, APP_CONSTANTS.params),
    this.softDeleteEmployeeById);

    this.router.post(
      `${this.path}`,                         //createemployee
      authorize(['Admin']), 
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee),
      this.createEmployee
    );

    // for login page
    this.router.post(
      `${this.path}/login`,
      this.login
    );
  }

  //get all employess
  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  //create employee
  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }


  //get element by id
  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };


   // update
   private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.updateEmployeeDetails(
        request.params.id,
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      console.log(error);
      
      return next(error);
    }
  };


  //delete
  private softDeleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.softDeleteEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };
 

  
  //for login page
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
      const loginData = request.body;
      const loginDetail = await this.employeeService.employeeLogin(
        loginData.username.toLowerCase(),
        loginData.password
      );
      response.send(
        this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
      );
    } catch(err){
      next(err);
    }
    
  };

}



export default EmployeeController;
