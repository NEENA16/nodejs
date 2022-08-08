import { NextFunction } from "migrate";
import APP_CONSTANTS from "../constants";
import { AddressService } from "../service/AddressSrevice";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
import { Response } from "express";
import validationMiddleware from "../middleware/validationMiddleware";
import {CreateAddressDto} from "../dto/CreateAddressDto";
import { UpdateAddressDto } from "../dto/UpdateAddressDto";



class AddressController extends AbstractController {
    constructor(private addressService: AddressService) {
      super(`${APP_CONSTANTS.apiPrefix}/address`);
      this.initializeRoutes();
    }
  
    protected initializeRoutes() {
      this.router.get(`${this.path}`, 
      this.addressResponse);
      this.router.get(`${this.path}/:id`, 
       this.getAddressById);
    
      this.router.put(`${this.path}/:id`, 
      validationMiddleware(UpdateAddressDto, APP_CONSTANTS.body),
    
      this.updateAddressById);
      this.router.delete(`${this.path}/:id`, 
   
      this.softDeleteAddressById);
      this.router.post(
        `${this.path}`,
        validationMiddleware(CreateAddressDto, APP_CONSTANTS.body),
      
        this.createAddress
      );
     
    }

    //get all address

    private addressResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any = await this.addressService.getAllAddress();
        response.status(200);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      } catch (error) {
        return next();
      }
    }
  
    //create address

    private createAddress = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const data = await this.addressService.createAddress(request.body);
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
        );
      } catch (err) {
        next();
      }
    }
  
    //get element by id

    private getAddressById = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const data: any = await this.addressService.getAddressById(
          request.params.id
        );
        response.status(200);
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
        );
      } catch (error) {
        return next();
      }
    };

     // update

     private updateAddressById = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const data: any = await this.addressService.updateAddressDetails(
          request.params.id,
          request.body
        );
        response.status(200);
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
        );
      } catch (error) {
        return next();
      }
    };

    //delete
    
    private softDeleteAddressById = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const data: any = await this.addressService.softDeleteAddressById(
          request.params.id
        );
        response.status(200);
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
        );
      } catch (error) {
        return next();
      }
    };
}
export default AddressController;