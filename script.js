let modalQt = 1;

const selecionar = (el) =>{
    return document.querySelector(el);
}

const selecionarTudo = (el) => {
    return document.querySelectorAll(el);
}

//Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = selecionar('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    //Adicionando o nome
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;

        selecionar('.pizzaBig img').src = pizzaJson[key].img
        selecionar('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selecionar('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        selecionar('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price}`;
        selecionar('.pizzaInfo--size.selected').classList.remove('selected');
        selecionarTudo('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];    
        })
        
        selecionar('.pizzaInfo--qt').innerHTML = modalQt;

        selecionar('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            selecionar('.pizzaWindowArea').style.opacity = 1;
        }, 200)
        selecionar('.pizzaWindowArea').style.display = 'flex'
    })

     

    //Preencher as informações em pizzaItem

    selecionar('.pizza-area').append(pizzaItem);
});

//Eventos do modal
function closeModal(){
    selecionar('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        selecionar('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

selecionarTudo('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

selecionar('pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        selecionar('.pizzaInfo--qt').innerHTML = modalQt;
    }
    
});
selecionar('pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    selecionar('.pizzaInfo--qt').innerHTML = modalQt;
});     

selecionarTudo('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        selecionar('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});
