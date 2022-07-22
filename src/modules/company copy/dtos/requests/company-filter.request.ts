import { User } from "../../../users/dtos/models/user.entity";

export interface CompanyFilterRequest {
  readonly _id?: string;
  picId?: string;
  picData?: User;
  companyName?: string;
  companyAddress?: string;
  creatorId?: string;
  createdBy?: User;
  findOnlyCreateRequest: string;
}
