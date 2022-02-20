import PropTypes from "prop-types";
import { Link } from "remix"

const propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.element,
    primary: PropTypes.bool,
    large: PropTypes.bool,
    linkPath: PropTypes.string.isRequired
}

export default function StyledLink(props) {
    return (
        <div className={`${props.primary ? 'link-primary' : 'link-default'} ${props.class}` }>
            <Link to={props.linkPath}>
                <div className={props.large ? "px-5 py-4 sm:w-80" : "px-4 py-2"}>
                    <div className={`flex ${props.description ? 'items-stretch' : 'items-center'}`}>
                        <p> {props.label} </p>
                        {props.icon || null}
                    </div>
                    {props.description && <small className="text-sky-100 italic">{props.description}</small>}
                </div>
            </Link>
        </div>
    )
}

StyledLink.propTypes = propTypes
