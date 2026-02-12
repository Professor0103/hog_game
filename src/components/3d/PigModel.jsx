import React, { useRef } from 'react';

export const PigModel = () => {
    return (
        <group dispose={null} scale={1.2}>
            {/* Body - Slightly chonkier */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color="#fda4af" roughness={0.4} /> {/* Rose-300 */}
            </mesh>

            {/* Head - Distinct from body */}
            <mesh position={[0, 0.6, 0.45]} castShadow receiveShadow>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial color="#fda4af" roughness={0.4} />
            </mesh>

            {/* Snout - Prominent */}
            <mesh position={[0, 0.55, 0.85]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.14, 0.16, 0.15, 32]} />
                <meshStandardMaterial color="#f472b6" /> {/* Pink-400 */}
            </mesh>
            {/* Nostrils */}
            <mesh position={[-0.06, 0.55, 0.93]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#831843" />
            </mesh>
            <mesh position={[0.06, 0.55, 0.93]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#831843" />
            </mesh>

            {/* Eyes - Larger and black */}
            <mesh position={[-0.18, 0.7, 0.78]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="black" roughness={0.2} />
            </mesh>
            <mesh position={[0.18, 0.7, 0.78]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="black" roughness={0.2} />
            </mesh>

            {/* THE MOLE - Requested Feature */}
            <mesh position={[0.22, 0.55, 0.75]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#1f050b" /> {/* Dark brown/black */}
            </mesh>

            {/* Ears - Perky */}
            <mesh position={[-0.3, 0.9, 0.5]} rotation={[0, 0, 0.6]}>
                <coneGeometry args={[0.12, 0.3, 32]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.3, 0.9, 0.5]} rotation={[0, 0, -0.6]}>
                <coneGeometry args={[0.12, 0.3, 32]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>

            {/* Legs - Stumpy */}
            <mesh position={[-0.25, 0.1, 0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.25, 0.1, 0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[-0.25, 0.1, -0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.25, 0.1, -0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>

            {/* Tail - Curly */}
            <mesh position={[0, 0.5, -0.55]} rotation={[2, 0, 0]}>
                <torusGeometry args={[0.1, 0.03, 8, 20, 3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
        </group>
    );
};
