'use client';

import React, { useEffect, useState } from 'react';
import ScmLogo from '../components/ScmLogo';
import MaterialSelector from '../components/MaterialSelector';
import PeriodicTable from '../components/PeriodicTable';
import TagSelector from '../components/TagSelector';
import MoleculeVisualizer from '../components/MoleculeVisualizer';
import { MaterialType, GeneratedMaterial } from '../lib/types';
import { generateMaterialCombinations, PLASTIC_ELEMENTS, ELEMENTS } from '../lib/data';
import { 
  Sparkles, 
  FlaskConical, 
  CheckCircle, 
  RefreshCw,
  Clock,
  ShieldAlert,
  Search,
  Save,
  FileText,
  Copy,
  FileJson,
  TrendingUp,
  Award
} from 'lucide-react';

export default function App() {
  // Application states
  const [materialType, setMaterialType] = useState<MaterialType>('Polímeros');
  const [selectedElements, setSelectedElements] = useState<string[]>(['C', 'H']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['cheap', 'flexible']);
  const [combinations, setCombinations] = useState<GeneratedMaterial[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<GeneratedMaterial | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Professional Notes stored in key-value map (candidate.id -> notes string)
  const [notebook, setNotebook] = useState<Record<string, string>>({});
  const [activeNotes, setActiveNotes] = useState<string>('');

  // Saved candidates for quick review (favorites)
  const [savedCandidates, setSavedCandidates] = useState<Record<string, boolean>>({});

  // Generate combinations initially and update when elements/tags selection changes
  useEffect(() => {
    const list = generateMaterialCombinations(selectedElements, selectedTags);
    setCombinations(list);
    // Auto-select first candidate in the list
    if (list.length > 0) {
      setSelectedCandidate(list[0]);
      setActiveNotes(notebook[list[0].id] || '');
    }
  }, []);

  // Update active notes when selected candidate changes
  useEffect(() => {
    if (selectedCandidate) {
      setActiveNotes(notebook[selectedCandidate.id] || '');
    }
  }, [selectedCandidate]);

  // Handle toggling periodic table elements
  const handleToggleElement = (symbol: string) => {
    if (selectedElements.includes(symbol)) {
      // Don't allow empty selection for stable compounds
      if (selectedElements.length > 1) {
        setSelectedElements(selectedElements.filter(s => s !== symbol));
      }
    } else {
      setSelectedElements([...selectedElements, symbol]);
    }
  };

  // Handle toggling property tags
  const handleToggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Save current note to state
  const handleSaveNote = () => {
    if (!selectedCandidate) return;
    const updated = { ...notebook, [selectedCandidate.id]: activeNotes };
    setNotebook(updated);
    
    // Simple visual feedback
    const btn = document.getElementById('save-note-btn');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '¡Notas Guardadas!';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 1500);
    }
  };

  // Toggle saving candidates for later research
  const handleToggleSaveCandidate = (id: string) => {
    setSavedCandidates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Main synthesis triggers to find new possible combinations
  const handleExploreCombinations = () => {
    setIsGenerating(true);
    
    const steps = [
      'Analizando reactividad electrónica...',
      'Mapeando cadenas covalentes posibles...',
      'Calculando grado de reticulación...',
      'Filtrando por afinidad de etiquetas...',
      'Estabilizando 20 formulaciones viables...'
    ];

    let currentStepIdx = 0;
    setGenerationStep(steps[0]);

    const interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        setGenerationStep(steps[currentStepIdx]);
      }
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      const list = generateMaterialCombinations(selectedElements, selectedTags);
      setCombinations(list);
      setIsGenerating(false);
      if (list.length > 0) {
        setSelectedCandidate(list[0]);
      }
    }, 1500);
  };

  // Copy candidate formula and metadata to clipboard
  const handleCopyDetails = () => {
    if (!selectedCandidate) return;
    const text = `Material: ${selectedCandidate.name}\nFórmula: ${selectedCandidate.formula}\nNombre Científico: ${selectedCandidate.scientificName}\nDescripción: ${selectedCandidate.description}\nAplicaciones: ${selectedCandidate.applications.join(', ')}`;
    navigator.clipboard.writeText(text);
    
    const btn = document.getElementById('copy-details-btn');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '¡Copiado!';
      setTimeout(() => {
        btn.innerHTML = original;
      }, 1500);
    }
  };

  // Export current list of 20 combinations as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(combinations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scm_propuestas_materiales_${selectedElements.join('_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const hasInorganicWarning = selectedElements.some(s => !PLASTIC_ELEMENTS.includes(s));

  // Filter combinations based on search query
  const filteredCombinations = combinations.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.formula.toLowerCase().includes(query) ||
      item.scientificName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-black text-black dark:text-white font-sans selection:bg-neutral-800 selection:text-white pb-24 transition-colors duration-300">
      
      {/* Delicate premium top line */}
      <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* Elegant Editorial Header */}
      <header className="container mx-auto px-6 pt-16 pb-8 flex flex-col items-center justify-center max-w-4xl">
        <ScmLogo size="lg" className="mb-4" />
        <p className="max-w-2xl text-center text-xs tracking-widest text-black/50 dark:text-white/50 uppercase leading-relaxed font-sans font-light mt-4">
          Buscador Predictivo de Nuevas Fórmulas & Ingeniería Molecular Avanzada
        </p>
        <p className="max-w-xl text-center text-[11px] text-black/40 dark:text-white/40 leading-relaxed font-sans mt-2">
          Seleccione elementos de la tabla periódica y filtre con las etiquetas de propiedades técnicas para calcular <strong className="font-semibold text-black dark:text-white">20 propuestas de materiales orgánicos e híbridos inéditos</strong> listos para investigación profesional.
        </p>
      </header>

      {/* Main UI layout */}
      <main className="container mx-auto px-6 max-w-7xl mt-4">
        
        {/* Category selector / context tracker */}
        <section className="mb-10" id="material-category-section">
          <MaterialSelector selected={materialType} onChange={setMaterialType} />
        </section>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Parameters, Triggers, and Directory list of 20 combinations (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Periodic Table */}
            <div id="periodic-table-section">
              <PeriodicTable 
                selectedElements={selectedElements} 
                onToggleElement={handleToggleElement} 
              />
            </div>

            {/* Property tags */}
            <div id="tag-selector-section">
              <TagSelector 
                selectedTags={selectedTags} 
                onToggleTag={handleToggleTag} 
              />
            </div>

            {/* Exploration Activation */}
            <div className="flex flex-col gap-4">
              {hasInorganicWarning && (
                <div className="flex items-start gap-3 p-5 bg-yellow-500/5 dark:bg-yellow-500/10 border border-yellow-500/10 rounded-xl text-xs text-black/70 dark:text-white/70 font-sans">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-yellow-600 dark:text-yellow-500 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-[10px] block mb-1">Composición Atípica Detectada</span>
                    Has seleccionado elementos que no suelen conformar plásticos convencionales (metales o gases nobles). El simulador formulará híbridos organometálicos o redes de inclusión exóticas muy prometedoras.
                  </div>
                </div>
              )}

              <button
                id="synthesize-button"
                onClick={handleExploreCombinations}
                disabled={isGenerating}
                className="w-full relative py-4 px-8 rounded-lg bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black font-sans uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer border border-transparent"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                    <span className="animate-pulse tracking-widest">{generationStep}</span>
                  </>
                ) : (
                  <>
                    <FlaskConical className="w-4 h-4" strokeWidth={1.5} />
                    <span>EXPLORAR NUEVAS COMBINACIONES (20 PROPUESTAS)</span>
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </div>

            {/* Directory Card with 20 possible combinations list */}
            <div className="bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <TrendingUp className="w-24 h-24 text-black dark:text-white" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4 mb-4">
                <div>
                  <h4 className="font-sans font-light text-black dark:text-white text-xs tracking-[0.15em] uppercase flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-black/60 dark:text-white/60" strokeWidth={1.5} />
                    Propuestas de Combinación Encontradas
                  </h4>
                  <p className="text-[10px] text-black/40 dark:text-white/40 font-mono uppercase mt-1">
                    Criterio: {selectedElements.join(' + ')} • {selectedTags.length} filtros
                  </p>
                </div>
                
                {/* Export Button */}
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/5 dark:border-white/5 rounded bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <FileJson className="w-3 h-3" />
                  <span>Exportar Reporte (JSON)</span>
                </button>
              </div>

              {/* Search Bar inside list */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-black/30 dark:text-white/30" />
                <input
                  type="text"
                  placeholder="Filtrar por compuesto, fórmula o comportamiento técnico..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-lg focus:outline-none focus:border-black/25 dark:focus:border-white/25 placeholder-black/30 dark:placeholder-white/30 font-sans"
                />
              </div>

              {/* Scrollable list container */}
              <div className="max-h-[500px] overflow-y-auto divide-y divide-black/5 dark:divide-white/5 pr-1 space-y-1 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
                {filteredCombinations.length === 0 ? (
                  <div className="text-center py-10 text-xs text-black/40 dark:text-white/40 font-sans">
                    No se hallaron combinaciones que coincidan con el término "{searchQuery}".
                  </div>
                ) : (
                  filteredCombinations.map((item, idx) => {
                    const isSelected = selectedCandidate?.id === item.id;
                    const isSaved = savedCandidates[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedCandidate(item)}
                        className={`p-3.5 rounded-lg flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer group ${
                          isSelected
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/40 text-black/80 dark:text-white/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Row Indicator */}
                          <span className={`font-mono text-[9px] w-5 text-right font-light shrink-0 ${isSelected ? 'text-white/60 dark:text-black/60' : 'text-black/30 dark:text-white/30'}`}>
                            {idx + 1}.
                          </span>
                          
                          {/* Main Title & IUPAC */}
                          <div className="min-w-0">
                            <span className="font-sans text-xs font-semibold block truncate">
                              {item.name}
                            </span>
                            <span className={`font-mono text-[9px] block truncate mt-0.5 ${isSelected ? 'text-white/70 dark:text-black/70' : 'text-black/40 dark:text-white/40'}`}>
                              IUPAC: {item.scientificName}
                            </span>
                          </div>
                        </div>

                        {/* Formula & Match Score Badge */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                            isSelected 
                              ? 'bg-white/10 border-white/20 text-white dark:bg-black/10 dark:border-black/20 dark:text-black' 
                              : 'bg-neutral-50 dark:bg-neutral-900 border-black/5 dark:border-white/5 text-black/90 dark:text-white/90'
                          }`}>
                            {item.formula}
                          </span>
                          
                          {/* Match percentage block */}
                          <div className="text-right shrink-0">
                            <span className={`font-mono text-[10px] font-bold block ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                              {item.matchScore}%
                            </span>
                            <span className={`text-[8px] uppercase tracking-wider block ${isSelected ? 'text-white/60' : 'text-black/30 dark:text-white/30'}`}>
                              Match
                            </span>
                          </div>

                          {/* Quick Save Star */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSaveCandidate(item.id);
                            }}
                            className={`p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                              isSaved ? 'text-yellow-500' : isSelected ? 'text-white/30 hover:text-white' : 'text-black/20 dark:text-white/20'
                            }`}
                            title={isSaved ? "Compuesto guardado en mis notas" : "Guardar para investigar posteriormente"}
                          >
                            ★
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Right Side: Active Candidate Detailed Analysis (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* SVG Molecular Bonds Visualizer for active candidate */}
            <div id="visualizer-card-section">
              <MoleculeVisualizer 
                nodes={selectedCandidate?.molecularStructure?.nodes || []}
                links={selectedCandidate?.molecularStructure?.links || []}
                materialName={selectedCandidate?.name || ''}
              />
            </div>

            {/* Specifications Card */}
            {selectedCandidate && (
              <div 
                id="result-specifications"
                className={`bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300 ${
                  isGenerating ? 'opacity-30 scale-[0.99]' : 'opacity-100 scale-100'
                }`}
              >
                {/* Header */}
                <div className="border-b border-black/5 dark:border-white/10 pb-5 mb-5 relative">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-semibold">
                      Compuesto Propuesto Seleccionado
                    </span>
                    <span className="px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 border border-emerald-200/20 rounded">
                      Id: {selectedCandidate.id.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 mt-2">
                    <h2 className="font-sans font-light text-2xl text-black dark:text-white tracking-wide">
                      {selectedCandidate.name}
                    </h2>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <span className="font-mono text-lg font-bold text-black dark:text-white bg-neutral-50 dark:bg-neutral-900 px-3 py-1 rounded border border-black/5 dark:border-white/5 select-all">
                        {selectedCandidate.formula}
                      </span>
                      <span className="font-mono text-xs text-black/40 dark:text-white/40 italic">
                        IUPAC: {selectedCandidate.scientificName}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex gap-2 mt-4">
                    <button
                      id="copy-details-btn"
                      onClick={handleCopyDetails}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/5 dark:border-white/5 rounded bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copiar Datos</span>
                    </button>
                    <button
                      onClick={() => handleToggleSaveCandidate(selectedCandidate.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider border rounded transition-colors cursor-pointer ${
                        savedCandidates[selectedCandidate.id]
                          ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                          : 'bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border-black/5 dark:border-white/5 text-black/60 dark:text-white/60'
                      }`}
                    >
                      <span>★ {savedCandidates[selectedCandidate.id] ? 'Guardado' : 'Guardar Compuesto'}</span>
                    </button>
                  </div>
                </div>

                {/* Macromolecular analysis */}
                <div className="mb-6">
                  <h5 className="text-[10px] font-sans uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-semibold mb-2">
                    Análisis & Viabilidad Atómica
                  </h5>
                  <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed font-sans">
                    {selectedCandidate.description}
                  </p>
                </div>

                {/* Industrial Applications */}
                <div className="mb-8">
                  <h5 className="text-[10px] font-sans uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-semibold mb-3">
                    Líneas de Investigación Recomendadas
                  </h5>
                  <div className="space-y-2">
                    {selectedCandidate.applications.map((app, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-black/70 dark:text-white/70">
                        <CheckCircle className="w-3.5 h-3.5 text-black/50 dark:text-white/50 shrink-0" strokeWidth={1.5} />
                        <span className="font-sans">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional's Investigative Notebook */}
                <div className="mb-8 border-t border-black/5 dark:border-white/10 pt-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h5 className="text-[10px] font-sans uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-semibold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Cuaderno del Profesional / Hipótesis
                    </h5>
                    <button
                      id="save-note-btn"
                      onClick={handleSaveNote}
                      className="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded cursor-pointer transition-colors"
                    >
                      Guardar Notas
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Escriba aquí notas de investigación, hipótesis sintéticas o resultados de simulación para esta fórmula..."
                    value={activeNotes}
                    onChange={(e) => {
                      setActiveNotes(e.target.value);
                      // Auto-save silently to state
                      setNotebook(prev => ({ ...prev, [selectedCandidate.id]: e.target.value }));
                    }}
                    className="w-full p-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-lg focus:outline-none focus:border-black/25 dark:focus:border-white/25 placeholder-black/30 dark:placeholder-white/30 font-mono resize-none leading-relaxed"
                  />
                </div>

                {/* Property sliders */}
                <div className="border-t border-black/5 dark:border-white/10 pt-6 space-y-5">
                  <h5 className="text-[10px] font-sans uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-semibold">
                    Propiedades Estimadas del Modelo
                  </h5>

                  {/* Prop 1: Cost */}
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-black/50 dark:text-white/50">Viabilidad de Costo</span>
                      <span className="font-mono text-[11px] text-black/70 dark:text-white/70">
                        {selectedCandidate.properties.costScore >= 75 ? 'Óptima (Bajo Coste)' : selectedCandidate.properties.costScore >= 45 ? 'Media' : 'Elevada (Premium)'}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black dark:bg-white transition-all duration-1000" 
                        style={{ width: `${selectedCandidate.properties.costScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Prop 2: Tensile Strength */}
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-black/50 dark:text-white/50">Resistencia a la Tracción Estimada</span>
                      <span className="font-mono text-[11px] text-black/70 dark:text-white/70">
                        {selectedCandidate.properties.tensileStrength} MPa
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black dark:bg-white transition-all duration-1000" 
                        style={{ width: `${Math.min(100, (selectedCandidate.properties.tensileStrength / 130) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Prop 3: Fire Resistance */}
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-black/50 dark:text-white/50">Resistencia al Fuego</span>
                      <span className="font-mono text-[11px] text-black/70 dark:text-white/70">
                        {selectedCandidate.properties.fireResistance}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black dark:bg-white transition-all duration-1000" 
                        style={{ width: `${selectedCandidate.properties.fireResistance}%` }}
                      />
                    </div>
                  </div>

                  {/* Prop 4: Biodegradability */}
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-black/50 dark:text-white/50">Biodegradabilidad Estimada</span>
                      <span className="font-mono text-[11px] text-black/70 dark:text-white/70">
                        {selectedCandidate.properties.biodegradability}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black dark:bg-white transition-all duration-1000" 
                        style={{ width: `${selectedCandidate.properties.biodegradability}%` }}
                      />
                    </div>
                  </div>

                  {/* Prop 5: Flexibility */}
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-black/50 dark:text-white/50">Flexibilidad / Elasticidad</span>
                      <span className="font-mono text-[11px] text-black/70 dark:text-white/70">
                        {selectedCandidate.properties.flexibility}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black dark:bg-white transition-all duration-1000" 
                        style={{ width: `${selectedCandidate.properties.flexibility}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Explain/Help section */}
        <section className="mt-20 bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2">
              <h4 className="font-sans font-light text-black dark:text-white text-sm uppercase tracking-[0.15em]">
                Mecánica de Simulación Macromolecular
              </h4>
              <p className="text-xs text-black/40 dark:text-white/40 font-sans max-w-3xl leading-relaxed">
                El motor cuántico predictivo formula de manera lógica combinaciones basadas en los orbitales de los elementos seleccionados. Al alternar propiedades técnicas, el sistema calcula de manera predictiva la geometría espacial del polímero resultante para entregar estructuras inéditas listas para su síntesis empírica.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-black/50 dark:text-white/50 bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 px-4 py-2 rounded shrink-0">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Base de Datos: 20 Propuestas Teóricas Activas</span>
            </div>
          </div>
        </section>

      </main>

      {/* Clean Minimalist Editorial Footer */}
      <footer className="container mx-auto px-6 mt-24 text-center text-[10px] font-sans uppercase tracking-[0.2em] text-black/30 dark:text-white/30 space-y-2 max-w-4xl">
        <p>© 2026 SCM - Software de Creación de Materiales. Todos los derechos reservados.</p>
        <p className="opacity-60 lowercase font-light italic normal-case tracking-normal">Modelado atómico predictivo con fines científicos y simulación experimental de polímeros.</p>
      </footer>
    </div>
  );
}
