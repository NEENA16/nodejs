import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateEmployeeDto {

    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public dateofjoining: string;
 
    @IsOptional()
    @IsString()
    public role: string;

    @IsOptional()
    @IsString()
    public status: string;

    @IsOptional()
    @IsNumber()
    public experience: number;

    @IsOptional()
    @IsString()
    public username: string;

    @IsOptional()
    @IsString()
    public password: string;

    @IsOptional()
    @IsString()
    public departmentId: string;

}