import { getConnection } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRespository{
    //get all employees
    async getAllAddress(){
         const addressRepo = getConnection().getRepository(Address);
        return addressRepo.find();
    }

    //create employee
    public async saveAddressDetails(addressDetails: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.save(addressDetails);
    }
    
    //get element by id
    async getAddressById(id: string): Promise<Address> {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.findOne(id);
      }
    
      //update
    
    public async updateAddressbyId(id:string,addressDetails: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.update(id,addressDetails);
    }
    
    //delete
      public async softDeleteAddressById(id: string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.softDelete(id);
    }
}

export default AddressRespository;