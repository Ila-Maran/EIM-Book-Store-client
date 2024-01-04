export interface allBooksResponse {
  status: {
    code: string;
    message: string;
  };
  data: [
    {
      _id: string;
      title: string;
      author: string;
      publisher: string;
      totalCopies: number;
      copies: number;
      description: string;
      pages: number;
      year: number;
      edition: string;
      language: string;
      borrowers: Array<any>;
      totalBorrowers: number;
      id: string;
    }
  ];
}
