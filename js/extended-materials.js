// Massive Materials Database Extension

const extendedMaterialsDatabase = [
    // STEELS
    {
        name: 'AISI 1018 Steel',
        category: 'steel',
        subcategory: 'carbon_steel',
        density: 7870,
        yieldStrength: 370,
        ultimateStrength: 440,
        youngsModulus: 205,
        shearModulus: 79,
        poissonsRatio: 0.29,
        thermalConductivity: 51.9,
        thermalExpansion: 11.7e-6,
        hardness: 126,
        fatigueLimit: 220,
        creepResistance: 'low',
        corrosionResistance: 'poor',
        weldability: 'excellent',
        machinability: 'good',
        cost: 'low',
        applications: 'General purpose, shafts, pins, bolts',
        heatTreatment: 'can be hardened',
        forms: ['bar', 'sheet', 'plate', 'wire'],
        standards: ['ASTM A108', 'SAE J403'],
        suppliers: ['Nucor', 'US Steel', 'ArcelorMittal']
    },
    {
        name: 'AISI 1045 Steel',
        category: 'steel',
        subcategory: 'carbon_steel',
        density: 7850,
        yieldStrength: 450,
        ultimateStrength: 655,
        youngsModulus: 205,
        shearModulus: 79,
        poissonsRatio: 0.29,
        thermalConductivity: 49.8,
        thermalExpansion: 11.7e-6,
        hardness: 163,
        fatigueLimit: 330,
        creepResistance: 'low',
        corrosionResistance: 'poor',
        weldability: 'fair',
        machinability: 'good',
        cost: 'low',
        applications: 'Gears, shafts, machinery parts, crankshafts',
        heatTreatment: 'can be hardened and tempered',
        forms: ['bar', 'forgings'],
        standards: ['ASTM A108', 'SAE J403'],
        suppliers: ['Nucor', 'US Steel']
    },
    {
        name: 'AISI 4140 Steel',
        category: 'steel',
        subcategory: 'alloy_steel',
        density: 7850,
        yieldStrength: 655,
        ultimateStrength: 1020,
        youngsModulus: 205,
        shearModulus: 79,
        poissonsRatio: 0.29,
        thermalConductivity: 42.7,
        thermalExpansion: 12.3e-6,
        hardness: 197,
        fatigueLimit: 480,
        creepResistance: 'moderate',
        corrosionResistance: 'poor',
        weldability: 'fair',
        machinability: 'good',
        cost: 'medium',
        applications: 'High-strength applications, crankshafts, gears, axles',
        heatTreatment: 'excellent hardenability',
        forms: ['bar', 'forgings', 'tubing'],
        standards: ['ASTM A829', 'SAE J404'],
        suppliers: ['Timken', 'Carpenter Technology']
    },
    {
        name: 'AISI 4340 Steel',
        category: 'steel',
        subcategory: 'alloy_steel',
        density: 7850,
        yieldStrength: 785,
        ultimateStrength: 1240,
        youngsModulus: 205,
        shearModulus: 79,
        poissonsRatio: 0.29,
        thermalConductivity: 44.5,
        thermalExpansion: 12.3e-6,
        hardness: 285,
        fatigueLimit: 620,
        creepResistance: 'moderate',
        corrosionResistance: 'poor',
        weldability: 'poor',
        machinability: 'fair',
        cost: 'high',
        applications: 'Aircraft landing gear, crankshafts, high-strength parts',
        heatTreatment: 'excellent through-hardening',
        forms: ['bar', 'forgings', 'plate'],
        standards: ['AMS 6414', 'SAE J404'],
        suppliers: ['Carpenter Technology', 'Timken']
    },
    {
        name: 'Stainless Steel 304',
        category: 'steel',
        subcategory: 'stainless_steel',
        density: 8000,
        yieldStrength: 290,
        ultimateStrength: 580,
        youngsModulus: 193,
        shearModulus: 77,
        poissonsRatio: 0.30,
        thermalConductivity: 16.2,
        thermalExpansion: 17.2e-6,
        hardness: 201,
        fatigueLimit: 240,
        creepResistance: 'good',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'fair',
        cost: 'medium',
        applications: 'Food processing, chemical equipment, architectural',
        heatTreatment: 'non-hardenable by heat treatment',
        forms: ['sheet', 'plate', 'bar', 'tube', 'wire'],
        standards: ['ASTM A240', 'AMS 5513'],
        suppliers: ['Outokumpu', 'Acerinox', 'North American Stainless']
    },
    {
        name: 'Stainless Steel 316',
        category: 'steel',
        subcategory: 'stainless_steel',
        density: 8000,
        yieldStrength: 290,
        ultimateStrength: 580,
        youngsModulus: 193,
        shearModulus: 77,
        poissonsRatio: 0.30,
        thermalConductivity: 16.3,
        thermalExpansion: 16.0e-6,
        hardness: 217,
        fatigueLimit: 240,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'fair',
        cost: 'high',
        applications: 'Marine environments, chemical processing, medical',
        heatTreatment: 'non-hardenable by heat treatment',
        forms: ['sheet', 'plate', 'bar', 'tube', 'wire'],
        standards: ['ASTM A240', 'AMS 5524'],
        suppliers: ['Outokumpu', 'Acerinox', 'North American Stainless']
    },
    {
        name: 'Stainless Steel 17-4 PH',
        category: 'steel',
        subcategory: 'precipitation_hardening',
        density: 7800,
        yieldStrength: 1100,
        ultimateStrength: 1310,
        youngsModulus: 196,
        shearModulus: 77,
        poissonsRatio: 0.27,
        thermalConductivity: 17.9,
        thermalExpansion: 10.8e-6,
        hardness: 375,
        fatigueLimit: 550,
        creepResistance: 'good',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'good',
        cost: 'high',
        applications: 'Aerospace, chemical processing, nuclear',
        heatTreatment: 'precipitation hardening',
        forms: ['bar', 'plate', 'forgings'],
        standards: ['ASTM A564', 'AMS 5604'],
        suppliers: ['Carpenter Technology', 'Allegheny Technologies']
    },

    // ALUMINUM ALLOYS
    {
        name: '6061-T6 Aluminum',
        category: 'aluminum',
        subcategory: '6000_series',
        density: 2700,
        yieldStrength: 276,
        ultimateStrength: 310,
        youngsModulus: 68.9,
        shearModulus: 26,
        poissonsRatio: 0.33,
        thermalConductivity: 167,
        thermalExpansion: 23.6e-6,
        hardness: 95,
        fatigueLimit: 97,
        creepResistance: 'moderate',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'good',
        cost: 'medium',
        applications: 'Structural components, marine fittings, automotive',
        heatTreatment: 'heat treatable',
        forms: ['extrusion', 'sheet', 'plate', 'bar', 'tube'],
        standards: ['ASTM B221', 'AMS 4117'],
        suppliers: ['Alcoa', 'Constellium', 'Norsk Hydro']
    },
    {
        name: '7075-T6 Aluminum',
        category: 'aluminum',
        subcategory: '7000_series',
        density: 2810,
        yieldStrength: 503,
        ultimateStrength: 572,
        youngsModulus: 71.7,
        shearModulus: 27,
        poissonsRatio: 0.33,
        thermalConductivity: 130,
        thermalExpansion: 23.6e-6,
        hardness: 150,
        fatigueLimit: 160,
        creepResistance: 'good',
        corrosionResistance: 'fair',
        weldability: 'poor',
        machinability: 'good',
        cost: 'high',
        applications: 'Aerospace, high-strength applications, aircraft structures',
        heatTreatment: 'heat treatable',
        forms: ['sheet', 'plate', 'bar', 'extrusion', 'forgings'],
        standards: ['ASTM B209', 'AMS 4045'],
        suppliers: ['Alcoa', 'Constellium', 'Kaiser Aluminum']
    },
    {
        name: '2024-T3 Aluminum',
        category: 'aluminum',
        subcategory: '2000_series',
        density: 2780,
        yieldStrength: 345,
        ultimateStrength: 470,
        youngsModulus: 73.1,
        shearModulus: 28,
        poissonsRatio: 0.33,
        thermalConductivity: 120,
        thermalExpansion: 22.9e-6,
        hardness: 120,
        fatigueLimit: 140,
        creepResistance: 'moderate',
        corrosionResistance: 'poor',
        weldability: 'poor',
        machinability: 'good',
        cost: 'high',
        applications: 'Aircraft structures, wing skins, fuselage',
        heatTreatment: 'heat treatable',
        forms: ['sheet', 'plate', 'bar', 'extrusion'],
        standards: ['ASTM B209', 'AMS 4037'],
        suppliers: ['Alcoa', 'Constellium']
    },
    {
        name: '5052-H32 Aluminum',
        category: 'aluminum',
        subcategory: '5000_series',
        density: 2680,
        yieldStrength: 193,
        ultimateStrength: 228,
        youngsModulus: 70,
        shearModulus: 26,
        poissonsRatio: 0.33,
        thermalConductivity: 138,
        thermalExpansion: 23.8e-6,
        hardness: 68,
        fatigueLimit: 110,
        creepResistance: 'moderate',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'good',
        cost: 'low',
        applications: 'Marine applications, pressure vessels, fuel tanks',
        heatTreatment: 'non-heat treatable',
        forms: ['sheet', 'plate', 'bar'],
        standards: ['ASTM B209', 'AMS 4027'],
        suppliers: ['Alcoa', 'Norsk Hydro']
    },

    // TITANIUM ALLOYS
    {
        name: 'Ti-6Al-4V Titanium',
        category: 'titanium',
        subcategory: 'alpha_beta',
        density: 4430,
        yieldStrength: 880,
        ultimateStrength: 950,
        youngsModulus: 113.8,
        shearModulus: 44,
        poissonsRatio: 0.34,
        thermalConductivity: 6.7,
        thermalExpansion: 8.6e-6,
        hardness: 36,
        fatigueLimit: 510,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'poor',
        cost: 'very_high',
        applications: 'Aerospace, medical implants, high-performance',
        heatTreatment: 'heat treatable',
        forms: ['bar', 'sheet', 'plate', 'forgings', 'castings'],
        standards: ['ASTM B265', 'AMS 4911'],
        suppliers: ['Timet', 'VSMPO-AVISMA', 'RTI International']
    },
    {
        name: 'Commercially Pure Titanium',
        category: 'titanium',
        subcategory: 'alpha',
        density: 4500,
        yieldStrength: 170,
        ultimateStrength: 240,
        youngsModulus: 105,
        shearModulus: 41,
        poissonsRatio: 0.34,
        thermalConductivity: 21.9,
        thermalExpansion: 8.4e-6,
        hardness: 80,
        fatigueLimit: 130,
        creepResistance: 'good',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'fair',
        cost: 'high',
        applications: 'Chemical processing, marine applications, medical',
        heatTreatment: 'non-heat treatable',
        forms: ['sheet', 'plate', 'bar', 'tube', 'wire'],
        standards: ['ASTM B265', 'AMS 4900'],
        suppliers: ['Timet', 'VSMPO-AVISMA']
    },
    {
        name: 'Ti-6Al-7Nb Titanium',
        category: 'titanium',
        subcategory: 'alpha_beta',
        density: 4480,
        yieldStrength: 900,
        ultimateStrength: 1000,
        youngsModulus: 110,
        shearModulus: 43,
        poissonsRatio: 0.34,
        thermalConductivity: 7.0,
        thermalExpansion: 8.5e-6,
        hardness: 35,
        fatigueLimit: 520,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'poor',
        cost: 'very_high',
        applications: 'Medical implants, biocompatible applications',
        heatTreatment: 'heat treatable',
        forms: ['bar', 'forgings'],
        standards: ['ASTM F1295', 'ISO 5832-11'],
        suppliers: ['Timet', 'VSMPO-AVISMA']
    },

    // COPPER ALLOYS
    {
        name: 'C110 Copper',
        category: 'copper',
        subcategory: 'pure_copper',
        density: 8960,
        yieldStrength: 70,
        ultimateStrength: 220,
        youngsModulus: 110,
        shearModulus: 48,
        poissonsRatio: 0.34,
        thermalConductivity: 401,
        thermalExpansion: 16.5e-6,
        hardness: 40,
        fatigueLimit: 70,
        creepResistance: 'moderate',
        corrosionResistance: 'good',
        weldability: 'excellent',
        machinability: 'good',
        cost: 'medium',
        applications: 'Electrical conductors, heat exchangers, plumbing',
        heatTreatment: 'work hardenable',
        forms: ['bar', 'sheet', 'plate', 'tube', 'wire'],
        standards: ['ASTM B152', 'AMS 4500'],
        suppliers: ['KME', 'Mueller Industries', 'Copperweld']
    },
    {
        name: 'Brass C36000',
        category: 'copper',
        subcategory: 'brass',
        density: 8500,
        yieldStrength: 124,
        ultimateStrength: 300,
        youngsModulus: 97,
        shearModulus: 37,
        poissonsRatio: 0.34,
        thermalConductivity: 109,
        thermalExpansion: 20.5e-6,
        hardness: 80,
        fatigueLimit: 110,
        creepResistance: 'moderate',
        corrosionResistance: 'good',
        weldability: 'fair',
        machinability: 'excellent',
        cost: 'low',
        applications: 'Gears, valves, fittings, hardware',
        heatTreatment: 'work hardenable',
        forms: ['bar', 'rod', 'wire'],
        standards: ['ASTM B16', 'SAE J461'],
        suppliers: ['KME', 'Mueller Industries']
    },
    {
        name: 'Bronze C93200',
        category: 'copper',
        subcategory: 'bronze',
        density: 8800,
        yieldStrength: 124,
        ultimateStrength: 241,
        youngsModulus: 103,
        shearModulus: 39,
        poissonsRatio: 0.34,
        thermalConductivity: 41,
        thermalExpansion: 18.0e-6,
        hardness: 65,
        fatigueLimit: 90,
        creepResistance: 'good',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'good',
        cost: 'medium',
        applications: 'Bearings, bushings, marine hardware',
        heatTreatment: 'non-heat treatable',
        forms: ['bar', 'bushings', 'castings'],
        standards: ['ASTM B505', 'SAE J461'],
        suppliers: ['KME', 'National Bronze']
    },

    // PLASTICS
    {
        name: 'ABS Plastic',
        category: 'plastics',
        subcategory: 'thermoplastic',
        density: 1050,
        yieldStrength: 40,
        ultimateStrength: 45,
        youngsModulus: 2.3,
        shearModulus: 0.9,
        poissonsRatio: 0.35,
        thermalConductivity: 0.19,
        thermalExpansion: 95e-6,
        hardness: 105,
        fatigueLimit: 15,
        creepResistance: 'poor',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'excellent',
        cost: 'low',
        applications: 'Automotive parts, consumer goods, enclosures',
        heatTreatment: 'non-applicable',
        forms: ['sheet', 'rod', 'tube', 'molded'],
        standards: ['ASTM D638', 'ISO 527'],
        suppliers: ['SABIC', 'INEOS Styrolution', 'Trinseo']
    },
    {
        name: 'Nylon 6/6',
        category: 'plastics',
        subcategory: 'thermoplastic',
        density: 1150,
        yieldStrength: 75,
        ultimateStrength: 85,
        youngsModulus: 2.8,
        shearModulus: 1.1,
        poissonsRatio: 0.39,
        thermalConductivity: 0.25,
        thermalExpansion: 80e-6,
        hardness: 118,
        fatigueLimit: 25,
        creepResistance: 'moderate',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'excellent',
        cost: 'low',
        applications: 'Gears, bearings, mechanical parts, fasteners',
        heatTreatment: 'non-applicable',
        forms: ['sheet', 'rod', 'tube', 'molded'],
        standards: ['ASTM D638', 'ISO 527'],
        suppliers: ['DuPont', 'BASF', 'Lanxess']
    },
    {
        name: 'Polycarbonate',
        category: 'plastics',
        subcategory: 'thermoplastic',
        density: 1200,
        yieldStrength: 65,
        ultimateStrength: 70,
        youngsModulus: 2.4,
        shearModulus: 0.9,
        poissonsRatio: 0.37,
        thermalConductivity: 0.2,
        thermalExpansion: 65e-6,
        hardness: 115,
        fatigueLimit: 20,
        creepResistance: 'moderate',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'excellent',
        cost: 'medium',
        applications: 'Safety equipment, electronic components, optical',
        heatTreatment: 'non-applicable',
        forms: ['sheet', 'rod', 'tube', 'molded'],
        standards: ['ASTM D638', 'ISO 527'],
        suppliers: ['SABIC', 'Covestro', 'Trinseo']
    },
    {
        name: 'PTFE (Teflon)',
        category: 'plastics',
        subcategory: 'thermoplastic',
        density: 2200,
        yieldStrength: 20,
        ultimateStrength: 25,
        youngsModulus: 0.5,
        shearModulus: 0.2,
        poissonsRatio: 0.46,
        thermalConductivity: 0.25,
        thermalExpansion: 135e-6,
        hardness: 65,
        fatigueLimit: 5,
        creepResistance: 'poor',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'good',
        cost: 'high',
        applications: 'Seals, gaskets, bearings, chemical resistance',
        heatTreatment: 'non-applicable',
        forms: ['sheet', 'rod', 'tube', 'tape'],
        standards: ['ASTM D638', 'ISO 527'],
        suppliers: ['Chemours', 'Daikin', 'Solvay']
    },

    // COMPOSITES
    {
        name: 'Carbon Fiber Composite',
        category: 'composites',
        subcategory: 'carbon_fiber',
        density: 1600,
        yieldStrength: 600,
        ultimateStrength: 900,
        youngsModulus: 70,
        shearModulus: 5,
        poissonsRatio: 0.07,
        thermalConductivity: 10,
        thermalExpansion: -0.5e-6,
        hardness: 40,
        fatigueLimit: 400,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'non-applicable',
        machinability: 'fair',
        cost: 'very_high',
        applications: 'Aerospace, sporting goods, automotive, high-performance',
        heatTreatment: 'non-applicable',
        forms: ['sheet', 'prepreg', 'fabric', 'tube'],
        standards: ['ASTM D3039', 'ISO 527'],
        suppliers: ['Toray', 'Hexcel', 'SGL Carbon']
    },
    {
        name: 'Glass Fiber Composite',
        category: 'composites',
        subcategory: 'glass_fiber',
        density: 2000,
        yieldStrength: 200,
        ultimateStrength: 340,
        youngsModulus: 25,
        shearModulus: 4,
        poissonsRatio: 0.25,
        thermalConductivity: 0.3,
        thermalExpansion: 15e-6,
        hardness: 35,
        fatigueLimit: 120,
        creepResistance: 'good',
        corrosionResistance: 'excellent',
        weldability: 'non-applicable',
        machinability: 'good',
        cost: 'medium',
        applications: 'Boats, tanks, pipes, automotive panels',
        heatTreatment: 'non-applicable',
        forms: ['sheet', 'prepreg', 'fabric', 'roving'],
        standards: ['ASTM D3039', 'ISO 527'],
        suppliers: ['Owens Corning', 'Johns Manville', 'Saint-Gobain']
    },
    {
        name: 'Aramid Fiber Composite',
        category: 'composites',
        subcategory: 'aramid_fiber',
        density: 1400,
        yieldStrength: 3600,
        ultimateStrength: 3800,
        youngsModulus: 130,
        shearModulus: 3,
        poissonsRatio: 0.35,
        thermalConductivity: 0.04,
        thermalExpansion: -2e-6,
        hardness: 30,
        fatigueLimit: 2000,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'non-applicable',
        machinability: 'poor',
        cost: 'very_high',
        applications: 'Ballistic protection, aerospace, ropes, cables',
        heatTreatment: 'non-applicable',
        forms: ['fabric', 'prepreg', 'yarn'],
        standards: ['ASTM D7264', 'ISO 527'],
        suppliers: ['DuPont', 'Teijin', 'Kolon Industries']
    },

    // SUPERALLOYS
    {
        name: 'Inconel 718',
        category: 'superalloys',
        subcategory: 'nickel_based',
        density: 8190,
        yieldStrength: 1100,
        ultimateStrength: 1400,
        youngsModulus: 200,
        shearModulus: 77,
        poissonsRatio: 0.29,
        thermalConductivity: 11.4,
        thermalExpansion: 13.0e-6,
        hardness: 40,
        fatigueLimit: 550,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'good',
        machinability: 'fair',
        cost: 'very_high',
        applications: 'Gas turbines, aerospace, nuclear, high-temperature',
        heatTreatment: 'precipitation hardening',
        forms: ['bar', 'sheet', 'plate', 'forgings', 'castings'],
        standards: ['ASTM B637', 'AMS 5596'],
        suppliers: ['Special Metals', 'Haynes International', 'Carpenter Technology']
    },
    {
        name: 'Hastelloy X',
        category: 'superalloys',
        subcategory: 'nickel_based',
        density: 8220,
        yieldStrength: 380,
        ultimateStrength: 780,
        youngsModulus: 207,
        shearModulus: 80,
        poissonsRatio: 0.31,
        thermalConductivity: 9.1,
        thermalExpansion: 12.4e-6,
        hardness: 25,
        fatigueLimit: 300,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'fair',
        cost: 'very_high',
        applications: 'Gas turbine engines, industrial furnaces, chemical processing',
        heatTreatment: 'solid solution strengthened',
        forms: ['sheet', 'plate', 'bar', 'tube', 'wire'],
        standards: ['ASTM B435', 'AMS 5536'],
        suppliers: ['Haynes International', 'Special Metals']
    },

    // CERAMICS
    {
        name: 'Alumina (Al2O3)',
        category: 'ceramics',
        subcategory: 'oxide_ceramic',
        density: 3950,
        yieldStrength: 300,
        ultimateStrength: 400,
        youngsModulus: 380,
        shearModulus: 150,
        poissonsRatio: 0.22,
        thermalConductivity: 30,
        thermalExpansion: 8.1e-6,
        hardness: 1500,
        fatigueLimit: 150,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'non-applicable',
        machinability: 'poor',
        cost: 'high',
        applications: 'Electrical insulators, cutting tools, wear parts',
        heatTreatment: 'non-applicable',
        forms: ['tube', 'rod', 'plate', 'custom'],
        standards: ['ASTM C1161', 'ISO 6474'],
        suppliers: ['CoorsTek', 'CeramTec', 'Kyocera']
    },
    {
        name: 'Silicon Carbide',
        category: 'ceramics',
        subcategory: 'non_oxide_ceramic',
        density: 3100,
        yieldStrength: 400,
        ultimateStrength: 550,
        youngsModulus: 410,
        shearModulus: 160,
        poissonsRatio: 0.19,
        thermalConductivity: 120,
        thermalExpansion: 4.0e-6,
        hardness: 2500,
        fatigueLimit: 200,
        creepResistance: 'excellent',
        corrosionResistance: 'excellent',
        weldability: 'non-applicable',
        machinability: 'very_poor',
        cost: 'very_high',
        applications: 'High-temperature applications, abrasives, armor',
        heatTreatment: 'non-applicable',
        forms: ['tube', 'plate', 'powder', 'custom'],
        standards: ['ASTM C1161', 'ISO 12737'],
        suppliers: ['Saint-Gobain', 'CoorsTek', 'CeramTec']
    },

    // MAGNESIUM ALLOYS
    {
        name: 'AZ31B Magnesium',
        category: 'magnesium',
        subcategory: 'wrought',
        density: 1770,
        yieldStrength: 160,
        ultimateStrength: 240,
        youngsModulus: 45,
        shearModulus: 17,
        poissonsRatio: 0.35,
        thermalConductivity: 76.9,
        thermalExpansion: 26e-6,
        hardness: 60,
        fatigueLimit: 85,
        creepResistance: 'poor',
        corrosionResistance: 'poor',
        weldability: 'good',
        machinability: 'excellent',
        cost: 'medium',
        applications: 'Aerospace, automotive, lightweight structures',
        heatTreatment: 'non-heat treatable',
        forms: ['sheet', 'plate', 'extrusion'],
        standards: ['ASTM B91', 'AMS 4376'],
        suppliers: ['Magnesium Elektron', 'Allite', 'Dead Sea Magnesium']
    },
    {
        name: 'WE43 Magnesium',
        category: 'magnesium',
        subcategory: 'wrought',
        density: 1830,
        yieldStrength: 200,
        ultimateStrength: 280,
        youngsModulus: 45,
        shearModulus: 17,
        poissonsRatio: 0.35,
        thermalConductivity: 51,
        thermalExpansion: 25.2e-6,
        hardness: 75,
        fatigueLimit: 110,
        creepResistance: 'good',
        corrosionResistance: 'good',
        weldability: 'fair',
        machinability: 'excellent',
        cost: 'high',
        applications: 'Aerospace, high-temperature, corrosion-resistant',
        heatTreatment: 'heat treatable',
        forms: ['extrusion', 'forgings'],
        standards: ['ASTM B91', 'AMS 4427'],
        suppliers: ['Magnesium Elektron', 'Allite']
    },

    // ZINC ALLOYS
    {
        name: 'Zamak 3',
        category: 'zinc',
        subcategory: 'die_casting',
        density: 6600,
        yieldStrength: 275,
        ultimateStrength: 320,
        youngsModulus: 82,
        shearModulus: 31,
        poissonsRatio: 0.33,
        thermalConductivity: 113,
        thermalExpansion: 27.4e-6,
        hardness: 82,
        fatigueLimit: 50,
        creepResistance: 'poor',
        corrosionResistance: 'good',
        weldability: 'non-applicable',
        machinability: 'excellent',
        cost: 'low',
        applications: 'Die castings, automotive parts, hardware',
        heatTreatment: 'non-applicable',
        forms: ['die_castings', 'ingots'],
        standards: ['ASTM B86', 'ASTM Z41'],
        suppliers: ['Eastern Alloys', 'Rheinzink', 'Grillo']
    },

    // SPECIAL ALLOYS
    {
        name: 'Beryllium Copper',
        category: 'special_alloys',
        subcategory: 'copper_based',
        density: 8250,
        yieldStrength: 1100,
        ultimateStrength: 1300,
        youngsModulus: 128,
        shearModulus: 50,
        poissonsRatio: 0.30,
        thermalConductivity: 260,
        thermalExpansion: 17.0e-6,
        hardness: 380,
        fatigueLimit: 350,
        creepResistance: 'good',
        corrosionResistance: 'good',
        weldability: 'fair',
        machinability: 'good',
        cost: 'very_high',
        applications: 'Non-sparking tools, springs, electrical contacts',
        heatTreatment: 'precipitation hardening',
        forms: ['bar', 'sheet', 'wire', 'strip'],
        standards: ['ASTM B194', 'AMS 4533'],
        suppliers: ['Materion', 'NGK Metals', 'KME']
    },
    {
        name: 'Nitronic 60',
        category: 'special_alloys',
        subcategory: 'stainless_steel',
        density: 7900,
        yieldStrength: 415,
        ultimateStrength: 655,
        youngsModulus: 200,
        shearModulus: 77,
        poissonsRatio: 0.30,
        thermalConductivity: 16.5,
        thermalExpansion: 15.5e-6,
        hardness: 220,
        fatigueLimit: 310,
        creepResistance: 'good',
        corrosionResistance: 'excellent',
        weldability: 'excellent',
        machinability: 'good',
        cost: 'high',
        applications: 'High-temperature, galling resistance, wear applications',
        heatTreatment: 'non-heat treatable',
        forms: ['bar', 'sheet', 'plate', 'wire'],
        standards: ['ASTM A193', 'AMS 5848'],
        suppliers: ['High Performance Alloys', 'Special Metals']
    }
];

// Material property ranges for filtering
const materialPropertyRanges = {
    density: { min: 1000, max: 10000, unit: 'kg/m³' },
    yieldStrength: { min: 10, max: 2000, unit: 'MPa' },
    ultimateStrength: { min: 20, max: 4000, unit: 'MPa' },
    youngsModulus: { min: 1, max: 500, unit: 'GPa' },
    thermalConductivity: { min: 0.1, max: 500, unit: 'W/m·K' },
    hardness: { min: 10, max: 3000, unit: 'HV' },
    fatigueLimit: { min: 5, max: 2000, unit: 'MPa' }
};

// Material categories and subcategories
const materialCategories = {
    steel: ['carbon_steel', 'alloy_steel', 'stainless_steel', 'precipitation_hardening', 'tool_steel'],
    aluminum: ['1000_series', '2000_series', '3000_series', '5000_series', '6000_series', '7000_series'],
    titanium: ['alpha', 'alpha_beta', 'beta'],
    copper: ['pure_copper', 'brass', 'bronze', 'copper_nickel'],
    plastics: ['thermoplastic', 'thermoset', 'elastomer'],
    composites: ['carbon_fiber', 'glass_fiber', 'aramid_fiber', 'natural_fiber'],
    superalloys: ['nickel_based', 'cobalt_based', 'iron_based'],
    ceramics: ['oxide_ceramic', 'non_oxide_ceramic', 'glass_ceramic'],
    magnesium: ['wrought', 'cast'],
    zinc: ['die_casting', 'wrought'],
    special_alloys: ['copper_based', 'nickel_based', 'iron_based']
};

// Advanced material search
function searchMaterialsAdvanced(criteria) {
    return extendedMaterialsDatabase.filter(material => {
        let matches = true;

        // Category filter
        if (criteria.category && material.category !== criteria.category) {
            matches = false;
        }

        // Subcategory filter
        if (criteria.subcategory && material.subcategory !== criteria.subcategory) {
            matches = false;
        }

        // Property range filters
        if (criteria.minDensity && material.density < criteria.minDensity) matches = false;
        if (criteria.maxDensity && material.density > criteria.maxDensity) matches = false;
        if (criteria.minYieldStrength && material.yieldStrength < criteria.minYieldStrength) matches = false;
        if (criteria.maxYieldStrength && material.yieldStrength > criteria.maxYieldStrength) matches = false;
        if (criteria.minYoungsModulus && material.youngsModulus < criteria.minYoungsModulus) matches = false;
        if (criteria.maxYoungsModulus && material.youngsModulus > criteria.maxYoungsModulus) matches = false;
        if (criteria.minThermalConductivity && material.thermalConductivity < criteria.minThermalConductivity) matches = false;
        if (criteria.maxThermalConductivity && material.thermalConductivity > criteria.maxThermalConductivity) matches = false;

        // Property quality filters
        if (criteria.corrosionResistance && material.corrosionResistance !== criteria.corrosionResistance) matches = false;
        if (criteria.weldability && material.weldability !== criteria.weldability) matches = false;
        if (criteria.machinability && material.machinability !== criteria.machinability) matches = false;

        // Cost filter
        if (criteria.maxCost) {
            const costLevels = { 'low': 1, 'medium': 2, 'high': 3, 'very_high': 4 };
            const materialCost = costLevels[material.cost] || 2;
            const maxCostLevel = costLevels[criteria.maxCost] || 4;
            if (materialCost > maxCostLevel) matches = false;
        }

        // Text search
        if (criteria.searchTerm) {
            const term = criteria.searchTerm.toLowerCase();
            const searchableText = `${material.name} ${material.applications} ${material.category} ${material.subcategory}`.toLowerCase();
            if (!searchableText.includes(term)) matches = false;
        }

        return matches;
    });
}

// Material comparison with detailed analysis
function compareMaterialsDetailed(materialNames) {
    const materials = materialNames.map(name =>
        extendedMaterialsDatabase.find(m => m.name.toLowerCase() === name.toLowerCase())
    ).filter(Boolean);

    if (materials.length === 0) return [];

    return materials.map(material => ({
        ...material,
        strengthToWeight: (material.yieldStrength * 1e6) / material.density,
        stiffnessToWeight: (material.youngsModulus * 1e9) / material.density,
        thermalEfficiency: material.thermalConductivity / material.density,
        overallRating: calculateOverallRating(material)
    })).sort((a, b) => b.overallRating - a.overallRating);
}

function calculateOverallRating(material) {
    let rating = 0;

    // Strength rating (0-25)
    rating += Math.min(25, material.yieldStrength / 40);

    // Stiffness rating (0-20)
    rating += Math.min(20, material.youngsModulus / 20);

    // Lightweight rating (0-15)
    rating += Math.max(0, 15 - material.density / 1000);

    // Thermal conductivity rating (0-10)
    rating += Math.min(10, material.thermalConductivity / 50);

    // Fatigue resistance rating (0-15)
    rating += Math.min(15, material.fatigueLimit / 50);

    // Corrosion resistance rating (0-10)
    const corrosionRatings = { 'poor': 2, 'fair': 5, 'good': 8, 'excellent': 10 };
    rating += corrosionRatings[material.corrosionResistance] || 5;

    // Machinability rating (0-5)
    const machinabilityRatings = { 'very_poor': 1, 'poor': 2, 'fair': 3, 'good': 4, 'excellent': 5 };
    rating += machinabilityRatings[material.machinability] || 3;

    return rating;
}

// Export functions
window.extendedMaterialsDatabase = extendedMaterialsDatabase;
window.materialPropertyRanges = materialPropertyRanges;
window.materialCategories = materialCategories;
window.searchMaterialsAdvanced = searchMaterialsAdvanced;
window.compareMaterialsDetailed = compareMaterialsDetailed;