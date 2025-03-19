"use client";
import React, { useEffect, useRef, useState } from "react";
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

interface AsteroidUserData {
  speed: number;
  ySpeed: number;
  rotationSpeed: { x: number; y: number; z: number };
  isThrown?: boolean;
  throwVelocity?: { x: number; y: number; z: number };
  throwRotation?: { x: number; y: number; z: number };
  throwTime?: number;
  originalPosition?: THREE.Vector3;
  originalMaterialsMap?: { [key: string]: THREE.Material | THREE.Material[] };
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
  const lightsRef = useRef<(THREE.Light | THREE.DirectionalLight)[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const touchStartTimeRef = useRef<number>(0);
  const touchStartPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const selectedAsteroidRef = useRef<THREE.Object3D | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);
  const autoScrollOffset = useRef(0);
  const scrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const dx = useRef(0);
  const dy = useRef(0);
  const [interactionEnabled, setInteractionEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const initializeStars = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const getColor = (varName: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
    const starColors = [
      getColor("--color-star-blue", "#4169e1"),
      getColor("--color-star-orange", "#ffa500"),
      getColor("--color-star-white", "#ffffff"),
    ];
    const starCount = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / 1000) + 200,
      Math.floor(Math.random() * 400 + 600)
    );
    starsRef.current = Array.from({ length: starCount }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 3);
      const size = Math.random() * 0.8 + 0.8;
      const glowSize = size * (3 + size / 2);
      return {
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
      };
    });
  };

  const initializeThreeJs = () => {
    if (!threeContainerRef.current) return;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 30);
    camera.lookAt(0, 0, -20);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = window.innerWidth > 768;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    lightsRef.current.push(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = window.innerWidth > 768;
    mainLight.shadow.mapSize.set(2048, 2048);
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
    const asteroidCount = window.innerWidth < 768 ? 4 : 8;
    loader.load(
      "media/glb/asteroid2.glb",
      (gltf: GLTF) => {
        if (!cameraRef.current) return;
        const asteroidMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#2D3033"),
          roughness: 0.5,
          metalness: 0.2,
          flatShading: true,
        });
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = asteroidMaterial.clone();
            child.castShadow = window.innerWidth > 768;
            child.receiveShadow = window.innerWidth > 768;
          }
        });
        asteroidsRef.current = Array.from({ length: asteroidCount }, () => {
          const asteroid = gltf.scene.clone();
          const zPos = -10 - Math.random() * 50;
          const distanceFromCamera = camera.position.z - zPos;
          const fovRad = THREE.MathUtils.degToRad(camera.fov);
          const visibleHeight = 2 * Math.tan(fovRad / 2) * distanceFromCamera;
          const visibleWidth = visibleHeight * camera.aspect;
          asteroid.position.set(
            visibleWidth / 2 + Math.random() * 50,
            (Math.random() - 0.5) * visibleHeight,
            zPos
          );
          const scale = Math.random() * 1 + 1.2;
          asteroid.scale.set(scale, scale, scale);
          const originalMaterialsMap: { [key: string]: THREE.Material | THREE.Material[] } = {};
          asteroid.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.uuid = THREE.MathUtils.generateUUID();
              if (child.material) {
                originalMaterialsMap[child.uuid] = Array.isArray(child.material)
                  ? [...child.material]
                  : child.material;
              }
            }
          });
          asteroid.userData = {
            speed: Math.random() * 4 + 4,
            ySpeed: (Math.random() - 0.5) * 1.2,
            rotationSpeed: {
              x: (Math.random() - 0.5) * 0.3,
              y: (Math.random() - 0.5) * 0.3,
              z: (Math.random() - 0.5) * 0.3,
            },
            isThrown: false,
            throwVelocity: { x: 0, y: 0, z: 0 },
            throwRotation: { x: 0, y: 0, z: 0 },
            throwTime: 0,
            originalPosition: asteroid.position.clone(),
            originalMaterialsMap,
          } as AsteroidUserData;
          scene.add(asteroid);
          return asteroid;
        });
      },
      undefined,
      () => {}
    );
  };

  const handlePointerMove = (e: PointerEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
    mouseRef.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    if (selectedAsteroidRef.current && !selectedAsteroidRef.current.userData.isThrown && !isMobile) {
      updateSelectedAsteroidPosition();
    }
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (!interactionEnabled || isMobile) return;
    touchStartTimeRef.current = performance.now();
    touchStartPositionRef.current = { x: e.clientX, y: e.clientY };
    mouseRef.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    checkAsteroidIntersection();
  };

  const handlePointerUp = () => {
    if (selectedAsteroidRef.current && !isMobile) throwSelectedAsteroid();
  };

  const checkAsteroidIntersection = () => {
    if (!cameraRef.current || !sceneRef.current || isMobile) return;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(asteroidsRef.current, true);
    if (intersects.length > 0) {
      let asteroidObj: THREE.Object3D | null = intersects[0].object;
      while (asteroidObj && !asteroidsRef.current.includes(asteroidObj)) {
        asteroidObj = asteroidObj.parent;
      }
      if (asteroidObj && !asteroidObj.userData.isThrown) {
        asteroidObj.userData.originalPosition = asteroidObj.position.clone();
        asteroidObj.userData.isThrown = false;
        selectedAsteroidRef.current = asteroidObj;
      }
    }
  };

  const updateSelectedAsteroidPosition = () => {
    if (!selectedAsteroidRef.current || !cameraRef.current || isMobile) return;
    const zPos = selectedAsteroidRef.current.position.z;
    const vector = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
    vector.unproject(cameraRef.current);
    const dir = vector.sub(cameraRef.current.position).normalize();
    const distance = (zPos - cameraRef.current.position.z) / dir.z;
    const pos = cameraRef.current.position.clone().addScaledVector(dir, distance);
    selectedAsteroidRef.current.position.set(pos.x, pos.y, zPos);
  };

  const throwSelectedAsteroid = () => {
    if (!selectedAsteroidRef.current || isMobile) return;
    const asteroid = selectedAsteroidRef.current;
    const touchDuration = performance.now() - touchStartTimeRef.current;
    const deltaX = mouseX.current - touchStartPositionRef.current.x;
    const deltaY = mouseY.current - touchStartPositionRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const originalSpeed = asteroid.userData.speed;
    const minAllowedSpeed = 0.7 * originalSpeed;
    if (distance > 10 && touchDuration < 1000) {
      let computedSpeed = (distance / touchDuration) * 10;
      if (computedSpeed < minAllowedSpeed) computedSpeed = minAllowedSpeed;
      const dirX = deltaX / distance;
      const dirY = deltaY / distance;
      asteroid.userData.isThrown = true;
      asteroid.userData.throwVelocity = {
        x: dirX * computedSpeed * 0.5,
        y: -dirY * computedSpeed * 0.5,
        z: (Math.random() - 0.5) * 5,
      };
      asteroid.userData.throwRotation = {
        x: (Math.random() - 0.5) * 2 + dirY * 0.5,
        y: (Math.random() - 0.5) * 2 - dirX * 0.5,
        z: (Math.random() - 0.5) * 2,
      };
      asteroid.userData.throwTime = performance.now();
      createThrowParticles(asteroid);
      setInteractionEnabled(false);
      setTimeout(() => setInteractionEnabled(true), 500);
    } else {
      asteroid.userData.isThrown = true;
      asteroid.userData.throwVelocity = { x: minAllowedSpeed, y: 0, z: 0 };
      asteroid.userData.throwRotation = { x: 0, y: 0, z: 0 };
      asteroid.userData.throwTime = performance.now();
      createThrowParticles(asteroid);
      setInteractionEnabled(false);
      setTimeout(() => setInteractionEnabled(true), 500);
    }
    selectedAsteroidRef.current = null;
  };

  const createThrowParticles = (asteroid: THREE.Object3D) => {
    if (!sceneRef.current) return;
    const particleCount = 20;
    const particles = new THREE.Group();
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 4, 4);
      const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.8 });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.copy(asteroid.position);
      particle.userData = {
        velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: (Math.random() - 0.5) * 2 },
        lifespan: 1.0,
      };
      particles.add(particle);
    }
    sceneRef.current.add(particles);
    setTimeout(() => {
      if (sceneRef.current) {
        sceneRef.current.remove(particles);
        particles.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((mat) => mat.dispose());
            else obj.material.dispose();
          }
        });
      }
    }, 1000);
  };

  const handleScroll = () => {
    scrollY.current = window.scrollY;
  };

  const handleResize = () => {
    setTimeout(() => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      initializeStars();
      if (rendererRef.current && cameraRef.current) {
        const { innerWidth: width, innerHeight: height } = window;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current.shadowMap.enabled = width > 768;
      }
    }, 250);
  };

  const drawStars = (deltaTime: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scrollSpeed = window.innerWidth < 768 ? 7 : 15;
    autoScrollOffset.current += scrollSpeed * deltaTime;
    const deltaX = mouseX.current - prevMouseX.current;
    const deltaY = mouseY.current - prevMouseY.current;
    prevMouseX.current = mouseX.current;
    prevMouseY.current = mouseY.current;
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
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.glowSize);
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
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    const tanFov = Math.tan(fovRad / 2);
    asteroidsRef.current.forEach((asteroid) => {
      if (asteroid === selectedAsteroidRef.current && !isMobile) return;
      const zPos = asteroid.position.z;
      const distanceFromCamera = camera.position.z - zPos;
      const visibleHeight = 2 * tanFov * distanceFromCamera;
      const visibleWidth = visibleHeight * camera.aspect;
      if (asteroid.userData.isThrown && !isMobile) {
        const { throwVelocity, throwRotation } = asteroid.userData;
        asteroid.position.x += throwVelocity!.x * deltaTime;
        asteroid.position.y += throwVelocity!.y * deltaTime;
        asteroid.position.z += throwVelocity!.z * deltaTime;
        asteroid.rotation.x += throwRotation!.x * deltaTime * 2;
        asteroid.rotation.y += throwRotation!.y * deltaTime * 2;
        asteroid.rotation.z += throwRotation!.z * deltaTime * 2;
        const throwDuration = (performance.now() - asteroid.userData.throwTime!) / 1000;
        if (
          asteroid.position.x < -visibleWidth * 3 ||
          asteroid.position.x > visibleWidth * 3 ||
          asteroid.position.y < -visibleHeight * 3 ||
          asteroid.position.y > visibleHeight * 3 ||
          asteroid.position.z > camera.position.z + 20 ||
          asteroid.position.z < -150 ||
          throwDuration > 30
        ) {
          asteroid.position.set(
            visibleWidth / 2 + Math.random() * 100,
            (Math.random() - 0.5) * visibleHeight,
            -10 - Math.random() * 50
          );
          asteroid.userData.speed = Math.random() * 4 + 4;
          asteroid.userData.ySpeed = (Math.random() - 0.5) * 1.2;
          asteroid.userData.isThrown = false;
          asteroid.userData.throwVelocity = { x: 0, y: 0, z: 0 };
          asteroid.userData.throwRotation = { x: 0, y: 0, z: 0 };
          asteroid.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );
        }
      } else {
        asteroid.position.x -= asteroid.userData.speed * deltaTime;
        asteroid.position.y += asteroid.userData.ySpeed * deltaTime;
        asteroid.rotation.x += asteroid.userData.rotationSpeed.x * deltaTime;
        asteroid.rotation.y += asteroid.userData.rotationSpeed.y * deltaTime;
        asteroid.rotation.z += asteroid.userData.rotationSpeed.z * deltaTime;
        if (asteroid.position.x < -visibleWidth) {
          asteroid.position.set(
            visibleWidth / 2 + Math.random() * 100,
            (Math.random() - 0.5) * visibleHeight,
            -10 - Math.random() * 50
          );
          asteroid.userData.speed = Math.random() * 4 + 4;
          asteroid.userData.ySpeed = (Math.random() - 0.5) * 1.2;
          asteroid.userData.isThrown = false;
          asteroid.userData.throwVelocity = { x: 0, y: 0, z: 0 };
          asteroid.userData.throwRotation = { x: 0, y: 0, z: 0 };
          asteroid.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );
        }
      }
    });
  };

  const updateLights = () => {
    if (!cameraRef.current) return;
    const camPos = cameraRef.current.position;
    lightsRef.current[1].position.set(camPos.x + 10, camPos.y + 20, camPos.z + 10);
    (lightsRef.current[1] as THREE.DirectionalLight).target.position.set(camPos.x, camPos.y, camPos.z);
    (lightsRef.current[1] as THREE.DirectionalLight).target.updateMatrixWorld();
    lightsRef.current[2].position.set(camPos.x - 15, camPos.y, camPos.z + 15);
  };

  const animate = () => {
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - lastTime.current) / 1000, 0.1);
    lastTime.current = currentTime;
    drawStars(deltaTime);
    updateAsteroids(deltaTime);
    updateLights();
    if (sceneRef.current && cameraRef.current && rendererRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768;
    };
    setIsMobile(checkMobile());
    
    const supportsWebGL = !!(
      document.createElement("canvas").getContext("webgl") ||
      document.createElement("canvas").getContext("experimental-webgl")
    );
    initializeStars();
    if (supportsWebGL) initializeThreeJs();
    animate();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      if (rendererRef.current && threeContainerRef.current) {
        threeContainerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) object.material.forEach((mat) => mat.dispose());
            else object.material?.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" aria-hidden="true" />
      <div ref={threeContainerRef} className="fixed top-0 left-0 w-full h-full z-20 pointer-events-auto" aria-hidden="true" />
    </div>
  );
};

export default NightSky;