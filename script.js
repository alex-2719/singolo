window.onload = function (){
    console.log("js begin");
 
    createHeaderMenuItemHandler();

    createSliderButtonHandler();

    createPortfolioFilterItemHandler();
    createPortfolioImageItemHandler();

    document.querySelector('#contact-form').addEventListener('submit', (event) => sendContactForm(event))};

const createHeaderMenuItemHandler = ()=>{
    document.querySelector("nav .header_links").addEventListener('click', (event)=>{
        if (event.target.classList.contains('link_a')){
            let selectedItem = event.target;
            removeItemActiveClass(".header_links .link_a",'active');
            addItemActiveClass(selectedItem, 'active');
        }
    });
}

const createSliderButtonHandler = () => {
    const slider_section = document.querySelector('.img-slider');
    slider_section.addEventListener('click',(event) => {
        if (event.target.offsetParent.classList.contains('btn_prev') || 
            event.target.offsetParent.classList.contains('btn_next')){
            changeSlide(slider_section);

        }
        if (event.target.classList.contains('images')){
            event.target.classList.toggle('screen-black');
        }
    });
}

const createPortfolioFilterItemHandler = ()=>{
    document.querySelector(".portfolio .filter").addEventListener('click', (event)=>{
        if (event.target.classList.contains('f_button')){
            let selectedItem = event.target;
            removeItemActiveClass(".portfolio .f_button",'active');
            addItemActiveClass(selectedItem, 'active');
            movePortfolioImages();
        }
        
    });
}
const createPortfolioImageItemHandler = ()=>{
    document.querySelector(".portfolio .portfolio_images").addEventListener('click', (event)=>{
        console.log(event.target);
        if (event.target.classList.contains('image')){
            let selectedItem = event.target;
            removeItemActiveClass(".portfolio_images .portfolio_image img",'active');
            addItemActiveClass(selectedItem, 'active');
        }
        
    });
}

const sendContactForm = (event) => {
    messageFormShow(parseForm());
    event.preventDefault();
}
const removeItemActiveClass = (selector,activeClass)=>{
    const items = document.querySelectorAll(selector);
    items.forEach((item)=>{
        item.classList.remove(activeClass);
    });
}

const addItemActiveClass = (selectedItem,activeClass)=>{
    selectedItem.classList.add(activeClass);
}

const addItemActionClick = (selectedItem,action)=>{
    selectedItem.click = action;
}

const changeSlide = (slider_section) => {
    let slider = slider_section.querySelector('.slider');
    slider_section.classList.toggle('blue');
    if (slider.children.length === 2){
        slider.innerHTML = '';
        slider.innerHTML ='<img class="image-slider2" src="assets/slider2.svg" alt="image 3">';
    }else {
        slider.innerHTML = '';
        slider.innerHTML ='<img class="images vertical" src="assets/phone.png" alt="img1" >' +
                          '<img class="images horizontal" src="assets/phone.png" alt="img2" >';
    }
    
}

const movePortfolioImages = ()=>{
    const images = document.querySelectorAll('.portfolio .portfolio_image');
    let portfolioImages = document.querySelector('.portfolio .portfolio_images');
    let keys = Object.keys(images);
    keys.sort(()=>(Math.random() - 0.5));
    portfolioImages.innerHTML= '';
    for (let i =0 ; i< images.length; i++){
        portfolioImages.appendChild(images[keys[i]]);
    }


}

const parseForm = () => {
    let result = '<h3>Письмо отправлено</h3>'
    const subject = document.querySelector('#subject').value;
    const description = document.querySelector('#detail').value;
    
    result += subject ? `<div> <span>Тема:</span>${subject} </div>`:`<div><span></span> Без темы</div>`;
    result += description ? `<div> <span>Описание:</span>${description} </div>`:`<div><span></span> Без описания</div>`;
    return result;
}

const messageFormShow = (message) => {

    document.querySelector('#message-form').classList.toggle('hidden');
    document.querySelector('#message .detail').innerHTML = message;
    document.querySelector('#message .btn-close').onclick = () => {
        document.querySelector('#message-form').classList.toggle('hidden');
        document.querySelector('#message .detail').innerHTML = '';
        document.querySelector('#contact-form').reset();

    };
}



