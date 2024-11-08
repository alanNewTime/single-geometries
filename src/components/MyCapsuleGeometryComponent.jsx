import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei"; // helps when we want to draw the segment lines
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

function CapsuleElement({ radius, length, capSegment }) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <>
      <mesh ref={mesh}>
        <capsuleGeometry
          attach="geometry"
          args={[radius, length, capSegment]}
        />
        <meshStandardMaterial attach="material" color="pink" />

        {/* Edges to draw segment lines */}
        <Edges scale={1} threshold={0.1}>
          <lineBasicMaterial color="red" linewidth={2} />
        </Edges>
      </mesh>
    </>
  );
}

function MyCapsuleGeometryComponent() {
  const [inputRadius, setInputRadius] = useState(1);
  const [inputLength, setInputLength] = useState(1);
  const [inputCapSegments, setInputCapSegments] = useState(4);

  const handleRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };
  const handleLengthChange = (e) => {
    setInputLength(e.target.value);
  };
  const handleCapSegmentChange = (e) => {
    setInputCapSegments(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <CapsuleElement
          radius={inputRadius}
          length={inputLength}
          capSegment={inputCapSegments}
        />
        <OrbitControls />
      </Canvas>

      {/* controls capsule start */}
      <div className="capsule-controls">
        <p>Radius</p>
        <input
          type="number"
          value={inputRadius}
          onChange={handleRadiusChange}
        />
        <p>Length</p>
        <input
          type="number"
          value={inputLength}
          onChange={handleLengthChange}
        />
        <p>capSegments</p>
        <input
          type="number"
          value={inputCapSegments}
          onChange={handleCapSegmentChange}
        />
      </div>
      {/* controls capsule end */}
    </>
  );
}

export default MyCapsuleGeometryComponent;
