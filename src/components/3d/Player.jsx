import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { RaccoonModel } from './RaccoonModel';

const SPEED = 5;

const useKeyboard = () => {
    const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.repeat) return;
            switch (e.code) {
                case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: true })); break;
                case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: true })); break;
                case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: true })); break;
                case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: true })); break;
                case 'Space': setMovement(m => ({ ...m, jump: true })); break;
            }
        };
        const handleKeyUp = (e) => {
            switch (e.code) {
                case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: false })); break;
                case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: false })); break;
                case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: false })); break;
                case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: false })); break;
                case 'Space': setMovement(m => ({ ...m, jump: false })); break;
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
    const { forward, backward, left, right, jump } = useKeyboard();
    const gameState = useGameStore(state => state.gameState);

    // Animation state
    const [bobOffset, setBobOffset] = useState(0);
    const [verticalAndGravity, setVerticalAndGravity] = useState(0); // Current Y velocity
    const [isJumping, setIsJumping] = useState(false);

    // Constants
    const JUMP_FORCE = 12; // Adjusted for snappy jump
    const GRAVITY = 30;
    const GROUND_LEVEL = 0.5;

    useFrame((state, delta) => {
        if (gameState !== 'playing' && gameState !== 'welcome') return;

        // --- Horizontal Movement ---
        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward));
        const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED * delta);

        // --- Vertical Movement (Jump) ---
        let newVelocity = verticalAndGravity;

        // Start jump if on ground and space pressed
        if (ref.current && Math.abs(ref.current.position.y - GROUND_LEVEL) < 0.1 && jump && !isJumping) {
            newVelocity = JUMP_FORCE;
            setIsJumping(true);
        }

        // Apply Gravity
        newVelocity -= GRAVITY * delta;

        if (ref.current) {
            // Apply horizontal
            if (direction.length() > 0) {
                ref.current.position.x += direction.x;
                ref.current.position.z += direction.z;

                // Rotate character to face movement direction
                const targetRotation = Math.atan2(direction.x, direction.z);
                // Smooth rotation
                const currentRotation = ref.current.rotation.y;
                // Basic lerp for rotation (simplified)
                ref.current.rotation.y = targetRotation;

                if (!isJumping) {
                    setBobOffset(prev => prev + delta * 15);
                }
            } else {
                if (!isJumping) setBobOffset(0);
            }

            // Apply vertical
            let newY = ref.current.position.y + newVelocity * delta;

            // Ground Collision
            if (newY <= GROUND_LEVEL) {
                newY = GROUND_LEVEL;
                newVelocity = 0;
                setIsJumping(false);
            }

            ref.current.position.y = newY;
            setVerticalAndGravity(newVelocity);

            // Bobbing effect (only on ground)
            const modelGroup = ref.current.children[0];
            if (modelGroup) {
                if (!isJumping) {
                    modelGroup.position.y = Math.sin(bobOffset) * 0.1;
                } else {
                    modelGroup.position.y = 0;
                }
            }

            // Camera Follow (Zoomed in for "First scene is too small" feedback)
            // Was +5y, +8z. Moving to +3.5y, +5.5z for closer look.
            const targetCamPos = new THREE.Vector3(ref.current.position.x, ref.current.position.y + 3.5, ref.current.position.z + 5.5);
            state.camera.position.lerp(targetCamPos, 0.1);
            state.camera.lookAt(ref.current.position.x, ref.current.position.y + 0.5, ref.current.position.z);
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
