export enum Groups {
  Active = "active_items",
  Sold = "sold_items",
}
export enum Buttons {
  Primary = "primary",
  Secondary = "secondary",
  Delete = "delete",
}

export enum Context {
  BoardID = "boardId",
  UserID = "userId"
}

export enum Columns {
  Name = "name",
  Description = "description",
  Images = "images",
  Interested = "interested",
  Category = "category",
}

export enum Categories {
  All = "all",
  Electronics = "electronics",
  Entertainment = "entertainment",
  Clothing = "clothing",
  Tools = "tools",
  Musical_Instruments = "musical_instruments",
  Home_And_Garden = "home_and_garden",
  Office = "office",
  Sports = "sports",
  Hobbies = "hobbies",
  Toys_And_Games = "toys_and_games",
  Other = "other",
  Wishlist= "wishlist"
}

export interface IColumnValues {
  title: Columns;
  text: string;
  value?: string;
  type: string;
}

export interface ICard {
  id: number;
  name: string;
  description: string;
  category: Categories;
  owner: IUser;
  images: string[];
  interested: IUser[];
  created_at?: string;
}

export interface RawItem {
  name: string;
  description: string;
  category: Categories;
  images?: FileList;
  column_values?: IColumnValues[];
}

export type ICardList = ICard[];

export interface IUser {
  id: number;
  display_name: string;
  profile_picture: string;
  phone?: string;
  email?: string;
}
