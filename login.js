// Google Login Clone JavaScript Functionality

// DOM Elements
const emailStep = document.querySelector('.login-card:not(.password-step)');
const passwordStep = document.getElementById('passwordStep');
const signinForm = document.getElementById('signinForm');
const passwordForm = document.getElementById('passwordForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const signInButton = document.getElementById('signInButton');
const showPasswordBtn = document.getElementById('showPassword');
const switchAccountBtn = document.getElementById('switchAccount');
const loadingOverlay = document.getElementById('loadingOverlay');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const userInitial = document.getElementById('userInitial');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeInputAnimations();
    setupFormValidation();
    setupAccessibility();
});

// Initialize event listeners
function initializeEventListeners() {
    // Form submissions
    signinForm.addEventListener('submit', handleEmailSubmit);
    passwordForm.addEventListener('submit', handlePasswordSubmit);
    
    // Button clicks
    backButton.addEventListener('click', goBackToEmail);
    showPasswordBtn.addEventListener('click', togglePasswordVisibility);
    switchAccountBtn.addEventListener('click', goBackToEmail);
    
    // Input events
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Language selectors
    const languageSelects = document.querySelectorAll('#languageSelect, .language-footer');
    languageSelects.forEach(select => {
        select.addEventListener('change', handleLanguageChange);
    });
    
    // Create account link
    document.querySelector('.create-account').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Create Account feature would redirect to account creation page.');
    });
    
    // Forgot email/password links
    document.querySelectorAll('.forgot-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const isForgotEmail = this.textContent.includes('email');
            showNotification(isForgotEmail ? 'Account recovery would help you find your email.' : 'Password recovery would be initiated.');
        });
    });
    
    // Learn more link
    document.querySelector('.learn-more').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Guest mode information would be displayed.');
    });
}

// Input animations and floating labels
function initializeInputAnimations() {
    const inputs = document.querySelectorAll('.input-field');
    
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Handle focus and blur events
        input.addEventListener('focus', function() {
            this.closest('.input-wrapper').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.input-wrapper').classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Handle input events
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Form validation setup
function setupFormValidation() {
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value) {
            validateEmail();
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (this.value) {
            validatePassword();
        }
    });
}

// Email validation
function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    
    if (!email) {
        showError(emailError, 'Enter an email or phone number');
        return false;
    }
    
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
        showError(emailError, 'Enter a valid email or phone number');
        return false;
    }
    
    clearError(emailError);
    return true;
}

// Password validation
function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        showError(passwordError, 'Enter your password');
        return false;
    }
    
    if (password.length < 6) {
        showError(passwordError, 'Password is too short');
        return false;
    }
    
    clearError(passwordError);
    return true;
}

// Handle email form submission
function handleEmailSubmit(event) {
    event.preventDefault();
    
    if (!validateEmail()) {
        emailInput.focus();
        return;
    }
    
    showLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        showLoading(false);
        proceedToPasswordStep();
    }, 1500);
}

// Handle password form submission
function handlePasswordSubmit(event) {
    event.preventDefault();
    
    if (!validatePassword()) {
        passwordInput.focus();
        return;
    }
    
    showLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
        showLoading(false);
        
        // Simulate successful login
        showNotification('Sign in successful! Redirecting to Gmail...', 'success');
        
        setTimeout(() => {
            // Redirect to Gmail
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// Proceed to password step
function proceedToPasswordStep() {
    const email = emailInput.value.trim();
    
    // Update user display
    userEmailDisplay.textContent = email;
    userInitial.textContent = email.charAt(0).toUpperCase();
    
    // Animate transition
    emailStep.style.animation = 'slideOut 0.3s ease-in forwards';
    
    setTimeout(() => {
        emailStep.style.display = 'none';
        passwordStep.style.display = 'block';
        passwordStep.style.animation = 'slideIn 0.3s ease-out forwards';
        passwordInput.focus();
    }, 300);
}

// Go back to email step
function goBackToEmail() {
    passwordStep.style.animation = 'slideOut 0.3s ease-in forwards';
    
    setTimeout(() => {
        passwordStep.style.display = 'none';
        emailStep.style.display = 'block';
        emailStep.style.animation = 'slideIn 0.3s ease-out forwards';
        emailInput.focus();
        
        // Clear password and errors
        passwordInput.value = '';
        clearError(passwordError);
    }, 300);
}

// Toggle password visibility
function togglePasswordVisibility() {
    const isPasswordVisible = passwordInput.type === 'text';
    
    if (isPasswordVisible) {
        passwordInput.type = 'password';
        showPasswordBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#5f6368"/>
            </svg>
        `;
    } else {
        passwordInput.type = 'text';
        showPasswordBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#5f6368"/>
            </svg>
        `;
    }
}

// Error handling
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Add error styling to input wrapper
    const inputWrapper = errorElement.previousElementSibling;
    if (inputWrapper && inputWrapper.classList.contains('input-wrapper')) {
        inputWrapper.classList.add('error');
    }
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    
    // Remove error styling from input wrapper
    const inputWrapper = errorElement.previousElementSibling;
    if (inputWrapper && inputWrapper.classList.contains('input-wrapper')) {
        inputWrapper.classList.remove('error');
    }
}

// Loading state
function showLoading(show) {
    if (show) {
        loadingOverlay.classList.add('show');
        // Disable form elements
        const currentForm = passwordStep.style.display === 'none' ? signinForm : passwordForm;
        const inputs = currentForm.querySelectorAll('input, button');
        inputs.forEach(element => {
            element.disabled = true;
        });
    } else {
        loadingOverlay.classList.remove('show');
        // Enable form elements
        const inputs = document.querySelectorAll('input, button');
        inputs.forEach(element => {
            element.disabled = false;
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        animation: 'slideInRight 0.3s ease-out'
    };
    
    // Set background color based on type
    if (type === 'success') {
        styles.backgroundColor = '#34a853';
    } else if (type === 'error') {
        styles.backgroundColor = '#ea4335';
    } else {
        styles.backgroundColor = '#1a73e8';
    }
    
    Object.assign(notification.style, styles);
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', '');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Language change handler
function handleLanguageChange(event) {
    const selectedLanguage = event.target.value;
    showNotification(`Language changed to: ${event.target.options[event.target.selectedIndex].text}`);
    
    // Update other language selectors
    const languageSelects = document.querySelectorAll('#languageSelect, .language-footer');
    languageSelects.forEach(select => {
        if (select !== event.target) {
            select.value = selectedLanguage;
        }
    });
}

// Keyboard shortcuts
function handleKeyboardShortcuts(event) {
    // Enter key handling
    if (event.key === 'Enter' && !event.shiftKey) {
        const activeElement = document.activeElement;
        
        if (activeElement === emailInput && emailStep.style.display !== 'none') {
            event.preventDefault();
            handleEmailSubmit(event);
        } else if (activeElement === passwordInput && passwordStep.style.display !== 'none') {
            event.preventDefault();
            handlePasswordSubmit(event);
        }
    }
    
    // Escape key to go back
    if (event.key === 'Escape' && passwordStep.style.display !== 'none') {
        goBackToEmail();
    }
    
    // Ctrl/Cmd + K for focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (emailStep.style.display !== 'none') {
            emailInput.focus();
        } else {
            passwordInput.focus();
        }
    }
}

// Accessibility setup
function setupAccessibility() {
    // Add ARIA labels and descriptions
    emailInput.setAttribute('aria-describedby', 'emailError');
    passwordInput.setAttribute('aria-describedby', 'passwordError');
    
    // Add screen reader announcements for step changes
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    // Store reference for later use
    window.accessibilityAnnouncer = announcer;
}

// Announce to screen readers
function announceToScreenReader(message) {
    if (window.accessibilityAnnouncer) {
        window.accessibilityAnnouncer.textContent = message;
    }
}

// Add slide-out animation
const slideOutKeyframes = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;

// Add the keyframes to the document
const existingStyle = document.querySelector('style[data-animations]');
if (!existingStyle) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', '');
    style.textContent = slideOutKeyframes;
    document.head.appendChild(style);
}

// Form auto-fill detection
function detectAutoFill() {
    const inputs = document.querySelectorAll('.input-field');
    
    inputs.forEach(input => {
        // Check for auto-filled values
        const checkAutoFill = () => {
            if (input.matches(':-webkit-autofill') || input.value) {
                input.classList.add('has-value');
            }
        };
        
        // Check immediately and after a delay
        setTimeout(checkAutoFill, 100);
        setTimeout(checkAutoFill, 500);
        
        // Listen for animation events (webkit autofill triggers these)
        input.addEventListener('animationstart', checkAutoFill);
    });
}

// Initialize auto-fill detection
document.addEventListener('DOMContentLoaded', detectAutoFill);

// Add error styles dynamically
const errorStyles = `
    .input-wrapper.error {
        border-color: #d93025 !important;
        border-width: 2px !important;
    }
    
    .input-wrapper.error .input-label {
        color: #d93025 !important;
    }
`;

const errorStyleSheet = document.createElement('style');
errorStyleSheet.textContent = errorStyles;
document.head.appendChild(errorStyleSheet);
