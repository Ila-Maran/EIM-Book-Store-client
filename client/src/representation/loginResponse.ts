export interface LoginResponse {
  status: {
    code: string;
    message: string;
  };
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      userName: string;
      role: string;
      borrowedBooks: [];
      __v: 0;
      id: string;
    };
    token: string;
  };
}
