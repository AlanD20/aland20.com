
// List of Tags will be parsed.
// Make sure the tags have value property.
const SUPPORTED_TAGS = ['input', 'textarea']

export default function formInputsToObj(
  inputs: HTMLInputElement[], {
    defaults = {},
  }
) {

  const radio = {};

  // filter by supported tags.
  // filter out button.
  // read name and value property to make an object.
  // checked radio button, group it under one key property.
  // ignore tags that data-ignore-input is present.
  const obj = inputs
    .filter(element => SUPPORTED_TAGS.includes(element.localName))
    .filter(element => !element.classList.contains('btn'))
    .reduce((obj, element) => {
      const key = `${element.getAttribute('name')}`;
      const value = element.value.trim();
      if (element.getAttribute('data-ignore-input')) {
        return obj;
      }
      if (element.type === 'radio' && element.checked) {
        radio[key] = value
      }
      if (key === 'priority') {
        return {
          ...obj,
          [key]: Number(value)
        }
      }
      return {
        ...obj,
        [key]: value
      }
    }, defaults);

  if (Object.keys(radio).length > 0) {
    Object.keys(radio).forEach(key => obj[key] = radio[key])
  }


  return obj;
}
