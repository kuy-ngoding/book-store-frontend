import { User } from "../../users/dtos/models/user.entity";

export class Product {

  readonly _id?: string;
  /**
   * productName
   * 
   */
  productName: string;
/**
   * productPrice
   */
  productPrice: number;
/**
   * productDescription
   */
  productDecsription: string;
  

  creatorId?: string | User;

  createdBy?: User;
}
