//Khai báo biến
var Sign = document.getElementById('Sign');
var SignForm = document.getElementById('SignForm');
var RegisterForm = document.getElementById('RegisterForm');
var SignFormRegister = document.getElementById('SignForm-register');
var RegisterFormLogin = document.getElementById('RegisterForm-login');
var SignFormClose = document.getElementById('SignForm-close');
var RegisterFormClose = document.getElementById('RegisterForm-close');
var overlay = document.getElementById('overlay');
var SignSubmit = document.getElementById('SignForm-submit');
var RegisterSubmit = document.getElementById('RegisterForm-submit');
var Search = document.getElementById('search');
var Cart = document.getElementById('Cart');
var username = document.getElementById('txtUsername').value;
var password = document.getElementById('txtPassword').value;
var rusername = document.getElementById('txtRUsername').value;
var rpassword = document.getElementById('txtRPassword').value;
var rpassword2 = document.getElementById('txtRPassword2').value;


// <---------------<DANG NHAP/DANG KY>----------------->

//Khai báo
var accountStatus = localStorage.getItem('accountStatus');
var afterSign = document.getElementById('afterSign');
var afterSignAdmin = document.getElementById('afterSignAdmin');
var afterSignClose = document.getElementById('afterSign-close');
var afterSignAdminClose = document.getElementById('afterSign-admin-close');

//Đăng nhập đăng kí click event
afterSignClose.addEventListener('click', hideAfterSign);
afterSignAdminClose.addEventListener('click', hideAfterSign);
Sign.addEventListener('click', showSignForm);
SignFormRegister.addEventListener('click', showRegisterForm);
RegisterFormLogin.addEventListener('click', showSignForm);
SignFormClose.addEventListener('click', closeSignForm);
RegisterFormClose.addEventListener('click', closeRegisterForm);

//Đăng nhập, đăng ký tất tần tật
function showSignForm() {
    SignForm.style.display = 'block';
    RegisterForm.style.display = 'none';
    CartForm.style.display = 'none';
    overlay.style.display = 'block';
    SearchBar.style.display = 'none';
}

function showRegisterForm() {
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'block';
    overlay.style.display = 'block';
}

function closeSignForm() {
    SignForm.style.display = 'none';
    overlay.style.display = 'none';
}

function closeRegisterForm() {
    RegisterForm.style.display = 'none';
    overlay.style.display = 'none';
}

function validateSignForm() {
    var username = document.getElementById('txtUsername').value;
    var password = document.getElementById('txtPassword').value;
    if (username == '' || password == '') {
        toast({ title: 'Thất bại', message: 'Vui lòng điền đầy đủ thông tin !', type: 'warning', duration: 3000 });
        return false;
    }
    return true;
}

function validateRegisterForm() {
    var rname = document.getElementById('txtRName').value;
    var rusername = document.getElementById('txtRUsername').value;
    var rpassword = document.getElementById('txtRPassword').value;
    var rpassword2 = document.getElementById('txtRPassword2').value;
    var rcheckbox = document.getElementById('checkbox-signup').checked;
    if (rname == '' || rusername == '' || rpassword == '' || rpassword2 == '') {
        toast({ title: 'Thất bại', message: 'Vui lòng điền đầy đủ thông tin !', type: 'warning', duration: 3000 });
        return false;
    }
    else if (rpassword != rpassword2) {
        toast({ title: 'Thất bại', message: 'Mật khẩu không khớp !', type: 'error', duration: 3000 });
        rpassword2 = '';
        document.getElementById('txtRPassword2').focus();
        return false;
    }
    else if (!rcheckbox) {
        toast({ title: 'Thất bại', message: 'Vui lòng đồng ý điều khoản !', type: 'error', duration: 3000 });
        return false;
    }
    return true;
}

//Lưu tài khoản vào mảng accounts trên local storage
function saveAccountToLocalStorage(name, username, password) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push({ name, username, password, role: 'user', status: 'active' });
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function checkLogin(username, password) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    if(!accounts.some(account => account.username === username)){
        toast({ title: 'Thất bại', message: 'Tài khoản không tồn tại !', type: 'error', duration: 3000 });
    }
    else{
        if(accounts.some(account => account.password === password)){
            return true;
        }
        toast({ title: 'Thất bại', message: 'Sai mật khẩu !', type: 'error', duration: 3000 });
    }
}

RegisterSubmit.addEventListener('click', function(event) {
    if (validateRegisterForm()) {
        event.preventDefault();
        let rname = document.getElementById('txtRName').value;
        let rusername = document.getElementById('txtRUsername').value;
        let rpassword = document.getElementById('txtRPassword').value;
        if(isAccountExist(rusername)){
            toast({ title: 'Thất bại', message: 'Tài khoản đã tồn tại !', type: 'error', duration: 3000 });
            document.getElementById('txtRUsername').value = '';
            document.getElementById('txtRPassword').value = '';
            document.getElementById('txtRPassword2').value = '';
            document.getElementById('txtRUsername').focus();
        }
        else{
            saveAccountToLocalStorage(rname, rusername, rpassword);
            toast({ title: 'Thành công', message: 'Tạo tài khoản thành công !', type: 'success', duration: 3000 });
            closeRegisterForm();
        }
    }
});

SignSubmit.addEventListener('click', function(event) {
    if (validateSignForm()) {
        event.preventDefault();
        let username = document.getElementById('txtUsername').value;
        let password = document.getElementById('txtPassword').value;
        let role = getAccountRole(username);
        if (checkLogin(username, password)) {
            if(getAccountStatus(username) == 'active'){
                if(getAccountRole(username) == 'admin'){
                    toast({ title: 'Thành công', message: 'Đăng nhập thành công !', type: 'success', duration: 3000 });
                    closeSignForm();
                    setCurrentUser(username, password, role);
                    Sign.removeEventListener('click', showSignForm);
                    SignReS.removeEventListener('click', showSignForm);
                    Sign.addEventListener('click', showAfterSignAdmin);
                    SignReS.addEventListener('click', showAfterSignAdmin);
                    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
                    let name = accounts.find(account => account.username === username).name;
                    document.getElementById('afterSign-admin-username').textContent = name;
                }
                else if(getAccountRole(username) == 'user'){
                    toast({ title: 'Thành công', message: 'Đăng nhập thành công !', type: 'success', duration: 3000 });
                    closeSignForm();
                    setCurrentUser(username, password, role);
                    Sign.removeEventListener('click', showSignForm);
                    SignReS.removeEventListener('click', showSignForm);
                    Sign.addEventListener('click', showAfterSign);
                    SignReS.addEventListener('click', showAfterSign);
                    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
                    let name = accounts.find(account => account.username === username).name;
                    document.getElementById('afterSign-username').textContent = name;
                }
            }
            else if(getAccountStatus(username) == 'block'){
                toast({ title: 'Thất bại', message: 'Tài khoản đã bị khóa !', type: 'error', duration: 3000 });
            }
        }
        username = '';
        password = '';
    }
});

//Hàm kiểm tra role của tài khoản khi đăng nhập
function getAccountRole(username) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let account = accounts.find(account => account.username === username);
    return account ? account.role : null;
}

//Hàm status làm để check tài khoản hoạt động hay bị khóa
function getAccountStatus(username) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let account = accounts.find(account => account.username === username);
    return account ? account.status : null;
}

//Hiển thị thông tin (User) sau khi đăng nhập 
function showAfterSign(){
    if (afterSign.style.display === 'block'){
        hideAfterSign();
        return;
    }
    afterSign.style.display = 'block';
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'none';
    overlay.style.display = 'block';
    CartForm.style.display = 'none';
}

//Hiển thị thông tin (Admin) sau khi đăng nhập
function showAfterSignAdmin(){
    if (afterSignAdmin.style.display === 'block'){
        hideAfterSign();
        return;
    }
    afterSignAdmin.style.display = 'block';
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'none';
    overlay.style.display = 'block';
    CartForm.style.display = 'none';
}

function hideAfterSign(){
    afterSign.style.display = 'none';
    overlay.style.display = 'none';
    afterSignAdmin.style.display = 'none';
}

function isAccountExist(username) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    return accounts.some(account => account.username === username);
}

//Khởi tạo sẽ reset currentUser tức là phải đăng nhập lại sau khi F5
// localStorage.removeItem('currentUser');

// function clearAccountsFromLocalStorage() {
//     localStorage.removeItem('accounts');
//     toast({ title: 'Thông báo', message: 'Đã xóa toàn bộ tài khoản !', type: 'info', duration: 3000 });
// } Cái hàm này là xóa hết account trong local storage nếu cần vd như bấm nút tự hủy web

//Hàm lưu tài khoản đang đăng nhập vào currentUser
function setCurrentUser(username, password, role) {
    let currentUser = { username, password, role };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

//Nút đăng xuất
let logOut = document.getElementById('afterSign-logout');
logOut.addEventListener('click', function(){
    localStorage.removeItem('currentUser');
    afterSign.style.display = 'none';
    overlay.style.display = 'none';
    CartForm.style.display = 'none';
    SearchBar.style.display = 'none';
    Sign.removeEventListener('click', showAfterSign);
    SignReS.removeEventListener('click', showAfterSign);
    Sign.addEventListener('click', showSignForm);
    SignReS.addEventListener('click', showSignForm);
});

document.getElementById('afterSign-admin-logout').addEventListener('click', function(){
    localStorage.removeItem('currentUser');
    afterSignAdmin.style.display = 'none';
    overlay.style.display = 'none';
    CartForm.style.display = 'none';
    SearchBar.style.display = 'none';
    Sign.removeEventListener('click', showAfterSignAdmin);
    SignReS.removeEventListener('click', showAfterSignAdmin);
    Sign.addEventListener('click', showSignForm);
    SignReS.addEventListener('click', showSignForm);
});

// <---------------<DANG NHAP/DANG KY>----------------->

// <---------------<OVERLAY>----------------->

//Overlay
function closeOverlay() {
    overlay.style.display = 'none';
    RegisterForm.style.display = 'none';
    SignForm.style.display = 'none';
    CartForm.style.display = 'none';
    SearchBar.style.display = 'none';
    afterSign.style.display = 'none';
    afterSignAdmin.style.display = 'none';
    navRes.style.transform = 'translateX(100%)';
    navbar.style.transform = 'translateY(-100%)';
}
overlay.addEventListener('click', closeOverlay);

//Cái này để test thôi chớ không có gì
function test(){
    alert('Chức năng đang được phát triển!');
}

// <---------------<OVERLAY>----------------->

// <---------------<Products>----------------->

//Sản phẩm trong phần trang chính
let products = JSON.parse(localStorage.getItem('products')) || [];

function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart">Thêm vào giỏ hàng</button>
        `;
        productContainer.appendChild(productElement);
    });
}

displayProducts(products.slice(0, 12));

// <---------------<Products>----------------->

// <---------------<CART>----------------->

//Giỏ hàng và tất tần tật
var CartForm = document.getElementById('CartForm');

//Hàm kiểm tra đăng nhập để xem giỏ hàng
//currentUser là mảng ở local storage chứa thông tin tài khoản đang đăng nhập
// function checkLoginCart(){
//     if(localStorage.getItem('currentUser')){
//         return true;
//     }
//     return false;
// }

//Đóng giỏ hàng
var CartFormClose = document.getElementById('CartForm-close');
CartFormClose.addEventListener('click', function(event){
    CartForm.style.display = 'none';
    overlay.style.display = 'none';
});

//Nủt giỏ hàng trên thanh navbar
Cart.addEventListener('click', function(event){
    // if(checkLoginCart()){
    CartForm.style.display = 'block';
    overlay.style.display = 'block';
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'none';
    SearchBar.style.display = 'none';
    afterSign.style.display = 'none';
    displayCart(JSON.parse(localStorage.getItem('currentUser')).username);
    //}
    // else{
    //     toast({ title: 'Thất bại', message: 'Vui lòng đăng nhập để xem giỏ hàng !', type: 'error', duration: 3000 });
    // }
});

// Thêm sản phẩm vào giỏ hàng
//Hàm thêm sản phẩm vào giỏ hàng cho mỗi user kèm theo hàm check sản phẩm trùng sẽ chỉ xuất hiện 1 lần 
//Giỏ hàng chi tiết sẽ được thể hiện ở Cart.html

//Event click thêm sản phẩm vào giỏ hàng
// var addToCartButtons = document.querySelectorAll('.add-to-cart');
// function addToCartForUser(username, product) {
//     let userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
//     if (!userCarts[username]) {
//         userCarts[username] = [];
//     }
//     const existingProduct = userCarts[username].find(item => item.title === product.title);
//     if (existingProduct) {
//         existingProduct.quantity += 1;
//     } else {
//         product.quantity = 1;
//         userCarts[username].push(product);
//     }
//     localStorage.setItem('userCarts', JSON.stringify(userCarts));
// }

// addToCartButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // if (!checkLoginCart()) {
//         //     toast({ title: 'Thất bại', message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng !', type: 'error', duration: 3000 });
//         //     return;
//         // } else {
//             const product = button.parentElement;
//             const image = product.querySelector('img').src;
//             const title = product.querySelector('h3').innerText;
//             const price = product.querySelector('p').innerText;
//             const cartItem = { image, title, price };
//             addToCartForUser(JSON.parse(localStorage.getItem('currentUser')).username, cartItem);
//             // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//             // if (currentUser) {
//             //     addToCartForUser(currentUser.username, cartItem);
//                 toast({ title: 'Thành công', message: 'Đã thêm sản phẩm vào giỏ hàng !', type: 'success', duration: 3000 });
//             //}
//         //}
//     });
// });
// // Hiển thị sản phẩm được thêm vào CartForm
// function displayCart(username) {
//     const userCarts = JSON.parse(localStorage.getItem('userCarts'));
//     const cartItems = userCarts[username];
//     const cartContainer = document.getElementById('cartContainer');
//     cartContainer.innerHTML = '';
//     const displayedProducts = new Set();
//     cartItems.forEach(item => {
//         if (!displayedProducts.has(item.title)) {
//             const cartElement = document.createElement('div');
//             cartElement.className = 'cart-item';
//             cartElement.innerHTML = `
//                 <img src="${item.img}" alt="${item.name}">
//                 <h3>${item.name}</h3>
//                 <p>${item.price}</p>
//                 <button class="remove-from-cart">Xóa</button>
//             `;
//             cartContainer.appendChild(cartElement);
//             displayedProducts.add(item.title);

//             const removeButton = cartElement.querySelector('.remove-from-cart');
//             removeButton.addEventListener('click', function() {
//             removeFromCart(username, item.title);
//             displayCart(username);
//             toast({ title: 'Thành công', message: 'Đã xóa sản phẩm khỏi giỏ hàng !', type: 'success', duration: 3000 });
//         });
//     }
// });
// }

// function removeFromCart(username, productTitle) {
//     let userCarts = JSON.parse(localStorage.getItem('userCarts'));
//     if (userCarts[username]) {
//         userCarts[username] = userCarts[username].filter(item => item.title !== productTitle);
//         localStorage.setItem('userCarts', JSON.stringify(userCarts));
//     }
// }

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.title === product.title);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Hiển thị sản phẩm được thêm vào CartForm
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartElement = document.createElement('div');
        cartElement.className = 'cart-item';
        cartElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.price}</p>
            <button class="remove-from-cart">Xóa</button>
        `;
        cartContainer.appendChild(cartElement);

        const removeButton = cartElement.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', function() {
            removeFromCart(item.title);
            displayCart();
            toast({ title: 'Thành công', message: 'Đã xóa sản phẩm khỏi giỏ hàng !', type: 'success', duration: 3000 });
        });
    });
}

function removeFromCart(productTitle) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.title !== productTitle);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Event click thêm sản phẩm vào giỏ hàng
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const productElement = event.target.parentElement;
        const image = productElement.querySelector('img').src;
        const title = productElement.querySelector('h3').innerText;
        const price = productElement.querySelector('p').innerText;
        const cartItem = { image, title, price };
        addToCart(cartItem);
        toast({ title: 'Thành công', message: 'Đã thêm sản phẩm vào giỏ hàng !', type: 'success', duration: 3000 });
    }
});


// <---------------<CART>----------------->

// <---------------<SEARCH>----------------->

//Thanh tìm kiếm
Search.addEventListener('click', function(event){
    document.getElementById('SearchBar').style.display = 'flex';
    document.getElementById('txtSearch').value = '';
    document.getElementById('SearchBar').focus();
    overlay.style.display = 'block';
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'none';
    CartForm.style.display = 'none';
});

// <---------------<SEARCH>----------------->

// Back to top
window.onscroll = () => {
    let backtopTop = document.querySelector(".back-to-top")
    if (document.documentElement.scrollTop > 100) {
        backtopTop.classList.add("active");
    } else {
        backtopTop.classList.remove("active");
    }
}

window.onload = localStorage.removeItem('currentUser');

