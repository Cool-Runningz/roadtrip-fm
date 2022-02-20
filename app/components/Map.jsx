import PropTypes from "prop-types"

const propTypes = {
    coordinates: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }).isRequired
}

const RADIUS_IN_METERS = 80467 //50 miles converted to meters for the Leaflet API
let Leaflet = null

//Dynamically import the leaflet module since it's dependent on the browsers 
//window object and needs to be served client-side.
import('react-leaflet')
    .then((module) => {
        Leaflet = module
    }).catch(error => {
        console.error("Error getting module: ", error)
    });

export default function Map(props) {
    const { latitude, longitude } = props.coordinates

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