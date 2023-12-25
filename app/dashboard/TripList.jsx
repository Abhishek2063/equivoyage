import React from 'react';

const TripList = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {props.tripListData.map((trip) => (
        <div key={trip.id}>
          {console.log(trip.trip.tripName)}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-black">{trip.trip.tripName}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {trip.trip.startDate} - {trip.trip.endDate}
            </p>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Edit
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                View
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;
