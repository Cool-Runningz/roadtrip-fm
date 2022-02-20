import { LocationMarkerIcon, CursorClickIcon } from '@heroicons/react/outline'
import StyledLink from "~/components/StyledLink";

export default function FindStationsPage() {
  return (
    <div className="flex flex-col justify-between my-8 px-5">
      <StyledLink
          large
          label="Use GPS Location"
          description="Requires permission to access coordinates"
          linkPath="gps"
          class="mb-8 hover:-translate-y-0.5 transform transition"
          icon={<LocationMarkerIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />}
      />
      <StyledLink
          large
          label="Manually Select Location"
          description="Narrow down stations by state/city"
          linkPath="manual"
          class="mb-8 hover:-translate-y-0.5 transform transition"
          icon={<CursorClickIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />}
      />
    </div>
  )
}