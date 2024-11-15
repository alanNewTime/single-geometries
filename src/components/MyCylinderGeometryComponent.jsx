import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

function CylinderElement({
  radiusTopProp,
  radiusBottomProp,
  heightProp,
  radialSegmentsProp,
  heightSegmentsProp,
  isOpenEndedProp,
  thetaStartProp,
  thetaLengthProp,
}) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.01;
  });

  return (
    <>
      <group ref={mesh}>
        {/* solid cylinder */}
        <mesh>
          <cylinderGeometry
            attach="geometry"
            args={[
              radiusTopProp,
              radiusBottomProp,
              heightProp,
              radialSegmentsProp,
              heightSegmentsProp,
              isOpenEndedProp,
              thetaStartProp,
              thetaLengthProp,
            ]}
          />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>

        {/* wireframe arround my cylinder */}
        <mesh>
          <cylinderGeometry
            attach="geometry"
            args={[
              radiusTopProp,
              radiusBottomProp,
              heightProp,
              radialSegmentsProp,
              heightSegmentsProp,
              isOpenEndedProp,
              thetaStartProp,
              thetaLengthProp,
            ]}
          />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function MyCylinderGeometryComponent() {
  //solid and wireframe variables
  const [inputRadiusTop, setInputRadiusTop] = useState(3);
  const [inputRadiusBottom, setInputRadiusBottom] = useState(3);
  const [inputHeight, setInputHeight] = useState(5);
  const [inputRadialSegment, setInputRadialSegment] = useState(20);
  const [inputHeightSegment, setInputHeightSegment] = useState(20);
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [inputThetaStart, setInputThetaStart] = useState(0);
  const [inputThetaLength, setInputThetaLength] = useState(7);

  //solid and wireframe handling functions
  const handleRadiusTopChange = (e) => {
    setInputRadiusTop(e.target.value);
  };
  const handleRadiusBottomChange = (e) => {
    setInputRadiusBottom(e.target.value);
  };
  const handleHeightChange = (e) => {
    setInputHeight(e.target.value);
  };
  const handleRadialSegmentChange = (e) => {
    setInputRadialSegment(e.target.value);
  };

  const handleHeightSegmentChange = (e) => {
    setInputHeightSegment(e.target.value);
  };

  const handleIsOpenEndedChange = (e) => {
    setIsOpenEnded(!isOpenEnded);
  };
  const handleThetaStartChange = (e) => {
    setInputThetaStart(e.target.value);
  };
  const handleThetaLengthChange = (e) => {
    setInputThetaLength(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <CylinderElement
          radiusTopProp={inputRadiusTop}
          radiusBottomProp={inputRadiusBottom}
          heightProp={inputHeight}
          radialSegmentsProp={inputRadialSegment}
          heightSegmentsProp={inputHeightSegment}
          isOpenEndedProp={isOpenEnded}
          thetaStartProp={inputThetaStart}
          thetaLengthProp={inputThetaLength}
        />
        <OrbitControls />
      </Canvas>

      {/* controls cylinder start */}
      <div className="cylinder-controls">
        <p>Radius Top: </p>
        <input
          type="number"
          value={inputRadiusTop}
          onChange={handleRadiusTopChange}
        />
        <p>Radius Bottom: </p>
        <input
          type="number"
          value={inputRadiusBottom}
          onChange={handleRadiusBottomChange}
        />
        <p>Height: </p>
        <input
          type="number"
          value={inputHeight}
          onChange={handleHeightChange}
        />
        <p>Radial Segment: </p>
        <input
          type="number"
          value={inputRadialSegment}
          onChange={handleRadialSegmentChange}
        />
        <p>Height Segment: </p>
        <input
          type="number"
          value={inputHeightSegment}
          onChange={handleHeightSegmentChange}
        />
        <p>Open Ended: </p>
        <input
          type="checkbox"
          value={isOpenEnded}
          onChange={handleIsOpenEndedChange}
        />
        <p>Theta Start: </p>
        <input
          type="number"
          value={inputThetaStart}
          onChange={handleThetaStartChange}
        />
        <p>Theta Length: </p>
        <input
          type="number"
          value={inputThetaLength}
          onChange={handleThetaLengthChange}
        />
      </div>
      {/* controls cylinder end */}
    </>
  );
}

export default MyCylinderGeometryComponent;
