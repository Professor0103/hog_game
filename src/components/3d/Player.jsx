import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { RaccoonModel } from './RaccoonModel';

const SPEED = 5;

const useKeyboard = () => {
    const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.code) {
                case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: true })); break;
                case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: true })); break;
                case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: true })); break;
                case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: true })); break;
            }
        };
        const handleKeyUp = (e) => {
            switch (e.code) {
                case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: false })); break;
                case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: false })); break;
                case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: false })); break;
                case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: false })); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    return movement;
};

export const Player = () => {
    const ref = useRef();
    const { camera } = useThree();
    const { forward, backward, left, right } = useKeyboard();
    const gameState = useGameStore(state => state.gameState);

    // Animation state (simple bobbing)
    const [bobOffset, setBobOffset] = useState(0);

    useFrame((state, delta) => {
        if (gameState !== 'playing' && gameState !== 'welcome') return;

        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward));
        const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED * delta);

        if (ref.current) {
            if (direction.length() > 0) {
                ref.current.position.x += direction.x;
                ref.current.position.z += direction.z;
                // Rotate character to face movement direction
                const targetRotation = Math.atan2(direction.x, direction.z);
                ref.current.rotation.y = targetRotation;
                setBobOffset(prev => prev + delta * 15);
            } else {
                setBobOffset(0); // Reset bob
            }

            // Bobbing effect
            const bobHeight = 0.5 + Math.sin(bobOffset) * 0.1;

            // Camera Follow (Smooth Lerp)
            const targetCamPos = new THREE.Vector3(ref.current.position.x, ref.current.position.y + 5, ref.current.position.z + 8);
            state.camera.position.lerp(targetCamPos, 0.1);
            state.camera.lookAt(ref.current.position.x, ref.current.position.y, ref.current.position.z);

            // Model Bob
            const modelGroup = ref.current.children[0];
            if (modelGroup) modelGroup.position.y = Math.sin(bobOffset) * 0.1;
        }
    });

    return (
        <group ref={ref} position={[0, 0.5, 0]} name="player-group">
            <group>
                <RaccoonModel />
            </group>
        </group>
    );
};
