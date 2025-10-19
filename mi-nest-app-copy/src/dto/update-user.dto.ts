import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import * as userEntity from "src/entities/user.entity";


export class UpdateUserDTO extends (CreateUserDTO){

    @IsNotEmpty()
    role: userEntity.Roles;

}