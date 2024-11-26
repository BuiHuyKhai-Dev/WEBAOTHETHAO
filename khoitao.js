

function createProduct() {
    if (localStorage.getItem('products') == null) {
        let products = [
            { name: "Zoom Mercurial Vapor 16 Elite AG-PRO Mad Voltage", price: 5700000, img: "img/1000.jpg", productId: 1000,brand:"Giày cỏ tự nhiên" },
            { name: "Zoom Mercurial Vapor 16 Academy MG Shadow", price: 2150000, img: "img/1001.jpg", productId: 1001,brand:"Giày cỏ tự nhiên" },
            { name: "Adidas Copa Gloro II TF", price: 1950000, img: "img/1016.jpg", productId: 1016,brand:"Giày cỏ nhân tạo" },
            { name: "Phantom GX II Academy MG Mad Ambition", price: 2150000, img: "img/1003.jpg", productId: 1003,brand:"Giày cỏ tự nhiên" },
            {name: "Găng Tay Thủ Môn Tập Luyện Predator",price: 800000,img: "img/1040.jpg",productId:1040,brand:"Phụ kiện"},
            {name: "Bóng UCL League 24/25 League Phase",price: 950000,img: "img/1041.jpg",productId:1041,brand:"Phụ kiện"},
            {name: "Bóng UCL Training 24/25 League Phase",price: 650000,img: "img/1042.jpg",productId:1042,brand:"Phụ kiện"},
            {name: "Bóng UCL Pro 24/25 League Phase",price: 3300000,img: "img/1043.jpg",productId:1043,brand:"Phụ kiện"},
            {name: "Áo Thun 3 Sọc Adicolor Classics Real Madrid",price: 1100000,img: "img/1070.jpg",productId:1070,brand:"Quần áo"}, 
            {name: "Áo Jersey David Beckham Originals",price: 1800000,img: "img/1071.jpg",productId:1071,brand:"Quần áo"}, 
            {name: "DB OG 3S TEE",price: 1100000,img: "img/1072.jpg",productId:1072,brand:"Quần áo"}, 
            {name: "DB 3S SHO",price: 1100000,img: "img/1073.jpg",productId:1073,brand:"Quần áo"}, 
    ]
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function createAdmin(){
    let accounts = localStorage.getItem('accounts');
    if (!accounts){
        accounts = [];
        accounts.push({
                name: 'Bùi Huy Khải',
                username: 'hkhai',
                password: '123',
                role: 'user',
                status: 'active'
            }),
        accounts.push({
                name: 'Huy Khải Bùi',
                username: 'admin',
                password: 'admin',
                role: 'admin',
                status: 'active'
            })
        
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}
// window.onload = localStorage.removeItem('accounts');
window.onload = createAdmin();
window.onload = localStorage.removeItem('products');
window.onload = createProduct();
// window.onload = ProfileSubmit();
// window.onload = setupImageUpload("#img-user1", 'input[type="file"]', "#avatar", ".bxs-user");
