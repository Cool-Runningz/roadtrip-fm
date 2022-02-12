import { useState } from "react";
import { useLoaderData, useFetcher, useNavigate, json } from "remix"
import { prisma } from "~/utils/database/db.server";
import { ArrowCircleRightIcon } from '@heroicons/react/solid'

import SelectInput from "~/components/SelectInput";
import states from "~/utils/database/states.js";

const transformStateOptions = (statesList) => {
  return statesList.map((state) => {
    return {
      label: state.name,
      id: state.code,
    };
  });
};

const transformCityOptions = (citiesList) => {
  return citiesList.map((city) => {
    const searchParamString = `?latitude=${encodeURIComponent(city.latitude)}&longitude=${encodeURIComponent(city.longitude)}`
    return {
      label: city.name,
      id: searchParamString,
    };
  });
}

export const loader = async ({ request }) => {
  const stateOptions = transformStateOptions(states)
  const url = new URL(request.url);

  if (url.search) {
    const stateCode = url.searchParams.get("id")
    const cityData = await prisma.us_cities.findMany(
      {
        where: {
          state_code: stateCode
        },
        select: {
          name: true,
          state_code: true,
          latitude: true,
          longitude: true
        }
      }
    )
    return json(transformCityOptions(cityData))
  }

  return { states: stateOptions };
};

export default function ManualSearchPage() {
  const data = useLoaderData();
  const citiesFetcher = useFetcher()
  const navigate = useNavigate();
  const defaultOption = { label: "-- Select an option --", id: "no-option" }

  const [selectedState, setSelectedState] = useState(defaultOption);
  const [selectedCity, setSelectedCity] = useState(defaultOption);


  const handleStateChange = (value) => {
    setSelectedState(value)

    //Grab cities based on state selection
    citiesFetcher.submit(value)

    //Clear the cities if a new state is chosen so that the list can be populated with new cities.
    //This prevents the wrong city from being selected after a state change has happened
    if (citiesFetcher.type !== "init" && selectedCity.id !== "no-option") {
      setSelectedCity(defaultOption)
    }
  }

  const handleClick = () => {
    navigate(`/stations-list${selectedCity.id}`)
  }

  return (
    <div className="flex flex-col justify-between">
      <h3>Manual Station Search</h3>
      <SelectInput
        inputLabel="Choose a state: "
        onChange={handleStateChange}
        options={data.states}
        value={selectedState}
      />
      {citiesFetcher.type === "done" &&
        <SelectInput
          inputLabel="Choose a city: "
          onChange={setSelectedCity}
          options={citiesFetcher.data}
          value={selectedCity}
        />
      }
      {selectedCity.id !== "no-option" && <div className="mt-12">
        <button
          type="button"
          disabled={selectedCity.id === "no-option"}
          onClick={handleClick}
          className="disabled:opacity-75 disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Stations
          <ArrowCircleRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      }
    </div>
  );
}
