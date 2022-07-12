import { OrderStatus } from "../../enums/order-status.enum";

export class SendOrderRequest {
  orderId: string;

  orderStatus: OrderStatus;

  trackingNumber: number;
}
