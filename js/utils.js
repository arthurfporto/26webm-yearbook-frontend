// notificações temporárias (toasts)
export function exibirToast(tipo, mensagem) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`; // tipo: 'sucesso' | 'erro'
  toast.textContent = mensagem;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
