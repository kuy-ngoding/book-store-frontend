import { RoleEnum } from "../../enums/role.enum";

export class User {
  /**
   * User ID
   */
  readonly _id?: string;

  /**
   * Username
   */
  username?: string;

  /**
   * User Email
   */
  email?: string;

  /**
   * User password
   */
  password?: string;

  /**
   * Role
   */
  role?: RoleEnum | string;

  /**
   * Name or CompanyName
   */
  fullName?: string;

  /**
   * Phone Number
   */
  phoneNumber?: string;

  userAvatarUrl?: string;

  /**
   * Created By (userId)
   */
  creatorId?: string;

  createdBy?: User;

  lastLogin?: Date;

  twoFactorAuthenticationSecret?: string;

  is2FAEnabled?: boolean;

  otpAuthUrl?: string;

  isLogined?: boolean;

  isPremium?: boolean;

  premiumExpiredAt?: Date;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;
}
