export const shouldShowDailyReminder = () => {
  const lastShown = localStorage.getItem('mf_last_reminder_date');
  const today = new Date().toISOString().split('T')[0];

  if (lastShown !== today) {
    localStorage.setItem('mf_last_reminder_date', today);
    return true; // Es la primera visita del día
  }
  return false;
};