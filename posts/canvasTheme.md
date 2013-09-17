----
title: Canvas Theme
date:  2013-9-16
description: Description of Canvas's features
----

Canvas is a starter theme for [Cabin](http://cabinjs.com).

The theme's source code is located at the [Canvas GitHub repo](https://github.com/CabinJS/Canvas).

## Installation

To use Canvas you must have [Node.js](http://nodejs.org/), [Python](http://www.python.org/) (for [Pygments](http://pygments.org/)), and [Compass](http://compass-style.org/) installed.

First install Cabin and Grunt globally with this command:

```bash
npm install -g cabin grunt-cli
```

Then scaffold a static site generator using the Canvas theme with this command:

```bash
cabin new blog CabinJS/Canvas
```

Now change into the `blog` directory and run the `grunt` command:

```bash
cd blog && grunt
```

This will build your site, start a static file server, open a browser tab with the site's homepage, and start a watch process to rebuild your site when source files change.

Try editing a markdown file in the `posts` folder or css in the `src/styles` folder and upon saving, your site will automatically be rebuilt with the updated content/styles. When you edit markdown, your browser will automatically refresh to view new content, and when editing styles, they will be injected directly into the page for an immediate update.

**Note: In the future, you can build your site by running the `grunt` command in the `blog` folder.**

## User Guide

### Expected files to edit

There are parts of the Canvas theme which you are expected to edit when building your site. Here they are:

#### Pages

You are expected to edit the `src/pages/about.(jade/ejs)` page to describe the site.

#### Posts

You are expected to edit the default posts and add your own metadata and content.

### Authoring Posts

Candy generates pages using markdown posts in the `posts` folder. It expects markdown posts to contain two required metadata properties:

#### title
Type: `String`

Title of the post which is also used as its url.

#### date
Type: `String`

DateString which is parsed and displayed as the publishing date of the post.

To learn more about post metadata, check out [grunt-pages](https://github.com/CabinJS/grunt-pages#authoring-posts).

### Included libraries/tools

#### normalize.css

[Normailze.css](https://github.com/CabinJS/Candy/blob/master/src/styles/normalize.scss) is used to normalize styles across browsers.

## Markdown
Cabin supports [GitHub flavored Markdown](https://help.github.com/articles/github-flavored-markdown) for its static site generation. It has awesome features like:

### Syntax highlighted code blocks
```javascript
function praise (thing) {
  console.log(thing + ' is so great!');
}

praise('Canvas');
```
### Linked headers(click me)
Link into specific sections of your posts.
