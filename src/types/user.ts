import { EventProps } from "./event";

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

export interface MahasiswaProps {
  nim: number;
  username: string;
  password: string;
  user_id: number;
  user?: UserProps;
  nama_mahasiswa: string;
  no_telepon: string;
  email: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  tempat_lahir: string;
  alamat_tinggal: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface OrmawaProps {
  id: number;
  nama_ormawa: string;
  email: string;
  deskripsi: string;
  jenis_ormawa: string;
  logo: string;
  cover: string;
  status: number;
  password: string;
  user_id: number;
  user?: UserProps;
  event?: Event;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface UserProps {
  id: number;
  username?: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  ormawa?: OrmawaProps;
  mahasiswa?: MahasiswaProps;
}

export interface ResponseEventByOrmawa {
  ormawa: OrmawaProps;
  event: EventProps[];
}
