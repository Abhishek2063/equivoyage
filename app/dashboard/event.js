import { get } from "@/common/api";
import { API_GET_TRIP_DATA } from "@/routeConstant";
import { message } from "antd";

export const getTripListData = async (
  setTripListData,
  userData,
  setPage,
  setTotalPage,
  setTotalRecords,
  page
) => {

  const tripListResponseData = await get(
    `${API_GET_TRIP_DATA}/${userData.id}?page=${page}`,
    null,
    true
  );
  message.success(tripListResponseData.message)
  setTripListData(tripListResponseData.data.data);
  setPage(tripListResponseData.data.page);
  setTotalPage(tripListResponseData.data.totalPages);
  setTotalRecords(tripListResponseData.data.totalCount);

};
