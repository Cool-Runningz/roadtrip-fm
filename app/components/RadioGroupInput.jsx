import PropTypes from "prop-types"
import { RadioGroup } from '@headlessui/react'

const propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        value: PropTypes.string.isRequired,
    }).isRequired
}

export default function RadioGroupInput(props) {
    return (
        <div className="w-full px-4 py-16">
            <div className="w-full max-w-md mx-auto">
                <RadioGroup value={props.value} onChange={props.onChange}>
                    <RadioGroup.Label>Choose an option to begin finding stations near you 📻</RadioGroup.Label>
                    <div className="space-y-2">
                        {props.options.map((option) => (
                            <RadioGroup.Option
                                key={option.title}
                                value={option}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                                        : ''
                                    }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                    }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                            }`}
                                                    >
                                                        {option.title}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                            }`}
                                                    >
                                                        <span>{option.description}</span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="flex-shrink-0 text-white">
                                                    <CheckIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

RadioGroupInput.propTypes = propTypes