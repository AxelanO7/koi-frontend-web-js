import { Button } from "@/shadcn/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn/components/ui/tabs";
import clsx from "clsx";
import { useState } from "react";
import { AbsentProps, DetailEventProps, PaymentProps } from "@/types/event";
import ShortDescriptionEvent from "./short-description-event";
import Swal from "sweetalert2";
import { getImageUpload } from "@/helpers/image";
import sertificationImage from "@/assets/images/sertif.png";

const RegisteredEventSection = ({
  eventProps,
  paymentProps,
  isAbsentProps,
  absentProps,
}: {
  eventProps: DetailEventProps;
  paymentProps: PaymentProps;
  isAbsentProps: boolean;
  absentProps: AbsentProps;
}) => {
  enum listActiveTab {
    information = "information",
    absent = "absent",
  }

  const [activeTab, setActiveTab] = useState<listActiveTab>(
    listActiveTab.information
  );

  const datePayment = new Date(
    eventProps.metode_pembayaran?.[0]?.created_at ?? new Date()
  ).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timePayment = new Date(
    paymentProps?.created_at || new Date()
  ).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getStatusButtonPaymentColor = () => {
    if (paymentProps.status === "pending") {
      return "bg-blue-500";
    } else if (paymentProps.status === "rejected") {
      return "bg-danger";
    } else if (paymentProps.status === "approved") {
      return "bg-success";
    } else {
      return "bg-danger";
    }
  };

  const handleTapAbsent = () => {
    if (isAbsentProps) {
      Swal.fire({
        icon: "error",
        title: "Anda sudah presensi",
        text: "Anda tidak bisa presensi lebih dari satu kali",
      });
      return;
    }
    const idParams = window.location.pathname.split("/")[3];
    window.location.href = `/event/absent/${idParams}`;
  };

  const getTextStatusPayment = () => {
    if (paymentProps.status === "pending") {
      return "Ditinjau";
    } else if (paymentProps.status === "rejected") {
      return "Ditolak";
    } else if (paymentProps.status === "approved") {
      return "Diterima";
    } else {
      return "Ditolak";
    }
  };

  const getStatusButtonAbsentColor = (status: string) => {
    if (status === "pending") {
      return "bg-yellow-500";
    } else if (status === "rejected") {
      return "bg-danger";
    } else if (status === "approved") {
      return "bg-success";
    } else {
      return "bg-yellow-500";
    }
  };

  const getTextStatusAbsent = (status: string) => {
    switch (status) {
      case "pending":
        return "Ditinjau";
      case "rejected":
        return "Ditolak";
      case "approved":
        return "Diterima";
      default:
        return "Ditolak";
    }
  };

  const dateAbsent = new Date(
    absentProps.created_at || new Date()
  ).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeAbsent = new Date(
    absentProps.created_at || new Date()
  ).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const htmlImage = () => {
    const nameParticipant = absentProps.name_mahasiswa;
    return `
    <div  id="sertification">
        <img
          src=${sertificationImage}
          className="w-full h-full object-cover object-center"
        >
        </img>
        <div
          class="absolute top-[156px] left-0 right-0"
        >
          <p class="text-sm font-semibold text-black">
          ${nameParticipant}
          </p>
        </div>
    </div>
    `;
  };

  const handleSeeCertificate = () => {
    Swal.fire({
      html: htmlImage(),
      confirmButtonText: "Download",
      cancelButtonText: "Close",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const sertification = document.getElementById("sertification");
        if (sertification) {
          const canvas = document.createElement("canvas");
          canvas.width = sertification.clientWidth;
          canvas.height = sertification.clientHeight;
          const ctx = canvas.getContext("2d");
          // ctx with p tag
          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
              sertification.querySelector("img") as HTMLImageElement,
              0,
              0,
              canvas.width,
              canvas.height
            );
            ctx.font = "semibold 14px Arial";
            ctx.fillStyle = "#000000";
            const x = canvas.width / 2 - 100;
            ctx.fillText(
              sertification.querySelector("p")?.textContent || "",
              x,
              154
            );
            const link = document.createElement("a");
            link.download = "sertifikat.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }
        }
      }
    });
  };

  return (
    <>
      <div className={clsx("px-28")}>
        <p className={clsx("font-semibold text-xl")}>Pendaftaran Event</p>
        <div className={clsx("flex mt-4 space-x-16")}>
          <ShortDescriptionEvent
            eventProps={eventProps}
            paymentProps={paymentProps}
          />
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
                  <p className={clsx("py-2 px-4")}>Presensi</p>
                </TabsTrigger>
                <div className={clsx("h-0.5 bg-gray-300")} />
              </TabsList>
              <TabsContent value={listActiveTab.information}>
                <div className="h-4" />
                <div className={clsx("flex space-x-12")}>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Id Pendaftaran</p>
                    <p className={clsx("font-medium")}>{eventProps.event_id}</p>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Status Peserta</p>
                    <button
                      className={clsx(
                        "rounded-2xl text-white px-3 py-1 text-sm font-normal",
                        getStatusButtonPaymentColor()
                      )}
                    >
                      {getTextStatusPayment()}
                    </button>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Waktu Pendaftaran</p>
                    <p className={clsx("font-medium")}>
                      {datePayment}
                      {` (${timePayment})`}
                    </p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full mt-8 mb-4")} />
                <div className={clsx("space-y-4")}>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Nama</p>
                    <p className={clsx("text-lg ")}>
                      {paymentProps.nama_peserta}
                    </p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>
                      No Telepon
                    </p>
                    <p className={clsx("text-lg ")}>
                      {paymentProps.no_telepon}
                    </p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Email</p>
                    {/* todo: dynamic email */}
                    <p className={clsx("text-lg ")}>agus@gmail.com</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Institusi</p>
                    <p className={clsx("text-lg ")}>{paymentProps.institusi}</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>NIM</p>
                    <p className={clsx("text-lg ")}>
                      {paymentProps.mahasiswa_id}
                    </p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    {/* todo : dynamic metode pembayaran */}
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
                  {/* <img src="https://via.placeholder.com/150" /> */}
                  <img
                    src={getImageUpload({
                      type: "proof",
                      fileName: paymentProps.bukti_pembayaran,
                    })}
                  />
                  {/* <p className={clsx("text-lg font-medium")}>
                    {paymentProps.bukti_pembayaran}
                  </p> */}
                </div>
              </TabsContent>
              <TabsContent value={listActiveTab.absent}>
                <Button
                  className={clsx("bg-poppy-500")}
                  onClick={handleTapAbsent}
                >
                  Presensi Kehadiran
                  <PencilSquareIcon className={clsx("h-5 w-5 ml-2")} />
                </Button>
                {isAbsentProps && (
                  <div>
                    <div className="h-4" />
                    <div className={clsx("flex space-x-12")}>
                      <div className={clsx("text-sm space-y-6")}>
                        <p className={clsx("font-semibold")}>Id Pendaftaran</p>
                        <p className={clsx("font-medium")}>{absentProps.id}</p>
                      </div>
                      <div className={clsx("text-sm space-y-6")}>
                        <p className={clsx("font-semibold")}>Status Peserta</p>
                        <button
                          className={clsx(
                            "rounded-2xl text-white px-3 py-1 text-sm font-normal",
                            getStatusButtonAbsentColor(absentProps.status)
                          )}
                        >
                          {getTextStatusAbsent(
                            absentProps.status || "rejected"
                          )}
                        </button>
                      </div>
                      <div className={clsx("text-sm space-y-6")}>
                        <p className={clsx("font-semibold")}>
                          Waktu Pendaftaran
                        </p>
                        <p className={clsx("font-medium")}>
                          {dateAbsent}
                          {` (${timeAbsent})`}
                        </p>
                      </div>
                    </div>
                    <div
                      className={clsx("h-0.5 bg-gray-300 w-full mt-8 mb-4")}
                    />
                    <div className={clsx("space-y-4")}>
                      <div className="flex justify-between font-medium items-center">
                        <p className={clsx("text-base text-gray-400")}>Nama</p>
                        <p className={clsx("text-lg ")}>
                          {absentProps.name_mahasiswa}
                        </p>
                      </div>
                      <div className="flex justify-between font-medium items-center">
                        <p className={clsx("text-base text-gray-400")}>
                          No Telepon
                        </p>
                        <p className={clsx("text-lg ")}>
                          {absentProps.no_telepon}
                        </p>
                      </div>
                      <div className="flex justify-between font-medium items-center">
                        <p className={clsx("text-base text-gray-400")}>
                          Institusi
                        </p>
                        <p className={clsx("text-lg ")}>
                          {absentProps.institusi}
                        </p>
                      </div>
                    </div>
                    <div className={clsx("h-0.5 bg-gray-300 w-full my-4")} />
                    <p className={clsx("font-medium text-lg")}>
                      Bukti Pembayaran
                    </p>
                    <div
                      className={clsx(
                        "w-full flex flex-col justify-center items-center space-y-2 border border-gray-300 p-8 rounded-xl mt-4"
                      )}
                    >
                      <img
                        src={getImageUpload({
                          type: "proof",
                          fileName: absentProps.bukti_pembayaran,
                        })}
                      />
                      {/* <p className={clsx("text-lg font-medium")}>
                        {absentProps.bukti_pembayaran}
                      </p> */}
                    </div>
                    {absentProps.status === "approved" && (
                      <Button
                        className={clsx("bg-poppy-500 mt-8")}
                        onClick={handleSeeCertificate}
                      >
                        Lihat Sertifikat
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="h-12" />
      </div>
    </>
  );
};

export default RegisteredEventSection;
