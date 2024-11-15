import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

function SphereElement({
  radiusProp,
  widthSegmentProp,
  heightSegmentProp,
  phiStartProp,
  phiLengthProp,
  thetaStartProp,
  thetaLengthProp,
}) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.001;
  });

  return (
    <>
      <group ref={mesh}>
        {/* solid sphere */}
        <mesh>
          <sphereGeometry
            attach="geometry"
            args={[
              radiusProp,
              widthSegmentProp,
              heightSegmentProp,
              phiStartProp,
              phiLengthProp,
              thetaStartProp,
              thetaLengthProp,
            ]}
          />
          <meshStandardMaterial attach="material" color="brown" />
        </mesh>

        {/* wireFrame around the sphere */}
        <mesh>
          <sphereGeometry
            attach="geometry"
            args={[
              radiusProp,
              widthSegmentProp,
              heightSegmentProp,
              phiStartProp,
              phiLengthProp,
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

function MySphereGeometryComponent() {
  // solid sphere and wireframe variables
  const [inputRadius, setInputRadius] = useState(2);
  const [inputWidthSegment, setInputWidthSegment] = useState(30);
  const [inputHeightSegment, setInputHeightSegment] = useState(32);
  const [inputPhiStart, setInputPhiStart] = useState(2);
  const [inputPhiLength, setInputPhiLength] = useState(7);
  const [inputThetaStart, setInputThetaStart] = useState(0);
  const [inputThetaLength, setInputThetaLength] = useState(3.15); //

  const handleRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };

  const handleWidthSegmentChange = (e) => {
    setInputWidthSegment(e.target.value);
  };

  const handleHeightSegmentChange = (e) => {
    setInputHeightSegment(e.target.value);
  };

  const handlePhiStartChange = (e) => {
    setInputPhiStart(e.target.value);
  };
  const handlePhiLengthChange = (e) => {
    setInputPhiLength(e.target.value);
  };
  const handleThetaStartChange = (e) => {
    setInputThetaStart(e.target.value);
  };
  const handleThetaLengthChange = (e) => {
    setInputThetaLength(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <SphereElement
          radiusProp={inputRadius}
          widthSegmentProp={inputWidthSegment}
          heightSegmentProp={inputHeightSegment}
          phiStartProp={inputPhiStart}
          phiLengthProp={inputPhiLength}
          thetaStartProp={inputThetaStart}
          thetaLengthProp={inputThetaLength}
        />
        <OrbitControls />
      </Canvas>

      {/* controls sphere start */}
      <div className="sphere-controls">
        <p>Radius: </p>
        <input
          type="number"
          value={inputRadius}
          onChange={handleRadiusChange}
        />
        <p>Width Segment: </p>
        <input
          type="number"
          value={inputWidthSegment}
          onChange={handleWidthSegmentChange}
        />
        <p>Height Segment: </p>
        <input
          type="number"
          value={inputHeightSegment}
          onChange={handleHeightSegmentChange}
        />
        <p>Phi Start: </p>
        <input
          type="number"
          value={inputPhiStart}
          onChange={handlePhiStartChange}
        />
        <p>Phi Length: </p>
        <input
          type="number"
          value={inputPhiLength}
          onChange={handlePhiLengthChange}
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
      {/* controls sphere end */}
    </>
  );
}

export default MySphereGeometryComponent;
