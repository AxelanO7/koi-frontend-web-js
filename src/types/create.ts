export interface CreateDetailEventProps {
  // id: number;
  // event_id: number;
  waktu_pelaksanaan: string;
  lokasi: string;
  status: string;
  deskripsi: string;
  gambar_kegiatan: string;
  file_pengajuan: string;
  event?: CreateEventProps;
  metode_pembayaran?: CreateTransactionProps;
  narahubung?: CreatePICProps;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateEventProps {
  ormawa_id: number;
  nama_kegiatan: string;
  tanggal_kegiatan: string;
  tingkat_kegiatan: string;
  harga_tiket: number;
  detail_kegiatan: CreateDetailEventProps;
  metode_pembayaran: CreateTransactionProps[];
  narahubung: CreatePICProps[];
}

export interface CreateTransactionProps {
  //   id: number;
  // detail_kegiatan_id: number;
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
  //   id: number;
  // detail_kegiatan_id: number;
  judul: string;
  nama_narahubung: string;
  no_telepon: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
