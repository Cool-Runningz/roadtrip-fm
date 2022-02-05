import { useState } from "react";
import SelectInput from "~/components/SelectInput";
import states from "../../helpers/states.js";

const transformOptions = (statesList) => {
  return statesList.map((state) => {
    return {
      label: state.name,
      id: state.abbreviation,
    };
  });
};

const stateOptions = transformOptions(states)

export default function ManualSearchPage() {
  const [selected, setSelected] = useState(stateOptions[0]);

  return (
    <div>
      <h3>Manual Station Search</h3>
      <p>This will present the select dropdown with a list of all 50 states</p>
      <SelectInput
        onChange={setSelected}
        options={stateOptions}
        value={selected}
      />
    </div>
  );
}
