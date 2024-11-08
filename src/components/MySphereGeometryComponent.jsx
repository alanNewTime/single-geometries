import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

function SphereElement({ radius, widthSegment, heightSegment }) {
  const mesh = useRef(null);

  //   console.log(radius);
  //   console.log(widthSegment);
  //   console.log(heightSegment);
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.001;
  });

  return (
    <>
      <mesh ref={mesh}>
        {/* args["radius", "widthSegments", "heightSegments"] */}
        <sphereGeometry
          attach="geometry"
          args={[radius, widthSegment, heightSegment]}
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

function MySphereGeometryComponent() {
  const [inputRadius, setInputRadius] = useState(2);
  const [inputWidthSegment, setInputWidthSegment] = useState(30);
  const [inputHeightSegment, setInputHeightSegment] = useState(32);

  const handleRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };

  const handleWidthSegmentChange = (e) => {
    setInputWidthSegment(e.target.value);
  };

  const handleHeightSegmentChange = (e) => {
    setInputHeightSegment(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <SphereElement
          radius={inputRadius}
          widthSegment={inputWidthSegment}
          heightSegment={inputHeightSegment}
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
      </div>
      {/* controls sphere end */}
    </>
  );
}

export default MySphereGeometryComponent;
