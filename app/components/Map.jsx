import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import radioTower from "~/images/RadioTower.svg";

const propTypes = {
    coordinates: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }).isRequired
}

const RADIUS_IN_METERS = 80467 //50 miles converted to meters for the Leaflet API

export default function Map(props) {
    const { latitude, longitude } = props.coordinates
    const [Leaflet, setLeaflet] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        /* Dynamically import the leaflet module since it's dependent on the browsers window object
            and needs to be served client-side.
         */
        import('react-leaflet')
            .then((module) => {
                setLeaflet(module)
                setLoading(false)
            }).catch(error => {
            setLoading(false)
            console.error("Error getting module: ", error)
        });
    }, []);

    if(loading){
        return (
            <div>
                <img src={radioTower} alt="radio tower" className="animate-pulse w-44" />
                <p className="font-bold my-8 text-lg text-center"> Loading Map...</p>
            </div>
        )
    }

    return (
        <div>
            {Leaflet ?
                (
                    <Leaflet.MapContainer center={[latitude, longitude]} zoom={7} style={{ width: "350px", height: "350px" }}>
                        <Leaflet.TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Leaflet.Circle center={[latitude, longitude]} pathOptions={{ fillColor: 'blue' }} radius={RADIUS_IN_METERS} />
                        <Leaflet.Marker position={[latitude, longitude]}>
                            <Leaflet.Popup>
                                <p>
                                    <span className="font-bold text-sm">Latitude: &nbsp;</span><code>{latitude}</code><br />
                                    <span className="font-bold text-sm">Longitude: &nbsp;</span><code>{longitude}</code>
                                </p>
                            </Leaflet.Popup>
                        </Leaflet.Marker>
                    </Leaflet.MapContainer>
                )
                : <p className="text-lg font-bold"> Unable to Load Map </p>}
        </div>
    )
}

Map.propTypes = propTypes