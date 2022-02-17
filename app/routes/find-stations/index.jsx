import { Link } from "remix"
import { LocationMarkerIcon, CursorClickIcon } from '@heroicons/react/outline'

export default function FindStationsPage() {
  return (
    <div className="flex flex-col justify-between my-8 px-5">
      <div className="bg-sky-900 bg-opacity-75 text-white rounded-lg hover:bg-sky-800 mb-8 hover:-translate-y-0.5 transform transition sm:w-80">
        <Link to="gps">
          <div className="px-5 py-4">
            <div className="flex">
              <p> Use GPS Location</p>
              <LocationMarkerIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />
            </div>
            <small className="text-sky-100 italic">Requires permission to access coordinates</small>
          </div>
        </Link>
      </div>
      <div className="bg-sky-900 bg-opacity-75 text-white rounded-lg hover:bg-sky-800 mb-8 hover:-translate-y-0.5 transform transition sm:w-80">
        <Link to="manual">
          <div className="px-5 py-4">
            <div className="flex">
              <p>Manually Select Location</p>
              <CursorClickIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />
            </div>
            <small className="text-sky-100 italic">Narrow down stations by state/city</small>
          </div>
        </Link>
      </div>
    </div>
  )
}