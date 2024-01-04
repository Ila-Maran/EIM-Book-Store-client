export interface getMeResponse {
  status: {
    code: string;
    message: string;
  };
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}
