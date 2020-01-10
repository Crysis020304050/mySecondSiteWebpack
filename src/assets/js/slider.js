
import noneSlide from '../images/noSlideImage.jpg';

const slideContainer = document.getElementsByClassName('slideContainer')[0];
const slideInformationContainer = document.getElementsByClassName('slideInformationContainer')[0];
const slidesControllerContainer = document.getElementsByClassName('slidesControllerContainer')[0];

const testimonials = document.getElementById('testimonials');


let j = 0;


fetch('./data/slider.json')
.then(response => response.json())
.then(slides => {
   slides.forEach(slide => {
       addFullSlide(slide);
   })
}).catch(console.error);


function addFullSlide (slide) {
    addSlideImage(slide);
    addSlideDescription(slide);
    addSlideAuthor(slide);
    addSlideControllerElem();
}

function addSlideImage (slide) {
    const slideImage = new Image();
    slideImage.classList.add('slide');
    slideImage.src = slide.href;
    slideImage.onerror = () => {
        slideImage.src = noneSlide;
    };
    slideImage.alt = 'slide';
    slideImage.setAttribute('numSlide', `${j++}`);

    slideContainer.appendChild(slideImage);
}

function addSlideDescription (slide) {
    const slideDescription = document.createElement('p');
    slideDescription.classList.add('slideDescription');
    slideDescription.innerText = slide.description || '';

    slideDescription.setAttribute('numSlide', `${j}`);

    slideInformationContainer.appendChild(slideDescription);

}

function addSlideAuthor (slide) {
    const slideAuthor = document.createElement('h6');
    slideAuthor.classList.add('author');
    slideAuthor.innerText = slide.name || '';
    slideAuthor.setAttribute('numSlide', `${j}`);

    slideInformationContainer.appendChild(slideAuthor);
}




function addSlideControllerElem() {
    const slideController = document.createElement('div');
    slideController.classList.add('slideController');
    slideController.setAttribute('numSlide', `${j}`);
    slidesControllerContainer.appendChild(slideController);

    /*onSlideControllerClick();*/
}

function onSlideControllerClick() {
    const slidesControllersElements = document.getElementsByClassName('slideController');
    for (let slideController of slidesControllersElements) {
        slideController.onclick = () => {
            const numOfNewSlide = slideController.getAttribute('numSlide');
            setSlide(+numOfNewSlide + 1);
        };
    }
}

function setSlide(num) {
    num--;

    const oldSlide = document.getElementsByClassName('activeSlide');
    const newSlide = document.querySelectorAll(`numSlide="${num}"`)
}

/*
function setSlide(num) {

    num--;

    imgSliderElem.src = dataSlides[num].href;

    imgSliderElem.onerror = () => {
        imgSliderElem.src = noneSlide;
    };

    pElem.innerText = dataSlides[num].description || '';
    h6Elem.innerText = dataSlides[num].name || '';


    const slidesControllersElements = document.getElementsByClassName('slideController');
    for (let slideController of slidesControllersElements) {
        slideController.classList.remove('activeSlide');
        if (+slideController.getAttribute('numSlide') === num) {
            slideController.classList.add('activeSlide');
        }
    }

}
*/


let isStarted = false;

let animation = true;

testimonials.onmouseover = function(e) {
    e.stopPropagation();
    animation = false;
};

testimonials.onmouseleave = function (e) {
    e.stopPropagation();
    animation = true;
    sliderObserver(1);
};


function sliderObserver(num) {
    if (!isStarted) {
        setInterval( () => {
            if (!animation) {
                return;
            }
            if (num === dataSlides.length) {
                num = 0;
            }
            num++;
            setSlide(num)
        },5000);
        isStarted = true;
    }

}