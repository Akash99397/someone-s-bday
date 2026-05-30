// 1. Array to hold your photo names and captions
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

// 1. Sync music state when the page loads
// 1. Sync music state safely when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = localStorage.getItem('musicTime');

    // Wait until the audio file has loaded enough metadata (like duration) before setting time
    bgMusic.addEventListener('loadedmetadata', () => {
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }
    });

    if (isPlaying) {
        bgMusic.play().then(() => {
            musicBtn.innerHTML = "⏸️";
        }).catch(() => {
            musicBtn.innerHTML = "🎵";
            
            // Hidden listener to unlock audio on first screen tap
            const unlockAudio = () => {
                if (localStorage.getItem('musicPlaying') === 'true') {
                    bgMusic.play().then(() => {
                        musicBtn.innerHTML = "⏸️";
                    });
                }
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
            };
            document.addEventListener('click', unlockAudio);
            document.addEventListener('touchstart', unlockAudio);
        });
    }
});

// 2. Save the exact playback second continuously
bgMusic.addEventListener('timeupdate', () => {
    localStorage.setItem('musicTime', bgMusic.currentTime);
});

// 3. Handle manual Play/Pause clicking
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerHTML = "⏸️";
        localStorage.setItem('musicPlaying', 'true');
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = "🎵";
        localStorage.setItem('musicPlaying', 'false');
    }
}

// 4. Ensure state is saved right before switching pages
window.addEventListener('beforeunload', () => {
    localStorage.setItem('musicTime', bgMusic.currentTime);
});



const memories = [
    { id: 1, image: 'https://lh3.googleusercontent.com/d/11zfyoDpDhkKDUp6zr3ByS9dHPff24i0F', desc: 'Tr bhai er Rice ceremony, that 1% time without your sister :) Baki tym to khali tora jhogra krte thakis' },
    { id: 2, image: 'https://lh3.googleusercontent.com/d/17HKHQbjdWGquQjLmKJG1SfWSn49TK_IY', desc: 'One of the most memorable pics. Eta ami dp teo diyechilam onkkdin er jonne...' },
    { id: 3, image: 'https://lh3.googleusercontent.com/d/1dmRM7FnyeHKJJvxlkfRYKGQSMP_OM2Fl', desc: 'Eta te nischoi alada kre bolar kichu nei :) Onk jhamela hyeche eta niye bt finally amr boner pochondo hyeche & that is more than enough for me! <3' },
    { id: 4, image: 'https://lh3.googleusercontent.com/d/1NClIMcHMXAkY0RJCz0xy6-DtPPK8zErQ', desc: 'At Pahalgam' },
    { id: 5, image: 'https://lh3.googleusercontent.com/d/1shJfnqi36M4CtIqW802k7DQ9nadtw-T0', desc: '1st tym tr banano cake. Heartful effort from a little heart<3  Btw Amro ektu taste korar ichhe chilo ektu XD (Lovi manush) ' },
    { id: 6, image: 'https://lh3.googleusercontent.com/d/1WHEy-I0dXPtdzdZnzItVcV6E4c1nxTqc', desc: 'bacha meye, tokhon thekei model already...' },
    { id: 7, image: 'https://lh3.googleusercontent.com/d/1qI6f-IXBtkvd9O99eZUeNTMMWtG1W_TF', desc: 'Khub jaliyechilam oidin :) Bt onk memories o krechilam specially jokhon tui cha er cup gulo bhangchili, R mone achhe "Bawarchi" XD ??' },
    { id: 8, image: 'https://lh3.googleusercontent.com/d/1oBNuc2s0KoRhsLiELE3CyYf3uY2IK-7f', desc: 'ddir brthday it was. Bohot taamjhaam se hua tha wo wala birthday, isbaar bhi hoga. Khub excited chili tui r Barsha <3' },
    { id: 9, image: 'https://lh3.googleusercontent.com/d/1uMSl6J68cVGSnN_5AF5HzTAxw8ZXAL-k', desc: 'My favourite Maggi <3. Eidin o khub jaliyechilam bt kaaner samneo sera chillechili baapre baap! Ami bhebechilam amr pechone gachis amr chul elomelo krbi ba jore marbi ba hoyto kaane fuu db erm e kichu akta krbi tai jonne emni e ami halka bhoy te bhoy te krbi bt chillano ta unexpected chilo XD' },
    { id: 10, image: 'https://lh3.googleusercontent.com/d/1hYvdHKkDsfl6iyxPghBq3eyF1DSQW9RN', desc: 'Dev er movie dekhte gachilam sobai mile...Bt sera moja eschilo bt tr majhkhan theke jor chole eschilo :). Jai hok bt tr kotha moto ota naki 6-7yrs por cinema dekhte gachili hall e<3 ' },
    { id: 11, image: 'https://lh3.googleusercontent.com/d/1gYCuxPub0dGDdOg-pjLaCnAYGriKj0ML', desc: 'last bijoya doshomi it was<3' },
    { id: 12, image: 'https://lh3.googleusercontent.com/d/1IHTYPMfsgcwEj0_f5_kFK_evt1Rg6cfY', desc: 'tr sopner jaga, Vaishnav devi. Jekhane jawar jonne tui atodin dhore excited chili & I was happy seeing my liittle sister happy<3' },
    { id: 13, image: 'https://lh3.googleusercontent.com/d/1LeW0ivzifvP4KplTqrVS_gBO99vjtSrP', desc: 'Ei resturant e tui kheye ese blchili onk kheyechis XD. The main thing is jaja menu bolechili tui seigulo sune amro halka lov lagchilo  :))' },
    { id: 14, image: 'https://lh3.googleusercontent.com/d/1KSPMm-juEwUIVfwfU-NAYSPPXk1-D3Iw', desc: 'Durga puja maybe...Bt eta emni emnie lagai ni, eta lgaiyechi etai bollar jonne j tui tokhon thekei daanpithe chili, gundir moton ak haath komore diye...(Bacha bonnuu <3)' },
    { id: 15, image: 'https://lh3.googleusercontent.com/d/1aM7DNveVU1oM4aR-6z332m0X9IrHB2w0', desc: 'One of the most iconic pics! Ei spot e camera man ba sudhu ei spot ei na, alada alada r jaja spot ei pics and videos achhe, mot jekota photos and videos tuleche camera man tar modheye theke eii pic ta personally amr sob cheye best legechhe!' },
    { id: 16, image: 'https://lh3.googleusercontent.com/d/1HbNxRGneDjkJ60us93e7KuD7k12CG7Xl', desc: 'tr pochonder sir er biye, khub excited chili ei sir er biye niye khub mata mati krchili XD' },
    { id: 17, image: 'https://lh3.googleusercontent.com/d/1EQDJtSqyeovFoG7wL53WVyjzhgT_SOHS', desc: ' Tr 1st concert. Bt oidin kabab ta tasty chilo, btw mone achhe oidin o dd phuchka khete boshe kiki yarki marchilo??XD. Bt Bt Bt... most special moment?? Lagnajita jokhon tr dk takiye haath dekhaye! I mean that was fucking unexpected! Btw eibar lagnajita ele, ami toke samna samni dekha koranor chesta krbo' },
    { id: 18, image: 'https://lh3.googleusercontent.com/d/1KFqI1iCberNtlsSTiPKBrJrztQM2dSuc', desc: 'Race er 3rd howar certificate(Eii na hole amr bon !!<3). Erm e aro achievements paa... ' },
    { id: 19, image: 'https://lh3.googleusercontent.com/d/1ejxl4i48_iG7qBV7j2VcCG_ur7Kutret', desc: 'Tr mamar chele k 1st tym kole niye. prothom prothom to ektu mon kharap chilo school r porar jonne dekhte jete parchili bt finally jokhon jete parli seidin khub kkhud=si chili XD(Bacha meyee<3) ' },
    { id: 20, image: 'https://lh3.googleusercontent.com/d/1dbUL7ddpAm5jXaMWOgaiACAX3lboZvuH', desc: 'Tr bhai er sathe akta sera pic(Saradin to kelate thakis bechara k) XD' },
    { id: 21, image: 'https://lh3.googleusercontent.com/d/1oXwyDYY3TUy18j5QRfJQIxz6qUEC1lnP', desc: 'Koto maniye maniye ber krechilam toke barir theke then olpo olpo krte krte akgada rong makhano hyechilo XD. Bt oidin jdi amader sathe tui o okhane jeti khubb moja aasto' },
    { id: 22, image: 'https://lh3.googleusercontent.com/d/1HmnStpuwICwdKT9R91H3j4WeM1mZqWpQ', desc: 'Durgapur e... jdio ba amie bolechilam erm kono spot pele pic tulte, tr kono credit nei ete ;)' },
    { id: 23, image: 'https://lh3.googleusercontent.com/d/1YBYKkCvJZPWBgwI9-Gvxh_maONKnmRx3', desc: '1 of my favourite pics<3. Ami seriously 1st e bujhte parini j kotha theke cake kinbo na kinbo kichu, jekhane jekhane bhalo cake pawa jaye ogulo e bondho chilo then khuje pete akta jagar theke order d... Jai hok the day was worthy & more specially because of your khushi <3 ' },
    { id: 24, image: 'https://lh3.googleusercontent.com/d/1YzF6eO4Le8FaCW5C9z0IM66gH-2LFPdZ', desc: 'Projapoti 2...' },
    { id: 25, image: 'https://lh3.googleusercontent.com/d/1OhFG9w_ZYAZzQShAJXIyY34whjBe17tC', desc: 'Eii pic ta sera, erm arekta tulbo amra...' },
    { id: 26, image: 'https://lh3.googleusercontent.com/d/1M5XkdUOKE7ActA1XlvLgAn021AwV89DG', desc: '1st tym amake rakhi poriyechili<3.' },
    { id: 27, image: 'https://lh3.googleusercontent.com/d/1lNiSV7N-fLyBj8lV6VppCSaGH2BnhL4_', desc: 'Tr pochonder phul... ' },
    { id: 28, image: 'https://lh3.googleusercontent.com/d/1uxht1VgU_FNbD8_M-VBCpCF7LREGqDAR', desc: 'Goru...<3' },
    { id: 29, image: 'https://lh3.googleusercontent.com/d/1Xp2nwrnV8cUUx6hR8Adh79L4Cwy3CXVX', desc: 'Gawhati chilo maybe eta... Tr r serom pics nei ekhankar tola' },
    { id: 30, image: 'https://lh3.googleusercontent.com/d/1dQS8Yf60DE5VxCLVISx-J1EkFVro06Nc', desc: 'Damnnn...' }
    // Add more here up to 30...
];

const grid = document.getElementById('gallery-grid');
const modal = document.getElementById('memory-modal');

// 2. Loop to create 30 Gift Boxes
for (let i = 1; i <= 30; i++) {
    const box = document.createElement('div');
    box.className = 'grid-item';
    
    // Set the inside of the box
    box.innerHTML = `
        <div class="gift-emoji">🎁</div>
        <div class="memory-label">Surpirse ${i}</div>
    `;

    // When clicked, open the modal for this ID
    box.onclick = () => openModal(i);
    
    grid.appendChild(box);
}

// 3. Function to open modal and fill it with data
function openModal(id) {
    // Find the specific memory in our array or use a default
    const data = memories.find(m => m.id === id) || { 
        image: 'placeholder.jpg', 
        desc: 'This is a beautiful memory we share!' 
    };

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-desc').innerText = data.desc;
    
    modal.style.display = 'flex';
}

// 4. Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

// Close if user clicks outside the white box
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Function to redirect to the 5th page
document.querySelector('.final-btn').onclick = function() {
    window.location.href = "5th.html";
};