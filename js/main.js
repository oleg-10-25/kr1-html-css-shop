document.addEventListener('DOMContentLoaded', () => {
  initModalDialog();
  initBackToTopButton();
  initFormsHandling();
});

function initModalDialog() {
  const dialog = document.getElementById('fastOrderDialog');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');

  if (dialog && openBtn) {
    openBtn.addEventListener('click', () => {
      dialog.showModal();
    });
  }

  if (dialog && closeBtn) {
    closeBtn.addEventListener('click', () => {
      dialog.close();
    });
  }

  // Backdrop click close
  if (dialog) {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  }
}

function initBackToTopButton() {
  const btn = document.getElementById('btnToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initFormsHandling() {
  // Modal window form
  const fastForm = document.getElementById('fastOrderForm');
  if (fastForm) {
    fastForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dialog = document.getElementById('fastOrderDialog');
      if (dialog) dialog.close();
      showCustomNotification('Спасибо за заявку! Мы свяжемся с вами в течение 10 минут.');
      fastForm.reset();
    });
  }

  // Order main form
  const mainOrderForm = document.getElementById('mainOrderForm');
  if (mainOrderForm) {
    mainOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('userName')?.value || 'Покупатель';
      showCustomNotification(`Заказ успешно оформлен! Спасибо, ${userName}. Номер заказа #TS-2026-${Math.floor(Math.random() * 9000 + 1000)}`);
      mainOrderForm.reset();
    });
  }

  // Feedback form
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showCustomNotification('Ваше обращение принято! Мы ответим на указанную почту в течение 2 часов.');
      feedbackForm.reset();
    });
  }
}

function showCustomNotification(text) {
  let toast = document.getElementById('siteNotificationToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteNotificationToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background-color: #0f172a;
      color: #ffffff;
      padding: 14px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      border: 1px solid #38bdf8;
      font-size: 0.95rem;
      font-weight: 500;
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s ease;
      text-align: center;
      max-width: 90vw;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = text;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 4500);
}
