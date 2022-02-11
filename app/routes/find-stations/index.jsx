import { Link } from "remix"

export default function FindStationsPage() {
    return (
        <div className="flex flex-col justify-between my-16 px-5">
            <p className="mb-8">Choose an option to begin finding stations near you 📻</p>
            <div className="bg-sky-900 bg-opacity-75 text-white rounded-lg hover:bg-sky-800 mb-5">
               <Link to="gps">
                  <div className="px-5 py-4">
                    <p> Use GPS Location</p>
                    <small className="text-sky-100 italic">Requires permission to access GPS</small>
                  </div>
               </Link>
             </div>
            <div className="bg-sky-900 bg-opacity-75 text-white rounded-lg hover:bg-sky-800 mb-8">
              <Link to="manual">
                    <div className="px-5 py-4">
                        <p>Manually Select Location</p>
                        <small className="text-sky-100 italic">Narrow down stations by state/city</small>
                    </div>
               </Link>
            </div>
        </div>
    )
}