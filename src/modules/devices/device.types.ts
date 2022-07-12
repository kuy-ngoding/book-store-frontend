export type Device = {
  _id: string;
  deviceName: string;
  devicePhoneNumber?: string;
  businessId?: string;
  deviceSession?: DeviceSession | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DeviceSession = {
  clientID: string;
  serverToken: string;
  clientToken: string;
  encKey: string;
  macKey: string;
};

export interface WAChat {
  jid: string;
  t: number;
  /** number of unread messages, is < 0 if the chat is manually marked unread */
  count: number;
  archive?: "true" | "false";
  clear?: "true" | "false";
  read_only?: "true" | "false";
  mute?: string;
  pin?: string;
  spam?: "false" | "true";
  modify_tag?: string;
  name?: string;
  /** when ephemeral messages were toggled on */
  eph_setting_ts?: string;
  /** how long each message lasts for */
  ephemeral?: string;
  // messages: KeyedDB<WAMessage, string>;
  imgUrl?: string;
  // presences?: {
  //   [k: string]: WAPresenceData;
  // };
  // metadata?: WAGroupMetadata;
}

export interface LoadChats {
  chats: WAChat[];
  cursor: string;
}

export interface LoadMessageDetail {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    extendedTextMessage: {
      text: string;
    };
    conversation: string;
  };
  messageTimestamp: string;
}

export interface LoadMessages {
  messages: LoadMessageDetail[];
  cursor: LoadMessageCursor;
}

export interface LoadMessageCursor {
  id?: string;
  fromMe?: string;
}

export interface SendMessageRequest {
  deviceId: string;
  message: string;
  receiverJID: string;
  type: string;
}
