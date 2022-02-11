import { useEffect, useState } from "react";
import { Link, useNavigate } from "remix";
import { ArrowCircleRightIcon } from '@heroicons/react/solid'

export default function GPSSearchPage() {
    const [loading, setLoading] = useState(false)
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)

        /*TODO: Extract this logic and functions out into an external function. That wau
        *      you can force a retry via button click instead of just on mount. Gotta do
        *      useCallback and all that jazz.
        * */
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const errorMsgHandler = (errorMsg) => {
            setLoading(false)
            setErrorMsg(errorMsg.message)
            setCoordinates({ latitude: null, longitude: null})
            console.warn(`ERROR(${errorMsg.code}): ${errorMsg.message}`);
        }

        const successHandler = (position) => {
            const { latitude, longitude } = position.coords;
            setLoading(false)
            setErrorMsg("")
            setCoordinates({ latitude, longitude })
        }

        navigator.geolocation.getCurrentPosition(successHandler, errorMsgHandler, options);
    }, []);

    const handleClick = () => {
        navigate(`/stations-list?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)
    }

    return (
        <div className="prose">
            <h3 className="lead">Geolocation Search</h3>
            {loading && <h5> Searching for location 🕐</h5>}
            {!loading && coordinates.latitude && (
                <div>
                    <p>The coordinates are:</p>
                    <code>Longitude: {coordinates.longitude}</code> <br />
                    <code>Latitude: {coordinates.latitude}</code>
                </div>
            )}
            {!loading && errorMsg && (<div><p>🛑 Unable to determine location: {errorMsg} 🛑</p>
                <p>Please <Link to="." reloadDocument>Retry 🔄</Link> or perform a <Link to="/find-stations/manual"> manual search</Link></p>
            </div>)}
            <p>Disclaimer: Permission will need to be granted in order to determine the location.
                Your location is never stored and is purely used to determine stations near you.</p>
            <p className="prose prose-md">This will require access to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">Geolocation API</a>  in order to receive coordinates.</p>
                <button
                    type="button"
                    disabled={loading || errorMsg}
                    onClick={handleClick}
                    className="disabled:opacity-75 disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    View Stations
                    <ArrowCircleRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true"/>
                </button>
        </div>
    )
}