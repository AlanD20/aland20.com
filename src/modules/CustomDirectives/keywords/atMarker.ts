import getValueFromBracket from '../funcs/getValueFromBracket';

export const key: any = '@marker';

export default function atMarker(text: string): string {
  let value = text.trim();

  for (const marker of text.matchAll(key)) {
    const originalText = getValueFromBracket(text, key, marker.index);

    const wrapped = `<span class="marker">${originalText}</span>`;
    value = value.replaceAll(`${key}([${originalText}])`, wrapped);
  }

  return value;
}
