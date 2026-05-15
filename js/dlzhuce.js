// =============== 首页逻辑 ===============
// 1. 全屏点击拦截
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const goLoginBtn = document.getElementById('goLoginBtn');

    // 如果存在蒙层元素（即在首页）
    if (overlay) {
        // 点击蒙层任意位置
        overlay.addEventListener('click', function(e) {
            // 如果点击的是蒙层本身（不是内部的按钮），防止事件冒泡导致立即跳转
            if (e.target === overlay || e.target === goLoginBtn) {
                window.location.href = 'login.html';
            }
        });
    }

    // 2. 搜索功能 (doSearch)
    window.doSearch = function() {
        let key = document.getElementById('searchInput')?.value.trim();
        if (!key) {
            alert('请输入书名');
            return;
        }
        // 无论搜什么，都先去登录
        window.location.href = 'login.html';
    };

    // 3. 轮播图逻辑
    const slides = document.querySelectorAll('.slideshow img');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // 每3秒自动切换
        setInterval(nextSlide, 3000);
    }
});

// =============== 登录页逻辑 ===============
// 检查是否在 login.html 页面
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录页的 DOM 元素
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab');

    // 如果找到了登录表单（说明当前在 login.html）
    if (loginForm) {
        // Tab 切换逻辑
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                
                // 切换 Tab 样式
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 切换表单显示
                document.getElementById('login-form').style.display = target === 'login' ? 'block' : 'none';
                document.getElementById('register-form').style.display = target === 'register' ? 'block' : 'none';
            });
        });

        // 登录表单提交
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            // 这里可以添加真实的验证逻辑
            alert(`模拟登录成功！欢迎 ${username}`);
            // 登录成功后跳转回首页
            window.location.href = 'index.html';
        });

        // 注册表单提交
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('两次输入的密码不一致！');
                return;
            }
            
            const username = document.getElementById('register-username').value;
            alert(`注册成功！欢迎 ${username}`);
            // 注册成功后自动切换到登录 Tab
            document.querySelector('.tab[data-tab="login"]').click();
        });
    }
});