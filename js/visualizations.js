// Interactive Diagrams and Visualizations

// Chart.js for engineering graphs
const chartColors = {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    grid: '#e2e8f0',
    text: '#64748b'
};

// Stress-Strain Curve Generator
function generateStressStrainCurve(material) {
    const materials = {
        steel: {
            yieldStrength: 250, // MPa
            ultimateStrength: 400, // MPa
            fractureStrength: 350, // MPa
            youngsModulus: 200000, // MPa
            strainAtYield: 0.00125,
            strainAtUltimate: 0.15,
            strainAtFracture: 0.25
        },
        aluminum: {
            yieldStrength: 95,
            ultimateStrength: 110,
            fractureStrength: 90,
            youngsModulus: 69000,
            strainAtYield: 0.0014,
            strainAtUltimate: 0.12,
            strainAtFracture: 0.18
        },
        titanium: {
            yieldStrength: 880,
            ultimateStrength: 950,
            fractureStrength: 900,
            youngsModulus: 110000,
            strainAtYield: 0.008,
            strainAtUltimate: 0.10,
            strainAtFracture: 0.15
        }
    };

    const mat = materials[material] || materials.steel;
    const points = [];

    // Elastic region
    for (let i = 0; i <= 20; i++) {
        const strain = (i / 20) * mat.strainAtYield;
        const stress = strain * mat.youngsModulus;
        points.push({ x: strain * 100, y: stress }); // Convert strain to percentage
    }

    // Plastic region (simplified)
    for (let i = 0; i <= 30; i++) {
        const t = i / 30;
        const strain = mat.strainAtYield + t * (mat.strainAtUltimate - mat.strainAtYield);
        const stress = mat.yieldStrength + t * (mat.ultimateStrength - mat.yieldStrength);
        points.push({ x: strain * 100, y: stress });
    }

    // Necking region
    for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const strain = mat.strainAtUltimate + t * (mat.strainAtFracture - mat.strainAtUltimate);
        const stress = mat.ultimateStrength - t * (mat.ultimateStrength - mat.fractureStrength);
        points.push({ x: strain * 100, y: stress });
    }

    return {
        points: points,
        material: mat,
        annotations: [
            { x: mat.strainAtYield * 100, y: mat.yieldStrength, label: 'Yield Point' },
            { x: mat.strainAtUltimate * 100, y: mat.ultimateStrength, label: 'Ultimate Strength' },
            { x: mat.strainAtFracture * 100, y: mat.fractureStrength, label: 'Fracture' }
        ]
    };
}

// Thermodynamic Diagram Generator
function generateThermodynamicDiagram(type) {
    const diagrams = {
        'ts': {
            // Temperature-Entropy diagram
            title: 'T-s Diagram',
            xAxis: 'Entropy (s)',
            yAxis: 'Temperature (T)',
            curves: [
                {
                    name: 'Isobar',
                    color: chartColors.primary,
                    points: generateIsobarCurve()
                },
                {
                    name: 'Isotherm',
                    color: chartColors.accent,
                    points: generateIsothermCurve()
                }
            ]
        },
        'ph': {
            // Pressure-Enthalpy diagram
            title: 'P-h Diagram',
            xAxis: 'Enthalpy (h)',
            yAxis: 'Pressure (P)',
            curves: [
                {
                    name: 'Saturation Line',
                    color: chartColors.primary,
                    points: generateSaturationCurve()
                },
                {
                    name: 'Isentrope',
                    color: chartColors.accent,
                    points: generateIsentropeCurve()
                }
            ]
        },
        'pv': {
            // Pressure-Volume diagram
            title: 'P-V Diagram',
            xAxis: 'Volume (V)',
            yAxis: 'Pressure (P)',
            curves: [
                {
                    name: 'Isotherm',
                    color: chartColors.primary,
                    points: generatePVIsotherm()
                },
                {
                    name: 'Adiabat',
                    color: chartColors.accent,
                    points: generatePVAdiabat()
                }
            ]
        }
    };

    return diagrams[type] || diagrams['ts'];
}

function generateIsobarCurve() {
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const s = i * 0.01;
        const T = 300 + s * 200; // Simplified relationship
        points.push({ x: s, y: T });
    }
    return points;
}

function generateIsothermCurve() {
    const points = [];
    const T = 400; // Constant temperature
    for (let i = 0; i <= 100; i++) {
        const s = i * 0.01;
        points.push({ x: s, y: T });
    }
    return points;
}

function generateSaturationCurve() {
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const h = i * 10;
        const P = Math.exp(h / 100) * 100; // Simplified saturation curve
        points.push({ x: h, y: P });
    }
    return points;
}

function generateIsentropeCurve() {
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const h = i * 10;
        const P = Math.pow(h / 50, 1.4) * 100; // Isentropic relationship
        points.push({ x: h, y: P });
    }
    return points;
}

function generatePVIsotherm() {
    const points = [];
    const n = 1; // moles
    const R = 8.314; // gas constant
    const T = 300; // temperature

    for (let i = 1; i <= 100; i++) {
        const V = i * 0.001; // volume
        const P = (n * R * T) / V; // ideal gas law
        points.push({ x: V * 1000, y: P / 1000 }); // Convert to reasonable units
    }
    return points;
}

function generatePVAdiabat() {
    const points = [];
    const gamma = 1.4; // heat capacity ratio
    const K = 1000; // constant

    for (let i = 1; i <= 100; i++) {
        const V = i * 0.001;
        const P = K / Math.pow(V, gamma);
        points.push({ x: V * 1000, y: P / 1000 });
    }
    return points;
}

// Interactive 3D Visualization Functions
function create3DBeamVisualization() {
    return {
        type: 'beam',
        dimensions: {
            length: 2,
            width: 0.1,
            height: 0.2
        },
        supports: ['simply_supported'],
        loads: [
            {
                type: 'point',
                position: 1,
                magnitude: 1000,
                direction: 'down'
            }
        ],
        deformations: {
            maxDeflection: 0.01,
            deflectionCurve: generateDeflectionCurve()
        }
    };
}

function generateDeflectionCurve() {
    const points = [];
    const L = 2; // beam length
    const P = 1000; // load
    const E = 200e9; // Young's modulus
    const I = 0.0001; // moment of inertia

    for (let i = 0; i <= 100; i++) {
        const x = (i / 100) * L;
        const deflection = (P * x * (3 * L * L - 4 * x * x)) / (48 * E * I);
        points.push({ x: x, y: deflection * 1000 }); // Convert to mm
    }
    return points;
}

// Material Properties Visualization
function createMaterialPropertiesChart(materials) {
    const datasets = [
        {
            label: 'Yield Strength (MPa)',
            data: materials.map(m => m.yieldStrength),
            backgroundColor: chartColors.primary
        },
        {
            label: 'Young\'s Modulus (GPa)',
            data: materials.map(m => m.youngsModulus),
            backgroundColor: chartColors.accent
        },
        {
            label: 'Density (kg/m³)',
            data: materials.map(m => m.density / 100), // Scaled for visibility
            backgroundColor: chartColors.success
        }
    ];

    return {
        labels: materials.map(m => m.name),
        datasets: datasets
    };
}

// Fatigue S-N Curve Generator
function generateSNCurve(material) {
    const materials = {
        steel: {
            enduranceLimit: 200, // MPa
            ultimateStrength: 400, // MPa
            cyclesAtEndurance: 1e6,
            slope: -0.1
        },
        aluminum: {
            enduranceLimit: 90,
            ultimateStrength: 110,
            cyclesAtEndurance: 5e8,
            slope: -0.12
        },
        titanium: {
            enduranceLimit: 500,
            ultimateStrength: 950,
            cyclesAtEndurance: 1e7,
            slope: -0.08
        }
    };

    const mat = materials[material] || materials.steel;
    const points = [];

    // Generate S-N curve points
    for (let i = 0; i <= 10; i++) {
        const cycles = Math.pow(10, i + 3); // 10^3 to 10^13 cycles
        let stress;

        if (cycles < mat.cyclesAtEndurance) {
            // Below endurance limit
            stress = mat.ultimateStrength * Math.pow(cycles / 1000, mat.slope);
        } else {
            // Above endurance limit (horizontal line)
            stress = mat.enduranceLimit;
        }

        points.push({ x: cycles, y: stress });
    }

    return {
        points: points,
        enduranceLimit: mat.enduranceLimit,
        ultimateStrength: mat.ultimateStrength
    };
}

// Fracture Toughness Chart
function generateFractureToughnessChart() {
    const materials = [
        { name: 'Steel 4140', K_IC: 55, thickness: 25 },
        { name: 'Aluminum 7075', K_IC: 24, thickness: 20 },
        { name: 'Titanium 6Al-4V', K_IC: 50, thickness: 15 },
        { name: 'Stainless 304', K_IC: 200, thickness: 30 },
        { name: 'Inconel 718', K_IC: 100, thickness: 18 }
    ];

    return {
        materials: materials,
        chartData: {
            labels: materials.map(m => m.name),
            datasets: [{
                label: 'Fracture Toughness K_IC (MPa√m)',
                data: materials.map(m => m.K_IC),
                backgroundColor: materials.map((_, i) => chartColors.primary)
            }]
        }
    };
}

// Creep Curve Generator
function generateCreepCurve(material, temperature, stress) {
    const materials = {
        steel: {
            primaryStrainRate: 0.001,
            secondaryStrainRate: 0.0001,
            tertiaryStrainRate: 0.01,
            transitionTime1: 100,
            transitionTime2: 1000
        },
        aluminum: {
            primaryStrainRate: 0.002,
            secondaryStrainRate: 0.0002,
            tertiaryStrainRate: 0.02,
            transitionTime1: 50,
            transitionTime2: 500
        },
        titanium: {
            primaryStrainRate: 0.0005,
            secondaryStrainRate: 0.00005,
            tertiaryStrainRate: 0.005,
            transitionTime1: 200,
            transitionTime2: 2000
        }
    };

    const mat = materials[material] || materials.steel;
    const points = [];
    let totalStrain = 0;

    for (let i = 0; i <= 100; i++) {
        const time = i * 10; // hours
        let strainRate;

        if (time < mat.transitionTime1) {
            // Primary creep
            strainRate = mat.primaryStrainRate * Math.exp(-time / mat.transitionTime1);
        } else if (time < mat.transitionTime2) {
            // Secondary creep
            strainRate = mat.secondaryStrainRate;
        } else {
            // Tertiary creep
            strainRate = mat.secondaryStrainRate + mat.tertiaryStrainRate *
                Math.pow((time - mat.transitionTime2) / mat.transitionTime2, 2);
        }

        totalStrain += strainRate * 10; // dt = 10 hours
        points.push({ x: time, y: totalStrain * 100 }); // Convert to percentage
    }

    return {
        points: points,
        stages: [
            { end: mat.transitionTime1, name: 'Primary Creep' },
            { end: mat.transitionTime2, name: 'Secondary Creep' },
            { end: 1000, name: 'Tertiary Creep' }
        ]
    };
}

// Heat Transfer Visualization
function createHeatTransferVisualization(type) {
    const visualizations = {
        'conduction': {
            title: 'Heat Conduction Through Wall',
            layers: [
                { material: 'Steel', thickness: 0.01, conductivity: 50 },
                { material: 'Insulation', thickness: 0.1, conductivity: 0.04 },
                { material: 'Steel', thickness: 0.01, conductivity: 50 }
            ],
            temperatures: {
                hot: 500,
                cold: 20
            }
        },
        'convection': {
            title: 'Heat Convection from Surface',
            surface: {
                temperature: 100,
                area: 1,
                coefficient: 10
            },
            fluid: {
                temperature: 20,
                velocity: 2
            }
        },
        'radiation': {
            title: 'Heat Radiation Between Surfaces',
            surface1: {
                temperature: 800,
                emissivity: 0.8,
                area: 1
            },
            surface2: {
                temperature: 300,
                emissivity: 0.6,
                area: 1
            }
        }
    };

    return visualizations[type] || visualizations['conduction'];
}

// Fluid Flow Visualization
function createFluidFlowVisualization(type) {
    const visualizations = {
        'laminar': {
            title: 'Laminar Flow Profile',
            reynolds: 1000,
            velocityProfile: generateLaminarProfile(),
            characteristics: [
                'Smooth, layered flow',
                'Parabolic velocity profile',
                'Low mixing',
                'Predictable behavior'
            ]
        },
        'turbulent': {
            title: 'Turbulent Flow Profile',
            reynolds: 10000,
            velocityProfile: generateTurbulentProfile(),
            characteristics: [
                'Chaotic, mixing flow',
                'Flatter velocity profile',
                'High mixing',
                'Complex behavior'
            ]
        },
        'transition': {
            title: 'Transitional Flow',
            reynolds: 3000,
            velocityProfile: generateTransitionalProfile(),
            characteristics: [
                'Intermittent flow',
                'Unstable behavior',
                'Mixed characteristics',
                'Critical region'
            ]
        }
    };

    return visualizations[type] || visualizations['laminar'];
}

function generateLaminarProfile() {
    const points = [];
    for (let i = 0; i <= 20; i++) {
        const r = (i / 20) * 2 - 1; // -1 to 1 (normalized radius)
        const v = 1 - r * r; // Parabolic profile
        points.push({ x: r, y: v });
    }
    return points;
}

function generateTurbulentProfile() {
    const points = [];
    for (let i = 0; i <= 20; i++) {
        const r = (i / 20) * 2 - 1;
        const v = Math.pow(1 - Math.abs(r), 1/7); // 1/7th power law
        points.push({ x: r, y: v });
    }
    return points;
}

function generateTransitionalProfile() {
    const points = [];
    for (let i = 0; i <= 20; i++) {
        const r = (i / 20) * 2 - 1;
        // Blend between laminar and turbulent
        const laminarV = 1 - r * r;
        const turbulentV = Math.pow(1 - Math.abs(r), 1/7);
        const v = 0.5 * laminarV + 0.5 * turbulentV;
        points.push({ x: r, y: v });
    }
    return points;
}

// Gear Visualization
function createGearVisualization(teeth, module, pressureAngle) {
    return {
        type: 'spur_gear',
        parameters: {
            teeth: teeth,
            module: module,
            pressureAngle: pressureAngle,
            pitchDiameter: teeth * module,
            addendum: module,
            dedendum: 1.25 * module,
            wholeDepth: 2.25 * module
        },
        toothProfile: generateGearToothProfile(teeth, module, pressureAngle)
    };
}

function generateGearToothProfile(teeth, module, pressureAngle) {
    const points = [];
    const pitchRadius = (teeth * module) / 2;
    const baseRadius = pitchRadius * Math.cos(pressureAngle * Math.PI / 180);
    const addendumRadius = pitchRadius + module;
    const dedendumRadius = pitchRadius - 1.25 * module;

    // Generate involute profile points
    for (let i = 0; i <= 20; i++) {
        const angle = (i / 20) * (Math.PI / teeth);
        const r = baseRadius + (addendumRadius - baseRadius) * (i / 20);
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        points.push({ x, y });
    }

    return points;
}

// Bearing Visualization
function createBearingVisualization(type, dimensions) {
    return {
        type: type,
        dimensions: dimensions,
        components: {
            innerRace: {
                innerDiameter: dimensions.bore,
                outerDiameter: dimensions.bore + dimensions.width * 0.3
            },
            outerRace: {
                innerDiameter: dimensions.outerDiameter - dimensions.width * 0.3,
                outerDiameter: dimensions.outerDiameter
            },
            rollingElements: {
                type: type === 'ball' ? 'ball' : 'roller',
                count: type === 'ball' ? 8 : 12,
                diameter: dimensions.width * 0.2
            },
            cage: {
                type: 'ribbon',
                material: 'steel'
            }
        },
        loadDistribution: generateBearingLoadDistribution(type, dimensions)
    };
}

function generateBearingLoadDistribution(type, dimensions) {
    const points = [];
    const numElements = type === 'ball' ? 8 : 12;

    for (let i = 0; i < numElements; i++) {
        const angle = (i / numElements) * 2 * Math.PI;
        const load = Math.cos(angle) * 100; // Simplified load distribution
        points.push({ angle: angle * 180 / Math.PI, load: Math.max(0, load) });
    }

    return points;
}

// Export all visualization functions
window.generateStressStrainCurve = generateStressStrainCurve;
window.generateThermodynamicDiagram = generateThermodynamicDiagram;
window.create3DBeamVisualization = create3DBeamVisualization;
window.createMaterialPropertiesChart = createMaterialPropertiesChart;
window.generateSNCurve = generateSNCurve;
window.generateFractureToughnessChart = generateFractureToughnessChart;
window.generateCreepCurve = generateCreepCurve;
window.createHeatTransferVisualization = createHeatTransferVisualization;
window.createFluidFlowVisualization = createFluidFlowVisualization;
window.createGearVisualization = createGearVisualization;
window.createBearingVisualization = createBearingVisualization;