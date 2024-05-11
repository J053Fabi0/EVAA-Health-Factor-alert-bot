import login from "./login";
import "./telegram/initBot";
import getBrowser from "./utils/browser";
import sleep from "./utils/sleep";

// (async () => {
//   const browser = await getBrowser();
//   const page = await browser.newPage();
//   const loggedIn = await login(page);
//   console.log(loggedIn);
//   await sleep(10000);
//   await browser.close();
// })();
