import { key as blockKey, endKey as endBlockKey } from './keywords/atBlock'
import { key as linkKey } from './keywords/atLink'
import { key as markerKey } from './keywords/atMarker'
import { key as pgKey, endKey as endPgKey } from './keywords/atPg'

export default function highlightCustomDirectives(text: string): string {

  let value = text;
  value = wrapTextWithMarker(value, /@block/gmi, blockKey)
  value = wrapTextWithMarker(value, /@endblock/gmi, endBlockKey)
  value = wrapTextWithMarker(value, /@pg/gmi, pgKey)
  value = wrapTextWithMarker(value, /@endpg/gmi, endPgKey)
  value = wrapTextWithMarker(value, /@link\(\[/gmi, linkKey + '[(')
  value = wrapTextWithMarker(value, /@marker\(\[/gmi, markerKey + '[(')
  value = wrapTextWithMarker(value, /\]\)/gmi, '])')
  value = wrapTextWithMarker(value, /\]\[/gmi, '][')

  return value;
}

function wrapTextWithMarker(text, pattern, key) {

  const wrapper = `<span className="marker">${key}</span>`
  return text.replace(pattern, wrapper);

}
