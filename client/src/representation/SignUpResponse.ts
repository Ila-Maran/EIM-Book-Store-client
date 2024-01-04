export interface SignUpResponse {
  status: {
    code: string;
    message: string;
  };
  data: {
    user: {
      name: string;
      email: string;
      userName: string;
      role: string;
      createdAt: string;
      borrowedBooks: string;
      id: string;
    };
    token: string;
  };
}
