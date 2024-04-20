const toggleSwitch = document.getElementById('toggle-mode');
const toggleMode = document.getElementById('toggle-mode');
const body = document.body;
const html = document.documentElement;

toggleMode.addEventListener('change', () => {
    if (toggleMode.checked) {
      html.classList.remove('dark-mode');
      html.style.setProperty('--cor-primaria', '#ffffff');
      html.style.setProperty('--cor-secundaria', '#3f3f3f');
      html.style.setProperty('--cor-terciaria', '#dddddd');
      html.style.setProperty('--cor-destaque', '#292828');
      html.style.setProperty('--text-cor-primaria', '#ffffff');
      html.style.setProperty('--text-cor-secundaria', '#3f3f3f');
    } else {
      html.classList.add('dark-mode');
      html.style.setProperty('--cor-primaria', '#4d4d4d');
      html.style.setProperty('--cor-secundaria', '#292828');
      html.style.setProperty('--cor-terciaria', '#3f3f3f');
      html.style.setProperty('--cor-destaque', '#222222');
      html.style.setProperty('--text-cor-primaria', '#ffffff');
      html.style.setProperty('--text-cor-secundaria', '#dddddd');
    }
});

function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('dark-mode', isDarkMode);
}


function updateSwitch() {
  const isDarkMode = localStorage.getItem('dark-mode') === 'true';
  toggleSwitch.checked = isDarkMode;
  if (isDarkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}

updateSwitch();