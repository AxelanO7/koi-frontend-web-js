export const getStatusButtonColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500 text-white";
    case "approved":
      return "bg-green-500 text-white";
    case "rejected":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Dtinjau";
    case "approved":
      return "Disetujui";
    case "rejected":
      return "Ditolak";
    default:
      return "Tidak Diketahui";
  }
};
