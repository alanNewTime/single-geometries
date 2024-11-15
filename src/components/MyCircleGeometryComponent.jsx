import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"; // Make sure THREE is imported for the DoubleSide constant

function CircleElement({
  radiusProp,
  segmentsProp,
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
        {/* Solid circle*/}
        <mesh>
          <circleGeometry
            attach="geometry"
            args={[radiusProp, segmentsProp, thetaStartProp, thetaLengthProp]}
          />
          <meshStandardMaterial
            attach="material"
            color="brown"
            side={THREE.DoubleSide} //This makes sure that the circle is full from both sides and not just one
          />
        </mesh>

        {/* Wireframe over the circle */}
        <mesh>
          <circleGeometry
            attach="geometry"
            args={[radiusProp, segmentsProp, thetaStartProp, thetaLengthProp]}
          />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function MyCircleGeometryComponent() {
  //solid circle and wireframe variables
  const [inputRadius, setInputRadius] = useState(2);
  const [inputSegments, setInputSegments] = useState(32);
  const [inputThetaStart, setInputThetaStart] = useState(0);
  const [inputThetaLenght, setInputThetaLenght] = useState(7);

  const handleRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };

  const handleSegmentChange = (e) => {
    setInputSegments(e.target.value);
  };
  const handleThetaStartChange = (e) => {
    setInputThetaStart(e.target.value);
  };
  const handleThetaLenghtChange = (e) => {
    setInputThetaLenght(e.target.value);
  };
  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <CircleElement
          radiusProp={inputRadius}
          segmentsProp={inputSegments}
          thetaStartProp={inputThetaStart}
          thetaLengthProp={inputThetaLenght}
        />
        <OrbitControls />
      </Canvas>

      {/* controls circle start */}
      <div className="circle-controls">
        <p>Radius</p>
        <input
          type="number"
          value={inputRadius}
          onChange={handleRadiusChange}
        />
        <p>Segments</p>
        <input
          type="number"
          value={inputSegments}
          onChange={handleSegmentChange}
        />
        <p>Theta Start</p>
        <input
          type="number"
          value={inputThetaStart}
          onChange={handleThetaStartChange}
        />
        <p>Theta Length</p>
        <input
          type="number"
          value={inputThetaLenght}
          onChange={handleThetaLenghtChange}
        />
      </div>
      {/* controls circle end */}
    </>
  );
}

export default MyCircleGeometryComponent;
