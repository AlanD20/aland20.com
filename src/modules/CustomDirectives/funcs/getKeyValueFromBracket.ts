

export default function getKeyValueFromBracket(text: string, key: string, idx: number | undefined) {
  // @link([/faq][FAQ]) --obj--> {
  //      textKey: '/far',
  //      textValue: 'FAQ'
  //   }

  const SKIP_PARENTHESIS = 2
  idx = idx ?? text.indexOf(key)
  let i = idx + key.length + SKIP_PARENTHESIS;
  let textKey = '';
  let textValue = '';
  let isValue = false;
  for (i; i < text.length; i++) {
    if (text[i] === '[') {
      isValue = true;
      continue;
    }
    if (text[i] === ']')
      continue;
    if (text[i] === ')')
      break;

    if (!isValue) textKey += text[i];

    if (isValue) textValue += text[i];
  }
  return { textKey, textValue };
}
