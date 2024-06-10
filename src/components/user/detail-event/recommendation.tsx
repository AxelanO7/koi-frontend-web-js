import clsx from "clsx";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import EventItem from "./event-item";
import { EventProps } from "@/types/event";
import { Button } from "@/shadcn/components/ui/button";

const RecommendationSection = ({ events }: { events: EventProps[] }) => {
  const hadnleTapAll = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div>
        <div className="flex justify-between mt-8">
          <p className={clsx("font-semibold text-lg")}>
            Rekomendasi Event Lainnya
          </p>
          <Button className={clsx("bg-poppy-500 mr-4")} onClick={hadnleTapAll}>
            Lihat Semua
          </Button>
        </div>
        <ScrollArea
          className="rounded-md whitespace-nowrap overflow-x-auto mt-4"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className={clsx("mt-4 flex space-x-4 w-max")}>
            {events.map((item) => (
              <EventItem key={item.id} item={item} />
            ))}
          </div>
          <Scrollbar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default RecommendationSection;
