import PropTypes from "prop-types";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const propTypes = {
  inputLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired, //TODO: Rename this field to something else???,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, //TODO: Rename this field to something else???
  }).isRequired,
};

export default function SelectInput(props) {
  return (
    <div className="flex justify-center">
      <div className="w-72">
        <Listbox value={props.value} onChange={props.onChange}>
          <div className="relative mt-1">
            <Listbox.Label className='font-medium'>{props.inputLabel}</Listbox.Label>
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-sky-500 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm mt-2">
              <span className="block truncate">{props.value.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {props.options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `${active ? "text-white bg-sky-900" : "text-gray-900"}
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${selected ? "font-medium" : "font-normal"
                            } block truncate`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`${active ? "text-white" : "text-sky-900"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}

SelectInput.propTypes = propTypes;
