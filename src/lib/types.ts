export interface ChemicalElement {
  symbol: string;
  name: string;
  number: number;
  mass: number;
  category: 'non-metal' | 'noble-gas' | 'alkali' | 'alkaline-earth' | 'metalloid' | 'halogen' | 'transition-metal' | 'post-transition-metal';
  color: string;
  valency: number; // <-- NUEVO: Atributo crítico para el modelo matemático
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
    costScore: number;
    tensileStrength: number;
    fireResistance: number;
    biodegradability: number;
    flexibility: number;
    transparency: number;
    thermalConductivity: number;
  };
  molecularStructure: {
    nodes: Array<{ id: string; label: string; x: number; y: number; color: string; size: number }>;
    links: Array<{ source: string; target: string; type: 'single' | 'double' }>;
  };
  applications: string[];
  matchScore?: number;
}