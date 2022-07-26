import { User } from "../../users/dtos/models/user.entity";

export class Student {
  readonly _id?: string;
  
  studentName: string;
  
  
  address: string;

  
  phoneNumber: number;

 
  email: string;


  
  creatorId?: string | User;

  createdBy?: User;

 

 
}