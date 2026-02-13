import React from 'react';
import { Text, Float } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';
import { PigModel } from './PigModel';

export const NPC = ({ position }) => {
    const heartsCollected = useGameStore(state => state.heartsCollected);
    const totalHearts = useGameStore(state => state.totalHearts);
    const setGameState = useGameStore(state => state.setGameState);
    const allHeartsCollected = heartsCollected >= totalHearts;

    const handlePigClick = (e) => {
        e.stopPropagation();
        if (allHeartsCollected) {
            setGameState('dialogue');
        }
    };

    return (
        <group
            position={position}
            onClick={handlePigClick}
            onPointerOver={(e) => {
                e.stopPropagation();
                if (allHeartsCollected) document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
            }}
        >
            <PigModel />

            {allHeartsCollected && (
                <group position={[0.6, 1.6, 0]}>
                    <Float speed={5} floatIntensity={0.5}>
                        <mesh position={[0, 0, 0]}>
                            <sphereGeometry args={[0.4, 32, 16]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                        <mesh position={[-0.3, -0.3, 0]} rotation={[0, 0, -0.5]}>
                            <coneGeometry args={[0.15, 0.4, 16]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                        <Text position={[0, 0.05, 0.4]} fontSize={0.3} color="#db2777" anchorX="center" anchorY="middle">
                            ...
                        </Text>
                    </Float>
                    <Text position={[0, 0.6, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#db2777">
                        Click me!
                    </Text>
                </group>
            )}
        </group>
    );
};
