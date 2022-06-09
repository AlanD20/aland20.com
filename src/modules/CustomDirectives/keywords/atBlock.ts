export const key = '@block'
export const endKey = '@endblock'


export default function atBlock(text: string): string {

  let value = text.trim();
  value = text.replaceAll(key, '<span class="block">');
  value = value.replaceAll(endKey, '</span>');

  return value;
}
