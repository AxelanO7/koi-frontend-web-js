const BreadCrumb = () => {
  const breadcrumbItems = [
    {
      name: "Beranda",
      url: "/",
    },
    {
      name: "Seminar",
      url: "/seminar",
    },
    {
      name: "SEMINAR NASIONAL HIMA-TI INSTIKI 2023 : How Social Media Shaping Society",
      url: "/seminar/1",
    },
  ];
  return (
    <>
      <div className="flex">
        {breadcrumbItems.map((item, index) => {
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
        })}
      </div>
    </>
  );
};

export default BreadCrumb;
