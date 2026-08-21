/* ============================================================
   PORTAL ADMINISTRATOR PRESENSI GURU & SEKOLAH — JAVASCRIPT
   Modern Interactive Admin Management & Approval Engine
   ============================================================ */

'use strict';

/* ─── DUMMY DATA GURU & LOG PRESENSI ─── */
const INITIAL_TEACHERS = [
  {
    id: 'GURU-001',
    name: 'Ibu Diah Safitri, S.Pd',
    nip: '19890412 201402 2 003',
    nuptk: '4741 7676 6821 0032',
    mapel: 'Bahasa Indonesia & Wali Kelas VII-B',
    status: 'PNS / Guru Tetap',
    email: 'diah.safitri@sekolah.sch.id',
    phone: '+62 812-3456-7890',
    school: 'SMP Negeri 1 Surabaya',
    photo: 'assets/img/profile-diah.jpg',
    accountStatus: 'approved',
    registeredAt: '2026-08-01T08:00:00.000Z'
  },
  {
    id: 'GURU-002',
    name: 'Bpk. Ahmad Fauzi, M.Pd',
    nip: '19850615 201001 1 012',
    nuptk: '5832 8841 9912 0019',
    mapel: 'Matematika & Pembina OSIS',
    status: 'PNS / Guru Tetap',
    email: 'ahmad.fauzi@sekolah.sch.id',
    phone: '+62 813-8877-6655',
    school: 'SMP Negeri 1 Surabaya',
    photo: 'assets/img/profile-diah.jpg',
    accountStatus: 'approved',
    registeredAt: '2026-08-02T09:00:00.000Z'
  },
  {
    id: 'GURU-003',
    name: 'Ibu Siti Nurhaliza, S.Si',
    nip: '19920820 201903 2 018',
    nuptk: '6921 7732 4410 0045',
    mapel: 'Ilmu Pengetahuan Alam (IPA)',
    status: 'PPPK',
    email: 'siti.nurhaliza@sekolah.sch.id',
    phone: '+62 821-9988-1122',
    school: 'SMP Negeri 1 Surabaya',
    photo: 'assets/img/profile-diah.jpg',
    accountStatus: 'approved',
    registeredAt: '2026-08-03T10:00:00.000Z'
  },
  {
    id: 'REG-2026-8812',
    name: 'Bpk. Hendra Gunawan, S.Kom',
    nip: '19950310 202203 1 005',
    nuptk: '3819 4482 1109 0088',
    mapel: 'Informatika & Pembina Robotik',
    status: 'PPPK',
    email: 'hendra.gunawan@sekolah.sch.id',
    phone: '+62 856-7788-9900',
    school: 'SMP Negeri 1 Surabaya',
    photo: 'assets/img/profile-diah.jpg',
    accountStatus: 'pending_approval',
    registeredAt: '2026-08-20T14:30:00.000Z'
  },
  {
    id: 'REG-2026-9921',
    name: 'Ibu Ratna Dewi, S.Pd',
    nip: '19980712 202401 2 011',
    nuptk: '1928 3746 5501 0092',
    mapel: 'Bahasa Inggris',
    status: 'Guru Tidak Tetap (GTT) / Honorer',
    email: 'ratna.dewi@sekolah.sch.id',
    phone: '+62 878-1122-3344',
    school: 'SMP Negeri 1 Surabaya',
    photo: 'assets/img/profile-diah.jpg',
    accountStatus: 'pending_approval',
    registeredAt: '2026-08-21T07:15:00.000Z'
  }
];

const TODAY_ATTENDANCE_LOGS = [
  { name: 'Ibu Diah Safitri, S.Pd', nip: '19890412 201402 2 003', status: 'hadir', masuk: '06:48:12', pulang: '14:05:30', lat: -7.3304, lng: 111.3312, photo: 'assets/img/profile-diah.jpg' },
  { name: 'Bpk. Ahmad Fauzi, M.Pd', nip: '19850615 201001 1 012', status: 'hadir', masuk: '06:51:40', pulang: '--:--:--', lat: -7.3307, lng: 111.3310, photo: 'assets/img/profile-diah.jpg' },
  { name: 'Ibu Siti Nurhaliza, S.Si', nip: '19920820 201903 2 018', status: 'terlambat', masuk: '07:22:18', pulang: '--:--:--', lat: -7.3302, lng: 111.3314, photo: 'assets/img/profile-diah.jpg' },
  { name: 'Bpk. Bambang Wijaya, S.Pd', nip: '19790214 200801 1 007', status: 'hadir', masuk: '06:45:00', pulang: '14:10:00', lat: -7.3306, lng: 111.3309, photo: 'assets/img/profile-diah.jpg' },
  { name: 'Ibu Nurul Hidayati, M.Pd', nip: '19821105 200902 2 004', status: 'izin', masuk: '--:--:--', pulang: '--:--:--', lat: null, lng: null, photo: 'assets/img/profile-diah.jpg' },
];

/* ─── DATA EVENT & KEGIATAN KHUSUS SEKOLAH ─── */
const INITIAL_EVENTS = [
  {
    id: 'EVT-2026-001',
    name: 'Workshop Kurikulum Merdeka di Balai Guru Penggerak',
    tag: 'wajib',
    tagLabel: 'Wajib',
    date: '2026-08-25',
    day: '25',
    mon: 'Agu',
    time: '08:00 — 14:00 WIB',
    venue: 'Gedung Balai Guru Penggerak (BGP) Jatim',
    coords: [-7.3150, 111.3450],
    radius: 300,
    target: 'Semua Guru',
    desc: 'Guru dapat melakukan presensi di lokasi acara BGP maupun di sekolah utama.'
  },
  {
    id: 'EVT-2026-002',
    name: 'Rapat Evaluasi & Pembinaan Pengawas Dinas Pendidikan',
    tag: 'wajib',
    tagLabel: 'Wajib',
    date: '2026-08-28',
    day: '28',
    mon: 'Agu',
    time: '13:00 — 15:30 WIB',
    venue: 'Aula Ki Hajar Dewantara - Dinas Pendidikan Kota',
    coords: [-7.3200, 111.3380],
    radius: 200,
    target: 'Perwakilan Guru Wali Kelas',
    desc: 'Wajib presensi geotagging di lokasi dinas pendidikan.'
  },
  {
    id: 'EVT-2026-003',
    name: 'Pekan Olahraga & Seni Guru (PORSENI PGRI)',
    tag: 'opsional',
    tagLabel: 'Opsional',
    date: '2026-09-09',
    day: '09',
    mon: 'Sep',
    time: '06:30 — 11:30 WIB',
    venue: 'GOR Gelora Olahraga Pelajar',
    coords: [-7.3100, 111.3250],
    radius: 400,
    target: 'Semua Guru',
    desc: 'Presensi fleksibel di GOR atau di SMPN 1.'
  }
];

function getSchoolEvents() {
  const local = JSON.parse(localStorage.getItem('school_events_data') || 'null');
  if (!local || local.length === 0) {
    localStorage.setItem('school_events_data', JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  }
  return local;
}

function saveSchoolEvents(data) {
  localStorage.setItem('school_events_data', JSON.stringify(data));
}

/* ─── INITIALIZE LOCAL STORAGE ─── */
function getRegisteredTeachers() {
  const localData = JSON.parse(localStorage.getItem('registered_teachers') || 'null');
  if (!localData || localData.length === 0) {
    localStorage.setItem('registered_teachers', JSON.stringify(INITIAL_TEACHERS));
    return INITIAL_TEACHERS;
  }
  return localData;
}

function saveRegisteredTeachers(data) {
  localStorage.setItem('registered_teachers', JSON.stringify(data));
}

/* ─── STATE ─── */
let adminMap = null;
let currentTab = 'pageOverview';

/* ─── DOM REFS ─── */
const navItems = document.querySelectorAll('.nav-item');
const pageSections = document.querySelectorAll('.admin-page-section');
const liveClockEl = document.getElementById('adminLiveClock');
const pageHeading = document.getElementById('pageHeading');
const pageSubHeading = document.getElementById('pageSubHeading');

/* ─── LIVE CLOCK ─── */
function updateLiveClock() {
  if (!liveClockEl) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  liveClockEl.textContent = `${timeStr} • ${dateStr}`;
}
setInterval(updateLiveClock, 1000);
updateLiveClock();

/* ─── PAGE NAVIGATION ─── */
const PAGE_TITLES = {
  'pageOverview':    { title: 'Monitoring Kehadiran Hari Ini', sub: 'Pantau log presensi, lokasi GPS dan tingkat kehadiran seluruh guru' },
  'pageVerifikasi':  { title: 'Verifikasi Akun Guru Baru (ACC)', sub: 'Tinjau dan setujui pendaftaran akun tenaga pendidik sebelum dapat login' },
  'pagePersetujuan': { title: 'Pengajuan Izin, Sakit & Perjalanan Dinas', sub: 'Unduh berkas dokumen untuk arsip dan teruskan/ajukan permohonan ke Kepala Sekolah untuk persetujuan resmi' },
  'pageKegiatan':    { title: 'Manajemen Kegiatan & Lokasi Acara', sub: 'Upload acara wajib guru lengkap dengan jadwal dan titik koordinat GPS presensi' },
  'pageMasterGuru':  { title: 'Data Master Guru & Rekap Laporan', sub: 'Kelola data seluruh tenaga kependidikan dan unduh rekap kehadiran' },
  'pagePengaturan':  { title: 'Pengaturan Jam Kerja & Titik Sekolah', sub: 'Konfigurasi jadwal kerja, toleransi keterlambatan, dan koordinat GPS' }
};

navItems.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('data-page');
    if (!target) return;

    navItems.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    pageSections.forEach(sec => sec.classList.remove('active'));
    const activeSection = document.getElementById(target);
    if (activeSection) activeSection.classList.add('active');

    currentTab = target;
    if (PAGE_TITLES[target]) {
      pageHeading.textContent = PAGE_TITLES[target].title;
      pageSubHeading.textContent = PAGE_TITLES[target].sub;
    }

    if (target === 'pageOverview' && adminMap) {
      setTimeout(() => adminMap.invalidateSize(), 200);
    }
    if (target === 'pageVerifikasi') renderPendingTeachers();
    if (target === 'pagePersetujuan') renderLeaveRequests();
    if (target === 'pageKegiatan') renderAdminEvents();
    if (target === 'pageMasterGuru') renderMasterTeachers();
  });
});

/* ─── MAP INITIALIZATION (LEAFLET) ─── */
function initAdminMap() {
  const mapElement = document.getElementById('adminMap');
  if (!mapElement || typeof L === 'undefined') return;

  const schoolCenter = [-7.3305, 111.3311];
  adminMap = L.map('adminMap', {
    center: schoolCenter,
    zoom: 17,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(adminMap);

  // School Geofence Area
  L.circle(schoolCenter, {
    radius: 200,
    color: '#059669',
    fillColor: '#10b981',
    fillOpacity: 0.18,
    weight: 2
  }).addTo(adminMap).bindPopup('<b>Zona Presensi Sekolah</b><br>Radius 200 Meter');

  // School Center Marker
  const schoolIcon = L.divIcon({
    className: 'custom-school-marker',
    html: `<div style="background:#059669; color:#fff; padding:6px 10px; border-radius:20px; font-weight:800; font-size:11px; box-shadow:0 4px 12px rgba(0,0,0,0.3); border:2px solid #fff; white-space:nowrap;">🏫 SMP Negeri 1 Surabaya</div>`,
    iconSize: [120, 30],
    iconAnchor: [60, 15]
  });
  L.marker(schoolCenter, { icon: schoolIcon }).addTo(adminMap);

  // Add Markers for checked in teachers
  TODAY_ATTENDANCE_LOGS.forEach(log => {
    if (!log.lat || !log.lng) return;
    const markerColor = log.status === 'hadir' ? '#059669' : '#d97706';
    const teacherIcon = L.divIcon({
      className: 'custom-teacher-marker',
      html: `<div style="background:${markerColor}; width:32px; height:32px; border-radius:50%; border:2px solid #fff; box-shadow:0 3px 8px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:11px;">📍</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([log.lat, log.lng], { icon: teacherIcon })
      .addTo(adminMap)
      .bindPopup(`
        <div style="font-family:sans-serif; font-size:12px; line-height:1.4;">
          <b style="color:#0f172a;">${log.name}</b><br>
          <span style="color:#64748b; font-size:11px;">NIP: ${log.nip}</span><br>
          <span style="display:inline-block; margin-top:4px; padding:2px 6px; border-radius:10px; background:${log.status === 'hadir' ? '#ecfdf5' : '#fffbeb'}; color:${markerColor}; font-weight:700; font-size:10px;">
            ${log.status.toUpperCase()} • Masuk: ${log.masuk}
          </span>
        </div>
      `);
  });
}

/* ─── LIVE ATTENDANCE FEED ─── */
function renderLiveFeed() {
  const feedList = document.getElementById('liveFeedList');
  if (!feedList) return;
  feedList.innerHTML = '';

  TODAY_ATTENDANCE_LOGS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'feed-item-card';
    card.innerHTML = `
      <img src="${item.photo}" alt="${item.name}" class="feed-avatar-img" />
      <div class="feed-info-col">
        <div class="feed-guru-name">${item.name}</div>
        <div class="feed-guru-meta">Masuk: <b>${item.masuk}</b> &bull; Pulang: <b>${item.pulang}</b></div>
      </div>
      <span class="feed-status-badge ${item.status}">${item.status === 'hadir' ? 'Hadir Tepat Waktu' : (item.status === 'terlambat' ? 'Terlambat' : 'Izin')}</span>
    `;
    feedList.appendChild(card);
  });
}

/* ═════════════════════════════════════════════
   ACC AKUN GURU BARU (VERIFIKASI & APPROVAL)
═════════════════════════════════════════════ */
function renderPendingTeachers() {
  const teachers = getRegisteredTeachers();
  const pending = teachers.filter(t => t.accountStatus === 'pending_approval');
  const tableBody = document.getElementById('pendingTeachersTableBody');
  const badgeCount = document.getElementById('badgePendingCount');
  const emptyBox = document.getElementById('pendingEmptyState');
  const tableWrapper = document.getElementById('pendingTableWrapper');

  if (badgeCount) {
    badgeCount.textContent = pending.length;
    badgeCount.style.display = pending.length > 0 ? 'inline-block' : 'none';
  }

  if (!tableBody) return;
  tableBody.innerHTML = '';

  if (pending.length === 0) {
    if (emptyBox) emptyBox.style.display = 'flex';
    if (tableWrapper) tableWrapper.style.display = 'none';
    return;
  }

  if (emptyBox) emptyBox.style.display = 'none';
  if (tableWrapper) tableWrapper.style.display = 'block';

  pending.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="teacher-identity-cell">
          <img src="${t.photo || 'assets/img/profile-diah.jpg'}" alt="${t.name}" class="teacher-avatar-circle" />
          <div>
            <div class="teacher-name-strong">${t.name}</div>
            <div class="teacher-nip-small">NIP: ${t.nip}</div>
          </div>
        </div>
      </td>
      <td><b>${t.mapel || '-'}</b><br><span style="font-size:11px; color:#64748b;">NUPTK: ${t.nuptk || '-'}</span></td>
      <td><span class="badge-tag-pill">${t.status || 'PNS'}</span></td>
      <td>${t.email}<br><span style="font-size:11px; color:#64748b;">${t.phone || '-'}</span></td>
      <td>
        <div class="action-buttons-group">
          <button class="btn-acc-action approve" onclick="approveTeacherAccount('${t.id || t.nip}')">
            ✓ Setujui (ACC)
          </button>
          <button class="btn-acc-action reject" onclick="rejectTeacherAccount('${t.id || t.nip}')">
            ✕ Tolak
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

window.approveTeacherAccount = function (idOrNip) {
  const teachers = getRegisteredTeachers();
  const idx = teachers.findIndex(t => (t.id === idOrNip || t.nip === idOrNip));
  if (idx !== -1) {
    teachers[idx].accountStatus = 'approved';
    teachers[idx].approvedAt = new Date().toISOString();
    saveRegisteredTeachers(teachers);
    showAdminToast(`✅ Akun guru <b>${teachers[idx].name}</b> berhasil di-ACC! Guru kini sudah dapat login.`, 'success');
    renderPendingTeachers();
    renderMasterTeachers();
    updateHeaderNotificationBadge();
    renderNotifModalContent();
  }
};

window.rejectTeacherAccount = function (idOrNip) {
  if (!confirm('Apakah Anda yakin ingin menolak permohonan akun guru ini?')) return;
  const teachers = getRegisteredTeachers();
  const idx = teachers.findIndex(t => (t.id === idOrNip || t.nip === idOrNip));
  if (idx !== -1) {
    teachers[idx].accountStatus = 'rejected';
    saveRegisteredTeachers(teachers);
    showAdminToast(`Permohonan akun <b>${teachers[idx].name}</b> telah ditolak.`, 'error');
    renderPendingTeachers();
    renderMasterTeachers();
    updateHeaderNotificationBadge();
    renderNotifModalContent();
  }
};

/* ═════════════════════════════════════════════
   PENGAJUAN & DISPOSISI IZIN / SAKIT / DINAS
   (Wewenang Persetujuan Resmi oleh Kepala Sekolah)
═════════════════════════════════════════════ */
const DUMMY_LEAVE_REQUESTS = [
  { id: 'IZN-2026-001', guruName: 'Ibu Diah Safitri, S.Pd', nip: '19890412 201402 2 003', type: 'Dinas Luar', mulai: '2026-08-25', selesai: '2026-08-26', ket: 'Workshop Implementasi Kurikulum Merdeka di Balai Guru Penggerak', status: 'pending', file: 'Surat_Tugas_Dinas.pdf' },
  { id: 'IZN-2026-002', guruName: 'Bpk. Ahmad Fauzi, M.Pd', nip: '19850615 201001 1 012', type: 'Sakit', mulai: '2026-08-22', selesai: '2026-08-23', ket: 'Demam tinggi dan istirahat dokter 2 hari', status: 'pending', file: 'Surat_Keterangan_Dokter.jpg' },
  { id: 'IZN-2026-003', guruName: 'Ibu Siti Nurhaliza, S.Si', nip: '19920820 201903 2 018', type: 'Izin Pribadi', mulai: '2026-08-14', selesai: '2026-08-14', ket: 'Acara keluarga mendesak', status: 'approved', file: null }
];

function getLeaveRequests() {
  const local = JSON.parse(localStorage.getItem('teacher_pengajuan_admin') || 'null');
  if (!local) {
    localStorage.setItem('teacher_pengajuan_admin', JSON.stringify(DUMMY_LEAVE_REQUESTS));
    return DUMMY_LEAVE_REQUESTS;
  }
  return local;
}

function saveLeaveRequests(data) {
  localStorage.setItem('teacher_pengajuan_admin', JSON.stringify(data));
}

function getCurrentUserRole() {
  const sessionUser = JSON.parse(sessionStorage.getItem('presensi_user') || 'null');
  if (sessionUser && (sessionUser.role === 'Kepala Sekolah' || sessionUser.username === 'kepala_sekolah' || (sessionUser.name && sessionUser.name.toLowerCase().includes('bambang')))) {
    return 'Kepala Sekolah';
  }
  return 'Admin';
}

function renderLeaveRequests() {
  const requests = getLeaveRequests();
  const tableBody = document.getElementById('leaveRequestsTableBody');
  const badgeCount = document.getElementById('badgeIzinCount');
  const userRole = getCurrentUserRole();

  const pendingCount = userRole === 'Kepala Sekolah'
    ? requests.filter(r => r.status === 'forwarded_to_kepsek' || r.status === 'pending').length
    : requests.filter(r => r.status === 'pending').length;

  if (badgeCount) {
    badgeCount.textContent = pendingCount;
    badgeCount.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }

  updateHeaderNotificationBadge();

  if (!tableBody) return;
  tableBody.innerHTML = '';

  requests.forEach(r => {
    const tr = document.createElement('tr');
    
    // Status text & badge
    let statusBadgeHtml = '';
    if (r.status === 'approved') {
      statusBadgeHtml = `<span class="feed-status-badge hadir" style="font-weight:700;">✓ Disetujui Kepsek</span>`;
    } else if (r.status === 'rejected') {
      statusBadgeHtml = `<span class="feed-status-badge izin" style="font-weight:700;">✕ Ditolak Kepsek</span>`;
    } else if (r.status === 'forwarded_to_kepsek') {
      statusBadgeHtml = `<span class="feed-status-badge" style="background:#eff6ff; color:#1d4ed8; font-weight:700; border:1px solid #bfdbfe;">📤 Diteruskan ke Kepsek</span>`;
    } else {
      statusBadgeHtml = `<span class="feed-status-badge terlambat" style="font-weight:700;">🟡 Perlu Diajukan Admin</span>`;
    }

    // Action buttons based on active user role
    let actionButtonsHtml = '';
    if (userRole === 'Kepala Sekolah') {
      // ─── KEPALA SEKOLAH VIEW: Hak Otoritas ACC & TOLAK ───
      if (r.status === 'forwarded_to_kepsek' || r.status === 'pending') {
        actionButtonsHtml = `
          <div class="action-buttons-group">
            <button class="btn-acc-action" style="background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; padding:6px 10px; font-size:11.5px;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas Lampiran">
              📥 Unduh
            </button>
            <button class="btn-acc-action approve" style="padding:6px 12px; font-size:11.5px;" onclick="kepsekApproveLeave('${r.id}')" title="Setujui Permohonan (ACC Resmi)">
              ✓ ACC
            </button>
            <button class="btn-acc-action reject" style="padding:6px 10px; font-size:11.5px;" onclick="kepsekRejectLeave('${r.id}')" title="Tolak Permohonan">
              ✕ Tolak
            </button>
          </div>
        `;
      } else {
        actionButtonsHtml = `
          <div class="action-buttons-group">
            <button class="btn-acc-action" style="background:#f8fafc; color:#334155; border:1px solid #e2e8f0; padding:6px 10px; font-size:11.5px;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Dokumen Arsip">
              📥 Unduh
            </button>
            <span style="font-size:11px; font-weight:700; color:${r.status === 'approved' ? '#059669' : '#dc2626'};">
              ${r.status === 'approved' ? '✓ Telah Di-ACC' : '✕ Telah Ditolak'}
            </span>
          </div>
        `;
      }
    } else {
      // ─── ADMIN VIEW: Unduh Arsip & Ajukan ke Kepala Sekolah ───
      if (r.status === 'pending') {
        actionButtonsHtml = `
          <div class="action-buttons-group">
            <button class="btn-acc-action" style="background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; padding:6px 10px; font-size:11.5px;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas Arsip Pengajuan">
              📥 Unduh Arsip
            </button>
            <button class="btn-acc-action approve" style="padding:6px 12px; font-size:11.5px;" onclick="forwardLeaveToPrincipal('${r.id}')" title="Ajukan berkas ke Kepala Sekolah untuk disetujui">
              📤 Ajukan ke Kepsek
            </button>
          </div>
        `;
      } else if (r.status === 'forwarded_to_kepsek') {
        actionButtonsHtml = `
          <div class="action-buttons-group">
            <button class="btn-acc-action" style="background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; padding:6px 10px; font-size:11.5px;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas Arsip Pengajuan">
              📥 Unduh Arsip
            </button>
            <span style="font-size:11px; color:#1d4ed8; font-weight:700; background:#eff6ff; padding:3px 8px; border-radius:4px; border:1px solid #bfdbfe;">
              ⏳ Menunggu ACC di Akun Kepsek
            </span>
          </div>
        `;
      } else {
        actionButtonsHtml = `
          <div class="action-buttons-group">
            <button class="btn-acc-action" style="background:#f8fafc; color:#334155; border:1px solid #e2e8f0; padding:6px 10px; font-size:11.5px;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Dokumen Arsip">
              📥 Unduh Arsip
            </button>
            <span style="font-size:11px; color:#64748b; margin-left:4px;">Arsip Disimpan</span>
          </div>
        `;
      }
    }

    tr.innerHTML = `
      <td><b>${r.id}</b></td>
      <td><b>${r.guruName}</b><br><span style="font-size:11px; color:#64748b;">NIP: ${r.nip}</span></td>
      <td><span class="badge-tag-pill">${r.type}</span></td>
      <td>${r.mulai} s/d ${r.selesai}</td>
      <td style="max-width:240px; font-size:11.5px; color:#334155;">
        ${r.ket}
        ${r.file ? `<div style="margin-top:4px;"><a href="javascript:void(0)" onclick="downloadLeaveDocument('${r.id}')" style="color:#059669; font-weight:700; font-size:11px; text-decoration:underline;">📎 ${r.file}</a></div>` : ''}
      </td>
      <td>${statusBadgeHtml}</td>
      <td>${actionButtonsHtml}</td>
    `;
    tableBody.appendChild(tr);
  });
}

window.forwardLeaveToPrincipal = function (id) {
  const reqs = getLeaveRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx !== -1) {
    reqs[idx].status = 'forwarded_to_kepsek';
    reqs[idx].forwardedAt = new Date().toISOString();
    saveLeaveRequests(reqs);
    showAdminToast(`📤 Berkas permohonan <b>${reqs[idx].guruName}</b> berhasil diajukan ke Kepala Sekolah! Kepala Sekolah dapat melakukan ACC / Tolak di akun Kepala Sekolah.`, 'success');
    renderLeaveRequests();
    updateHeaderNotificationBadge();
    renderNotifModalContent();
  }
};

window.kepsekApproveLeave = function (id) {
  const reqs = getLeaveRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx !== -1) {
    reqs[idx].status = 'approved';
    reqs[idx].approvedByKepsekAt = new Date().toISOString();
    saveLeaveRequests(reqs);
    showAdminToast(`✅ Permohonan <b>${reqs[idx].guruName}</b> telah resmi DISETUJUI (ACC) oleh Kepala Sekolah!`, 'success');
    renderLeaveRequests();
    updateHeaderNotificationBadge();
    renderNotifModalContent();
  }
};

window.kepsekRejectLeave = function (id) {
  if (!confirm('Apakah Anda yakin ingin MENOLAK permohonan izin/dinas ini?')) return;
  const reqs = getLeaveRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx !== -1) {
    reqs[idx].status = 'rejected';
    reqs[idx].rejectedByKepsekAt = new Date().toISOString();
    saveLeaveRequests(reqs);
    showAdminToast(`❌ Permohonan <b>${reqs[idx].guruName}</b> telah DITOLAK oleh Kepala Sekolah.`, 'error');
    renderLeaveRequests();
    updateHeaderNotificationBadge();
    renderNotifModalContent();
  }
};

window.downloadLeaveDocument = function (id) {
  const reqs = getLeaveRequests();
  const req = reqs.find(r => r.id === id);
  if (!req) return;

  const kop = getSchoolKopSettings();
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showAdminToast(`📥 Dokumen arsip permohonan <b>${req.id}</b> berhasil diunduh.`, 'success');
    return;
  }

  const statusText = req.status === 'approved' 
    ? 'DISETUJUI OLEH KEPALA SEKOLAH' 
    : (req.status === 'rejected' 
        ? 'DITOLAK OLEH KEPALA SEKOLAH' 
        : (req.status === 'forwarded_to_kepsek' 
            ? 'SEDANG DIAJUKAN KE KEPALA SEKOLAH (MENUNGGU ACC KEPSEK)' 
            : 'DIVERIFIKASI ADMINISTRATOR — MENUNGGU DIAJUKAN KE KEPALA SEKOLAH'));
  
  const statusColor = req.status === 'approved' ? '#059669' : (req.status === 'rejected' ? '#dc2626' : '#d97706');

  // Generate simulated attachment document for Page 2
  let attachmentContentHtml = '';
  if (req.type === 'Dinas Luar' || (req.file && req.file.toLowerCase().includes('dinas'))) {
    attachmentContentHtml = `
      <div class="attachment-doc-card">
        <div class="attach-header">
          <div class="attach-title">PEMERINTAH PROVINSI JAWA TIMUR</div>
          <div class="attach-sub">BALAI GURU PENGGERAK (BGP) PROVINSI JAWA TIMUR</div>
          <div class="attach-addr">Jl. Ketintang Wiyata No. 15, Gayungan, Surabaya — Telp. (031) 8290012</div>
          <div style="border-bottom: 2px solid #000; margin: 8px 0 14px;"></div>
        </div>

        <div style="text-align: center; font-weight: bold; font-size: 11.5pt; text-decoration: underline;">SURAT PERINTAH TUGAS (SPT)</div>
        <div style="text-align: center; font-size: 9.5pt; margin-bottom: 14px;">Nomor: 800/1429/BGP-JATIM/VIII/${new Date().getFullYear()}</div>

        <p style="font-size: 10pt; text-align: justify; margin-bottom: 10px;">
          Kepala Balai Guru Penggerak Provinsi Jawa Timur dengan ini menugaskan tenaga pendidik yang namanya tersebut di bawah ini:
        </p>

        <table style="width: 100%; font-size: 10pt; margin-bottom: 12px; border-collapse: collapse;">
          <tr><td style="width: 150px; font-weight: bold; padding: 3px 0;">Nama Lengkap</td><td>: <b>${req.guruName}</b></td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">NIP</td><td>: ${req.nip}</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Instansi Sekolah</td><td>: SMP Negeri 1 Surabaya</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Agenda Kegiatan</td><td>: <b>${req.ket}</b></td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Waktu Pelaksanaan</td><td>: ${req.mulai} s/d ${req.selesai} (08.00 s/d 14.00 WIB)</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Tempat / Lokasi</td><td>: Gedung Balai Guru Penggerak (BGP) Jatim</td></tr>
        </table>

        <p style="font-size: 10pt; text-align: justify; margin-bottom: 16px;">
          Demikian surat tugas ini diterbitkan untuk dilaksanakan dengan penuh rasa tanggung jawab dan membuat laporan pelaksanaan tugas setelah kegiatan selesai.
        </p>

        <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
          <div style="text-align: center; width: 230px; font-size: 10pt;">
            <div>Surabaya, 20 Agustus 2026</div>
            <div>Kepala Balai Guru Penggerak Jatim,</div>
            <div style="height: 50px; display: flex; align-items: center; justify-content: center; position: relative;">
              <div style="border: 2px dashed #059669; color: #059669; padding: 3px 8px; font-size: 8pt; font-weight: bold; transform: rotate(-6deg); border-radius: 4px;">
                TERTANDATANGAN DIGITAL RESMI
              </div>
            </div>
            <b><u>Dra. Hj. Sri Wahyuningsih, M.Pd</u></b><br>
            <span>NIP. 19710815 199702 2 001</span>
          </div>
        </div>
      </div>
    `;
  } else if (req.type === 'Sakit' || (req.file && req.file.toLowerCase().includes('dokter'))) {
    attachmentContentHtml = `
      <div class="attachment-doc-card">
        <div class="attach-header">
          <div class="attach-title">RUMAH SAKIT UMUM DAERAH DR. SOETOMO</div>
          <div class="attach-sub">INSTALASI RAWAT JALAN & KLINIK KESEHATAN</div>
          <div class="attach-addr">Jl. Mayjen Prof. Dr. Moestopo No. 6-8, Surabaya — Telp. (031) 5501078</div>
          <div style="border-bottom: 2px solid #000; margin: 8px 0 14px;"></div>
        </div>

        <div style="text-align: center; font-weight: bold; font-size: 11.5pt; text-decoration: underline;">SURAT KETERANGAN ISTIRAHAT SAKIT</div>
        <div style="text-align: center; font-size: 9.5pt; margin-bottom: 14px;">Nomor: SKD/08/2026/0412</div>

        <p style="font-size: 10pt; text-align: justify; margin-bottom: 10px;">
          Yang bertanda tangan di bawah ini, Dokter Pemeriksa RSUD Dr. Soetomo Surabaya menerangkan dengan sesungguhnya bahwa:
        </p>

        <table style="width: 100%; font-size: 10pt; margin-bottom: 12px; border-collapse: collapse;">
          <tr><td style="width: 150px; font-weight: bold; padding: 3px 0;">Nama Pasien</td><td>: <b>${req.guruName}</b></td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">NIP / ID</td><td>: ${req.nip}</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Pekerjaan / Instansi</td><td>: Tenaga Pendidik / Guru SMPN 1 Surabaya</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Diagnosa Medis</td><td>: <i>Febris e.c Suspect Viral Infection / Butuh Istirahat</i></td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Keterangan Istirahat</td><td>: <b>2 (dua) hari</b> terhitung ${req.mulai} s/d ${req.selesai}</td></tr>
        </table>

        <p style="font-size: 10pt; text-align: justify; margin-bottom: 16px;">
          Berhubung dalam keadaan sakit, pasien yang bersangkutan memerlukan istirahat medis dan dianjurkan tidak melakukan aktivitas kerja terlebih dahulu.
        </p>

        <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
          <div style="text-align: center; width: 230px; font-size: 10pt;">
            <div>Surabaya, ${req.mulai}</div>
            <div>Dokter Pemeriksa,</div>
            <div style="height: 50px; display: flex; align-items: center; justify-content: center;">
              <div style="border: 2px dashed #0284c7; color: #0284c7; padding: 3px 8px; font-size: 8pt; font-weight: bold; transform: rotate(-5deg); border-radius: 4px;">
                CAP KLINIK & TTD RESMI
              </div>
            </div>
            <b><u>dr. Farhan Pratama, Sp.PD</u></b><br>
            <span>SIP. 503/4412/SIP-D/2022</span>
          </div>
        </div>
      </div>
    `;
  } else {
    attachmentContentHtml = `
      <div class="attachment-doc-card">
        <div class="attach-header">
          <div class="attach-title">SURAT PERMOHONAN IZIN KETIDAKHADIRAN TERTULIS</div>
          <div class="attach-sub">TENAGA PENDIDIK SMP NEGERI 1 SURABAYA</div>
          <div style="border-bottom: 2px solid #000; margin: 8px 0 14px;"></div>
        </div>

        <div style="font-size: 10pt; margin-bottom: 12px;">
          Kepada Yth.<br>
          <b>Bapak Kepala SMP Negeri 1 Surabaya</b><br>
          di Tempat
        </div>

        <p style="font-size: 10pt; text-align: justify; margin-bottom: 10px;">
          Dengan hormat, saya yang bertanda tangan di bawah ini:
        </p>

        <table style="width: 100%; font-size: 10pt; margin-bottom: 12px; border-collapse: collapse;">
          <tr><td style="width: 150px; font-weight: bold; padding: 3px 0;">Nama Lengkap</td><td>: <b>${req.guruName}</b></td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">NIP</td><td>: ${req.nip}</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Jenis Permohonan</td><td>: <b>${req.type}</b></td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Alasan Permohonan</td><td>: ${req.ket}</td></tr>
          <tr><td style="font-weight: bold; padding: 3px 0;">Jadwal Izin</td><td>: ${req.mulai} s/d ${req.selesai}</td></tr>
        </table>

        <p style="font-size: 10pt; text-align: justify; margin-bottom: 16px;">
          Bermaksud memohon izin tidak dapat hadir bertugas pada tanggal tersebut di atas karena keperluan yang bersangkutan. Tugas mandiri untuk siswa dan koordinasi dengan guru piket telah disiapkan.
        </p>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
          <div style="text-align: center; width: 220px; font-size: 10pt;">
            <div>Surabaya, ${req.mulai}</div>
            <div>Pemohon / Guru Bersangkutan,</div>
            <div style="height: 50px; display: flex; align-items: center; justify-content: center;">
              <div style="border: 2px dashed #059669; color: #059669; padding: 3px 8px; font-size: 8pt; font-weight: bold; border-radius: 4px;">
                TTD PEMOHON
              </div>
            </div>
            <b><u>${req.guruName}</u></b><br>
            <span>NIP: ${req.nip}</span>
          </div>
        </div>
      </div>
    `;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Berkas Permohonan & Lampiran - ${req.id} - ${req.guruName}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm 15mm;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          color: #000;
          background: #e2e8f0;
          line-height: 1.35;
          font-size: 11pt;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print-bar {
          background: #0f172a;
          color: #fff;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 999;
          font-family: sans-serif;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .btn-print-action {
          background: #059669;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-print-action:hover {
          background: #047857;
        }
        .paper-container {
          max-width: 210mm;
          margin: 15px auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .print-page {
          background: #ffffff;
          width: 210mm;
          min-height: 297mm;
          padding: 14mm 16mm;
          margin: 0 auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        
        /* ── KOP SURAT ── */
        .kop-table {
          width: 100%;
          border-bottom: 2.5px double #000;
          padding-bottom: 8px;
          margin-bottom: 12px;
          border-collapse: collapse;
        }
        .kop-logo-box {
          width: 68px;
          text-align: center;
          vertical-align: middle;
        }
        .kop-text-box {
          text-align: center;
          vertical-align: middle;
        }
        .kop-gov { font-size: 11.5pt; font-weight: bold; }
        .kop-dept { font-size: 11.5pt; font-weight: bold; }
        .kop-school { font-size: 14pt; font-weight: bold; margin: 1px 0; }
        .kop-addr { font-size: 8.5pt; font-style: italic; }

        /* ── PAGE 1 CONTENT ── */
        .doc-title-main {
          text-align: center;
          font-size: 12.5pt;
          font-weight: bold;
          text-decoration: underline;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .doc-reg-num {
          text-align: center;
          font-size: 9.5pt;
          margin-bottom: 10px;
        }
        .doc-intro {
          font-size: 10.5pt;
          margin-bottom: 8px;
        }
        .data-table-form {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
          font-size: 10.5pt;
        }
        .data-table-form td {
          padding: 3.5px 2px;
          vertical-align: top;
        }
        .data-table-form td.label {
          width: 200px;
          font-weight: bold;
        }
        .status-box-highlight {
          border: 1.5px solid ${statusColor};
          color: ${statusColor};
          background: #fdfdfd;
          padding: 6px 12px;
          text-align: center;
          font-weight: bold;
          font-size: 10pt;
          border-radius: 6px;
          margin: 8px 0;
        }
        .sop-note-box {
          font-size: 8.5pt;
          font-style: italic;
          color: #334155;
          line-height: 1.3;
          margin-bottom: 8px;
          background: #f8fafc;
          border-left: 3px solid #059669;
          padding: 5px 8px;
        }
        .sign-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 8px;
          font-size: 10pt;
        }
        .sign-column {
          text-align: center;
        }
        .sign-gap {
          height: 48px;
        }
        .page-footer-num {
          font-size: 8pt;
          color: #94a3b8;
          text-align: right;
          border-top: 1px solid #e2e8f0;
          padding-top: 4px;
          margin-top: 6px;
          font-family: sans-serif;
        }

        /* ── PAGE 2 LAMPIRAN ── */
        .page-2-header {
          border-bottom: 2px solid #000;
          padding-bottom: 6px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .page-2-title {
          font-size: 12pt;
          font-weight: bold;
          text-transform: uppercase;
        }
        .page-2-meta {
          font-size: 8.5pt;
          color: #334155;
        }
        .attachment-doc-card {
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 16px 20px;
          background: #ffffff;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.02);
          margin-bottom: 14px;
          font-size: 10pt;
        }
        .attach-header {
          text-align: center;
        }
        .attach-title { font-size: 10.5pt; font-weight: bold; }
        .attach-sub { font-size: 11pt; font-weight: bold; margin: 1px 0; }
        .attach-addr { font-size: 8pt; font-style: italic; color: #475569; }
        .verification-stamp-box {
          border: 1px dashed #059669;
          background: #f0fdf4;
          padding: 8px 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 8.5pt;
          color: #065f46;
          margin-top: auto;
          font-family: sans-serif;
        }

        @media print {
          body {
            background: #fff;
          }
          .no-print-bar {
            display: none !important;
          }
          .paper-container {
            margin: 0;
            max-width: 100%;
            gap: 0;
          }
          .print-page {
            box-shadow: none;
            margin: 0;
            width: 100%;
            min-height: 100vh;
            page-break-after: always;
            break-after: page;
          }
          .print-page.page-2 {
            page-break-before: always;
            break-before: page;
          }
        }
      </style>
    </head>
    <body>

      <!-- Top Action Bar for Browser -->
      <div class="no-print-bar">
        <div>
          <b>📄 DOKUMEN DISPOSISI & LAMPIRAN RESMI</b> &bull; Reg: ${req.id} (${req.guruName})
        </div>
        <button class="btn-print-action" onclick="window.print()">
          🖨️ Cetak / Unduh Dokumen Resmi (PDF)
        </button>
      </div>

      <div class="paper-container">

        <!-- ════════════════════════════════════════
             HALAMAN 1: LEMBAR DISPOSISI & PERMOHONAN
        ════════════════════════════════════════ -->
        <div class="print-page">
          
          <div>
            <!-- KOP SURAT RESMI -->
            <table class="kop-table">
              <tr>
                <td class="kop-logo-box">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="46" fill="#059669" stroke="#047857" stroke-width="3"/>
                    <circle cx="50" cy="50" r="39" fill="#ffffff" stroke="#fbbf24" stroke-width="2"/>
                    <path d="M50 18 L54 30 L66 32 L57 41 L59 53 L50 47 L41 53 L43 41 L34 32 L46 30 Z" fill="#f59e0b"/>
                    <path d="M28 66 C28 54 72 54 72 66 C62 74 38 74 28 66 Z" fill="#059669"/>
                    <path d="M34 58 L50 50 L66 58 L50 64 Z" fill="#1d4ed8"/>
                    <text x="50" y="82" font-family="Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#064e3b" text-anchor="middle">SMPN 1 SURABAYA</text>
                  </svg>
                </td>
                <td class="kop-text-box">
                  <div class="kop-gov">${(kop.gov || 'PEMERINTAH KOTA SURABAYA').toUpperCase()}</div>
                  <div class="kop-dept">${(kop.dept || 'DINAS PENDIDIKAN').toUpperCase()}</div>
                  <div class="kop-school">${(kop.schoolName || 'SEKOLAH MENENGAH PERTAMA NEGERI 1 SURABAYA').toUpperCase()}</div>
                  <div class="kop-addr">${kop.address || 'Jalan Pacar No. 4-6, Telepon (031) 5342158, Email: info@smpn1surabaya.sch.id'}</div>
                </td>
              </tr>
            </table>

            <!-- JUDUL DOKUMEN -->
            <div class="doc-title-main">LEMBAR DISPOSISI & PERMOHONAN ${req.type.toUpperCase()}</div>
            <div class="doc-reg-num">Nomor Registrasi Sistem: <b>${req.id}/SMPN1/IZN/${new Date().getFullYear()}</b></div>

            <p class="doc-intro">
              Telah diajukan permohonan ketidakhadiran / tugas kedinasan tenaga pendidik dengan rincian data sebagai berikut:
            </p>

            <!-- DATA TABLE -->
            <table class="data-table-form">
              <tr>
                <td class="label">Nama Guru / Pegawai</td>
                <td>: <b>${req.guruName}</b></td>
              </tr>
              <tr>
                <td class="label">NIP</td>
                <td>: ${req.nip}</td>
              </tr>
              <tr>
                <td class="label">Jenis Permohonan</td>
                <td>: <b>${req.type}</b></td>
              </tr>
              <tr>
                <td class="label">Rentang Waktu / Tanggal</td>
                <td>: <b>${req.mulai} s/d ${req.selesai}</b></td>
              </tr>
              <tr>
                <td class="label">Alasan / Uraian Penugasan</td>
                <td>: ${req.ket}</td>
              </tr>
              <tr>
                <td class="label">Berkas Dokumen Lampiran</td>
                <td>: <b>${req.file || 'Surat Pendukung Terlampir'}</b> <span style="font-size:8.5pt; color:#059669; font-weight:bold;">(Lihat Berkas pada Halaman 2)</span></td>
              </tr>
              <tr>
                <td class="label">Tanggal Registrasi Sistem</td>
                <td>: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
            </table>

            <!-- STATUS BOX -->
            <div class="status-box-highlight">
              STATUS PERMOHONAN: ${statusText}
            </div>

            <!-- SOP NOTICE -->
            <div class="sop-note-box">
              <b>Catatan SOP Kepegawaian:</b> Berdasarkan peraturan sekolah, hak persetujuan resmi (ACC / Tolak) berada pada <b>Kepala Sekolah</b>. Lembar ini digunakan sebagai bukti pengajuan, verifikasi administrasi, dan arsip kepegawaian.
            </div>
          </div>

          <!-- SIGNATURES (AT THE BOTTOM OF PAGE 1) -->
          <div>
            <div class="sign-wrapper">
              <div class="sign-column">
                <div>Petugas Verifikasi Administrasi,</div>
                <div class="sign-gap"></div>
                <b><u>Ibu Diah Safitri, S.Pd</u></b><br>
                <span style="font-size: 8.5pt;">NIP. 19890412 201402 2 003</span>
              </div>
              <div class="sign-column">
                <div>Mengetahui & Menyetujui,<br>Kepala SMP Negeri 1 Surabaya</div>
                <div class="sign-gap"></div>
                <b><u>${kop.kepsekName || 'Dr. H. Bambang Sudarsono, M.Pd'}</u></b><br>
                <span style="font-size: 8.5pt;">NIP. ${kop.kepsekNip || '19680315 199412 1 002'}</span>
              </div>
            </div>

            <div class="page-footer-num">
              Halaman 1 dari 2 &bull; Dokumen Resmi SMP Negeri 1 Surabaya &bull; Portal Presensi & Kepegawaian
            </div>
          </div>

        </div>

        <!-- ════════════════════════════════════════
             HALAMAN 2: BERKAS DOKUMEN BUKTI LAMPIRAN
        ════════════════════════════════════════ -->
        <div class="print-page page-2">
          
          <div>
            <!-- PAGE 2 HEADER -->
            <div class="page-2-header">
              <div>
                <div class="page-2-title">LAMPIRAN BUKTI DOKUMEN PENDUKUNG</div>
                <div class="page-2-meta">Salinan Berkas Surat / Keterangan Resmi yang Diunggah oleh Pemohon</div>
              </div>
              <div style="text-align: right; font-size: 8.5pt; color: #475569;">
                <b>No. Reg:</b> ${req.id}<br>
                <b>Pemohon:</b> ${req.guruName}
              </div>
            </div>

            <!-- EMBEDDED EVIDENCE ATTACHMENT CARD -->
            ${attachmentContentHtml}
          </div>

          <!-- VERIFICATION STAMP AT BOTTOM OF PAGE 2 -->
          <div>
            <div class="verification-stamp-box">
              <span style="font-size: 18px;">🛡️</span>
              <div>
                <b>Verifikasi Keaslian Berkas Digital:</b> Dokumen bukti pendukung di atas telah diperiksa dan dinyatakan sesuai dengan pengajuan presensi & izin kepegawaian SMP Negeri 1 Surabaya.
              </div>
            </div>

            <div class="page-footer-num">
              Halaman 2 dari 2 &bull; Lampiran Dokumen Bukti &bull; SMP Negeri 1 Surabaya
            </div>
          </div>

        </div>

      </div>

    </body>
    </html>
  `);
  printWindow.document.close();
  showAdminToast(`📥 Dokumen arsip permohonan <b>${req.guruName}</b> (2 Halaman Lengkap) siap dicetak/disimpan.`, 'success');
};

/* ═════════════════════════════════════════════
   MASTER GURU & REKAP DATA
═════════════════════════════════════════════ */
function renderMasterTeachers() {
  const teachers = getRegisteredTeachers();
  const tableBody = document.getElementById('masterTeachersTableBody');
  const searchInput = document.getElementById('searchTeacherInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (!tableBody) return;
  tableBody.innerHTML = '';

  const filtered = teachers.filter(t => {
    return t.name.toLowerCase().includes(query) || (t.nip && t.nip.includes(query)) || (t.mapel && t.mapel.toLowerCase().includes(query));
  });

  const activeCount = teachers.filter(t => t.accountStatus === 'approved').length;
  const statEl = document.getElementById('statTotalGuru');
  if (statEl) statEl.textContent = activeCount;

  const countBadge = document.querySelector('.admin-card-header .badge-tag-pill, .admin-card-header span');
  const countTextEl = document.querySelector('#pageMasterGuru .admin-card-title + p');

  filtered.forEach(t => {
    const isApproved = t.accountStatus === 'approved';
    const isInactive = t.accountStatus === 'inactive';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="teacher-identity-cell">
          <img src="${t.photo || 'assets/img/profile-diah.jpg'}" alt="${t.name}" class="teacher-avatar-circle" style="${isInactive ? 'filter:grayscale(100%); opacity:0.6;' : ''}" />
          <div>
            <div class="teacher-name-strong" style="${isInactive ? 'text-decoration:line-through; color:#94a3b8;' : ''}">${t.name}</div>
            <div class="teacher-nip-small">NIP: ${t.nip}</div>
          </div>
        </div>
      </td>
      <td>${t.mapel || '-'}</td>
      <td><span class="badge-tag-pill">${t.status || 'PNS'}</span></td>
      <td>${t.email}</td>
      <td>
        <span class="feed-status-badge ${isApproved ? 'hadir' : (isInactive ? 'izin' : 'terlambat')}">
          ${isApproved ? 'Aktif' : (isInactive ? 'Nonaktif' : 'Menunggu ACC')}
        </span>
      </td>
      <td>
        <div class="action-buttons-group">
          ${isInactive ? `
            <button class="btn-acc-action approve" style="padding:6px 10px; font-size:11.5px;" onclick="toggleTeacherStatus('${t.nip}', 'approved')" title="Aktifkan Kembali Akun">
              ▶️ Aktifkan
            </button>
          ` : `
            <button class="btn-acc-action" style="background:#fffbeb; color:#d97706; border:1px solid #fde68a; padding:6px 10px; font-size:11.5px;" onclick="toggleTeacherStatus('${t.nip}', 'inactive')" title="Nonaktifkan Sementara">
              ⏸️ Nonaktifkan
            </button>
          `}
          <button class="btn-acc-action reject" style="padding:6px 10px; font-size:11.5px;" onclick="deleteTeacherAccount('${t.nip}', '${t.name}')" title="Hapus Akun Permanen (Resign / Mutasi)">
            🗑️ Hapus Akun
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

window.toggleTeacherStatus = function (nip, newStatus) {
  let teachers = getRegisteredTeachers();
  const idx = teachers.findIndex(t => t.nip === nip);
  if (idx === -1) return;

  teachers[idx].accountStatus = newStatus;
  saveRegisteredTeachers(teachers);

  if (newStatus === 'inactive') {
    showAdminToast(`⏸️ Akun <b>${teachers[idx].name}</b> telah dinonaktifkan. Akses login guru ditutup.`, 'error');
  } else {
    showAdminToast(`▶️ Akun <b>${teachers[idx].name}</b> telah diaktifkan kembali.`, 'success');
  }

  renderMasterTeachers();
  renderPendingTeachers();
};

window.deleteTeacherAccount = function (nip, name) {
  if (!confirm(`⚠️ PERINGATAN HAPUS AKUN:\n\nApakah Anda yakin ingin menghapus akun "${name}" secara permanen?\n\nAkun guru yang resign/pindah tugas akan dihapus dari sistem presensi dan tidak dapat login lagi.`)) {
    return;
  }

  let teachers = getRegisteredTeachers();
  teachers = teachers.filter(t => t.nip !== nip);
  saveRegisteredTeachers(teachers);

  showAdminToast(`🗑️ Akun <b>${name}</b> telah dihapus permanen dari sistem sekolah.`, 'error');
  renderMasterTeachers();
  renderPendingTeachers();
};

const searchInput = document.getElementById('searchTeacherInput');
if (searchInput) {
  searchInput.addEventListener('input', renderMasterTeachers);
}

/* ═════════════════════════════════════════════
   MANAJEMEN KEGIATAN & TITIK ACARA SEKOLAH
═════════════════════════════════════════════ */
function renderAdminEvents() {
  const events = getSchoolEvents();
  const tableBody = document.getElementById('adminEventsTableBody');
  const badgeCount = document.getElementById('badgeKegiatanCount');

  if (badgeCount) {
    badgeCount.textContent = events.length;
  }

  if (!tableBody) return;
  tableBody.innerHTML = '';

  const TAG_LABELS = {
    'wajib': { label: 'Wajib Semua Guru', class: 'hadir' },
    'wajib_khusus': { label: 'Wajib Guru Khusus', class: 'terlambat' },
    'opsional': { label: 'Opsional', class: 'izin' },
    'info': { label: 'Informasi', class: 'izin' }
  };

  events.forEach((ev, idx) => {
    const tagInfo = TAG_LABELS[ev.tag] || { label: ev.tag, class: 'hadir' };
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <b style="font-size:13px; color:#0f172a;">${ev.name}</b><br>
        <span class="feed-status-badge ${tagInfo.class}" style="margin-top:4px; display:inline-block;">${tagInfo.label}</span>
      </td>
      <td>
        <b>📅 ${ev.date || (ev.day + ' ' + ev.mon + ' 2026')}</b><br>
        <span style="font-size:11px; color:#64748b;">⏰ ${ev.time}</span>
      </td>
      <td>
        <b>🏢 ${ev.venue || 'Lokasi Kegiatan'}</b><br>
        <span style="font-size:11px; color:#64748b;">${ev.desc || '-'}</span>
      </td>
      <td>
        <span style="font-family:monospace; font-size:11px; color:#059669; font-weight:700;">
          📍 ${ev.coords ? ev.coords.join(', ') : '-'}
        </span><br>
        <span style="font-size:11px; color:#64748b;">Radius Presensi: <b>${ev.radius || 250}m</b></span>
      </td>
      <td>
        <span class="badge-tag-pill">${ev.target || 'Semua Guru'}</span>
      </td>
      <td>
        <div class="action-buttons-group">
          <button class="btn-acc-action view" style="background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe; font-size:12px; padding:7px 14px;" onclick="openEditEventModal('${ev.id}')">
            ✏️ Edit Kegiatan
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

let currentEditingEventId = null;

window.openEditEventModal = function (id) {
  const events = getSchoolEvents();
  const ev = events.find(e => e.id === id);
  if (!ev) return;

  currentEditingEventId = id;
  const modalTitle = document.querySelector('#modalEventBackdrop .modal-card-title');
  if (modalTitle) modalTitle.textContent = 'Edit Informasi Kegiatan & Titik Presensi';

  document.getElementById('evName').value = ev.name || '';
  document.getElementById('evTag').value = ev.tag || 'wajib';
  document.getElementById('evDate').value = ev.date || '2026-08-25';

  // Parse time if formatted as '08:00 — 14:00 WIB'
  if (ev.time) {
    const parts = ev.time.split('—');
    if (parts.length === 2) {
      document.getElementById('evTimeStart').value = parts[0].trim();
      document.getElementById('evTimeEnd').value = parts[1].replace('WIB', '').trim();
    }
  }

  document.getElementById('evVenue').value = ev.venue || '';
  document.getElementById('evCoords').value = ev.coords ? ev.coords.join(', ') : '-7.3150, 111.3450';
  document.getElementById('evRadius').value = ev.radius || 300;
  document.getElementById('evDesc').value = ev.desc || '';

  // Populate teacher checklist and check selected teachers
  populateTeacherChecklist();
  if (ev.selectedTeachers && ev.selectedTeachers.length > 0) {
    const checkboxes = document.querySelectorAll('input[name="selected_teachers"]');
    checkboxes.forEach(cb => {
      const isSelected = ev.selectedTeachers.includes(cb.value);
      cb.checked = isSelected;
      cb.closest('.teacher-check-card').classList.toggle('checked', isSelected);
    });
    updateTeacherCounter();
  }

  const btnSubmit = document.querySelector('#formTambahEvent button[type="submit"]');
  if (btnSubmit) btnSubmit.innerHTML = '💾 Simpan Pembaruan Kegiatan';

  if (modalEventBackdrop) modalEventBackdrop.classList.add('show');
};

/* ── Push Notification to Teacher Dashboard ── */
function dispatchNotificationToTeachers(title, desc) {
  const DEFAULT_NOTIFS = [
    {
      id: 'notif-1',
      type: 'izin',
      title: 'Pengajuan Izin Disetujui',
      desc: 'Surat Izin Keperluan Keluarga (14 Agustus) telah diverifikasi dan disetujui Kepala Sekolah.',
      time: '10 menit yang lalu',
      read: false,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    }
  ];

  const notifs = JSON.parse(localStorage.getItem('teacher_notifications') || 'null') || DEFAULT_NOTIFS;
  const newNotif = {
    id: 'notif-' + Date.now(),
    type: 'event',
    title: title,
    desc: desc,
    time: 'Baru saja',
    read: false,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
  };

  notifs.unshift(newNotif);
  localStorage.setItem('teacher_notifications', JSON.stringify(notifs));
}

/* ── Modal Event Handlers ── */
const btnBukaModalEvent = document.getElementById('btnBukaModalEvent');
const btnCloseModalEvent = document.getElementById('btnCloseModalEvent');
const btnBatalEvent = document.getElementById('btnBatalEvent');
const modalEventBackdrop = document.getElementById('modalEventBackdrop');
const formTambahEvent = document.getElementById('formTambahEvent');
const teacherChecklistContainer = document.getElementById('teacherChecklistContainer');
const btnPilihSemuaGuru = document.getElementById('btnPilihSemuaGuru');
const btnHapusSemuaGuru = document.getElementById('btnHapusSemuaGuru');
const countSelectedGuru = document.getElementById('countSelectedGuru');
const countTotalGuruList = document.getElementById('countTotalGuruList');

function populateTeacherChecklist() {
  if (!teacherChecklistContainer) return;
  teacherChecklistContainer.innerHTML = '';
  const teachers = getRegisteredTeachers();

  if (countTotalGuruList) countTotalGuruList.textContent = teachers.length;

  teachers.forEach((t, i) => {
    const card = document.createElement('label');
    card.className = 'teacher-check-card checked';
    card.innerHTML = `
      <input type="checkbox" name="selected_teachers" value="${t.name}" data-nip="${t.nip}" checked />
      <img src="${t.photo || 'assets/img/profile-diah.jpg'}" alt="${t.name}" class="teacher-check-avatar" />
      <div class="teacher-check-info">
        <span class="teacher-check-name">${t.name}</span>
        <span class="teacher-check-sub">${t.mapel || t.status || 'Guru'}</span>
      </div>
    `;

    const cb = card.querySelector('input[type="checkbox"]');
    cb.addEventListener('change', () => {
      card.classList.toggle('checked', cb.checked);
      updateTeacherCounter();
    });

    teacherChecklistContainer.appendChild(card);
  });

  updateTeacherCounter();
}

function updateTeacherCounter() {
  const checkboxes = document.querySelectorAll('input[name="selected_teachers"]');
  const checked = Array.from(checkboxes).filter(cb => cb.checked);
  if (countSelectedGuru) countSelectedGuru.textContent = checked.length;
}

if (btnPilihSemuaGuru) {
  btnPilihSemuaGuru.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[name="selected_teachers"]');
    checkboxes.forEach(cb => {
      cb.checked = true;
      cb.closest('.teacher-check-card').classList.add('checked');
    });
    updateTeacherCounter();
  });
}

if (btnHapusSemuaGuru) {
  btnHapusSemuaGuru.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[name="selected_teachers"]');
    checkboxes.forEach(cb => {
      cb.checked = false;
      cb.closest('.teacher-check-card').classList.remove('checked');
    });
    updateTeacherCounter();
  });
}

if (btnBukaModalEvent) {
  btnBukaModalEvent.addEventListener('click', () => {
    currentEditingEventId = null;
    const modalTitle = document.querySelector('#modalEventBackdrop .modal-card-title');
    if (modalTitle) modalTitle.textContent = 'Tambah Kegiatan / Acara dengan Titik Presensi';
    const btnSubmit = document.querySelector('#formTambahEvent button[type="submit"]');
    if (btnSubmit) btnSubmit.innerHTML = '💾 Simpan & Publikasikan Acara';
    formTambahEvent.reset();
    document.getElementById('evCoords').value = '-7.3150, 111.3450';
    document.getElementById('evRadius').value = '300';
    document.getElementById('evTimeStart').value = '08:00';
    document.getElementById('evTimeEnd').value = '14:00';
    populateTeacherChecklist();
    if (modalEventBackdrop) modalEventBackdrop.classList.add('show');
  });
}

function closeModalEvent() {
  if (modalEventBackdrop) modalEventBackdrop.classList.remove('show');
  currentEditingEventId = null;
}

if (btnCloseModalEvent) btnCloseModalEvent.addEventListener('click', closeModalEvent);
if (btnBatalEvent) btnBatalEvent.addEventListener('click', closeModalEvent);

if (modalEventBackdrop) {
  modalEventBackdrop.addEventListener('click', (e) => {
    if (e.target === modalEventBackdrop) closeModalEvent();
  });
}

if (formTambahEvent) {
  formTambahEvent.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('evName').value.trim();
    const tag = document.getElementById('evTag').value;
    const dateStr = document.getElementById('evDate').value;
    const timeStart = document.getElementById('evTimeStart').value || '08:00';
    const timeEnd = document.getElementById('evTimeEnd').value || '14:00';
    const time = `${timeStart} — ${timeEnd} WIB`;
    const venue = document.getElementById('evVenue').value.trim();
    const coordsStr = document.getElementById('evCoords').value.trim();
    const radius = parseInt(document.getElementById('evRadius').value, 10) || 250;
    const desc = document.getElementById('evDesc').value.trim();

    // Collect selected teachers from multi-select checkboxes
    const checkboxes = document.querySelectorAll('input[name="selected_teachers"]:checked');
    if (checkboxes.length === 0) {
      alert('Pilih minimal 1 guru sebagai target peserta acara!');
      return;
    }

    const allTeachers = getRegisteredTeachers();
    let targetSummary = '';
    const selectedNames = Array.from(checkboxes).map(cb => cb.value);

    if (checkboxes.length === allTeachers.length) {
      targetSummary = `Semua Guru (${checkboxes.length} Orang)`;
    } else if (checkboxes.length === 1) {
      targetSummary = selectedNames[0];
    } else {
      targetSummary = `${selectedNames[0]} & ${checkboxes.length - 1} Guru Lainnya (${checkboxes.length} Guru)`;
    }

    if (!name || !dateStr || !venue || !coordsStr) {
      alert('Mohon lengkapi semua kolom wajib bertanda (*)!');
      return;
    }

    const coords = coordsStr.split(',').map(n => parseFloat(n.trim()));
    if (coords.length < 2 || isNaN(coords[0]) || isNaN(coords[1])) {
      alert('Format koordinat tidak valid! Gunakan format: Latitude, Longitude (contoh: -7.3150, 111.3450)');
      return;
    }

    const d = new Date(dateStr + 'T00:00:00');
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const day = String(d.getDate()).padStart(2, '0');
    const mon = months[d.getMonth()];

    let events = getSchoolEvents();

    if (currentEditingEventId) {
      // Update existing event
      const evIdx = events.findIndex(e => e.id === currentEditingEventId);
      if (evIdx !== -1) {
        events[evIdx] = {
          ...events[evIdx],
          name: name,
          tag: tag,
          tagLabel: tag === 'wajib' ? 'Wajib' : (tag === 'wajib_khusus' ? 'Wajib Khusus' : 'Opsional'),
          date: dateStr,
          day: day,
          mon: mon,
          time: time,
          venue: venue,
          coords: coords,
          radius: radius,
          target: targetSummary,
          selectedTeachers: selectedNames,
          desc: desc
        };
        saveSchoolEvents(events);
        dispatchNotificationToTeachers(
          `Pembaruan Jadwal: ${name}`,
          `Terdapat pembaruan informasi jadwal/lokasi untuk kegiatan ${name} (${day} ${mon}) di ${venue}. Jam: ${time}.`
        );
        showAdminToast(`✏️ Perubahan kegiatan <b>${name}</b> berhasil disimpan dan notifikasi telah dikirim ke guru!`, 'success');
      }
    } else {
      // Create new event
      const newEvent = {
        id: 'EVT-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-4),
        name: name,
        tag: tag,
        tagLabel: tag === 'wajib' ? 'Wajib' : (tag === 'wajib_khusus' ? 'Wajib Khusus' : 'Opsional'),
        date: dateStr,
        day: day,
        mon: mon,
        time: time,
        venue: venue,
        coords: coords,
        radius: radius,
        target: targetSummary,
        selectedTeachers: selectedNames,
        desc: desc
      };
      events.unshift(newEvent);
      saveSchoolEvents(events);
      dispatchNotificationToTeachers(
        `Agenda Kegiatan Baru: ${name}`,
        `Kegiatan ${name} dijadwalkan pada ${day} ${mon} 2026 pukul ${time} di ${venue}. Titik presensi telah aktif.`
      );
      showAdminToast(`🎉 Kegiatan <b>${name}</b> berhasil dipublikasikan untuk <b>${targetSummary}</b>!`, 'success');
    }

    closeModalEvent();
    formTambahEvent.reset();
    renderAdminEvents();
  });
}

/* ─── TOAST NOTIFICATION ─── */
function showAdminToast(msg, type = 'success') {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      background: #0f172a; color: #ffffff; padding: 14px 22px;
      border-radius: 12px; font-weight: 700; font-size: 13px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15);
      display: flex; align-items: center; gap: 10px; transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3500);
}

/* ═════════════════════════════════════════════
   UNDUH REKAP PRESENSI BULANAN PEGAWAI
═════════════════════════════════════════════ */
const btnBukaModalRekap = document.getElementById('btnBukaModalRekap');
const btnCloseModalRekap = document.getElementById('btnCloseModalRekap');
const btnBatalRekap = document.getElementById('btnBatalRekap');
const modalRekapBackdrop = document.getElementById('modalRekapBackdrop');
const btnExportCSV = document.getElementById('btnExportCSV');
const btnCetakPDF = document.getElementById('btnCetakPDF');
const rekapGuruSelect = document.getElementById('rekapGuruSelect');
const groupPilihGuruIndividu = document.getElementById('groupPilihGuruIndividu');
const groupRekapKategori = document.getElementById('groupRekapKategori');

function populateRekapGuruSelect() {
  if (!rekapGuruSelect) return;
  rekapGuruSelect.innerHTML = '';
  const teachers = getRegisteredTeachers().filter(t => t.accountStatus !== 'inactive');

  teachers.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.nip;
    opt.textContent = `${t.name} (NIP: ${t.nip} — ${t.mapel || t.status || 'Guru'})`;
    rekapGuruSelect.appendChild(opt);
  });
}

const rekapScopeRadios = document.querySelectorAll('input[name="rekapScope"]');
rekapScopeRadios.forEach(radio => {
  radio.addEventListener('change', function () {
    const isIndividu = this.value === 'individu';
    if (groupPilihGuruIndividu) groupPilihGuruIndividu.style.display = isIndividu ? 'block' : 'none';
    if (groupRekapKategori) groupRekapKategori.style.display = isIndividu ? 'none' : 'block';
    if (isIndividu) populateRekapGuruSelect();
  });
});

if (btnBukaModalRekap) {
  btnBukaModalRekap.addEventListener('click', () => {
    populateRekapGuruSelect();
    if (modalRekapBackdrop) modalRekapBackdrop.classList.add('show');
  });
}

function closeModalRekap() {
  if (modalRekapBackdrop) modalRekapBackdrop.classList.remove('show');
}

if (btnCloseModalRekap) btnCloseModalRekap.addEventListener('click', closeModalRekap);
if (btnBatalRekap) btnBatalRekap.addEventListener('click', closeModalRekap);

if (modalRekapBackdrop) {
  modalRekapBackdrop.addEventListener('click', (e) => {
    if (e.target === modalRekapBackdrop) closeModalRekap();
  });
}

// Data dummy statistik kehadiran bulanan per guru untuk laporan
const DEMO_MONTHLY_STATS = {
  '19890412 201402 2 003': { hadir: 20, terlambat: 1, izin: 1, sakit: 0, alpha: 0, totalKerja: 22, persen: '95.5%' },
  '19850615 201001 1 012': { hadir: 21, terlambat: 0, izin: 0, sakit: 1, alpha: 0, totalKerja: 22, persen: '95.5%' },
  '19920820 201903 2 018': { hadir: 19, terlambat: 2, izin: 1, sakit: 0, alpha: 0, totalKerja: 22, persen: '90.9%' },
  '19950310 202203 1 005': { hadir: 22, terlambat: 0, izin: 0, sakit: 0, alpha: 0, totalKerja: 22, persen: '100.0%' },
  '19980712 202401 2 011': { hadir: 20, terlambat: 1, izin: 0, sakit: 1, alpha: 0, totalKerja: 22, persen: '95.5%' }
};

/* ── Export CSV / Excel ── */
if (btnExportCSV) {
  btnExportCSV.addEventListener('click', function () {
    const bulan = document.getElementById('rekapBulan').value;
    const scope = document.querySelector('input[name="rekapScope"]:checked').value;
    const kategori = document.getElementById('rekapKategori').value;
    const teachers = getRegisteredTeachers();

    let filtered = teachers.filter(t => t.accountStatus !== 'inactive');
    if (scope === 'individu') {
      const selectedNip = rekapGuruSelect.value;
      filtered = filtered.filter(t => t.nip === selectedNip);
    } else if (kategori !== 'all') {
      filtered = filtered.filter(t => (t.status || '').toLowerCase().includes(kategori.toLowerCase()));
    }

    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
    csvContent += `REKAPITULASI KEHADIRAN PEGAWAI - SMP NEGERI 1 SURABAYA\r\n`;
    csvContent += `Periode: ${bulan}\r\n`;
    csvContent += `Total Hari Kerja: 22 Hari\r\n\r\n`;
    csvContent += `No,Nama Pegawai,NIP,Mata Pelajaran / Tugas,Status Kepegawaian,Hadir Tepat Waktu,Terlambat,Izin,Sakit,Alpha,Persentase Kehadiran\r\n`;

    filtered.forEach((t, i) => {
      const stat = DEMO_MONTHLY_STATS[t.nip] || { hadir: 21, terlambat: 1, izin: 0, sakit: 0, alpha: 0, persen: '95.5%' };
      const row = [
        i + 1,
        `"${t.name}"`,
        `'${t.nip}`,
        `"${t.mapel || '-'}"`,
        `"${t.status || 'PNS'}"`,
        stat.hadir,
        stat.terlambat,
        stat.izin,
        stat.sakit,
        stat.alpha,
        `"${stat.persen}"`
      ];
      csvContent += row.join(',') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Presensi_${scope}_${bulan.replace(/\s+/g, '_')}_SMPN1.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAdminToast(`📊 Rekap Presensi Bulan <b>${bulan}</b> berhasil diunduh dalam format Excel (.CSV)!`, 'success');
    closeModalRekap();
  });
}

/* ── Print / Export PDF (Kolektif & Perorangan) ── */
if (btnCetakPDF) {
  btnCetakPDF.addEventListener('click', function () {
    const scope = document.querySelector('input[name="rekapScope"]:checked').value;
    const bulan = document.getElementById('rekapBulan').value;
    const kepsek = document.getElementById('rekapKepsek').value;
    const nipKepsek = document.getElementById('rekapNipKepsek').value;

    if (scope === 'individu') {
      const selectedNip = rekapGuruSelect.value;
      const teachers = getRegisteredTeachers();
      const teacher = teachers.find(t => t.nip === selectedNip) || teachers[0];
      printIndividualReport(teacher, bulan, kepsek, nipKepsek);
    } else {
      const kategori = document.getElementById('rekapKategori').value;
      printCollectiveReport(bulan, kategori, kepsek, nipKepsek);
    }
  });
}

/* ═════════════════════════════════════════════
   1. LAPORAN REKAP KOLEKTIF (SEMUA PEGAWAI)
═════════════════════════════════════════════ */
function printCollectiveReport(bulan, kategori, kepsek, nipKepsek) {
  const kop = getSchoolKopSettings();
  const teachers = getRegisteredTeachers();
  const filtered = teachers.filter(t => {
    if (t.accountStatus === 'inactive') return false;
    if (kategori === 'all') return true;
    return (t.status || '').toLowerCase().includes(kategori.toLowerCase());
  });

  const printWin = window.open('', '_blank', 'width=1100,height=800');
  if (!printWin) {
    alert('Mohon izinkan pop-up browser untuk mencetak laporan presensi.');
    return;
  }

  let rowsHtml = '';
  filtered.forEach((t, i) => {
    const stat = DEMO_MONTHLY_STATS[t.nip] || { hadir: 21, terlambat: 1, izin: 0, sakit: 0, alpha: 0, persen: '95.5%' };
    rowsHtml += `
      <tr>
        <td style="text-align:center;">${i + 1}</td>
        <td><b>${t.name}</b><br><small style="color:#555;">NIP. ${t.nip}</small></td>
        <td>${t.mapel || '-'}</td>
        <td style="text-align:center;">${t.status || 'PNS'}</td>
        <td style="text-align:center; font-weight:bold; color:#059669;">${stat.hadir}</td>
        <td style="text-align:center; color:#d97706;">${stat.terlambat}</td>
        <td style="text-align:center; color:#2563eb;">${stat.izin}</td>
        <td style="text-align:center; color:#7c3aed;">${stat.sakit}</td>
        <td style="text-align:center; color:#dc2626;">${stat.alpha}</td>
        <td style="text-align:center; font-weight:bold;">${stat.persen}</td>
      </tr>
    `;
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Rekap Presensi Bulanan - ${bulan}</title>
      <style>
        @page { size: A4 landscape; margin: 15mm; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; margin: 0; padding: 10px; }
        .kop-surat { display: flex; align-items: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 18px; }
        .kop-logo { width: 75px; height: 75px; object-fit: contain; margin-right: 18px; }
        .kop-text { flex: 1; text-align: center; line-height: 1.2; }
        .kop-text h4 { margin: 0; font-size: 13pt; font-weight: normal; letter-spacing: 1px; }
        .kop-text h2 { margin: 2px 0; font-size: 16pt; font-weight: bold; }
        .kop-text p { margin: 2px 0; font-size: 9.5pt; font-style: italic; }
        .doc-title { text-align: center; margin-bottom: 16px; }
        .doc-title h3 { margin: 0; font-size: 13pt; text-decoration: underline; font-weight: bold; }
        .doc-title p { margin: 4px 0 0; font-size: 10.5pt; font-weight: bold; }
        .meta-info { display: flex; justify-content: space-between; font-size: 10pt; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 9.5pt; }
        th, td { border: 1px solid #333; padding: 6px 8px; }
        th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
        .ttd-section { display: flex; justify-content: space-between; margin-top: 30px; page-break-inside: avoid; }
        .ttd-box { width: 280px; text-align: center; font-size: 10pt; line-height: 1.3; }
        .ttd-space { height: 70px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="background:#0f172a; color:#fff; padding:10px 16px; margin-bottom:15px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; font-family:sans-serif; font-size:13px;">
        <span>📄 Dokumen Laporan Rekapitulasi Presensi Kolektif ${kop.schoolName}</span>
        <button onclick="window.print()" style="background:#059669; color:#fff; border:none; padding:8px 18px; border-radius:4px; font-weight:bold; cursor:pointer;">
          🖨️ Cetak / Simpan PDF Sekarang
        </button>
      </div>

      <div class="kop-surat">
        <img src="${kop.logo || 'assets/img/logo-smpn1.png'}" class="kop-logo" onerror="this.style.display='none'" />
        <div class="kop-text">
          <h4>${kop.gov}</h4>
          <h4>${kop.dept}</h4>
          <h2>${kop.schoolName}</h2>
          <p>${kop.address}</p>
        </div>
      </div>

      <div class="doc-title">
        <h3>LAPORAN REKAPITULASI PRESENSI & KEHADIRAN PEGAWAI</h3>
        <p>PERIODE BULAN: ${bulan.toUpperCase()}</p>
      </div>

      <div class="meta-info">
        <span><b>Unit Kerja:</b> ${kop.schoolName}</span>
        <span><b>Hari Kerja Efektif:</b> 22 Hari Kerja</span>
        <span><b>Kategori:</b> ${kategori === 'all' ? 'Seluruh Tenaga Pendidik & Kependidikan' : kategori}</span>
      </div>

      <table>
        <thead>
          <tr>
            <th rowspan="2" style="width:30px;">No</th>
            <th rowspan="2">Nama Pegawai / Guru</th>
            <th rowspan="2">Mata Pelajaran / Tugas</th>
            <th rowspan="2">Status</th>
            <th colspan="5">Rincian Rekap Kehadiran (Hari)</th>
            <th rowspan="2" style="width:75px;">Tingkat Kehadiran</th>
          </tr>
          <tr>
            <th style="width:40px;">Hadir</th>
            <th style="width:40px;">Terlambat</th>
            <th style="width:40px;">Izin</th>
            <th style="width:40px;">Sakit</th>
            <th style="width:40px;">Alpha</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div class="ttd-section">
        <div class="ttd-box">
          <p>Mengetahui,</p>
          <p>Kepala Tata Usaha</p>
          <div class="ttd-space"></div>
          <p><b><u>${kop.tuName}</u></b><br>NIP. ${kop.tuNip}</p>
        </div>

        <div class="ttd-box">
          <p>${kop.city}, 31 ${bulan}</p>
          <p>Kepala Sekolah</p>
          <div class="ttd-space"></div>
          <p><b><u>${kepsek || kop.kepsekName}</u></b><br>${nipKepsek || ('NIP. ' + kop.kepsekNip)}</p>
        </div>
      </div>

      <script>
        setTimeout(() => { window.print(); }, 600);
      <\/script>
    </body>
    </html>
  `;

  printWin.document.open();
  printWin.document.write(htmlContent);
  printWin.document.close();
  closeModalRekap();
  showAdminToast(`🖨️ Dokumen Rekap Kolektif Bulan <b>${bulan}</b> siap dicetak!`, 'success');
}

/* ═════════════════════════════════════════════
   2. LAPORAN REKAP INDIVIDU (FOTO & GEOTAGGING GPS)
═════════════════════════════════════════════ */
function printIndividualReport(teacher, bulan, kepsek, nipKepsek) {
  const kop = getSchoolKopSettings();
  const stat = DEMO_MONTHLY_STATS[teacher.nip] || { hadir: 20, terlambat: 1, izin: 1, sakit: 0, alpha: 0, totalKerja: 22, persen: '95.5%' };
  const printWin = window.open('', '_blank', 'width=1100,height=850');
  if (!printWin) {
    alert('Mohon izinkan pop-up browser untuk mencetak laporan individu presensi.');
    return;
  }

  // 22 Hari Kerja Lengkap Selama Sebulan Penuh (Agustus 2026)
  const FULL_MONTH_DAILY_LOGS = [
    { tgl: '03 Agu 2026', hari: 'Senin', masuk: '06:42:15', pulang: '14:05:30', lat: '-7.26054, 112.74812', radius: '12m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '04 Agu 2026', hari: 'Selasa', masuk: '06:48:40', pulang: '14:02:15', lat: '-7.26048, 112.74825', radius: '18m (Lab Komputer)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '05 Agu 2026', hari: 'Rabu', masuk: '06:45:10', pulang: '14:10:00', lat: '-7.26071, 112.74795', radius: '15m (Ruang Guru A)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '06 Agu 2026', hari: 'Kamis', masuk: '06:53:00', pulang: '14:00:20', lat: '-7.26055, 112.74810', radius: '14m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '07 Agu 2026', hari: 'Jumat', masuk: '06:38:22', pulang: '11:35:10', lat: '-7.26028, 112.74840', radius: '22m (Masjid Sekolah)', status: 'Hadir Tepat Waktu', ket: 'Jam Pulang Jumat 11:30', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '10 Agu 2026', hari: 'Senin', masuk: '06:46:15', pulang: '14:08:45', lat: '-7.26054, 112.74812', radius: '12m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Upacara Bendera', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '11 Agu 2026', hari: 'Selasa', masuk: '07:11:18', pulang: '14:05:00', lat: '-7.26062, 112.74822', radius: '16m (Gedung B)', status: 'Terlambat 11 Menit', ket: 'Toleransi Jam Masuk Guru', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '12 Agu 2026', hari: 'Rabu', masuk: '06:50:30', pulang: '14:04:10', lat: '-7.26054, 112.74812', radius: '14m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '13 Agu 2026', hari: 'Kamis', masuk: '06:44:00', pulang: '14:15:00', lat: '-7.26045, 112.74805', radius: '10m (Ruang Guru)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '14 Agu 2026', hari: 'Jumat', masuk: '--:--:--', pulang: '--:--:--', lat: 'Diverifikasi Surat', radius: 'Disposisi Resmi', status: teacher.name.includes('Ahmad Fauzi') ? 'Sakit (Surat Dokter RSUD)' : 'Izin Dinas Luar (SPT BGP)', ket: 'Disetujui Kepala Sekolah', fotoMasuk: null, fotoPulang: null },
    { tgl: '17 Agu 2026', hari: 'Senin', masuk: '06:30:00', pulang: '10:30:00', lat: '-7.26054, 112.74812', radius: '8m (Lapangan Upacara)', status: 'Hadir Upacara HUT RI', ket: 'Peringatan HUT RI Ke-81', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '18 Agu 2026', hari: 'Selasa', masuk: '06:49:05', pulang: '14:01:20', lat: '-7.26054, 112.74812', radius: '13m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '19 Agu 2026', hari: 'Rabu', masuk: '06:43:12', pulang: '14:11:00', lat: '-7.26071, 112.74795', radius: '15m (Ruang Guru A)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '20 Agu 2026', hari: 'Kamis', masuk: '06:51:30', pulang: '14:03:40', lat: '-7.26054, 112.74812', radius: '12m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '21 Agu 2026', hari: 'Jumat', masuk: '06:40:12', pulang: '11:40:00', lat: '-7.26054, 112.74812', radius: '14m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Hari Ini — Terverifikasi GPS', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '24 Agu 2026', hari: 'Senin', masuk: '06:45:00', pulang: '14:06:00', lat: '-7.26054, 112.74812', radius: '12m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '25 Agu 2026', hari: 'Selasa', masuk: '06:48:20', pulang: '14:04:15', lat: '-7.26048, 112.74825', radius: '18m (Lab Bahasa)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '26 Agu 2026', hari: 'Rabu', masuk: '06:46:10', pulang: '14:09:00', lat: '-7.26071, 112.74795', radius: '15m (Ruang Guru A)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '27 Agu 2026', hari: 'Kamis', masuk: '06:52:15', pulang: '14:02:40', lat: '-7.26055, 112.74810', radius: '14m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Radius Geofence Valid', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '28 Agu 2026', hari: 'Jumat', masuk: '06:39:50', pulang: '11:35:00', lat: '-7.26028, 112.74840', radius: '20m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Jam Pulang Jumat 11:30', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' },
    { tgl: '31 Agu 2026', hari: 'Senin', masuk: '06:44:30', pulang: '14:07:20', lat: '-7.26054, 112.74812', radius: '11m (Gedung Utama)', status: 'Hadir Tepat Waktu', ket: 'Penutupan Presensi Bulanan', fotoMasuk: 'assets/img/profile-diah.jpg', fotoPulang: 'assets/img/profile-diah.jpg' }
  ];

  let logRowsHtml = '';
  FULL_MONTH_DAILY_LOGS.forEach((log, idx) => {
    const isLate = log.status.includes('Terlambat');
    const isIzin = log.status.includes('Izin') || log.status.includes('Sakit') || log.status.includes('Dinas');
    
    logRowsHtml += `
      <tr>
        <td style="text-align:center; font-weight:bold;">${idx + 1}</td>
        <td>
          <b>${log.hari}</b><br>
          <span style="color:#475569; font-size:8pt;">${log.tgl}</span>
        </td>
        <td style="text-align:center; padding:4px;">
          ${log.fotoMasuk ? `
            <div style="display:inline-flex; flex-direction:column; align-items:center;">
              <img src="${log.fotoMasuk}" style="width:34px; height:34px; object-fit:cover; border-radius:4px; border:1px solid #94a3b8;" alt="Foto Masuk" />
              <b style="font-size:7.5pt; color:#059669; margin-top:2px;">${log.masuk}</b>
            </div>
          ` : '<span style="color:#94a3b8; font-weight:bold; font-size:8pt;">--:--:--</span>'}
        </td>
        <td style="text-align:center; padding:4px;">
          ${log.fotoPulang ? `
            <div style="display:inline-flex; flex-direction:column; align-items:center;">
              <img src="${log.fotoPulang}" style="width:34px; height:34px; object-fit:cover; border-radius:4px; border:1px solid #94a3b8;" alt="Foto Pulang" />
              <b style="font-size:7.5pt; color:#2563eb; margin-top:2px;">${log.pulang}</b>
            </div>
          ` : '<span style="color:#94a3b8; font-weight:bold; font-size:8pt;">--:--:--</span>'}
        </td>
        <td style="font-size:8pt; line-height:1.25;">
          <span style="font-family:monospace; color:#0f172a; font-weight:700;">📍 ${log.lat}</span><br>
          <span style="color:#059669; font-size:7.5pt; font-weight:600;">🎯 Jarak: ${log.radius}</span>
        </td>
        <td style="font-size:8pt;">
          <b style="color:${isLate ? '#d97706' : (isIzin ? '#7c3aed' : '#059669')};">${log.status}</b><br>
          <span style="color:#64748b; font-size:7.5pt;">${log.ket}</span>
        </td>
      </tr>
    `;
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Rekap Presensi Individu - ${teacher.name}</title>
      <style>
        @page { size: A4 portrait; margin: 12mm; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 10pt; color: #000; margin: 0; padding: 10px; }
        .kop-surat { display: flex; align-items: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 14px; }
        .kop-logo { width: 68px; height: 68px; object-fit: contain; margin-right: 14px; }
        .kop-text { flex: 1; text-align: center; line-height: 1.15; }
        .kop-text h4 { margin: 0; font-size: 11.5pt; font-weight: normal; letter-spacing: 0.5px; }
        .kop-text h2 { margin: 2px 0; font-size: 14pt; font-weight: bold; }
        .kop-text p { margin: 1px 0; font-size: 8.5pt; font-style: italic; }
        .doc-title { text-align: center; margin-bottom: 14px; }
        .doc-title h3 { margin: 0; font-size: 12pt; text-decoration: underline; font-weight: bold; }
        .doc-title p { margin: 2px 0 0; font-size: 9.5pt; font-weight: bold; }
        
        /* Profile & Summary Grid */
        .profile-summary-box { display: flex; gap: 14px; border: 1.5px solid #333; border-radius: 6px; padding: 10px 12px; margin-bottom: 14px; background:#fafafa; }
        .profile-photo { width: 85px; height: 105px; object-fit: cover; border-radius: 4px; border: 1px solid #777; flex-shrink: 0; }
        .profile-info { flex: 1; font-size: 9pt; line-height: 1.35; }
        .profile-info table { width: 100%; border-collapse: collapse; margin: 0; font-size: 9pt; }
        .profile-info td { border: none; padding: 2px 4px; }
        
        .stats-kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px; }
        .stat-kpi-card { border: 1px solid #444; border-radius: 4px; padding: 6px; text-align: center; background:#fff; }
        .stat-kpi-val { font-size: 13pt; font-weight: bold; line-height: 1; }
        .stat-kpi-lbl { font-size: 7.5pt; text-transform: uppercase; color: #555; margin-top: 3px; }

        table.log-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 8.5pt; }
        table.log-table th, table.log-table td { border: 1px solid #444; padding: 4px 6px; vertical-align: middle; }
        table.log-table th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
        
        .ttd-section { display: flex; justify-content: space-between; margin-top: 20px; page-break-inside: avoid; }
        .ttd-box { width: 250px; text-align: center; font-size: 9.5pt; line-height: 1.3; }
        .ttd-space { height: 60px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="background:#0f172a; color:#fff; padding:10px 16px; margin-bottom:15px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; font-family:sans-serif; font-size:13px;">
        <span>📄 Laporan Rincian Presensi Individu & Log Geotagging: <b>${teacher.name}</b></span>
        <button onclick="window.print()" style="background:#059669; color:#fff; border:none; padding:8px 18px; border-radius:4px; font-weight:bold; cursor:pointer;">
          🖨️ Cetak / Simpan PDF Sekarang
        </button>
      </div>

      <div class="kop-surat">
        <img src="${kop.logo || 'assets/img/logo-smpn1.png'}" class="kop-logo" onerror="this.style.display='none'" />
        <div class="kop-text">
          <h4>${kop.gov}</h4>
          <h4>${kop.dept}</h4>
          <h2>${kop.schoolName}</h2>
          <p>${kop.address}</p>
        </div>
      </div>

      <div class="doc-title">
        <h3>REKAPITULASI PRESENSI & LOG GEOTAGGING INDIVIDU</h3>
        <p>PERIODE: ${bulan.toUpperCase()} &bull; UNIT KERJA: ${kop.schoolName}</p>
      </div>

      <!-- Profil & Identitas Guru -->
      <div class="profile-summary-box">
        <img src="${teacher.photo || 'assets/img/profile-diah.jpg'}" class="profile-photo" alt="${teacher.name}" />
        <div class="profile-info">
          <table>
            <tr><td style="width:130px;"><b>Nama Lengkap & Gelar</b></td><td>: <b>${teacher.name}</b></td></tr>
            <tr><td><b>NIP / NUPTK</b></td><td>: ${teacher.nip} / ${teacher.nuptk || '-'}</td></tr>
            <tr><td><b>Jabatan / Tugas</b></td><td>: ${teacher.mapel || 'Tenaga Pendidik'}</td></tr>
            <tr><td><b>Status Kepegawaian</b></td><td>: ${teacher.status || 'PNS / Guru Tetap'}</td></tr>
            <tr><td><b>Email Kedinasan</b></td><td>: ${teacher.email}</td></tr>
            <tr><td><b>Bulan Evaluasi</b></td><td>: <b>${bulan}</b> (Hari Efektif: 22 Hari Kerja)</td></tr>
          </table>
        </div>
      </div>

      <!-- Ringkasan Statistik -->
      <div class="stats-kpi-grid">
        <div class="stat-kpi-card"><div class="stat-kpi-val" style="color:#059669;">${stat.hadir}</div><div class="stat-kpi-lbl">Hadir Tepat</div></div>
        <div class="stat-kpi-card"><div class="stat-kpi-val" style="color:#d97706;">${stat.terlambat}</div><div class="stat-kpi-lbl">Terlambat</div></div>
        <div class="stat-kpi-card"><div class="stat-kpi-val" style="color:#2563eb;">${stat.izin}</div><div class="stat-kpi-lbl">Izin Dinas</div></div>
        <div class="stat-kpi-card"><div class="stat-kpi-val" style="color:#7c3aed;">${stat.sakit}</div><div class="stat-kpi-lbl">Sakit</div></div>
        <div class="stat-kpi-card"><div class="stat-kpi-val" style="color:#dc2626;">${stat.alpha}</div><div class="stat-kpi-lbl">Alpha</div></div>
        <div class="stat-kpi-card" style="background:#ecfdf5; border-color:#059669;"><div class="stat-kpi-val" style="color:#059669;">${stat.persen}</div><div class="stat-kpi-lbl" style="color:#065f46; font-weight:bold;">Kehadiran</div></div>
      </div>

      <!-- Tabel Lampiran Log Geotagging & Kamera Harian -->
      <h4 style="margin: 0 0 6px; font-size:9.5pt; text-transform:uppercase; letter-spacing:0.5px;">Lampiran Log Presensi Harian, Foto Kamera & Titik Koordinat GPS:</h4>
      <table class="log-table">
        <thead>
          <tr>
            <th style="width:24px;">No</th>
            <th style="width:85px;">Hari / Tanggal</th>
            <th style="width:90px;">Presensi Masuk</th>
            <th style="width:90px;">Presensi Pulang</th>
            <th>Titik Koordinat GPS & Validasi Geofence</th>
            <th style="width:120px;">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${logRowsHtml}
        </tbody>
      </table>

      <div class="ttd-section">
        <div class="ttd-box">
          <p>Pegawai Yang Bersangkutan,</p>
          <div class="ttd-space"></div>
          <p><b><u>${teacher.name}</u></b><br>NIP. ${teacher.nip}</p>
        </div>

        <div class="ttd-box">
          <p>${kop.city}, 31 ${bulan}</p>
          <p>Kepala Sekolah</p>
          <div class="ttd-space"></div>
          <p><b><u>${kepsek || kop.kepsekName}</u></b><br>${nipKepsek || ('NIP. ' + kop.kepsekNip)}</p>
        </div>
      </div>

      <script>
        setTimeout(() => { window.print(); }, 600);
      <\/script>
    </body>
    </html>
  `;

  printWin.document.open();
  printWin.document.write(htmlContent);
  printWin.document.close();
  closeModalRekap();
  showAdminToast(`🖨️ Laporan Presensi Individu <b>${teacher.name}</b> siap dicetak!`, 'success');
}

/* ═════════════════════════════════════════════
   PENGATURAN KOP SURAT & LOGO SEKOLAH
═════════════════════════════════════════════ */
const DEFAULT_KOP_SETTINGS = {
  logo: 'assets/img/logo-smpn1.png',
  gov: 'PEMERINTAH KOTA SURABAYA',
  dept: 'DINAS PENDIDIKAN',
  schoolName: 'SEKOLAH MENENGAH PERTAMA NEGERI 1 SURABAYA',
  address: 'Jalan Pacar No. 4-6, Telepon (031) 5342158, Email: info@smpn1surabaya.sch.id',
  city: 'Surabaya',
  kepsekName: 'Dr. H. Bambang Sudarsono, M.Pd',
  kepsekNip: '19680315 199412 1 002',
  tuName: 'Hj. Endang Sri Wahyuni, S.Sos',
  tuNip: '19740510 199903 2 004'
};

function getSchoolKopSettings() {
  const local = JSON.parse(localStorage.getItem('school_kop_settings') || 'null');
  if (!local) {
    localStorage.setItem('school_kop_settings', JSON.stringify(DEFAULT_KOP_SETTINGS));
    return DEFAULT_KOP_SETTINGS;
  }
  return { ...DEFAULT_KOP_SETTINGS, ...local };
}

function saveSchoolKopSettings(data) {
  localStorage.setItem('school_kop_settings', JSON.stringify(data));
}

let uploadedLogoDataUrl = null;

function initKopSettingsForm() {
  const kop = getSchoolKopSettings();
  
  const elGov = document.getElementById('kopGov');
  const elDept = document.getElementById('kopDept');
  const elSchool = document.getElementById('kopSchoolName');
  const elAddr = document.getElementById('kopAddress');
  const elCity = document.getElementById('kopCity');
  const elKepsek = document.getElementById('kopKepsekName');
  const elKepsekNip = document.getElementById('kopKepsekNip');
  const elTu = document.getElementById('kopTuName');
  const elTuNip = document.getElementById('kopTuNip');
  const logoPreview = document.getElementById('kopLogoPreview');
  const miniPreview = document.getElementById('kopMiniPreview');
  const inputLogo = document.getElementById('inputKopLogo');

  if (elGov) elGov.value = kop.gov;
  if (elDept) elDept.value = kop.dept;
  if (elSchool) elSchool.value = kop.schoolName;
  if (elAddr) elAddr.value = kop.address;
  if (elCity) elCity.value = kop.city;
  if (elKepsek) elKepsek.value = kop.kepsekName;
  if (elKepsekNip) elKepsekNip.value = kop.kepsekNip;
  if (elTu) elTu.value = kop.tuName;
  if (elTuNip) elTuNip.value = kop.tuNip;

  if (logoPreview && kop.logo) logoPreview.src = kop.logo;
  if (miniPreview && kop.logo) miniPreview.src = kop.logo;

  updateKopLivePreview();

  // Handle Logo Upload File
  if (inputLogo) {
    inputLogo.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        uploadedLogoDataUrl = evt.target.result;
        if (logoPreview) logoPreview.src = uploadedLogoDataUrl;
        if (miniPreview) miniPreview.src = uploadedLogoDataUrl;
        showAdminToast('📸 Pratinjau logo baru dimuat. Klik simpan untuk menerapkan.', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  // Live text typing update
  const bindInputs = [elGov, elDept, elSchool, elAddr];
  bindInputs.forEach(inp => {
    if (inp) inp.addEventListener('input', updateKopLivePreview);
  });
}

function updateKopLivePreview() {
  const gov = document.getElementById('kopGov')?.value || '';
  const dept = document.getElementById('kopDept')?.value || '';
  const school = document.getElementById('kopSchoolName')?.value || '';
  const addr = document.getElementById('kopAddress')?.value || '';

  const pGov = document.getElementById('previewGov');
  const pDept = document.getElementById('previewDept');
  const pSchool = document.getElementById('previewSchool');
  const pAddr = document.getElementById('previewAddress');

  if (pGov) pGov.textContent = gov.toUpperCase();
  if (pDept) pDept.textContent = dept.toUpperCase();
  if (pSchool) pSchool.textContent = school.toUpperCase();
  if (pAddr) pAddr.textContent = addr;
}

/* ─── SAVE SETTINGS ─── */
const settingsForm = document.getElementById('schoolSettingsForm');
if (settingsForm) {
  settingsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const currentKop = getSchoolKopSettings();
    const newKopSettings = {
      logo: uploadedLogoDataUrl || currentKop.logo || 'assets/img/logo-smpn1.png',
      gov: document.getElementById('kopGov').value.trim(),
      dept: document.getElementById('kopDept').value.trim(),
      schoolName: document.getElementById('kopSchoolName').value.trim(),
      address: document.getElementById('kopAddress').value.trim(),
      city: document.getElementById('kopCity').value.trim(),
      kepsekName: document.getElementById('kopKepsekName').value.trim(),
      kepsekNip: document.getElementById('kopKepsekNip').value.trim(),
      tuName: document.getElementById('kopTuName').value.trim(),
      tuNip: document.getElementById('kopTuNip').value.trim(),
    };

    saveSchoolKopSettings(newKopSettings);

    // Synchronize modal signer values
    const modalKepsek = document.getElementById('rekapKepsek');
    const modalNipKepsek = document.getElementById('rekapNipKepsek');
    if (modalKepsek) modalKepsek.value = newKopSettings.kepsekName;
    if (modalNipKepsek) modalNipKepsek.value = 'NIP: ' + newKopSettings.kepsekNip;

    showAdminToast('🏛️ Identitas sekolah, KOP surat resmi & jadwal kerja berhasil disimpan!', 'success');
  });
}

/* ═════════════════════════════════════════════
   NOTIFIKASI HEADER & POPUP PERSETUJUAN
═════════════════════════════════════════════ */
function updateHeaderNotificationBadge() {
  const requests = getLeaveRequests();
  const teachers = getRegisteredTeachers();
  
  const pendingLeaves = requests.filter(r => r.status === 'pending');
  const pendingTeachers = teachers.filter(t => t.accountStatus === 'pending_approval');
  const total = pendingLeaves.length + pendingTeachers.length;

  const badgeEl = document.getElementById('headerNotifBadge');
  if (badgeEl) {
    badgeEl.textContent = total;
    badgeEl.style.display = total > 0 ? 'flex' : 'none';
  }

  const notifSummary = document.getElementById('notifSummaryText');
  if (notifSummary) {
    notifSummary.textContent = total > 0 
      ? `Total ${total} permohonan menunggu tindakan persetujuan` 
      : `Semua permohonan izin & verifikasi telah selesai diproses`;
  }
}

function renderNotifModalContent() {
  const requests = getLeaveRequests();
  const teachers = getRegisteredTeachers();
  const userRole = getCurrentUserRole();
  
  const pendingLeaves = userRole === 'Kepala Sekolah'
    ? requests.filter(r => r.status === 'forwarded_to_kepsek' || r.status === 'pending')
    : requests.filter(r => r.status === 'pending');

  const pendingTeachers = teachers.filter(t => t.accountStatus === 'pending_approval');

  // Badge counters inside modal
  const leaveCountBadge = document.getElementById('notifLeaveCountBadge');
  if (leaveCountBadge) {
    leaveCountBadge.textContent = `${pendingLeaves.length} Menunggu`;
    leaveCountBadge.style.background = pendingLeaves.length > 0 ? '#fef3c7' : '#f1f5f9';
    leaveCountBadge.style.color = pendingLeaves.length > 0 ? '#92400e' : '#64748b';
  }

  const teacherCountBadge = document.getElementById('notifTeacherCountBadge');
  if (teacherCountBadge) {
    teacherCountBadge.textContent = `${pendingTeachers.length} Menunggu`;
    teacherCountBadge.style.background = pendingTeachers.length > 0 ? '#eff6ff' : '#f1f5f9';
    teacherCountBadge.style.color = pendingTeachers.length > 0 ? '#1d4ed8' : '#64748b';
  }

  // Render Leave Requests in Modal
  const leaveContainer = document.getElementById('notifLeaveListContainer');
  if (leaveContainer) {
    leaveContainer.innerHTML = '';
    if (pendingLeaves.length === 0) {
      leaveContainer.innerHTML = `<div class="notif-empty-state">🎉 Tidak ada permohonan izin atau dinas yang menunggu tindakan.</div>`;
    } else {
      pendingLeaves.forEach(r => {
        const item = document.createElement('div');
        item.className = 'notif-item-card';
        const typeBg = r.type === 'Dinas Luar' ? '#eff6ff' : (r.type === 'Sakit' ? '#fef2f2' : '#fef3c7');
        const typeColor = r.type === 'Dinas Luar' ? '#1d4ed8' : (r.type === 'Sakit' ? '#b91c1c' : '#b45309');
        
        let notifActionsHtml = '';
        if (userRole === 'Kepala Sekolah') {
          notifActionsHtml = `
            <button type="button" class="btn-acc-action" style="padding:6px 10px; font-size:11.5px; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas">
              📥 Unduh
            </button>
            <button type="button" class="btn-acc-action approve" style="padding:6px 12px; font-size:11.5px;" onclick="kepsekApproveLeave('${r.id}')">
              ✓ ACC
            </button>
            <button type="button" class="btn-acc-action reject" style="padding:6px 10px; font-size:11.5px;" onclick="kepsekRejectLeave('${r.id}')">
              ✕ Tolak
            </button>
          `;
        } else {
          if (r.status === 'pending') {
            notifActionsHtml = `
              <button type="button" class="btn-acc-action" style="padding:6px 10px; font-size:11.5px; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas Arsip">
                📥 Arsip
              </button>
              <button type="button" class="btn-acc-action approve" style="padding:6px 12px; font-size:11.5px;" onclick="forwardLeaveToPrincipal('${r.id}')" title="Ajukan ke Kepala Sekolah">
                📤 Ajukan ke Kepsek
              </button>
            `;
          } else {
            notifActionsHtml = `
              <button type="button" class="btn-acc-action" style="padding:6px 10px; font-size:11.5px; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1;" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas Arsip">
                📥 Arsip
              </button>
              <span style="font-size:10.5px; color:#1d4ed8; font-weight:700; background:#eff6ff; padding:3px 6px; border-radius:4px; border:1px solid #bfdbfe;">
                ⏳ Menunggu ACC di Akun Kepsek
              </span>
            `;
          }
        }

        item.innerHTML = `
          <div class="notif-item-info">
            <div class="notif-item-title-row">
              <span class="notif-item-name">${r.guruName}</span>
              <span class="badge-tag-pill" style="background:${typeBg}; color:${typeColor}; font-weight:700;">${r.type}</span>
              ${r.status === 'forwarded_to_kepsek' ? `<span class="badge-tag-pill" style="background:#eff6ff; color:#1d4ed8; font-size:9.5px;">📤 Diteruskan ke Kepsek</span>` : ''}
            </div>
            <div class="notif-item-sub">
              📅 <b>${r.mulai} s/d ${r.selesai}</b> &bull; NIP: ${r.nip}
            </div>
            <div class="notif-item-reason">
              ${r.ket} ${r.file ? `<span style="color:#059669; font-weight:700; margin-left:4px;">📎 ${r.file}</span>` : ''}
            </div>
          </div>
          <div class="notif-item-actions">
            ${notifActionsHtml}
          </div>
        `;
        leaveContainer.appendChild(item);
      });
    }
  }

  // Render Teacher Registrations in Modal
  const teacherContainer = document.getElementById('notifTeacherListContainer');
  if (teacherContainer) {
    teacherContainer.innerHTML = '';
    if (pendingTeachers.length === 0) {
      teacherContainer.innerHTML = `<div class="notif-empty-state">🎉 Tidak ada permohonan akun baru yang menunggu verifikasi.</div>`;
    } else {
      pendingTeachers.forEach(t => {
        const item = document.createElement('div');
        item.className = 'notif-item-card';
        item.innerHTML = `
          <div class="notif-item-info">
            <div class="notif-item-title-row">
              <span class="notif-item-name">${t.name}</span>
              <span class="badge-tag-pill" style="background:#eff6ff; color:#1d4ed8; font-weight:700;">${t.status || 'PNS'}</span>
            </div>
            <div class="notif-item-sub">
              📚 <b>${t.mapel || 'Guru Pengajar'}</b> &bull; NIP: ${t.nip}
            </div>
            <div class="notif-item-sub" style="font-size:11px; color:#64748b;">
              📧 ${t.email} &bull; 📱 ${t.phone || '-'}
            </div>
          </div>
          <div class="notif-item-actions">
            <button type="button" class="btn-acc-action approve" style="padding:6px 12px; font-size:11.5px;" onclick="approveTeacherAccount('${t.id || t.nip}')">
              ✓ ACC
            </button>
            <button type="button" class="btn-acc-action reject" style="padding:6px 10px; font-size:11.5px;" onclick="rejectTeacherAccount('${t.id || t.nip}')">
              ✕ Tolak
            </button>
          </div>
        `;
        teacherContainer.appendChild(item);
      });
    }
  }

  updateHeaderNotificationBadge();
}

function openNotifModal() {
  const modal = document.getElementById('modalNotifBackdrop');
  if (modal) {
    renderNotifModalContent();
    modal.classList.add('show');
  }
}

function closeNotifModal() {
  const modal = document.getElementById('modalNotifBackdrop');
  if (modal) modal.classList.remove('show');
}

/* ═════════════════════════════════════════════
   MODAL PROFIL ADMINISTRATOR
═════════════════════════════════════════════ */
function openProfileModal() {
  const modal = document.getElementById('modalProfileBackdrop');
  if (modal) {
    // Populate session user data if present
    const sessionUser = JSON.parse(sessionStorage.getItem('presensi_user') || 'null');
    if (sessionUser) {
      if (document.getElementById('modalAdminName')) document.getElementById('modalAdminName').textContent = sessionUser.name || 'Ibu Diah Safitri, S.Pd';
      if (document.getElementById('modalAdminNip')) document.getElementById('modalAdminNip').textContent = sessionUser.nip || '19890412 201402 2 003';
      if (document.getElementById('modalAdminNuptk')) document.getElementById('modalAdminNuptk').textContent = sessionUser.nuptk || '4741 7676 6821 0032';
      if (document.getElementById('modalAdminDept')) document.getElementById('modalAdminDept').textContent = sessionUser.mapel || 'Tim Pengembang Kurikulum & Kepegawaian';
      if (document.getElementById('modalAdminEmail')) document.getElementById('modalAdminEmail').textContent = sessionUser.email || 'diah.safitri@sekolah.sch.id';
      if (document.getElementById('modalAdminPhone')) document.getElementById('modalAdminPhone').textContent = sessionUser.phone || '+62 812-3456-7890';
      if (document.getElementById('modalAdminSchool')) document.getElementById('modalAdminSchool').textContent = '🏫 ' + (sessionUser.school || 'SMP Negeri 1 Surabaya');
      if (document.getElementById('modalAdminPhoto') && sessionUser.photo) document.getElementById('modalAdminPhoto').src = sessionUser.photo;
    }
    modal.classList.add('show');
  }
}

function closeProfileModal() {
  const modal = document.getElementById('modalProfileBackdrop');
  if (modal) modal.classList.remove('show');
}

function switchAdminTab(targetPageId) {
  const navBtn = document.querySelector(`.nav-item[data-page="${targetPageId}"]`);
  if (navBtn) navBtn.click();
}

function initHeaderModals() {
  const btnNotif = document.getElementById('btnAdminNotif');
  const btnProfile = document.getElementById('btnAdminProfile');
  const modalNotif = document.getElementById('modalNotifBackdrop');
  const modalProfile = document.getElementById('modalProfileBackdrop');

  const btnCloseNotif = document.getElementById('btnCloseModalNotif');
  const btnTutupNotif = document.getElementById('btnTutupNotif');
  const btnCloseProfile = document.getElementById('btnCloseModalProfile');
  const btnTutupProfile = document.getElementById('btnTutupProfile');

  const btnGoToIzin = document.getElementById('btnGoToIzinPage');
  const btnGoToVerifikasi = document.getElementById('btnGoToVerifikasiPage');
  const btnModalSettings = document.getElementById('btnModalProfileSettings');
  const btnModalLogout = document.getElementById('btnModalProfileLogout');

  if (btnNotif) btnNotif.addEventListener('click', openNotifModal);
  if (btnCloseNotif) btnCloseNotif.addEventListener('click', closeNotifModal);
  if (btnTutupNotif) btnTutupNotif.addEventListener('click', closeNotifModal);

  if (btnProfile) btnProfile.addEventListener('click', openProfileModal);
  if (btnCloseProfile) btnCloseProfile.addEventListener('click', closeProfileModal);
  if (btnTutupProfile) btnTutupProfile.addEventListener('click', closeProfileModal);

  if (modalNotif) {
    modalNotif.addEventListener('click', (e) => {
      if (e.target === modalNotif) closeNotifModal();
    });
  }
  if (modalProfile) {
    modalProfile.addEventListener('click', (e) => {
      if (e.target === modalProfile) closeProfileModal();
    });
  }

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNotifModal();
      closeProfileModal();
      if (typeof closeModalRekap === 'function') closeModalRekap();
      if (typeof closeEventModal === 'function') closeEventModal();
    }
  });

  if (btnGoToIzin) {
    btnGoToIzin.addEventListener('click', () => {
      closeNotifModal();
      switchAdminTab('pagePersetujuan');
    });
  }

  if (btnGoToVerifikasi) {
    btnGoToVerifikasi.addEventListener('click', () => {
      closeNotifModal();
      switchAdminTab('pageVerifikasi');
    });
  }

  if (btnModalSettings) {
    btnModalSettings.addEventListener('click', () => {
      closeProfileModal();
      switchAdminTab('pagePengaturan');
    });
  }

  if (btnModalLogout) {
    btnModalLogout.addEventListener('click', () => {
      closeProfileModal();
      const logoutBtn = document.getElementById('btnAdminLogout');
      if (logoutBtn) logoutBtn.click();
    });
  }
}

/* ─── LOGOUT ─── */
const btnLogout = document.getElementById('btnAdminLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin keluar dari Portal Administrator?')) {
      sessionStorage.removeItem('presensi_user');
      window.location.href = 'login.html';
    }
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', function () {
  initAdminMap();
  renderLiveFeed();
  renderPendingTeachers();
  renderLeaveRequests();
  renderAdminEvents();
  renderMasterTeachers();
  initKopSettingsForm();
  updateHeaderNotificationBadge();
  initHeaderModals();
});




