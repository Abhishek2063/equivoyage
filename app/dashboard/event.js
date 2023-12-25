import { get } from "@/common/api"
import { API_GET_TRIP_DATA } from "@/routeConstant"

export const getTripListData = async  (setTripListData) => {
    const tripListResponseData =  await get(
        `${API_GET_TRIP_DATA}/3`, null, false,
    )
    setTripListData(tripListResponseData)
}