// Functionality to switch between tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName("tab-link")[0].click(); // Automatically open the first tab
});

// Standard Calculator Logic
let standardInputString = "";
let scientificInputString = "";

function standardInput(value) {
    standardInputString += value;
    document.getElementById("standard-display").innerText = standardInputString;
}

function standardCalculate(operator) {
    if (operator === '=') {
        try {
            standardInputString = eval(standardInputString).toString();
            document.getElementById("standard-display").innerText = standardInputString;
            standardInputString = ""; // Reset input string after calculation
        } catch (e) {
            document.getElementById("standard-display").innerText = "Error";
            standardInputString = ""; // Reset input string after error
        }
    } else {
        standardInputString += operator;
        document.getElementById("standard-display").innerText = standardInputString;
    }
}

// Scientific Calculator Logic
function scientificInput(value) {
    scientificInputString += value;
    document.getElementById("scientific-display").innerText = scientificInputString;
}

function scientificCalculate() {
    if (scientificInputString) {
        try {
            scientificInputString = math.evaluate(scientificInputString).toString();
            document.getElementById("scientific-display").innerText = scientificInputString;
            scientificInputString = ""; // Reset input string after calculation
        } catch (error) {
            document.getElementById("scientific-display").innerText = "Error";
            scientificInputString = ""; // Reset input string after error
        }
    }
}

function clearDisplay(type) {
    if (type === 'standard') {
        standardInputString = "";
        document.getElementById("standard-display").innerText = "0";
    } else if (type === 'scientific') {
        scientificInputString = "";
        document.getElementById("scientific-display").innerText = "0";
    }
}

// Graph Plotting Functionality
function plotGraph() {
    const fnText = document.getElementById('functionInput').value;
    try {
        const trace = {
            x: [],
            y: [],
            type: 'scatter'
        };
        const range = math.range(-10, 10, 0.1).toArray();
        range.forEach(x => {
            trace.x.push(x);
            trace.y.push(math.evaluate(fnText.replace('x', `(${x})`)));
        });
        const layout = {
            title: `Graph of ${fnText}`,
            xaxis: { title: 'x' },
            yaxis: { title: 'y' }
        };
        Plotly.newPlot('plot', [trace], layout);
    } catch (error) {
        document.getElementById('plot').innerText = "Error plotting: " + error.message;
    }
}

// Matrix Operation Functionality
function matrixOperation(operation) {
    try {
        let matrixA = math.evaluate(document.getElementById('matrixA').value);
        let matrixB = math.evaluate(document.getElementById('matrixB').value);
        let result;
        switch (operation) {
            case 'add':
                result = math.add(matrixA, matrixB);
                break;
            case 'subtract':
                result = math.subtract(matrixA, matrixB);
                break;
            case 'multiply':
                result = math.multiply(matrixA, matrixB);
                break;
            case 'transposeA':
                result = math.transpose(matrixA);
                break;
            case 'detA':
                result = math.det(matrixA);
                break;
            case 'inverseA':
                result = math.inv(matrixA);
                break;
            default:
                throw new Error("Unsupported operation");
        }
        document.getElementById('matrixResult').innerText = math.format(result, {precision: 5});
    } catch (error) {
        document.getElementById('matrixResult').innerText = "Error: " + error.message;
    }
}

// Statistics Calculation Functionality
function calculateStats() {
    try {
        const data = document.getElementById('dataSet').value.split(',').map(Number);
        if (data.some(isNaN)) {
            throw new Error("Invalid data set. Please enter a list of numbers separated by commas.");
        }
        const mean = math.mean(data);
        const median = math.median(data);
        const variance = math.variance(data);
        const stdDev = math.std(data);
        const results = `Mean: ${mean}, Median: ${median}, Variance: ${variance}, Standard Deviation: ${stdDev}`;
        document.getElementById('statsResult').innerText = results;
    } catch (error) {
        document.getElementById('statsResult').innerText = "Error: " + error.message;
    }
}
