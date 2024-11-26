// <---------------<RESPONSIVE>----------------->
var menu = document.getElementById('nav-responsive-button');
var navRes = document.getElementById('navbar-responsive');

menu.addEventListener('click', function() {
    if (navRes.style.transform === 'translateX(100%)') {
        navRes.style.transform = 'translateX(0%)';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    else {
        navRes.style.transform = 'translateX(100%)';
        overlay.style.display = 'none';
        document.body.style.overflow = 'visible';
    }
});

function closeNav() {
    navRes.style.transform = 'translateX(100%)';
    overlay.style.display = 'none';
    document.body.style.overflow = 'visible';
}

let buttonNav = document.getElementById('hero-btn');
let buttonNav2 = document.getElementById('services-btn');
let buttonNav3 = document.getElementById('footer-btn');
buttonNav.addEventListener('click', closeNav);
buttonNav2.addEventListener('click', closeNav);
buttonNav3.addEventListener('click', closeNav);

//Navbar trượt lên xuống
let lastScrollTop = 0;
const navbar = document.getElementById('nav-responsive');

window.addEventListener('scroll', function() {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // cuộn xuống
        navbar.style.transform = 'translateY(-100%)'; // ẩn navbar
    }
    else{
        // cuộn lên
        navbar.style.transform = 'translateX(0%)'; // hiện navbar
    }
    lastScrollTop = scrollTop;
});

var SignReS = document.getElementById('Sign-responsive');
var CartReS = document.getElementById('Cart-responsive');

// SignReS.addEventListener('click', showSignForm);

SignReS.addEventListener('click', showSignForm);

function showSignForm() {
    SignForm.style.display = 'block';
    RegisterForm.style.display = 'none';
    CartForm.style.display = 'none';
    overlay.style.display = 'block';
    SearchBar.style.display = 'none';
    navRes.style.transform = 'translateX(100%)';
}

CartReS.addEventListener('click', showCartForm);


function showCartForm() {
    CartForm.style.display = 'block';
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'none';
    overlay.style.display = 'block';
    SearchBar.style.display = 'none';
    navRes.style.transform = 'translateX(100%)';
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
    document.body.style.overflow = 'visible';
}

var SearchRes = document.getElementById('Search-responsive');
SearchRes.addEventListener('click', function(){
    document.getElementById('SearchBar').style.display = 'flex';
    document.getElementById('txtSearch').value = '';
    document.getElementById('SearchBar').focus();
    overlay.style.display = 'block';
    SignForm.style.display = 'none';
    RegisterForm.style.display = 'none';
    CartForm.style.display = 'none';
    navRes.style.transform = 'translateX(100%)';
});
