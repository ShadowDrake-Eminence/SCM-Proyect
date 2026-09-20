import { generateMaterialCombinations } from './lib/data';
import { GeneratedMaterial } from './lib/types';

interface GenerateMaterialRequest {
  selectedElements: string[];
  selectedTags: string[];
  excludeFormulas: string[];
}

self.onmessage = (event: MessageEvent<GenerateMaterialRequest>) => {
  const { selectedElements, selectedTags, excludeFormulas } = event.data;
  const combinations: GeneratedMaterial[] = generateMaterialCombinations(
    selectedElements,
    selectedTags,
    new Set(excludeFormulas)
  );

  self.postMessage(combinations);
};
