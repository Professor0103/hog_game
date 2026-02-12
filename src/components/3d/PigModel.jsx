import React, { useRef } from 'react';

export const PigModel = () => {
    return (
        <group dispose={null} scale={0.8}>
            {/* Body */}
            <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshStandardMaterial color="#fda4af" roughness={0.4} /> {/* Rose-300 */}
            </mesh>

            {/* Head - slightly merged sphere */}
            <mesh position={[0, 0.5, 0.35]} castShadow receiveShadow>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color="#fda4af" roughness={0.4} />
            </mesh>

            {/* Snout */}
            <mesh position={[0, 0.45, 0.7]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.15, 0.15, 32]} />
                <meshStandardMaterial color="#f472b6" /> {/* Pink-400 (darker) */}
            </mesh>
            {/* Nostrils */}
            <mesh position={[-0.05, 0.45, 0.78]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial color="#9d174d" />
            </mesh>
            <mesh position={[0.05, 0.45, 0.78]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial color="#9d174d" />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.15, 0.6, 0.65]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.15, 0.6, 0.65]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Ears */}
            <mesh position={[-0.25, 0.75, 0.45]} rotation={[0, 0, 0.5]}>
                <coneGeometry args={[0.1, 0.25, 32]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.25, 0.75, 0.45]} rotation={[0, 0, -0.5]}>
                <coneGeometry args={[0.1, 0.25, 32]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.2, 0.1, 0.2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.2, 0.1, 0.2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[-0.2, 0.1, -0.2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.2, 0.1, -0.2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>

            {/* Tail */}
            <mesh position={[0, 0.4, -0.5]} rotation={[0.5, 0, 0]}>
                <torusGeometry args={[0.1, 0.03, 8, 20, 3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
        </group>
    );
};
