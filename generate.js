const puppeteer = require("puppeteer")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs-extra');
const prompt = require('prompt-sync')();

const PAGES_JSON = "http://localhost:8080/generate_pages.json"
const FRAME_URL = "http://localhost:8080/generate.html?title="

async function main() {
  const response = await fetch(PAGES_JSON)
  const pages = await response.json()

  fs.ensureDir("./generated", err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
    })


  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    const browser = await puppeteer.launch()
    const tab = await browser.newPage()

    console.log("=== " + page.title + " ===")

    if (page.url) {
        console.log("URL: " + page.url)
        page.title = page.title + "&url=" + page.url;
    }

    if (page.author) {
        console.log("Author: " + page.author)
        page.title = page.title + "&author=" + page.author
    }

    if (page.image) {
        console.log("Image: " + page.image)
        page.title = page.title + "&image=" + page.image
    }

    await tab.goto(FRAME_URL + page.title, waitUntil="networkidle0");
    await tab.setViewport({ width: 600, height: 315, deviceScaleFactor: 2 })
    await tab.screenshot({ path: `./generated/${page.slug}.jpg` })
    await browser.close()
    console.log(`📸 ${page.title}`)
  }

    console.log("==== COMPLETED ====");
  
    let bot = prompt("[Images Created] :: Do these look right? Yn");

    if (bot == "y") {
        console.log("Moving your files for you.");

        fs.move('./generated/', './src/assets/img/generated/',{overwrite: true}, err => {
        if(err) return console.error(err);
            console.log('[Success] :: Your Files have been moved.);
        });

    } else if (bot == "n") {
        console.log("[Failure] :: Please restart the process to retry.")
    }

}

main()
