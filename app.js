// --------------------
// INTEROPERABILITY DATA (Unified Format)
// --------------------
const records = [
  { year: 2025, type: "Cardiology Report", hospital: "Apollo Hospital", encrypted: true },
  { year: 2024, type: "Blood Test", hospital: "Fortis Clinic", encrypted: true },
  { year: 2023, type: "MRI Scan", hospital: "NIMHANS", encrypted: true }
];

// --------------------
// ACCESS PERMISSIONS
// --------------------
let accessPermissions = [
  { entity: "Dr. Aishwarya M B(Cardiology)", expires: "24 hours" },
  { entity: "Fortis Hospital", expires: "12 hours" }
];

// --------------------
// LOAD MEDICAL RECORDS (Encrypted UI)
// --------------------
const timelineEl = document.getElementById("timeline");
records.forEach(record => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${record.year}</span>
    <div>
      <strong>${record.type}</strong>
      <p>${record.hospital}</p>
      <small class="encrypted">🔒 Encrypted</small>
    </div>
  `;
  timelineEl.appendChild(li);
});

// --------------------
// LOAD ACCESS PERMISSIONS
// --------------------
const accessEl = document.getElementById("accessList");
function renderAccess() {
  accessEl.innerHTML = "";
  accessPermissions.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "access-row";
    div.innerHTML = `
      <span>${item.entity} (Expires: ${item.expires})</span>
      <button onclick="revokeAccess(${index})">Revoke</button>
    `;
    accessEl.appendChild(div);
  });
}
renderAccess();

// --------------------
// CONSENT CONFIRMATION
// --------------------
function requestAccess(entity) {
  const approve = confirm(`${entity} is requesting access to your records. Approve?`);
  if (approve) {
    alert("Access Granted ✅");
  } else {
    alert("Access Denied ❌");
  }
}

// --------------------
// REVOKE ACCESS
// --------------------
function revokeAccess(index) {
  accessPermissions.splice(index, 1);
  renderAccess();
  alert("Access Revoked 🔐");
}

// --------------------
// EMERGENCY ACCESS (BIOMETRIC UI + TIMER)
// --------------------
function activateEmergency() {
  const status = document.getElementById("emergencyStatus");

  const biometricConfirmed = confirm("🔐 Fingerprint Verified. Grant emergency access?");
  if (!biometricConfirmed) return;

  let time = 15 * 60; // 15 minutes

  const timer = setInterval(() => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    status.innerText = `🚨 Emergency Access Active — ${min}:${sec < 10 ? "0" : ""}${sec}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      status.innerText = "❌ Emergency Access Expired";
    }
  }, 1000);
}
