import { partyColors } from "../utils";
import Container from "./Container";

let colorMap = {
  PDP: partyColors.PDP,
  LP: partyColors.LP,
  APC: partyColors.APC,
  NNPP: partyColors.NNPP,
  "No Vote": partyColors.NaN,
};

const FutureColorDirection = () => {
  return (
    <Container className="flex justify-center">
      <div className="w-full">
        <div className="flex justify-between items-center max-w-[30rem] mx-auto mt-10">
          {Object.keys(colorMap).map((party) => (
            <div key={party} className="flex items-center">
              <div
                style={{ background: colorMap[party as keyof typeof colorMap] }}
                className={`h-6 w-6 md:h-8 md:w-8 rounded-full border`}
              ></div>
              <p className="pl-1 md:text-lg">{party}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FutureColorDirection;
