import getKeyValueFromBracket from "../funcs/getKeyValueFromBracket";


export const key: any = '@link'


export default function atLink(text: string): string {

  let value = text.trim();

  for (let link of text.matchAll(key)) {

    const { textKey, textValue } = getKeyValueFromBracket(text, key, link.index);

    const wrapped = `<a href="${textKey}" target="_blank" rel="noreferrer" class="link link--inline">${textValue}</a>`;

    value = value.replaceAll(`${key}([${textKey}][${textValue}])`, wrapped);
  }

  return value;
}
