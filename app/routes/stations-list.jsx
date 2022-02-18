import { useLoaderData } from "remix";
import { prisma } from "~/utils/database/db.server";

//Group the list of stations by their mileage radius
const groupStationsByMileageRadius = (stationsList) => {
    return stationsList.reduce((acc, currentValue) => {
        const distanceRounded = Math.floor(currentValue.distance)
        if (distanceRounded <= 15) {
            acc["15"].push(currentValue)
        }
        else if (distanceRounded > 15 && distanceRounded <= 30) {
            acc["30"].push(currentValue)
        }
        else {
            acc["50"].push(currentValue)
        }
        return acc
    }, { "15": [], "30": [], "50": [] })
}

export const loader = async ({ request }) => {
    //Grab the search params from the URL
    const url = new URL(request.url)
    const latitude = url.searchParams.get("latitude")
    const longitude = url.searchParams.get("longitude")
    const stationsData = await prisma.$queryRaw`
      SELECT Call_sign,Frequency,City,stations.state_code,genre, distance FROM ( 
          SELECT *, ( 
              ( 
                  ( 
                      acos( 
                          sin(( ${latitude} * pi() / 180)) 
                      * 
                          sin(( latitude * pi() / 180)) + cos(( ${latitude} * pi() /180 )) 
                      * 
                      cos(( latitude * pi() / 180)) * cos((( ${longitude} - longitude) * pi()/180))) 
                    ) * 180/pi() 
              ) * 60 * 1.1515 
          )  as distance FROM us_cities ) us_cities INNER JOIN stations ON us_cities.name = stations.City WHERE distance <= 50;     
    `
    return groupStationsByMileageRadius(stationsData)
};

export default function StationsList() {
    const stationsData = useLoaderData()
    return (
        <div>
            <h2>Radio Stations within a ~50 mile radius </h2>
            <div className="h-screen80 overflow-y-auto w-80 md:w-96">
                {Object.keys(stationsData).map((mileage) => (
                    <div key={mileage} className="relative">
                        <div className="z-10 sticky top-0 bg-sky-900 px-6 py-3 text-sm font-medium text-white">
                            <h3> Stations within a {mileage} mile radius</h3>
                        </div>
                        <ul role="list" className="relative z-0 divide-y divide-gray-200">
                            {stationsData[mileage].map((station) => (
                                <li key={station.Call_sign} className="bg-white">
                                    <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                                            {station.Frequency}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <a href="#" className="focus:outline-none">
                                                {/* Extend touch target to entire panel */}
                                                <span className="absolute inset-0" aria-hidden="true" />
                                                <p className="text-sm font-medium text-gray-900">{station.genre}</p>
                                                <p className="text-sm text-gray-500 truncate"> {station.Call_sign} | {station.City}, {station.state_code}</p>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>
    )
}