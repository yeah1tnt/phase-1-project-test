# Phase 1 Project
## Cat flashcard generator

![Website gif](https://i.imgur.com/iYPnvAC.gif)

## What is it?

A simple flashcard maker that has built-in function to pull picture from https://http.cat/. Currently it can randomized what is inside db.json under catPage. It will only take input if both error and description are filled out. Any entry without url (and are not on http.cat) will return 404 error.

## Installation

You will need to create your own db.json. Below is an example of what is inside

```json
{
  "catPage": [
    {
      "id": 1,
      "error": "100",
      "content": "continue",
      "url": ""
    },
    {
      "error": "101",
      "content": "Switching Protocols",
      "url": "",
      "id": 2
    }
  ]
}
```
JSON server should also be started in order for the site to work

```js
json-server --watch db.json
```

## Usage

open index.HTML, here you can add more cat pictures, or any flashcard material you want to learn. Hover over Instruction for some instruction


## Other
Link to a blog regarding this project. https://yeah1tnt.github.io/posts/phase-1-project/

CSS Animation for the title from
https://codepen.io/alvarotrigo/pen/PoKMyNO

Cat image are being pulled from https://http.cat/ (only applied to error code available on the site)

## License

This work is published under [MIT](https://github.com/yeah1tnt/phase-1-project-test/blob/main/LICENSE) License