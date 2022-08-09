import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;
 
    @IsString()
    public dateofjoining: string;
 
    @IsString()
    public role: string;

    @IsString()
    public status: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public departmentId: string;

    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;
}
