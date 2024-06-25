import { AbsentProps } from "./event";
import { UserProps } from "./user";

export interface CreateDetailEventProps {
  id?: number;
  // event_id: number;
  waktu_pelaksanaan: string;
  lokasi: string;
  status: string;
  deskripsi: string;
  category: string;
  gambar_kegiatan: string;
  file_pengajuan: string;
  sertifikat: string;
  event?: CreateEventProps;
  metode_pembayaran?: CreateTransactionProps[];
  narahubung?: CreatePICProps[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateEventProps {
  id?: number;
  ormawa_id?: number;
  nama_kegiatan: string;
  tanggal_kegiatan: string;
  tingkat_kegiatan: string;
  harga_tiket: number;
  its_open?: number;
  category?: string;
  type_implement: string;
  detail_kegiatan: CreateDetailEventProps;
  metode_pembayaran?: CreateTransactionProps[];
  narahubung?: CreatePICProps[];
  absensi?: AbsentProps;
}

export interface CreateTransactionProps {
  id?: number;
  // detail_kegiatan_id: number;
  metode_pembayaran: string;
  judul: string;
  nama_bank: string;
  no_rekening: string;
  pemilik: string;
  detail_kegiatan?: CreateDetailEventProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreatePICProps {
  id?: number;
  // detail_kegiatan_id: number;
  judul: string;
  nama_narahubung: string;
  no_telepon: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateAbsentProps {
  id: number;
  event_id: number;
  user_id: number;
  name_mahasiswa: string;
  no_telepon: string;
  institusi: number;
  status: string;
  bukti_pembayaran: string;
  its_close: number;
  category: string;
  tanggal_kegiatan: string;
  tingkat_kegiatan: string;
  event?: CreateEventProps;
  user?: UserProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
