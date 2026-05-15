// nav.js - 全局导航栏权限控制脚本

document.addEventListener('DOMContentLoaded', function() {
    // 1. 找到导航栏里带有 id="adminNavItem" 的管理后台按钮
    const adminNavItem = document.getElementById('adminNavItem');
    
    // 如果当前页面没有这个按钮（比如登录页），就直接结束
    if (!adminNavItem) return;

    // 2. 读取浏览器里存储的用户身份
    const userRole = localStorage.getItem('userRole');

    // 3. 核心逻辑：只有身份是 'admin' 的管理员，才把按钮显示出来
    if (userRole === 'admin') {
        adminNavItem.style.display = 'list-item'; // 或者 'block'，根据你的导航样式来定
    }
    // 如果是普通用户 (userRole 是 'user' 或 null)，什么都不做，让它保持默认的隐藏状态
});