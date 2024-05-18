export interface Login {
  username: string;
  password: string;
}

export interface Register {
  id?: number;
  nim: number;
  username: string;
  role: string;
  nama_ormawa: string;
  status: number;
  password: string;
  confirm_password: string;
}
