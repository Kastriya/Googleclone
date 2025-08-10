// Gmail Clone JavaScript Functionality

// DOM Elements
const composeBtn = document.querySelector('.compose-btn');
const composeModal = document.getElementById('composeModal');
const composeClose = document.querySelector('.compose-close');
const sendBtn = document.querySelector('.send-btn');
const selectAllCheckbox = document.querySelector('.select-all');
const emailCheckboxes = document.querySelectorAll('.email-checkbox');
const starBtns = document.querySelectorAll('.star-btn');
const importantBtns = document.querySelectorAll('.important-btn');
const navItems = document.querySelectorAll('.nav-item');
const emailItems = document.querySelectorAll('.email-item');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupEmailInteractions();
    setupResponsiveFeatures();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Compose modal functionality
    composeBtn.addEventListener('click', openComposeModal);
    composeClose.addEventListener('click', closeComposeModal);
    sendBtn.addEventListener('click', sendEmail);
    
    // Select all functionality
    selectAllCheckbox.addEventListener('change', toggleSelectAll);
    
    // Individual email checkboxes
    emailCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectAllState);
    });
    
    // Star functionality
    starBtns.forEach(btn => {
        btn.addEventListener('click', toggleStar);
    });
    
    // Important functionality
    importantBtns.forEach(btn => {
        btn.addEventListener('click', toggleImportant);
    });
    
    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', switchNavigation);
    });
    
    // Menu button for mobile
    menuBtn.addEventListener('click', toggleSidebar);
    
    // Close compose modal when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Compose Modal Functions
function openComposeModal() {
    composeModal.classList.add('show');
    // Focus on the "To" field
    setTimeout(() => {
        document.querySelector('.to-field').focus();
    }, 100);
}

function closeComposeModal() {
    composeModal.classList.remove('show');
    // Clear form fields
    document.querySelector('.to-field').value = '';
    document.querySelector('.subject-field').value = '';
    document.querySelector('.editor').innerHTML = '';
}

function sendEmail() {
    const toField = document.querySelector('.to-field').value;
    const subjectField = document.querySelector('.subject-field').value;
    const messageContent = document.querySelector('.editor').textContent;
    
    if (!toField) {
        alert('Please enter a recipient email address.');
        return;
    }
    
    // Simulate sending email
    showNotification('Message sent!');
    closeComposeModal();
}

// Email Selection Functions
function toggleSelectAll() {
    const isChecked = selectAllCheckbox.checked;
    emailCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
    updateToolbarState();
}

function updateSelectAllState() {
    const checkedBoxes = document.querySelectorAll('.email-checkbox:checked');
    const totalBoxes = emailCheckboxes.length;
    
    if (checkedBoxes.length === 0) {
        selectAllCheckbox.indeterminate = false;
        selectAllCheckbox.checked = false;
    } else if (checkedBoxes.length === totalBoxes) {
        selectAllCheckbox.indeterminate = false;
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.indeterminate = true;
        selectAllCheckbox.checked = false;
    }
    
    updateToolbarState();
}

function updateToolbarState() {
    const checkedBoxes = document.querySelectorAll('.email-checkbox:checked');
    const toolbar = document.querySelector('.toolbar');
    
    if (checkedBoxes.length > 0) {
        toolbar.classList.add('has-selection');
    } else {
        toolbar.classList.remove('has-selection');
    }
}

// Star and Important Functions
function toggleStar(event) {
    event.stopPropagation();
    const starBtn = event.currentTarget;
    const starIcon = starBtn.querySelector('.material-icons');
    
    if (starBtn.classList.contains('starred')) {
        starBtn.classList.remove('starred');
        starIcon.textContent = 'star_border';
    } else {
        starBtn.classList.add('starred');
        starIcon.textContent = 'star';
    }
}

function toggleImportant(event) {
    event.stopPropagation();
    const importantBtn = event.currentTarget;
    
    if (importantBtn.classList.contains('important')) {
        importantBtn.classList.remove('important');
    } else {
        importantBtn.classList.add('important');
    }
}

// Navigation Functions
function switchNavigation(event) {
    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    event.currentTarget.classList.add('active');
    
    // Update email list based on selection
    const navText = event.currentTarget.querySelector('.nav-text').textContent;
    updateEmailList(navText);
}

function updateEmailList(category) {
    // This would typically filter emails based on the selected category
    // For demo purposes, we'll just show a notification
    showNotification(`Switched to ${category}`);
}

// Email Item Interactions
function setupEmailInteractions() {
    emailItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Don't trigger if clicking on checkbox, star, or important buttons
            if (event.target.closest('.email-checkbox, .star-btn, .important-btn')) {
                return;
            }
            
            // Mark as read if unread
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
            }
            
            // Simulate opening email
            showNotification('Opening email...');
        });
    });
}

// Responsive Features
function setupResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize(); // Initial call
}

function handleWindowResize() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        sidebar.classList.add('mobile');
    } else {
        sidebar.classList.remove('mobile');
    }
}

function toggleSidebar() {
    sidebar.classList.toggle('mobile-open');
}

// Utility Functions
function handleOutsideClick(event) {
    // Close compose modal if clicking outside
    if (composeModal.classList.contains('show') && 
        !composeModal.contains(event.target) && 
        !composeBtn.contains(event.target)) {
        closeComposeModal();
    }
    
    // Close mobile sidebar if clicking outside
    if (sidebar.classList.contains('mobile-open') && 
        !sidebar.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        sidebar.classList.remove('mobile-open');
    }
}

function handleKeyboardShortcuts(event) {
    // Gmail-like keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'k':
            case 'j':
                event.preventDefault();
                // Navigate between emails (simplified)
                break;
            case 'r':
                event.preventDefault();
                // Reply (simplified)
                break;
            case 'a':
                event.preventDefault();
                // Reply all (simplified)
                break;
            case 'f':
                event.preventDefault();
                // Forward (simplified)
                break;
        }
    }
    
    // Single key shortcuts (when not in input fields)
    if (!event.target.matches('input, textarea, [contenteditable]')) {
        switch(event.key) {
            case 'c':
                openComposeModal();
                event.preventDefault();
                break;
            case 's':
                // Toggle star on selected emails
                toggleSelectedStars();
                event.preventDefault();
                break;
            case 'r':
                // Mark as read
                markSelectedAsRead();
                event.preventDefault();
                break;
            case 'u':
                // Mark as unread
                markSelectedAsUnread();
                event.preventDefault();
                break;
            case 'Escape':
                if (composeModal.classList.contains('show')) {
                    closeComposeModal();
                }
                break;
        }
    }
}

function toggleSelectedStars() {
    const checkedBoxes = document.querySelectorAll('.email-checkbox:checked');
    checkedBoxes.forEach(checkbox => {
        const emailItem = checkbox.closest('.email-item');
        const starBtn = emailItem.querySelector('.star-btn');
        starBtn.click();
    });
}

function markSelectedAsRead() {
    const checkedBoxes = document.querySelectorAll('.email-checkbox:checked');
    checkedBoxes.forEach(checkbox => {
        const emailItem = checkbox.closest('.email-item');
        emailItem.classList.remove('unread');
    });
    showNotification('Marked as read');
}

function markSelectedAsUnread() {
    const checkedBoxes = document.querySelectorAll('.email-checkbox:checked');
    checkedBoxes.forEach(checkbox => {
        const emailItem = checkbox.closest('.email-item');
        emailItem.classList.add('unread');
    });
    showNotification('Marked as unread');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #323232;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        emailItems.forEach(item => {
            const sender = item.querySelector('.sender').textContent.toLowerCase();
            const subject = item.querySelector('.subject-text').textContent.toLowerCase();
            const preview = item.querySelector('.preview').textContent.toLowerCase();
            
            if (sender.includes(query) || subject.includes(query) || preview.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            showNotification(`Searching for: ${this.value}`);
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
});

// Toolbar actions
document.addEventListener('DOMContentLoaded', function() {
    // Archive button
    document.querySelector('.toolbar button[title="Archive"]').addEventListener('click', function() {
        const selected = document.querySelectorAll('.email-checkbox:checked');
        if (selected.length > 0) {
            showNotification(`Archived ${selected.length} message(s)`);
            // Remove selected emails from view
            selected.forEach(checkbox => {
                checkbox.closest('.email-item').style.display = 'none';
                checkbox.checked = false;
            });
            updateSelectAllState();
        }
    });
    
    // Delete button
    document.querySelector('.toolbar button[title="Delete"]').addEventListener('click', function() {
        const selected = document.querySelectorAll('.email-checkbox:checked');
        if (selected.length > 0) {
            if (confirm(`Delete ${selected.length} message(s)?`)) {
                showNotification(`Deleted ${selected.length} message(s)`);
                selected.forEach(checkbox => {
                    checkbox.closest('.email-item').remove();
                });
                updateSelectAllState();
            }
        }
    });
    
    // Mark as read button
    document.querySelector('.toolbar button[title="Mark as read"]').addEventListener('click', function() {
        const selected = document.querySelectorAll('.email-checkbox:checked');
        if (selected.length > 0) {
            markSelectedAsRead();
            selected.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateSelectAllState();
        }
    });
    
    // Refresh button
    document.querySelector('.toolbar button[title="Refresh"]').addEventListener('click', function() {
        showNotification('Refreshing...');
        // Add refresh animation
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 500);
    });
});

// Panel icon interactions
document.addEventListener('DOMContentLoaded', function() {
    const panelIcons = document.querySelectorAll('.panel-icon');
    
    panelIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            panelIcons.forEach(i => i.classList.remove('active'));
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Show notification based on which icon was clicked
            const iconType = this.querySelector('.material-icons').textContent;
            let message = '';
            
            switch(iconType) {
                case 'schedule':
                    message = 'Google Calendar opened';
                    break;
                case 'assignment':
                    message = 'Google Tasks opened';
                    break;
                case 'contacts':
                    message = 'Google Contacts opened';
                    break;
                case 'add':
                    message = 'Add-ons panel opened';
                    break;
                default:
                    message = 'Panel opened';
            }
            
            showNotification(message);
        });
    });
});

// Add some animations and polish
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation for the initial page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', '');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            if (this.style.position !== 'absolute' && this.style.position !== 'relative') {
                this.style.position = 'relative';
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
