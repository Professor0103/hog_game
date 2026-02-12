import React from 'react';

export const Tree = ({ position }) => {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <coneGeometry args={[1, 2, 8]} />
                <meshStandardMaterial color="#2d6a4f" />
            </mesh>
            <mesh position={[0, 2.5, 0]} castShadow>
                <coneGeometry args={[0.8, 1.5, 8]} />
                <meshStandardMaterial color="#40916c" />
            </mesh>
        </group>
    );
};
