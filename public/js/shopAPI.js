const contentDOM = document.querySelector('.content');
const companyDOM = document.getElementById('company');
const PriceDOM = document.querySelector('.prices');
const onChangeDOM = document.querySelector('.onchange');
const onChangeRatingDOM = document.querySelector('.onchangeRating');
const RatingDOM = document.querySelector('.rating');
const btnDOM = document.querySelector('.submit-btn');
const onchangeNameDOM = document.querySelector('.onchangeName');
const NameDOM = document.querySelector('.name');

const showProducts = async () => {
    try {
        const 
        { 
            data: { 
                products
            }
        } = await axios.get('/api/v01/shop/static');
        const showAllProducts = products.map((product) => {
            const { _id: taskID, name, company, price, phone, rating, createdAt, featured } = product;
            const change = createdAt.substring(0, createdAt.length - 14);
            return `
            <div class="single-product">
                <img src="./images/${phone}.jpg"/>
                <div class="kids">
                <a class="an" href="../../profile.html?id=${taskID}">
                        <h4>Phone Model: ${name}</h4>
                    </a>
                    <h4>Made by ${company}</h4>
                    <h4>Created At: ${change}</h4>
                    <h4>Featured: ${featured}</h4>
                    <h4>
                        <span class="span">
                            Rating: <b>${rating}</b> 
                        </span>
                        </br>
                        <span>
                            Price: <b>${price}$</b>
                        </span>
                    </h4>
                </div>
            </div>
            `
        }).join('');
        contentDOM.innerHTML = showAllProducts;
    } catch (error) {
        localStorage.removeItem('token');
        contentDOM.innerHTML = '<h4>There was an Error, please try again later..</h4>';
    }
}
showProducts();

btnDOM.addEventListener('click', async (e) => {
    e.preventDefault();
    let value = companyDOM.value;
    try {
        const { 
            data: { products }
        } = await axios.get(`/api/v01/shop?company=${value}`);
        const showAllProducts = products.map((product) => {
            const { _id: taskID, name, company, price, phone, rating, createdAt, featured } = product;
            const change = createdAt.substring(0, createdAt.length - 14);
            return `
            <div class="single-product">
                <img src="./images/${phone}.jpg"/>
                <div class="kids">
                <a class="an" href="../html/profile.html?id=${taskID}">
                        <h4>Phone Model: ${name}</h4>
                    </a>
                    <h4>Made by ${company}</h4>
                    <h4>Created At: ${change}</h4>
                    <h4>Featured: ${featured}</h4>
                    <h4>
                        <span class="span">
                            Rating: <b>${rating}</b> 
                        </span>
                        </br>
                        <span>
                            Price: <b>${price}$</b>
                        </span>
                    </h4>
                </div>
            </div>
            `
        }).join('');
        contentDOM.innerHTML = showAllProducts;
    } catch (error) {
        contentDOM.innerHTML = '<h4>There was an Error, please try again later..';
    }
});


onChangeDOM.addEventListener('change', async (e) => {
    e.preventDefault();
    try {
        let priceVal = PriceDOM.value;
        let value;
        if (priceVal === 'high'){
            value = '-price';
        }else if (priceVal === 'low'){
            value = 'price';
        }
        const { 
            data: 
            { products }
        } = await axios.get(`/api/v01/shop?sort=${value}`);
        const showAllProducts = products.map((product) => {
            const { _id: taskID, name, company, price, phone, rating, createdAt, featured } = product;
            const change = createdAt.substring(0, createdAt.length - 14);
            return `
            <div class="single-product">
                <img src="./images/${phone}.jpg"/>
                <div class="kids">
                <a class="an" href="../html/profile.html?id=${taskID}">
                        <h4>Phone Model: ${name}</h4>
                    </a>
                    <h4>Made by ${company}</h4>
                    <h4>Created At: ${change}</h4>
                    <h4>Featured: ${featured}</h4>
                    <h4>
                        <span class="span">
                            Rating: <b>${rating}</b> 
                        </span>
                        </br>
                        <span>
                            Price: <b>${price}$</b>
                        </span>
                    </h4>
                </div>
            </div>
            `
        }).join('');
        contentDOM.innerHTML = showAllProducts;
    } catch (error) {
        console.log(error)
    }
});


onChangeRatingDOM.addEventListener('change', async (e) => {
    e.preventDefault();
    try {
        let ratingVal = RatingDOM.value;
        let value;
        if (ratingVal === 'high'){
            value = '-rating';
        }else if (ratingVal === 'low'){
            value = 'rating';
        }
        const { 
            data: 
            { products }
        } = await axios.get(`/api/v01/shop?sort=${value}`);
        const showAllProducts = products.map((product) => {
            const { _id: taskID, name, company, price, phone, rating, createdAt, featured } = product;
            const change = createdAt.substring(0, createdAt.length - 14);
            return `
            <div class="single-product">
                <img src="./images/${phone}.jpg"/>
                <div class="kids">
                <a class="an" href="../html/profile.html?id=${taskID}">
                        <h4>Phone Model: ${name}</h4>
                    </a>
                    <h4>Made by ${company}</h4>
                    <h4>Created At: ${change}</h4>
                    <h4>Featured: ${featured}</h4>
                    <h4>
                        <span class="span">
                            Rating: <b>${rating}</b> 
                        </span>
                        </br>
                        <span>
                            Price: <b>${price}$</b>
                        </span>
                    </h4>
                </div>
            </div>
            `
        }).join('');
        contentDOM.innerHTML = showAllProducts;
    } catch (error) {
        console.log(error)
    }
});

onchangeNameDOM.addEventListener('change', async (e) => {
    e.preventDefault();
    try {
        let ratingVal = NameDOM.value;
        let value;
        if (ratingVal === 'a-z'){
            value = 'name';
        }else if (ratingVal === 'z-a'){
            value = '-name';
        }
        const { 
            data: 
            { products }
        } = await axios.get(`/api/v01/shop?sort=${value}`);
        const showAllProducts = products.map((product) => {
            const { _id: taskID, name, company, price, phone, rating, createdAt, featured } = product;
            const change = createdAt.substring(0, createdAt.length - 14);
            return `
            <div class="single-product">
                <img src="./images/${phone}.jpg"/>
                <div class="kids">
                    <a class="an" href="../html/profile.html?id=${taskID}">
                        <h4>Phone Model: ${name}</h4>
                    </a>
                    <h4>Made by ${company}</h4>
                    <h4>Created At: ${change}</h4>
                    <h4>Featured: ${featured}</h4>
                    <h4>
                        <span class="span">
                            Rating: <b>${rating}</b> 
                        </span>
                        </br>
                        <span>
                            Price: <b>${price}$</b>
                        </span>
                    </h4>
                </div>
            </div>
            `
        }).join('');
        contentDOM.innerHTML = showAllProducts;
    } catch (error) {
        console.log(error)
    }
});