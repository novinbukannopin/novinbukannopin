const { exec } = require('child_process');
const { DateTime } = require('luxon'); // Untuk menangani zona waktu dan hari libur

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const holidays = [

  '2023-12-25', '2024-01-01',

];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDay() {
  const today = DateTime.now().setZone('Asia/Jakarta'); // Sesuaikan dengan zona waktu Anda
  const dayOfWeek = today.weekday; // 1 = Monday, 2 = Tuesday, ..., 7 = Sunday
  
  // Cek apakah hari ini libur
  const todayString = today.toISODate();
  if (holidays.includes(todayString)) {
    return 'Holiday';
  }

  // Pilih hari acak dengan bobot yang berbeda
  const weights = [2, 3, 4, 3, 2, 1, 1]; // Bobot untuk setiap hari (Senin-Minggu)
  let totalWeight = weights.reduce((a, b) => a + b, 0);
  let randomNum = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    randomNum -= weights[i];
    if (randomNum <= 0) {
      return days[(dayOfWeek + i - 1) % 7]; // Adjust index karena Luxon dimulai dari 1
    }
  }
}

function generateRandomCommit() {
  const numCommits = getRandomInt(3, 10);
  const randomDay = getRandomDay();

  for (let i = 0; i < numCommits; i++) {
    const commitMessage = `Random commit on ${randomDay} ${i + 1}: ${Math.random().toString(36).substring(7)}`;
    exec(`git add . && git commit -m "${commitMessage}"`);
  }
}

// Jalankan fungsi untuk membuat commit
generateRandomCommit();
