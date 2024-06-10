import { Button } from "@/shadcn/components/ui/button";
import { ResponseEventByOrmawa } from "@/types/user";
import clsx from "clsx";

const Banner = ({
  eventByOrmawa,
}: {
  eventByOrmawa: ResponseEventByOrmawa;
}) => {
  return (
    <>
      <img
        src="https://via.placeholder.com/800"
        className="w-full h-[400px] object-cover rounded-b-xl"
        alt="Organization Banner"
      />
      <div className="flex items-center justify-between mt-4 mx-8 h-min">
        <img
          src="https://via.placeholder.com/200"
          className="w-48 h-48 object-cover rounded-full absolute -translate-y-16 border-4 border-gray-100"
          alt="Organization Logo"
        />
        <div className={clsx("ml-56")}>
          <p className={clsx("font-semibold text-2xl")}>
            {eventByOrmawa.ormawa.nama_ormawa}
          </p>
          <div
            className={clsx(
              "font-normal text-base flex space-x-2 items-center"
            )}
          >
            <p>Organisasi Kemahasiswaan</p>
            <div className="bg-gray-300 rounded-full h-4 w-4" />
            <p>{eventByOrmawa.event.length} Event</p>
          </div>
        </div>
        <Button className={clsx("bg-poppy-500")}>Bagikan</Button>
      </div>
    </>
  );
};

export default Banner;
