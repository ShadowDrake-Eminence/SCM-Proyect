import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { MaterialType } from '../lib/types';

interface MaterialSelectorProps {
  selected: MaterialType;
  onChange: (type: MaterialType) => void;
}

export default function MaterialSelector({ selected, onChange }: MaterialSelectorProps) {
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const materials: Array<{ id: MaterialType; name: string; available: boolean }> = [
    { id: 'Metales', name: 'Metales', available: false },
    { id: 'Plásticos', name: 'Plásticos', available: true },
    { id: 'Gases', name: 'Gases', available: false },
    { id: 'Líquidos', name: 'Líquidos', available: false }
  ];

  const handleSelect = (id: MaterialType, available: boolean) => {
    if (available) {
      onChange(id);
    } else {
      setShowNotification(id);
      setTimeout(() => setShowNotification(null), 4000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered navigation bar */}
      <nav className="w-full flex justify-center pt-2 pb-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 border-b border-black/5 dark:border-white/10 pb-4 max-w-2xl w-full">
          {materials.map((item) => {
            const isActive = selected === item.id;
            return (
              <div key={item.id} className="relative group py-1">
                <button
                  id={`material-tab-${item.id.toLowerCase()}`}
                  onClick={() => handleSelect(item.id, item.available)}
                  className={`text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 font-sans cursor-pointer select-none ${
                    isActive
                      ? 'font-semibold text-black dark:text-white'
                      : item.available
                        ? 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
                        : 'text-black/25 dark:text-white/20 cursor-not-allowed'
                  }`}
                >
                  {item.name}
                </button>
                
                {/* Active Underline */}
                {isActive && (
                  <div className="absolute -bottom-[17px] left-0 w-full h-[1.5px] bg-black dark:bg-white transition-all duration-300"></div>
                )}

                {/* Badge Tooltip for Próximamente */}
                {!item.available && (
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] uppercase tracking-widest text-black/40 dark:text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-black/5 dark:border-white/5 pointer-events-none z-20">
                    Próximamente
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Floating Alert if clicking locked item */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 backdrop-blur-md max-w-sm animate-bounce">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="flex flex-col text-xs font-sans">
            <span className="font-semibold text-amber-600 dark:text-amber-400">Módulo en Desarrollo</span>
            <span className="text-slate-500 dark:text-slate-400 mt-0.5">
              La sección de <strong>{showNotification}</strong> está marcada como <em>Próximamente</em>. En este prototipo interactivo puedes explorar el generador completo de <strong>Plásticos (Polímeros)</strong>.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

