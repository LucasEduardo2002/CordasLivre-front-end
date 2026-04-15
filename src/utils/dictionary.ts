const DICTIONARY_TERMS = [
  '0.10',
  '0.11',
  '0.12',
  '0.13',
  '0.14',
  '0.15',
  '0.16',
  'Phosphor Bronze',
  '80/20 Bronze',
  'Bronze 80/20',
  'Nylon',
  'Aço',
  'Aco',
] as const;

export const splitTextByDictionaryTerms = (text: string) => {
  const normalizedTerms = [...DICTIONARY_TERMS].sort((left, right) => right.length - left.length);
  const segments: Array<{ text: string; term?: string }> = [];

  let cursor = 0;

  while (cursor < text.length) {
    const rest = text.slice(cursor);
    const match = normalizedTerms.find((term) => rest.toLowerCase().startsWith(term.toLowerCase()));

    if (match) {
      segments.push({ text: text.slice(cursor, cursor + match.length), term: match });
      cursor += match.length;
      continue;
    }

    let nextMatchIndex = text.length;

    for (const term of normalizedTerms) {
      const index = text.toLowerCase().indexOf(term.toLowerCase(), cursor + 1);
      if (index !== -1 && index < nextMatchIndex) {
        nextMatchIndex = index;
      }
    }

    segments.push({ text: text.slice(cursor, nextMatchIndex) });
    cursor = nextMatchIndex;
  }

  return segments;
};