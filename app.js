'use strict';


// constructor function for all images 
function AllProductsCont(name, src) {
    this.name = name;
    this.src = src;
    this.clickCounter = 0;
    this.seenCounter = 0;
    AllProductsCont.all.push(this);
}

AllProductsCont.initialCounter = 0;           // count up the clicks times 
AllProductsCont.maxLimit = 25;                // max number of trials 
AllProductsCont.all = [];                     // constructor array 

//console.log(' aaaalllllllll ' , AllProductsCont.all);

// DOM code for ID's 
AllProductsCont.container = document.getElementById('products-container');            // Outer container 

AllProductsCont.leftImage = document.getElementById('left-product-image');            // left-product-image ID
AllProductsCont.middleImage = document.getElementById('middle-product-image');        // middle-product-image ID
AllProductsCont.rightImage = document.getElementById('right-product-image');          // right-product-image ID


AllProductsCont.leftTitle = document.getElementById('left-product-title');            // left-product-title ID
AllProductsCont.middleTitle = document.getElementById('middle-product-title');        // middle-product-title ID
AllProductsCont.rightTitle = document.getElementById('right-product-title');          // right-product-title ID

// Intials value for the needed three objects 
AllProductsCont.leftObject = null;
AllProductsCont.middleObject = null;
AllProductsCont.rightObject = null;

// Objects intances 
new AllProductsCont('bag', 'img/bag.jpg');
new AllProductsCont('banana', 'img/banana.jpg');
new AllProductsCont('bathroom', 'img/bathroom.jpg');
new AllProductsCont('boots', 'img/boots.jpg');
new AllProductsCont('breakfast', 'img/breakfast.jpg');
new AllProductsCont('bubblegum', 'img/bubblegum.jpg');
new AllProductsCont('chair', 'img/chair.jpg');
new AllProductsCont('cthulhu', 'img/cthulhu.jpg');
new AllProductsCont('dog-duck', 'img/dog-duck.jpg');
new AllProductsCont('dragon', 'img/dragon.jpg');
new AllProductsCont('pen', 'img/pen.jpg');
new AllProductsCont('pet-sweep', 'img/pet-sweep.jpg');
new AllProductsCont('scissors', 'img/scissors.jpg');
new AllProductsCont('shark', 'img/shark.jpg');
new AllProductsCont('sweep', 'img/sweep.png');
new AllProductsCont('tauntaun', 'img/tauntaun.jpg');
new AllProductsCont('unicorn', 'img/unicorn.jpg');
new AllProductsCont('usb', 'img/usb.gif');
new AllProductsCont('water-can', 'img/water-can.jpg');
new AllProductsCont('wine-glass', 'img/wine-glass.jpg');


// render function 
function renderNewProducts() {

    var forbidden = [AllProductsCont.leftObject, AllProductsCont.middleObject, AllProductsCont.rightObject];

    do {

        AllProductsCont.leftObject = getRandomProduct();

    } while (forbidden.includes(AllProductsCont.leftObject))
    forbidden.push(AllProductsCont.leftObject);
    do {

        AllProductsCont.middleObject = getRandomProduct();

    } while (forbidden.includes(AllProductsCont.middleObject));
    forbidden.push(AllProductsCont.middleObject);
    do {

        AllProductsCont.rightObject = getRandomProduct();
    } while (forbidden.includes(AllProductsCont.rightObject));

    /// Increment The Counter 
    AllProductsCont.leftObject.seenCounter++;
    //console.log('showctr' , seenCounter);   
    AllProductsCont.middleObject.seenCounter++;
    AllProductsCont.rightObject.seenCounter++;

    // make it just esier to read by code 
    var leftProductImageElement = AllProductsCont.leftImage;
    var middleProductImageElement = AllProductsCont.middleImage;
    var rightProductImageElement = AllProductsCont.rightImage;

    // Left Product
    leftProductImageElement.setAttribute('src', AllProductsCont.leftObject.src);
    leftProductImageElement.setAttribute('alt', AllProductsCont.leftObject.name);

    // Middle Product 
    middleProductImageElement.setAttribute('src', AllProductsCont.middleObject.src);
    middleProductImageElement.setAttribute('alt', AllProductsCont.middleObject.name);

    // Right Product 
    rightProductImageElement.setAttribute('src', AllProductsCont.rightObject.src);
    rightProductImageElement.setAttribute('alt', AllProductsCont.rightObject.name);

    // assign product titles 
    AllProductsCont.leftTitle.textContent = AllProductsCont.leftObject.name;
    AllProductsCont.middleTitle.textContent = AllProductsCont.middleObject.name
    AllProductsCont.rightTitle.textContent = AllProductsCont.rightObject.name;

}  // Ending render Products function 

// Images random function
function getRandomProduct() {
    var index = Math.floor(Math.random() * AllProductsCont.all.length);
    // console.log('index', index);
    return AllProductsCont.all[index];
}  // Ending random product function 


// render sentences of clicking and showing images 
function updateTotals() {

    var alloutput = document.getElementById('productsTable');

    // Clear the HTML area 
    alloutput.innerHTML = '';

    for (var i = 0; i < AllProductsCont.all.length; i++) {
        var newProduct = AllProductsCont.all[i];
        var output = addElement('output', alloutput);
        addElement('p', output, newProduct.name + ' had ' + newProduct.clickCounter + ' votes and was shown ' + newProduct.seenCounter + ' times');
    }
} // Ending Total Updates product function 

// function for add element , esier to call and use 
function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;

} // Ending Add Element  function 

// the event handler 
function clickHandler(event) {

    var clickItemId = event.target.id;
    var productChlicked;

    if (clickItemId === 'left-product-image') {
        productChlicked = AllProductsCont.leftObject;
    } else if (clickItemId === 'middle-product-image') {
        productChlicked = AllProductsCont.middleObject;
    } else if (clickItemId === 'right-product-image') {
        productChlicked = AllProductsCont.rightObject;

    } else {
        console.log('oooops , Finished ', clickItemId);
    }

    // truthy format to keep doing 
    if (productChlicked) {
        productChlicked.clickCounter++;
        AllProductsCont.initialCounter++;

        // to check if the max trails == 25
        if (AllProductsCont.initialCounter === AllProductsCont.maxLimit) {

            alert('Your Trails Over ');
            updateTotals();
            fullChart();

            // remove the lister if max trails reached 25 
            AllProductsCont.container.removeEventListener('click', clickHandler);
            updateProducts();             /// Store the date in Local storage 

            
        } else {

            renderNewProducts();
        } // Ending last else to render the new product 
    } // Ending if statement condition if clicked 
} // Ending Click Handler function 

AllProductsCont.container.addEventListener('click', clickHandler);


/************************************************ Canvas Chart ********************************************************/

// get chart area to display it 
var ctx = document.getElementById('busChart').getContext('2d');

// for images names 
var productsNames = [];

// seen counter 
var productsSeen = [];

// clicks counter 
var productsClicks = [];

// populate images names 
function makeProductname() {

    for (var i = 0; i < AllProductsCont.all.length; i++) {         // Store the products name in array to use it in the chart 
        var productName = AllProductsCont.all[i].name;
        productsNames.push(productName);
        //console.log('productsnames', productsNames);
    }

    return productsNames;

}/// Ending product name function 

// populate images shown counter  
function makeProductseen() {

    for (var i = 0; i < AllProductsCont.all.length; i++) {
        var productSeen = AllProductsCont.all[i];
        //console.log('productClick',productClick);
        productsSeen.push(productSeen.seenCounter);
        //console.log('productsSeen', productsSeen);
    }

    return productsSeen;
} /// Ending product seen function 

// populate images clicks counter  
function makeProductclick() {

    for (var i = 0; i < AllProductsCont.all.length; i++) {
        var productClick = AllProductsCont.all[i];
        productsClicks.push(productClick.clickCounter);
        //console.log('productsClicks', productsClicks);
    }

    return productsClicks;

}/// Ending product click function 


// Chart function 
function fullChart() {

    //console.log('Chart : ', Chart);
    var chart = new Chart(ctx, {
        type: 'bar',


        data: {
            labels: makeProductname(),
            datasets: [
                {
                    label: 'Clicked Product Counter ',
                    backgroundColor: 'rgb(125, 63, 170)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: makeProductclick()
                },
                {
                    label: 'Seen Product Counter ',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: ' rgb(125, 63, 170)',
                    data: makeProductseen(),
                    type: 'line'
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}  /// ending of Fullchart Function 

/************************************************ Local Storage ********************************************************/
var localStrg = document.getElementById('productsTable');

// store data in local storage 
function updateProducts() {
    //console.log(' products length ' , AllProductsCont.all.length  );

        // localStorage.clear();
        // window.localStorage.clear();
        if(localStorage) { // Check if the localStorage object exists
            localStorage.clear()  //clears the localstorage
        } 
            // window.localStorage.removeItem("Products");
        var productStr = JSON.stringify(AllProductsCont.all);
        //console.log('productStr', productStr);
        localStorage.setItem('Products', productStr);
          
} // Ending Of Updates Products Function 

// bring the date from local storage 
function getProducts() {
    var dataP = localStorage.getItem('Products');
    //console.log(' dataP' , dataP);

    var ProductData = JSON.parse(dataP);
    //console.log('Product data' , ProductData);

    if (ProductData) {
        //console.log('ProductData.length' , ProductData.length );
        //console.log(' products length  2 ' , AllProductsCont.all.length  );

        for (let i = 0; i < ProductData.length; i++) {
            var rawProductObject = ProductData[i];
            var chgProductCtrs = AllProductsCont.all[i];

            chgProductCtrs.seenCounter = rawProductObject.seenCounter;
            chgProductCtrs.clickCounter = rawProductObject.clickCounter;
        }
        //console.log(' products length  2 ' , AllProductsCont.all.length  );

        renderNewProducts();
    } else {

        alert(' nothing here ');
    }
    //console.log('local Storage Data', ProductData);
} //// Ending Of get Products Function 

// intial rendering 
renderNewProducts();
getProducts();