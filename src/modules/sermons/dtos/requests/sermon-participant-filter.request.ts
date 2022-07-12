import { BaseFilterRequest } from "../../../core/base-filter.request";
import { SermonParticipantStatus } from "../../enums/sermon-participant-status.enum";

export class SermonParticipantFilterRequest extends BaseFilterRequest {
  /**
   * The user who is participating in the sermon.
   */
  userId?: string;

  /**
   * The sermon that the user is participating in.
   *
   */
  sermonId?: string;

  /**
   * The status of the sermon participant.
   *
   * @default SermonParticipantStatus.WAITING
   *
   * @example SermonParticipantStatus.WAITING
   *
   * @example SermonParticipantStatus.ATTEND
   *
   * @example SermonParticipantStatus.CANCEL
   */
  status?: SermonParticipantStatus;
}
