import React from 'react';
import { PROPERTY_TAGS } from '../lib/data';
import { 
  DollarSign, 
  Flame, 
  Layers, 
  Leaf, 
  Shield, 
  Eye, 
  Zap, 
  Shuffle,
  Tags
} from 'lucide-react';

interface TagSelectorProps {
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
}

export default function TagSelector({ selectedTags, onToggleTag }: TagSelectorProps) {
  
  // Dynamic icon helper map
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'DollarSign': return <DollarSign className={className} strokeWidth={1.5} />;
      case 'Flame': return <Flame className={className} strokeWidth={1.5} />;
      case 'Layers': return <Layers className={className} strokeWidth={1.5} />;
      case 'Leaf': return <Leaf className={className} strokeWidth={1.5} />;
      case 'Shield': return <Shield className={className} strokeWidth={1.5} />;
      case 'Eye': return <Eye className={className} strokeWidth={1.5} />;
      case 'Zap': return <Zap className={className} strokeWidth={1.5} />;
      case 'Shuffle': return <Shuffle className={className} strokeWidth={1.5} />;
      default: return <Tags className={className} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col items-center text-center mb-8">
        <h4 className="font-sans font-light text-black dark:text-white text-lg tracking-[0.1em] uppercase mb-2">
          Etiquetas de Propiedad Requeridas
        </h4>
        <p className="text-xs text-black/40 dark:text-white/40 max-w-xl font-sans leading-relaxed">
          Seleccione las características técnicas deseadas. El motor molecular adaptará las proporciones elementales y enlaces de polimerización para cumplir estos requerimientos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROPERTY_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
            <button
              key={tag.id}
              id={`tag-btn-${tag.id}`}
              onClick={() => onToggleTag(tag.id)}
              className={`flex flex-col p-5 rounded-lg border text-left transition-all duration-300 select-none cursor-pointer group relative ${
                isSelected
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm scale-[1.02]'
                  : 'bg-transparent border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white/10 text-white dark:bg-black/10 dark:text-black' 
                    : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60'
                }`}>
                  {renderIcon(tag.icon, 'w-4 h-4')}
                </div>
                <span className={`text-xs uppercase tracking-wider font-semibold font-sans ${
                  isSelected ? 'text-white dark:text-black' : 'text-black/80 dark:text-white/80'
                }`}>
                  {tag.name}
                </span>
              </div>

              <span className={`text-[11px] leading-relaxed font-sans ${
                isSelected ? 'text-white/80 dark:text-black/80' : 'text-black/40 dark:text-white/40'
              }`}>
                {tag.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

