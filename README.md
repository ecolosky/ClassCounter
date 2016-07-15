# ClassCounter
you have one of two options to use this bookmarklet
### Option 1:
got to my [website](http://edcolosky.com) on the home page at the top you can drag the link to your bookmark bar.
#### drawbacks
- the app will be rejected by some HTTPS websites because of their CSP.
- Most HTTPS sites will allow you to load the mixed content via a warning in the address bar.

### Option 2:
Clone this code repository and host at the root on you own local HTTP server. I recommend using the Nodejs http-server.
```
sudo npm -g install ~/dir/subdir/ClassCounter/http-server
```
At the top of ```bookmarklet.js``` there is a line documenting the expected root of the app. If for some reason your server hosts this on a different port you will have to change this.
```javascript
var appRoot = 'http://localhost:8080/ClassCounter/';
```
now open the ```index.html``` and drag this link to your bookmark bar.

### Frameworks Used
- AngularJS
