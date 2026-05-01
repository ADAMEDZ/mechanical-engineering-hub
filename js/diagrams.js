// Interactive Diagrams Functionality

// Initialize diagrams when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDiagramTabs();
    initializeReferenceTabs();
    initializeMaterialSearch();
    initializeViewOptions();
});

// Diagram tab functionality
function initializeDiagramTabs() {
    const tabBtns = document.querySelectorAll('.diagram-categories .tab-btn');
    const diagramContents = document.querySelectorAll('.diagram-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs
                tabBtns.forEach(tab => tab.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                const tab = this.getAttribute('data-tab');

                // Show/hide diagram content
                diagramContents.forEach(content => {
                    if (content.id === tab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Reference tab functionality
function initializeReferenceTabs() {
    const refTabs = document.querySelectorAll('.ref-tab');
    const refContents = document.querySelectorAll('.ref-content');

    if (refTabs.length > 0) {
        refTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                refTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                const tabName = this.getAttribute('data-tab');

                // Show/hide reference content
                refContents.forEach(content => {
                    if (content.id === tabName) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Material search functionality
function initializeMaterialSearch() {
    const searchBtn = document.querySelector('.search-actions .btn-primary');
    const resetBtn = document.querySelector('.search-actions .btn-secondary');

    if (searchBtn) {
        searchBtn.addEventListener('click', searchMaterials);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetMaterialSearch);
    }
}

// View options functionality
function initializeViewOptions() {
    const viewBtns = document.querySelectorAll('.view-btn');

    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                viewBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const view = this.getAttribute('data-view');
                displayMaterialsResults(view);
            });
        });
    }
}

// Search materials function
function searchMaterials() {
    const category = document.getElementById('materialCategory').value;
    const minDensity = parseFloat(document.getElementById('minDensity').value) || 0;
    const maxDensity = parseFloat(document.getElementById('maxDensity').value) || Infinity;
    const minYieldStrength = parseFloat(document.getElementById('minYieldStrength').value) || 0;
    const maxYieldStrength = parseFloat(document.getElementById('maxYieldStrength').value) || Infinity;
    const corrosionResistance = document.getElementById('corrosionResistance').value;
    const weldability = document.getElementById('weldability').value;
    const maxCost = document.getElementById('maxCost').value;
    const searchTerm = document.getElementById('materialSearchTerm').value.toLowerCase();

    const criteria = {
        category: category === 'all' ? null : category,
        minDensity: minDensity,
        maxDensity: maxDensity,
        minYieldStrength: minYieldStrength,
        maxYieldStrength: maxYieldStrength,
        corrosionResistance: corrosionResistance === 'all' ? null : corrosionResistance,
        weldability: weldability === 'all' ? null : weldability,
        maxCost: maxCost === 'all' ? null : maxCost,
        searchTerm: searchTerm || null
    };

    const results = window.searchMaterialsAdvanced(criteria);
    displayMaterialsResults('table', results);
}

// Reset material search
function resetMaterialSearch() {
    document.getElementById('materialCategory').value = 'all';
    document.getElementById('minDensity').value = '';
    document.getElementById('maxDensity').value = '';
    document.getElementById('minYieldStrength').value = '';
    document.getElementById('maxYieldStrength').value = '';
    document.getElementById('corrosionResistance').value = 'all';
    document.getElementById('weldability').value = 'all';
    document.getElementById('maxCost').value = 'all';
    document.getElementById('materialSearchTerm').value = '';

    // Display all materials
    displayMaterialsResults('table', window.extendedMaterialsDatabase);
}

// Display materials results
function displayMaterialsResults(view, materials) {
    if (!materials) {
        materials = window.extendedMaterialsDatabase;
    }

    const resultsContainer = document.getElementById('materialsResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!resultsContainer || !resultsCount) return;

    resultsCount.textContent = materials.length;

    if (view === 'table') {
        displayMaterialsTable(materials, resultsContainer);
    } else if (view === 'cards') {
        displayMaterialsCards(materials, resultsContainer);
    } else if (view === 'compare') {
        displayMaterialsCompare(materials, resultsContainer);
    }
}

// Display materials as table
function displayMaterialsTable(materials, container) {
    let html = `
        <table class="materials-table">
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Category</th>
                    <th>Density (kg/m³)</th>
                    <th>Yield (MPa)</th>
                    <th>Ultimate (MPa)</th>
                    <th>Young's (GPa)</th>
                    <th>Thermal (W/m·K)</th>
                    <th>Corrosion</th>
                    <th>Weldability</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
    `;

    materials.forEach(material => {
        html += `
            <tr>
                <td><strong>${material.name}</strong></td>
                <td>${material.category}</td>
                <td>${formatNumber(material.density, 0)}</td>
                <td>${formatNumber(material.yieldStrength, 0)}</td>
                <td>${formatNumber(material.ultimateStrength, 0)}</td>
                <td>${formatNumber(material.youngsModulus, 1)}</td>
                <td>${formatNumber(material.thermalConductivity, 1)}</td>
                <td>${material.corrosionResistance}</td>
                <td>${material.weldability}</td>
                <td>${material.cost}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Display materials as cards
function displayMaterialsCards(materials, container) {
    let html = '<div class="materials-cards-grid">';

    materials.forEach(material => {
        html += `
            <div class="material-card">
                <h4>${material.name}</h4>
                <div class="material-category">${material.category} - ${material.subcategory}</div>
                <div class="material-properties">
                    <div class="property-row">
                        <span class="property-label">Density:</span>
                        <span class="property-value">${formatNumber(material.density, 0)} kg/m³</span>
                    </div>
                    <div class="property-row">
                        <span class="property-label">Yield Strength:</span>
                        <span class="property-value">${formatNumber(material.yieldStrength, 0)} MPa</span>
                    </div>
                    <div class="property-row">
                        <span class="property-label">Young's Modulus:</span>
                        <span class="property-value">${formatNumber(material.youngsModulus, 1)} GPa</span>
                    </div>
                    <div class="property-row">
                        <span class="property-label">Thermal Conductivity:</span>
                        <span class="property-value">${formatNumber(material.thermalConductivity, 1)} W/m·K</span>
                    </div>
                </div>
                <div class="material-qualities">
                    <span class="quality-badge corrosion-${material.corrosionResistance}">${material.corrosionResistance}</span>
                    <span class="quality-badge weld-${material.weldability}">${material.weldability}</span>
                    <span class="quality-badge cost-${material.cost}">${material.cost}</span>
                </div>
                <div class="material-applications">
                    <strong>Applications:</strong> ${material.applications}
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Display materials comparison
function displayMaterialsCompare(materials, container) {
    if (materials.length === 0) {
        container.innerHTML = '<p>No materials to compare</p>';
        return;
    }

    const comparison = window.compareMaterialsDetailed(materials.map(m => m.name));

    let html = `
        <div class="materials-comparison">
            <h4>Material Comparison Analysis</h4>
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Strength/Weight (kN·m/kg)</th>
                        <th>Stiffness/Weight (MN·m/kg)</th>
                        <th>Thermal Efficiency (W·m/kg·K)</th>
                        <th>Overall Rating</th>
                    </tr>
                </thead>
                <tbody>
    `;

    comparison.forEach(material => {
        html += `
            <tr>
                <td><strong>${material.name}</strong></td>
                <td>${formatNumber(material.strengthToWeight / 1000, 1)}</td>
                <td>${formatNumber(material.stiffnessToWeight / 1e6, 2)}</td>
                <td>${formatNumber(material.thermalEfficiency, 3)}</td>
                <td><div class="rating-bar">
                    <div class="rating-fill" style="width: ${Math.min(100, material.overallRating)}%"></div>
                    <span class="rating-text">${formatNumber(material.overallRating, 1)}/100</span>
                </div></td>
            </tr>
        `;
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// Generate stress-strain diagram
function generateStressStrainDiagram() {
    const material = document.getElementById('stressMaterial').value;
    const canvas = document.getElementById('stressStrainCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const data = window.generateStressStrainCurve(material);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    drawAxes(ctx, canvas.width, canvas.height, 'Strain (%)', 'Stress (MPa)');

    // Draw stress-strain curve
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;

    const padding = 60;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;

    const maxStrain = Math.max(...data.points.map(p => p.x));
    const maxStress = Math.max(...data.points.map(p => p.y));

    data.points.forEach((point, index) => {
        const x = padding + (point.x / maxStrain) * graphWidth;
        const y = canvas.height - padding - (point.y / maxStress) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw annotations
    data.annotations.forEach(annotation => {
        const x = padding + (annotation.x / maxStrain) * graphWidth;
        const y = canvas.height - padding - (annotation.y / maxStress) * graphHeight;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.fillText(annotation.label, x + 10, y - 10);
    });

    // Draw material info
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px Inter';
    ctx.fillText(`Material: ${material.charAt(0).toUpperCase() + material.slice(1)}`, padding, 30);
    ctx.font = '12px Inter';
    ctx.fillText(`Young's Modulus: ${data.material.youngsModulus} GPa`, padding, 50);
    ctx.fillText(`Yield Strength: ${data.material.yieldStrength} MPa`, padding, 70);
}

// Generate thermodynamic diagram
function generateThermoDiagram() {
    const type = document.getElementById('thermoDiagram').value;
    const canvas = document.getElementById('thermoCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const diagram = window.generateThermodynamicDiagram(type);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    drawAxes(ctx, canvas.width, canvas.height, diagram.xAxis, diagram.yAxis);

    // Draw curves
    const padding = 60;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;

    const colors = ['#2563eb', '#10b981', '#f59e0b'];

    diagram.curves.forEach((curve, curveIndex) => {
        ctx.beginPath();
        ctx.strokeStyle = colors[curveIndex % colors.length];
        ctx.lineWidth = 2;

        const maxX = Math.max(...curve.points.map(p => p.x));
        const maxY = Math.max(...curve.points.map(p => p.y));

        curve.points.forEach((point, index) => {
            const x = padding + (point.x / maxX) * graphWidth;
            const y = canvas.height - padding - (point.y / maxY) * graphHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw legend
        ctx.fillStyle = colors[curveIndex % colors.length];
        ctx.fillRect(canvas.width - 150, 30 + curveIndex * 25, 15, 15);
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.fillText(curve.name, canvas.width - 130, 42 + curveIndex * 25);
    });

    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px Inter';
    ctx.fillText(diagram.title, padding, 30);
}

// Generate fatigue diagram
function generateFatigueDiagram() {
    const material = document.getElementById('fatigueMaterial').value;
    const canvas = document.getElementById('fatigueCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const data = window.generateSNCurve(material);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes (log scale for cycles)
    drawLogAxes(ctx, canvas.width, canvas.height, 'Cycles (log)', 'Stress (MPa)');

    const padding = 60;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;

    const maxStress = Math.max(...data.points.map(p => p.y));
    const minCycles = Math.min(...data.points.map(p => p.x));
    const maxCycles = Math.max(...data.points.map(p => p.x));

    // Draw S-N curve
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;

    data.points.forEach((point, index) => {
        const x = padding + (Math.log10(point.x) - Math.log10(minCycles)) /
                    (Math.log10(maxCycles) - Math.log10(minCycles)) * graphWidth;
        const y = canvas.height - padding - (point.y / maxStress) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw endurance limit line
    if (data.enduranceLimit) {
        const enduranceY = canvas.height - padding - (data.enduranceLimit / maxStress) * graphHeight;
        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.moveTo(padding, enduranceY);
        ctx.lineTo(canvas.width - padding, enduranceY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#10b981';
        ctx.font = '12px Inter';
        ctx.fillText(`Endurance Limit: ${data.enduranceLimit} MPa`, padding + 10, enduranceY - 10);
    }

    // Draw material info
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px Inter';
    ctx.fillText(`Material: ${material.charAt(0).toUpperCase() + material.slice(1)}`, padding, 30);
    ctx.font = '12px Inter';
    ctx.fillText(`Ultimate Strength: ${data.ultimateStrength} MPa`, padding, 50);
}

// Generate creep diagram
function generateCreepDiagram() {
    const material = document.getElementById('creepMaterial').value;
    const temperature = parseFloat(document.getElementById('creepTemperature').value);
    const stress = parseFloat(document.getElementById('creepStress').value);
    const canvas = document.getElementById('creepCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const data = window.generateCreepCurve(material, temperature, stress);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    drawAxes(ctx, canvas.width, canvas.height, 'Time (hours)', 'Strain (%)');

    const padding = 60;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;

    const maxTime = Math.max(...data.points.map(p => p.x));
    const maxStrain = Math.max(...data.points.map(p => p.y));

    // Draw creep curve
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;

    data.points.forEach((point, index) => {
        const x = padding + (point.x / maxTime) * graphWidth;
        const y = canvas.height - padding - (point.y / maxStrain) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw stage boundaries
    data.stages.forEach((stage, index) => {
        const x = padding + (stage.end / maxTime) * graphWidth;

        ctx.beginPath();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f59e0b';
        ctx.font = '11px Inter';
        ctx.fillText(stage.name, x + 5, canvas.height - padding - 10);
    });

    // Draw material info
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px Inter';
    ctx.fillText(`Material: ${material.charAt(0).toUpperCase() + material.slice(1)}`, padding, 30);
    ctx.font = '12px Inter';
    ctx.fillText(`Temperature: ${temperature}°C, Stress: ${stress} MPa`, padding, 50);
}

// Generate heat transfer diagram
function generateHeatTransferDiagram() {
    const type = document.getElementById('heatTransferType').value;
    const canvas = document.getElementById('heatTransferCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const visualization = window.createHeatTransferVisualization(type);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px Inter';
    ctx.fillText(visualization.title, 60, 30);

    // Draw visualization based on type
    if (type === 'conduction') {
        drawConductionVisualization(ctx, canvas, visualization);
    } else if (type === 'convection') {
        drawConvectionVisualization(ctx, canvas, visualization);
    } else if (type === 'radiation') {
        drawRadiationVisualization(ctx, canvas, visualization);
    }
}

// Generate flow profile
function generateFlowProfile() {
    const type = document.getElementById('flowType').value;
    const canvas = document.getElementById('flowCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const visualization = window.createFluidFlowVisualization(type);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px Inter';
    ctx.fillText(visualization.title, 60, 30);

    // Draw pipe
    const pipeY = 100;
    const pipeHeight = 300;
    const pipeWidth = 600;
    const pipeX = 100;

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(pipeX, pipeY, pipeWidth, pipeHeight);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.strokeRect(pipeX, pipeY, pipeWidth, pipeHeight);

    // Draw velocity profile
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;

    const centerX = pipeX + pipeWidth / 2;
    const centerY = pipeY + pipeHeight / 2;

    visualization.velocityProfile.forEach((point, index) => {
        const x = centerX + (point.x * pipeWidth / 2);
        const y = centerY - (point.y * pipeHeight / 2);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw Reynolds number
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Inter';
    ctx.fillText(`Reynolds Number: ${visualization.reynolds}`, pipeX, pipeY + pipeHeight + 30);

    // Draw characteristics
    ctx.font = '12px Inter';
    let charY = pipeY + pipeHeight + 60;
    visualization.characteristics.forEach(char => {
        ctx.fillText(`• ${char}`, pipeX, charY);
        charY += 20;
    });
}

// Helper function to draw axes
function drawAxes(ctx, width, height, xLabel, yLabel) {
    const padding = 60;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, width / 2, height - 20);

    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
}

// Helper function to draw log axes
function drawLogAxes(ctx, width, height, xLabel, yLabel) {
    const padding = 60;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, width / 2, height - 20);

    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
}

// Draw conduction visualization
function drawConductionVisualization(ctx, canvas, visualization) {
    const padding = 60;
    const startY = 100;
    const layerWidth = 200;
    const layerHeight = 300;

    visualization.layers.forEach((layer, index) => {
        const x = padding + index * layerWidth;
        const y = startY;

        // Draw layer
        ctx.fillStyle = getLayerColor(layer.material);
        ctx.fillRect(x, y, layerWidth, layerHeight);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, layerWidth, layerHeight);

        // Label
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(layer.material, x + layerWidth / 2, y + layerHeight / 2);
        ctx.fillText(`${layer.thickness * 1000} mm`, x + layerWidth / 2, y + layerHeight / 2 + 20);
    });

    // Draw temperatures
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`Hot: ${visualization.temperatures.hot}°C`, padding, startY - 20);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`Cold: ${visualization.temperatures.cold}°C`, padding + layerWidth * 3, startY - 20);
}

// Draw convection visualization
function drawConvectionVisualization(ctx, canvas, visualization) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw surface
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(centerX - 100, centerY - 50, 200, 100);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 100, centerY - 50, 200, 100);

    // Draw fluid arrows
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        const y = centerY - 80 + i * 40;
        ctx.beginPath();
        ctx.moveTo(centerX + 120, y);
        ctx.lineTo(centerX + 180, y);
        ctx.lineTo(centerX + 170, y - 10);
        ctx.moveTo(centerX + 180, y);
        ctx.lineTo(centerX + 170, y + 10);
        ctx.stroke();
    }

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`Surface: ${visualization.surface.temperature}°C`, centerX, centerY + 80);
    ctx.fillText(`Fluid: ${visualization.fluid.temperature}°C`, centerX, centerY + 100);
}

// Draw radiation visualization
function drawRadiationVisualization(ctx, canvas, visualization) {
    const centerX1 = canvas.width / 3;
    const centerY = canvas.height / 2;
    const centerX2 = 2 * canvas.width / 3;

    // Draw surfaces
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(centerX1, centerY, 60, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(centerX2, centerY, 60, 0, 2 * Math.PI);
    ctx.fill();

    // Draw radiation waves
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX1, centerY, 60 + i * 30, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`Hot: ${visualization.surface1.temperature}K`, centerX1, centerY + 100);
    ctx.fillText(`Cold: ${visualization.surface2.temperature}K`, centerX2, centerY + 100);
}

// Get layer color
function getLayerColor(material) {
    const colors = {
        'Steel': '#94a3b8',
        'Insulation': '#fef3c7',
        'Copper': '#f59e0b'
    };
    return colors[material] || '#e2e8f0';
}

// Tool opening functions
function openMaterialSelector() {
    alert('Material Selector tool - Coming soon!');
}

function openFastenerCalculator() {
    alert('Fastener Calculator tool - Coming soon!');
}

function openPowerTransmission() {
    alert('Power Transmission tool - Coming soon!');
}

function openThermalAnalysis() {
    alert('Thermal Analysis tool - Coming soon!');
}

function openToleranceAnalysis() {
    alert('Tolerance Analysis tool - Coming soon!');
}

function openFailureAnalysis() {
    alert('Failure Analysis tool - Coming soon!');
}

// Export functions
window.generateStressStrainDiagram = generateStressStrainDiagram;
window.generateThermoDiagram = generateThermoDiagram;
window.generateFatigueDiagram = generateFatigueDiagram;
window.generateCreepDiagram = generateCreepDiagram;
window.generateHeatTransferDiagram = generateHeatTransferDiagram;
window.generateFlowProfile = generateFlowProfile;
window.searchMaterials = searchMaterials;
window.resetMaterialSearch = resetMaterialSearch;