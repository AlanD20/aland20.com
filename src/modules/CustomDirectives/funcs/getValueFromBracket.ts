export default function getValueFromBracket(text: string, key: string, idx: number | undefined): string {
  // @marker([AlanD20]) --String--> AlanD20
  const SKIP_PARENTHESIS = 2

  idx = idx ?? text.indexOf(key);

  let i = idx + key.length + SKIP_PARENTHESIS;
  let originalText = '';

  for (i; i < text.length; i++) {

    if (text[i] === ']')
      continue;
    if (text[i] === ')')
      break;

    originalText += text[i];
  }

  return originalText;
}
