let btn = document.querySelector('.btn-js');

btn.addEventListener('click', () => {
    let widthScreen = window.innerWidth;
    let heightScreen = window.innerHeight;
    alert(`${widthScreen} + ${heightScreen}`)
})