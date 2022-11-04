import React from "react";
import Container from "./Container";

const DataLayer = () => {
  return (
    <div>
      <Container>
        <div className="progress flex flex-1 mt-8">
          <div className="APC text-[#0d4c87] text-center flex-1">
            <h3 className=" text-4xl">
              14 <span className="text-sm">PDP</span>
            </h3>
          </div>
          <div className="text-[#3d8850] text-center flex-1"></div>
          <div className="text-[#89317a] text-center flex-1"></div>
          <div className="text-[#efefef] text-center flex-1"></div>
        </div>
        <div className="progress flex flex-1 h-4 ">
          <div className="APC bg-[#0d4c87] flex-1"></div>
          <div className="bg-[#3d8850] flex-1"></div>
          <div className="bg-[#89317a] flex-1"></div>
          <div className="bg-[#efefef] flex-1"></div>
        </div>
      </Container>
    </div>
  );
};

export default DataLayer;
