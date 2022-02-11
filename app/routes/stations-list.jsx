import { useLoaderData} from "remix";

export const loader = async ({ request }) => {
    //NOTE: This is how you would handle getting the search term from the query param
    /*TODO: Will need to perform a different query depending on manual vs. GPS search
    *      - Manual search will pass in `state` and `city` params
    *      - GPS search will pass in `latitude` and `longitude` params
    * */
    const url = new URL(request.url)
    const latitude = url.searchParams.get("latitude")
    const longitude = url.searchParams.get("longitude")
    console.log("query param - Latitude", latitude)
    console.log("query param - Longitude", longitude)
    return {latitude, longitude};
};

export default function StationsList() {
    const data = useLoaderData()
    console.log("data: ", data)
    return (
        <div>
            <h3>Stations List</h3>
            <p>This route will display the list of radio stations based on the state selected or
                the state detected based on the long & latitude determined by the
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation">navigator.geolocation</a> Web
                API.</p>

            <p>The route may have a query param in the format of
            <code>/stations-list?state=Florida</code> or
                <br /> <br />
            <code>/stations-list?state=South+Dakota</code>
            </p>
        </div>
    )
}