export class Broadcast {
  _id?: string;

  name?: string;

  content?: string;

  attachmentUrl?: string;

  businessId?: string;

  deviceId?: string;

  contactIds?: string[];

  sendingSpeed?: string; // fast / auto / custom

  perfectTiming?: boolean; // if user online, send message immediately

  allowUnsubscribe?: boolean; // Giving the user the option to unsubscribe

  scheduleDataTime?: Date; // time to send message

  totalContacts?: number;

  totalFailed?: number; // total messages failed to send

  totalDelivered?: number; // total messages delivered to the end user

  createdAt?: Date;

  updatedAt?: Date;
}
