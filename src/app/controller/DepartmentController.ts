import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
import { DepartmentParamsDto } from "../dto/DepartmentParamsDto";
import { UpdateDepartmentDto } from "../dto/UpdateDepartmentDto";
import authorize from "../middleware/authorize";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`,       //getalldepartment
    authorize(['Admin','HR']),
    this.departmentResponse);

    this.router.get(`${this.path}/:id`,     //getdepartmentbyid
    authorize(['Admin','HR']),
    validationMiddleware(DepartmentParamsDto, APP_CONSTANTS.params),
    this.getDepartmentById);

    this.router.put(`${this.path}/:id`,     //updatedepartment
    authorize(['Admin']),
    validationMiddleware(DepartmentParamsDto, APP_CONSTANTS.params),
    validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body),
      this.updateDepartmentById);

    this.router.delete(`${this.path}/:id`,    //deletedepartment
    authorize(['Admin']),
    validationMiddleware(DepartmentParamsDto, APP_CONSTANTS.params),
    this.softDeleteDepartmentById);
    
    this.router.post(                         //createdepartment
      `${this.path}`,
      authorize(['Admin']),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.createDepartment),
      this.createDepartment
    );
  }

  //get all department
  private departmentResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  //get department by id
  private getDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getDepartmentById(
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
  

  //create Department
  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }


  //update department
  private updateDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.updateDepartmentDetails(
        request.params.id,
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  
   //delete department
   private softDeleteDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.softDeleteDepartmentById(
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
}

export default DepartmentController;