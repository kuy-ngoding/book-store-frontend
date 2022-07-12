import { RoleEnum } from "../../enums/role.enum";

export class UserFilterRequest {
  username?: string;
  fullName?: string;
  email?: string;
  role?: RoleEnum;
  phoneNumber?: string;
  creatorId?: string;
}
