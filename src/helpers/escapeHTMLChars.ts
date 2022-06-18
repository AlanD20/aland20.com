export default function escapeHTMLChars(text: string): string {
  return text.replace(/(<)|(>)/gim, ' ');
}
