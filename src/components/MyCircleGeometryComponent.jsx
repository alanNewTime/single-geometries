import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"; // Make sure THREE is imported for the DoubleSide constant

function CircleElement({ radius, segment }) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.01;
  });
  return (
    <>
      <mesh ref={mesh}>
        <circleGeometry attach="geometry" args={[radius, segment]} />
        <meshBasicMaterial
          attach="material"
          color="brown"
          side={THREE.DoubleSide} //This makes sure that the circle is full from both sides and not just one
        />

        {/* Edges to draw segment line arround the circunference */}
        <Edges scale={1} threshold={0.1}>
          <lineBasicMaterial color="red" linewidth={2} />
        </Edges>
      </mesh>
    </>
  );
}

function MyCircleGeometryComponent() {
  const [inputRadius, setInputRadius] = useState(2);
  const [inputSegments, setInputSegments] = useState(32);

  const handleRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };

  const handleSegmentChange = (e) => {
    setInputSegments(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <CircleElement radius={inputRadius} segment={inputSegments} />
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
      </div>
      {/* controls circle end */}
    </>
  );
}

export default MyCircleGeometryComponent;
