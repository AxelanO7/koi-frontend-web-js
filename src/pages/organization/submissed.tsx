import BaseLayout from "@/layouts/base";
import { Button } from "@/shadcn/components/ui/button";
import { Calendar } from "@/shadcn/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { format } from "date-fns";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Switch } from "@/shadcn/components/ui/switch";

interface ContactPerson {
  name: string;
  phoneNumber: string;
}

interface PaymentMethod {
  paymentMethod: paymentMethodEnum;
  bankName: string;
  accountNumber: number;
  ownerName: string;
}

enum paymentMethodEnum {
  BANK_TRANSFER = "Bank Transfer",
  GOPAY = "Gopay",
  OVO = "OVO",
  DANA = "DANA",
}

const SubmissedEventOrganization = () => {
  const [date, setDate] = useState<Date>();
  const selectedFile = (e: unknown) => {
    console.log(e.target.files[0]);
  };

  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    {
      name: "",
      phoneNumber: "",
    },
  ]);
  const handleRemoveContactPerson = (index: number) => {
    setContactPersons(contactPersons.filter((_, i) => i !== index));
  };
  const handleAddContactPerson = () => {
    setContactPersons([
      ...contactPersons,
      {
        name: "",
        phoneNumber: "",
      },
    ]);
  };

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      paymentMethod: paymentMethodEnum.BANK_TRANSFER,
      bankName: "",
      accountNumber: 0,
      ownerName: "",
    },
  ]);
  const handleRemovePaymentMethod = (index: number) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };
  const handleAddPaymentMethod = () => {
    setPaymentMethods([
      ...paymentMethods,
      {
        paymentMethod: paymentMethodEnum.BANK_TRANSFER,
        bankName: "",
        accountNumber: 0,
        ownerName: "",
      },
    ]);
  };

  enum listApplicationStatus {
    REVIEW = "Review",
    REJECTED = "Rejected",
    APPROVED = "Approved",
  }

  const applicationStatus: listApplicationStatus = listApplicationStatus.REVIEW;

  return (
    <>
      <BaseLayout>
        <div className={clsx("max-w-7xl mx-auto")}>
          <p className={clsx("font-semibold text-lg")}>Pengajuan Event</p>
          <p className={clsx("text-gray-500 font-normal text-sm mt-4")}>
            Pastikan informasi event yang kamu selenggarakan tidak melanggar
            aturan. Pastikan informasi event yang kamu selenggarakan tidak
            melanggar aturan
          </p>
          <div
            className={clsx(
              "bg-white rounded-lg px-8 py-8 shadow-lg mt-8  space-y-8"
            )}
          >
            <div className="flex justify-between items-center">
              <p className={clsx("font-semibold text-base")}>
                Status Pengajuan
              </p>
              <Button
                className={clsx(
                  applicationStatus === listApplicationStatus.REVIEW
                    ? "bg-blue-500"
                    : applicationStatus === listApplicationStatus.REJECTED
                    ? "bg-danger"
                    : applicationStatus === listApplicationStatus.REVIEW
                    ? "bg-success"
                    : "bg-blue-500",
                  "rounded-2xl"
                )}
              >
                {applicationStatus === listApplicationStatus.REVIEW
                  ? "Ditinjau"
                  : applicationStatus === listApplicationStatus.REJECTED
                  ? "Ditolak"
                  : applicationStatus === listApplicationStatus.APPROVED
                  ? "Disetujui"
                  : "Ditinjau"}
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className={clsx("font-semibold text-base")}>
                  Status Pengajuan
                </p>
                <p className={clsx("font-normal text-sm text-gray-400")}>
                  Manajemen untuk buka atau tutup pendaftaran event
                </p>
              </div>
              <Switch className={clsx("w-12 h-6")} />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className={clsx("font-semibold text-base")}>
                  Status Absensi
                </p>
                <p className={clsx("font-normal text-sm text-gray-400")}>
                  Manajemen untuk buka atau tutup absensi kehadiran
                </p>
              </div>
              <Switch className={clsx("w-12 h-6")} />
            </div>
          </div>
          {/* Informasi Event */}
          <div className={clsx("bg-white rounded-lg px-8 py-8 shadow-lg mt-8")}>
            <p className={clsx("font-semibold text-lg")}>Informasi Event</p>
            <p className={clsx("font-medium text-sm mt-8")}>Nama Event</p>
            <input
              type="text"
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Nama Event"
            />
            <div className="flex justify-between mt-8">
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Pelaksanaan Event</p>
                <div className="flex mt-2 space-x-4">
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Offline
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Online
                  </Button>
                </div>
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Kategori Event</p>
                <p className={clsx("text-gray-500 font-normal text-sm mt-1")}>
                  Kamu hanya dapat memilih satu kategori saja
                </p>
                <div className="flex mt-2 space-x-4">
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Seminar
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Lomba
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Workshop
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Hiburan
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Kegiatan Sosial
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Tingkat Event</p>
                <p className={clsx("text-gray-500 font-normal text-sm mt-1")}>
                  Kamu hanya dapat memilih satu kategori saja
                </p>
                <div className="flex mt-2 space-x-4">
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Internal
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Nasional
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Regional
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Internal
                  </Button>
                </div>
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>
                  Tempat Pelaksanaan
                </p>
                <input
                  type="text"
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2"
                  )}
                  placeholder="Masukkan tempat pelaksanaan event kamu"
                />
                <p className={clsx("text-gray-500 font-normal text-sm mt-1")}>
                  Contoh: Kampus INSTIKI, Zoom, Meet
                </p>
              </div>
            </div>
            <div className="flex mt-4 justify-between">
              <div className="flex w-full">
                <div className={clsx("space-y-2 w-full")}>
                  <p className={clsx("font-medium text-sm")}>Tanggal Event</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={clsx(
                          "border border-gray-300 rounded-md text-sm w-full shadow-none text-gray-400 bg-white px-4 py-5 flex items-center justify-between"
                        )}
                      >
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Masukkan tanggal pelaksanaan event</span>
                        )}
                        <CalendarDaysIcon className="w-5 h-5 ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-12" />
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Waktu Event</p>
                <select
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2"
                  )}
                >
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select>
              </div>
            </div>
          </div>
          {/* Detail Event */}
          <div className={clsx("bg-white rounded-lg px-8 py-8 shadow-lg mt-8")}>
            <p className={clsx("font-medium text-lg")}>Detail Event</p>
            <div className="flex space-x-8">
              <div className={clsx("w-full space-y-2")}>
                <p className={clsx("font-medium text-sm mt-8")}>Poster Event</p>
                <div
                  className={clsx(
                    "flex items-center justify-center w-full border border-gray-300 rounded-md relative bg-gray-100 cursor-pointer h-40"
                  )}
                >
                  <input type="file" onChange={selectedFile} />
                </div>
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
                  diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
              <div className={clsx("w-full space-y-2")}>
                <p className={clsx("font-medium text-sm mt-8")}>
                  Proposal Event
                </p>
                <div
                  className={clsx(
                    "flex items-center justify-center border border-gray-300 rounded-md relative bg-gray-100 cursor-pointer h-40"
                  )}
                >
                  <input type="file" onChange={selectedFile} />
                </div>
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
                  diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
            </div>
            <p className={clsx("font-medium text-sm mt-8")}>Nama</p>
            <input
              type="text"
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Ketikkan nama lengkapmu"
            />
            <div className={clsx("my-8 h-px bg-gray-300")} />
            <div className="flex items-center mb-4">
              <div>
                <p className={clsx("font-medium text-lg")}>Narahubung</p>
                <p className={clsx("text-gray-500 font-normal text-sm")}>
                  Kamu dapat menentukan lebih dari satu narahubung
                </p>
              </div>
              <Button
                className={clsx("rounded-md ml-auto bg-poppy-500")}
                onClick={handleAddContactPerson}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Narahubung
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {contactPersons.map((contactPerson, index) => (
                <div
                  key={index}
                  className={clsx(
                    "rounded-lg p-8 shadow-lg border border-gray-100"
                  )}
                >
                  <p className={clsx("font-semibold text-xl text-center")}>
                    Narahubung {index + 1}
                  </p>
                  <div className={clsx("my-4 h-px bg-gray-300")} />
                  <p className={clsx("font-medium text-sm")}>Nama Narahubung</p>
                  <input
                    type="text"
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nama lengkap"
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nomor Telepon
                  </p>
                  <input
                    type="text"
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nomor telepon"
                  />
                  <Button
                    className="mt-4 bg-red-500 rounded-lg w-full"
                    onClick={() => handleRemoveContactPerson(index)}
                  >
                    <TrashIcon className="w-5 h-5 mr-2" />
                    Hapus
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {/* Harga Event */}
          <div className={clsx("bg-white rounded-lg px-8 py-8 shadow-lg mt-8")}>
            <p className={clsx("font-medium text-lg")}>Harga Event</p>
            <div className="flex mt-8">
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Jenis Harga Event</p>
                <div className="flex space-x-4 mt-4">
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Berbayar
                  </Button>
                  <Button variant={"outline"} className={clsx("rounded-2xl")}>
                    Gratis
                  </Button>
                </div>
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Harga Tiket</p>
                <input
                  type="text"
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2"
                  )}
                  placeholder="Masukkan harga tiket"
                />
              </div>
            </div>
            <div className={clsx("my-4 h-px bg-gray-300")} />
            <div className={clsx("flex items-center justify-between")}>
              <div>
                <p className={clsx("font-medium text-lg")}>Metode Pembayaran</p>
                <p className={clsx("text-gray-500 font-normal text-sm")}>
                  Kamu dapat menentukan lebih dari satu metode pembayaran
                </p>
              </div>
              <div>
                <Button
                  className={clsx("rounded-md bg-poppy-500")}
                  onClick={handleAddPaymentMethod}
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Metode Pembayaran
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {paymentMethods.map((paymentMethod, index) => (
                <div
                  key={index}
                  className={clsx(
                    "rounded-lg p-8 shadow-lg border border-gray-100"
                  )}
                >
                  <p className={clsx("font-semibold text-xl text-center")}>
                    Metode Pembayaran {index + 1}
                  </p>
                  <div className={clsx("my-4 h-px bg-gray-300")} />
                  <p className={clsx("font-medium text-sm")}>
                    Metode Pembayaran
                  </p>
                  <select
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                  >
                    {Object.values(paymentMethodEnum).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <p className={clsx("font-medium text-sm mt-4")}>Nama Bank</p>
                  <input
                    type="text"
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nama bank"
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nomor Rekening
                  </p>
                  <input
                    type="text"
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nomor rekening"
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nama Pemilik Rekening
                  </p>
                  <input
                    type="text"
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nama pemilik rekening"
                  />
                  <Button
                    className="mt-4 bg-red-500 rounded-lg w-full"
                    onClick={() => handleRemovePaymentMethod(index)}
                  >
                    <TrashIcon className="w-5 h-5 mr-2" />
                    Hapus
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-8 w-full justify-end">
            <Button variant={"outline"}>Batalkan</Button>
            <Button variant={"outline"}>Simpan & Tambah Baru</Button>
            <Button className={clsx("bg-poppy-500")}>Simpan Pengajuan</Button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default SubmissedEventOrganization;
