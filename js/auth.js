// 登录检查和购物车管理公共模块

// 检查用户是否已登录
function isLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null && currentUser !== '';
}

// 获取当前登录用户名
function getCurrentUsername() {
    return localStorage.getItem('currentUser') || '';
}

// 保存当前页面URL到sessionStorage，用于登录后返回
function saveCurrentPage() {
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectAfterLogin', currentUrl);
}

// 跳转到登录页面
function redirectToLogin() {
    saveCurrentPage();
    window.location.href = 'login.html';
}

// 通用的加入购物车函数（带登录检查）
function addToCartWithAuth(bookId, bookData) {
    if (!isLoggedIn()) {
        alert('请先登录后再加入购物车！');
        redirectToLogin();
        return false;
    }

    const username = getCurrentUsername();
    const CART_KEY = 'bookstore_cart_' + username;
    
    function getCart() {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    }
    
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: bookData.id,
            name: bookData.name,
            author: bookData.author,
            price: parseFloat(bookData.price),
            cover: bookData.cover,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showToast('已加入购物车！');
    return true;
}

// 显示提示信息
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #28a745; color: white; padding: 12px 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999; display: none; font-size: 16px;';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}
