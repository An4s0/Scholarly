interface Publication {
  title: string;
  year: number;
  citations: number;
}

export interface Profile {
  name: string;
  url: string;
  citations: number;
  hIndex: number;
  publications: Publication[];
  lastUpdated: Date;
  createdAt: Date;
}
