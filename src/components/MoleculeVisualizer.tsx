import React, { useEffect, useState } from 'react';

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
}

export default function MoleculeVisualizer({ nodes, links, materialName }: MoleculeVisualizerProps) {
  const [vibrationOffset, setVibrationOffset] = useState<number>(0);

  useEffect(() => {
    let animId: number;
    let t = 0;
    const update = () => {
      t += 0.05;
      setVibrationOffset(Math.sin(t) * 0.4);
      animId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(animId);
  }, []);

  const minX = Math.min(...nodes.map(n => n.x), 50);
  const maxX = Math.max(...nodes.map(n => n.x), 300);
  const minY = Math.min(...nodes.map(n => n.y), 40);
  const maxY = Math.max(...nodes.map(n => n.y), 160);

  const width = Math.max(380, maxX - minX + 100);
  const height = Math.max(220, maxY - minY + 100);
  
  const dx = minX - 40;
  const dy = minY - 30;

  // Modern soft minimal color palette for atoms
  const getAtomStyle = (label: string) => {
    switch (label) {
      case 'C':
        return { fill: 'bg-neutral-900 text-white dark:bg-white dark:text-black', colorCode: '#171717', darkColorCode: '#ffffff' };
      case 'H':
        return { fill: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200', colorCode: '#f5f5f5', darkColorCode: '#171717' };
      case 'O':
        return { fill: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400', colorCode: '#fecaca', darkColorCode: '#7f1d1d' };
      case 'N':
        return { fill: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400', colorCode: '#bfdbfe', darkColorCode: '#1e3a8a' };
      case 'F':
        return { fill: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', colorCode: '#a7f3d0', darkColorCode: '#064e3b' };
      case 'Cl':
        return { fill: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400', colorCode: '#fde68a', darkColorCode: '#78350f' };
      default:
        return { fill: 'bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400', colorCode: '#f5f5f5', darkColorCode: '#262626' };
    }
  };

  return (
    <div className="bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative flex flex-col justify-between overflow-hidden">
      {/* Background elegant grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Card Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4 mb-6">
        <span className="font-sans font-light text-xs text-black/60 dark:text-white/60 tracking-[0.15em] uppercase">
          Enlaces de Polimerización (2D)
        </span>
        <div className="text-[10px] uppercase tracking-wider text-black/40 dark:text-white/40 font-mono">
          {materialName ? 'Estructura Macromolecular' : 'Boceto vacío'}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative z-10 w-full h-[250px] flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950/20 rounded-lg border border-black/5 dark:border-white/5 p-4 overflow-hidden">
        {nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center max-w-xs text-black/40 dark:text-white/40 font-sans">
            <span className="text-xs uppercase tracking-widest font-light mb-2">Sin selección</span>
            <span className="text-[10px] leading-relaxed">
              Active elementos en la tabla periódica y pulse "Sintetizar Material" para renderizar la estructura del compuesto plástico.
            </span>
          </div>
        ) : (
          <svg
            viewBox={`${dx} ${dy} ${width} ${height}`}
            className="w-full h-full max-h-[230px]"
          >
            {/* Links / Bonds Rendering */}
            {links.map((link, idx) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);

              if (!sourceNode || !targetNode) return null;

              // Apply gentle vibration offset to coords
              const sx = sourceNode.x + (idx % 2 === 0 ? vibrationOffset : -vibrationOffset);
              const sy = sourceNode.y + (idx % 3 === 0 ? vibrationOffset : -vibrationOffset);
              const tx = targetNode.x + (idx % 2 === 1 ? vibrationOffset : -vibrationOffset);
              const ty = targetNode.y + (idx % 3 === 1 ? vibrationOffset : -vibrationOffset);

              if (link.type === 'double') {
                // Draw two parallel lines for double covalent bonds
                const dxVal = tx - sx;
                const dyVal = ty - sy;
                const len = Math.sqrt(dxVal * dxVal + dyVal * dyVal);
                const ox = (-dyVal / len) * 2.5; // perpendicular offset
                const oy = (dxVal / len) * 2.5;

                return (
                  <g key={`link-${idx}`}>
                    <line
                      x1={sx + ox}
                      y1={sy + oy}
                      x2={tx + ox}
                      y2={ty + oy}
                      className="stroke-neutral-300 dark:stroke-neutral-700"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={sx - ox}
                      y1={sy - oy}
                      x2={tx - ox}
                      y2={ty - oy}
                      className="stroke-neutral-300 dark:stroke-neutral-700"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              }

              return (
                <line
                  key={`link-${idx}`}
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  className="stroke-neutral-300 dark:stroke-neutral-700"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Nodes / Atoms Rendering */}
            {nodes.map((node, idx) => {
              const nx = node.x + (idx % 2 === 0 ? vibrationOffset : -vibrationOffset);
              const ny = node.y + (idx % 3 === 0 ? vibrationOffset : -vibrationOffset);

              return (
                <g key={node.id}>
                  {/* Background halo */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={node.size + 4}
                    fill="currentColor"
                    className="text-black/5 dark:text-white/5"
                  />
                  
                  {/* Central Atom Circle */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={node.size}
                    fill="currentColor"
                    className="text-white dark:text-neutral-900 stroke-neutral-300 dark:stroke-neutral-700"
                    strokeWidth="1.5"
                  />

                  {/* Chemical Label */}
                  <text
                    x={nx}
                    y={ny + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-sans font-semibold text-[9px] select-none fill-neutral-800 dark:fill-neutral-200"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Mini Legend Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mt-4 text-[9px] font-sans uppercase tracking-wider text-black/40 dark:text-white/40 border-t border-black/5 dark:border-white/10 pt-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white inline-block border border-black/10 dark:border-white/10" /> Carbono (C)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-200 inline-block border border-black/10" /> Hidrógeno (H)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-100 dark:bg-red-950 inline-block border border-red-200 dark:border-red-900" /> Oxígeno (O)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-100 dark:bg-blue-950 inline-block border border-blue-200 dark:border-blue-900" /> Nitrógeno (N)
        </span>
      </div>
    </div>
  );
}
