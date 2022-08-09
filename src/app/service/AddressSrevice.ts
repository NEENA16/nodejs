import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Address } from "../entities/Address";
import AddressRespository from "../repository/addressRepository";

export class AddressService{

    constructor(private addressRepo: AddressRespository){

    }
    //get all employee
    async getAllAddress(){
        
        return await this.addressRepo.getAllAddress();
    }

    //create employee
    public async createAddress(addressDetails: any) {
            console.log(addressDetails);
        try {
            const newAddress = plainToClass(Address, {
                line1: addressDetails.line1,
                
                
                line2: addressDetails.line2,
                city: addressDetails.city,
                state: addressDetails.state,
                pin: addressDetails.pin,
               
            });
            
            const save = await this.addressRepo.saveAddressDetails(newAddress);
            return save;
        } catch (err) {
            // throw new HttpException(400, "Failed to create employee", "FAILED");  //overwritten error
            throw(err);
        }
    }

    // //get element by id
    async getAddressById(id: string) {
        return await this.addressRepo.getAddressById(id);
      }


    
      //update

      public async updateAddressDetails(addressid: string, addressDetails: any) {
        const addressRepo = getConnection().getRepository(Address);
        const updateAddressDetails = await addressRepo.update(addressid,addressDetails 
        
        );
        return updateAddressDetails;
        

    }
     
      //delete
      async softDeleteAddressById(id: string){
        
        return await this.addressRepo.softDeleteAddressById(id);
    }
}
export default AddressService;