const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('preview-area');
const progressBar = document.getElementById('progress-bar');
const errorMessage = document.getElementById('error-message');

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('highlight');
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

dropArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  handleFile(fileInput.files[0]);
});

function handleFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    errorMessage.textContent = 'Only JPG, PNG, and GIF files are allowed.';
    return;
  }

  errorMessage.textContent = '';

  const reader = new FileReader();
  reader.onload = function () {
    const img = document.createElement('img');
    img.src = reader.result;
    previewArea.innerHTML = '';
    previewArea.appendChild(img);
    localStorage.setItem('uploadedImage', reader.result);
  };
  reader.readAsDataURL(file);
  simulateProgressBar();
}

function simulateProgressBar() {
  progressBar.style.width = '0%';
  let width = 0;
  const interval = setInterval(() => {
    width += 10;
    progressBar.style.width = width + '%';
    if (width >= 100) clearInterval(interval);

  }, 100);
}


window.addEventListener('load', () => {
  const storedImage = localStorage.getItem('uploadedImage');
  if (storedImage) {
    const img = document.createElement('img');
    img.src = storedImage;
    previewArea.appendChild(img);
  }
});