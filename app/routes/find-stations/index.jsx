import { useNavigate } from "remix"
import { useEffect, useState } from "react";
import RadioGroupInput from "~/components/RadioGroupInput";

import useDebounce from "~/hooks/useDebounce";

const inputOptions = [
    {
        title: 'Use Current Location',
        description: 'Requires permission to access GPS',
        value: 'gps'
    },
    {
        title: 'Manually Select Location',
        description: 'Narrow down stations by state/city',
        value: 'manual'
    },
]

export default function FindStationsPage() {
    const [selected, setSelected] = useState({ title: '', value: '' })
    const debouncedValue = useDebounce(selected.value, 1000)
    const navigate = useNavigate()

    useEffect(() => {
        //TODO: Potentially shorten this code to use object["property"] syntax
        if (debouncedValue === "gps") navigate("gps")
        if (debouncedValue === "manual") navigate("manual")
    }, [debouncedValue]);

    return (
        <div>
            <RadioGroupInput options={inputOptions} onChange={(selection) => { setSelected(selection) }}
                value={selected}
            />
        </div>
    )
}