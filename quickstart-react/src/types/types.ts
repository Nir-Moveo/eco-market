export enum Groups {
  Active = "active_items",
  Sold = "sold_items",
}

export enum Columns {
  Description = "description",
  Images = "images",
  Interested = "interested",
  Category = "category",
}

export interface IColumnValues {
  title: Columns;
  text: string;
  value?: string;
  type: string;
}

export interface ICard {
  name: string;
  description: string;
  category: string;
  owner: IUser;
  images: string[];
  interested: IUser[];
  published_at?: string;
}

export interface RawItem {
  name: string;
  description: string;
  category: string;
  images: FileList;
  column_values?: IColumnValues[];
}

export type ICardList = ICard[];

export interface IUser {
  display_name: string;
  profile_picture: string;
  phone?: string;
  email?: string;
}
