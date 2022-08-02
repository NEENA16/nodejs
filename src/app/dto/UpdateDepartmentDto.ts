import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentDto {
    @IsString()
    public name: string;
}