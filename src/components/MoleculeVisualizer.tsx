'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface AtomNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface AtomLink {
  source: string;
  target: string;
  type: 'single' | 'double';
}

interface MoleculeVisualizerProps {
  nodes: AtomNode[];
  links: AtomLink[];
  materialName: string;
  formula?: string;
}

type AtomStyle = { fill: string; ring: string; text?: string };

const CPK_COLORS: Record<string, AtomStyle> = {
  C: { fill: '#2b2d33', ring: '#6c727f' },
  H: { fill: '#d8dce3', ring: '#ffffff', text: '#111111' },
  O: { fill: '#a61c1c', ring: '#ea3838' },
  N: { fill: '#1c4596', ring: '#3b73e0' },
  F: { fill: '#288f4c', ring: '#42d475' },
  Cl: { fill: '#1f7a3f', ring: '#34c768' },
  Si: { fill: '#4b6e82', ring: '#6f9eb8' },
  P: { fill: '#d97714', ring: '#ff9830' },
  S: { fill: '#b59e1b', ring: '#ebd034', text: '#111111' },
};

const UI_COLORS: Record<string, AtomStyle> = {
  C: { fill: '#34363b', ring: '#5a5f69' },
  H: { fill: '#b85418', ring: '#e06b22' },
  O: { fill: '#8f1d1d', ring: '#d63333' },
  N: { fill: '#193b7a', ring: '#3468c7' },
  F: { fill: '#1e6b3a', ring: '#2ea357' },
  Cl: { fill: '#1b5e34', ring: '#2ea357' },
  Si: { fill: '#2c5e66', ring: '#428a96' },
  P: { fill: '#6e3582', ring: '#9f4fbd' },
  S: { fill: '#8c7a19', ring: '#c7b02c' },
};

function getStyle(symbol: string, palette: 'ui' | 'cpk'): AtomStyle {
  return (palette === 'ui' ? UI_COLORS : CPK_COLORS)[symbol] || { fill: '#4b5563', ring: '#9ca3af' };
}

function createLabelTexture(symbol: string, style: AtomStyle) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);

  const center = 128;
  context.beginPath();
  context.arc(center, center, 112, 0, Math.PI * 2);
  context.fillStyle = `${style.fill}f2`;
  context.fill();
  context.lineWidth = 9;
  context.strokeStyle = style.ring;
  context.stroke();
  context.fillStyle = style.text || '#ffffff';
  context.font = `bold ${symbol.length > 1 ? 70 : 88}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(symbol, center, center + 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function addCylinder(
  group: THREE.Group,
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  color: number,
  opacity = 1,
  offset = new THREE.Vector3(),
) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const material = new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 10), material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5).add(offset);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  group.add(mesh);
}

export default function MoleculeVisualizer({ nodes, links, materialName, formula }: MoleculeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<'ui' | 'cpk'>('ui');
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport || nodes.length === 0) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 2, 0.1, 150);
    camera.position.set(0, 1.8, 12);
    scene.add(new THREE.AmbientLight(0xffffff, 0.82));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(8, 12, 10);
    scene.add(light);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.9;

    const molecule = new THREE.Group();
    const positions = new Map<string, THREE.Vector3>();
    const minX = Math.min(...nodes.map(node => node.x));
    const maxX = Math.max(...nodes.map(node => node.x));
    const centerX = (minX + maxX) / 2;
    const scale = Math.max(0.013, Math.min(0.027, 7 / Math.max(1, maxX - minX)));

    nodes.forEach((node) => {
      const position = new THREE.Vector3((node.x - centerX) * scale, -(node.y - 110) * scale, (node.x % 3) * 0.12);
      positions.set(node.id, position);
      const style = getStyle(node.label, palette);
      const atom = new THREE.Group();
      atom.position.copy(position);
      atom.add(new THREE.Mesh(
        new THREE.SphereGeometry(Math.max(0.18, node.size * 0.018), 20, 20),
        new THREE.MeshStandardMaterial({ color: style.fill, roughness: 0.4, metalness: 0.1 }),
      ));
      const label = new THREE.Sprite(new THREE.SpriteMaterial({
        map: createLabelTexture(node.label, style),
        depthTest: false,
      }));
      const labelSize = Math.max(0.46, node.size * 0.041);
      label.scale.set(labelSize, labelSize, 1);
      label.renderOrder = 2;
      atom.add(label);
      molecule.add(atom);
    });

    links.forEach((link) => {
      const start = positions.get(link.source);
      const end = positions.get(link.target);
      if (!start || !end) return;
      const direction = new THREE.Vector3().subVectors(end, start);
      const perpendicular = new THREE.Vector3(0, 0, 1).cross(direction).normalize();
      if (perpendicular.lengthSq() < 0.01) perpendicular.set(1, 0, 0);
      const bondColor = link.type === 'double' ? 0x7d8594 : 0x626878;
      if (link.type === 'double') {
        addCylinder(molecule, start, end, 0.045, bondColor, 1, perpendicular.clone().multiplyScalar(0.085));
        addCylinder(molecule, start, end, 0.045, bondColor, 1, perpendicular.clone().multiplyScalar(-0.085));
      } else {
        addCylinder(molecule, start, end, 0.052, bondColor);
      }
    });

    scene.add(molecule);

    const resize = () => {
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    resize();

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      molecule.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          object.geometry?.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach(item => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [nodes, links, palette, autoRotate]);

  const elementSymbols = [...new Set(nodes.map(node => node.label))];
  const atomCount = nodes.length;
  const bondCount = links.length;

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#22252a] bg-[#0c0d10] p-5 text-[#b0b5be] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#22252a] pb-3">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-display text-sm uppercase tracking-[0.16em] text-[#c8cdd6]">Enlaces de Polimerización (3D)</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5e6470]">Validador de Valencia</span>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPalette(value => value === 'ui' ? 'cpk' : 'ui')} className="rounded border border-[#2b2f38] bg-[#15181f] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#c8cdd6] transition hover:border-[#525a6b]">
            Paleta: {palette === 'ui' ? 'UI' : 'CPK'}
          </button>
          <button type="button" onClick={() => setAutoRotate(value => !value)} className="rounded border border-[#2b2f38] bg-[#15181f] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#c8cdd6] transition hover:border-[#525a6b]">
            Auto-Giro: {autoRotate ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="relative z-10 h-[330px] overflow-hidden rounded-lg border border-[#22252a] bg-[radial-gradient(circle_at_center,rgba(25,28,36,0.55),rgba(8,9,12,0.9))]">
        <canvas ref={canvasRef} className="block h-full w-full cursor-grab active:cursor-grabbing" />
        <div className="pointer-events-none absolute left-3 top-3 flex max-w-[85%] flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-md border border-[#2c313c] bg-[#0c0e12e0] px-2.5 py-1.5 text-xs tracking-wide text-[#e2e6ed] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#2ea357]" />
            {materialName ? 'ESTRUCTURA QUÍMICAMENTE VÁLIDA' : 'SIN SELECCIÓN'}
          </div>
          <div className="rounded bg-[#0c0e12bf] px-2 py-1 font-mono text-[10px] text-[#8b92a1]">
            {formula ? `Fórmula: ${formula} • ` : ''}Átomos: {atomCount} • Enlaces: {bondCount}
          </div>
        </div>
        {!nodes.length && (
          <div className="absolute inset-0 flex items-center justify-center text-center font-mono text-[10px] uppercase tracking-widest text-[#6c7382]">
            Selecciona un compuesto para renderizar su geometría 3D
          </div>
        )}
        <div className="pointer-events-none absolute bottom-2 left-3 rounded bg-[#0a0b0ecc] px-2 py-1 text-[10px] text-[#6c7382]">
          Arrastra para orbitar • Rueda para acercar
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#22252a] pt-3">
        {elementSymbols.map(symbol => {
          const style = getStyle(symbol, palette);
          return (
            <div key={symbol} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#8a919e]">
              <span className="h-2.5 w-2.5 rounded-full border" style={{ backgroundColor: style.fill, borderColor: style.ring }} />
              {symbol}
            </div>
          );
        })}
      </div>
    </div>
  );
}
