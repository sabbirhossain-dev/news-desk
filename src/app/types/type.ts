export interface IArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt:string;
  lastPublished:Date;
}

export interface INews {
  id:string;
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: IArticle[];
}
