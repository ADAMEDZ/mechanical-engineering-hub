// Materials Database and Search Functionality

// Comprehensive materials database
const materialsDatabase = [
    {
        name: 'AISI 1018 Steel',
        category: 'steel',
        density: 7870,
        yieldStrength: 370,
        ultimateStrength: 440,
        youngsModulus: 205,
        thermalConductivity: 51.9,
        applications: 'General purpose, shafts, pins'
    },
    {
        name: 'AISI 1045 Steel',
        category: 'steel',
        density: 7850,
        yieldStrength: 450,
        ultimateStrength: 655,
        youngsModulus: 205,
        thermalConductivity: 49.8,
        applications: 'Gears, shafts, machinery parts'
    },
    {
        name: 'AISI 4140 Steel',
        category: 'steel',
        density: 7850,
        yieldStrength: 655,
        ultimateStrength: 1020,
        youngsModulus: 205,
        thermalConductivity: 42.7,
        applications: 'High-strength applications, crankshafts'
    },
    {
        name: 'Stainless Steel 304',
        category: 'steel',
        density: 8000,
        yieldStrength: 290,
        ultimateStrength: 580,
        youngsModulus: 193,
        thermalConductivity: 16.2,
        applications: 'Food processing, chemical equipment'
    },
    {
        name: 'Stainless Steel 316',
        category: 'steel',
        density: 8000,
        yieldStrength: 290,
        ultimateStrength: 580,
        youngsModulus: 193,
        thermalConductivity: 16.3,
        applications: 'Marine environments, chemical processing'
    },
    {
        name: '6061-T6 Aluminum',
        category: 'aluminum',
        density: 2700,
        yieldStrength: 276,
        ultimateStrength: 310,
        youngsModulus: 68.9,
        thermalConductivity: 167,
        applications: 'Structural components, marine fittings'
    },
    {
        name: '7075-T6 Aluminum',
        category: 'aluminum',
        density: 2810,
        yieldStrength: 503,
        ultimateStrength: 572,
        youngsModulus: 71.7,
        thermalConductivity: 130,
        applications: 'Aerospace, high-strength applications'
    },
    {
        name: '2024-T3 Aluminum',
        category: 'aluminum',
        density: 2780,
        yieldStrength: 345,
        ultimateStrength: 470,
        youngsModulus: 73.1,
        thermalConductivity: 120,
        applications: 'Aircraft structures, wing skins'
    },
    {
        name: 'Ti-6Al-4V Titanium',
        category: 'titanium',
        density: 4430,
        yieldStrength: 880,
        ultimateStrength: 950,
        youngsModulus: 113.8,
        thermalConductivity: 6.7,
        applications: 'Aerospace, medical implants, high-performance'
    },
    {
        name: 'Commercially Pure Titanium',
        category: 'titanium',
        density: 4500,
        yieldStrength: 170,
        ultimateStrength: 240,
        youngsModulus: 105,
        thermalConductivity: 21.9,
        applications: 'Chemical processing, marine applications'
    },
    {
        name: 'C110 Copper',
        category: 'copper',
        density: 8960,
        yieldStrength: 70,
        ultimateStrength: 220,
        youngsModulus: 110,
        thermalConductivity: 401,
        applications: 'Electrical conductors, heat exchangers'
    },
    {
        name: 'Brass C36000',
        category: 'copper',
        density: 8500,
        yieldStrength: 124,
        ultimateStrength: 300,
        youngsModulus: 97,
        thermalConductivity: 109,
        applications: 'Gears, valves, fittings'
    },
    {
        name: 'Bronze C93200',
        category: 'copper',
        density: 8800,
        yieldStrength: 124,
        ultimateStrength: 241,
        youngsModulus: 103,
        thermalConductivity: 41,
        applications: 'Bearings, bushings, marine hardware'
    },
    {
        name: 'ABS Plastic',
        category: 'plastics',
        density: 1050,
        yieldStrength: 40,
        ultimateStrength: 45,
        youngsModulus: 2.3,
        thermalConductivity: 0.19,
        applications: 'Automotive parts, consumer goods'
    },
    {
        name: 'Nylon 6/6',
        category: 'plastics',
        density: 1150,
        yieldStrength: 75,
        ultimateStrength: 85,
        youngsModulus: 2.8,
        thermalConductivity: 0.25,
        applications: 'Gears, bearings, mechanical parts'
    },
    {
        name: 'Polycarbonate',
        category: 'plastics',
        density: 1200,
        yieldStrength: 65,
        ultimateStrength: 70,
        youngsModulus: 2.4,
        thermalConductivity: 0.2,
        applications: 'Safety equipment, electronic components'
    },
    {
        name: 'Carbon Fiber Composite',
        category: 'composites',
        density: 1600,
        yieldStrength: 600,
        ultimateStrength: 900,
        youngsModulus: 70,
        thermalConductivity: 10,
        applications: 'Aerospace, sporting goods, automotive'
    },
    {
        name: 'Glass Fiber Composite',
        category: 'composites',
        density: 2000,
        yieldStrength: 200,
        ultimateStrength: 340,
        youngsModulus: 25,
        thermalConductivity: 0.3,
        applications: 'Boats, tanks, pipes'
    },
    {
        name: 'Aramid Fiber Composite',
        category: 'composites',
        density: 1400,
        yieldStrength: 3600,
        ultimateStrength: 3800,
        youngsModulus: 130,
        thermalConductivity: 0.04,
        applications: 'Ballistic protection, aerospace'
    }
];

// Initialize materials table
function initializeMaterialsTable() {
    const tableBody = document.getElementById('materialsTableBody');
    const searchInput = document.getElementById('materialSearch');
    const categorySelect = document.getElementById('materialCategory');

    if (!tableBody) return;

    // Initial population
    populateMaterialsTable(materialsDatabase);

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterMaterials();
        });
    }

    // Category filter functionality
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            filterMaterials();
        });
    }
}

// Populate materials table
function populateMaterialsTable(materials) {
    const tableBody = document.getElementById('materialsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    materials.forEach(material => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${material.name}</strong></td>
            <td>${formatNumber(material.density, 0)}</td>
            <td>${formatNumber(material.yieldStrength, 0)}</td>
            <td>${formatNumber(material.ultimateStrength, 0)}</td>
            <td>${formatNumber(material.youngsModulus, 1)}</td>
            <td>${formatNumber(material.thermalConductivity, 1)}</td>
            <td>${material.applications}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter materials based on search and category
function filterMaterials() {
    const searchInput = document.getElementById('materialSearch');
    const categorySelect = document.getElementById('materialCategory');

    if (!searchInput || !categorySelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    let filteredMaterials = materialsDatabase;

    // Filter by category
    if (category !== 'all') {
        filteredMaterials = filteredMaterials.filter(material =>
            material.category === category
        );
    }

    // Filter by search term
    if (searchTerm) {
        filteredMaterials = filteredMaterials.filter(material =>
            material.name.toLowerCase().includes(searchTerm) ||
            material.applications.toLowerCase().includes(searchTerm)
        );
    }

    populateMaterialsTable(filteredMaterials);
}

// Get material by name
function getMaterialByName(name) {
    return materialsDatabase.find(material =>
        material.name.toLowerCase() === name.toLowerCase()
    );
}

// Get materials by category
function getMaterialsByCategory(category) {
    return materialsDatabase.filter(material =>
        material.category === category
    );
}

// Compare materials
function compareMaterials(materialNames) {
    return materialNames.map(name => {
        const material = getMaterialByName(name);
        if (material) {
            return {
                name: material.name,
                strengthToWeight: (material.yieldStrength * 1e6) / material.density,
                stiffnessToWeight: (material.youngsModulus * 1e9) / material.density,
                thermalEfficiency: material.thermalConductivity / material.density
            };
        }
        return null;
    }).filter(Boolean);
}

// Find best material for specific criteria
function findBestMaterial(criteria) {
    let bestMaterial = null;
    let bestValue = -Infinity;

    materialsDatabase.forEach(material => {
        let value;

        switch(criteria) {
            case 'strength':
                value = material.yieldStrength;
                break;
            case 'stiffness':
                value = material.youngsModulus;
                break;
            case 'strengthToWeight':
                value = (material.yieldStrength * 1e6) / material.density;
                break;
            case 'stiffnessToWeight':
                value = (material.youngsModulus * 1e9) / material.density;
                break;
            case 'thermalConductivity':
                value = material.thermalConductivity;
                break;
            case 'lightweight':
                value = -material.density; // Negative for minimization
                break;
            default:
                value = 0;
        }

        if (value > bestValue) {
            bestValue = value;
            bestMaterial = material;
        }
    });

    return bestMaterial;
}

// Material recommendation system
function recommendMaterial(requirements) {
    const recommendations = [];

    materialsDatabase.forEach(material => {
        let score = 0;
        let reasons = [];

        // Check strength requirement
        if (requirements.minYieldStrength && material.yieldStrength >= requirements.minYieldStrength) {
            score += 2;
            reasons.push('Meets strength requirement');
        } else if (requirements.minYieldStrength) {
            score -= 1;
            reasons.push('Below strength requirement');
        }

        // Check stiffness requirement
        if (requirements.minYoungsModulus && material.youngsModulus >= requirements.minYoungsModulus) {
            score += 2;
            reasons.push('Meets stiffness requirement');
        } else if (requirements.minYoungsModulus) {
            score -= 1;
            reasons.push('Below stiffness requirement');
        }

        // Check weight requirement
        if (requirements.maxDensity && material.density <= requirements.maxDensity) {
            score += 2;
            reasons.push('Meets weight requirement');
        } else if (requirements.maxDensity) {
            score -= 1;
            reasons.push('Exceeds weight limit');
        }

        // Check thermal requirement
        if (requirements.minThermalConductivity && material.thermalConductivity >= requirements.minThermalConductivity) {
            score += 2;
            reasons.push('Meets thermal requirement');
        } else if (requirements.minThermalConductivity) {
            score -= 1;
            reasons.push('Below thermal requirement');
        }

        // Check cost (simplified - steel is cheapest, titanium most expensive)
        if (requirements.costSensitive) {
            if (material.category === 'steel') {
                score += 2;
                reasons.push('Cost-effective');
            } else if (material.category === 'titanium') {
                score -= 2;
                reasons.push('Expensive');
            }
        }

        // Check corrosion resistance
        if (requirements.corrosionResistance) {
            if (material.category === 'stainlessSteel' || material.category === 'titanium') {
                score += 2;
                reasons.push('Excellent corrosion resistance');
            } else if (material.category === 'aluminum') {
                score += 1;
                reasons.push('Good corrosion resistance');
            } else if (material.category === 'copper') {
                score += 1;
                reasons.push('Good corrosion resistance');
            }
        }

        // Check temperature resistance
        if (requirements.highTemperature) {
            if (material.category === 'titanium' || material.name.includes('Stainless')) {
                score += 2;
                reasons.push('High temperature capability');
            } else if (material.category === 'steel') {
                score += 1;
                reasons.push('Moderate temperature capability');
            } else {
                score -= 1;
                reasons.push('Limited temperature capability');
            }
        }

        if (score > 0) {
            recommendations.push({
                material: material,
                score: score,
                reasons: reasons
            });
        }
    });

    // Sort by score (descending)
    recommendations.sort((a, b) => b.score - a.score);

    return recommendations.slice(0, 5); // Return top 5 recommendations
}

// Export functions
window.materialsDatabase = materialsDatabase;
window.getMaterialByName = getMaterialByName;
window.getMaterialsByCategory = getMaterialsByCategory;
window.compareMaterials = compareMaterials;
window.findBestMaterial = findBestMaterial;
window.recommendMaterial = recommendMaterial;