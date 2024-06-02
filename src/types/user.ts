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

export interface Mahasiswa {
  nim: number;
  username: string;
  password: string;
  userId: number;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface Ormawa {
  id: number;
  namaOrmawa: string;
  status: number;
  password: string;
  userId: number;
  user?: User;
  event?: Event;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface User {
  id: number;
  username?: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  ormawa?: Ormawa;
  mahasiswa?: Mahasiswa;
}
