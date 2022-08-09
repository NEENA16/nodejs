import { IsUUID } from "class-validator";

export class AddressParamsDto {
    @IsUUID()
    public addressid: string;
}