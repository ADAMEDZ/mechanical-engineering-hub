# Mechanical Engineering Hub

A comprehensive mechanical engineering resource website featuring calculators, formulas, materials database, manufacturing processes, maintenance best practices, and learning resources.

## Features

### 🧮 Engineering Calculators
- **Mechanics**: Stress & Strain, Beam Analysis, Moment of Inertia, Shaft Design
- **Thermodynamics**: Heat Transfer, Thermal Expansion, Ideal Gas Law, Entropy
- **Fluid Mechanics**: Bernoulli Equation, Reynolds Number, Pipe Flow, Pump Selection
- **Materials**: Material Selection, Fatigue Life, Creep, Fracture Mechanics
- **Machine Design**: Gear Design, Bearing Selection, Bolted Joints, Spring Design

### 📐 Engineering Formulas
- Comprehensive collection of essential formulas
- Organized by category: Mechanics, Dynamics, Thermodynamics, Fluid Mechanics, Machine Design
- Clear variable definitions and explanations

### 🔩 Materials Database
- 19+ materials with detailed properties
- Search and filter functionality
- Material comparison tools
- Smart recommendation system

### ⚙️ Manufacturing Processes
- Detailed guides for machining, forming, casting, joining, additive manufacturing
- Process selection guidelines
- Comparison tables with tolerances and production rates

### 🔧 Maintenance & Reliability
- Preventive, predictive, and RCM maintenance strategies
- Key reliability metrics (MTBF, MTTR, Availability)
- Maintenance checklists for daily, weekly, and monthly tasks

### 🎓 Learning Resources
- Structured learning paths (Beginner, Intermediate, Advanced)
- Curated course recommendations from top platforms
- Essential book recommendations
- Industry-standard certifications

### 📋 Industry Standards
- ASME, ASTM, ISO standards overview
- Practical applications for pressure vessels, piping, welding, quality systems
- Compliance guidelines

### 🔄 Unit Converter
- 10+ unit categories
- 100+ unit conversions
- Real-time conversion
- Engineering-focused units

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mechanical-engineering-hub.git
cd mechanical-engineering-hub
```

2. Open `index.html` in your web browser

No build process or dependencies required!

## Project Structure

```
mechanical-engineering-hub/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Main styles
│   ├── calculators.css    # Calculator-specific styles
│   └── responsive.css    # Responsive design
├── js/
│   ├── main.js           # Main JavaScript functionality
│   ├── calculators.js    # All calculator implementations
│   ├── materials.js      # Materials database
│   └── unit-converter.js # Unit conversion logic
├── assets/
│   ├── images/          # Image assets
│   └── icons/           # Icon assets
└── data/                # Data files
```

## Usage

### Using Calculators
1. Navigate to the Calculators section
2. Select a category (Mechanics, Thermodynamics, etc.)
3. Click on a calculator card
4. Enter your values and click Calculate
5. View results with formulas and explanations

### Materials Database
1. Go to the Materials section
2. Use the search bar to find specific materials
3. Filter by category (Steel, Aluminum, etc.)
4. View detailed properties and applications

### Unit Converter
1. Navigate to Unit Converter section
2. Select the conversion type
3. Enter values and select units
4. View instant conversion results

## Development

### Adding New Calculators

1. Add calculator HTML in `index.html` calculator grid
2. Implement calculator function in `js/calculators.js`:
```javascript
function getYourCalculator() {
    return `
        <div class="calculator-form">
            <!-- Your calculator HTML -->
        </div>
    `;
}

function calculateYourCalculator() {
    // Your calculation logic
}
```

3. Add to calculators object in `js/main.js`

### Adding New Materials

Edit `js/materials.js` and add to the `materialsDatabase` array:
```javascript
{
    name: 'Your Material',
    category: 'steel', // or aluminum, titanium, etc.
    density: 7850,
    yieldStrength: 250,
    ultimateStrength: 400,
    youngsModulus: 200,
    thermalConductivity: 50,
    applications: 'Your applications'
}
```

### Adding New Unit Conversions

Edit `js/unit-converter.js` and add to `conversionFactors`:
```javascript
yourType: {
    base: 'baseUnit',
    units: {
        'unit1': conversionFactor1,
        'unit2': conversionFactor2
    }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features

- ✅ Responsive design for all devices
- ✅ Dark mode support
- ✅ Offline functionality
- ✅ Fast loading times
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Print-friendly styles
- ✅ No external dependencies

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Disclaimer

This resource is for educational purposes only. Always verify calculations and consult with qualified professionals for critical applications. The authors are not responsible for any errors or omissions.

## Acknowledgments

- Engineering formulas and data from standard engineering textbooks
- Material properties from engineering handbooks
- Industry standards from ASME, ASTM, ISO organizations

## Contact

For questions, suggestions, or issues, please open an issue on GitHub.

## Roadmap

- [ ] Add more specialized calculators
- [ ] Expand materials database
- [ ] Add interactive diagrams
- [ ] Implement user accounts for saving calculations
- [ ] Add API for programmatic access
- [ ] Create mobile app version
- [ ] Add video tutorials
- [ ] Implement community features

---

Made with ❤️ for mechanical engineers everywhere