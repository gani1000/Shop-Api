/* fields */
const btnLoginDOM = document.querySelector('.btn-login');
const loginFormDOM = document.querySelector('.login');
const userNameDOM = document.querySelector('.name');
const emailDOM = document.querySelector('.email');
const passwordDOM = document.querySelector('.password');
const formAlert = document.querySelector('.formAlert');

const navigate = () => {
    setTimeout(() => {
        window.location.href = 'http://localhost:7000/login.html';
    }, 1000);
}

loginFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    let user = userNameDOM.value;
    let email = emailDOM.value;
    let password = passwordDOM.value;

    try {
        await axios.post('/api/v01/auth/register', { 
            name: user, 
            email: email, 
            password: password 
        });
        userNameDOM.value = '';
        emailDOM.value = '';
        passwordDOM.value = '';
        formAlert.style.diplay = 'block';
        formAlert.style.color = 'green'
        formAlert.innerHTML = 'seccuess, you registerd!';
        formAlert.classList.add('text-seccuss');
        navigate();
    } catch (error) {
        formAlert.style.diplay = 'block';
        formAlert.innerHTML = 'this user already resgisterd!';       
    }
    setTimeout(() => {
        formAlert.innerHTML = '';
        formAlert.classList.remove('text-seccuss');
    }, 2000);
});
