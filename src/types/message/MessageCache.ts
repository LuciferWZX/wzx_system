import {Message} from "@/types/message/Message";

export type MessageCache = {
    page:number,
    pageSize:number,
    data:Message[]
}
