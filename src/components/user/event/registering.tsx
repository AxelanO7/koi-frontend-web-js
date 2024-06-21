import { getBaseUrl, getBaseUrlLocalUpload } from "@/helpers/api";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ShortDescriptionEvent from "./short-description-event";
import { DetailEventProps, PaymentProps } from "@/types/event";
import { UserProps } from "@/types/user";

const RegisteringEventSection = ({
  eventProps = {} as DetailEventProps,
  paymentProps = {} as PaymentProps,
}) => {
  const [profile, setProfile] = useState<UserProps>({} as UserProps);

  // form
  const selectedFile = (e) => {
    setPaymentProof(e.target.files[0]);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState<number>(1234);
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentProof, setPaymentProof] = useState<File>();

  const submit = () => {
    const payload = {
      nama_peserta: name,
      mahasiswa_id: nim,
      email,
      event_id: eventProps.event_id,
      no_telepon: phone,
      institusi: institution,
      tipe_pembayaran: paymentMethod,
      bukti_pembayaran: paymentProof?.name,
    };
    axios
      .post(`${getBaseUrl()}/pembayaran/private/create`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(
        (res) => {
          console.log(res);
          uploadFileProof();
          Swal.fire({
            title: "Berhasil",
            text: "Pendaftaran event berhasil disimpan",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href = "/";
          });
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: "Gagal",
            text: "Pendaftaran event gagal disimpan",
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            // window.location.href = "/";
          });
        }
      );
  };

  const getProfile = () => {
    axios
      .get(`${getBaseUrl()}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        const dataRes: UserProps = res.data.data;
        setProfile(dataRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFileProof = () => {
    console.log(paymentProof);
    if (paymentProof) {
      const formData = new FormData();
      formData.append("file", paymentProof);
      axios
        .post(`${getBaseUrlLocalUpload()}/local/upload/proof`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
            <div className={clsx("flex w-full")}>
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Nama</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Ketikkan nama lengkapmu"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-12" />
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>No Telepon</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Ketikkan no teleponmu"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="h-4" />
            <div className={clsx("flex w-full")}>
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Email</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Ketikkan emailmu"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Tuliskan penjelasan disini
                </p>
              </div>
              <div className="w-12" />
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Institusi</p>
                <input
                  className={clsx(
                    "border bordery-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Masukkan asal sekolah, kampus, komunitas"
                  onChange={(e) => setInstitution(e.target.value)}
                />
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Ketik umum jika kamu bukan mahaasiswa
                </p>
              </div>
            </div>
            <div className="h-4" />
            <div className={clsx("flex w-full")}>
              <div className={clsx("w-full space-y-1")}>
                <p className={clsx("font-medium text-sm")}>NIM</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Masukkan NIM kamu"
                  type="number"
                  onChange={(e) => setNim(parseInt(e.target.value))}
                />
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Masukan NIM jika mahasiswa INSTIKI, selain itu tulis 1234
                </p>
              </div>
              <div className="w-24" />
              <div className={clsx("w-full space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Metode Pembayaran</p>
                <div className="flex space-x-2">
                  <button
                    className={clsx(
                      "border rounded-xl px-3 py-1 font-normal text-sm border-gray-300",
                      paymentMethod === "cod" ? "bg-poppy-500 text-white" : ""
                    )}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    COD
                  </button>
                  <button
                    className={clsx(
                      "border rounded-xl px-3 py-1 font-normal text-sm border-gray-300",
                      paymentMethod === "transfer"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => setPaymentMethod("transfer")}
                  >
                    Transfer Bank
                  </button>
                  <button
                    className={clsx(
                      "border rounded-xl px-3 py-1 font-normal text-sm border-gray-300",
                      paymentMethod === "ewallet"
                        ? "bg-poppy-500 text-white"
                        : ""
                    )}
                    onClick={() => setPaymentMethod("ewallet")}
                  >
                    Transfer E-Wallet
                  </button>
                </div>
              </div>
            </div>
            <div className="h-4" />
            <div className="space-y-2">
              <p className={clsx("font-medium text-sm")}>Bukti Pembayaran</p>
              <div
                className={clsx(
                  "flex items-center justify-center w-96 h-40 border border-gray-300 rounded-md relative bg-gray-100 cursor-pointer"
                )}
              >
                <input type="file" onChange={selectedFile} />
              </div>
              <p className={clsx("text-xs text-gray-400 font-medium")}>
                Bukti pembayaran digunakan untuk verifikasi identitas pendaftar
              </p>
            </div>
            <div className="h-4" />
            <div className="flex space-x-4 font-medium text-sm">
              <button
                className={clsx("rounded-md px-12 py-1 border border-gray-300")}
              >
                Batalkan
              </button>
              <button
                className={clsx(
                  "rounded-md px-12 py-1 bg-poppy-500 text-white"
                )}
                onClick={submit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteringEventSection;
