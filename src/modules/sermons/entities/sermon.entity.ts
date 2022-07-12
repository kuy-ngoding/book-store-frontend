import { SermonPublishStatus } from "../enums/sermon-publish-status.enum";
import { SermonStatus } from "../enums/sermon-status.enum";

export class Sermon {
  _id?: string;

  title?: string;
  description?: string;
  youtubeURL?: string;
  sermonDate?: Date;
  sermonEndDate?: Date;
  thumbnailURL?: string;
  publishStatus?: SermonPublishStatus;
  /**
   * Sermon Preacher.
   */
  preacher?: string;

  /**
   * Sermon Have Offline Content.
   */
  haveOffline?: boolean;

  /**
   * Sermon Status.
   */

  status?: SermonStatus;

  maxQuota?: number;

  availableQuota?: number;

  readonly createdAt?: Date;

  // /**
  //  * Sermon Created By.
  //  */
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  // createdBy?: User;
}
