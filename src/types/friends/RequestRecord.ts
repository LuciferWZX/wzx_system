import {ContactUser, DeletedStatus, RecordStatus} from "@/types/User";

export type RequestRecord = {
  id: number;
  creatorId:number;
  fid: number;
  groupId: number;
  senderDesc: string;
  senderRemark: string;
  status: RecordStatus;
  rejectReason: string | null;
  createDate: string;
  deleted: DeletedStatus;
  friendInfo: ContactUser;
};
