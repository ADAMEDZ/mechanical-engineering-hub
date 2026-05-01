// Comprehensive Engineering Calculators

// Material properties database
const materialsDB = {
    steel: {
        name: 'Steel',
        density: 7850,
        yieldStrength: 250,
        ultimateStrength: 400,
        youngsModulus: 200,
        thermalConductivity: 50,
        poissonsRatio: 0.3,
        thermalExpansion: 12e-6
    },
    aluminum: {
        name: 'Aluminum',
        density: 2700,
        yieldStrength: 95,
        ultimateStrength: 110,
        youngsModulus: 69,
        thermalConductivity: 237,
        poissonsRatio: 0.33,
        thermalExpansion: 23e-6
    },
    titanium: {
        name: 'Titanium',
        density: 4500,
        yieldStrength: 880,
        ultimateStrength: 950,
        youngsModulus: 110,
        thermalConductivity: 22,
        poissonsRatio: 0.34,
        thermalExpansion: 8.6e-6
    },
    copper: {
        name: 'Copper',
        density: 8960,
        yieldStrength: 70,
        ultimateStrength: 220,
        youngsModulus: 110,
        thermalConductivity: 401,
        poissonsRatio: 0.34,
        thermalExpansion: 17e-6
    },
    stainlessSteel: {
        name: 'Stainless Steel',
        density: 8000,
        yieldStrength: 520,
        ultimateStrength: 620,
        youngsModulus: 193,
        thermalConductivity: 16,
        poissonsRatio: 0.3,
        thermalExpansion: 16e-6
    },
    brass: {
        name: 'Brass',
        density: 8500,
        yieldStrength: 200,
        ultimateStrength: 400,
        youngsModulus: 97,
        thermalConductivity: 120,
        poissonsRatio: 0.34,
        thermalExpansion: 19e-6
    }
};

// Stress & Strain Calculator
function getStressStrainCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="stressForce">Force (N)</label>
                <input type="number" id="stressForce" placeholder="Enter force" min="0">
            </div>
            <div class="form-group">
                <label for="stressArea">Cross-sectional Area (m²)</label>
                <input type="number" id="stressArea" placeholder="Enter area" min="0" step="0.000001">
            </div>
            <div class="form-group">
                <label for="originalLength">Original Length (m)</label>
                <input type="number" id="originalLength" placeholder="Enter original length" min="0" step="0.001">
            </div>
            <div class="form-group">
                <label for="deformation">Deformation (m)</label>
                <input type="number" id="deformation" placeholder="Enter deformation" step="0.000001">
            </div>
            <div class="form-group">
                <label for="youngsModulus">Young's Modulus (Pa)</label>
                <input type="number" id="youngsModulus" placeholder="Enter Young's modulus" value="200e9">
                <div class="form-hint">Default: Steel (200 GPa)</div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateStressStrain()">Calculate</button>
                <button class="btn-reset" onclick="resetStressStrain()">Reset</button>
            </div>
            <div class="calculator-result" id="stressResult" style="display: none;">
                <h4>Results</h4>
                <div>Stress: <span class="result-value" id="stressValue">0</span> <span class="unit-display">Pa</span></div>
                <div>Strain: <span class="result-value" id="strainValue">0</span> <span class="unit-display">dimensionless</span></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">σ = F/A (Stress = Force / Area)</div>
                    <div class="formula">ε = ΔL/L₀ (Strain = Deformation / Original Length)</div>
                    <div class="formula">σ = E·ε (Hooke's Law)</div>
                </div>
            </div>
        </div>
    `;
}

function calculateStressStrain() {
    const force = parseFloat(document.getElementById('stressForce').value);
    const area = parseFloat(document.getElementById('stressArea').value);
    const originalLength = parseFloat(document.getElementById('originalLength').value);
    const deformation = parseFloat(document.getElementById('deformation').value);
    const youngsModulus = parseFloat(document.getElementById('youngsModulus').value);

    if (isNaN(force) || isNaN(area) || area <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid force and area values');
        return;
    }

    const stress = force / area;
    let strain = 0;

    if (!isNaN(originalLength) && originalLength > 0 && !isNaN(deformation)) {
        strain = deformation / originalLength;
    } else if (!isNaN(youngsModulus) && youngsModulus > 0) {
        strain = stress / youngsModulus;
    }

    document.getElementById('stressValue').textContent = formatNumber(stress);
    document.getElementById('strainValue').textContent = formatNumber(strain, 6);

    const resultDiv = document.getElementById('stressResult');
    resultDiv.style.display = 'block';

    // Add safety warning if stress is high
    if (stress > 100e6) { // 100 MPa
        showWarning(resultDiv, 'High stress detected. Ensure material yield strength is not exceeded.');
    }
}

function resetStressStrain() {
    document.getElementById('stressForce').value = '';
    document.getElementById('stressArea').value = '';
    document.getElementById('originalLength').value = '';
    document.getElementById('deformation').value = '';
    document.getElementById('youngsModulus').value = '200e9';
    document.getElementById('stressResult').style.display = 'none';
}

// Beam Analysis Calculator
function getBeamCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="beamLength">Beam Length (m)</label>
                <input type="number" id="beamLength" placeholder="Enter beam length" min="0" step="0.001">
            </div>
            <div class="form-group">
                <label for="beamLoad">Applied Load (N)</label>
                <input type="number" id="beamLoad" placeholder="Enter load" min="0">
            </div>
            <div class="form-group">
                <label for="beamSupport">Support Type</label>
                <select id="beamSupport">
                    <option value="simply">Simply Supported</option>
                    <option value="cantilever">Cantilever</option>
                    <option value="fixed">Fixed-Fixed</option>
                </select>
            </div>
            <div class="form-group">
                <label for="beamLoadType">Load Type</label>
                <select id="beamLoadType">
                    <option value="point">Point Load (Center)</option>
                    <option value="distributed">Uniformly Distributed</option>
                </select>
            </div>
            <div class="form-group">
                <label for="beamMaterial">Material</label>
                <select id="beamMaterial">
                    <option value="steel">Steel (E = 200 GPa)</option>
                    <option value="aluminum">Aluminum (E = 69 GPa)</option>
                    <option value="titanium">Titanium (E = 110 GPa)</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="beamWidth">Width (m)</label>
                    <input type="number" id="beamWidth" placeholder="Width" min="0" step="0.001">
                </div>
                <div class="form-group">
                    <label for="beamHeight">Height (m)</label>
                    <input type="number" id="beamHeight" placeholder="Height" min="0" step="0.001">
                </div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateBeam()">Calculate</button>
                <button class="btn-reset" onclick="resetBeam()">Reset</button>
            </div>
            <div class="calculator-result" id="beamResult" style="display: none;">
                <h4>Results</h4>
                <div>Maximum Moment: <span class="result-value" id="maxMoment">0</span> <span class="unit-display">N·m</span></div>
                <div>Maximum Deflection: <span class="result-value" id="maxDeflection">0</span> <span class="unit-display">m</span></div>
                <div>Maximum Stress: <span class="result-value" id="maxStress">0</span> <span class="unit-display">Pa</span></div>
                <div class="result-details">
                    <p>Formulas used depend on support and load type</p>
                </div>
            </div>
        </div>
    `;
}

function calculateBeam() {
    const length = parseFloat(document.getElementById('beamLength').value);
    const load = parseFloat(document.getElementById('beamLoad').value);
    const support = document.getElementById('beamSupport').value;
    const loadType = document.getElementById('beamLoadType').value;
    const material = document.getElementById('beamMaterial').value;
    const width = parseFloat(document.getElementById('beamWidth').value);
    const height = parseFloat(document.getElementById('beamHeight').value);

    if (isNaN(length) || length <= 0 || isNaN(load) || load <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid length and load values');
        return;
    }

    const E = materialsDB[material].youngsModulus * 1e9; // Convert to Pa
    const I = (width * Math.pow(height, 3)) / 12; // Moment of inertia for rectangular section

    let maxMoment = 0;
    let maxDeflection = 0;

    // Calculate based on support and load type
    if (support === 'simply') {
        if (loadType === 'point') {
            maxMoment = (load * length) / 4;
            maxDeflection = (load * Math.pow(length, 3)) / (48 * E * I);
        } else {
            maxMoment = (load * length) / 8;
            maxDeflection = (5 * load * Math.pow(length, 4)) / (384 * E * I);
        }
    } else if (support === 'cantilever') {
        if (loadType === 'point') {
            maxMoment = load * length;
            maxDeflection = (load * Math.pow(length, 3)) / (3 * E * I);
        } else {
            maxMoment = (load * length) / 2;
            maxDeflection = (load * Math.pow(length, 4)) / (8 * E * I);
        }
    } else if (support === 'fixed') {
        if (loadType === 'point') {
            maxMoment = (load * length) / 8;
            maxDeflection = (load * Math.pow(length, 3)) / (192 * E * I);
        } else {
            maxMoment = (load * length) / 12;
            maxDeflection = (load * Math.pow(length, 4)) / (384 * E * I);
        }
    }

    const maxStress = (maxMoment * (height / 2)) / I;

    document.getElementById('maxMoment').textContent = formatNumber(maxMoment);
    document.getElementById('maxDeflection').textContent = formatNumber(maxDeflection, 6);
    document.getElementById('maxStress').textContent = formatNumber(maxStress);

    const resultDiv = document.getElementById('beamResult');
    resultDiv.style.display = 'block';

    // Add deflection warning
    const deflectionRatio = maxDeflection / length;
    if (deflectionRatio > 0.01) { // More than 1% deflection
        showWarning(resultDiv, 'Deflection exceeds 1% of span length. Consider increasing stiffness.');
    }
}

function resetBeam() {
    document.getElementById('beamLength').value = '';
    document.getElementById('beamLoad').value = '';
    document.getElementById('beamWidth').value = '';
    document.getElementById('beamHeight').value = '';
    document.getElementById('beamResult').style.display = 'none';
}

// Moment of Inertia Calculator
function getMomentInertiaCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label>Select Shape</label>
                <div class="shape-selector" id="shapeSelector">
                    <div class="shape-option selected" data-shape="rectangle">
                        <div class="shape-icon">▭</div>
                        <div class="shape-name">Rectangle</div>
                    </div>
                    <div class="shape-option" data-shape="circle">
                        <div class="shape-icon">○</div>
                        <div class="shape-name">Circle</div>
                    </div>
                    <div class="shape-option" data-shape="triangle">
                        <div class="shape-icon">△</div>
                        <div class="shape-name">Triangle</div>
                    </div>
                    <div class="shape-option" data-shape="i-beam">
                        <div class="shape-icon">I</div>
                        <div class="shape-name">I-Beam</div>
                    </div>
                </div>
            </div>

            <div id="rectangleInputs">
                <div class="form-row">
                    <div class="form-group">
                        <label for="rectWidth">Width (m)</label>
                        <input type="number" id="rectWidth" placeholder="Width" min="0" step="0.001">
                    </div>
                    <div class="form-group">
                        <label for="rectHeight">Height (m)</label>
                        <input type="number" id="rectHeight" placeholder="Height" min="0" step="0.001">
                    </div>
                </div>
            </div>

            <div id="circleInputs" style="display: none;">
                <div class="form-group">
                    <label for="circleRadius">Radius (m)</label>
                    <input type="number" id="circleRadius" placeholder="Radius" min="0" step="0.001">
                </div>
            </div>

            <div id="triangleInputs" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="triBase">Base (m)</label>
                        <input type="number" id="triBase" placeholder="Base" min="0" step="0.001">
                    </div>
                    <div class="form-group">
                        <label for="triHeight">Height (m)</label>
                        <input type="number" id="triHeight" placeholder="Height" min="0" step="0.001">
                    </div>
                </div>
            </div>

            <div id="iBeamInputs" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="iBeamWidth">Flange Width (m)</label>
                        <input type="number" id="iBeamWidth" placeholder="Flange width" min="0" step="0.001">
                    </div>
                    <div class="form-group">
                        <label for="iBeamHeight">Total Height (m)</label>
                        <input type="number" id="iBeamHeight" placeholder="Total height" min="0" step="0.001">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="iBeamWeb">Web Thickness (m)</label>
                        <input type="number" id="iBeamWeb" placeholder="Web thickness" min="0" step="0.001">
                    </div>
                    <div class="form-group">
                        <label for="iBeamFlange">Flange Thickness (m)</label>
                        <input type="number" id="iBeamFlange" placeholder="Flange thickness" min="0" step="0.001">
                    </div>
                </div>
            </div>

            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateMomentInertia()">Calculate</button>
                <button class="btn-reset" onclick="resetMomentInertia()">Reset</button>
            </div>

            <div class="calculator-result" id="momentResult" style="display: none;">
                <h4>Results</h4>
                <div>Moment of Inertia (I): <span class="result-value" id="momentValue">0</span> <span class="unit-display">m⁴</span></div>
                <div>Section Modulus (Z): <span class="result-value" id="sectionModulus">0</span> <span class="unit-display">m³</span></div>
                <div class="result-details">
                    <p>Formula used:</p>
                    <div class="formula" id="momentFormula">I = bh³/12</div>
                </div>
            </div>
        </div>
    `;
}

function initializeMomentInertiaCalculator() {
    const shapeOptions = document.querySelectorAll('.shape-option');
    shapeOptions.forEach(option => {
        option.addEventListener('click', function() {
            shapeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            const shape = this.getAttribute('data-shape');
            document.getElementById('rectangleInputs').style.display = shape === 'rectangle' ? 'block' : 'none';
            document.getElementById('circleInputs').style.display = shape === 'circle' ? 'block' : 'none';
            document.getElementById('triangleInputs').style.display = shape === 'triangle' ? 'block' : 'none';
            document.getElementById('iBeamInputs').style.display = shape === 'i-beam' ? 'block' : 'none';
        });
    });
}

function calculateMomentInertia() {
    const selectedShape = document.querySelector('.shape-option.selected').getAttribute('data-shape');
    let I = 0;
    let Z = 0;
    let formula = '';

    switch(selectedShape) {
        case 'rectangle':
            const b = parseFloat(document.getElementById('rectWidth').value);
            const h = parseFloat(document.getElementById('rectHeight').value);
            if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid dimensions');
                return;
            }
            I = (b * Math.pow(h, 3)) / 12;
            Z = (b * Math.pow(h, 2)) / 6;
            formula = 'I = bh³/12, Z = bh²/6';
            break;

        case 'circle':
            const r = parseFloat(document.getElementById('circleRadius').value);
            if (isNaN(r) || r <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid radius');
                return;
            }
            I = (Math.PI * Math.pow(r, 4)) / 4;
            Z = (Math.PI * Math.pow(r, 3)) / 4;
            formula = 'I = πr⁴/4, Z = πr³/4';
            break;

        case 'triangle':
            const base = parseFloat(document.getElementById('triBase').value);
            const height = parseFloat(document.getElementById('triHeight').value);
            if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid dimensions');
                return;
            }
            I = (base * Math.pow(height, 3)) / 36;
            Z = (base * Math.pow(height, 2)) / 24;
            formula = 'I = bh³/36, Z = bh²/24';
            break;

        case 'i-beam':
            const B = parseFloat(document.getElementById('iBeamWidth').value);
            const H = parseFloat(document.getElementById('iBeamHeight').value);
            const tw = parseFloat(document.getElementById('iBeamWeb').value);
            const tf = parseFloat(document.getElementById('iBeamFlange').value);
            if (isNaN(B) || isNaN(H) || isNaN(tw) || isNaN(tf) || B <= 0 || H <= 0 || tw <= 0 || tf <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid dimensions');
                return;
            }
            // Simplified I-beam calculation
            const hw = H - 2 * tf; // web height
            I = (2 * B * Math.pow(tf, 3) / 12) + (2 * B * tf * Math.pow((H - tf) / 2, 2)) +
                (tw * Math.pow(hw, 3) / 12);
            Z = I / (H / 2);
            formula = 'Complex I-beam formula';
            break;
    }

    document.getElementById('momentValue').textContent = formatNumber(I, 8);
    document.getElementById('sectionModulus').textContent = formatNumber(Z, 8);
    document.getElementById('momentFormula').textContent = formula;

    const resultDiv = document.getElementById('momentResult');
    resultDiv.style.display = 'block';
}

function resetMomentInertia() {
    document.querySelectorAll('#rectangleInputs input, #circleInputs input, #triangleInputs input, #iBeamInputs input').forEach(input => {
        input.value = '';
    });
    document.getElementById('momentResult').style.display = 'none';
}

// Shaft Design Calculator
function getShaftCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="shaftTorque">Torque (N·m)</label>
                <input type="number" id="shaftTorque" placeholder="Enter torque" min="0">
            </div>
            <div class="form-group">
                <label for="shaftBendingMoment">Bending Moment (N·m)</label>
                <input type="number" id="shaftBendingMoment" placeholder="Enter bending moment" min="0">
            </div>
            <div class="form-group">
                <label for="shaftMaterial">Material</label>
                <select id="shaftMaterial">
                    <option value="steel">Steel (τ_allow = 40 MPa)</option>
                    <option value="aluminum">Aluminum (τ_allow = 30 MPa)</option>
                    <option value="stainlessSteel">Stainless Steel (τ_allow = 80 MPa)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="safetyFactor">Safety Factor</label>
                <input type="number" id="safetyFactor" placeholder="Enter safety factor" value="2" min="1" step="0.1">
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateShaft()">Calculate</button>
                <button class="btn-reset" onclick="resetShaft()">Reset</button>
            </div>
            <div class="calculator-result" id="shaftResult" style="display: none;">
                <h4>Results</h4>
                <div>Required Diameter: <span class="result-value" id="shaftDiameter">0</span> <span class="unit-display">m</span></div>
                <div>Equivalent Torque: <span class="result-value" id="equivalentTorque">0</span> <span class="unit-display">N·m</span></div>
                <div>Maximum Shear Stress: <span class="result-value" id="maxShearStress">0</span> <span class="unit-display">Pa</span></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">T_eq = √(T² + M²)</div>
                    <div class="formula">τ_max = 16·T_eq/(π·d³)</div>
                    <div class="formula">d = (16·T_eq·SF/(π·τ_allow))^(1/3)</div>
                </div>
            </div>
        </div>
    `;
}

function calculateShaft() {
    const torque = parseFloat(document.getElementById('shaftTorque').value);
    const bendingMoment = parseFloat(document.getElementById('shaftBendingMoment').value);
    const material = document.getElementById('shaftMaterial').value;
    const safetyFactor = parseFloat(document.getElementById('safetyFactor').value);

    if (isNaN(torque) || torque <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid torque');
        return;
    }

    const allowableStress = {
        steel: 40e6,
        aluminum: 30e6,
        stainlessSteel: 80e6
    };

    const tauAllow = allowableStress[material] / safetyFactor;
    const equivalentTorque = Math.sqrt(Math.pow(torque, 2) + Math.pow(bendingMoment || 0, 2));
    const diameter = Math.pow((16 * equivalentTorque * safetyFactor) / (Math.PI * allowableStress[material]), 1/3);
    const maxShearStress = (16 * equivalentTorque) / (Math.PI * Math.pow(diameter, 3));

    document.getElementById('shaftDiameter').textContent = formatNumber(diameter, 4);
    document.getElementById('equivalentTorque').textContent = formatNumber(equivalentTorque);
    document.getElementById('maxShearStress').textContent = formatNumber(maxShearStress);

    const resultDiv = document.getElementById('shaftResult');
    resultDiv.style.display = 'block';

    // Add standard size suggestion
    const standardSizes = [0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.055, 0.06, 0.07, 0.08, 0.09, 0.1];
    const recommendedSize = standardSizes.find(size => size >= diameter);
    if (recommendedSize) {
        showInfo(resultDiv, `Recommended standard size: ${formatNumber(recommendedSize * 1000, 1)} mm`);
    }
}

function resetShaft() {
    document.getElementById('shaftTorque').value = '';
    document.getElementById('shaftBendingMoment').value = '';
    document.getElementById('safetyFactor').value = '2';
    document.getElementById('shaftResult').style.display = 'none';
}

// Heat Transfer Calculator
function getHeatTransferCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="heatTransferMode">Heat Transfer Mode</label>
                <select id="heatTransferMode">
                    <option value="conduction">Conduction</option>
                    <option value="convection">Convection</option>
                    <option value="radiation">Radiation</option>
                </select>
            </div>

            <div id="conductionInputs">
                <div class="form-group">
                    <label for="thermalConductivity">Thermal Conductivity (W/m·K)</label>
                    <input type="number" id="thermalConductivity" placeholder="Enter thermal conductivity" value="50">
                </div>
                <div class="form-group">
                    <label for="conductionArea">Area (m²)</label>
                    <input type="number" id="conductionArea" placeholder="Enter area" min="0">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="tempHot">Hot Temperature (K)</label>
                        <input type="number" id="tempHot" placeholder="Hot temperature">
                    </div>
                    <div class="form-group">
                        <label for="tempCold">Cold Temperature (K)</label>
                        <input type="number" id="tempCold" placeholder="Cold temperature">
                    </div>
                </div>
                <div class="form-group">
                    <label for="thickness">Thickness (m)</label>
                    <input type="number" id="thickness" placeholder="Enter thickness" min="0" step="0.001">
                </div>
            </div>

            <div id="convectionInputs" style="display: none;">
                <div class="form-group">
                    <label for="heatTransferCoeff">Heat Transfer Coefficient (W/m²·K)</label>
                    <input type="number" id="heatTransferCoeff" placeholder="Enter h" value="100">
                </div>
                <div class="form-group">
                    <label for="convectionArea">Area (m²)</label>
                    <input type="number" id="convectionArea" placeholder="Enter area" min="0">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="surfaceTemp">Surface Temperature (K)</label>
                        <input type="number" id="surfaceTemp" placeholder="Surface temperature">
                    </div>
                    <div class="form-group">
                        <label for="fluidTemp">Fluid Temperature (K)</label>
                        <input type="number" id="fluidTemp" placeholder="Fluid temperature">
                    </div>
                </div>
            </div>

            <div id="radiationInputs" style="display: none;">
                <div class="form-group">
                    <label for="emissivity">Emissivity (0-1)</label>
                    <input type="number" id="emissivity" placeholder="Enter emissivity" value="0.8" min="0" max="1" step="0.01">
                </div>
                <div class="form-group">
                    <label for="radiationArea">Area (m²)</label>
                    <input type="number" id="radiationArea" placeholder="Enter area" min="0">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="surfaceTempRad">Surface Temperature (K)</label>
                        <input type="number" id="surfaceTempRad" placeholder="Surface temperature">
                    </div>
                    <div class="form-group">
                        <label for="surroundingsTemp">Surroundings Temperature (K)</label>
                        <input type="number" id="surroundingsTemp" placeholder="Surroundings temperature">
                    </div>
                </div>
            </div>

            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateHeatTransfer()">Calculate</button>
                <button class="btn-reset" onclick="resetHeatTransfer()">Reset</button>
            </div>

            <div class="calculator-result" id="heatResult" style="display: none;">
                <h4>Results</h4>
                <div>Heat Transfer Rate: <span class="result-value" id="heatTransferRate">0</span> <span class="unit-display">W</span></div>
                <div class="result-details">
                    <p>Formula used:</p>
                    <div class="formula" id="heatFormula">Q = -k·A·(dT/dx)</div>
                </div>
            </div>
        </div>
    `;
}

// Initialize heat transfer calculator
document.addEventListener('DOMContentLoaded', function() {
    const heatTransferMode = document.getElementById('heatTransferMode');
    if (heatTransferMode) {
        heatTransferMode.addEventListener('change', function() {
            const mode = this.value;
            document.getElementById('conductionInputs').style.display = mode === 'conduction' ? 'block' : 'none';
            document.getElementById('convectionInputs').style.display = mode === 'convection' ? 'block' : 'none';
            document.getElementById('radiationInputs').style.display = mode === 'radiation' ? 'block' : 'none';
        });
    }
});

function calculateHeatTransfer() {
    const mode = document.getElementById('heatTransferMode').value;
    let Q = 0;
    let formula = '';

    switch(mode) {
        case 'conduction':
            const k = parseFloat(document.getElementById('thermalConductivity').value);
            const A_cond = parseFloat(document.getElementById('conductionArea').value);
            const T_hot = parseFloat(document.getElementById('tempHot').value);
            const T_cold = parseFloat(document.getElementById('tempCold').value);
            const L = parseFloat(document.getElementById('thickness').value);

            if (isNaN(k) || isNaN(A_cond) || isNaN(T_hot) || isNaN(T_cold) || isNaN(L) || L <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid values for conduction');
                return;
            }

            Q = k * A_cond * (T_hot - T_cold) / L;
            formula = 'Q = k·A·(T_hot - T_cold)/L';
            break;

        case 'convection':
            const h = parseFloat(document.getElementById('heatTransferCoeff').value);
            const A_conv = parseFloat(document.getElementById('convectionArea').value);
            const T_s = parseFloat(document.getElementById('surfaceTemp').value);
            const T_f = parseFloat(document.getElementById('fluidTemp').value);

            if (isNaN(h) || isNaN(A_conv) || isNaN(T_s) || isNaN(T_f)) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid values for convection');
                return;
            }

            Q = h * A_conv * (T_s - T_f);
            formula = 'Q = h·A·(T_s - T_f)';
            break;

        case 'radiation':
            const epsilon = parseFloat(document.getElementById('emissivity').value);
            const A_rad = parseFloat(document.getElementById('radiationArea').value);
            const T_s_rad = parseFloat(document.getElementById('surfaceTempRad').value);
            const T_sur = parseFloat(document.getElementById('surroundingsTemp').value);
            const sigma = 5.67e-8; // Stefan-Boltzmann constant

            if (isNaN(epsilon) || isNaN(A_rad) || isNaN(T_s_rad) || isNaN(T_sur)) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid values for radiation');
                return;
            }

            Q = epsilon * sigma * A_rad * (Math.pow(T_s_rad, 4) - Math.pow(T_sur, 4));
            formula = 'Q = ε·σ·A·(T_s⁴ - T_sur⁴)';
            break;
    }

    document.getElementById('heatTransferRate').textContent = formatNumber(Q);
    document.getElementById('heatFormula').textContent = formula;

    const resultDiv = document.getElementById('heatResult');
    resultDiv.style.display = 'block';
}

function resetHeatTransfer() {
    document.querySelectorAll('#conductionInputs input, #convectionInputs input, #radiationInputs input').forEach(input => {
        if (input.id !== 'thermalConductivity' && input.id !== 'heatTransferCoeff' && input.id !== 'emissivity') {
            input.value = '';
        }
    });
    document.getElementById('heatResult').style.display = 'none';
}

// Thermal Expansion Calculator
function getThermalExpansionCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="originalLength">Original Length (m)</label>
                <input type="number" id="originalLength" placeholder="Enter original length" min="0" step="0.001">
            </div>
            <div class="form-group">
                <label for="tempChange">Temperature Change (°C)</label>
                <input type="number" id="tempChange" placeholder="Enter temperature change">
            </div>
            <div class="form-group">
                <label for="expansionMaterial">Material</label>
                <select id="expansionMaterial">
                    <option value="steel">Steel (α = 12×10⁻⁶ /°C)</option>
                    <option value="aluminum">Aluminum (α = 23×10⁻⁶ /°C)</option>
                    <option value="copper">Copper (α = 17×10⁻⁶ /°C)</option>
                    <option value="titanium">Titanium (α = 8.6×10⁻⁶ /°C)</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div class="form-group" id="customExpansionGroup" style="display: none;">
                <label for="customExpansion">Custom Coefficient (1/°C)</label>
                <input type="number" id="customExpansion" placeholder="Enter custom coefficient" step="0.000001">
            </div>
            <div class="form-group">
                <label for="constraint">Constraint</label>
                <select id="constraint">
                    <option value="free">Free Expansion</option>
                    <option value="fixed">Fixed Ends (Thermal Stress)</option>
                </select>
            </div>
            <div class="form-group" id="youngsModulusGroup" style="display: none;">
                <label for="youngsModulus">Young's Modulus (Pa)</label>
                <input type="number" id="youngsModulus" placeholder="Enter Young's modulus" value="200e9">
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateThermalExpansion()">Calculate</button>
                <button class="btn-reset" onclick="resetThermalExpansion()">Reset</button>
            </div>
            <div class="calculator-result" id="thermalResult" style="display: none;">
                <h4>Results</h4>
                <div>Thermal Expansion: <span class="result-value" id="thermalExpansion">0</span> <span class="unit-display">m</span></div>
                <div>Final Length: <span class="result-value" id="finalLength">0</span> <span class="unit-display">m</span></div>
                <div id="thermalStressResult" style="display: none;">
                    <div>Thermal Stress: <span class="result-value" id="thermalStress">0</span> <span class="unit-display">Pa</span></div>
                </div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">ΔL = α·L₀·ΔT</div>
                    <div class="formula">σ_thermal = E·α·ΔT (for fixed ends)</div>
                </div>
            </div>
        </div>
    `;
}

// Initialize thermal expansion calculator
document.addEventListener('DOMContentLoaded', function() {
    const expansionMaterial = document.getElementById('expansionMaterial');
    const constraint = document.getElementById('constraint');

    if (expansionMaterial) {
        expansionMaterial.addEventListener('change', function() {
            document.getElementById('customExpansionGroup').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }

    if (constraint) {
        constraint.addEventListener('change', function() {
            document.getElementById('youngsModulusGroup').style.display = this.value === 'fixed' ? 'block' : 'none';
            document.getElementById('thermalStressResult').style.display = this.value === 'fixed' ? 'block' : 'none';
        });
    }
});

function calculateThermalExpansion() {
    const L0 = parseFloat(document.getElementById('originalLength').value);
    const deltaT = parseFloat(document.getElementById('tempChange').value);
    const material = document.getElementById('expansionMaterial').value;
    const constraint = document.getElementById('constraint').value;

    if (isNaN(L0) || L0 <= 0 || isNaN(deltaT)) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid length and temperature change');
        return;
    }

    const alpha = {
        steel: 12e-6,
        aluminum: 23e-6,
        copper: 17e-6,
        titanium: 8.6e-6
    };

    let alphaValue = alpha[material];
    if (material === 'custom') {
        alphaValue = parseFloat(document.getElementById('customExpansion').value);
        if (isNaN(alphaValue)) {
            showError(document.querySelector('.calculator-form'), 'Please enter valid expansion coefficient');
            return;
        }
    }

    const deltaL = alphaValue * L0 * deltaT;
    const finalLength = L0 + deltaL;

    document.getElementById('thermalExpansion').textContent = formatNumber(deltaL, 6);
    document.getElementById('finalLength').textContent = formatNumber(finalLength, 6);

    if (constraint === 'fixed') {
        const E = parseFloat(document.getElementById('youngsModulus').value);
        if (!isNaN(E) && E > 0) {
            const thermalStress = E * alphaValue * deltaT;
            document.getElementById('thermalStress').textContent = formatNumber(thermalStress);
        }
    }

    const resultDiv = document.getElementById('thermalResult');
    resultDiv.style.display = 'block';
}

function resetThermalExpansion() {
    document.getElementById('originalLength').value = '';
    document.getElementById('tempChange').value = '';
    document.getElementById('customExpansion').value = '';
    document.getElementById('youngsModulus').value = '200e9';
    document.getElementById('thermalResult').style.display = 'none';
}

// Ideal Gas Law Calculator
function getIdealGasCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="gasPressure">Pressure (Pa)</label>
                <input type="number" id="gasPressure" placeholder="Enter pressure" min="0">
            </div>
            <div class="form-group">
                <label for="gasVolume">Volume (m³)</label>
                <input type="number" id="gasVolume" placeholder="Enter volume" min="0">
            </div>
            <div class="form-group">
                <label for="gasTemperature">Temperature (K)</label>
                <input type="number" id="gasTemperature" placeholder="Enter temperature" min="0">
            </div>
            <div class="form-group">
                <label for="gasMoles">Moles (mol)</label>
                <input type="number" id="gasMoles" placeholder="Enter moles" min="0">
            </div>
            <div class="form-group">
                <label for="gasConstant">Gas Constant (J/mol·K)</label>
                <input type="number" id="gasConstant" placeholder="Enter gas constant" value="8.314">
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateIdealGas()">Calculate</button>
                <button class="btn-reset" onclick="resetIdealGas()">Reset</button>
            </div>
            <div class="calculator-result" id="gasResult" style="display: none;">
                <h4>Results</h4>
                <div id="gasResults"></div>
                <div class="result-details">
                    <p>Formula used:</p>
                    <div class="formula">PV = nRT</div>
                </div>
            </div>
        </div>
    `;
}

function calculateIdealGas() {
    const P = parseFloat(document.getElementById('gasPressure').value);
    const V = parseFloat(document.getElementById('gasVolume').value);
    const T = parseFloat(document.getElementById('gasTemperature').value);
    const n = parseFloat(document.getElementById('gasMoles').value);
    const R = parseFloat(document.getElementById('gasConstant').value);

    if (isNaN(R) || R <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid gas constant');
        return;
    }

    const knownValues = [!isNaN(P), !isNaN(V), !isNaN(T), !isNaN(n)].filter(Boolean).length;

    if (knownValues < 3) {
        showError(document.querySelector('.calculator-form'), 'Please enter at least 3 values (P, V, T, or n)');
        return;
    }

    let resultsHTML = '';

    if (!isNaN(P) && !isNaN(V) && !isNaN(T) && isNaN(n)) {
        const calculatedN = (P * V) / (R * T);
        resultsHTML += `<div>Moles (n): <span class="result-value">${formatNumber(calculatedN, 4)}</span> <span class="unit-display">mol</span></div>`;
    } else if (!isNaN(P) && !isNaN(V) && isNaN(T) && !isNaN(n)) {
        const calculatedT = (P * V) / (R * n);
        resultsHTML += `<div>Temperature (T): <span class="result-value">${formatNumber(calculatedT, 2)}</span> <span class="unit-display">K</span></div>`;
    } else if (!isNaN(P) && isNaN(V) && !isNaN(T) && !isNaN(n)) {
        const calculatedV = (n * R * T) / P;
        resultsHTML += `<div>Volume (V): <span class="result-value">${formatNumber(calculatedV, 6)}</span> <span class="unit-display">m³</span></div>`;
    } else if (isNaN(P) && !isNaN(V) && !isNaN(T) && !isNaN(n)) {
        const calculatedP = (n * R * T) / V;
        resultsHTML += `<div>Pressure (P): <span class="result-value">${formatNumber(calculatedP, 2)}</span> <span class="unit-display">Pa</span></div>`;
    } else {
        resultsHTML = '<div>All values provided. PV = ' + formatNumber(P * V) + ', nRT = ' + formatNumber(n * R * T) + '</div>';
    }

    document.getElementById('gasResults').innerHTML = resultsHTML;

    const resultDiv = document.getElementById('gasResult');
    resultDiv.style.display = 'block';
}

function resetIdealGas() {
    document.getElementById('gasPressure').value = '';
    document.getElementById('gasVolume').value = '';
    document.getElementById('gasTemperature').value = '';
    document.getElementById('gasMoles').value = '';
    document.getElementById('gasConstant').value = '8.314';
    document.getElementById('gasResult').style.display = 'none';
}

// Entropy Calculator
function getEntropyCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="entropyProcess">Process Type</label>
                <select id="entropyProcess">
                    <option value="isothermal">Isothermal</option>
                    <option value="isobaric">Isobaric</option>
                    <option value="isochoric">Isochoric</option>
                    <option value="adiabatic">Adiabatic</option>
                </select>
            </div>

            <div id="isothermalInputs">
                <div class="form-group">
                    <label for="heatAdded">Heat Added (J)</label>
                    <input type="number" id="heatAdded" placeholder="Enter heat added">
                </div>
                <div class="form-group">
                    <label for="temperature">Temperature (K)</label>
                    <input type="number" id="temperature" placeholder="Enter temperature" min="0">
                </div>
            </div>

            <div id="isobaricInputs" style="display: none;">
                <div class="form-group">
                    <label for="mass">Mass (kg)</label>
                    <input type="number" id="mass" placeholder="Enter mass" min="0">
                </div>
                <div class="form-group">
                    <label for="specificHeat">Specific Heat (J/kg·K)</label>
                    <input type="number" id="specificHeat" placeholder="Enter specific heat" value="1005">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="tempInitial">Initial Temperature (K)</label>
                        <input type="number" id="tempInitial" placeholder="Initial temperature" min="0">
                    </div>
                    <div class="form-group">
                        <label for="tempFinal">Final Temperature (K)</label>
                        <input type="number" id="tempFinal" placeholder="Final temperature" min="0">
                    </div>
                </div>
            </div>

            <div id="isochoricInputs" style="display: none;">
                <div class="form-group">
                    <label for="massIso">Mass (kg)</label>
                    <input type="number" id="massIso" placeholder="Enter mass" min="0">
                </div>
                <div class="form-group">
                    <label for="specificHeatIso">Specific Heat (J/kg·K)</label>
                    <input type="number" id="specificHeatIso" placeholder="Enter specific heat" value="718">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="tempInitialIso">Initial Temperature (K)</label>
                        <input type="number" id="tempInitialIso" placeholder="Initial temperature" min="0">
                    </div>
                    <div class="form-group">
                        <label for="tempFinalIso">Final Temperature (K)</label>
                        <input type="number" id="tempFinalIso" placeholder="Final temperature" min="0">
                    </div>
                </div>
            </div>

            <div id="adiabaticInputs" style="display: none;">
                <div class="calculator-info">Adiabatic process: ΔS = 0 (reversible) or ΔS > 0 (irreversible)</div>
            </div>

            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateEntropy()">Calculate</button>
                <button class="btn-reset" onclick="resetEntropy()">Reset</button>
            </div>

            <div class="calculator-result" id="entropyResult" style="display: none;">
                <h4>Results</h4>
                <div>Entropy Change: <span class="result-value" id="entropyChange">0</span> <span class="unit-display">J/K</span></div>
                <div class="result-details">
                    <p>Formula used:</p>
                    <div class="formula" id="entropyFormula">ΔS = Q/T</div>
                </div>
            </div>
        </div>
    `;
}

// Initialize entropy calculator
document.addEventListener('DOMContentLoaded', function() {
    const entropyProcess = document.getElementById('entropyProcess');
    if (entropyProcess) {
        entropyProcess.addEventListener('change', function() {
            const process = this.value;
            document.getElementById('isothermalInputs').style.display = process === 'isothermal' ? 'block' : 'none';
            document.getElementById('isobaricInputs').style.display = process === 'isobaric' ? 'block' : 'none';
            document.getElementById('isochoricInputs').style.display = process === 'isochoric' ? 'block' : 'none';
            document.getElementById('adiabaticInputs').style.display = process === 'adiabatic' ? 'block' : 'none';
        });
    }
});

function calculateEntropy() {
    const process = document.getElementById('entropyProcess').value;
    let deltaS = 0;
    let formula = '';

    switch(process) {
        case 'isothermal':
            const Q = parseFloat(document.getElementById('heatAdded').value);
            const T = parseFloat(document.getElementById('temperature').value);

            if (isNaN(Q) || isNaN(T) || T <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid heat and temperature');
                return;
            }

            deltaS = Q / T;
            formula = 'ΔS = Q/T';
            break;

        case 'isobaric':
            const m = parseFloat(document.getElementById('mass').value);
            const cp = parseFloat(document.getElementById('specificHeat').value);
            const T1 = parseFloat(document.getElementById('tempInitial').value);
            const T2 = parseFloat(document.getElementById('tempFinal').value);

            if (isNaN(m) || isNaN(cp) || isNaN(T1) || isNaN(T2) || T1 <= 0 || T2 <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid values');
                return;
            }

            deltaS = m * cp * Math.log(T2 / T1);
            formula = 'ΔS = m·cp·ln(T₂/T₁)';
            break;

        case 'isochoric':
            const m_iso = parseFloat(document.getElementById('massIso').value);
            const cv = parseFloat(document.getElementById('specificHeatIso').value);
            const T1_iso = parseFloat(document.getElementById('tempInitialIso').value);
            const T2_iso = parseFloat(document.getElementById('tempFinalIso').value);

            if (isNaN(m_iso) || isNaN(cv) || isNaN(T1_iso) || isNaN(T2_iso) || T1_iso <= 0 || T2_iso <= 0) {
                showError(document.querySelector('.calculator-form'), 'Please enter valid values');
                return;
            }

            deltaS = m_iso * cv * Math.log(T2_iso / T1_iso);
            formula = 'ΔS = m·cv·ln(T₂/T₁)';
            break;

        case 'adiabatic':
            deltaS = 0;
            formula = 'ΔS = 0 (reversible adiabatic)';
            break;
    }

    document.getElementById('entropyChange').textContent = formatNumber(deltaS, 4);
    document.getElementById('entropyFormula').textContent = formula;

    const resultDiv = document.getElementById('entropyResult');
    resultDiv.style.display = 'block';
}

function resetEntropy() {
    document.querySelectorAll('#isothermalInputs input, #isobaricInputs input, #isochoricInputs input').forEach(input => {
        input.value = '';
    });
    document.getElementById('specificHeat').value = '1005';
    document.getElementById('specificHeatIso').value = '718';
    document.getElementById('entropyResult').style.display = 'none';
}

// Bernoulli Equation Calculator
function getBernoulliCalculator() {
    return `
        <div class="calculator-form">
            <h4>Point 1</h4>
            <div class="form-row">
                <div class="form-group">
                    <label for="pressure1">Pressure (Pa)</label>
                    <input type="number" id="pressure1" placeholder="P₁">
                </div>
                <div class="form-group">
                    <label for="velocity1">Velocity (m/s)</label>
                    <input type="number" id="velocity1" placeholder="v₁">
                </div>
                <div class="form-group">
                    <label for="elevation1">Elevation (m)</label>
                    <input type="number" id="elevation1" placeholder="z₁">
                </div>
            </div>

            <h4>Point 2</h4>
            <div class="form-row">
                <div class="form-group">
                    <label for="pressure2">Pressure (Pa)</label>
                    <input type="number" id="pressure2" placeholder="P₂">
                </div>
                <div class="form-group">
                    <label for="velocity2">Velocity (m/s)</label>
                    <input type="number" id="velocity2" placeholder="v₂">
                </div>
                <div class="form-group">
                    <label for="elevation2">Elevation (m)</label>
                    <input type="number" id="elevation2" placeholder="z₂">
                </div>
            </div>

            <div class="form-group">
                <label for="fluidDensity">Fluid Density (kg/m³)</label>
                <input type="number" id="fluidDensity" placeholder="Enter density" value="1000">
                <div class="form-hint">Default: Water (1000 kg/m³)</div>
            </div>

            <div class="form-group">
                <label for="solveFor">Solve For</label>
                <select id="solveFor">
                    <option value="pressure2">Pressure at Point 2</option>
                    <option value="velocity2">Velocity at Point 2</option>
                    <option value="velocity1">Velocity at Point 1</option>
                    <option value="verify">Verify Equation</option>
                </select>
            </div>

            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateBernoulli()">Calculate</button>
                <button class="btn-reset" onclick="resetBernoulli()">Reset</button>
            </div>

            <div class="calculator-result" id="bernoulliResult" style="display: none;">
                <h4>Results</h4>
                <div id="bernoulliResults"></div>
                <div class="result-details">
                    <p>Bernoulli Equation:</p>
                    <div class="formula">P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂</div>
                </div>
            </div>
        </div>
    `;
}

function calculateBernoulli() {
    const P1 = parseFloat(document.getElementById('pressure1').value);
    const v1 = parseFloat(document.getElementById('velocity1').value);
    const z1 = parseFloat(document.getElementById('elevation1').value);
    const P2 = parseFloat(document.getElementById('pressure2').value);
    const v2 = parseFloat(document.getElementById('velocity2').value);
    const z2 = parseFloat(document.getElementById('elevation2').value);
    const rho = parseFloat(document.getElementById('fluidDensity').value);
    const solveFor = document.getElementById('solveFor').value;
    const g = 9.81; // gravity

    if (isNaN(rho) || rho <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid fluid density');
        return;
    }

    let resultsHTML = '';

    switch(solveFor) {
        case 'pressure2':
            if (isNaN(P1) || isNaN(v1) || isNaN(z1) || isNaN(v2) || isNaN(z2)) {
                showError(document.querySelector('.calculator-form'), 'Please enter all values except P₂');
                return;
            }
            const calculatedP2 = P1 + 0.5 * rho * (v1**2 - v2**2) + rho * g * (z1 - z2);
            resultsHTML = `<div>Pressure at Point 2: <span class="result-value">${formatNumber(calculatedP2, 2)}</span> <span class="unit-display">Pa</span></div>`;
            break;

        case 'velocity2':
            if (isNaN(P1) || isNaN(v1) || isNaN(z1) || isNaN(P2) || isNaN(z2)) {
                showError(document.querySelector('.calculator-form'), 'Please enter all values except v₂');
                return;
            }
            const headDiff = (P1 - P2) / (rho * g) + (v1**2) / (2 * g) + (z1 - z2);
            const calculatedV2 = Math.sqrt(2 * g * headDiff);
            resultsHTML = `<div>Velocity at Point 2: <span class="result-value">${formatNumber(calculatedV2, 3)}</span> <span class="unit-display">m/s</span></div>`;
            break;

        case 'velocity1':
            if (isNaN(P1) || isNaN(z1) || isNaN(P2) || isNaN(v2) || isNaN(z2)) {
                showError(document.querySelector('.calculator-form'), 'Please enter all values except v₁');
                return;
            }
            const headDiff1 = (P2 - P1) / (rho * g) + (v2**2) / (2 * g) + (z2 - z1);
            const calculatedV1 = Math.sqrt(2 * g * headDiff1);
            resultsHTML = `<div>Velocity at Point 1: <span class="result-value">${formatNumber(calculatedV1, 3)}</span> <span class="unit-display">m/s</span></div>`;
            break;

        case 'verify':
            if (isNaN(P1) || isNaN(v1) || isNaN(z1) || isNaN(P2) || isNaN(v2) || isNaN(z2)) {
                showError(document.querySelector('.calculator-form'), 'Please enter all values');
                return;
            }
            const head1 = P1 / (rho * g) + v1**2 / (2 * g) + z1;
            const head2 = P2 / (rho * g) + v2**2 / (2 * g) + z2;
            const difference = Math.abs(head1 - head2);
            const isValid = difference < 0.01; // Allow small numerical error

            resultsHTML = `
                <div>Total Head at Point 1: <span class="result-value">${formatNumber(head1, 3)}</span> <span class="unit-display">m</span></div>
                <div>Total Head at Point 2: <span class="result-value">${formatNumber(head2, 3)}</span> <span class="unit-display">m</span></div>
                <div>Difference: <span class="result-value">${formatNumber(difference, 6)}</span> <span class="unit-display">m</span></div>
                <div class="${isValid ? 'calculator-success' : 'calculator-warning'}">
                    ${isValid ? '✓ Bernoulli equation is satisfied' : '⚠ Bernoulli equation is not satisfied (check for losses)'}
                </div>
            `;
            break;
    }

    document.getElementById('bernoulliResults').innerHTML = resultsHTML;

    const resultDiv = document.getElementById('bernoulliResult');
    resultDiv.style.display = 'block';
}

function resetBernoulli() {
    document.getElementById('pressure1').value = '';
    document.getElementById('velocity1').value = '';
    document.getElementById('elevation1').value = '';
    document.getElementById('pressure2').value = '';
    document.getElementById('velocity2').value = '';
    document.getElementById('elevation2').value = '';
    document.getElementById('fluidDensity').value = '1000';
    document.getElementById('bernoulliResult').style.display = 'none';
}

// Reynolds Number Calculator
function getReynoldsCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="fluidVelocity">Fluid Velocity (m/s)</label>
                <input type="number" id="fluidVelocity" placeholder="Enter velocity" min="0">
            </div>
            <div class="form-group">
                <label for="characteristicLength">Characteristic Length (m)</label>
                <input type="number" id="characteristicLength" placeholder="Enter length (diameter for pipes)" min="0" step="0.001">
            </div>
            <div class="form-group">
                <label for="fluidDensityRe">Fluid Density (kg/m³)</label>
                <input type="number" id="fluidDensityRe" placeholder="Enter density" value="1000">
                <div class="form-hint">Default: Water (1000 kg/m³)</div>
            </div>
            <div class="form-group">
                <label for="fluidViscosity">Dynamic Viscosity (Pa·s)</label>
                <input type="number" id="fluidViscosity" placeholder="Enter viscosity" value="0.001" step="0.000001">
                <div class="form-hint">Default: Water at 20°C (0.001 Pa·s)</div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateReynolds()">Calculate</button>
                <button class="btn-reset" onclick="resetReynolds()">Reset</button>
            </div>
            <div class="calculator-result" id="reynoldsResult" style="display: none;">
                <h4>Results</h4>
                <div>Reynolds Number: <span class="result-value" id="reynoldsNumber">0</span> <span class="unit-display">dimensionless</span></div>
                <div>Flow Regime: <span class="result-value" id="flowRegime">-</span></div>
                <div class="result-details">
                    <p>Formula used:</p>
                    <div class="formula">Re = ρ·v·D/μ</div>
                    <p>Flow regimes:</p>
                    <ul>
                        <li>Re < 2300: Laminar flow</li>
                        <li>2300 ≤ Re < 4000: Transitional flow</li>
                        <li>Re ≥ 4000: Turbulent flow</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function calculateReynolds() {
    const v = parseFloat(document.getElementById('fluidVelocity').value);
    const D = parseFloat(document.getElementById('characteristicLength').value);
    const rho = parseFloat(document.getElementById('fluidDensityRe').value);
    const mu = parseFloat(document.getElementById('fluidViscosity').value);

    if (isNaN(v) || isNaN(D) || isNaN(rho) || isNaN(mu) || v <= 0 || D <= 0 || rho <= 0 || mu <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid positive values');
        return;
    }

    const Re = (rho * v * D) / mu;

    let flowRegime = '';
    if (Re < 2300) {
        flowRegime = 'Laminar Flow';
    } else if (Re < 4000) {
        flowRegime = 'Transitional Flow';
    } else {
        flowRegime = 'Turbulent Flow';
    }

    document.getElementById('reynoldsNumber').textContent = formatNumber(Re, 0);
    document.getElementById('flowRegime').textContent = flowRegime;

    const resultDiv = document.getElementById('reynoldsResult');
    resultDiv.style.display = 'block';

    // Add flow regime specific info
    if (Re < 2300) {
        showInfo(resultDiv, 'Laminar flow: Smooth, predictable flow with minimal mixing');
    } else if (Re >= 4000) {
        showInfo(resultDiv, 'Turbulent flow: Chaotic flow with significant mixing and higher friction');
    }
}

function resetReynolds() {
    document.getElementById('fluidVelocity').value = '';
    document.getElementById('characteristicLength').value = '';
    document.getElementById('fluidDensityRe').value = '1000';
    document.getElementById('fluidViscosity').value = '0.001';
    document.getElementById('reynoldsResult').style.display = 'none';
}

// Pipe Flow Calculator
function getPipeFlowCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="pipeDiameter">Pipe Diameter (m)</label>
                <input type="number" id="pipeDiameter" placeholder="Enter diameter" min="0" step="0.001">
            </div>
            <div class="form-group">
                <label for="pipeLength">Pipe Length (m)</label>
                <input type="number" id="pipeLength" placeholder="Enter length" min="0">
            </div>
            <div class="form-group">
                <label for="flowVelocity">Flow Velocity (m/s)</label>
                <input type="number" id="flowVelocity" placeholder="Enter velocity" min="0">
            </div>
            <div class="form-group">
                <label for="pipeRoughness">Pipe Roughness (m)</label>
                <input type="number" id="pipeRoughness" placeholder="Enter roughness" value="0.000045" step="0.000001">
                <div class="form-hint">Default: Commercial steel (0.045 mm)</div>
            </div>
            <div class="form-group">
                <label for="pipeFluid">Fluid</label>
                <select id="pipeFluid">
                    <option value="water">Water (20°C)</option>
                    <option value="oil">Oil</option>
                    <option value="air">Air (20°C)</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div id="customFluidInputs" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="customDensity">Density (kg/m³)</label>
                        <input type="number" id="customDensity" placeholder="Density">
                    </div>
                    <div class="form-group">
                        <label for="customViscosity">Viscosity (Pa·s)</label>
                        <input type="number" id="customViscosity" placeholder="Viscosity">
                    </div>
                </div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculatePipeFlow()">Calculate</button>
                <button class="btn-reset" onclick="resetPipeFlow()">Reset</button>
            </div>
            <div class="calculator-result" id="pipeFlowResult" style="display: none;">
                <h4>Results</h4>
                <div>Reynolds Number: <span class="result-value" id="pipeReynolds">0</span></div>
                <div>Friction Factor: <span class="result-value" id="frictionFactor">0</span></div>
                <div>Head Loss: <span class="result-value" id="headLoss">0</span> <span class="unit-display">m</span></div>
                <div>Pressure Drop: <span class="result-value" id="pressureDrop">0</span> <span class="unit-display">Pa</span></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">Re = ρ·v·D/μ</div>
                    <div class="formula">h_f = f·(L/D)·(v²/2g)</div>
                    <div class="formula">ΔP = ρ·g·h_f</div>
                </div>
            </div>
        </div>
    `;
}

// Initialize pipe flow calculator
document.addEventListener('DOMContentLoaded', function() {
    const pipeFluid = document.getElementById('pipeFluid');
    if (pipeFluid) {
        pipeFluid.addEventListener('change', function() {
            document.getElementById('customFluidInputs').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
});

function calculatePipeFlow() {
    const D = parseFloat(document.getElementById('pipeDiameter').value);
    const L = parseFloat(document.getElementById('pipeLength').value);
    const v = parseFloat(document.getElementById('flowVelocity').value);
    const epsilon = parseFloat(document.getElementById('pipeRoughness').value);
    const fluid = document.getElementById('pipeFluid').value;
    const g = 9.81;

    if (isNaN(D) || isNaN(L) || isNaN(v) || D <= 0 || L <= 0 || v <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid pipe dimensions and velocity');
        return;
    }

    const fluidProperties = {
        water: { density: 1000, viscosity: 0.001 },
        oil: { density: 850, viscosity: 0.1 },
        air: { density: 1.2, viscosity: 0.000018 }
    };

    let rho, mu;
    if (fluid === 'custom') {
        rho = parseFloat(document.getElementById('customDensity').value);
        mu = parseFloat(document.getElementById('customViscosity').value);
        if (isNaN(rho) || isNaN(mu) || rho <= 0 || mu <= 0) {
            showError(document.querySelector('.calculator-form'), 'Please enter valid fluid properties');
            return;
        }
    } else {
        rho = fluidProperties[fluid].density;
        mu = fluidProperties[fluid].viscosity;
    }

    // Calculate Reynolds number
    const Re = (rho * v * D) / mu;

    // Calculate friction factor using Colebrook-White equation (simplified)
    let f;
    if (Re < 2300) {
        // Laminar flow
        f = 64 / Re;
    } else {
        // Turbulent flow - use Swamee-Jain equation
        const relativeRoughness = epsilon / D;
        f = 0.25 / Math.pow(Math.log10(relativeRoughness / 3.7 + 5.74 / Math.pow(Re, 0.9)), 2);
    }

    // Calculate head loss using Darcy-Weisbach equation
    const h_f = f * (L / D) * (v * v) / (2 * g);

    // Calculate pressure drop
    const deltaP = rho * g * h_f;

    document.getElementById('pipeReynolds').textContent = formatNumber(Re, 0);
    document.getElementById('frictionFactor').textContent = formatNumber(f, 6);
    document.getElementById('headLoss').textContent = formatNumber(h_f, 4);
    document.getElementById('pressureDrop').textContent = formatNumber(deltaP, 2);

    const resultDiv = document.getElementById('pipeFlowResult');
    resultDiv.style.display = 'block';

    // Add flow regime info
    if (Re < 2300) {
        showInfo(resultDiv, 'Laminar flow regime detected');
    } else {
        showInfo(resultDiv, 'Turbulent flow regime detected');
    }
}

function resetPipeFlow() {
    document.getElementById('pipeDiameter').value = '';
    document.getElementById('pipeLength').value = '';
    document.getElementById('flowVelocity').value = '';
    document.getElementById('pipeRoughness').value = '0.000045';
    document.getElementById('customDensity').value = '';
    document.getElementById('customViscosity').value = '';
    document.getElementById('pipeFlowResult').style.display = 'none';
}

// Pump Selection Calculator
function getPumpCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="flowRate">Required Flow Rate (m³/s)</label>
                <input type="number" id="flowRate" placeholder="Enter flow rate" min="0" step="0.0001">
            </div>
            <div class="form-group">
                <label for="totalHead">Total Head Required (m)</label>
                <input type="number" id="totalHead" placeholder="Enter total head" min="0">
            </div>
            <div class="form-group">
                <label for="fluidDensityPump">Fluid Density (kg/m³)</label>
                <input type="number" id="fluidDensityPump" placeholder="Enter density" value="1000">
                <div class="form-hint">Default: Water (1000 kg/m³)</div>
            </div>
            <div class="form-group">
                <label for="pumpEfficiency">Pump Efficiency (%)</label>
                <input type="number" id="pumpEfficiency" placeholder="Enter efficiency" value="75" min="1" max="100">
                <div class="form-hint">Typical range: 50-85%</div>
            </div>
            <div class="form-group">
                <label for="motorEfficiency">Motor Efficiency (%)</label>
                <input type="number" id="motorEfficiency" placeholder="Enter efficiency" value="90" min="1" max="100">
                <div class="form-hint">Typical range: 85-95%</div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculatePump()">Calculate</button>
                <button class="btn-reset" onclick="resetPump()">Reset</button>
            </div>
            <div class="calculator-result" id="pumpResult" style="display: none;">
                <h4>Results</h4>
                <div>Hydraulic Power: <span class="result-value" id="hydraulicPower">0</span> <span class="unit-display">W</span></div>
                <div>Shaft Power: <span class="result-value" id="shaftPower">0</span> <span class="unit-display">W</span></div>
                <div>Motor Power: <span class="result-value" id="motorPower">0</span> <span class="unit-display">W</span></div>
                <div>Motor Power (HP): <span class="result-value" id="motorPowerHP">0</span> <span class="unit-display">HP</span></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">P_hydraulic = ρ·g·Q·H</div>
                    <div class="formula">P_shaft = P_hydraulic / η_pump</div>
                    <div class="formula">P_motor = P_shaft / η_motor</div>
                </div>
            </div>
        </div>
    `;
}

function calculatePump() {
    const Q = parseFloat(document.getElementById('flowRate').value);
    const H = parseFloat(document.getElementById('totalHead').value);
    const rho = parseFloat(document.getElementById('fluidDensityPump').value);
    const pumpEff = parseFloat(document.getElementById('pumpEfficiency').value) / 100;
    const motorEff = parseFloat(document.getElementById('motorEfficiency').value) / 100;
    const g = 9.81;

    if (isNaN(Q) || isNaN(H) || isNaN(rho) || Q <= 0 || H <= 0 || rho <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid flow rate, head, and density');
        return;
    }

    if (isNaN(pumpEff) || pumpEff <= 0 || pumpEff > 1) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid pump efficiency (1-100%)');
        return;
    }

    if (isNaN(motorEff) || motorEff <= 0 || motorEff > 1) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid motor efficiency (1-100%)');
        return;
    }

    // Calculate hydraulic power
    const P_hydraulic = rho * g * Q * H;

    // Calculate shaft power
    const P_shaft = P_hydraulic / pumpEff;

    // Calculate motor power
    const P_motor = P_shaft / motorEff;

    // Convert to HP (1 HP = 745.7 W)
    const P_motor_HP = P_motor / 745.7;

    document.getElementById('hydraulicPower').textContent = formatNumber(P_hydraulic, 2);
    document.getElementById('shaftPower').textContent = formatNumber(P_shaft, 2);
    document.getElementById('motorPower').textContent = formatNumber(P_motor, 2);
    document.getElementById('motorPowerHP').textContent = formatNumber(P_motor_HP, 2);

    const resultDiv = document.getElementById('pumpResult');
    resultDiv.style.display = 'block';

    // Add recommendation
    const recommendedHP = Math.ceil(P_motor_HP * 1.2); // 20% safety margin
    showInfo(resultDiv, `Recommended motor size: ${recommendedHP} HP (includes 20% safety margin)`);
}

function resetPump() {
    document.getElementById('flowRate').value = '';
    document.getElementById('totalHead').value = '';
    document.getElementById('fluidDensityPump').value = '1000';
    document.getElementById('pumpEfficiency').value = '75';
    document.getElementById('motorEfficiency').value = '90';
    document.getElementById('pumpResult').style.display = 'none';
}

// Material Selection Calculator
function getMaterialSelectionCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label>Select Materials to Compare</label>
                <div class="material-selector" id="materialSelector">
                    <div class="material-option selected" data-material="steel">
                        <div class="material-name">Steel</div>
                        <div class="material-properties">E=200 GPa, σ_y=250 MPa</div>
                    </div>
                    <div class="material-option" data-material="aluminum">
                        <div class="material-name">Aluminum</div>
                        <div class="material-properties">E=69 GPa, σ_y=95 MPa</div>
                    </div>
                    <div class="material-option" data-material="titanium">
                        <div class="material-name">Titanium</div>
                        <div class="material-properties">E=110 GPa, σ_y=880 MPa</div>
                    </div>
                    <div class="material-option" data-material="stainlessSteel">
                        <div class="material-name">Stainless Steel</div>
                        <div class="material-properties">E=193 GPa, σ_y=520 MPa</div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="designCriteria">Design Criteria</label>
                <select id="designCriteria">
                    <option value="strength">Strength (Yield)</option>
                    <option value="stiffness">Stiffness (Young's Modulus)</option>
                    <option value="weight">Strength-to-Weight Ratio</option>
                    <option value="thermal">Thermal Conductivity</option>
                    <option value="cost">Cost Effectiveness</option>
                </select>
            </div>

            <div class="form-group">
                <label for="appliedStress">Applied Stress (MPa)</label>
                <input type="number" id="appliedStress" placeholder="Enter applied stress" min="0">
            </div>

            <div class="form-group">
                <label for="safetyFactorMat">Safety Factor</label>
                <input type="number" id="safetyFactorMat" placeholder="Enter safety factor" value="2" min="1" step="0.1">
            </div>

            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateMaterialSelection()">Calculate</button>
                <button class="btn-reset" onclick="resetMaterialSelection()">Reset</button>
            </div>

            <div class="calculator-result" id="materialResult" style="display: none;">
                <h4>Results</h4>
                <div id="materialComparison"></div>
                <div class="result-details">
                    <p>Comparison based on selected criteria</p>
                </div>
            </div>
        </div>
    `;
}

function initializeMaterialSelectionCalculator() {
    const materialOptions = document.querySelectorAll('.material-option');
    materialOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

function calculateMaterialSelection() {
    const selectedMaterials = Array.from(document.querySelectorAll('.material-option.selected'))
        .map(opt => opt.getAttribute('data-material'));

    if (selectedMaterials.length === 0) {
        showError(document.querySelector('.calculator-form'), 'Please select at least one material');
        return;
    }

    const criteria = document.getElementById('designCriteria').value;
    const appliedStress = parseFloat(document.getElementById('appliedStress').value) * 1e6; // Convert to Pa
    const safetyFactor = parseFloat(document.getElementById('safetyFactorMat').value);

    let comparisonHTML = '<table style="width: 100%; border-collapse: collapse;">';
    comparisonHTML += '<tr style="background: #f0f0f0;"><th style="padding: 8px; border: 1px solid #ddd;">Material</th>';
    comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Density (kg/m³)</th>';

    switch(criteria) {
        case 'strength':
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Yield Strength (MPa)</th>';
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Safety Factor</th>';
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Suitable</th>';
            break;
        case 'stiffness':
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Young\'s Modulus (GPa)</th>';
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Stiffness Rating</th>';
            break;
        case 'weight':
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Strength/Weight (kN·m/kg)</th>';
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Weight Rating</th>';
            break;
        case 'thermal':
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Thermal Conductivity (W/m·K)</th>';
            comparisonHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Thermal Rating</th>';
            break;
    }

    comparisonHTML += '</tr>';

    const materials = selectedMaterials.map(mat => materialsDB[mat]);

    materials.forEach(mat => {
        comparisonHTML += `<tr><td style="padding: 8px; border: 1px solid #ddd;">${mat.name}</td>`;
        comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${formatNumber(mat.density, 0)}</td>`;

        switch(criteria) {
            case 'strength':
                const yieldStrengthMPa = mat.yieldStrength;
                const actualSF = mat.yieldStrength / (appliedStress || 1);
                const isSuitable = !isNaN(appliedStress) && actualSF >= safetyFactor;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${yieldStrengthMPa}</td>`;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${formatNumber(actualSF, 2)}</td>`;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${isSuitable ? '✓ Yes' : '✗ No'}</td>`;
                break;
            case 'stiffness':
                const stiffnessRating = mat.youngsModulus;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${stiffnessRating}</td>`;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${getRating(stiffnessRating, 200)}</td>`;
                break;
            case 'weight':
                const strengthWeight = (mat.yieldStrength * 1e6) / mat.density;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${formatNumber(strengthWeight / 1000, 1)}</td>`;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${getRating(strengthWeight / 1000, 100)}</td>`;
                break;
            case 'thermal':
                const thermalRating = mat.thermalConductivity;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${thermalRating}</td>`;
                comparisonHTML += `<td style="padding: 8px; border: 1px solid #ddd;">${getRating(thermalRating, 400)}</td>`;
                break;
        }

        comparisonHTML += '</tr>';
    });

    comparisonHTML += '</table>';

    document.getElementById('materialComparison').innerHTML = comparisonHTML;

    const resultDiv = document.getElementById('materialResult');
    resultDiv.style.display = 'block';
}

function getRating(value, max) {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return '⭐⭐⭐⭐⭐ Excellent';
    if (percentage >= 60) return '⭐⭐⭐⭐ Good';
    if (percentage >= 40) return '⭐⭐⭐ Fair';
    if (percentage >= 20) return '⭐⭐ Poor';
    return '⭐ Very Poor';
}

function resetMaterialSelection() {
    document.querySelectorAll('.material-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector('.material-option[data-material="steel"]').classList.add('selected');
    document.getElementById('appliedStress').value = '';
    document.getElementById('safetyFactorMat').value = '2';
    document.getElementById('materialResult').style.display = 'none';
}

// Fatigue Life Calculator
function getFatigueCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="alternatingStress">Alternating Stress (MPa)</label>
                <input type="number" id="alternatingStress" placeholder="Enter alternating stress" min="0">
            </div>
            <div class="form-group">
                <label for="meanStress">Mean Stress (MPa)</label>
                <input type="number" id="meanStress" placeholder="Enter mean stress" value="0">
            </div>
            <div class="form-group">
                <label for="enduranceLimit">Endurance Limit (MPa)</label>
                <input type="number" id="enduranceLimit" placeholder="Enter endurance limit" value="200">
                <div class="form-hint">Default: Steel (200 MPa)</div>
            </div>
            <div class="form-group">
                <label for="ultimateStrength">Ultimate Tensile Strength (MPa)</label>
                <input type="number" id="ultimateStrength" placeholder="Enter ultimate strength" value="400">
                <div class="form-hint">Default: Steel (400 MPa)</div>
            </div>
            <div class="form-group">
                <label for="fatigueMethod">Analysis Method</label>
                <select id="fatigueMethod">
                    <option value="soderberg">Soderberg</option>
                    <option value="gerber">Gerber</option>
                    <option value="goodman">Goodman</option>
                </select>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateFatigue()">Calculate</button>
                <button class="btn-reset" onclick="resetFatigue()">Reset</button>
            </div>
            <div class="calculator-result" id="fatigueResult" style="display: none;">
                <h4>Results</h4>
                <div>Safety Factor: <span class="result-value" id="fatigueSafetyFactor">0</span></div>
                <div id="fatigueStatus"></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula" id="fatigueFormula">σ_a/σ_e + σ_m/σ_uts = 1/SF</div>
                </div>
            </div>
        </div>
    `;
}

function calculateFatigue() {
    const sigma_a = parseFloat(document.getElementById('alternatingStress').value) * 1e6; // Convert to Pa
    const sigma_m = parseFloat(document.getElementById('meanStress').value) * 1e6;
    const sigma_e = parseFloat(document.getElementById('enduranceLimit').value) * 1e6;
    const sigma_uts = parseFloat(document.getElementById('ultimateStrength').value) * 1e6;
    const method = document.getElementById('fatigueMethod').value;

    if (isNaN(sigma_a) || sigma_a <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid alternating stress');
        return;
    }

    if (isNaN(sigma_e) || sigma_e <= 0 || isNaN(sigma_uts) || sigma_uts <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid endurance limit and ultimate strength');
        return;
    }

    let SF = 0;
    let formula = '';

    switch(method) {
        case 'soderberg':
            // Soderberg line (most conservative)
            SF = 1 / (sigma_a / sigma_e + sigma_m / (sigma_uts / 2)); // Using yield as 0.5*UTS
            formula = 'σ_a/σ_e + σ_m/σ_y = 1/SF';
            break;
        case 'gerber':
            // Gerber parabola
            const A = sigma_a / sigma_e;
            const B = sigma_m / sigma_uts;
            SF = (1 + Math.sqrt(1 + 4 * A * B)) / (2 * A);
            formula = '(σ_a/σ_e)² + (σ_m/σ_uts) = 1/SF²';
            break;
        case 'goodman':
            // Goodman line
            SF = 1 / (sigma_a / sigma_e + sigma_m / sigma_uts);
            formula = 'σ_a/σ_e + σ_m/σ_uts = 1/SF';
            break;
    }

    document.getElementById('fatigueSafetyFactor').textContent = formatNumber(SF, 2);
    document.getElementById('fatigueFormula').textContent = formula;

    const statusDiv = document.getElementById('fatigueStatus');
    if (SF >= 1) {
        statusDiv.innerHTML = '<div class="calculator-success">✓ Design is safe for infinite life</div>';
    } else if (SF >= 0.8) {
        statusDiv.innerHTML = '<div class="calculator-warning">⚠ Marginal safety - consider redesign</div>';
    } else {
        statusDiv.innerHTML = '<div class="calculator-error">✗ Design is unsafe - redesign required</div>';
    }

    const resultDiv = document.getElementById('fatigueResult');
    resultDiv.style.display = 'block';
}

function resetFatigue() {
    document.getElementById('alternatingStress').value = '';
    document.getElementById('meanStress').value = '0';
    document.getElementById('enduranceLimit').value = '200';
    document.getElementById('ultimateStrength').value = '400';
    document.getElementById('fatigueResult').style.display = 'none';
}

// Creep Calculator
function getCreepCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="creepStress">Applied Stress (MPa)</label>
                <input type="number" id="creepStress" placeholder="Enter stress" min="0">
            </div>
            <div class="form-group">
                <label for="creepTemperature">Temperature (°C)</label>
                <input type="number" id="creepTemperature" placeholder="Enter temperature">
            </div>
            <div class="form-group">
                <label for="creepTime">Time (hours)</label>
                <input type="number" id="creepTime" placeholder="Enter time" min="0">
            </div>
            <div class="form-group">
                <label for="creepMaterial">Material</label>
                <select id="creepMaterial">
                    <option value="steel">Steel</option>
                    <option value="aluminum">Aluminum</option>
                    <option value="titanium">Titanium</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div id="customCreepInputs" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="creepConstantA">Constant A</label>
                        <input type="number" id="creepConstantA" placeholder="A" step="0.0000001">
                    </div>
                    <div class="form-group">
                        <label for="creepConstantN">Constant n</label>
                        <input type="number" id="creepConstantN" placeholder="n" step="0.1">
                    </div>
                </div>
                <div class="form-group">
                    <label for="creepConstantQ">Activation Energy Q (J/mol)</label>
                    <input type="number" id="creepConstantQ" placeholder="Q">
                </div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateCreep()">Calculate</button>
                <button class="btn-reset" onclick="resetCreep()">Reset</button>
            </div>
            <div class="calculator-result" id="creepResult" style="display: none;">
                <h4>Results</h4>
                <div>Creep Strain: <span class="result-value" id="creepStrain">0</span> <span class="unit-display">%</span></div>
                <div>Creep Rate: <span class="result-value" id="creepRate">0</span> <span class="unit-display">%/hour</span></div>
                <div class="result-details">
                    <p>Formula used:</p>
                    <div class="formula">ε = A·σⁿ·t·exp(-Q/RT)</div>
                    <p>Where: A = material constant, σ = stress, n = stress exponent, t = time, Q = activation energy, R = gas constant, T = temperature</p>
                </div>
            </div>
        </div>
    `;
}

// Initialize creep calculator
document.addEventListener('DOMContentLoaded', function() {
    const creepMaterial = document.getElementById('creepMaterial');
    if (creepMaterial) {
        creepMaterial.addEventListener('change', function() {
            document.getElementById('customCreepInputs').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
});

function calculateCreep() {
    const stress = parseFloat(document.getElementById('creepStress').value) * 1e6; // Convert to Pa
    const tempC = parseFloat(document.getElementById('creepTemperature').value);
    const time = parseFloat(document.getElementById('creepTime').value);
    const material = document.getElementById('creepMaterial').value;
    const R = 8.314; // Gas constant

    if (isNaN(stress) || stress <= 0 || isNaN(tempC) || isNaN(time) || time <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid stress, temperature, and time');
        return;
    }

    const T = tempC + 273.15; // Convert to Kelvin

    // Simplified creep constants (typical values)
    const creepConstants = {
        steel: { A: 1e-20, n: 5, Q: 300000 },
        aluminum: { A: 1e-15, n: 4, Q: 150000 },
        titanium: { A: 1e-18, n: 4.5, Q: 250000 }
    };

    let A, n, Q;
    if (material === 'custom') {
        A = parseFloat(document.getElementById('creepConstantA').value);
        n = parseFloat(document.getElementById('creepConstantN').value);
        Q = parseFloat(document.getElementById('creepConstantQ').value);
        if (isNaN(A) || isNaN(n) || isNaN(Q)) {
            showError(document.querySelector('.calculator-form'), 'Please enter valid creep constants');
            return;
        }
    } else {
        A = creepConstants[material].A;
        n = creepConstants[material].n;
        Q = creepConstants[material].Q;
    }

    // Calculate creep strain using power law
    const creepStrain = A * Math.pow(stress, n) * time * Math.exp(-Q / (R * T));

    // Calculate creep rate
    const creepRate = creepStrain / time;

    document.getElementById('creepStrain').textContent = formatNumber(creepStrain * 100, 6);
    document.getElementById('creepRate').textContent = formatNumber(creepRate * 100, 8);

    const resultDiv = document.getElementById('creepResult');
    resultDiv.style.display = 'block';

    // Add warning for high creep
    if (creepStrain > 0.01) { // More than 1% strain
        showWarning(resultDiv, 'High creep strain detected. Consider reducing stress or temperature.');
    }
}

function resetCreep() {
    document.getElementById('creepStress').value = '';
    document.getElementById('creepTemperature').value = '';
    document.getElementById('creepTime').value = '';
    document.getElementById('creepConstantA').value = '';
    document.getElementById('creepConstantN').value = '';
    document.getElementById('creepConstantQ').value = '';
    document.getElementById('creepResult').style.display = 'none';
}

// Fracture Mechanics Calculator
function getFractureCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="fractureToughness">Fracture Toughness K_IC (MPa√m)</label>
                <input type="number" id="fractureToughness" placeholder="Enter K_IC" value="50">
                <div class="form-hint">Default: Steel (50 MPa√m)</div>
            </div>
            <div class="form-group">
                <label for="appliedStressFracture">Applied Stress (MPa)</label>
                <input type="number" id="appliedStressFracture" placeholder="Enter applied stress" min="0">
            </div>
            <div class="form-group">
                <label for="crackGeometry">Crack Geometry</label>
                <select id="crackGeometry">
                    <option value="edge">Edge Crack</option>
                    <option value="center">Center Crack</option>
                    <option value="surface">Surface Crack</option>
                </select>
            </div>
            <div class="form-group">
                <label for="crackLength">Crack Length (mm)</label>
                <input type="number" id="crackLength" placeholder="Enter crack length" min="0" step="0.1">
            </div>
            <div class="form-group">
                <label for="specimenWidth">Specimen Width (mm)</label>
                <input type="number" id="specimenWidth" placeholder="Enter specimen width" min="0" step="0.1">
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateFracture()">Calculate</button>
                <button class="btn-reset" onclick="resetFracture()">Reset</button>
            </div>
            <div class="calculator-result" id="fractureResult" style="display: none;">
                <h4>Results</h4>
                <div>Stress Intensity Factor: <span class="result-value" id="stressIntensity">0</span> <span class="unit-display">MPa√m</span></div>
                <div>Critical Crack Length: <span class="result-value" id="criticalCrackLength">0</span> <span class="unit-display">mm</span></div>
                <div>Safety Factor: <span class="result-value" id="fractureSafetyFactor">0</span></div>
                <div id="fractureStatus"></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">K_I = Y·σ·√(π·a)</div>
                    <div class="formula">a_c = (1/π)·(K_IC/(Y·σ))²</div>
                </div>
            </div>
        </div>
    `;
}

function calculateFracture() {
    const K_IC = parseFloat(document.getElementById('fractureToughness').value);
    const sigma = parseFloat(document.getElementById('appliedStressFracture').value);
    const geometry = document.getElementById('crackGeometry').value;
    const a = parseFloat(document.getElementById('crackLength').value) / 1000; // Convert to m
    const W = parseFloat(document.getElementById('specimenWidth').value) / 1000; // Convert to m

    if (isNaN(K_IC) || K_IC <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid fracture toughness');
        return;
    }

    if (isNaN(sigma) || sigma <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid applied stress');
        return;
    }

    // Geometry factor Y (simplified)
    let Y = 1.12; // Default for edge crack
    switch(geometry) {
        case 'edge':
            Y = 1.12;
            break;
        case 'center':
            Y = 1.0;
            break;
        case 'surface':
            Y = 1.15;
            break;
    }

    // Calculate stress intensity factor
    const K_I = Y * sigma * Math.sqrt(Math.PI * a);

    // Calculate critical crack length
    const a_c = (1 / Math.PI) * Math.pow(K_IC / (Y * sigma), 2);

    // Calculate safety factor
    const SF = K_IC / K_I;

    document.getElementById('stressIntensity').textContent = formatNumber(K_I, 2);
    document.getElementById('criticalCrackLength').textContent = formatNumber(a_c * 1000, 2);
    document.getElementById('fractureSafetyFactor').textContent = formatNumber(SF, 2);

    const statusDiv = document.getElementById('fractureStatus');
    if (SF >= 2) {
        statusDiv.innerHTML = '<div class="calculator-success">✓ Safe - crack is stable</div>';
    } else if (SF >= 1) {
        statusDiv.innerHTML = '<div class="calculator-warning">⚠ Marginal - crack may propagate</div>';
    } else {
        statusDiv.innerHTML = '<div class="calculator-error">✗ Unsafe - crack will propagate (fracture imminent)</div>';
    }

    const resultDiv = document.getElementById('fractureResult');
    resultDiv.style.display = 'block';

    // Add crack length comparison
    if (!isNaN(a) && a > 0) {
        if (a >= a_c) {
            showWarning(resultDiv, 'Current crack length exceeds critical length - immediate failure expected');
        } else {
            const remainingLife = (a_c - a) / a_c * 100;
            showInfo(resultDiv, `Crack can grow ${formatNumber(remainingLife, 1)}% before reaching critical size`);
        }
    }
}

function resetFracture() {
    document.getElementById('fractureToughness').value = '50';
    document.getElementById('appliedStressFracture').value = '';
    document.getElementById('crackLength').value = '';
    document.getElementById('specimenWidth').value = '';
    document.getElementById('fractureResult').style.display = 'none';
}

// Gear Design Calculator
function getGearCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="gearType">Gear Type</label>
                <select id="gearType">
                    <option value="spur">Spur Gear</option>
                    <option value="helical">Helical Gear</option>
                </select>
            </div>
            <div class="form-group">
                <label for="pinionTeeth">Pinion Teeth (N₁)</label>
                <input type="number" id="pinionTeeth" placeholder="Enter pinion teeth" value="20" min="12">
            </div>
            <div class="form-group">
                <label for="gearTeeth">Gear Teeth (N₂)</label>
                <input type="number" id="gearTeeth" placeholder="Enter gear teeth" value="40" min="12">
            </div>
            <div class="form-group">
                <label for="module">Module (mm)</label>
                <input type="number" id="module" placeholder="Enter module" value="2" min="0.5" step="0.5">
            </div>
            <div class="form-group">
                <label for="gearPressureAngle">Pressure Angle (°)</label>
                <input type="number" id="gearPressureAngle" placeholder="Enter pressure angle" value="20">
            </div>
            <div class="form-group">
                <label for="inputPower">Input Power (kW)</label>
                <input type="number" id="inputPower" placeholder="Enter input power" min="0">
            </div>
            <div class="form-group">
                <label for="inputSpeed">Input Speed (RPM)</label>
                <input type="number" id="inputSpeed" placeholder="Enter input speed" min="0">
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateGear()">Calculate</button>
                <button class="btn-reset" onclick="resetGear()">Reset</button>
            </div>
            <div class="calculator-result" id="gearResult" style="display: none;">
                <h4>Results</h4>
                <div>Gear Ratio: <span class="result-value" id="gearRatio">0</span></div>
                <div>Output Speed: <span class="result-value" id="outputSpeed">0</span> <span class="unit-display">RPM</span></div>
                <div>Output Torque: <span class="result-value" id="outputTorque">0</span> <span class="unit-display">N·m</span></div>
                <div>Pinion Pitch Diameter: <span class="result-value" id="pinionDiameter">0</span> <span class="unit-display">mm</span></div>
                <div>Gear Pitch Diameter: <span class="result-value" id="gearDiameter">0</span> <span class="unit-display">mm</span></div>
                <div>Center Distance: <span class="result-value" id="centerDistance">0</span> <span class="unit-display">mm</span></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">GR = N₂/N₁</div>
                    <div class="formula">n₂ = n₁/GR</div>
                    <div class="formula">T₂ = T₁·GR·η</div>
                    <div class="formula">d = m·N</div>
                    <div class="formula">C = (d₁ + d₂)/2</div>
                </div>
            </div>
        </div>
    `;
}

function calculateGear() {
    const N1 = parseInt(document.getElementById('pinionTeeth').value);
    const N2 = parseInt(document.getElementById('gearTeeth').value);
    const m = parseFloat(document.getElementById('module').value);
    const pressureAngle = parseFloat(document.getElementById('gearPressureAngle').value);
    const P_input = parseFloat(document.getElementById('inputPower').value);
    const n1 = parseFloat(document.getElementById('inputSpeed').value);

    if (isNaN(N1) || N1 < 12 || isNaN(N2) || N2 < 12) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid number of teeth (minimum 12)');
        return;
    }

    if (isNaN(m) || m <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid module');
        return;
    }

    // Calculate gear ratio
    const GR = N2 / N1;

    // Calculate pitch diameters
    const d1 = m * N1;
    const d2 = m * N2;

    // Calculate center distance
    const C = (d1 + d2) / 2;

    document.getElementById('gearRatio').textContent = formatNumber(GR, 2);
    document.getElementById('pinionDiameter').textContent = formatNumber(d1, 2);
    document.getElementById('gearDiameter').textContent = formatNumber(d2, 2);
    document.getElementById('centerDistance').textContent = formatNumber(C, 2);

    // Calculate output speed and torque if power and speed are provided
    if (!isNaN(P_input) && P_input > 0 && !isNaN(n1) && n1 > 0) {
        const n2 = n1 / GR;
        const T1 = (P_input * 1000) / (2 * Math.PI * n1 / 60); // Input torque in N·m
        const efficiency = 0.95; // Assume 95% efficiency
        const T2 = T1 * GR * efficiency;

        document.getElementById('outputSpeed').textContent = formatNumber(n2, 0);
        document.getElementById('outputTorque').textContent = formatNumber(T2, 2);
    } else {
        document.getElementById('outputSpeed').textContent = 'N/A';
        document.getElementById('outputTorque').textContent = 'N/A';
    }

    const resultDiv = document.getElementById('gearResult');
    resultDiv.style.display = 'block';

    // Add design recommendations
    if (GR > 10) {
        showWarning(resultDiv, 'High gear ratio detected. Consider using multiple gear stages.');
    }

    if (N1 < 17 && pressureAngle === 20) {
        showWarning(resultDiv, 'Low tooth count may cause undercutting with 20° pressure angle. Consider 25° pressure angle or more teeth.');
    }
}

function resetGear() {
    document.getElementById('pinionTeeth').value = '20';
    document.getElementById('gearTeeth').value = '40';
    document.getElementById('module').value = '2';
    document.getElementById('gearPressureAngle').value = '20';
    document.getElementById('inputPower').value = '';
    document.getElementById('inputSpeed').value = '';
    document.getElementById('gearResult').style.display = 'none';
}

// Bearing Selection Calculator
function getBearingCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="bearingType">Bearing Type</label>
                <select id="bearingType">
                    <option value="ball">Ball Bearing</option>
                    <option value="roller">Roller Bearing</option>
                </select>
            </div>
            <div class="form-group">
                <label for="radialLoad">Radial Load (N)</label>
                <input type="number" id="radialLoad" placeholder="Enter radial load" min="0">
            </div>
            <div class="form-group">
                <label for="axialLoad">Axial Load (N)</label>
                <input type="number" id="axialLoad" placeholder="Enter axial load" value="0" min="0">
            </div>
            <div class="form-group">
                <label for="bearingSpeed">Speed (RPM)</label>
                <input type="number" id="bearingSpeed" placeholder="Enter speed" min="0">
            </div>
            <div class="form-group">
                <label for="desiredLife">Desired Life (hours)</label>
                <input type="number" id="desiredLife" placeholder="Enter desired life" value="10000" min="0">
            </div>
            <div class="form-group">
                <label for="loadFactor">Load Factor</label>
                <select id="loadFactor">
                    <option value="1.0">Steady Load (1.0)</option>
                    <option value="1.2">Light Shock (1.2)</option>
                    <option value="1.5">Moderate Shock (1.5)</option>
                    <option value="2.0">Heavy Shock (2.0)</option>
                </select>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateBearing()">Calculate</button>
                <button class="btn-reset" onclick="resetBearing()">Reset</button>
            </div>
            <div class="calculator-result" id="bearingResult" style="display: none;">
                <h4>Results</h4>
                <div>Equivalent Load: <span class="result-value" id="equivalentLoad">0</span> <span class="unit-display">N</span></div>
                <div>Required Dynamic Load Rating: <span class="result-value" id="dynamicLoadRating">0</span> <span class="unit-display">N</span></div>
                <div>Required Static Load Rating: <span class="result-value" id="staticLoadRating">0</span> <span class="unit-display">N</span></div>
                <div id="bearingRecommendation"></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">P = X·F_r + Y·F_a</div>
                    <div class="formula">C = P·(L₁₀·n/16667)^(1/3)</div>
                </div>
            </div>
        </div>
    `;
}

function calculateBearing() {
    const type = document.getElementById('bearingType').value;
    const F_r = parseFloat(document.getElementById('radialLoad').value);
    const F_a = parseFloat(document.getElementById('axialLoad').value);
    const n = parseFloat(document.getElementById('bearingSpeed').value);
    const L_h = parseFloat(document.getElementById('desiredLife').value);
    const K = parseFloat(document.getElementById('loadFactor').value);

    if (isNaN(F_r) || F_r <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid radial load');
        return;
    }

    if (isNaN(n) || n <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid speed');
        return;
    }

    if (isNaN(L_h) || L_h <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid desired life');
        return;
    }

    // Calculate equivalent load
    let X, Y;
    if (type === 'ball') {
        X = 0.56;
        Y = F_a > 0 ? 1.0 : 0; // Simplified
    } else {
        X = 0.4;
        Y = F_a > 0 ? 0.4 : 0; // Simplified for roller
    }

    const P = (X * F_r + Y * F_a) * K;

    // Calculate required dynamic load rating
    const L_10 = L_h * n / 16667; // Convert hours to revolutions (in millions)
    const C = P * Math.pow(L_10, 1/3);

    // Calculate required static load rating (simplified)
    const C_0 = P * 2; // Typically 2-3 times dynamic load

    document.getElementById('equivalentLoad').textContent = formatNumber(P, 0);
    document.getElementById('dynamicLoadRating').textContent = formatNumber(C, 0);
    document.getElementById('staticLoadRating').textContent = formatNumber(C_0, 0);

    // Provide bearing recommendation
    let recommendation = '';
    if (C < 10000) {
        recommendation = 'Light series bearing (e.g., 6000 series)';
    } else if (C < 50000) {
        recommendation = 'Medium series bearing (e.g., 6200 series)';
    } else if (C < 100000) {
        recommendation = 'Heavy series bearing (e.g., 6300 series)';
    } else {
        recommendation = 'Extra heavy series or consider multiple bearings';
    }

    document.getElementById('bearingRecommendation').innerHTML = `<div class="calculator-info">Recommended: ${recommendation}</div>`;

    const resultDiv = document.getElementById('bearingResult');
    resultDiv.style.display = 'block';

    // Add axial load warning
    if (F_a > 0.3 * F_r) {
        showWarning(resultDiv, 'High axial load ratio. Consider angular contact bearings.');
    }
}

function resetBearing() {
    document.getElementById('radialLoad').value = '';
    document.getElementById('axialLoad').value = '0';
    document.getElementById('bearingSpeed').value = '';
    document.getElementById('desiredLife').value = '10000';
    document.getElementById('loadFactor').value = '1.0';
    document.getElementById('bearingResult').style.display = 'none';
}

// Bolted Joint Calculator
function getBoltedCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="boltSize">Bolt Size</label>
                <select id="boltSize">
                    <option value="M6">M6</option>
                    <option value="M8">M8</option>
                    <option value="M10" selected>M10</option>
                    <option value="M12">M12</option>
                    <option value="M16">M16</option>
                    <option value="M20">M20</option>
                </select>
            </div>
            <div class="form-group">
                <label for="boltGrade">Bolt Grade</label>
                <select id="boltGrade">
                    <option value="4.6">4.6</option>
                    <option value="8.8" selected>8.8</option>
                    <option value="10.9">10.9</option>
                    <option value="12.9">12.9</option>
                </select>
            </div>
            <div class="form-group">
                <label for="numberOfBolts">Number of Bolts</label>
                <input type="number" id="numberOfBolts" placeholder="Enter number of bolts" value="4" min="1">
            </div>
            <div class="form-group">
                <label for="externalLoad">External Load (N)</label>
                <input type="number" id="externalLoad" placeholder="Enter external load" min="0">
            </div>
            <div class="form-group">
                <label for="jointStiffness">Joint Stiffness Ratio</label>
                <input type="number" id="jointStiffness" placeholder="Enter stiffness ratio" value="0.2" min="0" max="1" step="0.1">
                <div class="form-hint">Typical range: 0.2-0.5 (0.2 = soft joint, 0.5 = stiff joint)</div>
            </div>
            <div class="form-group">
                <label for="safetyFactorBolt">Safety Factor</label>
                <input type="number" id="safetyFactorBolt" placeholder="Enter safety factor" value="2" min="1" step="0.1">
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateBolted()">Calculate</button>
                <button class="btn-reset" onclick="resetBolted()">Reset</button>
            </div>
            <div class="calculator-result" id="boltedResult" style="display: none;">
                <h4>Results</h4>
                <div>Bolt Proof Load: <span class="result-value" id="boltProofLoad">0</span> <span class="unit-display">N</span></div>
                <div>Recommended Preload: <span class="result-value" id="recommendedPreload">0</span> <span class="unit-display">N</span></div>
                <div>Load per Bolt: <span class="result-value" id="loadPerBolt">0</span> <span class="unit-display">N</span></div>
                <div>Total Load on Bolt: <span class="result-value" id="totalLoadOnBolt">0</span> <span class="unit-display">N</span></div>
                <div>Safety Factor: <span class="result-value" id="boltedSafetyFactor">0</span></div>
                <div id="boltedStatus"></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">F_preload = 0.75·F_proof</div>
                    <div class="formula">F_bolt = F_preload + C·F_external</div>
                    <div class="formula">SF = F_proof / F_bolt</div>
                </div>
            </div>
        </div>
    `;
}

function calculateBolted() {
    const boltSize = document.getElementById('boltSize').value;
    const boltGrade = parseFloat(document.getElementById('boltGrade').value);
    const numBolts = parseInt(document.getElementById('numberOfBolts').value);
    const F_external = parseFloat(document.getElementById('externalLoad').value);
    const C = parseFloat(document.getElementById('jointStiffness').value);
    const SF_required = parseFloat(document.getElementById('safetyFactorBolt').value);

    // Bolt properties (simplified)
    const boltProperties = {
        'M6': { area: 20.1, proofStress: 225 },
        'M8': { area: 36.6, proofStress: 225 },
        'M10': { area: 58.0, proofStress: 225 },
        'M12': { area: 84.3, proofStress: 225 },
        'M16': { area: 157, proofStress: 225 },
        'M20': { area: 245, proofStress: 225 }
    };

    const bolt = boltProperties[boltSize];
    const proofStress = bolt.proofStress * (boltGrade / 4.6); // Adjust for grade
    const F_proof = bolt.area * proofStress;

    // Calculate recommended preload (75% of proof load)
    const F_preload = 0.75 * F_proof;

    // Calculate load per bolt
    const F_per_bolt = F_external / numBolts;

    // Calculate total load on bolt
    const F_bolt = F_preload + C * F_per_bolt;

    // Calculate safety factor
    const SF = F_proof / F_bolt;

    document.getElementById('boltProofLoad').textContent = formatNumber(F_proof, 0);
    document.getElementById('recommendedPreload').textContent = formatNumber(F_preload, 0);
    document.getElementById('loadPerBolt').textContent = formatNumber(F_per_bolt, 0);
    document.getElementById('totalLoadOnBolt').textContent = formatNumber(F_bolt, 0);
    document.getElementById('boltedSafetyFactor').textContent = formatNumber(SF, 2);

    const statusDiv = document.getElementById('boltedStatus');
    if (SF >= SF_required) {
        statusDiv.innerHTML = '<div class="calculator-success">✓ Design is safe</div>';
    } else {
        statusDiv.innerHTML = '<div class="calculator-error">✗ Design is unsafe - increase bolt size or number of bolts</div>';
    }

    const resultDiv = document.getElementById('boltedResult');
    resultDiv.style.display = 'block';

    // Add preload recommendation
    showInfo(resultDiv, `Apply preload of ${formatNumber(F_preload, 0)} N per bolt using torque wrench`);
}

function resetBolted() {
    document.getElementById('boltSize').value = 'M10';
    document.getElementById('boltGrade').value = '8.8';
    document.getElementById('numberOfBolts').value = '4';
    document.getElementById('externalLoad').value = '';
    document.getElementById('jointStiffness').value = '0.2';
    document.getElementById('safetyFactorBolt').value = '2';
    document.getElementById('boltedResult').style.display = 'none';
}

// Spring Design Calculator
function getSpringCalculator() {
    return `
        <div class="calculator-form">
            <div class="form-group">
                <label for="springType">Spring Type</label>
                <select id="springType">
                    <option value="compression">Compression Spring</option>
                    <option value="extension">Extension Spring</option>
                </select>
            </div>
            <div class="form-group">
                <label for="springLoad">Operating Load (N)</label>
                <input type="number" id="springLoad" placeholder="Enter operating load" min="0">
            </div>
            <div class="form-group">
                <label for="springDeflection">Deflection (mm)</label>
                <input type="number" id="springDeflection" placeholder="Enter deflection" min="0">
            </div>
            <div class="form-group">
                <label for="wireDiameter">Wire Diameter (mm)</label>
                <input type="number" id="wireDiameter" placeholder="Enter wire diameter" value="2" min="0.5" step="0.1">
            </div>
            <div class="form-group">
                <label for="springMaterial">Material</label>
                <select id="springMaterial">
                    <option value="musicWire">Music Wire (G = 79.3 GPa)</option>
                    <option value="stainlessSteel">Stainless Steel (G = 69 GPa)</option>
                    <option value="oilTempered">Oil Tempered (G = 78.6 GPa)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="springIndex">Spring Index (C)</label>
                <input type="number" id="springIndex" placeholder="Enter spring index" value="8" min="4" max="12">
                <div class="form-hint">Typical range: 6-10 (C = D/d)</div>
            </div>
            <div class="calculator-actions">
                <button class="btn-calculate" onclick="calculateSpring()">Calculate</button>
                <button class="btn-reset" onclick="resetSpring()">Reset</button>
            </div>
            <div class="calculator-result" id="springResult" style="display: none;">
                <h4>Results</h4>
                <div>Spring Rate: <span class="result-value" id="springRate">0</span> <span class="unit-display">N/mm</span></div>
                <div>Mean Coil Diameter: <span class="result-value" id="meanCoilDiameter">0</span> <span class="unit-display">mm</span></div>
                <div>Outer Diameter: <span class="result-value" id="outerDiameter">0</span> <span class="unit-display">mm</span></div>
                <div>Number of Active Coils: <span class="result-value" id="activeCoils">0</span></div>
                <div>Total Coils: <span class="result-value" id="totalCoils">0</span></div>
                <div>Free Length: <span class="result-value" id="freeLength">0</span> <span class="unit-display">mm</span></div>
                <div>Shear Stress: <span class="result-value" id="shearStress">0</span> <span class="unit-display">MPa</span></div>
                <div id="springStatus"></div>
                <div class="result-details">
                    <p>Formulas used:</p>
                    <div class="formula">k = G·d⁴/(8·D³·N_a)</div>
                    <div class="formula">τ = K·(8·F·D)/(π·d³)</div>
                    <div class="formula">K = (4C-1)/(4C-4) + 0.615/C</div>
                </div>
            </div>
        </div>
    `;
}

function calculateSpring() {
    const F = parseFloat(document.getElementById('springLoad').value);
    const delta = parseFloat(document.getElementById('springDeflection').value);
    const d = parseFloat(document.getElementById('wireDiameter').value) / 1000; // Convert to m
    const material = document.getElementById('springMaterial').value;
    const C = parseFloat(document.getElementById('springIndex').value);

    if (isNaN(F) || F <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid operating load');
        return;
    }

    if (isNaN(delta) || delta <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid deflection');
        return;
    }

    if (isNaN(d) || d <= 0) {
        showError(document.querySelector('.calculator-form'), 'Please enter valid wire diameter');
        return;
    }

    // Material properties
    const G_values = {
        musicWire: 79.3e9,
        stainlessSteel: 69e9,
        oilTempered: 78.6e9
    };

    const G = G_values[material];

    // Calculate spring rate
    const k = F / (delta / 1000); // N/m

    // Calculate mean coil diameter
    const D = C * d;

    // Calculate number of active coils
    const N_a = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * k);

    // Calculate total coils (add 2 for end coils)
    const N_total = N_a + 2;

    // Calculate outer diameter
    const D_outer = D + d;

    // Calculate free length (simplified)
    const L_free = N_total * d + delta / 1000;

    // Calculate shear stress
    const K_w = (4 * C - 1) / (4 * C - 4) + 0.615 / C; // Wahl correction factor
    const tau = K_w * (8 * F * D) / (Math.PI * Math.pow(d, 3));

    document.getElementById('springRate').textContent = formatNumber(k / 1000, 2); // Convert to N/mm
    document.getElementById('meanCoilDiameter').textContent = formatNumber(D * 1000, 2);
    document.getElementById('outerDiameter').textContent = formatNumber(D_outer * 1000, 2);
    document.getElementById('activeCoils').textContent = formatNumber(N_a, 1);
    document.getElementById('totalCoils').textContent = formatNumber(N_total, 1);
    document.getElementById('freeLength').textContent = formatNumber(L_free * 1000, 1);
    document.getElementById('shearStress').textContent = formatNumber(tau / 1e6, 1); // Convert to MPa

    const statusDiv = document.getElementById('springStatus');

    // Check stress limits (simplified)
    const allowableStress = {
        musicWire: 800e6,
        stainlessSteel: 600e6,
        oilTempered: 700e6
    };

    const tau_allowable = allowableStress[material];
    if (tau < tau_allowable * 0.5) {
        statusDiv.innerHTML = '<div class="calculator-success">✓ Stress is well within limits</div>';
    } else if (tau < tau_allowable * 0.8) {
        statusDiv.innerHTML = '<div class="calculator-warning">⚠ Stress is moderate - consider larger wire diameter</div>';
    } else if (tau < tau_allowable) {
        statusDiv.innerHTML = '<div class="calculator-warning">⚠ Stress is high - increase wire diameter or reduce load</div>';
    } else {
        statusDiv.innerHTML = '<div class="calculator-error">✗ Stress exceeds allowable limit - redesign required</div>';
    }

    const resultDiv = document.getElementById('springResult');
    resultDiv.style.display = 'block';

    // Add design recommendations
    if (C < 6) {
        showWarning(resultDiv, 'Low spring index may cause manufacturing difficulties');
    } else if (C > 10) {
        showWarning(resultDiv, 'High spring index may cause buckling');
    }
}

function resetSpring() {
    document.getElementById('springLoad').value = '';
    document.getElementById('springDeflection').value = '';
    document.getElementById('wireDiameter').value = '2';
    document.getElementById('springIndex').value = '8';
    document.getElementById('springResult').style.display = 'none';
}