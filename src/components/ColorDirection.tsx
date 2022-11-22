import Container from "./Container";

let colorMap = {
  PDP: "#0d4c87",
  APC: "#3d8850",
  MIXED: "#89317a",
  "NO ELECTIONS HELD": "#919191",
};

const ColorDirection = () => {
  return (
    <Container className="flex justify-center">
      <div className="w-full">
        <div className="flex justify-between items-center max-w-[30rem] mx-auto mt-20">
          {Object.keys(colorMap).map((party) => (
            <div key={party} className="flex items-center">
              <div
                className={`h-6 w-6 bg-[${
                  colorMap[party as keyof typeof colorMap]
                }]`}
              ></div>
              <p className="pl-1 text-lg">{party}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ColorDirection;
