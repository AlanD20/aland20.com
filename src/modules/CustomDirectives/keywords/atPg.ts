export const key = '@pg'
export const endKey = '@endpg'


export default function atPg(text: string): string {

  let value = text.trim();
  value = text.replaceAll(key, '<p>');
  value = value.replaceAll(endKey, '</p>');

  return value;
}
