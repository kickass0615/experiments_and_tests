// AI对话相关功能
function openAIChat() {
    const modal = document.getElementById('ai-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 触发动画
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // 聚焦到输入框（延迟到动画结束后）
    setTimeout(() => {
        document.getElementById('user-input').focus();
    }, 1500);
}

function closeAIChat() {
    const modal = document.getElementById('ai-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}

function minimizeChat() {
    const modal = document.getElementById('ai-modal');
    modal.classList.add('minimized');
}

function maximizeChat() {
    const modal = document.getElementById('ai-modal');
    modal.classList.toggle('maximized');
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (message) {
        // 添加用户消息
        addMessage('user', message);
        input.value = '';
        input.focus();
        
        // 隐藏欢迎信息
        const welcomeDiv = document.querySelector('.chat-welcome');
        if (welcomeDiv) {
            welcomeDiv.style.display = 'none';
        }
        
        // 显示加载动画
        showTypingIndicator();
        
        // 模拟AI响应
        setTimeout(() => {
            removeTypingIndicator();
            simulateAIResponse(message);
        }, 1000 + Math.random() * 1000); // 随机延迟，使对话更自然
    }
}

function showTypingIndicator() {
    const messagesDiv = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function addMessage(type, content) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    if (type === 'ai') {
        // 实现打字机效果
        const textNode = document.createElement('span');
        messageDiv.appendChild(textNode);
        messagesDiv.appendChild(messageDiv);
        typeWriter(textNode, content, 0);
    } else {
        messageDiv.textContent = content;
        messagesDiv.appendChild(messageDiv);
    }
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function typeWriter(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), 20);
    }
}

function simulateAIResponse(userMessage) {
    // 根据用户消息选择合适的回复
    let response;
    
    // 转换为小写并移除标点符号进行匹配
    const normalizedMessage = userMessage.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    if (normalizedMessage.includes('你是谁')) {
        response = '我是一个AI助手，由龚培炎开发。我可以回答问题，提供建议，或者简单聊天。';
    } else if (normalizedMessage.includes('你能做什么')) {
        response = '我可以：\n1. 回答关于网站的问题\n2. 提供技术支持\n3. 与您进行友好的对话\n4. 帮助您了解更多关于龚培炎的信息';
    } else if (normalizedMessage.includes('网站') || normalizedMessage.includes('使用')) {
        response = '这是龚培炎的个人网站，您可以：\n1. 在首页了解基本信息\n2. 在关于部分查看详细背景\n3. 在作品集浏览项目展示\n4. 通过联系方式与我取得联系';
    } else {
        // 默认回复
        const responses = [
            '这是一个很有趣的问题，让我来回答...',
            '我理解您的问题，这样看...',
            '关于这一点，我的建议是...',
            '让我从专业角度分析一下...',
            '这个问题很有深度，我的看法是...'
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    addMessage('ai', response);
}

// 页面滚动效果
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
}

// 轮播功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;
let isCarouselPaused = false;

function moveCarousel(direction) {
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function setCarousel(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const totalSlides = slides.length;
    
    slides.forEach((slide, index) => {
        // 移除所有类名
        slide.classList.remove('active', 'prev', 'next');
        
        if (index === currentSlide) {
            // 当前卡片
            slide.classList.add('active');
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            // 前一个卡片
            slide.classList.add('prev');
        } else if (index === (currentSlide + 1) % totalSlides) {
            // 后一个卡片
            slide.classList.add('next');
        }
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // 只有在轮播没有被暂停的情况下才重置计时器
    if (!isCarouselPaused) {
        resetAutoSlide();
    }
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    if (!isCarouselPaused) {
        autoSlideInterval = setInterval(() => moveCarousel(1), 5000);
    }
}

function pauseCarousel() {
    isCarouselPaused = true;
    clearInterval(autoSlideInterval);
}

function resumeCarousel() {
    isCarouselPaused = false;
    resetAutoSlide();
}

// 平滑滚动功能
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有导航链接（包括导航栏和页脚）
    const navLinks = document.querySelectorAll('.nav-links a, .footer-nav a');
    
    // 为每个链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止默认跳转
            
            // 获取目标元素
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 获取目标位置
                const targetPosition = targetElement.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                
                // 动画持续时间（毫秒）
                const duration = 800;
                let start = null;
                
                // 缓动函数
                function easeInOutCubic(t) {
                    return t < 0.5 
                        ? 4 * t * t * t 
                        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                }
                
                // 动画函数
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                // 开始动画
                requestAnimationFrame(animation);
            }
        });
    });
    
    // 原有的事件监听保持不变
    document.querySelector('.close').addEventListener('click', closeAIChat);
    
    window.addEventListener('click', (e) => {
        if (e.target.className === 'modal') {
            closeAIChat();
        }
    });
    
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    window.addEventListener('scroll', handleScroll);
    
    // 添加页面载入动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // 初始化轮播
    updateCarousel();
    resetAutoSlide();
    
    // 获取DOM元素
    const carouselContainer = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.about-card');
    
    if (carouselContainer) {
        // 轮播图鼠标悬停事件
        carouselContainer.addEventListener('mouseenter', pauseCarousel);
        carouselContainer.addEventListener('mouseleave', resumeCarousel);
        
        // 卡片鼠标接近效果
        carouselContainer.addEventListener('mousemove', (e) => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                // 计算鼠标到卡片中心的距离
                const deltaX = e.clientX - cardCenterX;
                const deltaY = e.clientY - cardCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                // 设置响应阈值（像素）
                const threshold = 300;
                
                if (distance < threshold) {
                    // 计算效果强度（越近越强）
                    const intensity = 1 - (distance / threshold);
                    
                    // 计算鼠标相对于卡片的位置（百分比）
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    
                    // 应用效果
                    card.style.setProperty('--mouse-x', `${x}%`);
                    card.style.setProperty('--mouse-y', `${y}%`);
                    
                    // 根据距离调整缩放和背景大小
                    const scale = 1 + (0.1 * intensity); // 最大放大到1.1倍
                    const bgSize = 200 - (100 * intensity); // 背景尺寸从200%逐渐变小到100%
                    
                    card.style.transform = `scale(${scale})`;
                    card.style.backgroundSize = `${bgSize}% ${bgSize}%`;
                    card.style.zIndex = '2';
                } else {
                    // 重置效果
                    card.style.transform = 'scale(1)';
                    card.style.backgroundSize = '200% 200%';
                    card.style.zIndex = '1';
                }
            });
        });
        
        // 鼠标��开轮播容器时重置所有卡片
        carouselContainer.addEventListener('mouseleave', () => {
            cards.forEach(card => {
                card.style.transform = 'scale(1)';
                card.style.backgroundSize = '200% 200%';
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
                card.style.zIndex = '1';
            });
        });
        
        // 添加触摸事件
        let touchStartX = 0;
        let touchEndX = 0;
        
        const carousel = document.querySelector('.carousel');
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            pauseCarousel();
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            resumeCarousel();
        });
    }
    
    // 初始化其他功能
    initializeCarousel();
    initializePortfolio();
    initializeAIChat();
    initializeScrollEffects();
});

// 添加图片加载完成后的动画
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// 作品集功能
document.addEventListener('DOMContentLoaded', () => {
    // 筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选作品
            const filter = btn.dataset.filter;
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.type === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // 预览功能
    const modal = document.getElementById('portfolio-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    
    // 预览按钮点击事件
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const contentId = btn.dataset.content;
            const content = getPreviewContent(contentId);
            
            modalBody.innerHTML = content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// 获取预览内容
function getPreviewContent(contentId) {
    // 这里可以根据contentId返回不同的预览内容
    const contentMap = {
        'document-1': `
            <div class="document-preview">
                <h2>项目文档标题</h2>
                <div class="document-content">
                    <p>这里是文档内容...</p>
                    <!-- 可以添加更多内容 -->
                </div>
            </div>
        `,
        'image-1': `
            <div class="image-preview">
                <img src="portfolio-1.jpg" alt="作品大图">
                <div class="image-description">
                    <h3>作品说明</h3>
                    <p>这里是作品描述...</p>
                </div>
            </div>
        `
    };
    
    return contentMap[contentId] || '<p>预览内容不可用</p>';
}

// 添加建议按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.textContent;
            document.getElementById('user-input').value = question;
            sendMessage();
        });
    });
    
    // 添加最小化和最大化功能
    document.querySelector('.minimize').addEventListener('click', minimizeChat);
    document.querySelector('.maximize').addEventListener('click', maximizeChat);
    
    // 更新关闭按钮事件
    document.querySelector('.close').addEventListener('click', closeAIChat);
    
    // 添加Enter键发送消息
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// 初始化页面功能
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeCardEffects();
    initializePortfolio();
    initializeAIChat();
    initializeScrollEffects();
});

// 卡片效果初始化
function initializeCardEffects() {
    const cards = document.querySelectorAll('.about-card');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (!carouselContainer) return;
    
    // 监听整个轮播容器的鼠标移动
    carouselContainer.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // 计算鼠标到卡片中心的距离
            const deltaX = e.clientX - cardCenterX;
            const deltaY = e.clientY - cardCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // 设置响应阈值（像素）
            const threshold = 300;
            
            if (distance < threshold) {
                // 计算效果强度（越近越强）
                const intensity = 1 - (distance / threshold);
                
                // 计算鼠标相对于卡片的位置（百分比）
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                // 应用效果
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
                
                // 根据距离调整缩放和背景大小
                const scale = 1 + (0.1 * intensity); // 最大放大到1.1倍
                const bgSize = 200 - (100 * intensity); // 背景尺寸从200%逐渐变小到100%
                
                card.style.transform = `scale(${scale})`;
                card.style.backgroundSize = `${bgSize}% ${bgSize}%`;
                card.style.zIndex = '2';
            } else {
                // 重置效果
                card.style.transform = 'scale(1)';
                card.style.backgroundSize = '200% 200%';
                card.style.zIndex = '1';
            }
        });
    });
    
    // 鼠标离开轮播容器时重置所有卡片
    carouselContainer.addEventListener('mouseleave', () => {
        cards.forEach(card => {
            card.style.transform = 'scale(1)';
            card.style.backgroundSize = '200% 200%';
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
            card.style.zIndex = '1';
        });
    });
}

// 轮播功能初始化
function initializeCarousel() {
    // ... 原有的轮播相关代码 ...
}

// 作品集功能初始化
function initializePortfolio() {
    // ... 原有的作品集相关代码 ...
}

// AI聊天功能初始化
function initializeAIChat() {
    // ... 原有的AI聊天相关代码 ...
}

// 滚动效果初始化
function initializeScrollEffects() {
    // ... 原有的滚动效果相关代码 ...
}

// 卡片鼠标跟踪效果
function initCardMouseEffect() {
    const cards = document.querySelectorAll('.about-card');
    const maxDistance = 300; // 最大影响距离
    const maxScale = 1.1; // 最大缩放比例
    const minScale = 1.0; // 最小缩放比例

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (!card.closest('.carousel-item').classList.contains('active')) return;

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // 计算鼠标到卡片中心的距离
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + 
                Math.pow(e.clientY - centerY, 2)
            );

            // 根据距离计算缩放比例
            let scale;
            if (distance > maxDistance) {
                scale = minScale;
            } else {
                // 使用平滑的缓动函数计算缩放比例
                const progress = 1 - (distance / maxDistance);
                scale = minScale + (maxScale - minScale) * Math.pow(progress, 2);
            }

            // 设置卡片的变换
            card.style.transform = `scale(${scale})`;

            // 更新鼠标位置变量
            const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${mouseX}%`);
            card.style.setProperty('--mouse-y', `${mouseY}%`);
        });

        // 鼠标离开时重置效果
        card.addEventListener('mouseleave', () => {
            card.style.transform = `scale(${minScale})`;
        });
    });
}

// 在文档加载完成后初始化效果
document.addEventListener('DOMContentLoaded', () => {
    initCardMouseEffect();
}); 