# Knockout-APOD
[APOD](http://apod.nasa.gov/apod/astropix.html) (Astronomy Photo of the Day) Viewer made with [knockout.js](http://knockoutjs.com). Here's a [demo](http://joecochran.sdf.org/demos/knockout-apod/).

## Requirements
- npm
- grunt

## Installation
1. `git clone git@github.com:joecochran/homework.git`
2. Grunt should be installed globally, so run `npm install -g grunt-cli`
3. Once Grunt is installed, install node_modules with `npm install`
4. Compile all assets in `src/` by running `grunt`
5. Compiled site can be found in `dist/` directory.

## Grunt
This project uses grunt for asset compilation and minification, as well as to
start a server. This section will outline the plugins used and how they work.

#### [jit-grunt](https://github.com/shootaroo/jit-grunt)

Rather than load every task via `grunt.loadNpmTasks(taskName);` we use
*jit-grunt* to load plugins auto-magically based upon the contents of
`package.json` 

#### [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)

This plugin will watch the `src/less/` directory and all sub folders for
changes to any file with a .less extension. When detected, it will re compile
main.less. Optimization is not enabled so that the output can be ran through autoprefixer.

#### [grunt-postcss](https://github.com/nDmitry/grunt-postcss)

Originally *grunt-autoprefixer*, that project was pulled into *grunt-postcss*. This task traverses `main.css` and adds vendor specific prefixes for css3 rules depending on the browsers directive. For this project it is set to `> 4% in US`.

#### [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)

This plugin watches `src/js/` and all sub folders for changes to .js files, and
concatenates them in the order listed in the Gruntfile. The resulting file is
placed at `dist/js/app.js`.

#### [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)

This plugin takes the file `dist/js/app.js` and uglifies/minifies it into
`dist/js/app.min.js`.

#### [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)

This plugin watches the directory `src/img/` for any png, jpg, or gif images
and optimizes them, placing the optimized version into `dist/img`.

#### [grunt-newer](https://github.com/tschaub/grunt-newer)

This plugin is used to ensure that images already minified by
*grunt-contrib-imagemin* do not get minified again.

#### [grunt-connect](https://github.com/gruntjs/grunt-contrib-connect)

This plugin allows us to start a web server with grunt, which serves the `dist/`
directory to `localhost:8000`

## Styles
Using BEM (Block Element Modifier) methodology to organize css into components.
The `src/less/` directory contains all less for the project. `src/less/boilerplate` contains a sliced up version of the html5boilerplate css. `src/less/components` contains individual "blocks" in the BEM methodology.

On top of BEM, properties have been organized to follow a convention, taken
from [SMACSS](https://smacss.com/book/formatting):

1. **Box** - includes any property which affects the display and position of the
box, like `display`, `float`, `position`, `top`, `height`, `width`, etc.
2. **Border** - includes any property which is related to borders, such as `border`, `border-radius`, or `border-image`.
3. **Background** - includes `background` and related properties, like `background-image`, `background-size`, etc.
4. **Text** - includes any property related to the display of text, like `font` (and its derivatives), `text-align`, `color`, `letter-spacing`, and `text-transform`. 
5. **Other** - Any property which does not fit in the above categories goes at the end.

When in doubt, I have referred to the [scss-lint sort order for smacss](https://github.com/brigade/scss-lint/blob/master/data/property-sort-orders/smacss.txt). Less mixins have been placed at the end, unless they specifically fit into another category.
