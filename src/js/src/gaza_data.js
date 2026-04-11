const GAZA_SUMMARY_URL = 'https://data.techforpalestine.org/api/v3/summary.json';

let gazaLastUpdateDate = null;
let gazaKilledTotal = null;
let gazaKilledChildren = null;
let gazaKilledWomen = null;
let gazaKilledCivilDefence = null;
let gazaKilledPress = null;
let gazaKilledMedical = null;
let gazaInjuredTotal = null;

function formatNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value.toLocaleString('en-US');
  }
  return value ?? '';
}

function formatDate(dateString) {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  const day = date.getDate();
  const daySuffix = (day % 10 === 1 && day !== 11) ? 'st'
    : (day % 10 === 2 && day !== 12) ? 'nd'
    : (day % 10 === 3 && day !== 13) ? 'rd'
    : 'th';
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${day}${daySuffix} ${month} ${year}`;
}

async function fetchGazaData() {
  const response = await fetch(GAZA_SUMMARY_URL, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Gaza summary: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const gaza = data.gaza || {};
  const killed = gaza.killed || {};
  const injured = gaza.injured || {};

  gazaLastUpdateDate = gaza.last_update || null;
  gazaKilledTotal = killed.total ?? null;
  gazaInjuredTotal = injured.total ?? null;
  gazaKilledChildren = killed.children ?? null;
  gazaKilledWomen = killed.women ?? null;
  gazaKilledCivilDefence = killed.civil_defence ?? null;
  gazaKilledPress = killed.press ?? null;
  gazaKilledMedical = killed.medical ?? null;

  return {
    lastUpdateDate: gazaLastUpdateDate,
    killedTotal: gazaKilledTotal,
    killedChildren: gazaKilledChildren,
    killedWomen: gazaKilledWomen,
    killedCivilDefence: gazaKilledCivilDefence,
    killedPress: gazaKilledPress,
    killedMedical: gazaKilledMedical,
    injuredTotal: gazaInjuredTotal
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  totalKilled = document.getElementById("totalKilled");
  childrenKilled = document.getElementById("childrenKilled");
  womenKilled = document.getElementById("womenKilled");
  medKilled = document.getElementById("medKilled");
  pressKilled = document.getElementById("pressKilled");
  totalInjured = document.getElementById("totalInjured");
  updateDate = document.getElementById("updateDate");

  try {
    const data = await fetchGazaData();
    totalKilled.innerHTML = formatNumber(data.killedTotal);
    childrenKilled.innerHTML = formatNumber(data.killedChildren);
    womenKilled.innerHTML = formatNumber(data.killedWomen);
    medKilled.innerHTML = formatNumber(data.killedMedical);
    pressKilled.innerHTML = formatNumber(data.killedPress);
    totalInjured.innerHTML = formatNumber(data.injuredTotal);
    updateDate.innerHTML = "Last Updated: " + formatDate(data.lastUpdateDate);
  } catch (error) {
    console.error('Error loading Gaza summary data:', error);
  }
});
