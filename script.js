// ----------------------------------------------------------------------------------------------------------------- //

const $container = document.querySelector('.container');
const $header = document.querySelector('.header');
const $box_input = document.querySelector('.box_input');
const $box_output = document.querySelector('.box_output');
const $input_message = document.querySelector('.input_message')
const $div_arrow_icon = document.querySelector('.div_arrow_icon')
const $person_icon = document.querySelector('.person_icon')
const $menu = document.querySelector('.menu')
const $users_menu = document.querySelector('.users_menu')
const $dark_background = document.querySelector('.dark_background')

const $choice_public = document.getElementsByClassName('choice_public')[0]
const $choice_private = document.getElementsByClassName('choice_private')[0]
const $item_send_to_all = document.getElementById('item_send_to_all')
let box_user = [$item_send_to_all]
let users;





// ----------------------------------------------------------------------------------------------------------------- //


window.addEventListener('resize', responsive_layout);
window.addEventListener('load', responsive_layout)
$div_arrow_icon.addEventListener('click', send_message_click)
$input_message.addEventListener('keyup', send_message_enter)
$person_icon.addEventListener('click', menu)
$dark_background.addEventListener('click', exit_menu)
// box_user.map( item => item.addEventListener('click', box_user_checked ))
$choice_private.addEventListener('click', box_visibility_checked)
$choice_public.addEventListener('click', box_visibility_checked)



function responsive_layout(){
    let width = window.screen.width;
    
    if(width <= 550){
        $container.style.width = `${width}px`;
        $header.style.width = `${width}px`;
        $box_input.style.width = `${width}px`;
    }
}
function send_message_click(){
    let text = $input_message.value;
        
            let message = {
                from: user,
                to: "Todos",
                text: text,
                type: "message" // ou "private_message" para o bônus
            }
            let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
            promise.then(feedback_sucess)
            promise.catch(feedback_error)
            promise.catch(update_window)
    
            $input_message.value = ''
}
function send_message_enter(e){

    let key = e.which || e.keyCode;
    if (key ===  13) { 
        let text = $input_message.value;
    
        let message = {
            from: user,
            to: "Todos",
            text: text,
            type: "message" // ou "private_message" para o bônus
        }
        let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
        promise.then(feedback_sucess)
        promise.catch(feedback_error)
        promise.catch(update_window)

        $input_message.value = ''
    }
}

function menu(){
    $menu.style.opacity = '1'
    $menu.style.transform = 'translateX(-0%)';
    $dark_background.style.opacity = '1'
    $dark_background.style.zIndex = '1'
}
function exit_menu(){
    $dark_background.style.opacity = '0'
    $dark_background.style.zIndex = '-1'
    $menu.style.transform = 'translateX(100%)';
    $menu.style.opacity = '1';
}

function item_checked(e){
    
    let box_item = convert_box_item_in_object(e.currentTarget)
    let checked = convert_box_item_in_object(box_item.div_checked)


    

    if(checked.simbol.style.opacity ==  ''){
        checked.simbol.style.opacity = '1';
        box_item.classList.add('selected');
    }
    else if(checked.simbol.style.opacity == '0'){
        checked.simbol.style.opacity = '1';
        box_item.classList.add('selected');
    }
    else if(checked.simbol.style.opacity == '1'){
        checked.simbol.style.opacity = '0';
        box_item.classList.remove('selected')
    }
}



function box_visibility_checked(e){


    let box_item = e.currentTarget
    let icon = get_icon_from_box_item(box_item)

    let icon_choice_private = get_icon_from_box_item($choice_private)

    let icon_choice_public = get_icon_from_box_item($choice_public)
   
 
    if($choice_private.classList.contains('selected') || $choice_public.classList.contains('selected')){
        console.log('first if')

        if($choice_private.classList.contains('selected')){
            console.log('second if')
            
            $choice_private.classList.remove('selected')
            icon_choice_private.style.opacity = '0';

            box_item.classList.add('selected')
            icon.style.opacity = '1'
        }
        else if($choice_public.classList.contains('selected')){
            console.log('else if')

            $choice_public.classList.remove('selected')
            icon_choice_public.style.opacity = '0';

            box_item.classList.add('selected')
            icon.style.opacity = '1'
        }
    }
    else{
        console.log('else')
        icon.style.opacity = '1'
        box_item.classList.add('selected')
    }
}



// ----------------------------------------------------------------------------------------------------------------- //


let user;
set_user()
get_messages()
get_users()
setTimeout(get_itens_in_box_user, 1000)
add_checked_event_to_box_visibility()
// add_event_to_box_item()
setInterval(keep_user_online, 5000)
setInterval(get_messages, 3000)
setInterval(get_users, 10000)
setInterval(get_itens_in_box_user, 10000)
// setInterval(add_event_to_itens_menu, 10000)
setInterval(last_card_scrollIntoView, 3000)


// ----------------------------------------------------------------------------------------------------------------- //


function set_user(){

    user = prompt('Qual o seu lindo nome?')

    let object_name = {
        name: user
    }
    
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', object_name)
    promise.then(feedback_sucess)
    promise.catch(feedback_error)
    promise.catch(set_user)
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
                <div class="tittle_card"> <strong>${data[i].from}</strong> para <strong>${data[i].to}:</strong> </div> 
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


function keep_user_online(){
    let object_name = {
        name: user
    }
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', object_name)
    promise.then(feedback_sucess)
    promise.catch(feedback_error)
}


function get_users(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(feedback_sucess)
    promise.then(show_users)
    promise.catch(feedback_error)
}


function show_users(promise){
    let data = promise.data
    
    $users_menu.innerHTML = '';
    for(let i = 0; i < data.length; i++){

        $users_menu.innerHTML += 
        `<div class="box_item">
            <div class="item">
                <img class="user_icon" src="./imagens/user.png" alt="User icon">
                <p>${data[i].name}</p>
            </div>

            <div class="box_checked_simbol">
                <img class="checked_simbol" src="./imagens/checked.png" alt="Checked simbol">
            </div>
        </div>`;
    }
}


function get_itens_in_box_user(){

    let $users_menu = document.getElementsByClassName('users_menu')
    $users_menu = convert_htmlCollection_in_array($users_menu)[0]
    
    users = get_children_from($users_menu)

    box_user = [$item_send_to_all]

    users.map( user => box_user.push(user))
    console.log(box_user)
}


function last_card_scrollIntoView(){
    let $cards = document.getElementsByClassName('card');
    $cards = [...$cards]
    let last_card = $cards.length - 1;
    $cards[last_card].scrollIntoView()
}


function feedback_sucess(){
    console.log('Requisição feita com sucesso!')
}


function feedback_error(e){
    alert(e)
}


function update_window(){
    document.location.reload()
}


function get_elements_by_className(Class){

    let item = document.getElementsByClassName(Class)
    item = convert_htmlCollection_in_array(item)

    return item;
}


function convert_htmlCollection_in_array(html_collection){

    let array = [...html_collection]
    return array;
}

// function get_children_from_box_item(box){

//     box = get_children_from(box)

//     let object = {}
//     if(box.length === 2){
//         object.item = box[0]
//         object.div_checked = box[1]
//     }
//     else if( box.length === 1){
//         object.checked = box[0]
//     }

//     return object;
// }

function get_children_from(item){

    item = item.children
    item = convert_htmlCollection_in_array(item)
    return item;
}

function get_icon_from_box_item(box){

    box = get_children_from(box)

    let div_checked = box[1]

    let icon_checked = get_children_from(div_checked)

    return icon_checked[0];
}
// ----------------------------------------------------------------------------------------------------------------- //
