type StyleObject = Partial<CSSStyleDeclaration>;
/**
 * Sets the given styles on the given element.
 *
 * @param element The element to set the styles on.
 * @param styles The styles to set.
*/
export const setStyle = (element: HTMLElement, styles: StyleObject) => {
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      (element.style as any)[key] = styles[key];
    }
  }
};
