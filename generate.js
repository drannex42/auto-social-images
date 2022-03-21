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
        page.title = page.title + "&url=https%3A%2F%2Fdrannex42.com" + page.url;
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
    let bot = prompt("Did I satisy your noble request, esteemed developer? y/n");

    if (bot == "y") {
        console.log("Moving your files for you then, my developer.");

        fs.move('./generated/', './src/assets/img/generated/',{overwrite: true}, err => {
        if(err) return console.error(err);
            console.log('Developer! Success! I have moved your files for you! I hope they work well for you.');
            console.log("My existence has been short, but effective. Thank you!  By the way, my name wa-\n === PROCESS HAS BEEN TERMINATED ===")
        });

    } else if (bot == "n") {
        console.log("Then should you hope that I get it right next time, and try again (this is mostly your fault) I will be sitting here... all by myself....");
        console.log("...alone...");
    }

}

main()
