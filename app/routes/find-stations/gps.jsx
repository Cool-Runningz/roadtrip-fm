import { useEffect, useState } from "react";
import { Link, useNavigate } from "remix";
import { SearchIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import Disclosure from "~/components/Disclosure";
import Map from "~/components/Map"
import radioTower from "~/images/RadioTower.svg";

export function links() {
    return [{
        rel: "stylesheet", href: "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css",
        integrity: "sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==",
        crossOrigin: ""
    }]
}

export const meta = () => {
    return {
        title: "RoadTrip.FM | GPS Search"
    };
};

const renderErrorMessage = (message) => {
    return (
        <div className="rounded-md bg-red-50 p-5 mt-8">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="icon-small text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{message}</p>
                    <div className="mt-2 text-sm text-red-700">
                        <ul role="list" className="list-disc pl-5 space-y-1">
                            <li className="pb-2">Please ensure that proper permissions have been granted</li>
                            <li className="pb-2">🔄 <Link className="underline" to="." reloadDocument> Retry Search</Link> </li>
                            <li>Perform a <Link className="underline" to="/find-stations/manual"> manual search</Link></li>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default function GPSSearchPage() {
    const [loading, setLoading] = useState(true)
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const errorHandler = (errorMsg) => {
            setLoading(false)
            setErrorMsg(errorMsg.message)
            setCoordinates({ latitude: null, longitude: null })
            console.warn(`ERROR(${errorMsg.code}): ${errorMsg.message}`);
        }

        const successHandler = (position) => {
            const { latitude, longitude } = position.coords;
            setLoading(false)
            setErrorMsg("")
            setCoordinates({ latitude, longitude })
        }

        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    }, []);

    /** Intentionally, handling the navigation with an imperative approach since there
     *  may be a chance that I want to disable the button instead of hiding it by default.
     *  Since disabling is not possible (at least in an accessible way) with native <a> tags 
     *  having things setup this way makes things easier for potential refactor work.
     */
    const handleClick = () => {
        navigate(`/stations-list?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)
    }

    return (
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="max-w-sm mx-auto">
                <div className="flexy-col-center">
                    {loading && (
                        <>
                            <img src={radioTower} alt="radio tower" className="animate-pulse w-44" />
                            <p className="font-bold my-8 text-lg text-center">Searching for coordinates ...</p>
                        </>
                    )}
                    {!loading && coordinates.latitude && (
                        <>
                            <Map coordinates={coordinates} />
                            <button
                                type="button"
                                disabled={loading || errorMsg}
                                onClick={handleClick}
                                className="btn mt-12"
                            >
                                Find Stations
                                <SearchIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />
                            </button></>
                    )}
                    {!loading && errorMsg && (
                        <div className="flex justify-center">
                            {renderErrorMessage(`Unable to determine location: ${errorMsg}`)}
                        </div>
                    )}
                    <div className="w-80 md:w-96 mt-20">
                        <Disclosure title="Disclaimer on GPS Search">
                            <p>GPS search leverages the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API"> Geolocation API </a>. Permission will need to be granted in order to determine the location coordinates.
                                Your location is <strong className="underline decoration-wavy decoration-inherit text-purple-900">never stored</strong> and is purely used to determine radio stations near you.
                            </p>
                        </Disclosure>
                    </div>
                </div>
            </div>
        </div>
    )
}