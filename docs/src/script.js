(() => {
  'use strict';

  const STORAGE_KEY = 'contacts_v1';
  const THEME_KEY = 'theme';
  const LANG_KEY = 'lang';

  const i18n = {
    'en-US': {
      appTitle: 'Contact List',
      addContact: 'Add Contact',
      name: 'Name',
      phone: 'Phone',
      photo: 'Profile Photo',
      save: 'Save',
      reset: 'Reset',
      contacts: 'Contacts',
      searchPlaceholder: 'Search by name or phone',
      clearAll: 'Clear All',
      empty: 'No contacts yet. Add one using the form.',
      saved: 'Contact saved',
      deleted: 'Contact deleted',
      cleared: 'All contacts cleared',
      confirmClear: 'Are you sure you want to delete all contacts?',
      confirmDelete: 'Delete contact?',
      cancel: 'Cancel',
      delete: 'Delete'
    },
    'pt-BR': {
      appTitle: 'Lista de Contatos',
      addContact: 'Adicionar Contato',
      name: 'Nome',
      phone: 'Telefone',
      photo: 'Foto de Perfil',
      save: 'Salvar',
      reset: 'Limpar',
      contacts: 'Contatos',
      searchPlaceholder: 'Pesquisar por nome ou telefone',
      clearAll: 'Limpar Tudo',
      empty: 'Nenhum contato. Adicione usando o formulário.',
      saved: 'Contato salvo',
      deleted: 'Contato excluído',
      cleared: 'Todos os contatos foram removidos',
      confirmClear: 'Tem certeza que deseja excluir todos os contatos?',
      confirmDelete: 'Excluir contato?',
      cancel: 'Cancelar',
      delete: 'Excluir'
    },
    'es-ES': {
      appTitle: 'Lista de Contactos',
      addContact: 'Agregar Contacto',
      name: 'Nombre',
      phone: 'Teléfono',
      photo: 'Foto de Perfil',
      save: 'Guardar',
      reset: 'Restablecer',
      contacts: 'Contactos',
      searchPlaceholder: 'Buscar por nombre o teléfono',
      clearAll: 'Borrar Todo',
      empty: 'No hay contactos. Agrega uno usando el formulario.',
      saved: 'Contacto guardado',
      deleted: 'Contacto eliminado',
      cleared: 'Todos los contactos han sido borrados',
      confirmClear: '¿Seguro que quieres eliminar todos los contactos?',
      confirmDelete: '¿Eliminar contacto?',
      cancel: 'Cancelar',
      delete: 'Eliminar'
    }
  };

  // Elements
  const el = {
    appTitle: document.getElementById('app-title'),
    formTitle: document.getElementById('form-title'),
    labelName: document.getElementById('label-name'),
    labelPhone: document.getElementById('label-phone'),
    labelPhoto: document.getElementById('label-photo'),
    saveBtn: document.getElementById('save-btn'),
    resetBtn: document.getElementById('reset-btn'),
    contactsList: document.getElementById('contacts'),
    contactForm: document.getElementById('contact-form'),
    nameInput: document.getElementById('name'),
    phoneInput: document.getElementById('phone'),
    photoInput: document.getElementById('photo'),
    feedback: document.getElementById('form-feedback'),
    emptyState: document.getElementById('empty-state'),
    searchInput: document.getElementById('search'),
    clearAllBtn: document.getElementById('clear-all'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    langSelect: document.getElementById('lang'),
    footerText: document.getElementById('footer-text'),
    listTitle: document.getElementById('list-title')
  };

  // Utilities
  const readStorage = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const writeStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Contacts management
  let contacts = readStorage(STORAGE_KEY, []);
  let currentLang = localStorage.getItem(LANG_KEY) || 'en-US';
  let currentTheme = localStorage.getItem(THEME_KEY) || 'dark';

  // Initialize UI
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      el.themeToggle.setAttribute('aria-pressed', 'false');
      el.themeIcon.innerHTML = '☀️';
      el.themeToggle.setAttribute('aria-label', 'Toggle light mode');
    } else {
      document.documentElement.classList.remove('light');
      el.themeToggle.setAttribute('aria-pressed', 'true');
      el.themeIcon.innerHTML = '🌙';
      el.themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
    localStorage.setItem(THEME_KEY, theme);
    currentTheme = theme;
  }

  function setLanguage(lang) {
    if (!i18n[lang]) lang = 'en-US';
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    el.langSelect.value = lang;

    const t = i18n[lang];
    el.appTitle.textContent = t.appTitle;
    el.formTitle.textContent = t.addContact;
    el.labelName.textContent = t.name;
    el.labelPhone.textContent = t.phone;
    el.labelPhoto.textContent = t.photo;
    el.saveBtn.textContent = t.save;
    el.resetBtn.textContent = t.reset;
    el.listTitle.textContent = t.contacts;
    el.searchInput.placeholder = t.searchPlaceholder;
    el.clearAllBtn.textContent = t.clearAll;
    el.emptyState.textContent = t.empty;
    el.footerText.textContent = `Developed by Nivaldo Beirão`;
  }

  // Render contacts
  function renderContacts(filter = '') {
    el.contactsList.innerHTML = '';
    const normalized = filter.trim().toLowerCase();
    const filtered = contacts.filter(c => {
      if (!normalized) return true;
      return (c.name || '').toLowerCase().includes(normalized) ||
             (c.phone || '').toLowerCase().includes(normalized);
    });

    if (filtered.length === 0) {
      el.emptyState.style.display = 'block';
    } else {
      el.emptyState.style.display = 'none';
    }

    filtered.forEach(contact => {
      const li = document.createElement('li');
      li.className = 'contact-item';
      li.setAttribute('tabindex', '0');

      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      if (contact.photo) {
        const img = document.createElement('img');
        img.src = contact.photo;
        img.alt = `${contact.name || 'Contact'} profile photo`;
        avatar.appendChild(img);
      } else {
        avatar.textContent = contact.name ? contact.name.charAt(0).toUpperCase() : '—';
      }

      const meta = document.createElement('div');
      meta.className = 'contact-meta';
      const nameEl = document.createElement('div');
      nameEl.className = 'contact-name';
      nameEl.textContent = contact.name || '';
      const phoneEl = document.createElement('div');
      phoneEl.className = 'contact-phone';
      phoneEl.textContent = contact.phone || '';

      meta.appendChild(nameEl);
      meta.appendChild(phoneEl);

      const actions = document.createElement('div');
      actions.className = 'contact-actions';

      const delBtn = document.createElement('button');
      delBtn.className = 'danger';
      delBtn.type = 'button';
      delBtn.textContent = i18n[currentLang].delete;
      delBtn.setAttribute('aria-label', `${i18n[currentLang].delete} ${contact.name || ''}`);
      delBtn.addEventListener('click', () => {
        if (confirm(i18n[currentLang].confirmDelete)) {
          contacts = contacts.filter(c => c.id !== contact.id);
          writeStorage(STORAGE_KEY, contacts);
          renderContacts(el.searchInput.value);
          showFeedback(i18n[currentLang].deleted);
        }
      });

      actions.appendChild(delBtn);

      li.appendChild(avatar);
      li.appendChild(meta);
      li.appendChild(actions);

      el.contactsList.appendChild(li);
    });
  }

  // Feedback
  function showFeedback(msg, timeout = 2200) {
    el.feedback.textContent = msg;
    setTimeout(() => {
      el.feedback.textContent = '';
    }, timeout);
  }

  // Helpers
  function uid() {
    return 'id-' + Math.random().toString(36).slice(2, 9);
  }

  // Form handling
  el.contactForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const name = el.nameInput.value.trim();
    const phone = el.phoneInput.value.trim();

    if (!name) {
      el.nameInput.focus();
      return;
    }

    let photoData = null;
    const file = el.photoInput.files && el.photoInput.files[0];
    if (file) {
      try {
        photoData = await readFileAsDataURL(file);
      } catch (err) {
        console.error('Image read error', err);
      }
    }

    const newContact = {
      id: uid(),
      name,
      phone,
      photo: photoData
    };

    contacts.unshift(newContact);
    writeStorage(STORAGE_KEY, contacts);
    renderContacts(el.searchInput.value);
    el.contactForm.reset();
    showFeedback(i18n[currentLang].saved);
    el.nameInput.focus();
  });

  el.contactForm.addEventListener('reset', () => {
    setTimeout(() => el.nameInput.focus(), 0);
  });

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  // Search
  el.searchInput.addEventListener('input', (e) => {
    renderContacts(e.target.value);
  });

  // Clear all
  el.clearAllBtn.addEventListener('click', () => {
    if (!contacts.length) return;
    if (confirm(i18n[currentLang].confirmClear)) {
      contacts = [];
      writeStorage(STORAGE_KEY, contacts);
      renderContacts();
      showFeedback(i18n[currentLang].cleared);
    }
  });

  // Theme toggle
  el.themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // Language change
  el.langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    renderContacts(el.searchInput.value);
  });

  // Keyboard accessibility: Enter on list item opens nothing but keeps focus
  el.contactsList.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.querySelector('li')?.focus();
    }
  });

  // Initialize app
  function init() {
    // Apply saved theme and language
    applyTheme(currentTheme);
    setLanguage(currentLang);

    // Populate language selector
    el.langSelect.value = currentLang;

    // Render existing contacts
    renderContacts();

    // Focus first input for quick keyboard use
    el.nameInput.focus();
  }

  // Run
  init();

})();
