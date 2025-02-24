document.addEventListener('DOMContentLoaded', (event) => {
    loadResults();
    analyzeData();
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("Enkät");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const habitData = Object.fromEntries(formData.entries());

        // Add the habit to the habits list
        addHabit(habitData);
        form.reset();
    });

    const kategoriField = document.getElementById("Kategori");
    const dynamicFieldsContainer = document.getElementById("dynamic-fields");

    kategoriField.addEventListener("change", function() {
        const selectedCategory = kategoriField.value;
        dynamicFieldsContainer.innerHTML = "";

        if (selectedCategory === "Dryck") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Vilken Dryck">Vilken Dryck</label>
                <select id="Vilken Dryck" name="Vilken Dryck" required>
                    <option value="Vatten">Vatten</option>
                    <option value="Mjölk">Mjölk</option>
                    <option value="Saft">Saft</option>
                    <option value="Läsk">Läsk</option>
                    <option value="Energi dryck">Energi dryck</option>
                    <option value="Kaffe">Kaffe</option>
                    <option value="Te">Te</option>
                    <option value="Smoothie">Smoothie</option>
                    <option value="Övrigt">Övrigt</option>
                    <option value="Alkohol">Alkohol</option>
                </select>

                <label for="Antal Drycker">Antal Drycker</label>
                <select id="Antal Drycker" name="Antal Drycker" required>
                    ${[...Array(10)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                </select>

                <label for="Milliliter/st">Milliliter/st</label>
                <select id="Milliliter/st" name="Milliliter/st" required>
                    ${Array.from({length: 300}, (_, i) => (i + 1) * 30).map(val => `<option value="${val}">${val}</option>`).join('')}
                </select>
            `;
        } else if (selectedCategory === "Kost") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Typ av måltid">Typ av måltid</label>
                <select id="Typ av måltid" name="Typ av måltid" required>
                    <option value="Frukost">Frukost</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Middag">Middag</option>
                    <option value="Snack">Snack</option>
                </select>

                <label for="Måltid">Måltid</label>
                <input type="text" id="Måltid" name="Måltid" placeholder="Vad åt du för något?" required>

                <label for="Antal Portioner">Antal portioner:</label>
                <select id="Antal Portioner" name="Antal Portioner" required>
                    ${[...Array(10)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                </select>

                <label for="Kalorier">Kalorier</label>
                <input type="text" id="Kalorier" name="Kalorier" placeholder="Skriv in kalorier" required>
            `;
        } else if (selectedCategory === "Sömn") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Vilken typ av sömn">Vilken typ av sömn</label>
                <select id="Vilken typ av sömn" name="Vilken typ av sömn" required>
                    <option value="Power nap">Power nap</option>
                    <option value="Vanlig Sömn">Vanlig Sömn</option>
                </select>
                <input type="text" id="Sömn timmar" name="Sömn timmar" placeholder="Hur många timmar sov du?" required>
            `;
        } else if (selectedCategory === "Fotbollsträning") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Vad tränade du">Vad tränade du</label>
                <input type="text" id="Vad tränade du" name="Vad tränade du" placeholder="Vad var det för träning du gjorde?" required>

                <label for="Hur länge varade träningen">Hur länge varade träningen</label>
                <input type="text" id="Hur länge varade träningen" name="Hur länge varade träningen" placeholder="Hur många minuter tränade du?" required>
            `;
        } else if (selectedCategory === "Träning") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Kropps Område">Kropps Område</label>
                <select id="Kropps Område" name="Kropps Område" required>
                    <option value="">Välj kroppsområde</option>
                    <option value="Armar">Armar</option>
                    <option value="Ben">Ben</option>
                    <option value="Rygg">Rygg</option>
                    <option value="Axlar">Axlar</option>
                    <option value="Mage">Mage</option>
                    <option value="Bröst">Bröst</option>
                    <option value="Plyometrics">Plyometrics</option>
                    <option value="Helkroppspass">Helkroppspass</option>
                    <option value="Funktionspass">Funktionspass</option>
                    <option value="Övrigt">Övrigt</option>
                </select>

                <label for="Varaktighet totalt">Varaktighet totalt</label>
                <input type="text" id="Varaktighet totalt" name="Varaktighet totalt" placeholder="Hur många minuter tränade du området totalt" required>
                <label for="Brända Kalorier">Brända Kalorier</label>
                <input type="text" id="Brända Kalorier" name="Brända Kalorier" placeholder="Hur många kalorier brände du under träningen?" required>

                <label for="Antal reps">Antal Reps</label>
                <input type="text" id="Reps" name="Reps" placeholder="Hur många reps?" required>

                <label for="Antal sets">Antal sets</label>
                <input type="text" id="Sets" name="Sets" placeholder="Hur många sets?" required>
            `;
        } else if (selectedCategory === "Fysisk aktivitet") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Fysisk Aktivitet">Fysisk Aktivitet</label>
                <select id="Fysisk Aktivitet" name="Fysisk Aktivitet" required>
                    <option value="">Välj fysisk aktivitet</option>
                    <option value="Springa">Springa</option>
                    <option value="Jogga">Jogga</option>
                    <option value="Gång">Gång</option>
                </select>

                <label for="Antal Kilometer">Antal Kilometer</label>
                <input type="text" id="Antal Kilometer" name="Antal Kilometer" placeholder="Antal km" required>
            `;
        } else if (selectedCategory === "Kosttillskott") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Vilket kosttillskott">Vilket kosttillskott</label>
                <input type="text" id="VilketKosttillskott" name="Vilket kosttillskott" placeholder="Vilken typ av kosttillskott" required>
                <label for="Antal gram Kosttillskott">Antal gram Kosttillskott:</label>
                <input type="text" id="Kosttillskott" name="Gram kosttillskott" placeholder="Antal gram kosttillskott" required>
            `;
        } else if (selectedCategory === "Övrigt") {
            dynamicFieldsContainer.innerHTML = `
                <label for="Övrig Vana">Övrig vana</label>
                <input type="text" id="Övrig vana" name="Övrig vana" placeholder="Vilken övrig vana har du gjort" required>

                <label for="Vanans varaktighet">Vanans varaktighet</label>
                <input type="text" id="Vanans varaktighet" name="Vanans varaktighet" placeholder="Hur många minuter tog det totalt" required>
            `;
        }
    });
});

function addHabit(habitData) {
    const vanorContainer = document.getElementById("vanorContainer");
    const vanaInput = document.createElement("div");
    vanaInput.className = "vanaInput";

    const input = document.createElement("input");
    input.type = "text";
    input.value = `${habitData.Kategori}: ${habitData.Beskrivning}`;
    input.readOnly = true;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "removeVana";
    removeButton.textContent = "✖";
    removeButton.onclick = function() {
        vanorContainer.removeChild(vanaInput);
    };

    vanaInput.appendChild(input);
    vanaInput.appendChild(removeButton);
    vanorContainer.appendChild(vanaInput);
}

function addVana() {
    const vanorContainer = document.getElementById('vanorContainer');
    const newDiv = document.createElement('div');
    newDiv.className = 'vanaInput';
    newDiv.innerHTML = `
        <input type="text" class="vanaInputField" placeholder="Vilka vanor innan match">
        <button type="button" class="removeVana" onclick="removeVana(this)">✖</button>
    `;
    vanorContainer.appendChild(newDiv);
}

function removeVana(button) {
    const vanaInput = button.parentElement;
    vanaInput.remove();
}

function calculate() {
    const vanorInputs = document.querySelectorAll('#vanorContainer input');
    const vanor = Array.from(vanorInputs).map(input => input.value).join(', ');
    const toppHastighet = document.getElementById('toppHastighet').value;
    const matchNummer = getNextMatchNumber();

    if (vanor && toppHastighet) {
        const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const cell0 = newRow.insertCell(0);
        const cell1 = newRow.insertCell(1);
        const cell2 = newRow.insertCell(2);
        const cell3 = newRow.insertCell(3);

        cell0.innerHTML = '<input type="checkbox">';
        cell1.textContent = matchNummer;
        cell2.textContent = toppHastighet;
        cell3.textContent = vanor;

        saveResult(matchNummer, toppHastighet, vanor);
        sortTableBySpeed();
        analyzeData();

        // Reset habit input fields to a single input
        const vanorContainer = document.getElementById('vanorContainer');
        vanorContainer.innerHTML = '';
        addVana();

        document.getElementById('toppHastighet').value = '';
    } else {
        alert('Vänligen fyll i alla fält.');
    }
}

function getNextMatchNumber() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    return results.length + 1;
}

function saveResult(matchNummer, toppHastighet, vanor) {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({ matchNummer, toppHastighet, vanor });
    localStorage.setItem('results', JSON.stringify(results));
}

function loadResults() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    results.forEach(result => {
        const newRow = table.insertRow();

        const cell0 = newRow.insertCell(0);
        const cell1 = newRow.insertCell(1);
        const cell2 = newRow.insertCell(2);
        const cell3 = newRow.insertCell(3);

        cell0.innerHTML = '<input type="checkbox">';
        cell1.textContent = result.matchNummer;
        cell2.textContent = result.toppHastighet;
        cell3.textContent = result.vanor;
    });
    sortTableBySpeed();
}

function sortTableBySpeed() {
    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
        const speedA = parseFloat(a.cells[2].textContent);
        const speedB = parseFloat(b.cells[2].textContent);
        return speedB - speedA;
    });

    rows.forEach(row => table.appendChild(row));
}

function deleteSelectedRows() {
    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows);
    let results = JSON.parse(localStorage.getItem('results')) || [];

    const rowsToDelete = [];
    rows.forEach((row, index) => {
        const checkbox = row.cells[0].getElementsByTagName('input')[0];
        if (checkbox.checked) {
            rowsToDelete.push(index);
        }
    });

    rowsToDelete.reverse().forEach(index => {
        table.deleteRow(index);
        results.splice(index, 1);
    });

    localStorage.setItem('results', JSON.stringify(results));
    analyzeData();
}

function analyzeData() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const habitSpeeds = {};

    results.forEach(result => {
        const habits = result.vanor.split(', ');
        habits.forEach(habit => {
            if (!habitSpeeds[habit]) {
                habitSpeeds[habit] = [];
            }
            habitSpeeds[habit].push(parseFloat(result.toppHastighet));
        });
    });

    const analysisTable = document.getElementById('analysisTable').getElementsByTagName('tbody')[0];
    analysisTable.innerHTML = '';

    let highestSpeed = 0;
    let highestSpeedHabit = '';

    Object.keys(habitSpeeds).forEach(habit => {
        const speeds = habitSpeeds[habit];
        const averageSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;

        const newRow = analysisTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.textContent = habit;
        cell2.textContent = averageSpeed.toFixed(2);

        if (averageSpeed > highestSpeed) {
            highestSpeed = averageSpeed;
            highestSpeedHabit = habit;
        }
    });

    // Display the habit with the highest average top speed
    const highestSpeedHabitDiv = document.getElementById('highestSpeedHabit');
    highestSpeedHabitDiv.innerHTML = `
        <h3>Högsta Medeltopphastighet</h3>
        <p>Vana: ${highestSpeedHabit}</p>
        <p>Medeltopphastighet: ${highestSpeed.toFixed(2)} km/h</p>
    `;
}

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.display = (index + 1 === pageNumber) ? 'block' : 'none';
    });
}

