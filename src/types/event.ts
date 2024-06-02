export interface EventProps {
  id: number;
  ormawa_id: number;
  nama_kegiatan: string;
  harga_tiket: number;
  its_open: number;
  tanggal_kegiatan: string;
  tingkat_kegiatan: string;
  ormawa?: null;
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
  metode_pembayaran?: TransactionProps;
  narahubung?: PICProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface TransactionProps {
  id: number;
  detail_kegiatan_id: number;
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
