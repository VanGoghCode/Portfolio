// nightSky.tsx

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  maxOpacity: number;
  originalX: number;
  originalY: number;
  glowSize: number;
}

const NightSky: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  const threeContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const asteroidsRef = useRef<THREE.Object3D[]>([]);
  const lightsRef = useRef<THREE.Light[]>([]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  const autoScrollOffset = useRef(0);
  const scrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const dx = useRef(0);
  const dy = useRef(0);

  const initializeStars = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const getColor = (varName: string, fallback: string) => {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(varName)
          .trim() || fallback
      );
    };

    const starColors = [
      getColor("--color-star-blue", "#4169e1"),
      getColor("--color-star-orange", "#ffa500"),
      getColor("--color-star-white", "#ffffff"),
    ];

    // Adjust star count based on screen size for better performance on mobile
    const starCount = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / 1000) + 200,
      Math.floor(Math.random() * 400) + 600
    );

    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 3);
      const size = Math.random() * 0.8 + 0.8;
      const glowSize = size * (3 + size / 2);

      stars.push({
        x,
        y,
        originalX: x,
        originalY: y,
        size,
        glowSize,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: Math.random(),
        speed: (Math.random() * 0.005 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        maxOpacity: Math.random() * 0.5 + 0.5,
      });
    }
    starsRef.current = stars;
  };

  const initializeThreeJs = () => {
    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    camera.position.y = 5;
    camera.lookAt(new THREE.Vector3(0, 0, -20));
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768, // Only use antialiasing on larger screens
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.shadowMap.enabled = window.innerWidth > 768; // Only enable shadows on larger screens
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    lightsRef.current.push(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = window.innerWidth > 768; // Only cast shadows on larger screens
    mainLight.shadow.mapSize.width = window.innerWidth > 1200 ? 2048 : 1024;
    mainLight.shadow.mapSize.height = window.innerWidth > 1200 ? 2048 : 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 500;
    scene.add(mainLight);
    lightsRef.current.push(mainLight);

    const fillLight = new THREE.DirectionalLight(0xccccff, 0.7);
    fillLight.position.set(-15, 0, 15);
    scene.add(fillLight);
    lightsRef.current.push(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffee, 0.8);
    rimLight.position.set(0, -10, -15);
    scene.add(rimLight);
    lightsRef.current.push(rimLight);

    const loader = new GLTFLoader();

    type GLTFResult = GLTF;

    const createAsteroidMaterial = () => {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2D3033"),
        roughness: 0.5,
        metalness: 0.2,
        flatShading: true,
      });
    };

    interface AsteroidUserData {
      speed: number;
      ySpeed: number;
      rotationSpeed: { x: number; y: number; z: number };
    }

    interface CreateAsteroidFunction {
      (zPos: number): THREE.Object3D;
    }

    // Adjust asteroid count based on screen size
    const asteroidCount = window.innerWidth < 768 ? 4 : 8;

    loader.load(
      "media/glb/asteroid2.glb",
      (gltf: GLTFResult) => {
        const camera = cameraRef.current;
        if (!camera) return;

        const asteroidMaterial = createAsteroidMaterial();
        gltf.scene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = asteroidMaterial.clone();
            child.castShadow = window.innerWidth > 768;
            child.receiveShadow = window.innerWidth > 768;

            // Optimize geometry for mobile
            if (window.innerWidth < 768 && child.geometry) {
              const decimatedGeometry = child.geometry.clone();
              // No actual decimation logic here, but in a real project you'd implement this
              child.geometry = decimatedGeometry;
            }
          }
        });

        const createLargeAsteroid: CreateAsteroidFunction = (zPos: number) => {
          const asteroid: THREE.Object3D = gltf.scene.clone();
          const distanceFromCamera: number = camera.position.z - zPos;
          const visibleHeight: number =
            2 *
            Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) *
            distanceFromCamera;
          const visibleWidth: number = visibleHeight * camera.aspect;

          asteroid.position.set(
            visibleWidth / 2 + Math.random() * 50,
            (Math.random() - 0.5) * visibleHeight,
            zPos
          );

          const scale: number = Math.random() * 1 + 1.2;
          asteroid.scale.set(scale, scale, scale);

          asteroid.userData = {
            speed: Math.random() * 4 + 4,
            ySpeed: (Math.random() - 0.5) * 1.2,
            rotationSpeed: {
              x: (Math.random() - 0.5) * 0.3,
              y: (Math.random() - 0.5) * 0.3,
              z: (Math.random() - 0.5) * 0.3,
            },
          } as AsteroidUserData;

          scene.add(asteroid);
          return asteroid;
        };

        const smallAsteroids = [];
        for (let i = 0; i < asteroidCount; i++) {
          const z = -10 - Math.random() * 50;
          smallAsteroids.push(createLargeAsteroid(z));
        }

        asteroidsRef.current = [...asteroidsRef.current, ...smallAsteroids];
      },
      undefined,
      (error: unknown) => console.error("Error loading large asteroids:", error)
    );
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      mouseX.current = e.touches[0].clientX;
      mouseY.current = e.touches[0].clientY;
    }
  };

  const handleScroll = () => {
    scrollY.current = window.scrollY;
  };

  const handleResize = () => {
    // Throttle resize events for better performance
    
    const resizeTimeout = setTimeout(() => {
      initializeStars();
      if (rendererRef.current && cameraRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        // Adjust rendering quality based on device
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current.shadowMap.enabled = width > 768;
      }
    }, 250);
    if (resizeTimeout) clearTimeout(resizeTimeout);
  };

  const drawStars = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime.current) / 1000;
    lastTime.current = currentTime;

    // Adjust animation speed based on device performance
    const scrollSpeed = window.innerWidth < 768 ? 7 : 15;
    autoScrollOffset.current += scrollSpeed * deltaTime;

    const deltaX = mouseX.current - prevMouseX.current;
    const deltaY = mouseY.current - prevMouseY.current;
    prevMouseX.current = mouseX.current;
    prevMouseY.current = mouseY.current;

    // Adjust mouse influence based on device type
    const mouseFactor = window.innerWidth < 768 ? 0.8 : 1.5;
    dx.current = deltaX * mouseFactor + dx.current * 0.95;
    dy.current = deltaY * mouseFactor + dy.current * 0.95;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    starsRef.current.forEach((star) => {
      ctx.save();
      star.opacity += star.speed;
      if (star.opacity > star.maxOpacity || star.opacity < 0.1) {
        star.speed = -star.speed;
        star.opacity = Math.max(0.1, Math.min(star.maxOpacity, star.opacity));
      }

      let baseX = (star.originalX - autoScrollOffset.current) % canvas.width;
      if (baseX < 0) baseX += canvas.width;
      let adjustedY = star.originalY - scrollY.current * 0.5;

      if (adjustedY < -canvas.height) adjustedY += canvas.height * 3;
      if (adjustedY > canvas.height * 2) adjustedY -= canvas.height * 3;

      star.x = baseX + dx.current * (star.size / 5) * 0.15;
      star.y = adjustedY + dy.current * (star.size / 5) * 0.15;

      if (star.y < -50 || star.y > canvas.height + 50) {
        ctx.restore();
        return;
      }

      const gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.glowSize
      );
      gradient.addColorStop(0, star.color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalAlpha = star.opacity * 0.3;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  };

  const updateAsteroids = (deltaTime: number) => {
    asteroidsRef.current.forEach((asteroid) => {
      if (!asteroid || !cameraRef.current) return;

      asteroid.position.x -= asteroid.userData.speed * deltaTime;
      asteroid.position.y += asteroid.userData.ySpeed * deltaTime;

      if (asteroid.userData.rotationSpeed) {
        asteroid.rotation.x += asteroid.userData.rotationSpeed.x * deltaTime;
        asteroid.rotation.y += asteroid.userData.rotationSpeed.y * deltaTime;
        asteroid.rotation.z += asteroid.userData.rotationSpeed.z * deltaTime;
      }

      const zPos = asteroid.position.z;
      const distanceFromCamera = cameraRef.current.position.z - zPos;
      const visibleHeight =
        2 *
        Math.tan(THREE.MathUtils.degToRad(cameraRef.current.fov) / 2) *
        distanceFromCamera;
      const visibleWidth = visibleHeight * cameraRef.current.aspect;

      if (asteroid.position.x < -visibleWidth / 2 - 50) {
        asteroid.position.x = visibleWidth / 2 + Math.random() * 100;
        asteroid.position.y = (Math.random() - 0.5) * visibleHeight;
        const isLarge = asteroid.scale.x > 0.8;
        asteroid.userData.speed = isLarge
          ? Math.random() * 2 + 4
          : Math.random() * 3 + 5;
        asteroid.userData.ySpeed =
          (Math.random() - 0.5) * (isLarge ? 1.2 : 0.5);
      }
    });
  };

  const updateLights = () => {
    if (!cameraRef.current) return;
    const camPos = cameraRef.current.position;
    if (
      lightsRef.current[1] &&
      lightsRef.current[1] instanceof THREE.DirectionalLight
    ) {
      lightsRef.current[1].position.set(
        camPos.x + 10,
        camPos.y + 20,
        camPos.z + 10
      );
      lightsRef.current[1].target.position.set(
        camPos.x,
        camPos.y,
        camPos.z - 20
      );
      lightsRef.current[1].target.updateMatrixWorld();
    }
    if (
      lightsRef.current[2] &&
      lightsRef.current[2] instanceof THREE.DirectionalLight
    ) {
      lightsRef.current[2].position.set(camPos.x - 15, camPos.y, camPos.z + 15);
    }
  };

  // Use requestAnimationFrame with performance considerations
  const animate = () => {
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - lastTime.current) / 1000, 0.1); // Cap deltaTime to avoid jumps

    drawStars();
    updateAsteroids(deltaTime);
    updateLights();

    if (sceneRef.current && cameraRef.current && rendererRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);
    lastTime.current = currentTime;
  };

  useEffect(() => {
    // Check if browser supports WebGL
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const supportsWebGL = !!gl;

    initializeStars();

    if (supportsWebGL) {
      initializeThreeJs();
    } else {
      console.warn("WebGL not supported, falling back to 2D stars only");
    }

    animate();

    // Add event listeners with passive option for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Device orientation for mobile devices
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        (event) => {
          if (event.beta && event.gamma) {
            // Convert orientation to mouse movement
            const movementX = event.gamma * 0.5; // Left/right tilt
            const movementY = event.beta * 0.5; // Front/back tilt

            mouseX.current += movementX;
            mouseY.current += movementY;
          }
        },
        { passive: true }
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      cancelAnimationFrame(animationRef.current);

      if (rendererRef.current && threeContainerRef.current) {
        threeContainerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      // Clean up Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  // Define the handleDeviceOrientation function
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta && event.gamma) {
      const movementX = event.gamma * 0.5;
      const movementY = event.beta * 0.5;

      mouseX.current += movementX;
      mouseY.current += movementY;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
        aria-hidden="true"
      />
      <div
        ref={threeContainerRef}
        className="fixed top-0 left-0 w-full h-full z-20 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

export default NightSky;
