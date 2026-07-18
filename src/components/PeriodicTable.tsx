import React from 'react';
import { ELEMENTS, PLASTIC_ELEMENTS } from '../data';

interface PeriodicTableProps {
  selectedElements: string[];
  onToggleElement: (symbol: string) => void;
}

export default function PeriodicTable({ selectedElements, onToggleElement }: PeriodicTableProps) {
  // Map elements to their standard Periodic Table columns (1-18) and rows (1-3)
  const getGridPosition = (symbol: string) => {
    switch (symbol) {
      // Row 1
      case 'H': return { row: 1, col: 1 };
      case 'He': return { row: 1, col: 18 };
      // Row 2
      case 'Li': return { row: 2, col: 1 };
      case 'Be': return { row: 2, col: 2 };
      case 'B': return { row: 2, col: 13 };
      case 'C': return { row: 2, col: 14 };
      case 'N': return { row: 2, col: 15 };
      case 'O': return { row: 2, col: 16 };
      case 'F': return { row: 2, col: 17 };
      case 'Ne': return { row: 2, col: 18 };
      // Row 3
      case 'Na': return { row: 3, col: 1 };
      case 'Mg': return { row: 3, col: 2 };
      case 'Al': return { row: 3, col: 13 };
      case 'Si': return { row: 3, col: 14 };
      case 'P': return { row: 3, col: 15 };
      case 'S': return { row: 3, col: 16 };
      case 'Cl': return { row: 3, col: 17 };
      case 'Ar': return { row: 3, col: 18 };
      default: return { row: 1, col: 1 };
    }
  };

  const isHighlyRecommended = (symbol: string) => {
    return PLASTIC_ELEMENTS.includes(symbol);
  };

  return (
    <div className="bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h4 className="font-sans font-light text-black dark:text-white text-lg tracking-[0.1em] uppercase mb-2">
            Tabla Periódica Interactiva (Boceto Orgánico)
          </h4>
          <p className="text-xs text-black/40 dark:text-white/40 font-sans max-w-xl leading-relaxed">
            Seleccione los elementos base para la formulación macromolecular. Los elementos clave para plásticos están destacados con bordes definidos.
          </p>
        </div>

        {/* Selected Counter */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto font-sans text-xs">
          <span className="text-black/40 dark:text-white/40 uppercase tracking-wider">Elementos elegidos:</span>
          <span className="px-3 py-1 font-mono font-semibold bg-black text-white dark:bg-white dark:text-black rounded">
            {selectedElements.length}
          </span>
        </div>
      </div>

      {/* Grid container with custom styling to mimic periodic layout */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
        <div className="min-w-[640px] grid grid-cols-18 gap-2">
          {/* Elements placement mapping */}
          {Array.from({ length: 3 }).map((_, rIdx) => {
            const rowNum = rIdx + 1;
            return Array.from({ length: 18 }).map((_, cIdx) => {
              const colNum = cIdx + 1;
              const element = ELEMENTS.find(e => {
                const pos = getGridPosition(e.symbol);
                return pos.row === rowNum && pos.col === colNum;
              });

              if (!element) {
                // Empty spacer cell in standard Periodic Table
                return <div key={`spacer-${rowNum}-${colNum}`} className="aspect-square" />;
              }

              const isSelected = selectedElements.includes(element.symbol);
              const isRecommended = isHighlyRecommended(element.symbol);

              return (
                <button
                  key={element.symbol}
                  id={`element-btn-${element.symbol.toLowerCase()}`}
                  onClick={() => onToggleElement(element.symbol)}
                  className={`relative aspect-square flex flex-col justify-between p-2 rounded transition-all duration-300 group select-none cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white scale-[1.05] shadow-sm font-sans'
                      : isRecommended
                        ? 'bg-transparent border-black/30 dark:border-white/35 hover:border-black dark:hover:border-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02] font-sans'
                        : 'bg-transparent border-black/5 dark:border-white/5 opacity-40 hover:opacity-100 hover:border-black/20 dark:hover:border-white/20 font-sans'
                  }`}
                  style={{ borderWidth: '1px' }}
                >
                  {/* Top line (Atomic Number) */}
                  <div className="flex justify-between items-center w-full">
                    <span className={`text-[8px] font-mono leading-none ${isSelected ? 'text-white/60 dark:text-black/60' : 'text-black/40 dark:text-white/40'}`}>
                      {element.number}
                    </span>
                  </div>

                  {/* Central Chemical Symbol */}
                  <div className="flex flex-col items-center justify-center w-full my-auto">
                    <span className={`font-sans font-normal leading-none tracking-tight ${
                      isSelected 
                        ? 'text-white dark:text-black text-base' 
                        : 'text-black dark:text-white text-sm'
                    }`}>
                      {element.symbol}
                    </span>
                  </div>

                  {/* Bottom Element Name */}
                  <span className={`text-[8px] truncate block w-full text-center leading-none tracking-wide font-sans ${
                    isSelected ? 'text-white/60 dark:text-black/60' : 'text-black/40 dark:text-white/40'
                  }`}>
                    {element.name}
                  </span>
                </button>
              );
            });
          })}
        </div>
      </div>

      {/* Legend / Info footer */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 mt-6 pt-6 border-t border-black/5 dark:border-white/10 text-[10px] uppercase tracking-wider text-black/40 dark:text-white/40 font-sans">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-black dark:bg-white inline-block border border-black dark:border-white" />
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded border border-black/30 dark:border-white/30 inline-block" />
            <span>Base para Plásticos (Orgánicos)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded border border-black/5 dark:border-white/5 inline-block opacity-60" />
            <span>Secundarios</span>
          </div>
        </div>
        <div className="font-medium tracking-normal text-[11px] lowercase italic normal-case text-black/30 dark:text-white/30">
          Cualquier combinación generará una fórmula lógica.
        </div>
      </div>
    </div>
  );
}
