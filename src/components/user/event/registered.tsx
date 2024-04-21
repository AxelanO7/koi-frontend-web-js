import { Button } from "@/shadcn/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import clsx from "clsx";
import { useState } from "react";
import ShortDescriptionEvent from "./short-description-event";

const RegisteredEventSection = () => {
  enum listActiveTab {
    information = "information",
    absent = "absent",
  }
  const [activeTab, setActiveTab] = useState<listActiveTab>(
    listActiveTab.information
  );
  enum listStatusParticipant {
    registered = "Terdaftar",
    rejected = "Ditolak",
    reviewed = "Ditinjau",
  }
  const statusParticipant: listStatusParticipant =
    listStatusParticipant.reviewed;

  const statusAbsent: listStatusParticipant = listStatusParticipant.rejected;
  return (
    <>
      <div className={clsx("px-28")}>
        <p className={clsx("font-semibold text-xl")}>Pendaftaran Event</p>
        <div className={clsx("flex mt-4 space-x-16")}>
          <ShortDescriptionEvent />

          <div className={clsx("w-full")}>
            <Tabs
              defaultValue="information"
              onValueChange={(value) => setActiveTab(value as listActiveTab)}
              className={clsx(
                "transition-all duration-300 ease-in-out space-y-6"
              )}
            >
              <TabsList className={clsx("font-bold text-gray-500")}>
                <TabsTrigger
                  value={listActiveTab.information}
                  className={clsx(
                    activeTab === listActiveTab.information
                      ? "text-poppy-500 border-b-2 border-b-poppy-500"
                      : ""
                  )}
                >
                  <p className={clsx("py-2 px-4")}>Informasi Pembayaran</p>
                </TabsTrigger>
                <TabsTrigger
                  value={listActiveTab.absent}
                  className={clsx(
                    activeTab === listActiveTab.absent
                      ? "text-poppy-500 border-b-2 border-b-poppy-500"
                      : ""
                  )}
                >
                  <p className={clsx("py-2 px-4")}>Absensi</p>
                </TabsTrigger>
                <div className={clsx("h-0.5 bg-gray-300")} />
              </TabsList>
              <TabsContent value={listActiveTab.information}>
                <div className="h-4" />
                <div className={clsx("flex space-x-12")}>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Id Pendaftaran</p>
                    <p className={clsx("font-medium")}>123456</p>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Status Peserta</p>
                    <button
                      className={clsx(
                        "rounded-2xl text-white px-3 py-1 text-sm font-normal",
                        statusParticipant === listStatusParticipant.reviewed
                          ? "bg-blue-500"
                          : statusParticipant === listStatusParticipant.rejected
                          ? "bg-danger"
                          : statusParticipant ===
                            listStatusParticipant.registered
                          ? "bg-success"
                          : "bg-danger"
                      )}
                    >
                      Ditinjau
                    </button>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Waktu Pendaftaran</p>
                    <p className={clsx("font-medium")}>
                      10 Desember 2023 (09.00)
                    </p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full mt-8 mb-4")} />
                <div className={clsx("space-y-4")}>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Nama</p>
                    <p className={clsx("text-lg ")}>Agus</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>
                      No Telepon
                    </p>
                    <p className={clsx("text-lg ")}>081123456789</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Email</p>
                    <p className={clsx("text-lg ")}>agus@gmail.com</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Institusi</p>
                    <p className={clsx("text-lg ")}>INSTIKI</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>NIM</p>
                    <p className={clsx("text-lg ")}>20101010</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>
                      Metode Pembayaran
                    </p>
                    <p className={clsx("text-lg ")}>Transfer Bank</p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full my-4")} />
                <p className={clsx("font-medium text-lg")}>Bukti Pembayaran</p>
                <div
                  className={clsx(
                    "w-full flex flex-col justify-center items-center space-y-2 border border-gray-300 p-8 rounded-xl mt-4"
                  )}
                >
                  <img src="https://via.placeholder.com/150" />
                  <p className={clsx("text-lg font-medium")}>
                    bukti_transfer.png
                  </p>
                </div>
              </TabsContent>
              <TabsContent value={listActiveTab.absent}>
                <Button className={clsx("bg-poppy-500")}>
                  Absen Kehadiran
                  <PencilSquareIcon className={clsx("h-5 w-5 ml-2")} />
                </Button>
                <div className="h-4" />
                <div className={clsx("flex space-x-12")}>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Id Pendaftaran</p>
                    <p className={clsx("font-medium")}>123456</p>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Status Peserta</p>
                    <button
                      className={clsx(
                        "rounded-2xl text-white px-3 py-1 text-sm font-normal",
                        statusAbsent === listStatusParticipant.rejected
                          ? "bg-danger"
                          : statusAbsent === listStatusParticipant.reviewed
                          ? "bg-blue-500"
                          : statusAbsent === listStatusParticipant.registered
                          ? "bg-success"
                          : "bg-danger"
                      )}
                    >
                      Ditinjau
                    </button>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Waktu Pendaftaran</p>
                    <p className={clsx("font-medium")}>
                      10 Desember 2023 (09.00)
                    </p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full mt-8 mb-4")} />
                <div className={clsx("space-y-4")}>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Nama</p>
                    <p className={clsx("text-lg ")}>Nama A</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>
                      No Telepon
                    </p>
                    <p className={clsx("text-lg ")}>081123456789</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Institusi</p>
                    <p className={clsx("text-lg ")}>INSTIKI</p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full my-4")} />
                <p className={clsx("font-medium text-lg")}>Bukti Pembayaran</p>
                <div
                  className={clsx(
                    "w-full flex flex-col justify-center items-center space-y-2 border border-gray-300 p-8 rounded-xl mt-4"
                  )}
                >
                  <img src="https://via.placeholder.com/150" />
                  <p className={clsx("text-lg font-medium")}>
                    bukti_transfer.png
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteredEventSection;
