import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useRef, useState } from "react";

function CylinderElement({ radiusTop, radiusBottom, height, radialSegment }) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.01;
  });

  return (
    <>
      <mesh ref={mesh}>
        {/* args["top circle circunference","bottom circle circunference","height","how smooth the circle is"] */}
        <cylinderGeometry
          attach="geometry"
          args={[radiusTop, radiusBottom, height, radialSegment]}
        />
        <meshBasicMaterial attach="material" color="brown" />

        {/* Edges to draw segment line */}
        <Edges scale={1} threshold={0.1}>
          <lineBasicMaterial color="" linewidth={2} />
        </Edges>
      </mesh>
    </>
  );
}

function MyCylinderGeometryComponent() {
  const [inputRadiusTop, setInputRadiusTop] = useState(3);
  const [inputRadiusBottom, setInputRadiusBottom] = useState(3);
  const [inputHeight, setInputHeight] = useState(5);
  const [inputRadialSegment, setInputRadialSegment] = useState(20);

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

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <CylinderElement
          radiusTop={inputRadiusTop}
          radiusBottom={inputRadiusBottom}
          height={inputHeight}
          radialSegment={inputRadialSegment}
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
      </div>
      {/* controls cylinder end */}
    </>
  );
}

export default MyCylinderGeometryComponent;
