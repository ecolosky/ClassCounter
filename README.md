# ClassCounter
This is a bookmarklet that generates a word cloud based on the frequency of css classes contained in a page.
## How To Use:
### Option 1 - remote server:
Go to my [website](http://edcolosky.com) on the home page at the top you can drag the link for ClassCounter to your bookmark bar. To start the app click the bookmark.

### Option 2 - local server:
Clone this code repository and host at the root on you own local HTTP server. I recommend using the Nodejs http-server. which can be installed via npm or bower. Then start the server via the command line.
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
And that's it, now open the ```index.html``` and drag this link to your bookmark bar. To start the app click the bookmark.
### Known Issues
- The app will be rejected by HTTPS websites without specifically allowing mixed content in the browser.
- If using a local server the app will not work on Microsoft IE/Edge, this is because session storage is not allocated for a local host.
- Some pages will have a CSP that will block all scripts, take a look in the js console.

### Compatible Browsers
- Google Chrome >= 29
- Firefox >= 46
- Edge >= 13
- Safari >= 9.1
- Android Browser >= 4.4
- Chrome for Android >= 51

### Framework Used
This application does use an **AngularJS** app and controller. I decided to use this framework for two reasons. One, it's ```$scope``` decorator makes it very easy to inject varying amounts of data into the HTML template. Two, Angular offers an easy to use set of event listeners which I needed to make the repainting of classes fully responsive. There is really only one drawback, if a page already has an Angular app attached then I cannot bootstrap mine.

### Design
![Image of word-cloud-test](http://edcolosky.com/ClassCounter/word-cloud-test.png)
I mostly followed the design that was provided to me. In respects to color scheme, name tag shape, and general layout. I purposefully did not follow the design in two ways. One, I set the margins between rows to be much smaller, this to me looked more like a word cloud and made the content flow better. Two, I went with a different font for the css names because the near courier new style looked more appealing.

### Assumptions About Design
- css class name font sizes are determined by the frequency of occurrences on that page.
- The more frequent(larger font) classes are displayed at the top of the bookmarklet.
- Each row alternates colors blue then orange.
- Within each row the colors are alternated light then dark.
- the 'X' closes the bookmarklet destroying the root div.
