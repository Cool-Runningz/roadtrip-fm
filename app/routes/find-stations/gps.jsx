import { useEffect, useState } from "react";
import { Link, useNavigate } from "remix";
import { SearchIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import Disclosure from "~/components/Disclosure";
import radioTower from "~/images/RadioTower.svg";

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
                            <li className="pb-2">🔄 <Link className="underline" to="." reloadDocument>Retry Search</Link> </li>
                            <li>Perform a <Link className="underline" to="/find-stations/manual"> manual search</Link></li>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default function GPSSearchPage() {
    const [loading, setLoading] = useState(false)
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)

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

    const handleClick = () => {
        navigate(`/stations-list?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)
    }

    return (
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm mx-auto">
                {loading && (
                    <div className="flex flex-col items-center">
                        <img src={radioTower} alt="" className="animate-pulse w-44" />
                        <p className="font-bold my-8 text-lg">Searching for coordinates ...</p>
                    </div>
                )}
                {!loading && coordinates.latitude && (
                    <div>
                        <div>
                            <p>The coordinates are:</p>
                            <code>Longitude: {coordinates.longitude}</code> <br />
                            <code>Latitude: {coordinates.latitude}</code>
                        </div>
                        <button
                            type="button"
                            disabled={loading || errorMsg}
                            onClick={handleClick}
                            className="btn"
                        >
                            Find Stations
                            <SearchIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />
                        </button>
                    </div>
                )}
                {!loading && errorMsg && (
                    <div className="flex justify-center">
                        {renderErrorMessage(`Unable to determine location: ${errorMsg}`)}
                    </div>
                )}
                <div className="w-80 md:w-96">
                    <Disclosure title="Disclaimer on GPS Search">
                        <p>GPS search leverages the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API"> Geolocation API </a>. Permission will need to be granted in order to determine the location coordinates.
                            Your location is <strong className="underline decoration-wavy decoration-inherit text-purple-900">never stored</strong> and is purely used to determine radio stations near you.
                        </p>
                    </Disclosure>
                </div>
            </div>
        </div>
    )
}