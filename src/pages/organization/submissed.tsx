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
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Switch } from "@/shadcn/components/ui/switch";
import axios from "axios";
import { getBaseUrl, getBaseUrlLocalUpload } from "@/helpers/api";
import { EventProps, PICProps, TransactionProps } from "@/types/event";
import { getStatusButtonColor, getStatusText } from "@/helpers/status";
import Swal from "sweetalert2";
import { CreateEventProps } from "@/types/create";

interface ContactPerson {
  name: string;
  phoneNumber: string;
}

interface PaymentMethod {
  payment_method: string;
  bank_name: string;
  account_number: string;
  owner_name: string;
}

enum paymentMethodEnum {
  BANK_TRANSFER = "Bank Transfer",
  GOPAY = "Gopay",
  OVO = "OVO",
  DANA = "DANA",
}

const SubmissedEventOrganization = () => {
  const idParam = window.location.pathname.split("/")[3];

  const [event, setEvent] = useState<EventProps>();

  const [date, setDate] = useState<Date>();
  const [poster, setPoster] = useState<File>();
  const [proposal, setProposal] = useState<File>();

  // contact person
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

  // metode pembayaran
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      payment_method: paymentMethodEnum.BANK_TRANSFER,
      bank_name: "",
      account_number: "",
      owner_name: "",
    },
  ]);

  const [selectedFileSertificate, setSelectedFileSertificate] =
    useState<File>();

  const handleRemovePaymentMethod = (index: number) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };
  const handleAddPaymentMethod = () => {
    setPaymentMethods([
      ...paymentMethods,
      {
        payment_method: paymentMethodEnum.BANK_TRANSFER,
        bank_name: "",
        account_number: "",
        owner_name: "",
      },
    ]);
  };

  const setDefaultValue = (val: EventProps) => {
    // narahubung
    const pic: PICProps[] = val.detail_kegiatan?.narahubung || [];
    const contactPersons: ContactPerson[] = [];
    pic.forEach((item) => {
      contactPersons.push({
        name: item.nama_narahubung,
        phoneNumber: item.no_telepon,
      });
    });
    setContactPersons(contactPersons);

    // metode pembayaran
    const methodPay: TransactionProps[] =
      val.detail_kegiatan?.metode_pembayaran || [];
    const paymentMethods: PaymentMethod[] = [];
    methodPay.forEach((item) => {
      paymentMethods.push({
        payment_method: item.metode_pembayaran,
        bank_name: item.nama_bank,
        account_number: item.no_rekening,
        owner_name: item.pemilik,
      });
    });
    setPaymentMethods(paymentMethods);

    // form
    setFormState({
      id: val.id,
      status_submission: val.its_open,
      status_absensi: val.absensi?.its_close,
      name_event: val.nama_kegiatan,
      type_implement: val.type_implement,
      category: val.category,
      tingkat_kegiatan: val.tingkat_kegiatan,
      lokasi: val.detail_kegiatan?.lokasi,
      tanggal_kegiatan: val.tanggal_kegiatan,
      waktu_pelaksanaan: val.detail_kegiatan?.waktu_pelaksanaan,
      gambar_kegiatan: val.detail_kegiatan?.gambar_kegiatan,
      file_pengajuan: val.detail_kegiatan?.file_pengajuan,
      deskripsi: val.detail_kegiatan?.deskripsi,
      narahubung: val.detail_kegiatan?.narahubung,
      metode_pembayaran: val.detail_kegiatan?.metode_pembayaran,
      harga_tiket: val.harga_tiket,
      sertifikat: val.detail_kegiatan?.sertifikat,
    });
  };

  const getEvent = () => {
    axios
      .get(
        `${getBaseUrl()}/event/private/get-event-by-id-and-ormawa/${idParam}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const dataRes: EventProps = res.data.data;
        setDefaultValue(dataRes);
        setEvent(dataRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [formState, setFormState] = useState({
    id: event?.id || parseInt(idParam),
    status_submission: event?.its_open,
    status_absensi: event?.absensi?.its_close,
    name_event: event?.nama_kegiatan,
    type_implement: event?.type_implement,
    category: event?.category,
    tingkat_kegiatan: event?.tingkat_kegiatan,
    lokasi: event?.detail_kegiatan?.lokasi,
    tanggal_kegiatan: event?.tanggal_kegiatan,
    waktu_pelaksanaan: event?.detail_kegiatan?.waktu_pelaksanaan,
    gambar_kegiatan: event?.detail_kegiatan?.gambar_kegiatan,
    file_pengajuan: event?.detail_kegiatan?.file_pengajuan,
    deskripsi: event?.detail_kegiatan?.deskripsi,
    narahubung: event?.detail_kegiatan?.narahubung,
    metode_pembayaran: event?.detail_kegiatan?.metode_pembayaran,
    harga_tiket: event?.harga_tiket,
    sertifikat: event?.detail_kegiatan?.sertifikat,
  });

  const hadletSaveSubmission = () => {
    const payloadEvent: CreateEventProps = {
      id: event!.id || parseInt(idParam),
      nama_kegiatan: formState.name_event || event!.nama_kegiatan,
      harga_tiket: formState.harga_tiket || 0,
      its_open: formState.status_submission,
      category: formState.category,
      tanggal_kegiatan: formState.tanggal_kegiatan || event!.tanggal_kegiatan,
      tingkat_kegiatan: formState.tingkat_kegiatan || event!.tingkat_kegiatan,
      type_implement: formState.type_implement || event!.type_implement,
      detail_kegiatan: {
        id: event!.detail_kegiatan!.id,
        waktu_pelaksanaan:
          formState.waktu_pelaksanaan ||
          event!.detail_kegiatan!.waktu_pelaksanaan,
        lokasi: formState.lokasi || event!.detail_kegiatan!.lokasi,
        deskripsi: formState.deskripsi || event!.detail_kegiatan!.deskripsi,
        category: formState.category || event!.category,
        gambar_kegiatan:
          formState.gambar_kegiatan || event!.detail_kegiatan!.gambar_kegiatan,
        file_pengajuan:
          formState.file_pengajuan || event!.detail_kegiatan!.file_pengajuan,
        status: event!.detail_kegiatan!.status,
        sertifikat: formState.sertifikat || event!.detail_kegiatan!.sertifikat,
      },
      narahubung: contactPersons.map((contactPerson) => ({
        detail_kegiatan_id: event!.detail_kegiatan!.id,
        judul: `Narahubung ${event?.nama_kegiatan}`,
        nama_narahubung: contactPerson.name,
        no_telepon: contactPerson.phoneNumber,
      })),
      metode_pembayaran: paymentMethods.map((paymentMethod) => ({
        detail_kegiatan_id: event!.detail_kegiatan!.id,
        metode_pembayaran: paymentMethod.payment_method,
        judul: `Pembayaran Tiket ${event?.nama_kegiatan}`,
        nama_bank: paymentMethod.bank_name,
        no_rekening: paymentMethod.account_number.toString(),
        pemilik: paymentMethod.owner_name,
      })),
      absensi: event?.absensi,
    };

    if (payloadEvent?.absensi?.its_close) {
      payloadEvent!.absensi!.its_close = formState.status_absensi || 1;
    }

    axios
      .put(
        `${getBaseUrl()}/event/private/update-event`,
        {
          ...payloadEvent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        uploadFile();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil disimpan",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data gagal disimpan",
        });
      });
  };

  const uploadFile = async () => {
    if (poster) {
      const formDataPoster = new FormData();
      formDataPoster.append("file", poster);
      axios
        .post(
          `${getBaseUrlLocalUpload()}/local/upload/poster`,
          formDataPoster,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (proposal) {
      const formDataProposal = new FormData();
      formDataProposal.append("file", proposal);
      axios
        .post(
          `${getBaseUrlLocalUpload()}/local/upload/proposal`,
          formDataProposal,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (selectedFileSertificate) {
      const formDataSertificate = new FormData();
      formDataSertificate.append("file", selectedFileSertificate);
      axios
        .post(
          `${getBaseUrlLocalUpload()}/local/upload/sertificate`,
          formDataSertificate,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (idParam) {
      getEvent();
    }
  }, [idParam]);

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
                  getStatusButtonColor(event?.detail_kegiatan?.status || ""),
                  "rounded-2xl"
                )}
              >
                {getStatusText(event?.detail_kegiatan?.status || "")}
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
              <Switch
                className={clsx("w-12 h-6")}
                defaultChecked={event?.its_open === 1 ? true : false}
                onCheckedChange={(e) => {
                  setFormState({
                    ...formState,
                    status_submission: e ? 1 : 0,
                  });
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className={clsx("font-semibold text-base")}>
                  Status Presensi
                </p>
                <p className={clsx("font-normal text-sm text-gray-400")}>
                  Manajemen untuk buka atau tutup presensi kehadiran
                </p>
              </div>
              <Switch
                className={clsx("w-12 h-6")}
                defaultChecked={event?.absensi?.its_close === 1 ? false : true}
                onCheckedChange={(e) => {
                  setFormState({
                    ...formState,
                    status_absensi: e ? 1 : 0,
                  });
                }}
              />
            </div>
          </div>
          {/* Informasi Event */}
          <div className={clsx("bg-white rounded-lg px-8 py-8 shadow-lg mt-8")}>
            <p className={clsx("font-semibold text-lg")}>Informasi Event</p>
            <p className={clsx("font-medium text-sm mt-8")}>Nama Event</p>
            <input
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Nama Event"
              defaultValue={event?.nama_kegiatan}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  name_event: e.target.value,
                });
              }}
            />
            <div className="flex justify-between mt-8">
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Pelaksanaan Event</p>
                <div className="flex mt-2 space-x-4">
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.type_implement === "offline"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        type_implement: "offline",
                      });
                    }}
                  >
                    Offline
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.type_implement === "online"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        type_implement: "online",
                      });
                    }}
                  >
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
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.category === "seminar"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        category: "seminar",
                      });
                    }}
                  >
                    Seminar
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.category === "lomba"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        category: "lomba",
                      });
                    }}
                  >
                    Lomba
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.category === "workshop"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        category: "workshop",
                      });
                    }}
                  >
                    Workshop
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.category === "hiburan"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        category: "hiburan",
                      });
                    }}
                  >
                    Hiburan
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.category === "kegiatan_sosial"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        category: "kegiatan_sosial",
                      });
                    }}
                  >
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
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.tingkat_kegiatan === "internal"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        tingkat_kegiatan: "internal",
                      });
                    }}
                  >
                    Internal
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.tingkat_kegiatan === "nasional"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        tingkat_kegiatan: "nasional",
                      });
                    }}
                  >
                    Nasional
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.tingkat_kegiatan === "regional"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        tingkat_kegiatan: "regional",
                      });
                    }}
                  >
                    Regional
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.tingkat_kegiatan === "internasional"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        tingkat_kegiatan: "internasional",
                      });
                    }}
                  >
                    Internasional
                  </Button>
                </div>
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>
                  Tempat Pelaksanaan
                </p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2"
                  )}
                  placeholder="Masukkan tempat pelaksanaan event kamu"
                  defaultValue={event?.detail_kegiatan?.lokasi}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      lokasi: e.target.value,
                    });
                  }}
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
                        variant={"outline"}
                      >
                        {date ? (
                          format(date, "PPP")
                        ) : formState?.tanggal_kegiatan ? (
                          format(new Date(formState?.tanggal_kegiatan), "PPP")
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
                  defaultValue={formState?.waktu_pelaksanaan}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      waktu_pelaksanaan: e.target.value,
                    });
                  }}
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
                  {/* todo: image poster */}
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setPoster(e.target.files[0]);
                        setFormState({
                          ...formState,
                          gambar_kegiatan: e.target.files[0].name,
                        });
                      }
                    }}
                  />
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
                  {/* todo: image proposal */}
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setProposal(e.target.files[0]);
                        setFormState({
                          ...formState,
                          file_pengajuan: e.target.files[0].name,
                        });
                      }
                    }}
                  />
                </div>
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
                  diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
            </div>
            <p className={clsx("font-medium text-sm mt-8")}>Deskripsi</p>
            <input
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Ketikkan deskripsi event kamu"
              defaultValue={event?.detail_kegiatan?.deskripsi}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  deskripsi: e.target.value,
                });
              }}
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
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    defaultValue={contactPerson.name}
                    placeholder="Ketikkan nama lengkap"
                    onChange={(e) => {
                      const newContactPersons = [...contactPersons];
                      newContactPersons[index].name = e.target.value;
                      setContactPersons(newContactPersons);
                    }}
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nomor Telepon
                  </p>
                  <input
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    defaultValue={contactPerson.phoneNumber}
                    placeholder="Ketikkan nomor telepon"
                    onChange={(e) => {
                      const newContactPersons = [...contactPersons];
                      newContactPersons[index].phoneNumber = e.target.value;
                      setContactPersons(newContactPersons);
                    }}
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
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      (formState?.harga_tiket || 0) > 0
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        harga_tiket:
                          (formState?.harga_tiket || 0) > 0
                            ? formState?.harga_tiket
                            : 1,
                      });
                    }}
                  >
                    Berbayar
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      formState?.harga_tiket === 0
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        harga_tiket: 0,
                      });
                    }}
                  >
                    Gratis
                  </Button>
                </div>
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Harga Tiket</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2"
                  )}
                  type="number"
                  defaultValue={event?.harga_tiket}
                  value={formState?.harga_tiket}
                  placeholder="Masukkan harga tiket"
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      harga_tiket: parseInt(e.target.value) || 0,
                    });
                  }}
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
                    defaultValue={paymentMethod.payment_method}
                    onChange={(e) => {
                      const newPaymentMethods = [...paymentMethods];
                      newPaymentMethods[index].payment_method = e.target.value;
                      setPaymentMethods(newPaymentMethods);
                    }}
                  >
                    {Object.values(paymentMethodEnum).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <p className={clsx("font-medium text-sm mt-4")}>Nama Bank</p>
                  <input
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nama bank"
                    defaultValue={paymentMethod.bank_name}
                    onChange={(e) => {
                      const newPaymentMethods = [...paymentMethods];
                      newPaymentMethods[index].bank_name = e.target.value;
                      setPaymentMethods(newPaymentMethods);
                    }}
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nomor Rekening
                  </p>
                  <input
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nomor rekening"
                    defaultValue={paymentMethod.account_number}
                    onChange={(e) => {
                      const newPaymentMethods = [...paymentMethods];
                      newPaymentMethods[index].account_number = e.target.value;
                      setPaymentMethods(newPaymentMethods);
                    }}
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nama Pemilik Rekening
                  </p>
                  <input
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nama pemilik rekening"
                    defaultValue={paymentMethod.owner_name}
                    onChange={(e) => {
                      const newPaymentMethods = [...paymentMethods];
                      newPaymentMethods[index].owner_name = e.target.value;
                      setPaymentMethods(newPaymentMethods);
                    }}
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
          {/* sertificate */}
          <div className={clsx("bg-white rounded-lg px-8 py-8 shadow-lg mt-8")}>
            <p className={clsx("font-medium text-lg")}>Sertifikat</p>
            <p className={clsx("font-medium text-sm mt-8")}>
              Sertifikat peserta
            </p>
            <div
              className={clsx(
                "flex items-center justify-center w-full border border-gray-300 rounded-md relative bg-gray-100 cursor-pointer h-40"
              )}
            >
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setSelectedFileSertificate(e.target.files[0]);
                  }
                }}
              />
            </div>
            <p className={clsx("text-xs text-gray-400 font-medium")}>
              Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
              diperbolehkan: .JPG .JPEG .PNG
            </p>
          </div>

          <div className="flex space-x-4 mt-8 w-full justify-end">
            <Button variant={"outline"}>Batalkan</Button>
            {/* <Button variant={"outline"}>Simpan & Tambah Baru</Button> */}
            <Button
              className={clsx("bg-poppy-500")}
              onClick={hadletSaveSubmission}
            >
              Simpan Pengajuan
            </Button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default SubmissedEventOrganization;
