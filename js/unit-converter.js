// Unit Converter Functionality

// Unit conversion factors
const conversionFactors = {
    length: {
        base: 'm',
        units: {
            'm': 1,
            'mm': 0.001,
            'cm': 0.01,
            'km': 1000,
            'in': 0.0254,
            'ft': 0.3048,
            'yd': 0.9144,
            'mi': 1609.344,
            'μm': 0.000001,
            'nm': 0.000000001
        }
    },
    mass: {
        base: 'kg',
        units: {
            'kg': 1,
            'g': 0.001,
            'mg': 0.000001,
            'lb': 0.453592,
            'oz': 0.0283495,
            'ton': 1000,
            'st': 907.185,
            'lt': 1016.05
        }
    },
    force: {
        base: 'N',
        units: {
            'N': 1,
            'kN': 1000,
            'MN': 1000000,
            'lbf': 4.44822,
            'kgf': 9.80665,
            'dyne': 0.00001,
            'poundal': 0.138255
        }
    },
    pressure: {
        base: 'Pa',
        units: {
            'Pa': 1,
            'kPa': 1000,
            'MPa': 1000000,
            'GPa': 1000000000,
            'bar': 100000,
            'mbar': 100,
            'atm': 101325,
            'torr': 133.322,
            'mmHg': 133.322,
            'psi': 6894.76,
            'ksi': 6894760
        }
    },
    temperature: {
        base: 'K',
        units: {
            'K': 'kelvin',
            '°C': 'celsius',
            '°F': 'fahrenheit',
            '°R': 'rankine'
        }
    },
    energy: {
        base: 'J',
        units: {
            'J': 1,
            'kJ': 1000,
            'MJ': 1000000,
            'GJ': 1000000000,
            'cal': 4.184,
            'kcal': 4184,
            'BTU': 1055.06,
            'kWh': 3600000,
            'eV': 1.60218e-19,
            'ft·lbf': 1.35582,
            'erg': 0.0000001
        }
    },
    power: {
        base: 'W',
        units: {
            'W': 1,
            'kW': 1000,
            'MW': 1000000,
            'GW': 1000000000,
            'hp': 745.7,
            'BTU/h': 0.293071,
            'ft·lbf/s': 1.35582,
            'cal/s': 4.184
        }
    },
    velocity: {
        base: 'm/s',
        units: {
            'm/s': 1,
            'km/h': 0.277778,
            'mph': 0.44704,
            'ft/s': 0.3048,
            'knot': 0.514444,
            'in/s': 0.0254,
            'cm/s': 0.01
        }
    },
    area: {
        base: 'm²',
        units: {
            'm²': 1,
            'km²': 1000000,
            'cm²': 0.0001,
            'mm²': 0.000001,
            'in²': 0.00064516,
            'ft²': 0.092903,
            'yd²': 0.836127,
            'ac': 4046.86,
            'ha': 10000,
            'mi²': 2589988
        }
    },
    volume: {
        base: 'm³',
        units: {
            'm³': 1,
            'L': 0.001,
            'mL': 0.000001,
            'cm³': 0.000001,
            'in³': 0.0000163871,
            'ft³': 0.0283168,
            'yd³': 0.764555,
            'gal': 0.00378541,
            'qt': 0.000946353,
            'pt': 0.000473176,
            'cup': 0.000236588,
            'fl oz': 0.0000295735,
            'tbsp': 0.0000147868,
            'tsp': 0.00000492892
        }
    }
};

// Initialize unit converter
function initializeUnitConverter() {
    const converterType = document.getElementById('converterType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');

    if (!converterType || !fromUnit || !toUnit) return;

    // Populate unit options based on converter type
    function updateUnitOptions() {
        const type = converterType.value;
        const units = conversionFactors[type].units;

        // Clear existing options
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';

        // Add new options
        Object.keys(units).forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit;
            fromUnit.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit;
            toUnit.appendChild(option2);
        });

        // Set default values
        if (Object.keys(units).length > 1) {
            toUnit.selectedIndex = 1;
        }
    }

    // Initial population
    updateUnitOptions();

    // Update options when converter type changes
    converterType.addEventListener('change', updateUnitOptions);

    // Auto-convert when input changes
    if (fromValue) {
        fromValue.addEventListener('input', function() {
            convertUnits();
        });
    }

    // Convert when units change
    if (fromUnit) {
        fromUnit.addEventListener('change', function() {
            convertUnits();
        });
    }

    if (toUnit) {
        toUnit.addEventListener('change', function() {
            convertUnits();
        });
    }
}

// Convert units
function convertUnits() {
    const converterType = document.getElementById('converterType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const resultDiv = document.getElementById('converterResult');

    if (!converterType || !fromUnit || !toUnit || !fromValue || !toValue) return;

    const type = converterType.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(fromValue.value);

    if (isNaN(value)) {
        toValue.value = '';
        if (resultDiv) resultDiv.textContent = '';
        return;
    }

    let result;

    if (type === 'temperature') {
        // Special handling for temperature
        result = convertTemperature(value, from, to);
    } else {
        // Standard conversion
        const factors = conversionFactors[type].units;
        const baseValue = value * factors[from];
        result = baseValue / factors[to];
    }

    toValue.value = formatNumber(result, 6);

    if (resultDiv) {
        resultDiv.textContent = `${formatNumber(value, 6)} ${from} = ${formatNumber(result, 6)} ${to}`;
    }
}

// Convert temperature (special case)
function convertTemperature(value, from, to) {
    // First convert to Kelvin
    let kelvin;

    switch(from) {
        case 'K':
            kelvin = value;
            break;
        case '°C':
            kelvin = value + 273.15;
            break;
        case '°F':
            kelvin = (value - 32) * 5/9 + 273.15;
            break;
        case '°R':
            kelvin = value * 5/9;
            break;
    }

    // Convert from Kelvin to target unit
    switch(to) {
        case 'K':
            return kelvin;
        case '°C':
            return kelvin - 273.15;
        case '°F':
            return (kelvin - 273.15) * 9/5 + 32;
        case '°R':
            return kelvin * 9/5;
    }
}

// Quick conversion function
function quickConvert(value, fromUnit, toUnit, type) {
    if (!conversionFactors[type]) {
        console.error(`Unknown conversion type: ${type}`);
        return null;
    }

    if (type === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }

    const factors = conversionFactors[type].units;
    if (!factors[fromUnit] || !factors[toUnit]) {
        console.error(`Unknown units: ${fromUnit} or ${toUnit}`);
        return null;
    }

    const baseValue = value * factors[fromUnit];
    return baseValue / factors[toUnit];
}

// Get available units for a type
function getUnits(type) {
    if (!conversionFactors[type]) {
        return [];
    }
    return Object.keys(conversionFactors[type].units);
}

// Get all available conversion types
function getConversionTypes() {
    return Object.keys(conversionFactors);
}

// Add custom conversion
function addCustomConversion(type, unitName, factor) {
    if (!conversionFactors[type]) {
        console.error(`Unknown conversion type: ${type}`);
        return false;
    }

    conversionFactors[type].units[unitName] = factor;
    return true;
}

// Common engineering conversions
const commonConversions = {
    // Pressure
    'MPa to psi': (value) => quickConvert(value, 'MPa', 'psi', 'pressure'),
    'psi to MPa': (value) => quickConvert(value, 'psi', 'MPa', 'pressure'),
    'bar to psi': (value) => quickConvert(value, 'bar', 'psi', 'pressure'),
    'Pa to kPa': (value) => quickConvert(value, 'Pa', 'kPa', 'pressure'),

    // Length
    'mm to inch': (value) => quickConvert(value, 'mm', 'in', 'length'),
    'inch to mm': (value) => quickConvert(value, 'in', 'mm', 'length'),
    'm to ft': (value) => quickConvert(value, 'm', 'ft', 'length'),
    'ft to m': (value) => quickConvert(value, 'ft', 'm', 'length'),

    // Force
    'N to lbf': (value) => quickConvert(value, 'N', 'lbf', 'force'),
    'lbf to N': (value) => quickConvert(value, 'lbf', 'N', 'force'),
    'kN to ton': (value) => quickConvert(value, 'kN', 'kgf', 'force') / 1000,

    // Temperature
    'C to F': (value) => convertTemperature(value, '°C', '°F'),
    'F to C': (value) => convertTemperature(value, '°F', '°C'),
    'C to K': (value) => convertTemperature(value, '°C', 'K'),
    'K to C': (value) => convertTemperature(value, 'K', '°C'),

    // Energy
    'J to cal': (value) => quickConvert(value, 'J', 'cal', 'energy'),
    'cal to J': (value) => quickConvert(value, 'cal', 'J', 'energy'),
    'J to BTU': (value) => quickConvert(value, 'J', 'BTU', 'energy'),
    'BTU to J': (value) => quickConvert(value, 'BTU', 'J', 'energy'),

    // Power
    'W to hp': (value) => quickConvert(value, 'W', 'hp', 'power'),
    'hp to W': (value) => quickConvert(value, 'hp', 'W', 'power'),
    'kW to hp': (value) => quickConvert(value, 'kW', 'hp', 'power'),
    'hp to kW': (value) => quickConvert(value, 'hp', 'kW', 'power'),

    // Velocity
    'm/s to km/h': (value) => quickConvert(value, 'm/s', 'km/h', 'velocity'),
    'km/h to m/s': (value) => quickConvert(value, 'km/h', 'm/s', 'velocity'),
    'm/s to mph': (value) => quickConvert(value, 'm/s', 'mph', 'velocity'),
    'mph to m/s': (value) => quickConvert(value, 'mph', 'm/s', 'velocity')
};

// Export functions
window.conversionFactors = conversionFactors;
window.convertUnits = convertUnits;
window.quickConvert = quickConvert;
window.getUnits = getUnits;
window.getConversionTypes = getConversionTypes;
window.addCustomConversion = addCustomConversion;
window.commonConversions = commonConversions;