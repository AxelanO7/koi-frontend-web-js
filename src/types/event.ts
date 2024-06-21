import { UserProps } from "./user";

export interface EventProps {
  id: number;
  ormawa_id: number;
  nama_kegiatan: string;
  harga_tiket: number;
  its_open: number;
  category: string;
  tanggal_kegiatan: string;
  tingkat_kegiatan: string;
  type_implement: string;
  pembayaran?: PaymentProps;
  absensi?: AbsentProps;
  ormawa?: OrmawaProps;
  detail_kegiatan?: DetailEventProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface DetailEventProps {
  id: number;
  event_id: number;
  waktu_pelaksanaan: string;
  lokasi: string;
  status: string;
  deskripsi: string;
  gambar_kegiatan: string;
  file_pengajuan: string;
  event?: EventProps;
  metode_pembayaran?: TransactionProps[];
  narahubung?: PICProps[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface PaymentProps {
  id?: number;
  nama_peserta: string;
  mahasiswa_id: number;
  event_id: number;
  no_telepon: string;
  institusi: string;
  bukti_pembayaran: string;
  status: string;
  event?: EventProps;
  mahasiswa?: null;
  email: string;
  tipe_pembayaran: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface TransactionProps {
  id: number;
  detail_kegiatan_id: number;
  metode_pembayaran: string;
  judul: string;
  nama_bank: string;
  no_rekening: string;
  pemilik: string;
  detail_kegiatan?: DetailEventProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface PICProps {
  id: number;
  detail_kegiatan_id: number;
  judul: string;
  nama_narahubung: string;
  no_telepon: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface OrmawaProps {
  id: number;
  nama_ormawa: string;
  status: number;
  password: string;
  user_id: number;
  user?: null;
  event?: null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface AbsentProps {
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
  event?: EventProps;
  user?: UserProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface EventByOrmawaResponse {
  event: EventProps[];
  ormawa: OrmawaProps;
}

export interface getImageUploadProps {
  type: string;
  fileName: string;
}
