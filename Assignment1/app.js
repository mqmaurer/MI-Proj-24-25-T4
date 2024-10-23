document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId + '-content');
                document.querySelectorAll('.tab').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.content').forEach(content => {
                    content.classList.remove('active');
                });
                tab.classList.add('active');
                tabContent.classList.add('active');
            });
        });