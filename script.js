(function(){

  var screen =
    document.getElementById('envelope-screen');

  var btn =
    document.getElementById('open-btn');

  var letterWrap =
    document.getElementById('letter-wrap');

  var footer =
    document.querySelector('footer');


  var flowersScene =
    document.getElementById('flowers-scene');

  function openIntro(){

    if(
      screen.classList.contains('opening')
    ) return;


    screen.classList.add('opening');


    if (flowersScene){
      flowersScene.removeAttribute('aria-hidden');
      flowersScene.classList.add('playing');
    }


    setTimeout(function(){

      screen.classList.add('opened');

      if (flowersScene){
        flowersScene.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

    }, 650);

  }


  btn.addEventListener(
    'click',
    openIntro
  );


  /* segunda carta: revela el mensaje largo solo al abrirla */

  var letterGate =
    document.getElementById('letter-gate');

  var openLetterBtn =
    document.getElementById('open-letter-btn');

  var usingSecondTrack = false;

  function playSecondTrack(){

    if (usingSecondTrack) return;
    usingSecondTrack = true;

    audio.pause();
    audio.src = 'cancion1.mp3';
    audio.load();

    if (playerTitleEl) playerTitleEl.textContent = 'Cancion1';
    if (playerArtistEl) playerArtistEl.textContent = '—';

    timeCurrent.textContent = '0:00';
    timeDuration.textContent = '0:00';
    barFill.style.width = '0%';

    audio.play().catch(function(){
      /* si el navegador bloquea el autoplay, el botón de play sigue disponible */
    });

  }

  function openSecondLetter(){

    if(
      !letterGate ||
      letterGate.classList.contains('opening')
    ) return;


    letterGate.classList.add('opening');

    playSecondTrack();


    setTimeout(function(){

      letterGate.classList.add('used');

      letterWrap.classList.add('revealed');
      letterWrap.removeAttribute('aria-hidden');

      footer.classList.add('revealed');
      footer.removeAttribute('aria-hidden');

      letterWrap.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 650);

  }

  if (openLetterBtn){
    openLetterBtn.addEventListener(
      'click',
      openSecondLetter
    );
  }


  /* pétalos */

  var petalHost =
    document.getElementById('petals');

  var count =
    window.innerWidth < 600 ? 10 : 16;


  for(
    var i = 0;
    i < count;
    i++
  ){

    var p =
      document.createElement('span');

    p.className = 'petal';

    p.style.left =
      (Math.random() * 100) + '%';

    p.style.setProperty(
      '--drift',
      (Math.random() * 80 - 40) + 'px'
    );

    p.style.animationDuration =
      (9 + Math.random() * 7) + 's';

    p.style.animationDelay =
      (Math.random() * 10) + 's';

    p.style.opacity =
      (0.35 + Math.random() * 0.35).toFixed(2);

    var scale =
      0.6 + Math.random() * 0.9;

    p.style.transform =
      'scale(' + scale.toFixed(2) + ')';

    petalHost.appendChild(p);

  }

  /* reproductor */

  var audio = document.getElementById('audio');
  audio.volume = 0.55;
  var playBtn = document.getElementById('player-play');
  var iconPlay = document.getElementById('icon-play');
  var iconPause = document.getElementById('icon-pause');
  var barFill = document.getElementById('player-bar-fill');
  var bar = document.getElementById('player-bar');
  var timeCurrent = document.getElementById('time-current');
  var timeDuration = document.getElementById('time-duration');

  function formatTime(s){
    if (!isFinite(s)) return '0:00';
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function togglePlay(){
    if (audio.paused){
      audio.play().catch(function(){
        /* si el navegador bloquea el autoplay o falta el archivo, no rompe la página */
      });
    } else {
      audio.pause();
    }
  }

  playBtn.addEventListener('click', togglePlay);

  audio.addEventListener('play', function(){
    iconPlay.style.display = 'none';
    iconPause.style.display = '';
  });

  audio.addEventListener('pause', function(){
    iconPlay.style.display = '';
    iconPause.style.display = 'none';
  });

  audio.addEventListener('loadedmetadata', function(){
    timeDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', function(){
    timeCurrent.textContent = formatTime(audio.currentTime);
    if (audio.duration){
      barFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
  });

  bar.addEventListener('click', function(e){
    var rect = bar.getBoundingClientRect();
    var ratio = (e.clientX - rect.left) / rect.width;
    if (audio.duration){
      audio.currentTime = ratio * audio.duration;
    }
  });

  /* referencias usadas por playSecondTrack() al abrir la 2da carta */

  var playerTitleEl = document.querySelector('.player-title');
  var playerArtistEl = document.querySelector('.player-artist');

  /* campo de flores — se genera para ocupar todo el ancho */

  var field = document.getElementById('flower-field');
  var fieldTypes = ['tulip', 'sunflower', 'poppy'];
  var fieldColors = ['#e0b23c', '#f2c744', '#e8862e', '#d9a62e', '#f6d368'];
  var fieldCount = Math.max(8, Math.round(window.innerWidth / 55));
  var fieldHtml = '';

  for (var f = 0; f < fieldCount; f++){
    var type = fieldTypes[f % fieldTypes.length];
    var color = fieldColors[f % fieldColors.length];
    var scale = (0.75 + Math.random() * 0.5).toFixed(2);
    var px = Math.round(100 * scale);
    fieldHtml +=
      '<svg viewBox="0 0 60 140" style="color:' + color +
      '; height: ' + px + 'px;"><use href="#' + type + '"/></svg>';
  }

  field.innerHTML = fieldHtml;

})();