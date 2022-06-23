// ----------------------------------------------------------------------------------------------------------------- //

window.addEventListener('resize', responsive_layout);
const $container = document.querySelector('.container');
const $header = document.querySelector('.header');
const $box_input = document.querySelector('.box_input');
const $box_output = document.querySelector('.box_output');

// ----------------------------------------------------------------------------------------------------------------- //

// set_participant('titã de ataque')
// setInterval(set_participant('titã de ataque', 3000))
get_messages()
setInterval(get_messages, 3000)
setInterval(last_card_scrollIntoView, 3000)



// ----------------------------------------------------------------------------------------------------------------- //


function set_participant(name){

    let object_name = {
        name: name
    }
    
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', object_name)
    promise.then(feedback_sucess)
    promise.catch(feedback_error)
}


function feedback_sucess(){
    console.log('Requisição feita com sucesso!')
}
function feedback_error(e){
    alert(e)
}


function get_messages(){
    
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(feedback_sucess)
    promise.then(set_messages_in_box_output)
    promise.catch(feedback_error)
}

function set_messages_in_box_output(promise){

    let data = promise.data
    
    $box_output.innerHTML = '';


    for(let i = 0; i < data.length; i++){

        if(data[i].type === 'status'){
            let mensagem = 
            `<div class="card status">
                <div class="time_card"> ${data[i].time} </div>
                <div class="tittle_card"> <strong>${data[i].from}</strong> ${data[i].text} </div>
            </div>`;
            
            $box_output.innerHTML += mensagem
            
        }

        else if(data[i].type === 'message'){
            $box_output.innerHTML += 
            `<div class="card message">
                <div class="time_card"> ${data[i].time} </div>
                <div class="tittle_card"> <strong>${data[i].from}</strong> </div> 
                <div class="text_card"> ${data[i].text} </div>
            </div>`;
        }

        else if(data[i].type === 'private_message'){
            $box_output.innerHTML += 
            `<div class="card private_message">
                <div class="time_card"> ${data[i].time} </div>
                <div class="tittle_card"> <strong>${data[i].from}</strong> </div>
                <div class="text_card"> ${data[i].text} </div>
            </div>`;
        }
    }
}

function last_card_scrollIntoView(){
    let $cards = document.getElementsByClassName('card');
    $cards = [...$cards]
    let last_card = $cards.length - 1;
    $cards[last_card].scrollIntoView()
}


function responsive_layout(){
    let width = window.screen.width;
    
    if(width <= 550){
        $container.style.width = `${width}px`;
        $header.style.width = `${width}px`;
        $box_input.style.width = `${width}px`;
    }
}
// ----------------------------------------------------------------------------------------------------------------- //
