import {Users} from "../../users/entities/user.entity"
import { CreateProfileDto } from "../dto/create-profile.dto";


export class Profile extends CreateProfileDto  {
 id: string
 users: Users[] 

}
