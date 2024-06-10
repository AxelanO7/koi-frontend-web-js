import CustomSpinner from "@/components/global/spinner";
import Banner from "@/components/user/organization/banner";
import EventItem from "@/components/user/organization/event-item";
import SidebarSection from "@/components/user/organization/sidebar";
import { getBaseUrl } from "@/helpers/api";
import BaseLayout from "@/layouts/base";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shadcn/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { ResponseEventByOrmawa } from "@/types/user";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";

const OrganizationUser = () => {
  const idParam = window.location.pathname.split("/")[2];
  const [activeTab, setActiveTab] = useState("event");
  const [organization, setOrganization] = useState<ResponseEventByOrmawa>();
  const [isLoading, setIsLoading] = useState(false);

  const getDetailEventByIDOrmawa = () => {
    axios
      .get(`${getBaseUrl()}/event/public/get-event-by-ormawa/${idParam}`)
      .then((res) => {
        console.log(res.data);
        const dataRes: ResponseEventByOrmawa = res.data.data;
        setOrganization(dataRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([getDetailEventByIDOrmawa()]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  useEffect(() => {
    if (idParam) {
      fetchData();
    }
  }, [idParam]);

  return (
    <>
      <BaseLayout isPaddingHeader={false}>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <div className="px-28">
            {organization && <Banner eventByOrmawa={organization} />}
            <Tabs
              defaultValue="event"
              onValueChange={(value) => setActiveTab(value)}
              className={clsx(
                "mt-8 border-t-2 border-gray-300 transition-all duration-300 ease-in-out space-y-6"
              )}
            >
              <TabsList className={clsx("font-bold text-gray-500")}>
                <TabsTrigger
                  value="event"
                  className={clsx(
                    activeTab === "event"
                      ? "text-poppy-500 border-b-2 border-b-poppy-500"
                      : ""
                  )}
                >
                  <p className={clsx("py-2 px-4")}>Event</p>
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className={clsx(
                    activeTab === "about"
                      ? "text-poppy-500 border-b-2 border-b-poppy-500"
                      : ""
                  )}
                >
                  <p className={clsx("py-2 px-4")}>Tentang Ormawa</p>
                </TabsTrigger>
                <div className={clsx("h-0.5 bg-gray-300")} />
              </TabsList>
              <TabsContent value="event">
                <div className="flex space-x-8">
                  <SidebarSection />
                  <div className={clsx("w-full")}>
                    <div className="flex justify-between">
                      <div className="flex space-x-2 items-center bg-white border border-gray-200 rounded-md px-2 py-2">
                        <MagnifyingGlassIcon
                          className={clsx("w-5 h-5 text-gray-800")}
                        />
                        <input
                          className={clsx(
                            "focus:outline-none font-medium text-base text-gray-900"
                          )}
                          placeholder="Cari nama event disini"
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Select>
                          <SelectTrigger className="space-x-2">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Filter 1</SelectLabel>
                              <SelectItem value="i1">FItem 1</SelectItem>
                              <SelectItem value="i2">FItem 2</SelectItem>
                              <SelectItem value="i3">FItem 3</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="space-x-2">
                            <SelectValue placeholder="Urutkan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Sort 1</SelectLabel>
                              <SelectItem value="s1">SItem 1</SelectItem>
                              <SelectItem value="s2">SItem 2</SelectItem>
                              <SelectItem value="s3">SItem 3</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {organization?.event.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg shadow-sm overflow-clip"
                        >
                          <EventItem item={item} />
                        </div>
                      ))}
                    </div>
                    <Pagination className={clsx("mt-8")}>
                      <PaginationContent>
                        <PaginationItem>
                          <ChevronLeftIcon className={clsx("w-5 h-5")} />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink isActive>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>3</PaginationLink>
                        </PaginationItem>
                        {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
                        <PaginationItem>
                          <ChevronRightIcon className={clsx("w-5 h-5")} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="about">
                <p className={clsx("text-gray-500")}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto pariatur aliquid optio praesentium doloribus vitae
                  rem magni repudiandae numquam vel officiis et exercitationem
                  at distinctio, quae quis deserunt, eveniet quos. Veritatis
                  commodi similique quod, cumque veniam beatae expedita odio
                  eius atque autem nostrum, est voluptas modi culpa fuga
                  voluptatibus iste.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </BaseLayout>
    </>
  );
};

export default OrganizationUser;
