# ClassCounter
you have one of two options to use this bookmarklet
### Option 1 - remote server:
Go to my [website](http://edcolosky.com) on the home page at the top you can drag the link for ClassCounter to your bookmark bar.

### Option 2 - local server:
Clone this code repository and host at the root on you own local HTTP server. I recommend using the Nodejs http-server.
```
sudo npm -g install http-server
http-server /dirTo/ClassCounter
```
In the 8th line of ```bookmarklet.js``` the app's root is set. If for some reason your server hosts this on a different port you will have to change this.
```javascript
var appRoot = 'http://localhost:port/dirTo/ClassCounter/';
```
Next do the same edit in ```index.html``` on the A tag:
```html
<a href="javascript:(function(){
  var jsCode = document.createElement('script');
  jsCode.setAttribute('src','http://localhost:port/dirTo/ClassCounter/js/bookmarklet.js');
  document.body.appendChild(jsCode);})();">
  ClassCounter
</a>
```
And that's it, now open the ```index.html``` and drag this link to your bookmark bar.
### Known Issues
- The app will be rejected by HTTPS websites without specifically allowing mixed content in the browser.
- If using a local server the app will not work on microsoft IE/Edge, this is because session storage is not allocated for a local host.
- Some pages will have a CSP that will block all scripts, take a look in the console.

### Compatible Browsers
- Google Chrome >= 29
- Firefox >= 46
- Edge >= 13
- Safari >= 9.1
- Android Browser >= 4.4
- Chrome for Android >= 51

### Framework Used
This application does use an **AngularJS** app and controller. I chose to use this framework for two reasons. One, it's ```$scope``` decorator makes it very easy to inject varying amounts of data into the HTML template. Two, Angular offers an easy to use set of event listeners which I needed to use to make the repainting of classes fully responsive. The is really only one drawback, if a page already has an Angular app attached then I cannot attach mine.

### Design
![image of supplied design]
(https://github.com/ecolosky/ClassCounter/word-cloud-test.png)
I mostly followed the design that was provided to me. In respects to color scheme, name tag shape, and general layout. I dirrectly did not follow the design in two ways. One, I set the margins between rows to be much smaller, this to me looked more like a word cloud. Two, I choose a different font for the css names because I liked the almost courier new style better.

### Assumptions About Design
- css class name font size is determined by the frequency of occurrences on the page.
- The more frequent(larger font) classes are displayed at the top of the bookmarklet.
- Each row alternates colors blue then orange.
- Within each row the colors are alternated light then dark.
- the 'X' closes the bookmarklet(destroys root div)
