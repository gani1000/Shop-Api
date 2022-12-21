
const productsRecived = document.querySelector('.content-recived');
const incrementPriceDOM = document.querySelector('.increment');
const decrementPriceDOM = document.querySelector('.decrement');
const amountDOM = document.querySelector('.amount');
const btnFirst = document.querySelector('.first-btn');
const num = document.querySelector('.number');
const iconNumDOM = document.querySelector('.num-icon');
const greetingDOM = document.querySelector('.greeting');
const mainDOMProfile = document.querySelector('.calculator');
const alertDOM = document.querySelector('.alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');


const show = async () => {
    try {
        alertDOM.style.display = 'none';
        const token = localStorage.getItem('token');
        const { data: { products } } = await axios.get(`/api/v01/shop/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const nameuser = localStorage.getItem('name');
        const { name, rating, createdAt, price, phone, company, featured } = products;
        const change = createdAt.substring(0, createdAt.length - 14);
        const temp = `
        <h2 class="username">Hello, ${nameuser}</h2>
        <div class="single-product">
            <img src="../images/${phone}.jpg" class="img-profile"/>
            <div class="kids">
                <h4>Phone Model: ${name}</h4>
                <h4>Made by ${company}</h4>
                <h4>Created At: ${change}</h4>
                <h4>Featured: ${featured}</h4>
                <h4>
                    <span class="span">
                        Rating: <b>${rating}</b> 
                    </span>
                    </br>
                    Price: <b class="price">${price}</b>$
                </h4>
            </div>
        </div>`;
        addBtns(price);
        iconNumber();
        productsRecived.innerHTML = temp;
    } catch (error) {
        mainDOMProfile.style.display = 'none';
        alertDOM.style.display = 'block';
        greetingDOM.innerHTML = '<h2>register or sign up, to have access to your account!</h2>';
    }
}
show();

const iconNumber = () => {
    let x = 0;
    btnFirst.addEventListener('click', () => {
        let checkValidToAdd = num.innerHTML.valueOf(num);
        if (checkValidToAdd > 0) {
            x += 1;
            iconNumDOM.innerHTML = x;
        }
    });
}


const addBtns = (price) => {
    amountDOM.textContent = ` Total Price: ${price}$`;
    num.textContent = 1;
    let total = 0;
    let x = 0;
    incrementPriceDOM.addEventListener('click', (event) => {
        event.preventDefault();
        x += 1;
        num.textContent = x;
        total += price;
        amountDOM.textContent = ` Total Price: ${total}$`;
    });
    decrementPriceDOM.addEventListener('click', (event) => {
        event.preventDefault();
        if (total > 0) {
            x -= 1;
            num.textContent = x;
            total -= price;
        }
        amountDOM.textContent = ` Total Price: ${total}$`;
    });
}



function send() {
    window.location.href = 'http://localhost:7000/login.html';
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = 'http://localhost:7000/shopAPI.html';
}

function shopAPI() {
    window.location.href = 'http://localhost:7000/shopAPI.html';
}

