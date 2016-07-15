// ================================================================
// 			  JS Script for grabbing css classes then preparing data attibutes
//          for the controller to recieve.
// 			  Ed Colosky
// 			  July, 2016
// =================================================================
var classes = []; //array of class names
var classCnt = {}; //hash table of their corresponding counts
var maxCount = 0; //most frequent css class used to normalize font size
[].forEach.call(document.querySelectorAll("*"), function(element) {
  if (element.className) {
    var tempClassArr = element.className.split(" ");
    for(i in tempClassArr) {
      // if the class is not noted please do so
      if (classes.indexOf(tempClassArr[i]) == -1) {
        classes.push(tempClassArr[i]);
      }
      // increment the class count
      classCnt[tempClassArr[i]] = (classCnt[tempClassArr[i]]||0) + 1;
      // keep max count updated
      if(classCnt[tempClassArr[i]] > maxCount){
        maxCount = classCnt[tempClassArr[i]];
      }
    }
  }
});

// sort classes by frequency
classes.sort(function(a,b){
  return classCnt[b] - classCnt[a];
});

// init
var model = [];//master array for controller

// prepare data for controller
for(index in classes){
  // empty class names skipped
  if(classes[index] == ""){
    continue;
  }

  // create class object
  var tempObj = {};
  var count = classCnt[classes[index]];
  tempObj.name = classes[index];//attach name attribute
  tempObj.count = count;//attach count attribute

  // set size of text based on count
  // first normalize count vector
  var normalVal = (.2+(tempObj.count)/(maxCount)) * 50
  if(normalVal > 12){
    // attach style to object
    tempObj.size = 'font-size: '+ normalVal.toString() + 'px;';
  }
  // size min threshold of 12
  else{
    tempObj.size = 'font-size: 12px;';
  }
  // add to master array
  model.push(tempObj);
}


// write to localstorage
var dataModel = JSON.stringify(model);
dataModel = btoa(dataModel);
localStorage.setItem('_dataModel', dataModel);
console.log("page analyzed and saved to local storage");
