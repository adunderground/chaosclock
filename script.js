//state variables
let timeIsDisplaying = false;
let intervalId = 0;

//DOM hooks
const timeBtn = document.getElementById('timeBtn');
const chaosBtn = document.getElementById('chaosBtn');
const stopBtn = document.getElementById('stopBtn');
const cleanBtn = document.getElementById('cleanBtn');
const displayBtn = document.getElementById('displayBtn');
const colorPicker = document.getElementById('colorPicker');


let displayMode = displayBtn.textContent;

function display() {
  cleanUp();
  if (displayMode === 'Clock') {
    displayTime();
  }
  if (displayMode === 'Chaos') {
    displayChaos();
  }
}

function displayTime() {
  let timeId = setInterval(() => {
    startTime();
  }, 500);

  intervalId = timeId;
}

function displayChaos() {
  let chaosId = setInterval(() => {
    startChaos();
  }, 900);

  intervalId = chaosId;
}

function stopDisplay() {
  clearInterval(intervalId);
}

function startTime() {
  timeIsDisplaying = true;
  function checkTime(i) {
    return i < 10 ? '0' + i : i;
  }
  let time = new Date(),
    h = checkTime(time.getHours()),
    m = checkTime(time.getMinutes()),
    s = checkTime(time.getSeconds());

  document.querySelector('svg').setAttribute('data-hour', h);
  document.querySelector('svg').setAttribute('data-minute', m);
  document.querySelector('svg').setAttribute('data-second', s);
}

function startChaos() {
  cleanUp();
  //there are 42 elements (not including dots)
  const numOfElems = Math.round(Math.random() * 42);
  let arr = [];

  //populate an array with randomly generated digit - element pairs X(times) up to 42
  for (let i = 0; i < numOfElems; i++) {
    //(1-6)
    const randomDig = Math.floor(Math.random() * 6) + 1;
    //(0-6)
    const randomEl = Math.round(Math.random() * 6);
    //rBundle - random bundle that will be an array of 2 elements, digit-number, and element number
    let rBundle = [`.digit-${randomDig}`, randomEl];
    arr.push(rBundle);
  }

  //add active class to each digit-elem pair in the array
  arr.forEach((index) => {
    document.querySelector(index[0]).children[index[1]].classList.add('active');
  });

  //clean up the array
  arr = [];

  //implementing random dots
  //flexing objects
  const randomDots = {
    dotsActive: Math.round(Math.random()),
    numberOfDots: Math.round(Math.random() * 3) + 1,
  };

  //truthy-falsy 0 || 1
  if (randomDots.dotsActive) {
    for (let i = 0; i < randomDots.numberOfDots; i++) {
      let randomIndex = Math.round(Math.random() * 3);
      document
        .querySelector('.dots')
        .children[randomIndex].classList.add('active');
    }
  }
}

//clean up function runs everytime button is pressed, removes "active" class from all elements, and removes data- attributes to clearn up the time
function cleanUp() {
  document
    .querySelector('svg')
    .querySelectorAll('*')
    .forEach((el) => {
      el.classList.remove('active');
    });

  document.querySelector('svg').setAttribute('data-hour', '');
  document.querySelector('svg').setAttribute('data-minute', '');
  document.querySelector('svg').setAttribute('data-second', '');
}


// EVENT LISTENERS

// display btn
displayBtn.addEventListener('click', () => {
  stopDisplay();
  display();
  if (displayMode === 'Clock') {
    displayBtn.textContent = 'Chaos';
    displayMode = displayBtn.textContent;
  } else {
    displayBtn.textContent = 'Clock';
    displayMode = displayBtn.textContent;
  }
});

// stop btn
stopBtn.addEventListener('click', () => {
  console.log('Stopping...');
  stopDisplay();
  // cleanUp();
});

// color picker
colorPicker.addEventListener('input', ()=>{
  document.documentElement.style
    .setProperty('--active', event.target.value);
  // hex color
    console.log(event.target.value);
});


//old event listeners
/*
timeBtn.addEventListener('click', () => {
  //apply highlighted effect if the button is pressed
  timeBtn.classList.toggle('btn-active');
  // cleanUp();

  if (!timeIsDisplaying) {
    console.log('Creating Time...');
    displayTime();
    timeIsDisplaying = true;
  } else {
    console.log('Stopping Time...');
    stopDisplay();
    timeIsDisplaying = false;
  }
});

// CHAOS BTN
chaosBtn.addEventListener('click', () => {
  console.log('Creating Chaos...');
  // startChaos();
  displayChaos();

  // setInterval(() => startChaos(), 1000);
});

// Clean BTN
cleanBtn.addEventListener('click', () => {
  console.log('Cleaning...');
  cleanUp();
});

*/


