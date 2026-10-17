import fs from 'fs';
import path from 'path';

const DOCS_SOURCE = 'D:/Temple_docs';
const PUBLIC_DOCS = path.resolve('public/assets/docs');
const PUBLIC_PROGRESS = path.resolve('public/assets/images/progress');

fs.mkdirSync(PUBLIC_DOCS, { recursive: true });
fs.mkdirSync(path.join(PUBLIC_PROGRESS, 'bhoomi_pooja'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_PROGRESS, 'borewell'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_PROGRESS, 'ground_levelling'), { recursive: true });

// Copy Official Documents
const docCopies = [
  { src: 'form_12A_80G/AAATZ4555BE20261_signed (1).pdf', dest: 'form_12A_provisional_registration.pdf' },
  { src: 'form_12A_80G/AAATZ4555BF20261_signed.pdf', dest: 'form_80G_provisional_approval.pdf' },
  { src: 'Revised_estimate/Estimate 1.pdf', dest: 'estimate_1_temple_renovation.pdf' },
  { src: 'Revised_estimate/Estimate 2.pdf', dest: 'estimate_2_muni_maharaj_guest_house.pdf' },
  { src: 'Revised_estimate/Estimate 3.pdf', dest: 'estimate_3_multipurpose_hall.pdf' },
  { src: 'Letter_from_arihantagiri/English.pdf', dest: 'bhattarak_letter_en.pdf' },
  { src: 'Letter_from_arihantagiri/Tamil.pdf', dest: 'bhattarak_letter_ta.pdf' },
  { src: 'Letter_from_arihantagiri/Hindi.pdf', dest: 'bhattarak_letter_hi.pdf' },
  { src: 'Letter_from_arihantagiri/Kanada.pdf', dest: 'bhattarak_letter_kn.pdf' },
  { src: 'Notices/Notice English.pdf', dest: 'notice_en.pdf' },
  { src: 'Notices/Notice Tamil.pdf', dest: 'notice_ta.pdf' },
  { src: 'Notices/Notice Hindi.pdf', dest: 'notice_hi.pdf' },
  { src: 'Notices/Notice Kanada.pdf', dest: 'notice_kn.pdf' },
];

for (const { src, dest } of docCopies) {
  const fullSrc = path.join(DOCS_SOURCE, src);
  const fullDest = path.join(PUBLIC_DOCS, dest);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

// Copy Progress Photos
const copyFolder = (srcDir, targetSubDir) => {
  const fullSrc = path.join(DOCS_SOURCE, 'Temple_works', srcDir);
  const files = fs.readdirSync(fullSrc);
  files.forEach((file, idx) => {
    const ext = path.extname(file).toLowerCase();
    const cleanName = `${srcDir}_${idx + 1}${ext.includes('png') ? '.png' : '.jpg'}`;
    fs.copyFileSync(path.join(fullSrc, file), path.join(PUBLIC_PROGRESS, targetSubDir, cleanName));
    console.log(`Copied progress photo: ${file} -> ${cleanName}`);
  });
};

copyFolder('Bhoomi_pooja', 'bhoomi_pooja');
copyFolder('borewell_and_motor_fitting', 'borewell');
copyFolder('ground_levelling_to_start_new_buildings', 'ground_levelling');
console.log('Asset synchronization complete!');
