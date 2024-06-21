import { getImageUpload } from "@/helpers/image";
import { DetailEventProps } from "@/types/event";

const OwnershipSection = ({ event }: { event: DetailEventProps }) => {
  const handleOrganization = () => {};

  return (
    <>
      <div className="space-y-2">
        <img
          src={getImageUpload({
            type: "poster",
            fileName: event.gambar_kegiatan,
          })}
          className="object-cover w-full h-96 rounded-lg"
        />
        <p className="font-semibold text-base">Penyelenggara</p>
        <div className="flex items-center space-x-4">
          <img
            src={getImageUpload({
              type: "ormawa",
              fileName: event.event?.ormawa?.logo,
            })}
            className="object-cover w-12 h-12 rounded-full"
          />
          <div>
            <p
              className="font-semibold text-base cursor-pointer"
              onClick={handleOrganization}
            >
              {event.event?.ormawa?.nama_ormawa || "HIMA-TI INSTIKI"}
            </p>
            <p className="font-medium text-sm text-gray-400 cursor-pointer">
              Organisasi Kemahasiswaan
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnershipSection;
