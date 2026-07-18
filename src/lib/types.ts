export interface ChemicalElement {
  symbol: string;
  name: string;
  number: number;
  mass: number;
  category: 'non-metal' | 'noble-gas' | 'alkali' | 'alkaline-earth' | 'metalloid' | 'halogen' | 'transition-metal' | 'post-transition-metal';
  color: string;
}

export interface PropertyTag {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type MaterialType = 'Plásticos' | 'Metales' | 'Gases' | 'Líquidos';

export interface GeneratedMaterial {
  id: string;
  name: string;
  scientificName: string;
  formula: string;
  description: string;
  properties: {
    costScore: number; // 1-100 (higher means cheaper for UI bar, but we can display as "$" to "$$$")
    tensileStrength: number; // MPa
    fireResistance: number; // 1-100 %
    biodegradability: number; // 1-100 %
    flexibility: number; // 1-100 %
    transparency: number; // 1-100 %
    thermalConductivity: number; // 1-100 %
  };
  molecularStructure: {
    nodes: Array<{ id: string; label: string; x: number; y: number; color: string; size: number }>;
    links: Array<{ source: string; target: string; type: 'single' | 'double' }>;
  };
  applications: string[];
  matchScore?: number;
}
