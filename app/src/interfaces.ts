export interface IChat {
  _id?: string;
  message: string;
  name: string;
  classType?: string;
  createdAt?: any;
  updatededAt?: any;
}

export interface IAggregatedChats {
  _id: { day: number; month: number; year: number };
  chats: IChat[];
}
