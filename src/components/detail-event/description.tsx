import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import {
  CalendarIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

const DescriptionSection = () => {
  const priceEvent = 240000;
  const [infull, setInfull] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  return (
    <>
      <div className="w-full">
        <p className="font-semibold text-2xl">
          SEMINAR NASIONAL HIMA-TI INSTIKI 2023 : How Social Media Shaping
          Society
        </p>
        <p className="font-bold text-3xl text-poppy-500 mt-2">
          {priceEvent.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        </p>
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2 items-center font-semibold">
            <CalendarIcon className="w-5 h-5" />
            <p>12 Agustus 2024</p>
          </div>
          <div className="flex space-x-2 items-center font-semibold">
            <ClockIcon className="w-5 h-5" />
            <p>08:30 WITA</p>
          </div>
          <div className="flex space-x-2 items-center font-semibold">
            <MapPinIcon className="w-5 h-5" />
            <p>Aula INSTIKI</p>
          </div>
          <div className="flex space-x-2 items-center font-semibold">
            <ChartBarIcon className="w-5 h-5" />
            <p>Nasional</p>
          </div>
        </div>
        <Tabs
          defaultValue="desc"
          onValueChange={(value) => setActiveTab(value)}
          className={clsx("space-y-4")}
        >
          <TabsList className={clsx("mt-12 font-bold")}>
            <TabsTrigger
              value="desc"
              className={clsx(
                "text-gray-500 border-y-2 border-gray-300 w-1/3",
                activeTab === "desc"
                  ? "text-poppy-500 border-b-2 border-b-poppy-500"
                  : ""
              )}
            >
              <p className={clsx("py-2")}>Deskripsi</p>
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className={clsx(
                "text-gray-500 border-y-2 border-gray-300 w-1/3",
                activeTab === "payment"
                  ? "text-poppy-500 border-b-2 border-b-poppy-500"
                  : ""
              )}
            >
              <p className={clsx("py-2")}>Pembayaran</p>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className={clsx(
                "text-gray-500 border-y-2 border-gray-300 w-1/3",
                activeTab === "contact"
                  ? "text-poppy-500 border-b-2 border-b-poppy-500"
                  : ""
              )}
            >
              <p className={clsx("py-2")}>Kontak</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="desc">
            <p className={clsx("text-gray-500", infull ? "" : "line-clamp-5")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              quasi tenetur fugit voluptate eligendi, cupiditate id ipsam
              ratione sequi nam facere eaque vitae dolores asperiores amet,
              eius, aliquam exercitationem vero ex esse! Vero molestiae
              exercitationem veniam obcaecati. Culpa ipsam dolore quasi vitae
              illum neque numquam impedit minus nobis voluptatum. Quaerat minima
              a officia qui obcaecati culpa excepturi accusamus tempore numquam
              consequuntur, dolor alias nobis modi exercitationem fugiat
              eligendi rerum temporibus beatae sapiente et! Consectetur
              accusantium officiis sapiente voluptate odit ipsa consequuntur
              libero, dolor eius reprehenderit inventore vel enim quibusdam
              quasi sit quaerat similique vitae. Mollitia quas quam illum in sit
              iste laudantium, officiis explicabo enim modi odit laborum dolor
              sequi. Itaque placeat iure repellendus distinctio maxime dicta
              numquam tempora eius corrupti, porro voluptatem voluptates
              consequatur accusamus, praesentium officiis voluptas eaque
              asperiores natus eum, doloribus assumenda repudiandae. Cupiditate
              optio aliquam culpa quidem laudantium pariatur ducimus commodi
              autem ipsam, earum amet voluptates asperiores excepturi tempora
              sequi tempore sunt perferendis animi? Illo corrupti dolore odit,
              quis quibusdam hic facilis! Eos commodi cumque perspiciatis ut
              repudiandae libero vero vitae dicta necessitatibus consequatur,
              fuga eligendi, unde maxime? Deserunt dolorum, aliquid dolor
              tempora autem obcaecati facere quis sequi consectetur eveniet
              distinctio dicta? Similique repudiandae voluptatibus soluta.
            </p>
            <div
              className={clsx(
                "flex items-center space-x-2 w-full justify-center mt-2"
              )}
            >
              <button
                onClick={() => setInfull(!infull)}
                className={clsx("text-poppy-500 cursor-pointer")}
              >
                {infull ? "Tampilkan lebih sedikit" : "Selengkapnya"}
              </button>
              <ChevronDownIcon
                className={clsx(
                  "w-5 h-5 text-poppy-500 transform transition duration-300 ease-in-out",
                  infull ? "rotate-180" : ""
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="payment">
            <p className={clsx("text-gray-500", infull ? "" : "line-clamp-3")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto pariatur aliquid optio praesentium doloribus vitae rem
              magni repudiandae numquam vel officiis et exercitationem at
              distinctio, quae quis deserunt, eveniet quos. Veritatis commodi
              similique quod, cumque veniam beatae expedita odio eius atque
              autem nostrum, est voluptas modi culpa fuga voluptatibus iste.
            </p>
            {/* <div
              className={clsx(
                "flex items-center space-x-2 w-full justify-center mt-2"
              )}
            >
              <button
                onClick={() => setInfull(!infull)}
                className={clsx("text-poppy-500 cursor-pointer")}
              >
                {infull ? "Tampilkan lebih sedikit" : "Selengkapnya"}
              </button>
              <ChevronDownIcon
                className={clsx(
                  "w-5 h-5 text-poppy-500 transform transition duration-300 ease-in-out",
                  infull ? "rotate-180" : ""
                )}
              />
            </div> */}
          </TabsContent>
          <TabsContent value="contact">
            <p className={clsx("text-gray-500", infull ? "" : "line-clamp-3")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto pariatur aliquid optio praesentium doloribus vitae rem
              magni repudiandae numquam vel officiis et exercitationem at
              distinctio, quae quis deserunt, eveniet quos. Veritatis commodi
              similique quod, cumque veniam beatae expedita odio eius atque
              autem nostrum, est voluptas modi culpa fuga voluptatibus iste.
            </p>
            {/* <div
              className={clsx(
                "flex items-center space-x-2 w-full justify-center mt-2"
              )}
            >
              <button
                onClick={() => setInfull(!infull)}
                className={clsx("text-poppy-500 cursor-pointer")}
              >
                {infull ? "Tampilkan lebih sedikit" : "Selengkapnya"}
              </button>
              <ChevronDownIcon
                className={clsx(
                  "w-5 h-5 text-poppy-500 transform transition duration-300 ease-in-out",
                  infull ? "rotate-180" : ""
                )}
              />
            </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DescriptionSection;
