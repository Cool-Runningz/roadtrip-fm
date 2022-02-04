import { useLoaderData} from "remix";

export const loader = async ({ request }) => {
    //NOTE1: This is how you would handle getting the search term from the query param
    const url = new URL(request.url)
    const stateQueryParam = url.searchParams.get("state")
    console.log("query param: ", stateQueryParam)
    return {stations: "100.7FM"};
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