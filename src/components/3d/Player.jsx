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
    const keyboard = useKeyboard();
    const mobile = useGameStore(state => state.mobileMovement);
    const forward = keyboard.forward || mobile.forward;
    const backward = keyboard.backward || mobile.backward;
    const left = keyboard.left || mobile.left;
    const right = keyboard.right || mobile.right;
    const jump = keyboard.jump || mobile.jump;
    const gameState = useGameStore(state => state.gameState);

    // Animation state
    const [bobOffset, setBobOffset] = useState(0);
    const [verticalAndGravity, setVerticalAndGravity] = useState(0); // Current Y velocity
    const [isJumping, setIsJumping] = useState(false);

    // Constants
    const JUMP_FORCE = 12; // Adjusted for snappy jump
    const GRAVITY = 30;
    const GROUND_LEVEL = 0.5;

    // Mouse Look (optional enhancement for "motion control" request)
    // The user asked for "screen follows it while you move your mouse".
    // This usually means camera rotation or character rotation.
    // Let's implement a Third-Person Camera that orbits slightly with mouse X.

    useFrame((state, delta) => {
        if (gameState !== 'playing') return;

        // Mouse influence on camera offset
        // state.pointer.x ranges from -1 to 1
        const mouseX = state.pointer.x;
        const mouseY = state.pointer.y; // -1 to 1

        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward));
        const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED * delta);

        // --- Vertical Movement (Jump) ---
        let newVelocity = verticalAndGravity;

        if (ref.current && Math.abs(ref.current.position.y - GROUND_LEVEL) < 0.1 && jump && !isJumping) {
            newVelocity = JUMP_FORCE;
            setIsJumping(true);
        }

        newVelocity -= GRAVITY * delta;

        if (ref.current) {
            // Apply horizontal movement (Relative to Camera or Global?)
            // Standard WASD usually is global or camera-relative. 
            // Let's keep global for simplicity but rotate character to face movement.

            if (direction.length() > 0) {
                ref.current.position.x += direction.x;
                ref.current.position.z += direction.z;

                // Character Rotation to movement
                const targetRotation = Math.atan2(direction.x, direction.z);
                const rotLerpFactor = 15 * delta;
                // Simple lerp for rotation angle
                // Note: proper angle lerp needs quaternion or short-path logic, but basic lerp works for small turns.
                // We'll just snap for now or use basic approach:
                ref.current.rotation.y = targetRotation;

                if (!isJumping) setBobOffset(prev => prev + delta * 15);
            } else {
                if (!isJumping) setBobOffset(0);

                // Idle Rotation: Look at mouse?
                // Users requested: "motion control on the raccoon, the screen follows it while you move your mouse"
                // This implies the camera or character rotates.
                // Let's make the Character slightly face the mouse direction when idle?
                // Or better: The Camera orbits based on mouse X.
            }

            // Apply vertical
            let newY = ref.current.position.y + newVelocity * delta;
            if (newY <= GROUND_LEVEL) {
                newY = GROUND_LEVEL;
                newVelocity = 0;
                setIsJumping(false);
            }
            ref.current.position.y = newY;
            setVerticalAndGravity(newVelocity);

            // Bobbing
            const modelGroup = ref.current.children[0];
            if (modelGroup) {
                modelGroup.position.y = isJumping ? 0 : Math.sin(bobOffset) * 0.1;
            }

            // Camera Logic: Follow Player + Mouse Influence
            // Base offset: Behind and up
            // Mouse X rotates the camera around the player? 
            // Or just shifts it? "Screen follows it while you move mouse" -> Mouse Look.

            const camDistH = 8; // Horizontal distance
            const camDistV = 5; // Vertical height

            // Calculate camera position based on player pos + offset
            // Add mouse influence to rotation around player
            const angle = mouseX * 0.5; // Rotate +/- 0.5 radians (approx 30 deg)

            const offsetX = Math.sin(angle) * camDistH;
            const offsetZ = Math.cos(angle) * camDistH;

            const targetCamPos = new THREE.Vector3(
                ref.current.position.x + offsetX,
                ref.current.position.y + camDistV + (mouseY * 2), // Mouse Y looks up/down slightly
                ref.current.position.z + offsetZ
            );

            state.camera.position.lerp(targetCamPos, 0.1);
            state.camera.lookAt(ref.current.position.x, ref.current.position.y + 1, ref.current.position.z);
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
