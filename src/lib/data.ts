import { ChemicalElement, PropertyTag, GeneratedMaterial } from './types';

// 1. BASE DE DATOS CURADA (Con Valencias Matemáticas inyectadas)
export const ELEMENTS: ChemicalElement[] = [
  { symbol: 'H', name: 'Hidrógeno', number: 1, mass: 1.008, category: 'non-metal', color: '#b45309', valency: 1 },
  { symbol: 'C', name: 'Carbono', number: 6, mass: 12.011, category: 'non-metal', color: '#171717', valency: 4 },
  { symbol: 'N', name: 'Nitrógeno', number: 7, mass: 14.007, category: 'non-metal', color: '#1e3a8a', valency: 3 },
  { symbol: 'O', name: 'Oxígeno', number: 8, mass: 15.999, category: 'non-metal', color: '#7f1d1d', valency: 2 },
  { symbol: 'F', name: 'Flúor', number: 9, mass: 18.998, category: 'halogen', color: '#064e3b', valency: 1 },
  { symbol: 'Si', name: 'Silicio', number: 14, mass: 28.085, category: 'metalloid', color: '#059669', valency: 4 },
  { symbol: 'P', name: 'Fósforo', number: 15, mass: 30.974, category: 'non-metal', color: '#ca8a04', valency: 3 },
  { symbol: 'S', name: 'Azufre', number: 16, mass: 32.06, category: 'non-metal', color: '#a16207', valency: 2 },
  { symbol: 'Cl', name: 'Cloro', number: 17, mass: 35.45, category: 'halogen', color: '#78350f', valency: 1 }
];

// Highlight elements that are active / highly recommended for plastic creation
export const PLASTIC_ELEMENTS = ['C', 'H', 'O', 'N', 'F', 'Cl', 'S', 'Si', 'P'];

export const PROPERTY_TAGS: PropertyTag[] = [
  { id: 'cheap', name: 'Bajo Costo', description: 'Optimizado para producción masiva y materias primas asequibles.', icon: 'DollarSign' },
  { id: 'fireproof', name: 'Ignífugo', description: 'Alta resistencia térmica y autoextinguible bajo fuego directo.', icon: 'Flame' },
  { id: 'flexible', name: 'Flexible', description: 'Capacidad de doblarse y flexionarse repetidamente sin fatigarse.', icon: 'Layers' },
  { id: 'bio', name: 'Biodegradable', description: 'Compuesto orgánico diseñado para descomponerse naturalmente.', icon: 'Leaf' },
  { id: 'strong', name: 'Alta Resistencia', description: 'Resistencia mecánica superior a la tracción y al impacto.', icon: 'Shield' },
  { id: 'transparent', name: 'Transparente', description: 'Excelente claridad óptica y transmisión de luz.', icon: 'Eye' },
  { id: 'conductive', name: 'Termoconductor', description: 'Estructura dopada que disipa eficientemente el calor.', icon: 'Zap' },
  { id: 'elastic', name: 'Elástico', description: 'Gran memoria elastomérica con alta recuperación de forma.', icon: 'Shuffle' }
];

// 20 Polymer structural templates / families
const FAMILIES = [
  {
    prefix: 'Copolímero',
    middle: 'Metacrilato',
    descTemplate: 'Un compuesto acrílico modificado con grupos reactivos. Ofrece excelente estabilidad ultravioleta y claridad excepcional.',
    applications: ['Óptica de precisión', 'Sustitutos de cristal blindado', 'Guías de onda ópticas']
  },
  {
    prefix: 'Poli',
    middle: 'éster lineal',
    descTemplate: 'Cadena termoplástica polimerizada de alta simetría. Destaca por su resistencia química y viabilidad de reciclaje cíclico.',
    applications: ['Envases alimenticios premium', 'Fibras de alta tenacidad', 'Aislantes dieléctricos']
  },
  {
    prefix: 'Poli',
    middle: 'siloxano elastomérico',
    descTemplate: 'Macromolécula de base híbrida orgánica-inorgánica. Presenta una inercia química excepcional y una flexibilidad térmica sobresaliente.',
    applications: ['Membranas permeables selectivas', 'Sellos biomédicos esterilizables', 'Aislantes para ambientes extremos']
  },
  {
    prefix: 'Copolímero',
    middle: 'Uretano Reticulado',
    descTemplate: 'Estructura elastomérica segmentada con enlaces de hidrógeno altamente cooperativos. Brinda una excelente absorción de impacto.',
    applications: ['Amortiguadores de impacto industrial', 'Elastómeros de alta resiliencia', 'Piezas de desgaste abrasivo']
  },
  {
    prefix: 'Poli',
    middle: 'amida cristalina',
    descTemplate: 'Compuesto de gran cohesión molecular debido a sus puentes de hidrógeno simétricos. Posee un punto de fusión sumamente elevado.',
    applications: ['Engranajes auto-lubricados', 'Hilos técnicos de alta resistencia', 'Carcasas termo-resistentes']
  },
  {
    prefix: 'Poli',
    middle: 'eterimida termoestable',
    descTemplate: 'Polímero de ultra-alto rendimiento mecánico con anillos imídicos y aromáticos que impiden el movimiento de las cadenas.',
    applications: ['Componentes de motores aeroespaciales', 'Conectores eléctricos de alta frecuencia', 'Placas de circuito impreso rígidas']
  },
  {
    prefix: 'Copolímero',
    middle: 'Fluorocarbonado exótico',
    descTemplate: 'Formulación donde los átomos de flúor blindan las uniones de carbono, otorgando inmunidad química frente a ácidos concentrados.',
    applications: ['Recubrimientos anti-corrosión industrial', 'Empaquetaduras químicas estériles', 'Barreras repelentes de fluidos']
  },
  {
    prefix: 'Biopolímero',
    middle: 'Hidroxibutirato degradable',
    descTemplate: 'Poliéster sintetizado por vía bio-catalítica, de origen 100% renovable y rápida asimilación ambiental sin dejar microplásticos.',
    applications: ['Dispositivos médicos bioabsorbibles', 'Filmes agrícolas compostables', 'Empaques de ciclo cerrado']
  },
  {
    prefix: 'Poli',
    middle: 'fosfazeno híbrido',
    descTemplate: 'Estructura inorgánica de fósforo y nitrógeno alternados con sustituyentes laterales orgánicos. Excelente resistencia al fuego.',
    applications: ['Retardantes de llama activos', 'Materiales biomiméticos elásticos', 'Membranas de celdas de combustible']
  },
  {
    prefix: 'Copolímero',
    middle: 'Sulfona Autoreticulada',
    descTemplate: 'Termoplástico amorfo de alta temperatura con enlaces sulfona estables frente a la oxidación química y radiación ionizante.',
    applications: ['Instrumental de esterilización repetible', 'Tubos de transporte de vapor caliente', 'Membranas de ultrafiltración']
  },
  {
    prefix: 'Poli',
    middle: 'olefinas dopadas',
    descTemplate: 'Plástico básico formulado mediante catalizadores de metaloceno para controlar la ramificación a nivel atómico.',
    applications: ['Filmes estirables industriales', 'Contenedores flexibles de bajo costo', 'Tuberías hidráulicas flexibles']
  },
  {
    prefix: 'Ionómero',
    middle: 'Metal-Coordinado autorreparable',
    descTemplate: 'Matriz cargada con enlaces iónicos transitorios coordinados por cationes metálicos. Capaz de auto-sanar grietas por calor.',
    applications: ['Recubrimientos autoregenerativos', 'Capas protectoras para pantallas móviles', 'Sensores de tensión flexibles']
  },
  {
    prefix: 'Polímero',
    middle: 'Dendrítico hiperramificado',
    descTemplate: 'Arquitectura macromolecular altamente globular con abundantes terminales funcionales libres, ideal para el transporte químico.',
    applications: ['Encapsulación de reactivos activos', 'Modificadores de viscosidad ultra-precisos', 'Nanoportadores estables']
  },
  {
    prefix: 'Copolímero',
    middle: 'Aromático simétrico',
    descTemplate: 'Plástico que contiene grupos fenilo ordenados espacialmente, lo que reduce drásticamente el desgaste por fricción.',
    applications: ['Cojinetes de deslizamiento seco', 'Piezas de maquinaria rotativa', 'Aislantes acústicos de alto módulo']
  },
  {
    prefix: 'Polímero',
    middle: 'Conjugado conductor',
    descTemplate: 'Estructura de dobles enlaces alternados que permite la deslocalización electrónica para el transporte de carga eléctrica.',
    applications: ['Sensores orgánicos impresos', 'Películas blindadoras de radiación EMI', 'Electrodos plásticos flexibles']
  },
  {
    prefix: 'Poli',
    middle: 'carbonato de alta densidad',
    descTemplate: 'Termoplástico amorfo con uniones carbonilo sumamente resistentes. Combina rigidez mecánica con un alto coeficiente de transmisión de luz.',
    applications: ['Visores de protección balística', 'Faros de vehículos pesados', 'Lentes de seguridad industrial']
  },
  {
    prefix: 'Copolímero',
    middle: 'Borosiloxano viscoelástico',
    descTemplate: 'Silicona dopada con boro que reacciona de forma no-newtoniana al impacto, rigidizándose instantáneamente bajo estrés.',
    applications: ['Protecciones corporales inteligentes', 'Amortiguadores dinámicos de vibración', 'Sistemas de empaque anti-choque']
  },
  {
    prefix: 'Clatrato',
    middle: 'Poro-orgánico poroso',
    descTemplate: 'Red molecular con cavidades cerradas que atrapan de manera estable compuestos volátiles o gases ligeros.',
    applications: ['Almacenamiento de micro-gases', 'Separación selectiva de compuestos', 'Materiales ultraligeros termoacústicos']
  },
  {
    prefix: 'Poli',
    middle: 'acetato ramificado',
    descTemplate: 'Copolímero vinílico con grupos acetato colgantes que modifican la cristalinidad y otorgan una alta adherencia a sustratos.',
    applications: ['Adhesivos de fusión caliente', 'Películas selladoras solubles', 'Emulsiones aglutinantes ecológicas']
  },
  {
    prefix: 'Complejo',
    middle: 'Organometálico conductor',
    descTemplate: 'Polímero dopado con metales alcalinos o de transición que promueve la transferencia electrónica inter-cadena.',
    applications: ['Sustitutos plásticos de cables de cobre', 'Disipadores de estática avanzados', 'Cátodos plásticos flexibles']
  }
];

// 2. MOTOR MATEMÁTICO (Teorema de Handshaking y Restricción de Terminales)
// Devuelve la valencia real de un elemento según la base de datos de ELEMENTS.
// Si el símbolo no está catalogado, se asume valencia 1 (terminal) como caso más seguro.

function getValency(sym: string): number {
  const element = ELEMENTS.find(e => e.symbol === sym);
  return element ? element.valency : 1;
}

// 2. MOTOR MATEMÁTICO (Teorema de Handshaking y Restricción de Terminales)
function validarEstequiometria(subscripts: Record<string, number>): boolean {
  let sumValence = 0;
  let terminals = 0;
  let backboneSites = 0;

  for (const sym in subscripts) {
    const count = subscripts[sym];
    if (count === 0) continue;

    const valency = getValency(sym);

    sumValence += valency * count;

    if (valency === 1) {
      terminals += count; // Hidrógenos y Halógenos
    } else {
      backboneSites += (valency * count); // Carbono, Silicio, etc.
    }
  }

  // REGLA 1: Teorema de Handshaking (La suma de valencias debe ser par)
  if (sumValence % 2 !== 0) return false;

  // REGLA 2: Estabilidad Espacial. Los terminales (H, Cl) no pueden exceder
  // los sitios de enlace disponibles en la cadena principal (Backbone).
  const backboneAtoms = Object.keys(subscripts).filter(sym => {
    const el = ELEMENTS.find(e => e.symbol === sym);
    return el && el.valency > 1 && subscripts[sym] > 0;
  }).reduce((sum, sym) => sum + subscripts[sym], 0);

  if (backboneAtoms > 0) {
    // Sitios disponibles = Suma de valencias - (2 enlaces internos por cada átomo conectado)
    const availableSites = backboneSites - 2 * (backboneAtoms - 1);
    // Restamos 2 sitios para permitir que el polímero continúe la cadena infinitamente
    const polymerSites = availableSites - 2; 
    if (terminals > polymerSites) return false;
  }

  return true;
}


/**
 * el generador pa
 */
export function generateMaterialCombinations(selectedSymbols: string[], selectedTagIds: string[]): GeneratedMaterial[] {
  const symbols = selectedSymbols.length > 0 ? selectedSymbols : ['C', 'H'];
  const tags = selectedTagIds.length > 0 ? selectedTagIds : ['cheap'];

  // Array para almacenar solo los que superen la validación matemática
  const validCandidates: GeneratedMaterial[] = [];

  FAMILIES.forEach((fam, index) => {
    const id = `scm-candidate-${index + 1}`;
    
    // Mix selected elements with template
    // We will ensure that the chemical formula contains ALL selected elements
    // plus optionally C and H to maintain realistic carbon chemistry if not chosen
    const uniqueSymbols = Array.from(new Set(['C', 'H', ...symbols]));
    
    
    // Configuración base de átomos
    let subscripts: Record<string, number> = {
      C: (3 + (index % 5)),
      H: (4 + (index % 6)),
      O: (index % 4 === 0 ? 2 : (index % 3 === 0 ? 1 : 0)),
      N: (index % 5 === 2 ? 1 : 0),
      F: (index % 6 === 1 ? 2 : 0),
      Cl: (index % 7 === 3 ? 1 : 0),
      S: (index % 8 === 4 ? 1 : 0),
      Si: (index % 9 === 1 ? 1 : 0),
      P: (index % 10 === 5 ? 1 : 0)
    };

    // Aseguramos que los símbolos seleccionados por el usuario estén en la fórmula
    symbols.forEach(sym => {
      if (!subscripts[sym] || subscripts[sym] === 0) {
        subscripts[sym] = 1;
      }
    });
    // --- ALGORITMO DE BACKTRACKING (Ajuste de valencia) ---
    // Si la molécula es inestable, ajustamos los Hidrógenos (+1 o -1) hasta estabilizarla
    let attempts = 0;
    let isValid = false;
    
    while (!isValid && attempts < 10) {
      isValid = validarEstequiometria(subscripts);
      if (!isValid) {
        subscripts['H'] += 1; // Fuerza bruta controlada para estabilizar
        attempts++;
      }
    }

    // Sort symbols: Carbon first, Hydrogen second, then others alphabetically
    const sortedSymbols = uniqueSymbols.filter(s => subscripts[s] > 0).sort((a, b) => {
      if (a === 'C') return -1;
      if (b === 'C') return 1;
      if (a === 'H') return -1;
      if (b === 'H') return 1;
      return a.localeCompare(b);
    });
    // DSP: Si después de 10 iteraciones no hay estabilidad química, podamos esta rama y saltamos
    if (!isValid) return;
    
    // Build sub-scripts formatted as sub-script characters
    let formulaParts = '';
    sortedSymbols.forEach(sym => {
      const count = subscripts[sym] || 1;
      const sub = count > 1 ? String(count).split('').map(char => {
        const idx = '0123456789'.indexOf(char);
        return '₀₁₂₃₄₅₆₇₈₉'[idx];
      }).join('') : '';
      formulaParts += `${sym}${sub}`;
    });

    const formula = `(${formulaParts})ₙ`;

    // Dynamic systematic name
    const candidateName = `${fam.prefix}-${fam.middle} SCM-X${100 + index + 1}`;
    const scientificName = `${fam.prefix}(${sortedSymbols.join('-')})`;

    // Calculate match score based on how well this family matches selected tags
    // Let's design a smart score that ranges between 65% and 98%
    let matchPoints = 0;
    const isBioMatch = tags.includes('bio') && fam.middle.toLowerCase().includes('hidroxibutirato');
    const isFireMatch = tags.includes('fireproof') && (fam.middle.toLowerCase().includes('fosfazeno') || fam.middle.toLowerCase().includes('fluoro'));
    const isElasticMatch = tags.includes('elastic') && (fam.middle.toLowerCase().includes('siloxano') || fam.middle.toLowerCase().includes('uretano'));
    const isStrongMatch = tags.includes('strong') && (fam.middle.toLowerCase().includes('eterimida') || fam.middle.toLowerCase().includes('amida'));
    const isCheapMatch = tags.includes('cheap') && fam.middle.toLowerCase().includes('olefina');
    const isTransparentMatch = tags.includes('transparent') && (fam.middle.toLowerCase().includes('metacrilato') || fam.middle.toLowerCase().includes('carbonato'));
    const isConductiveMatch = tags.includes('conductive') && fam.middle.toLowerCase().includes('conductor');

    if (isBioMatch || isFireMatch || isElasticMatch || isStrongMatch || isCheapMatch || isTransparentMatch || isConductiveMatch) {
      matchPoints += 40;
    }

    // Add generic tag relevance
    tags.forEach(t => {
      if (t === 'cheap' && index % 3 === 0) matchPoints += 15;
      if (t === 'fireproof' && index % 4 === 1) matchPoints += 15;
      if (t === 'flexible' && index % 2 === 0) matchPoints += 15;
      if (t === 'strong' && index % 3 === 1) matchPoints += 15;
      if (t === 'bio' && index % 5 === 0) matchPoints += 15;
      if (t === 'transparent' && index % 4 === 3) matchPoints += 15;
      if (t === 'conductive' && index % 6 === 2) matchPoints += 15;
      if (t === 'elastic' && index % 5 === 3) matchPoints += 15;
    });

    const matchScore = Math.min(99, Math.max(68, 70 + (matchPoints % 29)));

    // Calculate simulated physical properties
    let costScore = 50 + (index * 7) % 40;
    let tensileStrength = 15 + (index * 13) % 95;
    let fireResistance = 10 + (index * 17) % 85;
    let biodegradability = 2 + (index * 19) % 93;
    let flexibility = 5 + (index * 11) % 90;
    let transparency = 10 + (index * 15) % 85;
    let thermalConductivity = 15 + (index * 9) % 75;

    // Apply modifiers from tags
    tags.forEach(t => {
      if (t === 'cheap') { costScore = Math.min(98, costScore + 20); }
      if (t === 'fireproof') { fireResistance = Math.min(98, fireResistance + 35); }
      if (t === 'flexible') { flexibility = Math.min(98, flexibility + 30); }
      if (t === 'bio') { biodegradability = Math.min(98, biodegradability + 40); }
      if (t === 'strong') { tensileStrength = Math.min(130, tensileStrength + 40); }
      if (t === 'transparent') { transparency = Math.min(98, transparency + 40); }
      if (t === 'conductive') { thermalConductivity = Math.min(95, thermalConductivity + 45); }
      if (t === 'elastic') { flexibility = Math.min(98, flexibility + 40); }
    });

    // Custom explanatory description detailing chemical bonds and physical feasibility
    let description = `${fam.descTemplate} Esta combinación molecular exótica incorpora una alta densidad de enlaces covalentes estabilizados por la presencia de ${sortedSymbols.map(s => ELEMENTS.find(e => e.symbol === s)?.name || s).join(', ')}. `;
    if (sortedSymbols.includes('Si')) {
      description += 'Los enlaces Silicio-Oxígeno aportan una gran estabilidad frente al calor continuo, mientras que los grupos orgánicos colgantes impiden la cristalización rígida. ';
    }
    if (sortedSymbols.includes('F')) {
      description += 'El radio atómico del Flúor genera un efecto de blindaje electrostático muy fuerte sobre el esqueleto principal, inhibiendo la degradación por disolventes orgánicos. ';
    }
    if (sortedSymbols.includes('Cl')) {
      description += 'La polaridad del átomo de Cloro induce atracciones dipolo-dipolo intensas entre cadenas adyacentes, lo cual eleva considerablemente la resistencia mecánica y la rigidez. ';
    }
    if (sortedSymbols.includes('Al') || sortedSymbols.includes('Mg') || sortedSymbols.includes('Li') || sortedSymbols.includes('Na') || sortedSymbols.includes('Be')) {
      description += 'Los cationes metálicos incorporados forman enlaces de coordinación reversibles con los átomos altamente electronegativos, posibilitando propiedades viscoelásticas auto-reparables bajo calor localizado. ';
    }
    if (sortedSymbols.includes('He') || sortedSymbols.includes('Ne') || sortedSymbols.includes('Ar')) {
      description += 'Nota investigativa: Los gases nobles seleccionados actuarían como agentes de atrapamiento molecular o clatratos de fase gaseosa estable en cavidades cristalinas de carbono rígido. ';
    }
    description += `Esta formulación teórica es ideal para que el investigador profesional analice su viabilidad sintética y simulación de dinámica molecular de fase secundaria.`;

   // Generate a 2D network of nodes/links matching the actual chemical elements in the candidate.
    // IMPORTANTE: el grafo respeta la valencia real de cada elemento (misma fuente que
    // validarEstequiometria) para no dibujar átomos con más enlaces de los que pueden sostener
    // — p.ej. un Hidrógeno (valencia 1) jamás puede aparecer "puenteando" dos átomos vecinos.
    
    const nodes: Array<{ id: string; label: string; x: number; y: number; color: string; size: number }> = [];
    const links: Array<{ source: string; target: string; type: 'single' | 'double' }> = [];

    const colorFor = (sym: string): string => {
      if (sym === 'H') return '#b45309';
      if (sym === 'O') return '#dc2626';
      if (sym === 'N') return '#2563eb';
      if (sym === 'F') return '#0284c7';
      if (sym === 'Cl') return '#0d9488';
      if (sym === 'Si') return '#059669';
      if (sym === 'S') return '#ca8a04';
      if (sym === 'B') return '#047857';
      return '#27272a'; // Carbono / color por defecto
    };

    // Solo elementos con valencia >= 2 pueden formar parte de la cadena principal:
    // necesitan al menos 2 sitios de enlace (uno al átomo anterior, otro al siguiente).
    const backboneCapable = sortedSymbols.filter(s => getValency(s) >= 2);
    const primary = backboneCapable.includes('C')
      ? 'C'
      : backboneCapable.includes('Si')
        ? 'Si'
        : (backboneCapable[0] || 'C'); // 'C' siempre está presente en uniqueSymbols
    const secondary = backboneCapable.find(s => s !== primary) || primary;

    // Elementos de valencia 1 (H, F, Cl...) u otros no usados en la cadena principal
    // solo pueden colgar como sustituyentes de UN único átomo, nunca puentear dos.
    const substituentPool = sortedSymbols.filter(s => s !== primary && s !== secondary);

    const sizeOfElements = sortedSymbols.length;
    const numBackbone = Math.max(4, sizeOfElements + 1);
    let substituentCursor = 0;

    for (let i = 0; i < numBackbone; i++) {
      const sym = i % 2 === 0 ? primary : secondary;
      const valency = getValency(sym);
      const isChainEnd = i === 0 || i === numBackbone - 1;
      const chainBondsUsed = isChainEnd ? 1 : 2; // los extremos solo enlazan hacia un lado
      let freeSlots = Math.max(0, valency - chainBondsUsed);

      const x = 60 + i * 80;
      const y = 110 + (i % 2 === 0 ? -12 : 12);
      const nodeId = `${sym}_b${i}`;

      nodes.push({
        id: nodeId,
        label: sym,
        x,
        y,
        color: colorFor(sym),
        size: sym === 'H' ? 12 : (sym === 'Si' ? 20 : 18)
      });

      // Enlace con el átomo anterior de la cadena
      if (i > 0) {
        const prevSym = (i - 1) % 2 === 0 ? primary : secondary;
        links.push({
          source: `${prevSym}_b${i - 1}`,
          target: nodeId,
          type: (i === 1 && sortedSymbols.includes('O')) ? 'double' : 'single'
        });
      }

      // Sustituyentes (máx. 2 posiciones dibujadas: arriba/abajo), solo si el átomo
      // todavía tiene sitios de enlace libres según su valencia real.
      const slots: Array<{ id: string; dy: number }> = [
        { id: `top_${i}`, dy: -50 },
        { id: `bottom_${i}`, dy: 50 }
      ];

      for (const slot of slots) {
        if (freeSlots <= 0) break;
        const subSym = substituentPool.length > 0
          ? substituentPool[substituentCursor % substituentPool.length]
          : 'H';
        substituentCursor++;

        nodes.push({
          id: slot.id,
          label: subSym,
          x,
          y: y + slot.dy,
          color: colorFor(subSym),
          size: subSym === 'H' ? 11 : 15
        });
        links.push({ source: nodeId, target: slot.id, type: 'single' });
        freeSlots--;
      }
    }

    validCandidates.push({
      id,
      name: candidateName,
      scientificName,
      formula,
      description,
      matchScore,
      properties: {
        costScore: Math.round(costScore),
        tensileStrength: Math.round(tensileStrength),
        fireResistance: Math.round(fireResistance),
        biodegradability: Math.round(biodegradability),
        flexibility: Math.round(flexibility),
        transparency: Math.round(transparency),
        thermalConductivity: Math.round(thermalConductivity)
      },
      molecularStructure: { nodes, links },
      applications: fam.applications
    });
  });
  return validCandidates;
}

// Retain a compatibility function to avoid compilation breaks with existing code before we update it
export function generateDynamicPolymer(selectedSymbols: string[], selectedTagIds: string[]): GeneratedMaterial {
  const list = generateMaterialCombinations(selectedSymbols, selectedTagIds);
  return list[0];}