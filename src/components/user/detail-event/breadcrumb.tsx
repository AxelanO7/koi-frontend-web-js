import { DetailEventProps } from "@/types/event";

const BreadCrumb = ({ event }: { event: DetailEventProps }) => {
  return (
    <>
      <div className="flex">
        {/* {breadcrumbItems.map((item, index) => {
          return (
            <div key={index} className="flex">
              {index !== breadcrumbItems.length - 1 ? (
                <a href={item.url} className="text-poppy-500">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
              {index !== breadcrumbItems.length - 1 && (
                <span className="text-gray-400 mx-4">{">"}</span>
              )}
            </div>
          );
        })} */}
        <a href="/">Beranda</a>
        <span className="text-gray-400 mx-4">{">"}</span>
        <p className="cursor-pointer">
          {event.event?.category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))}
        </p>
        <span className="text-gray-400 mx-4">{">"}</span>
        <p className="text-poppy-500 cursor-pointer">
          {event.event?.nama_kegiatan
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))}
        </p>
      </div>
    </>
  );
};

export default BreadCrumb;
