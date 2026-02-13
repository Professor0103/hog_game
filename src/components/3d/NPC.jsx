import React from 'react';
import { Text, Float } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';
import { PigModel } from './PigModel';

export const NPC = ({ position }) => {
    const heartsCollected = useGameStore((state) => state.heartsCollected);
    const totalHearts = useGameStore((state) => state.totalHearts);
    const gameState = useGameStore((state) => state.gameState);
    const setGameState = useGameStore((state) => state.setGameState);
    const dialogueStep = useGameStore((state) => state.dialogueStep);
    const dialogueLines = useGameStore((state) => state.dialogueLines);
    const nextDialogue = useGameStore((state) => state.nextDialogue);
    const allHeartsCollected = heartsCollected >= totalHearts;
    const inDialogue = gameState === 'dialogue';

    const handlePigClick = (e) => {
        e.stopPropagation();
        if (inDialogue) {
            nextDialogue();
        } else if (allHeartsCollected) {
            setGameState('dialogue');
        }
    };

    const showPointer = allHeartsCollected || inDialogue;

    return (
        <group
            position={position}
            onClick={handlePigClick}
            onPointerOver={(e) => {
                e.stopPropagation();
                if (showPointer) document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
            }}
        >
            <PigModel />

            {allHeartsCollected && !inDialogue && (
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

            {inDialogue && (
                <group position={[0, 2.5, 0.8]}>
                    <Float speed={2} floatIntensity={0.3}>
                        <mesh position={[0, 0, -0.08]}>
                            <planeGeometry args={[5, 2.2, 1]} />
                            <meshStandardMaterial color="#ffffff" />
                        </mesh>
                        <Text
                            position={[0, 0.2, 0]}
                            fontSize={0.28}
                            color="#1f2937"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={4.6}
                            textAlign="center"
                        >
                            {dialogueLines[dialogueStep]}
                        </Text>
                        <Text
                            position={[0, -0.7, 0]}
                            fontSize={0.16}
                            color="#be185d"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.02}
                            outlineColor="#831843"
                        >
                            Click pig to continue ➤
                        </Text>
                    </Float>
                </group>
            )}
        </group>
    );
}
