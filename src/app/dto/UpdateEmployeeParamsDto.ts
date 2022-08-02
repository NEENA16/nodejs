import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateEmployeeParamsDto {
    @IsUUID()
    public id: string;
}