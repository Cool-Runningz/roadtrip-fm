import carImg from "~/images/Car.svg";
import { MusicNoteIcon } from '@heroicons/react/solid'
import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import StyledLink from "~/components/StyledLink";

export default function Index() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-sky-50 border-l-4 border-sky-900 p-4 mb-12">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <MusicNoteIcon className="icon-small" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm">
              A site that helps you find nearby radio stations. Perfect for your next road trip!
            </p>
          </div>
        </div>
      </div>
      <img
        className="relative animate-drive"
        src={carImg}
        alt=""
      />
      <StyledLink
          primary
          class="mt-12"
          label="Begin Search"
          linkPath="/find-stations"
          icon={<ArrowCircleRightIcon className="ml-3 -mr-1 icon-small" aria-hidden="true" />}
      />
    </div>
  );
}
