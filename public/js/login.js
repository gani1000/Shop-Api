/* fields */
const btnLoginDOM = document.querySelector('.btn-login');
const loginFormDOM = document.querySelector('.login');
const emailDOM = document.querySelector('.email');
const passwordDOM = document.querySelector('.password');
const formAlert = document.querySelector('.formAlert');

const navigate = () => {
    window.location.href = 'http://localhost:7000/shopAPI.html';
}

loginFormDOM.addEventListener('submit', async (e) => {
   
    e.preventDefault()
    let email = emailDOM.value;
    let password = passwordDOM.value;

    if (!email || !password) {
        formAlert.innerHTML = 'please provide Email and password!'
    }
    try {
        const { data } = await axios.post('/api/v01/auth/login', { 
            email,
            password
        });
        emailDOM.value = '';
        passwordDOM.value = '';
        formAlert.style.display = 'block';
        formAlert.style.color = 'green';

        /* set the token into localstorage */
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user.name);

        formAlert.innerHTML = 'login...';
        formAlert.classList.add('text');
        navigate();
    } catch (error) {
        if (email && password){
            console.log(error);
            formAlert.style.display = 'block';
            formAlert.style.color = 'red';
            formAlert.innerHTML = 'Invalid credentials!';
        }
    }
    setTimeout(() => {
        formAlert.innerHTML = '';
        formAlert.classList.remove('text');
    }, 10000);
});