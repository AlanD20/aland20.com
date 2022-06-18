import { key as blockKey, endKey as endBlockKey } from './keywords/atBlock';
import { key as linkKey } from './keywords/atLink';
import { key as markerKey } from './keywords/atMarker';
import { key as pgKey, endKey as endPgKey } from './keywords/atPg';

export default function highlightCustomDirectives(text: string): string {
  let value = text;
  value = wrapTextWithMarker(value, /@block/gim, blockKey);
  value = wrapTextWithMarker(value, /@endblock/gim, endBlockKey);
  value = wrapTextWithMarker(value, /@pg/gim, pgKey);
  value = wrapTextWithMarker(value, /@endpg/gim, endPgKey);
  value = wrapTextWithMarker(value, /@link\(\[/gim, `${linkKey}[(`);
  value = wrapTextWithMarker(value, /@marker\(\[/gim, `${markerKey}[(`);
  value = wrapTextWithMarker(value, /\]\)/gim, '])');
  value = wrapTextWithMarker(value, /\]\[/gim, '][');

  return value;
}

function wrapTextWithMarker(text, pattern, key) {
  const wrapper = `<span className="marker">${key}</span>`;
  return text.replace(pattern, wrapper);
}
