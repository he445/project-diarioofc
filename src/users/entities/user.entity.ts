import { Profile } from "src/profile/entities/profile.entity";

export class Users {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
  profiles?: Profile[]
}
