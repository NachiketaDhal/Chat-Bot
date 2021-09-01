export interface IChat {
  _id?: string;
  message: string;
  name: string;
  classType?: string;
  createdAt?: any;
  updatededAt?: any;
}

export interface IDate {
  day: number;
  month: number;
  year: number;
}

export interface IAggregatedChats {
  _id: IDate;
  chats: IChat[];
}
