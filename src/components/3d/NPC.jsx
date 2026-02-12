import React from 'react';
import { Text } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';
import { useFrame } from '@react-three/fiber';
import { PigModel } from './PigModel';

export const NPC = ({ position }) => {
    const gameState = useGameStore(state => state.gameState);
    const heartsCollected = useGameStore(state => state.heartsCollected);
    const totalHearts = useGameStore(state => state.totalHearts);
    const setGameState = useGameStore(state => state.setGameState);

    useFrame(({ camera, scene }) => {
        // Check distance to player could be here, or simplified in store logic
    });

    return (
        <group position={position}>
            <PigModel />

            {heartsCollected >= totalHearts && (
                <group position={[0.6, 1.6, 0]} onClick={(e) => {
                    e.stopPropagation();
                    setGameState('dialogue');
                }}>
                    <Float speed={5} floatIntensity={0.5}>
                        {/* Speech Bubble Shape */}
                        <mesh position={[0, 0, 0]}>
                            <sphereGeometry args={[0.4, 32, 16]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                        <mesh position={[-0.3, -0.3, 0]} rotation={[0, 0, -0.5]}>
                            <coneGeometry args={[0.15, 0.4, 16]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                        {/* Icon inside */}
                        <Text position={[0, 0.05, 0.4]} fontSize={0.3} color="#db2777" anchorX="center" anchorY="middle">
                            ...
                        </Text>
                    </Float>
                    {/* Pulsing prompt */}
                    <Text position={[0, 0.6, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#db2777">
                        Click Me!
                    </Text>
                </group>
            )}
        </group>
    );
};
