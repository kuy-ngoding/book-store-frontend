import { SermonParticipantStatus } from "../enums/sermon-participant-status.enum";

export class SermonParticipant {
  _id?: string;

  status?: SermonParticipantStatus;

  sermonId?: string;

  userId?: string;
}
