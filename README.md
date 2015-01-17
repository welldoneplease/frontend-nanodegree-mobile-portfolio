# Final website is here
[http://welldoneplease.github.io/index.html] (http://welldoneplease.github.io/index.html)


## Things done to optimize

### HTML
- Use includes via Grunt processHtml tasks
- Inline scripts and styles
- Minify via Grunt htmlmin task

### CSS
- Split up where useful for development
- Minify via Grunt cssmin task
- Combine and include inline for 'deployment' via Grunt processhtml task

### JS
- Save analytics code locally
- Uglify scripts via Grunt uglify task
- Include inline (where useful) for 'deployment' via Grunt processhtml task 

For pizza.html: 
- Move calc heavy code outside of for loops
- use document fragments instead of hammering the dom in for loops
- use translateZ to utilize GPU power for pizza background rendering 

### BINARY
- Reduce image size with Grunt imagemin task
- Resize images with web resize service and use thumbnails where useful
- Create base64 encoded images and include inline into html with help of Grunt base64 task


## Resources used
[stack overflow] (http://stackoverflow.com/)
[css-tricks] (http://css-tricks.com/)
[Why Moving Elements With Translate() Is Better Than Pos:abs Top/left] (http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)
[MDN] (https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
[High Performance Animations] (http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
[DOM DocumentFragments] (http://ejohn.org/blog/dom-documentfragments/)
[Parallaxin'] (http://www.html5rocks.com/en/tutorials/speed/parallax/)
[Leaner, Meaner, Faster Animations with requestAnimationFrame] (http://www.html5rocks.com/en/tutorials/speed/animations/)

