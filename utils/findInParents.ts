import { ElementHandle } from "puppeteer";

/**
 * This function searches for an element in the parents of the given element, up to maxTries times, escalating the search to the parent of the parent and so on.
 * @param maxTries The maximum number of parents to search for the element
 * @returns The element found */
export default async function findInParents(
  query: string,
  element: ElementHandle<Element>,
  maxTries: number
): Promise<ElementHandle<Element>> {
  let prevParent: ElementHandle<Node> = (await element.getProperty("parentElement")).asElement()!;

  for (let i = 0; i < maxTries; i++) {
    // go back to the previous parent, searching for all the div with role="button"
    const mas = await prevParent.$(query);
    if (mas) return mas;

    prevParent = (await prevParent.getProperty("parentElement")).asElement()!;
  }

  throw new Error(`Could not find the element after ${maxTries} tries`);
}
