import CustomSpinner from "@/components/global/spinner";
import { getBaseUrl, getBaseUrlLocalUpload } from "@/helpers/api";
import BaseLayout from "@/layouts/base";
import { DetailEventProps } from "@/types/event";
import { UserProps } from "@/types/user";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AbsentingPage = () => {
  const idParam = window.location.pathname.split("/")[3];
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<DetailEventProps>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [paymentProof, setPaymentProof] = useState<File>();

  const [profile, setProfile] = useState<UserProps>({} as UserProps);

  useEffect(() => {
    if (idParam) {
      getDetailEventById();
    }
    getProfile();
  }, [idParam]);

  const getDetailEventById = async () => {
    let eventById: DetailEventProps = {} as DetailEventProps;
    setIsLoading(true);
    await axios
      .get(`${getBaseUrl()}/detail-kegiatan/public/get-by-id/${idParam}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: DetailEventProps = res.data.data;
        eventById = dataRes;
      })
      .catch((err) => {
        console.log(err);
      });
    setEvent(eventById);
    setIsLoading(false);
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

  const selectedFile = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
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

  const submit = () => {
    if (!event) return;
    const paymentProofName = paymentProof?.name;
    const payload = {
      event_id: event.event_id,
      user_id: profile.id,
      name_mahasiswa: name,
      no_telepon: phone,
      institusi: institution,
      status: "pending",
      bukti_pembayaran: paymentProofName,
      category: event?.event?.category,
      tanggal_kegiatan: event?.event?.tanggal_kegiatan,
      tingkat_kegiatan: event?.event?.tingkat_kegiatan,
    };

    // validate payload empty
    if (
      !payload.name_mahasiswa ||
      !payload.no_telepon ||
      !payload.institusi ||
      !payload.bukti_pembayaran
    ) {
      Swal.fire({
        icon: "error",
        title: "Data tidak boleh kosong",
        text: "Silahkan isi semua data",
      });
      return;
    }

    axios
      .post(`${getBaseUrl()}/absensi/public/create`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        uploadFileProof();
        Swal.fire({
          icon: "success",
          title: "Presensi berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = `/event/register/${idParam}`;
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Presensi gagal",
          text: "Silahkan coba lagi",
        });
      });
  };
  return (
    <>
      <BaseLayout>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <div className={clsx("max-w-lg flex flex-col mx-auto")}>
            <p className={clsx("font-semibold text-xl")}>Absensi Kehadiran</p>
            <div className={clsx("space-y-1 w-full mt-8")}>
              <p className={clsx("font-medium text-sm")}>Nama</p>
              <input
                className={clsx(
                  "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                )}
                placeholder="Ketikkan nama lengkapmu"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className={clsx("space-y-1 w-full")}>
              <p className={clsx("font-medium text-sm")}>No Telepon</p>
              <input
                className={clsx(
                  "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                )}
                placeholder="Ketikkan no teleponmu"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className={clsx("space-y-1 w-full")}>
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
            <div className="flex space-x-4 font-medium text-sm w-full">
              <button
                className={clsx(
                  "rounded-md px-12 py-1 border border-gray-300 flex-grow"
                )}
              >
                Batalkan
              </button>
              <button
                className={clsx(
                  "rounded-md px-12 py-1 bg-poppy-500 text-white flex-grow"
                )}
                onClick={submit}
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </BaseLayout>
    </>
  );
};

export default AbsentingPage;
