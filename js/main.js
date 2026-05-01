// Main JavaScript file for Mechanical Engineering Hub

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Calculator category tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const calculatorCards = document.querySelectorAll('.calculator-card');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs
                tabBtns.forEach(tab => tab.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                const category = this.getAttribute('data-tab');

                // Show/hide calculator cards based on category
                calculatorCards.forEach(card => {
                    if (card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize materials table
    initializeMaterialsTable();

    // Initialize unit converter
    initializeUnitConverter();

    // Add scroll animations
    addScrollAnimations();
});

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.calculator-card, .formula-item, .manufacturing-card, .maintenance-type, ' +
        '.course-card, .book-card, .standards-org, .application-card, .metric-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Calculator modal functions
function openCalculator(calculatorType) {
    const modal = document.getElementById('calculatorModal');
    const title = document.getElementById('calculatorTitle');
    const body = document.getElementById('calculatorBody');

    if (!modal || !title || !body) return;

    // Set calculator title
    const calculatorNames = {
        'stress-strain': 'Stress & Strain Calculator',
        'beam': 'Beam Analysis Calculator',
        'moment-inertia': 'Moment of Inertia Calculator',
        'shaft': 'Shaft Design Calculator',
        'heat-transfer': 'Heat Transfer Calculator',
        'thermal-expansion': 'Thermal Expansion Calculator',
        'ideal-gas': 'Ideal Gas Law Calculator',
        'entropy': 'Entropy Calculator',
        'bernoulli': 'Bernoulli Equation Calculator',
        'reynolds': 'Reynolds Number Calculator',
        'pipe-flow': 'Pipe Flow Calculator',
        'pump': 'Pump Selection Calculator',
        'material-selection': 'Material Selection Calculator',
        'fatigue': 'Fatigue Life Calculator',
        'creep': 'Creep Calculator',
        'fracture': 'Fracture Mechanics Calculator',
        'gear': 'Gear Design Calculator',
        'bearing': 'Bearing Selection Calculator',
        'bolted': 'Bolted Joint Calculator',
        'spring': 'Spring Design Calculator'
    };

    title.textContent = calculatorNames[calculatorType] || 'Calculator';

    // Load calculator content
    loadCalculatorContent(calculatorType, body);

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCalculator() {
    const modal = document.getElementById('calculatorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('calculatorModal');
    if (e.target === modal) {
        closeCalculator();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCalculator();
    }
});

// Load calculator content based on type
function loadCalculatorContent(type, container) {
    const calculators = {
        'stress-strain': getStressStrainCalculator(),
        'beam': getBeamCalculator(),
        'moment-inertia': getMomentInertiaCalculator(),
        'shaft': getShaftCalculator(),
        'heat-transfer': getHeatTransferCalculator(),
        'thermal-expansion': getThermalExpansionCalculator(),
        'ideal-gas': getIdealGasCalculator(),
        'entropy': getEntropyCalculator(),
        'bernoulli': getBernoulliCalculator(),
        'reynolds': getReynoldsCalculator(),
        'pipe-flow': getPipeFlowCalculator(),
        'pump': getPumpCalculator(),
        'material-selection': getMaterialSelectionCalculator(),
        'fatigue': getFatigueCalculator(),
        'creep': getCreepCalculator(),
        'fracture': getFractureCalculator(),
        'gear': getGearCalculator(),
        'bearing': getBearingCalculator(),
        'bolted': getBoltedCalculator(),
        'spring': getSpringCalculator()
    };

    container.innerHTML = calculators[type] || '<p>Calculator not found</p>';

    // Initialize calculator-specific functionality
    initializeCalculator(type);
}

// Initialize calculator-specific functionality
function initializeCalculator(type) {
    switch(type) {
        case 'moment-inertia':
            initializeMomentInertiaCalculator();
            break;
        case 'material-selection':
            initializeMaterialSelectionCalculator();
            break;
        // Add more calculator initializations as needed
    }
}

// Utility functions
function formatNumber(num, decimals = 2) {
    if (isNaN(num)) return 'N/A';
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function showResult(container, value, unit, formula = '') {
    const resultDiv = container.querySelector('.calculator-result');
    if (!resultDiv) return;

    const valueSpan = resultDiv.querySelector('.result-value');
    const unitSpan = resultDiv.querySelector('.unit-display');
    const formulaDiv = resultDiv.querySelector('.result-details .formula');

    if (valueSpan) {
        valueSpan.textContent = formatNumber(value);
    }

    if (unitSpan) {
        unitSpan.textContent = unit;
    }

    if (formulaDiv && formula) {
        formulaDiv.textContent = formula;
    }

    resultDiv.style.display = 'block';
}

function showError(container, message) {
    const resultDiv = container.querySelector('.calculator-result');
    if (!resultDiv) return;

    resultDiv.innerHTML = `<div class="calculator-error">${message}</div>`;
    resultDiv.style.display = 'block';
}

function showWarning(container, message) {
    const resultDiv = container.querySelector('.calculator-result');
    if (!resultDiv) return;

    const warningDiv = document.createElement('div');
    warningDiv.className = 'calculator-warning';
    warningDiv.textContent = message;
    resultDiv.appendChild(warningDiv);
}

function showInfo(container, message) {
    const resultDiv = container.querySelector('.calculator-result');
    if (!resultDiv) return;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'calculator-info';
    infoDiv.textContent = message;
    resultDiv.appendChild(infoDiv);
}

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Export functions for use in other files
window.openCalculator = openCalculator;
window.closeCalculator = closeCalculator;