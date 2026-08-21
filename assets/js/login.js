/* ============================================================
   LOGIN PAGE - JAVASCRIPT
   Presensi Guru | Form Validation & Interactions
   ============================================================ */

'use strict';

/* ─── ELEMENT REFERENCES ──────────────────────────────────── */
const loginForm   = document.getElementById('loginForm');
const usernameEl  = document.getElementById('username');
const passwordEl  = document.getElementById('password');
const btnLogin    = document.getElementById('btnLogin');
const btnLoader   = document.getElementById('btnLoader');
const alertBox    = document.getElementById('alertBox');
const alertMsg    = document.getElementById('alertMsg');
const togglePwd   = document.getElementById('togglePwd');
const eyeIcon     = document.getElementById('eyeIcon');
const eyeOffIcon  = document.getElementById('eyeOffIcon');
const forgotLink  = document.getElementById('forgotLink');
const remember    = document.getElementById('remember');
const roleButtons = document.querySelectorAll('.btn-role');

/* ─── SELECTED ROLE ───────────────────────────────────────── */
let selectedRole = null;

/* ─── USERNAME → ROLE MAPPING ────────────────────────────── */
// Peta: prefix/username → id tombol role & warna tema
const USERNAME_ROLE_MAP = [
  { match: /^admin/i,          btnId: 'btnAdmin',  role: 'Admin',          color: '#1a56db' },
  { match: /^guru/i,           btnId: 'btnGuru',   role: 'Guru',           color: '#059669' },
  { match: /^kepala/i,         btnId: 'btnKepala', role: 'Kepala Sekolah', color: '#7c3aed' },
  { match: /^diah/i,           btnId: 'btnAdmin',  role: 'Admin',          color: '#1a56db' },
  // Tambahkan pola NIP di sini, contoh:
  // { match: /^19[0-9]{6}/,   btnId: 'btnGuru',   role: 'Guru',           color: '#059669' },
];

/* ─── AUTO-DETECT ROLE FROM USERNAME ─────────────────────── */
function detectRoleFromUsername(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    // Kosongkan semua highlight jika input kosong
    clearRoleHighlight();
    return;
  }

  const found = USERNAME_ROLE_MAP.find(function (entry) {
    return entry.match.test(trimmed);
  });

  if (found) {
    highlightRoleButton(found.btnId, found.color);
    selectedRole = found.role;
  } else {
    clearRoleHighlight();
    selectedRole = null;
  }
}

function highlightRoleButton(activeBtnId, themeColor) {
  roleButtons.forEach(function (btn) {
    if (btn.id === activeBtnId) {
      btn.classList.add('active');
      btn.style.setProperty('--role-color', themeColor);
    } else {
      btn.classList.remove('active');
      btn.style.removeProperty('--role-color');
    }
  });
}

function clearRoleHighlight() {
  roleButtons.forEach(function (btn) {
    btn.classList.remove('active');
    btn.style.removeProperty('--role-color');
  });
}

/* ─── UTILITY: Show / Hide Alert ─────────────────────────── */
function showAlert(message, type = 'error') {
  alertMsg.textContent = message;
  alertBox.className   = 'alert-box show' + (type === 'success' ? ' success' : '');
}

function hideAlert() {
  alertBox.className = 'alert-box';
}

/* ─── UTILITY: Field Validation ──────────────────────────── */
function setError(groupId, errorId, message) {
  const group = document.getElementById(groupId);
  const error = document.getElementById(errorId);
  group.classList.add('error');
  error.textContent = message;
}

function clearError(groupId) {
  const group = document.getElementById(groupId);
  group.classList.remove('error');
}

function validateForm() {
  let valid = true;

  // Username
  clearError('groupUsername');
  const username = usernameEl.value.trim();
  if (!username) {
    setError('groupUsername', 'usernameError', 'Username / NIP tidak boleh kosong');
    valid = false;
  } else if (username.length < 3) {
    setError('groupUsername', 'usernameError', 'Username minimal 3 karakter');
    valid = false;
  }

  // Password
  clearError('groupPassword');
  const password = passwordEl.value;
  if (!password) {
    setError('groupPassword', 'passwordError', 'Password tidak boleh kosong');
    valid = false;
  } else if (password.length < 4) {
    setError('groupPassword', 'passwordError', 'Password minimal 4 karakter');
    valid = false;
  }

  return valid;
}

/* ─── TOGGLE PASSWORD VISIBILITY ─────────────────────────── */
togglePwd.addEventListener('click', function () {
  const isHidden = passwordEl.type === 'password';
  passwordEl.type   = isHidden ? 'text' : 'password';
  eyeIcon.style.display    = isHidden ? 'none'  : 'block';
  eyeOffIcon.style.display = isHidden ? 'block' : 'none';
  togglePwd.setAttribute('aria-label',
    isHidden ? 'Sembunyikan password' : 'Tampilkan password'
  );
});

/* ─── CLEAR ERRORS ON INPUT ───────────────────────────────── */
usernameEl.addEventListener('input', function () {
  clearError('groupUsername');
  hideAlert();
  // Auto-highlight tombol role sesuai username yang diketik
  detectRoleFromUsername(this.value);
});

passwordEl.addEventListener('input', function () {
  clearError('groupPassword');
  hideAlert();
});

/* ─── ROLE BUTTONS ────────────────────────────────────────── */
const ROLE_COLOR_MAP = {
  'btnAdmin':  '#1a56db',
  'btnGuru':   '#059669',
  'btnKepala': '#7c3aed',
};

roleButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Highlight tombol yang diklik dengan warna role-nya
    highlightRoleButton(btn.id, ROLE_COLOR_MAP[btn.id] || '#1a56db');
    selectedRole = btn.textContent.trim();

    // Autofill username sesuai role
    const roleMap = {
      'Admin':         'admin',
      'Guru':          'guru',
      'Kepala Sekolah':'kepala_sekolah'
    };
    usernameEl.value = roleMap[selectedRole] || '';
    usernameEl.focus();
    clearError('groupUsername');
    hideAlert();
  });
});

/* ─── FORGOT PASSWORD ─────────────────────────────────────── */
forgotLink.addEventListener('click', function (e) {
  e.preventDefault();
  showAlert('Silakan hubungi Admin sekolah untuk reset password.', 'error');
  setTimeout(hideAlert, 5000);
});

/* ─── REMEMBER ME – Restore saved username ────────────────── */
(function restoreRemembered() {
  const savedUser = localStorage.getItem('presensi_username');
  if (savedUser) {
    usernameEl.value   = savedUser;
    remember.checked   = true;
  }
})();

/* ─── FORM SUBMIT ─────────────────────────────────────────── */
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  hideAlert();

  if (!validateForm()) return;

  /* Save / clear remembered username */
  if (remember.checked) {
    localStorage.setItem('presensi_username', usernameEl.value.trim());
  } else {
    localStorage.removeItem('presensi_username');
  }

  /* Show loading state */
  btnLogin.classList.add('loading');
  btnLogin.disabled = true;

  /* ── 3 AKUN RESMI GURU & 1 AKUN ADMIN UNTUK LOGIN ── */
  const SYSTEM_ACCOUNTS = [
    {
      usernames: ['admin', 'administrator', 'admin.sekolah'],
      pass: 'admin123',
      altPass: '1234',
      name: 'Ibu Diah Safitri, S.Pd',
      nip: '19890412 201402 2 003',
      nuptk: '4741 7676 6821 0032',
      role: 'Admin',
      mapel: 'Administrator Sistem Presensi',
      status: 'PNS / Administrator',
      email: 'admin.presensi@smpn1.sch.id',
      phone: '+62 812-3456-7890',
      school: 'SMP Negeri 1 Surabaya',
      photo: 'assets/img/profile-diah.jpg',
      redirect: 'dashboard-admin.html'
    },
    {
      usernames: ['diah', '198904122014022003', 'diah.safitri'],
      pass: '1234',
      altPass: 'guru123',
      name: 'Ibu Diah Safitri, S.Pd',
      nip: '19890412 201402 2 003',
      nuptk: '4741 7676 6821 0032',
      role: 'Guru',
      mapel: 'Bahasa Indonesia & Wali Kelas VII-B',
      status: 'PNS / Guru Tetap',
      email: 'diah.safitri@sekolah.sch.id',
      phone: '+62 812-3456-7890',
      school: 'SMP Negeri 1 Surabaya',
      photo: 'assets/img/profile-diah.jpg',
      redirect: 'dashboard-guru.html'
    },
    {
      usernames: ['fauzi', '198506152010011012', 'ahmad.fauzi'],
      pass: '1234',
      altPass: 'guru123',
      name: 'Bpk. Ahmad Fauzi, M.Pd',
      nip: '19850615 201001 1 012',
      nuptk: '5832 8841 9912 0019',
      role: 'Guru',
      mapel: 'Matematika & Pembina OSIS',
      status: 'PNS / Guru Tetap',
      email: 'ahmad.fauzi@sekolah.sch.id',
      phone: '+62 813-8877-6655',
      school: 'SMP Negeri 1 Surabaya',
      photo: 'assets/img/profile-diah.jpg',
      redirect: 'dashboard-guru.html'
    },
    {
      usernames: ['siti', '199208202019032018', 'siti.nurhaliza', 'guru'],
      pass: '1234',
      altPass: 'guru123',
      name: 'Ibu Siti Nurhaliza, S.Si',
      nip: '19920820 201903 2 018',
      nuptk: '6921 7732 4410 0045',
      role: 'Guru',
      mapel: 'Ilmu Pengetahuan Alam (IPA)',
      status: 'PPPK',
      email: 'siti.nurhaliza@sekolah.sch.id',
      phone: '+62 821-9988-1122',
      school: 'SMP Negeri 1 Surabaya',
      photo: 'assets/img/profile-diah.jpg',
      redirect: 'dashboard-guru.html'
    },
    {
      usernames: ['kepala', 'kepala_sekolah', 'kepsek', '196803151994121002', 'bambang.sudarsono'],
      pass: 'kepala123',
      altPass: '1234',
      name: 'Dr. H. Bambang Sudarsono, M.Pd',
      nip: '19680315 199412 1 002',
      nuptk: '3412 7564 8901 0015',
      role: 'Kepala Sekolah',
      mapel: 'Kepala Sekolah (Pimpinan Satuan Pendidikan)',
      status: 'PNS / Pembina Utama Madya (IV/c)',
      email: 'kepsek@smpn1surabaya.sch.id',
      phone: '+62 811-9988-7766',
      school: 'SMP Negeri 1 Surabaya',
      photo: 'assets/img/profile-diah.jpg',
      redirect: 'dashboard-kepala.html'
    }
  ];

  setTimeout(function () {
    const rawUsername = usernameEl.value.trim();
    const username = rawUsername.toLowerCase();
    const password = passwordEl.value;

    btnLogin.classList.remove('loading');
    btnLogin.disabled = false;

    // Check newly registered teacher accounts from localStorage
    const registeredTeachers = JSON.parse(localStorage.getItem('registered_teachers') || '[]');
    const matchedRegistered = registeredTeachers.find(function (t) {
      return (t.nip === rawUsername || t.email.toLowerCase() === username || t.name.toLowerCase().includes(username));
    });

    if (matchedRegistered) {
      if (matchedRegistered.accountStatus === 'pending_approval') {
        showAlert(`⚠️ Akun Anda (${matchedRegistered.name}) sedang dalam proses verifikasi dan belum di-ACC oleh Admin Sekolah. Silakan tunggu konfirmasi Administrator.`, 'error');
        return;
      }
      if (matchedRegistered.accountStatus === 'inactive') {
        showAlert(`⚠️ Akun Anda (${matchedRegistered.name}) telah dinonaktifkan oleh Administrator Sekolah. Akses login ditutup.`, 'error');
        return;
      }
      if (matchedRegistered.password === password) {
        showAlert('Login berhasil! Mengarahkan ke dashboard...', 'success');
        sessionStorage.setItem('presensi_user', JSON.stringify({
          username: matchedRegistered.nip,
          name:     matchedRegistered.name,
          nip:      matchedRegistered.nip,
          nuptk:    matchedRegistered.nuptk,
          mapel:    matchedRegistered.mapel,
          status:   matchedRegistered.status,
          email:    matchedRegistered.email,
          phone:    matchedRegistered.phone,
          school:   matchedRegistered.school,
          photo:    matchedRegistered.photo,
          role:     'Guru',
          loginAt:  new Date().toISOString()
        }));
        setTimeout(function () {
          window.location.href = 'dashboard-guru.html';
        }, 1200);
        return;
      }
    }

    // Match Official Guru & Admin Accounts
    const matchedAccount = SYSTEM_ACCOUNTS.find(function (g) {
      const cleanUser = rawUsername.replace(/\s+/g, '').toLowerCase();
      return g.usernames.some(u => u.toLowerCase() === username || u.replace(/\s+/g, '') === cleanUser);
    });

    if (matchedAccount) {
      // Check if account has been deleted or deactivated in registered_teachers (only for regular Guru accounts)
      const currentTeachers = JSON.parse(localStorage.getItem('registered_teachers') || 'null');
      if (currentTeachers && matchedAccount.role === 'Guru') {
        const found = currentTeachers.find(t => t.nip === matchedAccount.nip);
        if (!found) {
          showAlert('⚠️ Akun ini telah dihapus dari sistem presensi oleh Administrator.', 'error');
          return;
        }
        if (found.accountStatus === 'inactive') {
          showAlert(`⚠️ Akun Anda (${matchedAccount.name}) sedang dinonaktifkan oleh Administrator. Akses login ditutup.`, 'error');
          return;
        }
      }

      if (matchedAccount.pass === password || matchedAccount.altPass === password) {
        showAlert(`Selamat datang, ${matchedAccount.name}! Mengarahkan ke dashboard...`, 'success');
        sessionStorage.setItem('presensi_user', JSON.stringify({
          username: matchedAccount.usernames[0],
          name:     matchedAccount.name,
          nip:      matchedAccount.nip,
          nuptk:    matchedAccount.nuptk,
          mapel:    matchedAccount.mapel,
          status:   matchedAccount.status,
          email:    matchedAccount.email,
          phone:    matchedAccount.phone,
          school:   matchedAccount.school,
          photo:    matchedAccount.photo,
          role:     matchedAccount.role,
          loginAt:  new Date().toISOString()
        }));
        setTimeout(function () {
          window.location.href = matchedAccount.redirect;
        }, 1200);
        return;
      }
    }

    showAlert('Username / NIP atau password salah. Silakan coba lagi.');
    passwordEl.value = '';
    passwordEl.focus();
  }, 1600);
});

/* ─── KEYBOARD SHORTCUT: Enter on username → focus password ── */
usernameEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    passwordEl.focus();
  }
});

/* ─── RIPPLE EFFECT ON LOGIN BUTTON ──────────────────────── */
btnLogin.addEventListener('click', function (e) {
  const rect   = btnLogin.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.style.cssText = [
    'position:absolute',
    `left:${e.clientX - rect.left - 20}px`,
    `top:${e.clientY - rect.top - 20}px`,
    'width:40px',
    'height:40px',
    'border-radius:50%',
    'background:rgba(255,255,255,0.25)',
    'transform:scale(0)',
    'animation:ripple 0.5s linear',
    'pointer-events:none'
  ].join(';');
  btnLogin.appendChild(ripple);
  setTimeout(function () { ripple.remove(); }, 500);
});

/* Inject ripple keyframes */
(function injectRippleStyle() {
  const s = document.createElement('style');
  s.textContent = '@keyframes ripple{to{transform:scale(8);opacity:0}}';
  document.head.appendChild(s);
})();
