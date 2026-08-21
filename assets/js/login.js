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

  /*
   * ────────────────────────────────────────────────────────────
   * DEMO: Simulate authentication (replace with real API call)
   * ────────────────────────────────────────────────────────────
   */
  const DEMO_ACCOUNTS = {
    'admin':         { pass: 'admin123',   role: 'Admin',         redirect: 'dashboard-admin.html' },
    'guru':          { pass: 'guru123',    role: 'Guru',          redirect: 'dashboard-guru.html'  },
    'kepala_sekolah':{ pass: 'kepala123',  role: 'Kepala Sekolah',redirect: 'dashboard-kepala.html'},
    'diah':          { pass: '1234',       role: 'Admin',         redirect: 'dashboard-admin.html' },
  };

    const rawUsername = usernameEl.value.trim();
    const username = rawUsername.toLowerCase();
    const password = passwordEl.value;
    const account  = DEMO_ACCOUNTS[username];

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
      if (matchedRegistered.password === password) {
        showAlert('Login berhasil! Mengarahkan ke dashboard...', 'success');
        sessionStorage.setItem('presensi_user', JSON.stringify({
          username: matchedRegistered.nip,
          name:     matchedRegistered.name,
          role:     'Guru',
          loginAt:  new Date().toISOString()
        }));
        setTimeout(function () {
          window.location.href = 'dashboard-guru.html';
        }, 1200);
        return;
      }
    }

    if (account && account.pass === password) {
      showAlert('Login berhasil! Mengarahkan ke dashboard...', 'success');
      /* Store session info */
      sessionStorage.setItem('presensi_user', JSON.stringify({
        username: username,
        role:     account.role,
        loginAt:  new Date().toISOString()
      }));
      /* Redirect after short delay */
      setTimeout(function () {
        window.location.href = account.redirect === 'dashboard-admin.html' ? 'dashboard-guru.html' : account.redirect;
      }, 1200);
    } else {
      showAlert('Username / NIP atau password salah. Silakan coba lagi.');
      passwordEl.value = '';
      passwordEl.focus();
    }
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
