async function resposta(){
    const resposta = await axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    console.log(resposta)
}

// resposta()


window.addEventListener('resize', responsive_layout)
const $container = document.querySelector('.container')
const $header = document.querySelector('.header')
const $box_input = document.querySelector('.box_input')

function responsive_layout(){
    let width = window.screen.width;
    
    if(width <= 550){
        $container.style.width = `${width}px`;
        $header.style.width = `${width}px`;
        $box_input.style.width = `${width}px`;
    }
    // console.log(`width: ${width} e height: ${height}`)
}