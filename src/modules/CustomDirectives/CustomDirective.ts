import escapeHTMLChars from "../../helpers/escapeHTMLChars";
import atBlock, { key as blockKey } from "./keywords/atBlock";
import atLink, { key as linkKey } from "./keywords/atLink";
import atMarker, { key as markerKey } from "./keywords/atMarker";
import atPg, { key as pgKey } from "./keywords/atPg";


// Before Parse
// @pg This is a paragraph and @marker([this text is highlighted]), by using block directive @block I can move this line in a new line @endblock I can also put @link([ https://google.com][Google]) link here. now I end the paragrpah @endpg @pg This is the start of the second paragraph @endpg


// After Parse
// <p>This is a paragraph and <span className="marker">this text is highlighted</span>, by using block directive <span className="block"> I can move this line in a new line </span> I can also put <a href="https://google.com" className="link">Google</a>link here. now I end the paragrpah</p> <p> This is the start of the second paragraph </p>


const CustomDirective = (content) => {

  if (!content) return '';

  // Escape HTML entities
  let result = escapeHTMLChars(content.trim());

  // Adding new directive must be checked here...
  // Orders matter, be caeful when it parses the custom directive.

  if (result.includes(blockKey))
    result = atBlock(result);
  if (result.includes(linkKey))
    result = atLink(result);
  if (result.includes(markerKey))
    result = atMarker(result);
  if (result.includes(pgKey))
    result = atPg(result);

  return result;
}

export default CustomDirective;
