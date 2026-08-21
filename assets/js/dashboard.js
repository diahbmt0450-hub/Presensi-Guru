/* ============================================================
   DASHBOARD GURU — JAVASCRIPT
   Presensi Sekolah | Map, Geolocation, Navigation, Clock, Data
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   SESSION & USER INFO
══════════════════════════════════════════════════════════════ */
const sessionUser = JSON.parse(sessionStorage.getItem('presensi_user') || 'null');
const USER = sessionUser || { username: 'guru', role: 'Guru', name: 'Ibu Diah Safitri, S.Pd', loginAt: new Date().toISOString() };

// Display User Name in header if present
const $userNameHeader = document.getElementById('userNameHeader');
const $userRoleHeader = document.getElementById('userRoleHeader');
if ($userNameHeader && USER.name) $userNameHeader.textContent = USER.name;
if ($userRoleHeader && USER.role) $userRoleHeader.textContent = USER.role === 'Admin' ? 'Administrator' : (USER.role === 'Kepala Sekolah' ? 'Kepala Sekolah' : 'Guru Pengajar');

/* ══════════════════════════════════════════════════════════════
   DATA DUMMY PRESENSI & EVENT
══════════════════════════════════════════════════════════════ */
const HISTORY_DATA = [
  { date: '19', month: 'Agu', day: 'Sel', status: 'terlambat',   label: 'Terlambat',             masuk: '07:22:18 (Terlambat 7 Menit)', pulang: '14:08:44',                 lokasi: 'Sekolah Utama' },
  { date: '15', month: 'Agu', day: 'Jum', status: 'lupa_pulang', label: 'Lupa Presensi Pulang', masuk: '06:48:10 (Tercatat)',         pulang: 'Tidak Presensi Pulang (--:--:--)', lokasi: 'Sekolah Utama' },
  { date: '14', month: 'Agu', day: 'Kam', status: 'izin',        label: 'Izin Kegiatan Pribadi', masuk: '--',                           pulang: '--',                               lokasi: 'Disetujui Kepala Sekolah' },
  { date: '13', month: 'Agu', day: 'Rab', status: 'alpha',       label: 'Alpha (Tanpa Kabar)',   masuk: '--',                           pulang: '--',                               lokasi: 'Tidak Hadir' },
  { date: '05', month: 'Agu', day: 'Rab', status: 'sakit',       label: 'Sakit (Surat Dokter)',  masuk: '--',                           pulang: '--',                               lokasi: 'Surat Terverifikasi' },
];

const EVENTS_DATA = [
  { day: '25', mon: 'Agu', name: 'Upacara Bendera & Pembinaan', time: '07:00 — 08:00 WIB', tag: 'wajib',    tagLabel: 'Wajib'    },
  { day: '28', mon: 'Agu', name: 'Rapat Evaluasi Guru',        time: '13:00 — 15:00 WIB', tag: 'wajib',    tagLabel: 'Wajib'    },
  { day: '01', mon: 'Sep', name: 'Workshop Kurikulum Merdeka',  time: '08:00 — 12:00 WIB', tag: 'opsional', tagLabel: 'Opsional' },
  { day: '09', mon: 'Sep', name: 'Hari Olahraga Nasional',      time: '06:30 — 08:30 WIB', tag: 'info',     tagLabel: 'Info'     },
  { day: '15', mon: 'Sep', name: 'Penerimaan Raport Siswa',     time: '08:00 — 12:00 WIB', tag: 'wajib',    tagLabel: 'Wajib'    },
];

/* ══════════════════════════════════════════════════════════════
   LOKASI SEKOLAH (TARGET KOORDINAT PRESENSI)
══════════════════════════════════════════════════════════════ */
const SCHOOL_LOCATIONS = [
  { name: 'Sekolah Utama', lat: -7.3305, lng: 111.3311, radius: 200, address: 'SMP Negeri 1 — Jl. Kartini No. 12' },
  { name: 'Rumah / WFH',   lat: -7.3400, lng: 111.3400, radius: 500, address: 'Area Khusus Penugasan WFH' },
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
let map               = null;
let userMarker        = null;
let userCircle        = null;
let userLat           = null;
let userLng           = null;
let userAccuracy      = null;
let currentPage       = 'pageOverview';

/* ══════════════════════════════════════════════════════════════
   DOM REFERENCES
══════════════════════════════════════════════════════════════ */
const $liveClock       = document.getElementById('liveClock');
const $currentDateText = document.getElementById('currentDateText');
const $checkInTime     = document.getElementById('checkInTime');
const $checkOutTime    = document.getElementById('checkOutTime');
const $locBadgeText    = document.getElementById('locBadgeText');
const $accuracyText    = document.getElementById('accuracyText');
const $locNameDisplay  = document.getElementById('locNameDisplay');
const $locDistDisplay  = document.getElementById('locDistDisplay');
const $gpsStatusDot    = document.getElementById('gpsStatusDot');
const $btnRefresh      = document.getElementById('btnRefreshLoc');
const $btnPresensi     = document.getElementById('btnPresensi');
const $toast           = document.getElementById('toastNotif');
const $modalBackdrop   = document.getElementById('modalBackdrop');
const $modalCancel     = document.getElementById('modalCancel');
const $modalConfirm    = document.getElementById('modalConfirm');
const $btnLogout       = document.getElementById('btnLogout');
const $btnNotif        = document.getElementById('btnNotif');
const $sideItems       = document.querySelectorAll('.side-item');
const $dashboardPages  = document.querySelectorAll('.dashboard-page');
const $historyList     = document.getElementById('historyList');
const $eventList       = document.getElementById('eventList');

/* ══════════════════════════════════════════════════════════════
   REAL-TIME CLOCK & DATE
══════════════════════════════════════════════════════════════ */
const DAYS_ID   = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function updateClockAndDate() {
  const now = new Date();
  
  // Clock
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  if ($liveClock) $liveClock.textContent = `${h}:${m}:${s} WIB`;

  // Date
  const dayName = DAYS_ID[now.getDay()];
  const dateNum = now.getDate();
  const monName = MONTHS_ID[now.getMonth()];
  const year    = now.getFullYear();
  if ($currentDateText) $currentDateText.textContent = `${dayName}, ${dateNum} ${monName} ${year}`;
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();

/* ══════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════ */
function showToast(msg, duration = 2800) {
  if (!$toast) return;
  $toast.textContent = msg;
  $toast.classList.add('show');
  setTimeout(function () { $toast.classList.remove('show'); }, duration);
}

/* ══════════════════════════════════════════════════════════════
   MAP & GEOLOCATION (TITIK LOKASI OVERVIEW)
══════════════════════════════════════════════════════════════ */
function initMap(lat, lng) {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  if (map) {
    map.setView([lat, lng], 16);
    return;
  }

  map = L.map('map', {
    center: [lat, lng],
    zoom: 16,
    zoomControl: true,
    attributionControl: false,
  });

  // OpenStreetMap Tile Layer with clean styling
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // Custom User Marker (Pulsing Radar Pin in Emerald Green)
  const userIcon = L.divIcon({
    className: '',
    html: `
      <div style="position:relative; width:28px; height:28px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:28px; height:28px; background:rgba(16,185,129,0.35); border-radius:50%; animation:pingGps 1.8s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <div style="width:18px; height:18px; background:#059669; border:3px solid #ffffff; border-radius:50%; box-shadow:0 3px 10px rgba(0,0,0,0.35); position:relative; z-index:2;"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
  userMarker.bindPopup('<b>Titik Lokasi Anda</b><br>Koordinat GPS terdeteksi').openPopup();

  // Accuracy circle
  userCircle = L.circle([lat, lng], {
    color: '#059669',
    fillColor: '#34d399',
    fillOpacity: 0.18,
    weight: 1.5,
    radius: userAccuracy || 50,
  }).addTo(map);

  // School target markers
  SCHOOL_LOCATIONS.forEach(function (loc) {
    const schoolIcon = L.divIcon({
      className: '',
      html: `
        <div style="background:#ffffff; border:2px solid #059669; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.2); font-size:12px;">
          🏫
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker([loc.lat, loc.lng], { icon: schoolIcon })
      .addTo(map)
      .bindPopup(`<b>${loc.name}</b><br>${loc.address}<br>Radius: ${loc.radius}m`);
  });

  // Inject pingGps animation if not present
  if (!document.getElementById('gpsPingStyle')) {
    const s = document.createElement('style');
    s.id = 'gpsPingStyle';
    s.textContent = '@keyframes pingGps{75%,100%{transform:scale(2);opacity:0}}';
    document.head.appendChild(s);
  }

  setTimeout(function () {
    if (map) map.invalidateSize();
  }, 200);
}

function updateMapMarker(lat, lng, accuracy) {
  if (!map) return;
  map.setView([lat, lng], 16);
  if (userMarker) userMarker.setLatLng([lat, lng]);
  if (userCircle) {
    userCircle.setLatLng([lat, lng]);
    userCircle.setRadius(accuracy || 50);
  }
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function detectNearestLocation(lat, lng) {
  let nearest = null;
  let minDist = Infinity;

  SCHOOL_LOCATIONS.forEach(function (loc) {
    const d = getDistance(lat, lng, loc.lat, loc.lng);
    if (d < minDist) { minDist = d; nearest = loc; }
  });

  const withinRadius = nearest && (minDist <= nearest.radius);
  const distText = minDist < 1000
    ? `${Math.round(minDist)} m`
    : `${(minDist / 1000).toFixed(1)} km`;

  // Update Overview Box UI
  if (withinRadius) {
    if ($locBadgeText) $locBadgeText.textContent = `📍 Dalam Radius Presensi (${nearest.name})`;
    if ($locNameDisplay) $locNameDisplay.textContent = nearest.name;
    if ($locDistDisplay) $locDistDisplay.textContent = `Jarak: ${distText} (Batas ${nearest.radius}m)`;
    if ($gpsStatusDot) {
      $gpsStatusDot.classList.remove('out-radius');
    }
  } else {
    if ($locBadgeText) $locBadgeText.textContent = `⚠️ Di Luar Radius Sekolah (${distText})`;
    if ($locNameDisplay) $locNameDisplay.textContent = 'Di Luar Radius';
    if ($locDistDisplay) $locDistDisplay.textContent = `Terdekat: ${nearest ? nearest.name : '-'} (${distText})`;
    if ($gpsStatusDot) {
      $gpsStatusDot.classList.add('out-radius');
    }
  }
}

function fetchLocation() {
  if ($btnRefresh) $btnRefresh.classList.add('spinning');
  if ($accuracyText) $accuracyText.textContent = 'Mencari koordinat GPS presisi...';

  if (!navigator.geolocation) {
    fallbackToDemo();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      userLat      = pos.coords.latitude;
      userLng      = pos.coords.longitude;
      userAccuracy = Math.round(pos.coords.accuracy);

      if ($accuracyText) $accuracyText.textContent = `Koordinat: ${userLat.toFixed(5)}, ${userLng.toFixed(5)} (±${userAccuracy}m)`;
      if ($btnRefresh) $btnRefresh.classList.remove('spinning');

      if (!map) {
        initMap(userLat, userLng);
      } else {
        updateMapMarker(userLat, userLng, userAccuracy);
      }

      detectNearestLocation(userLat, userLng);
    },
    function () {
      fallbackToDemo();
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

function fallbackToDemo() {
  userLat      = -7.3305;
  userLng      = 111.3311;
  userAccuracy = 15;

  if ($accuracyText) $accuracyText.textContent = `Lokasi Demo: ${userLat.toFixed(5)}, ${userLng.toFixed(5)} (±15m)`;
  if ($btnRefresh) $btnRefresh.classList.remove('spinning');

  if (!map) {
    initMap(userLat, userLng);
  } else {
    updateMapMarker(userLat, userLng, userAccuracy);
  }

  if ($locBadgeText) $locBadgeText.textContent = '📍 Terhubung: Sekolah Utama (SMP Negeri 1)';
  if ($locNameDisplay) $locNameDisplay.textContent = 'Sekolah Utama';
  if ($locDistDisplay) $locDistDisplay.textContent = 'Radius: 200m (Dalam Jangkauan)';
  if ($gpsStatusDot) $gpsStatusDot.classList.remove('out-radius');
}

/* Refresh Location click */
if ($btnRefresh) {
  $btnRefresh.addEventListener('click', function (e) {
    e.stopPropagation();
    showToast('Memperbarui titik lokasi GPS...');
    fetchLocation();
  });
}

/* ══════════════════════════════════════════════════════════════
   RESTORE PRESENSI STATE (TODAY'S STATUS)
══════════════════════════════════════════════════════════════ */
function restorePresensiState() {
  const saved = JSON.parse(sessionStorage.getItem('presensi_today') || 'null');
  const $presensiStatusPill = document.getElementById('presensiStatusPill');
  const $presensiProgBar    = document.getElementById('presensiProgBar');
  const $presensiFooterInfo = document.getElementById('presensiFooterInfo');

  if (saved) {
    if (saved.masuk) {
      if ($checkInTime) $checkInTime.textContent = saved.masuk;
      if ($presensiStatusPill) {
        $presensiStatusPill.textContent = 'Sudah Masuk';
        $presensiStatusPill.style.color = '#10b981';
      }
      if ($presensiProgBar) $presensiProgBar.style.width = '65%';
      if ($presensiFooterInfo) $presensiFooterInfo.textContent = 'Siap Presensi Pulang';
    }
    if (saved.pulang) {
      if ($checkOutTime) $checkOutTime.textContent = saved.pulang;
      if ($presensiStatusPill) {
        $presensiStatusPill.textContent = 'Selesai (Hadir)';
        $presensiStatusPill.style.color = '#10b981';
      }
      if ($presensiProgBar) $presensiProgBar.style.width = '100%';
      if ($presensiFooterInfo) $presensiFooterInfo.textContent = 'Kehadiran Lengkap';
    }
  } else {
    // Default dummy for demo display
    if ($checkInTime) $checkInTime.textContent = '06:48:12';
    if ($checkOutTime) $checkOutTime.textContent = '14:05:30';
    if ($presensiStatusPill) {
      $presensiStatusPill.textContent = 'Hadir Lengkap';
      $presensiStatusPill.style.color = '#10b981';
    }
    if ($presensiProgBar) $presensiProgBar.style.width = '100%';
    if ($presensiFooterInfo) $presensiFooterInfo.textContent = 'Presensi Masuk & Pulang Tercatat';
  }
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION (SIDEBAR SWITCHING WITH TITLE & TOAST NOTIF)
══════════════════════════════════════════════════════════════ */
const PAGE_CONFIG = {
  pageOverview: { title: 'Dashboard', desc: 'Dashboard Utama & Radar Presensi' },
  pageRiwayat:  { title: 'Riwayat Kehadiran', desc: 'Riwayat & Log Presensi Guru' },
  pageRekap:    { title: 'Rekap Kehadiran', desc: 'Statistik & Akumulasi Bulanan' },
  pageEvent:    { title: 'Kegiatan Sekolah', desc: 'Jadwal Agenda & Acara Sekolah' }
};

const $headerMainTitle = document.querySelector('.header-main');

$sideItems.forEach(function (item) {
  item.addEventListener('click', function () {
    const targetPageId = item.dataset.page;
    if (!targetPageId || targetPageId === currentPage) return;

    // Remove active state
    $sideItems.forEach(function (b) { b.classList.remove('active'); });
    $dashboardPages.forEach(function (p) { p.classList.remove('active'); });

    // Set active
    item.classList.add('active');
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) targetPage.classList.add('active');
    currentPage = targetPageId;

    // Update Header Title with transition
    const cfg = PAGE_CONFIG[targetPageId];
    if (cfg && $headerMainTitle) {
      $headerMainTitle.style.opacity = '0';
      $headerMainTitle.style.transform = 'translateY(-4px)';
      setTimeout(function () {
        $headerMainTitle.textContent = cfg.title;
        $headerMainTitle.style.transition = 'all 0.25s ease';
        $headerMainTitle.style.opacity = '1';
        $headerMainTitle.style.transform = 'translateY(0)';
      }, 120);

      // Beri keterangan nama menu yang diklik via Toast
      showToast('Menu Aktif: ' + cfg.title + ' — ' + cfg.desc);
    }

    // Leaflet map refresh when returning to overview
    if (targetPageId === 'pageOverview' && map) {
      setTimeout(function () { map.invalidateSize(); }, 180);
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   RIWAYAT RENDER (HANYA IZIN, SAKIT, ALPHA, TERLAMBAT, LUPA PULANG)
══════════════════════════════════════════════════════════════ */
function renderHistory() {
  if (!$historyList) return;
  $historyList.innerHTML = '';
  let terlambat = 0, lupaPulang = 0, alpha = 0, izinSakit = 0;

  // Filter ONLY exceptions: terlambat, lupa_pulang, izin, sakit, alpha
  const exceptionLogs = HISTORY_DATA.filter(function (item) {
    return item.status !== 'hadir';
  });

  if (exceptionLogs.length === 0) {
    $historyList.innerHTML = `
      <div style="padding:24px; text-align:center; color:#64748b; font-size:13px;">
        ✨ Tidak ada catatan keterlambatan atau ketidakhadiran pada bulan ini. Presensi Anda lengkap & tepat waktu!
      </div>
    `;
    return;
  }

  exceptionLogs.forEach(function (item) {
    if (item.status === 'terlambat')   terlambat++;
    if (item.status === 'lupa_pulang') lupaPulang++;
    if (item.status === 'alpha')       alpha++;
    if (item.status === 'izin' || item.status === 'sakit') izinSakit++;

    const el = document.createElement('div');
    el.className = `history-item ${item.status}`;
    el.innerHTML = `
      <div class="hi-date">
        <span class="hi-day">${item.date}</span>
        <span class="hi-mon">${item.month}</span>
      </div>
      <div class="hi-info">
        <div class="hi-status">${item.label}</div>
        <div class="hi-times">
          ${item.masuk !== '--'
            ? `Masuk: <b>${item.masuk}</b> &bull; Pulang: <b>${item.pulang}</b>`
            : '&mdash; Tidak ada catatan presensi fisik &mdash;'}
          ${item.lokasi !== '-' ? ` &bull; ${item.lokasi}` : ''}
        </div>
      </div>
      <span class="hi-badge">${item.label}</span>
    `;
    $historyList.appendChild(el);
  });

  const $riwTerlambat  = document.getElementById('riwTerlambat');
  const $riwLupaPulang = document.getElementById('riwLupaPulang');
  const $riwAlpha      = document.getElementById('riwAlpha');
  const $riwIzin       = document.getElementById('riwIzin');

  if ($riwTerlambat)  $riwTerlambat.textContent  = terlambat;
  if ($riwLupaPulang) $riwLupaPulang.textContent = lupaPulang;
  if ($riwAlpha)      $riwAlpha.textContent      = alpha;
  if ($riwIzin)       $riwIzin.textContent       = izinSakit;
}

/* ══════════════════════════════════════════════════════════════
   EVENTS RENDER (DENGAN TITIK KOORDINAT ACARA)
══════════════════════════════════════════════════════════════ */
function getActiveSchoolEvents() {
  const local = JSON.parse(localStorage.getItem('school_events_data') || 'null');
  if (local && local.length > 0) return local;
  return EVENTS_DATA;
}

function renderEvents() {
  if (!$eventList) return;
  $eventList.innerHTML = '';
  const events = getActiveSchoolEvents();

  // Inject event locations into SCHOOL_LOCATIONS dynamically so teachers can check in at venue
  events.forEach(ev => {
    if (ev.coords && ev.coords.length === 2) {
      const alreadyExists = SCHOOL_LOCATIONS.some(loc => loc.name === ev.venue || loc.name === ev.name);
      if (!alreadyExists) {
        SCHOOL_LOCATIONS.push({
          name: ev.venue || ev.name,
          lat: ev.coords[0],
          lng: ev.coords[1],
          radius: ev.radius || 300,
          address: `Lokasi Acara: ${ev.name}`
        });
      }
    }
  });

  events.forEach(function (ev) {
    const el = document.createElement('div');
    el.className = 'event-item';
    el.innerHTML = `
      <div class="event-date-box">
        <span class="ev-day">${ev.day}</span>
        <span class="ev-mon">${ev.mon}</span>
      </div>
      <div class="event-info">
        <div class="event-name">${ev.name}</div>
        <div class="event-time" style="display:flex; flex-direction:column; gap:2px; margin-top:2px;">
          <div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ${ev.time}
          </div>
          ${ev.venue ? `<div style="font-size:11px; color:#059669; font-weight:700;">📍 Lokasi Presensi: ${ev.venue}</div>` : ''}
        </div>
      </div>
      <span class="event-tag ${ev.tag || 'wajib'}">${ev.tagLabel || 'Wajib'}</span>
    `;
    $eventList.appendChild(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   PENGAJUAN IZIN LIST RENDER
══════════════════════════════════════════════════════════════ */
const TYPE_ICONS = { sakit: '🏥', dinas: '✈️', izin: '📋' };
const STATUS_LABELS = { pending: 'Menunggu', approved: 'Disetujui', rejected: 'Ditolak' };

const DEMO_PENGAJUAN = [
  { id: 'IZN-2026-0042', type: 'dinas',  typeLabel: 'Perjalanan Dinas',     mulai: '2026-08-10', selesai: '2026-08-11', ket: 'Workshop Kurikulum Merdeka',    status: 'approved' },
  { id: 'IZN-2026-0031', type: 'sakit',  typeLabel: 'Sakit',                mulai: '2026-08-05', selesai: '2026-08-06', ket: 'Demam dan flu',                 status: 'approved' },
  { id: 'IZN-2026-0018', type: 'izin',   typeLabel: 'Izin Kegiatan Pribadi',mulai: '2026-07-28', selesai: '2026-07-28', ket: 'Acara keluarga penting',        status: 'rejected' },
];

function renderPengajuan() {
  const $list = document.getElementById('pengajuanList');
  if (!$list) return;

  const sessionPengajuan = JSON.parse(sessionStorage.getItem('presensi_pengajuan') || '[]');
  const all = [...sessionPengajuan, ...DEMO_PENGAJUAN];
  $list.innerHTML = '';

  const formatDate = function (s) {
    if (!s) return '—';
    const d = new Date(s + 'T00:00:00');
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  all.forEach(function (item) {
    const el = document.createElement('div');
    el.className = `pengajuan-item ${item.type}`;
    el.innerHTML = `
      <div class="pq-icon">${TYPE_ICONS[item.type] || '📋'}</div>
      <div class="pq-info">
        <div class="pq-type">${item.typeLabel}</div>
        <div class="pq-date">
          ${formatDate(item.mulai)}${item.mulai !== item.selesai ? ' &ndash; ' + formatDate(item.selesai) : ''}
          &bull; ${item.ket.length > 32 ? item.ket.slice(0, 32) + '…' : item.ket}
        </div>
      </div>
      <span class="pq-status ${item.status}">${STATUS_LABELS[item.status] || item.status}</span>
    `;
    $list.appendChild(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   LOGOUT & NOTIF MODALS
══════════════════════════════════════════════════════════════ */
if ($btnLogout) {
  $btnLogout.addEventListener('click', function () {
    if ($modalBackdrop) $modalBackdrop.classList.add('show');
  });
}

if ($modalCancel) {
  $modalCancel.addEventListener('click', function () {
    if ($modalBackdrop) $modalBackdrop.classList.remove('show');
  });
}

if ($modalConfirm) {
  $modalConfirm.addEventListener('click', function () {
    sessionStorage.removeItem('presensi_user');
    window.location.href = 'login.html';
  });
}

/* ══════════════════════════════════════════════════════════════
   NOTIFICATION SYSTEM (POPUP, UNREAD BADGE & EMPTY STATE)
══════════════════════════════════════════════════════════════ */
const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'izin',
    title: 'Pengajuan Izin Disetujui',
    desc: 'Surat Izin Keperluan Keluarga (14 Agustus) telah diverifikasi dan disetujui Kepala Sekolah.',
    time: '10 menit yang lalu',
    read: false,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
  },
  {
    id: 'notif-2',
    type: 'event',
    title: 'Agenda Kegiatan Terdekat',
    desc: 'Upacara Bendera & Pembinaan Pegawai: Senin, 25 Agustus 2026 pukul 07:00 WIB di Lapangan Utama.',
    time: '1 jam yang lalu',
    read: false,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
  }
];

function getTeacherNotifications() {
  const local = JSON.parse(localStorage.getItem('teacher_notifications') || 'null');
  if (!local || local.length === 0) {
    localStorage.setItem('teacher_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
    return DEFAULT_NOTIFICATIONS;
  }
  return local;
}

function saveTeacherNotifications(data) {
  localStorage.setItem('teacher_notifications', JSON.stringify(data));
}

let NOTIFICATIONS_DATA = getTeacherNotifications();

const $modalNotifBackdrop   = document.getElementById('modalNotifBackdrop');
const $modalNotifClose      = document.getElementById('modalNotifClose');
const $btnNotifCloseBottom  = document.getElementById('btnNotifCloseBottom');
const $notifListContainer   = document.getElementById('notifListContainer');
const $notifUnreadBadge     = document.getElementById('notifUnreadBadge');
const $btnMarkAllRead       = document.getElementById('btnMarkAllRead');
const $notifDot             = document.querySelector('.notif-dot');

function renderNotifications() {
  NOTIFICATIONS_DATA = getTeacherNotifications();
  if (!$notifListContainer) return;
  $notifListContainer.innerHTML = '';

  const unreadCount = NOTIFICATIONS_DATA.filter(n => !n.read).length;

  // Update notif dot di sidebar lonceng
  if ($notifDot) {
    $notifDot.style.display = unreadCount > 0 ? 'block' : 'none';
  }

  // Update badge modal
  if ($notifUnreadBadge) {
    if (unreadCount > 0) {
      $notifUnreadBadge.textContent = `${unreadCount} Belum Dibaca`;
      $notifUnreadBadge.className = 'notif-modal-sub active';
    } else {
      $notifUnreadBadge.textContent = 'Semua Sudah Dibaca';
      $notifUnreadBadge.className = 'notif-modal-sub';
    }
  }

  // Update tombol tandai semua
  if ($btnMarkAllRead) {
    $btnMarkAllRead.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
  }

  // Jika tidak ada notifikasi sama sekali
  if (NOTIFICATIONS_DATA.length === 0) {
    $notifListContainer.innerHTML = `
      <div class="notif-empty-state">
        <div class="notif-empty-icon">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <h4 class="notif-empty-title">Tidak Ada Pemberitahuan</h4>
        <p class="notif-empty-desc">Saat ini tidak ada pengumuman kegiatan baru atau update pengajuan izin untuk akun Anda.</p>
      </div>
    `;
    return;
  }

  // Render list
  NOTIFICATIONS_DATA.forEach(function (item) {
    const el = document.createElement('div');
    el.className = `notif-card-item ${item.type} ${item.read ? 'read' : 'unread'}`;
    el.innerHTML = `
      <div class="notif-card-icon ${item.type}">
        ${item.icon}
      </div>
      <div class="notif-card-body">
        <h4 class="notif-card-title">${item.title}</h4>
        <p class="notif-card-desc">${item.desc}</p>
      </div>
      ${!item.read ? '<span class="notif-unread-dot" title="Belum Dibaca"></span>' : ''}
    `;

    // Klik untuk menandai sebagai sudah dibaca
    el.addEventListener('click', function () {
      item.read = true;
      saveTeacherNotifications(NOTIFICATIONS_DATA);
      renderNotifications();
    });

    $notifListContainer.appendChild(el);
  });
}

function openNotifModal() {
  if ($modalNotifBackdrop) {
    $modalNotifBackdrop.classList.add('show');
    renderNotifications();
  }
}

function closeNotifModal() {
  if ($modalNotifBackdrop) {
    $modalNotifBackdrop.classList.remove('show');
  }
}

if ($btnNotif) {
  $btnNotif.addEventListener('click', openNotifModal);
}

if ($modalNotifClose) {
  $modalNotifClose.addEventListener('click', closeNotifModal);
}

if ($btnNotifCloseBottom) {
  $btnNotifCloseBottom.addEventListener('click', closeNotifModal);
}

if ($btnMarkAllRead) {
  $btnMarkAllRead.addEventListener('click', function () {
    NOTIFICATIONS_DATA.forEach(n => { n.read = true; });
    saveTeacherNotifications(NOTIFICATIONS_DATA);
    renderNotifications();
    showToast('Semua pemberitahuan telah ditandai sebagai dibaca.');
  });
}

if ($modalNotifBackdrop) {
  $modalNotifBackdrop.addEventListener('click', function (e) {
    if (e.target === $modalNotifBackdrop) closeNotifModal();
  });
}

/* ══════════════════════════════════════════════════════════════
   PROFILE POPUP MODAL HANDLERS
══════════════════════════════════════════════════════════════ */
const $btnOpenProfile = document.getElementById('btnOpenProfile');
const $modalProfileBackdrop = document.getElementById('modalProfileBackdrop');
const $modalProfileClose = document.getElementById('modalProfileClose');
const $btnProfileCloseBottom = document.getElementById('btnProfileCloseBottom');

function openProfileModal() {
  if ($modalProfileBackdrop) {
    // Populate dynamic user data if available
    const $name = document.getElementById('profModalName');
    const $nip = document.getElementById('profModalNip');
    const $badge = document.getElementById('profModalRoleBadge');
    const $status = document.getElementById('profModalStatus');
    const $nuptk = document.getElementById('profModalNuptk');
    const $school = document.getElementById('profModalSchool');
    const $email = document.getElementById('profModalEmail');
    const $phone = document.getElementById('profModalPhone');

    if ($name && USER.name) $name.textContent = USER.name;
    if ($nip && USER.nip) $nip.textContent = 'NIP: ' + USER.nip;
    if ($badge && USER.mapel) $badge.innerHTML = USER.mapel;
    if ($status && USER.status) $status.textContent = USER.status;
    if ($nuptk && USER.nuptk) $nuptk.textContent = USER.nuptk;
    if ($school && USER.school) $school.textContent = USER.school;
    if ($email && USER.email) $email.textContent = USER.email;
    if ($phone && USER.phone) $phone.textContent = USER.phone;

    $modalProfileBackdrop.classList.add('show');
  }
}

function closeProfileModal() {
  if ($modalProfileBackdrop) $modalProfileBackdrop.classList.remove('show');
}

if ($btnOpenProfile) {
  $btnOpenProfile.addEventListener('click', openProfileModal);
}

if ($modalProfileClose) {
  $modalProfileClose.addEventListener('click', closeProfileModal);
}

if ($btnProfileCloseBottom) {
  $btnProfileCloseBottom.addEventListener('click', closeProfileModal);
}

if ($modalProfileBackdrop) {
  $modalProfileBackdrop.addEventListener('click', function (e) {
    if (e.target === $modalProfileBackdrop) closeProfileModal();
  });
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
(function init() {
  restorePresensiState();
  renderNotifications();
  renderHistory();
  renderEvents();
  renderPengajuan();

  // Start map & geolocation
  setTimeout(fetchLocation, 350);

  // Auto handle window resize for full desktop viewport
  window.addEventListener('resize', function () {
    if (map) map.invalidateSize();
  });
})();



