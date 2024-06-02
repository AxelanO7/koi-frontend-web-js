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
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { CreateEventProps } from "@/types/create";
import { User } from "@/types/user";
import Swal from "sweetalert2";

interface ContactPersonCard {
  name: string;
  phoneNumber: string;
}

interface PaymentMethodCard {
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

const SubmissionEventOrganization = () => {
  // form event submission
  const [nameEvent, setNameEvent] = useState<string>();
  const [implementEvent, setImplementEvent] = useState<string>();
  const [categoryEvent, setCategoryEvent] = useState<string>();
  const [scopeEvent, setScopeEvent] = useState<string>();
  const [placeEvent, setPlaceEvent] = useState<string>();
  const [dateEvent, setDateEvent] = useState<Date>();
  const [timeEvent, setTimeEvent] = useState<string>();

  // form applicant
  const [descEvent, setDescEvent] = useState<string>();
  const [selectedFilePoster, setSelectedFilePoster] = useState<File>();
  const [selectedProposalEvent, setSelectedProposalEvent] = useState<File>();

  // form contact person
  const [contactPersons, setContactPersons] = useState<ContactPersonCard[]>([
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

  // form price event
  const [priceTicketEvent, setPriceTicketEvent] = useState<number>();
  const [typePriceEvent, setTypePriceEvent] = useState<string>();

  // form payment method
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodCard[]>([
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

  const handleSubmitEvent = () => {
    // const data = {
    //   nameEvent,
    //   isOnlineEvent: implementEvent,
    //   categoryEvent,
    //   scopeEvent,
    //   placeEvent,
    //   dateEvent,
    //   timeEvent,
    //   nameApplicant: descEvent,
    //   selectedFilePoster,
    //   selectedProposalEvent,
    //   contactPersons,
    //   priceTicketEvent,
    //   typePriceEvent,
    //   paymentMethods,
    // };
    // console.log(data);

    const payload: CreateEventProps = {
      // id: 0,
      ormawa_id: profile?.ormawa?.id ?? 0,
      nama_kegiatan: nameEvent ?? "",
      tanggal_kegiatan: dateEvent?.toISOString() ?? "",
      tingkat_kegiatan: scopeEvent ?? "",
      harga_tiket: priceTicketEvent ?? 0,
      detail_kegiatan: {
        // id: 0,
        // event_id: 0,
        waktu_pelaksanaan: timeEvent ?? "",
        lokasi: placeEvent ?? "",
        status: "pending",
        deskripsi: descEvent ?? "",
        gambar_kegiatan: selectedFilePoster?.name ?? "",
        file_pengajuan: selectedProposalEvent?.name ?? "",
      },
      metode_pembayaran: paymentMethods.map((paymentMethod) => ({
        // id: 0,
        // detail_kegiatan_id: 0,
        judul: `Pembayaran Tiket ${nameEvent}`,
        nama_bank: paymentMethod.bankName,
        no_rekening: paymentMethod.accountNumber.toString(),
        pemilik: paymentMethod.ownerName,
      })),
      narahubung: contactPersons.map((contactPerson) => ({
        // id: 0,
        // detail_kegiatan_id: 0,
        judul: `Narahubung ${nameEvent} ${contactPerson.name}`,
        nama_narahubung: contactPerson.name,
        no_telepon: contactPerson.phoneNumber,
      })),
    };
    console.log(payload);
    axios
      .post(`${getBaseUrl()}/event/private/create-event`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(
        (res) => {
          console.log(res);
          Swal.fire({
            title: "Berhasil",
            text: "Pengajuan event berhasil disimpan",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // window.location.href = "/organization/event";
          });
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: "Gagal",
            text: "Pengajuan event gagal disimpan",
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            // window.location.href = "/organization/event";
          });
        }
      );
  };

  const [profile, setProfile] = useState<User>();

  const getProfile = () => {
    axios
      .get(`${getBaseUrl()}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        const dataRes: User = res.data.data;
        setProfile(dataRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

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
          {/* Informasi Event */}
          <div className={clsx("bg-white rounded-lg px-8 py-8 shadow-lg mt-8")}>
            <p className={clsx("font-medium text-lg")}>Informasi Event</p>
            <p className={clsx("font-medium text-sm mt-8")}>Nama Event</p>
            <input
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Nama Event"
              onChange={(e) => setNameEvent(e.target.value)}
            />
            <div className="flex justify-between mt-8">
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Pelaksanaan Event</p>
                <div className="flex mt-2 space-x-4">
                  <Button
                    variant={"outline"}
                    className={clsx(
                      implementEvent === "offline"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500"
                    )}
                    onClick={() => setImplementEvent("offline")}
                  >
                    Offline
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      implementEvent === "online"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500 bg-white"
                    )}
                    onClick={() => setImplementEvent("online")}
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
                    className={
                      (clsx("rounded-2xl"),
                      categoryEvent === "Seminar"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setCategoryEvent("Seminar")}
                  >
                    Seminar
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      categoryEvent === "Lomba"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setCategoryEvent("Lomba")}
                  >
                    Lomba
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      categoryEvent === "Workshop"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setCategoryEvent("Workshop")}
                  >
                    Workshop
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      categoryEvent === "Hiburan"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setCategoryEvent("Hiburan")}
                  >
                    Hiburan
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      categoryEvent === "Kegiatan Sosial"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setCategoryEvent("Kegiatan Sosial")}
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
                    className={
                      (clsx("rounded-2xl"),
                      scopeEvent === "Internasional"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setScopeEvent("Internasional")}
                  >
                    Internasional
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      scopeEvent === "Nasional"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setScopeEvent("Nasional")}
                  >
                    Nasional
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      scopeEvent === "Regional"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setScopeEvent("Regional")}
                  >
                    Regional
                  </Button>
                  <Button
                    variant={"outline"}
                    className={
                      (clsx("rounded-2xl"),
                      scopeEvent === "Internal"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500")
                    }
                    onClick={() => setScopeEvent("Internal")}
                  >
                    Internal
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
                  onChange={(e) => setPlaceEvent(e.target.value)}
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
                          "border border-gray-300 rounded-md text-sm w-full shadow-none text-gray-400 bg-white px-4 py-5 flex items-center justify-between",
                          dateEvent && "text-black"
                        )}
                        variant={"outline"}
                      >
                        {dateEvent ? (
                          format(dateEvent, "PPP")
                        ) : (
                          <span>Masukkan tanggal pelaksanaan event</span>
                        )}

                        <CalendarDaysIcon className="w-5 h-5 ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateEvent}
                        onSelect={setDateEvent}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-16" />
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Waktu Event</p>
                <select
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2 bg-white shadow-none appearance-none cursor-pointer"
                  )}
                  value={timeEvent}
                  onChange={(e) => setTimeEvent(e.target.value)}
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
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedFilePoster(e.target.files[0]);
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
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedProposalEvent(e.target.files[0]);
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
              onChange={(e) => setDescEvent(e.target.value)}
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
              {contactPersons.map((_, index) => (
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
                    placeholder="Ketikkan nama lengkap"
                    onChange={(e) =>
                      setContactPersons(
                        contactPersons.map((item, i) =>
                          i === index ? { ...item, name: e.target.value } : item
                        )
                      )
                    }
                  />
                  <p className={clsx("font-medium text-sm mt-4")}>
                    Nomor Telepon
                  </p>
                  <input
                    className={clsx(
                      "border border-gray-300 rounded-lg w-full p-2 mt-2"
                    )}
                    placeholder="Ketikkan nomor telepon"
                    onChange={(e) =>
                      setContactPersons(
                        contactPersons.map((item, i) =>
                          i === index
                            ? { ...item, phoneNumber: e.target.value }
                            : item
                        )
                      )
                    }
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
                      typePriceEvent === "Berbayar"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500"
                    )}
                    onClick={() => setTypePriceEvent("Berbayar")}
                  >
                    Berbayar
                  </Button>
                  <Button
                    variant={"outline"}
                    className={clsx(
                      "rounded-2xl",
                      typePriceEvent === "Gratis"
                        ? "bg-poppy-500 text-white"
                        : "text-gray-500"
                    )}
                    onClick={() => setTypePriceEvent("Gratis")}
                  >
                    Gratis
                  </Button>
                </div>
              </div>
              <div className={clsx("w-full")}>
                <p className={clsx("font-medium text-sm")}>Harga Tiket</p>
                <input
                  type="number"
                  className={clsx(
                    "border border-gray-300 rounded-lg w-full p-2 mt-2"
                  )}
                  placeholder="Masukkan harga tiket"
                  onChange={(e) =>
                    setPriceTicketEvent(parseInt(e.target.value))
                  }
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
                    onChange={(e) => {
                      if (e.target.value) {
                        setPaymentMethods(
                          paymentMethods.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  paymentMethod: e.target
                                    .value as paymentMethodEnum,
                                } // Convert the value to the appropriate enum type
                              : item
                          )
                        );
                      }
                    }}
                  >
                    {Object.values(paymentMethodEnum).map((value) => (
                      <option
                        key={value}
                        value={value}
                        selected={paymentMethod.paymentMethod === value}
                      >
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
                    onChange={(e) => {
                      setPaymentMethods(
                        paymentMethods.map((item, i) =>
                          i === index
                            ? { ...item, bankName: e.target.value }
                            : item
                        )
                      );
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
                    onChange={(e) => {
                      setPaymentMethods(
                        paymentMethods.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                accountNumber: parseInt(e.target.value),
                              }
                            : item
                        )
                      );
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
                    onChange={(e) => {
                      setPaymentMethods(
                        paymentMethods.map((item, i) =>
                          i === index
                            ? { ...item, ownerName: e.target.value }
                            : item
                        )
                      );
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
          <div className="flex space-x-4 mt-8 w-full justify-end">
            <Button variant={"outline"}>Batalkan</Button>
            <Button variant={"outline"}>Simpan & Tambah Baru</Button>
            <Button
              className={clsx("bg-poppy-500")}
              onClick={handleSubmitEvent}
            >
              Simpan Pengajuan
            </Button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default SubmissionEventOrganization;
