import { Link } from 'remix'

export default function Alert() {
    return (
        <div className="max-w-max mt-8" role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                🙈 &nbsp; An error has occurred
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p> Uh oh! Something went wrong.</p>
                <p>Pretend this never happened 🤫 and try 🔄 &nbsp;<Link className="underline" to="." reloadDocument>refreshing</Link> the page.</p>
            </div>
        </div>
    )
}
