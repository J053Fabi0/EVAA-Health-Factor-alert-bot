/** @param s Seconds */
const sleep = (s: number): Promise<void> => new Promise((r) => setTimeout(r, s * 1000));

export default sleep;
