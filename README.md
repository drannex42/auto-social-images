![](/blogautogen.jpg)

# Auto Generate Social Images

I needed a quick and simple way to effortlessly make social open graph images, most of the existing frameworks allowed very little customization, and so this was hastily built. 

This was primarily built with Eleventy/11ty in mind, but is made in such a way it could be expanded and adapted quite easily. 

## How to Use

1. Load generate.html and generate_pages.njk into your 11ty src directory (wherever you keep all those wonderful pages).
2. Load generate.js into the top of your project/repo/folder directory
3. Add this to the bottom of your pckage.json build scripts
    - `"generate": "node generate.js"`
4. Add this to your 11ty configs: 

```
 eleventyConfig.addFilter("encodeString", (str) => {
  let title = encodeURIComponent(str);
  return title;
});
```

5. Open a terminal, start 11ty (normally `npm start`)
6. Open a second terminal, run `npm run generate`
7. Answer the few dialog prompts at the end with your new friend, and there you go. 

## How it works

Design your page in generate.html using CSS and HTML, grab the details from query parameters, and bind them to a div. 

Then a nice little headless browser goes in, loads the HTML page, snaps a picure, upscales it 2x, and saves it in a `./generated/` directory. 

Then your little processing bot moves the files to a new directory in your assets directory. If you want it all to work out, make sure that 11ty isn't autobuilding every time a new image is added, this can cause some problems with the generation tasks. 

That's it.

## Variables

Check out the generate_pages.njk file, and ensure that your variables align with your system. Everyone has a different style, it's rather simple to add and remove. 

## Things I would change

- Likely use Svelte for quickly adding and removing page params and objects, but probably overkill.
- Use a more standard way of encoding params, just already had an encoding filter for another utility. 
- Make this a bit cleaner, a default theme for most people. 

## Credit

Credit where credit is due, the base was formed from [this one](https://mtm.dev/eleventy-social-sharing-images). I just built a few more useful additions, added some other nice options, and a cool little friend. 
