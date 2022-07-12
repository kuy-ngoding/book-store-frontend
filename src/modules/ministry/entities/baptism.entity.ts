import { Gender } from "../../users/enums/gender.enum";
import { BaptismStatus } from "../enums/baptism-status.enum";

export class Baptism {
  _id?: string;

  /**
   * Full name of the person.
   */
  fullname: string;

  /**
   * Phone number of the person.
   */
  phone?: string;

  /**
   * Person gender.
   */
  gender?: Gender;

  /**
   * Person Birth Date.
   */
  birthDate?: Date;

  /**
   * Person birth place.
   */

  birthPlace?: string;

  /**
   * Person address.
   */

  address?: string;

  /**
   * Person Father Name.
   */
  fatherName?: string;

  /**
   * Person Mother Name.
   */
  motherName?: string;

  /**
   * Baptism Status.
   */
  status?: BaptismStatus;

  /**
   * Date of Baptism.
   */
  baptismDate?: Date;
}
