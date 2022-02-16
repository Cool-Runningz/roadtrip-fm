import PropTypes from "prop-types";
import { Disclosure as TWDisclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

const propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
}

export default function Disclosure(props) {
    return (
        <div className="w-full px-4 pt-16">
            <div className="w-full max-w-xl p-2 mx-auto bg-white rounded-2xl">
                <TWDisclosure>
                    {({ open }) => (
                        <>
                            <TWDisclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>{props.title}</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-purple-500`}
                                />
                            </TWDisclosure.Button>
                            <TWDisclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700 prose">
                                {props.children}
                            </TWDisclosure.Panel>
                        </>
                    )}
                </TWDisclosure>

            </div>
        </div>
    )
}

Disclosure.propTypes = propTypes;

