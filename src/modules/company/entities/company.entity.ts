import { User } from "../../users/dtos/models/user.entity";

export class Company {
  readonly _id?: string;

  /**
   * pic id (userId)
   */
  picId?: string;

  picData?: User;

  /**
   * PIC Name
   */
  picName: string;

  /**
   * Total Employee
   */
  totalEmployee?: number;

  /**
   * company phone number
   */
  companyPhone: string;

  /**
   * Company Name
   */
  companyName: string;

  /**
   * Company E-Mail
   * @example gojekxcontag@gojek.com
   */
  companyEmail: string;

  /**
   * Company address
   */
  companyAddress?: string;

  /**
   * Created By (userId)
   */
  creatorId?: string;

  createdBy?: User;
}
