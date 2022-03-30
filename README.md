![](/blogautogen.jpg)

# Auto Generate Social Images

I needed a quick and simple way to effortlessly make social open graph images, most of the existing frameworks allowed very little customization, and so this was hastily built. 

This was primarily built with Eleventy/11ty in mind, but is made in such a way it could be expanded and adapted quite easily. 

## How to Use

### Installation
1. Load generate.html and generate_pages.njk into your 11ty src directory (wherever you keep all those wonderful pages).
2. Load generate.js into the top of your project/repo/folder directory
3. Add this to the bottom of your pckage.json build scripts
    - `"generate": "node generate.js"`
4. `npm install puppeteer fs-extra -D'
5. Add the following to your 11ty configs: 

```
 eleventyConfig.addFilter("encodeString", (str) => {
  let title = encodeURIComponent(str);
  return title;
});
```

### Generation
1. Open a terminal, start 11ty (normally `npm start`)
2. Open a second terminal, run `npm run generate`
3. Answer the few prompts at the end, and there you go. 

### Open Graph 

The image files are saves as a slug version of your post (page) url, this will turn `/tech/autogen` into `techautogen` and any time you need to share this image or display it, call `{{page.url | slug }}.jpg` in your generated assets folder (templating is nunjucks, make the approriate changes for your templating language). 

```
<meta property="og:url" content="https://your-url-here.com{{ page.url }}" />
<meta property="og:image" content="https://your-url-here.com/assets/img/generated/{{page.url | slug }}.jpg"/>
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image">
```


## How it works

Design your page in generate.html using CSS and HTML, grab the details from query parameters, and bind them to a div. This removes the need to generate additional folders and images based on your pre-existing posts as this will only generate one additional page on build and use url parameters for their dynamic output. 

Puppeteer, a headless browser, will load the HTML page (with the correct URL params), snap a picure, upscales it 2x, and saves it in a `./generated/` directory for every post. Once every post has an image, the script will ask if they look correct (you can inspect by looking at your `./generated` folder), if they are the script will move the files to a new directory in your assets directory for you. 

**Note: Make sure that 11ty isn't autobuilding every time a new image is added, this can cause some problems with the generation tasks.**

## Variables

Check out the generate_pages.njk file, and ensure that your variables align with your system. Everyone has a different style, it's rather simple to add and remove. 

## To Do

- Integrate Svelte for faster production, perhaps overkill. 
- Use a more standard way of encoding params, just already had an encoding filter for another utility. 
- Default Theme
- Config File

## Credit

This project took inspiration from [mtm.dev].
