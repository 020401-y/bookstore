// 全局导航初始化函数
    function initNavigation() {
        // 1. 检查管理后台链接是否存在
        const adminLink = document.querySelector('.nav-menu a[href="后台.html"]');
        if (adminLink) {
            const userRole = localStorage.getItem('userRole');
            // 2. 如果不是管理员，隐藏管理后台链接
            if (userRole !== 'admin') {
                adminLink.style.display = 'none';
            }
        }

        // 3. (可选) 高亮当前页面
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active'); // 你可以给当前页面的导航加个样式
            }
        });
    }

    // 页面加载完成后执行
    document.addEventListener('DOMContentLoaded', initNavigation);