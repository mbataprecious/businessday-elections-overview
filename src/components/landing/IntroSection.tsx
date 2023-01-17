import { ChartBarIcon } from "@heroicons/react/24/outline";
import { MapIcon } from "@heroicons/react/24/outline";
import { CircleStackIcon } from "@heroicons/react/24/outline";

const incentives = [
  {
    name: "Explore Interactive Map",
    Icon: MapIcon,
    description:
      "view and explore various states, down to senatorial data as far back as 2015 elections, view voters",
  },
  {
    name: "",
    Icon: CircleStackIcon,
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    Icon: ChartBarIcon,
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
];

export default function IntroSection() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl py-10 sm:px-2 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map(({ name, description, Icon }) => (
              <div key={name} className="flex flex-col">
                <div className=" flex justify-center">
                  <Icon className=" text-white h-10" />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-white">{name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://businessday.ng/"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 md:py-4 md:px-10 md:text-lg"
          >
            Read News
          </a>
        </div>
      </div>
    </div>
  );
}
