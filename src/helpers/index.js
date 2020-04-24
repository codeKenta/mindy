export const stripHtml = html => {
  // Create a new div element
  const temporalDivElement = document.createElement('div')
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || ''
}
