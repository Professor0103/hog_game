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
            <group onClick={() => {
                if (heartsCollected >= totalHearts) {
                    setGameState('dialogue');
                } else {
                    alert("Collect all hearts first!"); // Placeholder feedback
                }
            }}>
                <PigModel />
                {heartsCollected >= totalHearts && (
                    <Text position={[0, 1.2, 0]} fontSize={0.2} color="hotpink" anchorY="bottom">
                        !
                    </Text>
                )}
            </group>
        </group>
    );
};
