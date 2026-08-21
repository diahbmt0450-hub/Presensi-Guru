/* ═══════════════════════════════════════════════════════════════════
   PORTAL KEPALA SEKOLAH - EXECUTIVE JAVASCRIPT
   SMP NEGERI 1 SURABAYA
   ═══════════════════════════════════════════════════════════════════ */

// Default dummy requests if not present
const INITIAL_LEAVE_REQUESTS = [
  {
    id: 'IZN-2026-001',
    guruName: 'Ibu Diah Safitri, S.Pd',
    nip: '19890412 201402 2 003',
    type: 'Dinas Luar',
    mulai: '2026-08-25',
    selesai: '2026-08-26',
    ket: 'Workshop Implementasi Kurikulum Merdeka di Balai Guru Penggerak',
    status: 'forwarded_to_kepsek',
    file: 'Surat_Tugas_Dinas.pdf'
  },
  {
    id: 'IZN-2026-002',
    guruName: 'Bpk. Ahmad Fauzi, M.Pd',
    nip: '19850615 201001 1 012',
    type: 'Sakit',
    mulai: '2026-08-22',
    selesai: '2026-08-23',
    ket: 'Sakit demam & flu, istirahat dokter RSUD Soetomo',
    status: 'forwarded_to_kepsek',
    file: 'Surat_Keterangan_Dokter.jpg'
  },
  {
    id: 'IZN-2026-003',
    guruName: 'Ibu Siti Nurhaliza, S.Si',
    nip: '19920820 201903 2 018',
    type: 'Izin Pribadi',
    mulai: '2026-08-28',
    selesai: '2026-08-28',
    ket: 'Menghadiri wisuda adik kandung di Universitas Airlangga',
    status: 'approved',
    file: 'Surat_Izin_Wisuda.pdf'
  }
];

function getLeaveRequests() {
  const local = JSON.parse(localStorage.getItem('teacher_pengajuan_admin') || 'null');
  if (!local || local.length === 0) {
    localStorage.setItem('teacher_pengajuan_admin', JSON.stringify(INITIAL_LEAVE_REQUESTS));
    return INITIAL_LEAVE_REQUESTS;
  }
  return local;
}

function saveLeaveRequests(data) {
  localStorage.setItem('teacher_pengajuan_admin', JSON.stringify(data));
}

function getRegisteredTeachers() {
  const defaultTeachers = [
    {
      id: 'guru-1',
      name: 'Ibu Diah Safitri, S.Pd',
      nip: '19890412 201402 2 003',
      nuptk: '4741 7676 6821 0032',
      mapel: 'Bahasa Indonesia & Wali Kelas VII-B',
      status: 'PNS / Guru Tetap',
      email: 'diah.safitri@sekolah.sch.id',
      phone: '+62 812-3456-7890',
      accountStatus: 'active',
      presentToday: true,
      timeIn: '06:45 WIB',
      statusToday: 'Hadir Tepat Waktu'
    },
    {
      id: 'guru-2',
      name: 'Bpk. Ahmad Fauzi, M.Pd',
      nip: '19850615 201001 1 012',
      nuptk: '5832 8841 9912 0019',
      mapel: 'Matematika & Pembina OSIS',
      status: 'PNS / Guru Tetap',
      email: 'ahmad.fauzi@sekolah.sch.id',
      phone: '+62 813-8877-6655',
      accountStatus: 'active',
      presentToday: false,
      statusToday: 'Sakit (Disposisi Kepsek)'
    },
    {
      id: 'guru-3',
      name: 'Ibu Siti Nurhaliza, S.Si',
      nip: '19920820 201903 2 018',
      nuptk: '6921 7732 4410 0045',
      mapel: 'Ilmu Pengetahuan Alam (IPA)',
      status: 'PPPK',
      email: 'siti.nurhaliza@sekolah.sch.id',
      phone: '+62 821-9988-1122',
      accountStatus: 'active',
      presentToday: true,
      timeIn: '06:50 WIB',
      statusToday: 'Hadir Tepat Waktu'
    },
    {
      id: 'guru-4',
      name: 'Bpk. Hendra Gunawan, S.Kom',
      nip: '19901105 201801 1 007',
      nuptk: '8129 4412 9012 0033',
      mapel: 'Informatika & Kepala Lab Komputer',
      status: 'PNS / Guru Tetap',
      email: 'hendra.gunawan@sekolah.sch.id',
      phone: '+62 856-1122-3344',
      accountStatus: 'active',
      presentToday: true,
      timeIn: '06:58 WIB',
      statusToday: 'Hadir Tepat Waktu'
    },
    {
      id: 'guru-5',
      name: 'Ibu Ratna Dewi, M.Pd',
      nip: '19870514 201101 2 009',
      nuptk: '7741 0029 8812 0054',
      mapel: 'Bahasa Inggris',
      status: 'PNS / Guru Tetap',
      email: 'ratna.dewi@sekolah.sch.id',
      phone: '+62 812-7788-9900',
      accountStatus: 'active',
      presentToday: true,
      timeIn: '07:12 WIB',
      statusToday: 'Terlambat (12 Menit)'
    }
  ];

  const local = JSON.parse(localStorage.getItem('registered_teachers') || 'null');
  if (!local || local.length === 0) {
    localStorage.setItem('registered_teachers', JSON.stringify(defaultTeachers));
    return defaultTeachers;
  }
  return local;
}

/* ─── TOAST NOTIFICATION ─── */
function showKepsekToast(msg, type = 'success') {
  let toast = document.getElementById('kepsekToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'kepsekToast';
    toast.className = 'kepsek-toast';
    document.body.appendChild(toast);
  }
  const icon = type === 'error' ? '❌' : (type === 'warning' ? '⚠️' : '✅');
  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ─── TAB NAVIGATION ─── */
function initTabNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-page]');
  const pages = document.querySelectorAll('.kepala-page');

  navItems.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetPageId = this.getAttribute('data-page');

      navItems.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      pages.forEach(p => {
        p.classList.remove('active');
        if (p.id === targetPageId) p.classList.add('active');
      });

      // Update header subtitle / breadcrumb
      const pageTitles = {
        'pageOverview': 'Beranda Eksekutif & Ringkasan Kehadiran',
        'pagePersetujuan': 'Disposisi & Persetujuan Resmi Permohonan Izin / Dinas',
        'pageMonitoring': 'Monitoring Presensi Guru & Tenaga Kependidikan Realtime',
        'pageLaporan': 'Laporan Eksekutif & Rekapitulasi Presensi Bulanan',
        'pageSupervisi': 'Agenda Supervisi Akademik & Kegiatan Pimpinan',
        'pageProfil': 'Profil Pimpinan Satuan Pendidikan & Tanda Tangan Digital'
      };
      const headerTitle = document.getElementById('headerPageTitle');
      if (headerTitle && pageTitles[targetPageId]) {
        headerTitle.textContent = pageTitles[targetPageId];
      }
    });
  });
}

/* ─── RENDER KPI STATS ─── */
function updateExecutiveKPIs() {
  const requests = getLeaveRequests();
  const teachers = getRegisteredTeachers();

  const pendingLeaves = requests.filter(r => r.status === 'forwarded_to_kepsek' || r.status === 'pending');
  const activeTeachers = teachers.filter(t => t.accountStatus === 'active');
  const presentCount = teachers.filter(t => t.presentToday).length;
  const attendanceRate = activeTeachers.length > 0 ? ((presentCount / activeTeachers.length) * 100).toFixed(1) : '100';

  // Badges & elements
  const elPendingBadge = document.getElementById('kpiPendingCount');
  const elPendingSidebarBadge = document.getElementById('badgeKepsekIzinCount');
  const elHeaderNotifBadge = document.getElementById('headerKepsekNotifBadge');
  const elTotalTeachers = document.getElementById('kpiTotalTeachers');
  const elAttendanceRate = document.getElementById('kpiAttendanceRate');
  const elPresentDetail = document.getElementById('kpiPresentDetail');

  if (elPendingBadge) elPendingBadge.textContent = pendingLeaves.length;
  if (elPendingSidebarBadge) {
    elPendingSidebarBadge.textContent = pendingLeaves.length;
    elPendingSidebarBadge.style.display = pendingLeaves.length > 0 ? 'inline-block' : 'none';
  }
  if (elHeaderNotifBadge) {
    elHeaderNotifBadge.textContent = pendingLeaves.length;
    elHeaderNotifBadge.style.display = pendingLeaves.length > 0 ? 'flex' : 'none';
  }
  if (elTotalTeachers) elTotalTeachers.textContent = `${activeTeachers.length} Pegawai`;
  if (elAttendanceRate) elAttendanceRate.textContent = `${attendanceRate}%`;
  if (elPresentDetail) elPresentDetail.textContent = `${presentCount} dari ${activeTeachers.length} Guru Hadir`;
}

/* ─── RENDER OVERVIEW RECENT APPROVALS ─── */
function renderOverviewPendingList() {
  const requests = getLeaveRequests();
  const container = document.getElementById('overviewPendingList');
  if (!container) return;

  const pendingItems = requests.filter(r => r.status === 'forwarded_to_kepsek' || r.status === 'pending');

  if (pendingItems.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 10px; color:#64748b;">
        <div style="font-size:32px; margin-bottom:6px;">🎉</div>
        <b>Seluruh Permohonan Telah Diproses</b>
        <p style="font-size:12px; margin-top:4px;">Tidak ada pengajuan izin/dinas yang menunggu persetujuan Kepala Sekolah saat ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  pendingItems.forEach(r => {
    const card = document.createElement('div');
    card.className = 'approval-item-card';
    const typeColor = r.type === 'Dinas Luar' ? '#1d4ed8' : (r.type === 'Sakit' ? '#b91c1c' : '#b45309');
    const typeBg = r.type === 'Dinas Luar' ? '#eff6ff' : (r.type === 'Sakit' ? '#fef2f2' : '#fef3c7');

    card.innerHTML = `
      <div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="approval-guru-name">${r.guruName}</span>
          <span style="background:${typeBg}; color:${typeColor}; font-size:11px; font-weight:700; padding:2px 8px; border-radius:6px;">${r.type}</span>
        </div>
        <div class="approval-meta-row">
          <span>📅 <b>${r.mulai} s/d ${r.selesai}</b></span> &bull;
          <span>NIP: ${r.nip}</span>
        </div>
        <div class="approval-reason-text">
          <b>Keperluan:</b> ${r.ket}
        </div>
      </div>
      <div class="approval-actions-box">
        <button class="btn-kepsek-doc" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas Arsip 2 Halaman">
          📄 Berkas
        </button>
        <button class="btn-kepsek-acc" onclick="kepsekApprove('${r.id}')" title="Setujui Pengajuan (ACC)">
          ✓ ACC
        </button>
        <button class="btn-kepsek-reject" onclick="kepsekReject('${r.id}')" title="Tolak Pengajuan">
          ✕ Tolak
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ─── RENDER FULL APPROVAL TABLE ─── */
let currentApprovalFilter = 'all';

function setApprovalFilter(filter) {
  currentApprovalFilter = filter;
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });
  renderFullApprovalTable();
}

function renderFullApprovalTable() {
  const requests = getLeaveRequests();
  const tableBody = document.getElementById('fullApprovalTableBody');
  if (!tableBody) return;

  let filtered = requests;
  if (currentApprovalFilter === 'pending') {
    filtered = requests.filter(r => r.status === 'forwarded_to_kepsek' || r.status === 'pending');
  } else if (currentApprovalFilter === 'approved') {
    filtered = requests.filter(r => r.status === 'approved');
  } else if (currentApprovalFilter === 'rejected') {
    filtered = requests.filter(r => r.status === 'rejected');
  }

  tableBody.innerHTML = '';

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#64748b;">Tidak ada data permohonan dengan filter yang dipilih.</td></tr>`;
    return;
  }

  filtered.forEach(r => {
    const tr = document.createElement('tr');
    let statusBadge = '';
    if (r.status === 'approved') {
      statusBadge = `<span style="background:#ecfdf5; color:#059669; font-weight:700; padding:4px 10px; border-radius:6px; border:1px solid #a7f3d0;">✓ Disetujui Kepsek</span>`;
    } else if (r.status === 'rejected') {
      statusBadge = `<span style="background:#fef2f2; color:#dc2626; font-weight:700; padding:4px 10px; border-radius:6px; border:1px solid #fecaca;">✕ Ditolak Kepsek</span>`;
    } else {
      statusBadge = `<span style="background:#faf5ff; color:#7c3aed; font-weight:700; padding:4px 10px; border-radius:6px; border:1px solid #e9d5ff;">⏳ Menunggu ACC Kepsek</span>`;
    }

    let actions = '';
    if (r.status === 'forwarded_to_kepsek' || r.status === 'pending') {
      actions = `
        <div style="display:flex; align-items:center; gap:6px;">
          <button class="btn-kepsek-doc" onclick="downloadLeaveDocument('${r.id}')" title="Unduh Berkas 2 Halaman">📄 Berkas</button>
          <button class="btn-kepsek-acc" onclick="kepsekApprove('${r.id}')">✓ ACC</button>
          <button class="btn-kepsek-reject" onclick="kepsekReject('${r.id}')">✕ Tolak</button>
        </div>
      `;
    } else {
      actions = `
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn-kepsek-doc" onclick="downloadLeaveDocument('${r.id}')">📄 Berkas</button>
          <span style="font-size:11.5px; font-weight:700; color:${r.status === 'approved' ? '#059669' : '#dc2626'};">
            ${r.status === 'approved' ? 'Telah Di-ACC' : 'Telah Ditolak'}
          </span>
        </div>
      `;
    }

    tr.innerHTML = `
      <td><b>${r.id}</b></td>
      <td><b>${r.guruName}</b><br><span style="font-size:11px; color:#64748b;">NIP: ${r.nip}</span></td>
      <td><span style="font-weight:700; font-size:11.5px;">${r.type}</span></td>
      <td>${r.mulai} s/d ${r.selesai}</td>
      <td style="max-width:240px; font-size:11.5px;">${r.ket} ${r.file ? `<br><a href="javascript:void(0)" onclick="downloadLeaveDocument('${r.id}')" style="color:#059669; font-weight:700; text-decoration:underline;">📎 ${r.file}</a>` : ''}</td>
      <td>${statusBadge}</td>
      <td>${actions}</td>
    `;
    tableBody.appendChild(tr);
  });
}

/* ─── KEPSEK ACTIONS (ACC / TOLAK) ─── */
window.kepsekApprove = function (id) {
  const reqs = getLeaveRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx !== -1) {
    reqs[idx].status = 'approved';
    reqs[idx].approvedByKepsekAt = new Date().toISOString();
    saveLeaveRequests(reqs);
    showKepsekToast(`✅ Permohonan <b>${reqs[idx].guruName}</b> telah resmi DISETUJUI (ACC) oleh Kepala Sekolah!`, 'success');
    updateExecutiveKPIs();
    renderOverviewPendingList();
    renderFullApprovalTable();
  }
};

window.kepsekReject = function (id) {
  if (!confirm('Apakah Anda yakin ingin MENOLAK permohonan izin/dinas ini?')) return;
  const reqs = getLeaveRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx !== -1) {
    reqs[idx].status = 'rejected';
    reqs[idx].rejectedByKepsekAt = new Date().toISOString();
    saveLeaveRequests(reqs);
    showKepsekToast(`❌ Permohonan <b>${reqs[idx].guruName}</b> telah DITOLAK oleh Kepala Sekolah.`, 'error');
    updateExecutiveKPIs();
    renderOverviewPendingList();
    renderFullApprovalTable();
  }
};

/* ─── POPULATE GURU INDIVIDU SELECT ─── */
function populateRekapGuruIndividuSelect() {
  const select = document.getElementById('rekapSelectGuruIndividu');
  if (!select) return;
  select.innerHTML = '';
  const teachers = getRegisteredTeachers().filter(t => t.accountStatus !== 'inactive');

  teachers.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.nip;
    opt.textContent = `${t.name} (NIP: ${t.nip} — ${t.mapel || 'Guru'})`;
    select.appendChild(opt);
  });
}

window.handleCakupanChange = function () {
  const cakupan = document.getElementById('rekapFilterCakupan')?.value || 'all';
  const containerIndividu = document.getElementById('containerPilihIndividu');
  if (containerIndividu) {
    containerIndividu.style.display = cakupan === 'individu' ? 'block' : 'none';
  }
  if (cakupan === 'individu') {
    populateRekapGuruIndividuSelect();
  }
  applyRekapFilters();
};

/* ─── APPLY REKAP & MONITORING FILTERS ─── */
window.applyRekapFilters = function () {
  const bulan = document.getElementById('rekapFilterBulan')?.value || 'Agustus 2026';
  const cakupan = document.getElementById('rekapFilterCakupan')?.value || 'all';
  const search = document.getElementById('rekapSearchInput')?.value.toLowerCase().trim() || '';
  const tableBody = document.getElementById('rekapGuruTableBody');
  const teachers = getRegisteredTeachers().filter(t => t.accountStatus !== 'inactive');

  let filtered = teachers;

  if (cakupan === 'individu') {
    const selectedNip = document.getElementById('rekapSelectGuruIndividu')?.value;
    if (selectedNip) {
      filtered = teachers.filter(t => t.nip === selectedNip);
    }
  } else if (cakupan === 'pns') {
    filtered = teachers.filter(t => (t.status || '').toUpperCase().includes('PNS'));
  } else if (cakupan === 'pppk') {
    filtered = teachers.filter(t => (t.status || '').toUpperCase().includes('PPPK'));
  } else if (cakupan === 'mapel_bahasa') {
    filtered = teachers.filter(t => {
      const m = (t.mapel || '').toLowerCase();
      return m.includes('bahasa') || m.includes('indonesia') || m.includes('inggris') || m.includes('jawa');
    });
  } else if (cakupan === 'mapel_mipa') {
    filtered = teachers.filter(t => {
      const m = (t.mapel || '').toLowerCase();
      return m.includes('matematika') || m.includes('ipa') || m.includes('fisika') || m.includes('biologi') || m.includes('informatika') || m.includes('komputer');
    });
  }

  if (search && cakupan !== 'individu') {
    filtered = filtered.filter(t => {
      return t.name.toLowerCase().includes(search) || t.nip.includes(search) || (t.mapel || '').toLowerCase().includes(search);
    });
  }

  // Update description bar
  const descEl = document.getElementById('rekapFilterDescriptionText');
  const statsEl = document.getElementById('rekapSummaryStatsText');

  const cakupanLabelMap = {
    'all': 'Seluruh Guru (Kolektif)',
    'individu': `Guru Spesifik: ${filtered[0] ? filtered[0].name : '-'}`,
    'pns': 'Guru PNS Tetap',
    'pppk': 'Guru PPPK',
    'mapel_bahasa': 'Rumpun Mata Pelajaran Bahasa',
    'mapel_mipa': 'Rumpun Mata Pelajaran MIPA & Informatika'
  };

  if (descEl) {
    descEl.innerHTML = `Menampilkan rekap presensi untuk: <b>${cakupanLabelMap[cakupan] || 'Kolektif'}</b> &bull; Periode: <b>${bulan}</b> (Total: ${filtered.length} Guru)`;
  }

  if (tableBody) {
    tableBody.innerHTML = '';
    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:30px; color:#64748b;">Tidak ada data guru yang cocok dengan filter.</td></tr>`;
      return;
    }

    let totalPersen = 0;

    filtered.forEach((t, idx) => {
      const tr = document.createElement('tr');

      // Generate realistic stats based on teacher
      let hadir = 21;
      let terlambat = 1;
      let izin = 0;
      let sakit = 0;
      let alpha = 0;

      if (t.name.includes('Ahmad Fauzi')) {
        hadir = 19; terlambat = 1; izin = 0; sakit = 2; alpha = 0;
      } else if (t.name.includes('Diah Safitri')) {
        hadir = 21; terlambat = 0; izin = 1; sakit = 0; alpha = 0;
      } else if (t.name.includes('Ratna Dewi')) {
        hadir = 20; terlambat = 2; izin = 0; sakit = 0; alpha = 0;
      }

      const totalEffective = 22;
      const persenNum = (((hadir + (terlambat * 0.8)) / totalEffective) * 100).toFixed(1);
      totalPersen += parseFloat(persenNum);

      let statusTodayBadge = '';
      if (t.presentToday) {
        statusTodayBadge = `<span style="color:#059669; font-weight:700; background:#ecfdf5; padding:3px 8px; border-radius:6px; font-size:11.5px; border:1px solid #a7f3d0;">🟢 Hadir ${t.timeIn || '06:45 WIB'}</span>`;
      } else if (t.statusToday && t.statusToday.includes('Sakit')) {
        statusTodayBadge = `<span style="color:#b91c1c; font-weight:700; background:#fef2f2; padding:3px 8px; border-radius:6px; font-size:11.5px; border:1px solid #fecaca;">🟡 Sakit (Disposisi)</span>`;
      } else {
        statusTodayBadge = `<span style="color:#1d4ed8; font-weight:700; background:#eff6ff; padding:3px 8px; border-radius:6px; font-size:11.5px; border:1px solid #bfdbfe;">🔵 Dinas Luar</span>`;
      }

      tr.innerHTML = `
        <td style="text-align:center; font-weight:bold;">${idx + 1}</td>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="assets/img/profile-diah.jpg" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:1.5px solid #7c3aed;" alt="Foto" />
            <div>
              <b>${t.name}</b><br>
              <span style="font-size:11px; color:#64748b;">NIP: ${t.nip} &bull; <span style="color:#7c3aed; font-weight:600;">${t.status || 'PNS'}</span></span>
            </div>
          </div>
        </td>
        <td style="font-size:12px;">${t.mapel || 'Guru Pengajar'}</td>
        <td style="text-align:center; font-weight:bold; color:#059669;">${hadir}</td>
        <td style="text-align:center; color:#d97706; font-weight:600;">${terlambat}</td>
        <td style="text-align:center; color:#2563eb; font-weight:600;">${izin}</td>
        <td style="text-align:center; color:#7c3aed; font-weight:600;">${sakit}</td>
        <td style="text-align:center; color:#dc2626; font-weight:600;">${alpha}</td>
        <td style="text-align:center;">
          <span style="background:${persenNum >= 95 ? '#ecfdf5' : '#fffbeb'}; color:${persenNum >= 95 ? '#059669' : '#b45309'}; font-weight:800; padding:3px 8px; border-radius:6px; font-size:11.5px;">
            ${persenNum}%
          </span>
        </td>
        <td>${statusTodayBadge}</td>
        <td>
          <button class="btn-kepsek-doc" style="padding:4px 10px; font-size:11px;" onclick="exportIndividualTeacherReport('${t.nip}', '${bulan}')" title="Cetak Rekap Individu untuk ${t.name}">
            🖨️ Cetak Rekap
          </button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    const avgPersen = (totalPersen / filtered.length).toFixed(1);
    if (statsEl) {
      statsEl.textContent = `Rata-rata Disiplin: ${avgPersen}% (${filtered.length} Guru)`;
    }
  }
};

/* ─── EXPORT MONTHLY REPORT (RESPECTS MONTH & FILTER) ─── */
window.exportMonthlyExecutiveReport = function () {
  const bulan = document.getElementById('rekapFilterBulan')?.value || 'Agustus 2026';
  const cakupan = document.getElementById('rekapFilterCakupan')?.value || 'all';
  const teachers = getRegisteredTeachers().filter(t => t.accountStatus !== 'inactive');

  let filtered = teachers;
  let subTitleText = 'Seluruh Tenaga Pendidik (Kolektif)';

  if (cakupan === 'individu') {
    const selectedNip = document.getElementById('rekapSelectGuruIndividu')?.value;
    if (selectedNip) {
      filtered = teachers.filter(t => t.nip === selectedNip);
      subTitleText = `Individu: ${filtered[0]?.name || ''} (NIP: ${selectedNip})`;
    }
  } else if (cakupan === 'pns') {
    filtered = teachers.filter(t => (t.status || '').toUpperCase().includes('PNS'));
    subTitleText = 'Kategori: Guru Pegawai Negeri Sipil (PNS)';
  } else if (cakupan === 'pppk') {
    filtered = teachers.filter(t => (t.status || '').toUpperCase().includes('PPPK'));
    subTitleText = 'Kategori: Guru PPPK';
  } else if (cakupan === 'mapel_bahasa') {
    filtered = teachers.filter(t => (t.mapel || '').toLowerCase().includes('bahasa'));
    subTitleText = 'Rumpun Mata Pelajaran Bahasa';
  } else if (cakupan === 'mapel_mipa') {
    filtered = teachers.filter(t => (t.mapel || '').toLowerCase().includes('matematika') || (t.mapel || '').toLowerCase().includes('ipa'));
    subTitleText = 'Rumpun Mata Pelajaran MIPA & Komputer';
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const rows = filtered.map((t, idx) => {
    let hadir = 21; let terlambat = 1; let izin = 0; let sakit = 0; let alpha = 0;
    if (t.name.includes('Ahmad Fauzi')) { hadir = 19; terlambat = 1; sakit = 2; }
    else if (t.name.includes('Diah Safitri')) { hadir = 21; izin = 1; }
    const persen = (((hadir + (terlambat * 0.8)) / 22) * 100).toFixed(1);

    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td><b>${t.name}</b><br><span style="font-size:8.5pt; color:#475569;">NIP: ${t.nip}</span></td>
        <td>${t.mapel || 'Guru'}</td>
        <td style="text-align:center; font-weight:bold; color:#059669;">${hadir}</td>
        <td style="text-align:center; color:#d97706;">${terlambat}</td>
        <td style="text-align:center; color:#2563eb;">${izin}</td>
        <td style="text-align:center; color:#7c3aed;">${sakit}</td>
        <td style="text-align:center; color:#dc2626;">${alpha}</td>
        <td style="text-align:center; font-weight:bold;">${persen}%</td>
      </tr>
    `;
  }).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Rekapitulasi Presensi - ${bulan} - Kepala Sekolah</title>
      <style>
        @page { size: A4 landscape; margin: 12mm 15mm; }
        body { font-family: 'Times New Roman', serif; font-size: 10.5pt; color: #000; padding: 10px; line-height: 1.3; }
        .no-print { background: #1e1b4b; color: #fff; padding: 10px 16px; margin-bottom: 15px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-family: sans-serif; font-size: 13px; }
        .btn-p { background: #7c3aed; color: #fff; border: none; padding: 7px 16px; border-radius: 4px; font-weight: bold; cursor: pointer; }
        .kop-table { width: 100%; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 12px; border-collapse: collapse; text-align: center; }
        table.data-t { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 9.5pt; }
        table.data-t th, table.data-t td { border: 1px solid #333; padding: 5px 8px; }
        table.data-t th { background: #f1f5f9; text-align: center; }
        .ttd { display: flex; justify-content: flex-end; margin-top: 25px; page-break-inside: avoid; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print">
        <span>📄 <b>LAPORAN REKAPITULASI PRESENSI GURU</b> &bull; Periode: ${bulan}</span>
        <button class="btn-p" onclick="window.print()">🖨️ Cetak / Unduh Dokumen (PDF)</button>
      </div>

      <table class="kop-table">
        <tr>
          <td>
            <div style="font-size:12pt; font-weight:bold;">PEMERINTAH KOTA SURABAYA — DINAS PENDIDIKAN</div>
            <div style="font-size:15pt; font-weight:bold; margin:2px 0;">SEKOLAH MENENGAH PERTAMA NEGERI 1 SURABAYA</div>
            <div style="font-size:9pt; font-style:italic;">Jalan Pacar No. 4-6, Telepon (031) 5342158, Email: info@smpn1surabaya.sch.id</div>
          </td>
        </tr>
      </table>

      <div style="text-align:center; margin-bottom:12px;">
        <div style="font-size:13pt; font-weight:bold; text-decoration:underline;">LAPORAN REKAPITULASI KEHADIRAN & KEDISIPLINAN GURU</div>
        <div style="font-size:10pt; font-weight:bold; margin-top:3px;">PERIODE BULAN: ${bulan.toUpperCase()} &bull; ${subTitleText.toUpperCase()}</div>
      </div>

      <table class="data-t">
        <thead>
          <tr>
            <th rowspan="2" style="width:30px;">No</th>
            <th rowspan="2">Nama Guru / Pegawai</th>
            <th rowspan="2">Mata Pelajaran</th>
            <th colspan="5">Rincian Kehadiran (Hari Kerja)</th>
            <th rowspan="2">% Disiplin</th>
          </tr>
          <tr>
            <th>Hadir</th>
            <th>Terlambat</th>
            <th>Izin</th>
            <th>Sakit</th>
            <th>Alpha</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="ttd">
        <div style="text-align:center; width:260px; font-size:10pt;">
          <div>Surabaya, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div><b>Kepala SMP Negeri 1 Surabaya</b></div>
          <div style="height:55px;"></div>
          <b><u>Dr. H. Bambang Sudarsono, M.Pd</u></b><br>
          <span>NIP. 19680315 199412 1 002</span>
        </div>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};

/* ─── EXPORT INDIVIDUAL TEACHER REPORT (LAMPIRAN SEBULAN PENUH DENGAN FOTO & GEOTAGGING GPS) ─── */
window.exportIndividualTeacherReport = function (nip, customBulan) {
  const bulan = customBulan || document.getElementById('rekapFilterBulan')?.value || 'Agustus 2026';
  const teachers = getRegisteredTeachers();
  const t = teachers.find(g => g.nip === nip);
  if (!t) return;

  const printWindow = window.open('', '_blank', 'width=1150,height=900');
  if (!printWindow) {
    alert('Mohon izinkan pop-up browser untuk mencetak laporan individu presensi.');
    return;
  }

  // Stat calculations
  let stat = { hadir: 21, terlambat: 1, izin: 0, sakit: 0, alpha: 0, totalKerja: 22, persen: '95.5%' };
  if (t.name.includes('Ahmad Fauzi')) {
    stat = { hadir: 19, terlambat: 1, izin: 0, sakit: 2, alpha: 0, totalKerja: 22, persen: '86.4%' };
  } else if (t.name.includes('Diah Safitri')) {
    stat = { hadir: 21, terlambat: 0, izin: 1, sakit: 0, alpha: 0, totalKerja: 22, persen: '95.5%' };
  } else if (t.name.includes('Ratna Dewi')) {
    stat = { hadir: 20, terlambat: 2, izin: 0, sakit: 0, alpha: 0, totalKerja: 22, persen: '90.9%' };
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
    { tgl: '14 Agu 2026', hari: 'Jumat', masuk: '--:--:--', pulang: '--:--:--', lat: 'Diverifikasi Surat', radius: 'Disposisi Resmi', status: t.name.includes('Ahmad Fauzi') ? 'Sakit (Surat Dokter RSUD)' : 'Izin Dinas Luar (SPT BGP)', ket: 'Disetujui Kepala Sekolah', fotoMasuk: null, fotoPulang: null },
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
        <td style="text-align:center; padding: 4px;">
          ${log.fotoMasuk ? `
            <div style="display:inline-flex; flex-direction:column; align-items:center;">
              <img src="${log.fotoMasuk}" style="width:34px; height:34px; object-fit:cover; border-radius:4px; border:1px solid #94a3b8;" alt="Foto Masuk" />
              <b style="font-size:7.5pt; color:#059669; margin-top:2px;">${log.masuk}</b>
            </div>
          ` : '<span style="color:#94a3b8; font-weight:bold; font-size:8pt;">--:--:--</span>'}
        </td>
        <td style="text-align:center; padding: 4px;">
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
      <title>Laporan Rincian Presensi Sebulan - ${t.name} - ${bulan}</title>
      <style>
        @page { size: A4 portrait; margin: 10mm 12mm; }
        * { box-sizing: border-box; margin:0; padding:0; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 9.5pt; color: #000; padding: 10px; line-height: 1.3; }
        .no-print { background: #1e1b4b; color: #fff; padding: 10px 16px; margin-bottom: 14px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-family: sans-serif; font-size: 13px; }
        .btn-p { background: #7c3aed; color: #fff; border: none; padding: 7px 16px; border-radius: 4px; font-weight: bold; cursor: pointer; }
        
        .kop-surat { display: flex; align-items: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 10px; }
        .kop-text { flex: 1; text-align: center; line-height: 1.15; }
        .kop-text h4 { margin: 0; font-size: 11pt; font-weight: normal; }
        .kop-text h2 { margin: 2px 0; font-size: 13.5pt; font-weight: bold; }
        .kop-text p { margin: 1px 0; font-size: 8pt; font-style: italic; }
        
        .doc-title { text-align: center; margin-bottom: 10px; }
        .doc-title h3 { margin: 0; font-size: 11.5pt; text-decoration: underline; font-weight: bold; }
        .doc-title p { margin: 2px 0 0; font-size: 9pt; font-weight: bold; }
        
        /* Profile & Summary Grid */
        .profile-summary-box { display: flex; gap: 12px; border: 1.5px solid #333; border-radius: 5px; padding: 8px 10px; margin-bottom: 10px; background:#fafafa; }
        .profile-photo { width: 75px; height: 90px; object-fit: cover; border-radius: 4px; border: 1px solid #777; flex-shrink: 0; }
        .profile-info { flex: 1; font-size: 8.5pt; line-height: 1.35; }
        .profile-info table { width: 100%; border-collapse: collapse; margin: 0; font-size: 8.5pt; }
        .profile-info td { border: none; padding: 1.5px 3px; }
        
        .stats-kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px; margin-bottom: 10px; }
        .stat-kpi-card { border: 1px solid #444; border-radius: 4px; padding: 5px; text-align: center; background:#fff; }
        .stat-kpi-val { font-size: 12pt; font-weight: bold; line-height: 1; }
        .stat-kpi-lbl { font-size: 7pt; text-transform: uppercase; color: #555; margin-top: 2px; }

        table.log-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 8pt; page-break-inside: auto; }
        table.log-table tr { page-break-inside: avoid; page-break-after: auto; }
        table.log-table th, table.log-table td { border: 1px solid #444; padding: 3px 5px; vertical-align: middle; }
        table.log-table th { background-color: #f1f5f9; text-align: center; font-weight: bold; font-size: 8pt; }
        
        .ttd-section { display: flex; justify-content: space-between; margin-top: 14px; page-break-inside: avoid; }
        .ttd-box { width: 240px; text-align: center; font-size: 9pt; line-height: 1.3; }
        .ttd-space { height: 45px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print">
        <span>📄 <b>LAPORAN PRESENSI SEBULAN PENUH (FOTO, GPS & KETERANGAN)</b> &bull; ${t.name}</span>
        <button class="btn-p" onclick="window.print()">🖨️ Cetak / Unduh Dokumen (PDF)</button>
      </div>

      <div class="kop-surat">
        <svg width="55" height="55" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:12px; flex-shrink:0;">
          <circle cx="50" cy="50" r="46" fill="#7c3aed" stroke="#5b21b6" stroke-width="3"/>
          <circle cx="50" cy="50" r="39" fill="#ffffff" stroke="#fbbf24" stroke-width="2"/>
          <path d="M50 18 L54 30 L66 32 L57 41 L59 53 L50 47 L41 53 L43 41 L34 32 L46 30 Z" fill="#f59e0b"/>
          <path d="M28 66 C28 54 72 54 72 66 C62 74 38 74 28 66 Z" fill="#7c3aed"/>
          <text x="50" y="82" font-family="Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#4c1d95" text-anchor="middle">SMPN 1 SURABAYA</text>
        </svg>
        <div class="kop-text">
          <h4>PEMERINTAH KOTA SURABAYA</h4>
          <h4>DINAS PENDIDIKAN</h4>
          <h2>SEKOLAH MENENGAH PERTAMA NEGERI 1 SURABAYA</h2>
          <p>Jalan Pacar No. 4-6, Telepon (031) 5342158, Email: info@smpn1surabaya.sch.id</p>
        </div>
      </div>

      <div class="doc-title">
        <h3>REKAPITULASI PRESENSI & LOG GEOTAGGING SEBULAN LENGKAP</h3>
        <p>PERIODE: ${bulan.toUpperCase()} &bull; UNIT KERJA: SMP NEGERI 1 SURABAYA</p>
      </div>

      <!-- Profil & Identitas Guru -->
      <div class="profile-summary-box">
        <img src="${t.photo || 'assets/img/profile-diah.jpg'}" class="profile-photo" alt="${t.name}" />
        <div class="profile-info">
          <table>
            <tr><td style="width:125px;"><b>Nama Lengkap & Gelar</b></td><td>: <b>${t.name}</b></td></tr>
            <tr><td><b>NIP / NUPTK</b></td><td>: ${t.nip} / ${t.nuptk || '-'}</td></tr>
            <tr><td><b>Jabatan / Tugas</b></td><td>: ${t.mapel || 'Tenaga Pendidik'}</td></tr>
            <tr><td><b>Status Kepegawaian</b></td><td>: ${t.status || 'PNS / Guru Tetap'}</td></tr>
            <tr><td><b>Email Kedinasan</b></td><td>: ${t.email || '-'}</td></tr>
            <tr><td><b>Periode Evaluasi</b></td><td>: <b>${bulan}</b> (22 Hari Kerja Efektif)</td></tr>
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
        <div class="stat-kpi-card" style="background:#ecfdf5; border-color:#059669;"><div class="stat-kpi-val" style="color:#059669;">${stat.persen}</div><div class="stat-kpi-lbl" style="color:#065f46; font-weight:bold;">Disiplin</div></div>
      </div>

      <!-- Tabel Lampiran Log Geotagging & Kamera Harian Selama Sebulan Penuh -->
      <div style="font-weight:bold; font-size:8.5pt; margin-bottom:4px; text-transform:uppercase; color:#0f172a; border-left:3px solid #7c3aed; padding-left:6px;">
        Lampiran Log Presensi Harian Sebulan (Foto Kamera Selfie Masuk/Pulang, Koordinat Geotagging GPS, Validasi Radius Geofence & Keterangan):
      </div>
      <table class="log-table">
        <thead>
          <tr>
            <th style="width:20px;">No</th>
            <th style="width:75px;">Hari / Tgl</th>
            <th style="width:70px;">Presensi Masuk</th>
            <th style="width:70px;">Presensi Pulang</th>
            <th>Titik Koordinat GPS & Validasi Radius Geofence</th>
            <th style="width:130px;">Keterangan & Catatan</th>
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
          <p><b><u>${t.name}</u></b><br>NIP. ${t.nip}</p>
        </div>

        <div class="ttd-box">
          <p>Surabaya, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br><b>Kepala SMP Negeri 1 Surabaya</b></p>
          <div class="ttd-space"></div>
          <p><b><u>Dr. H. Bambang Sudarsono, M.Pd</u></b><br>NIP. 19680315 199412 1 002</p>
        </div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

/* ─── EXPORT CSV ─── */
window.exportRekapCSV = function () {
  const bulan = document.getElementById('rekapFilterBulan')?.value || 'Agustus 2026';
  const teachers = getRegisteredTeachers().filter(t => t.accountStatus !== 'inactive');

  let csvContent = '\uFEFFNo,Nama Guru,NIP,Mata Pelajaran,Status,Hadir,Terlambat,Izin,Sakit,Alpha,Persentase,Periode\n';

  teachers.forEach((t, idx) => {
    let hadir = 21; let terlambat = 1; let izin = 0; let sakit = 0; let alpha = 0;
    if (t.name.includes('Ahmad Fauzi')) { hadir = 19; terlambat = 1; sakit = 2; }
    else if (t.name.includes('Diah Safitri')) { hadir = 21; izin = 1; }
    const persen = (((hadir + (terlambat * 0.8)) / 22) * 100).toFixed(1);

    csvContent += `"${idx + 1}","${t.name}","${t.nip}","${t.mapel || 'Guru'}","${t.status || 'PNS'}","${hadir}","${terlambat}","${izin}","${sakit}","${alpha}","${persen}%","${bulan}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Presensi_SMPN1_${bulan.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showKepsekToast(`📊 File CSV Rekap Presensi periode <b>${bulan}</b> berhasil diunduh.`, 'success');
};

/* ─── REALTIME CLOCK ─── */
function initRealtimeClock() {
  function update() {
    const el = document.getElementById('realtimeDateTime');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) + ' — ' + now.toLocaleTimeString('id-ID') + ' WIB';
    }
  }
  update();
  setInterval(update, 1000);
}

/* ─── LOGOUT ─── */
function initLogout() {
  const btn = document.getElementById('btnKepsekLogout');
  if (btn) {
    btn.addEventListener('click', function () {
      if (confirm('Apakah Anda yakin ingin keluar dari Portal Kepala Sekolah?')) {
        sessionStorage.removeItem('presensi_user');
        window.location.href = 'login.html';
      }
    });
  }
}

/* ─── INITIALIZATION ─── */
document.addEventListener('DOMContentLoaded', function () {
  initRealtimeClock();
  initTabNavigation();
  updateExecutiveKPIs();
  renderOverviewPendingList();
  renderFullApprovalTable();
  populateRekapGuruIndividuSelect();
  applyRekapFilters();
  initLogout();
});
