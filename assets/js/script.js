document.addEventListener('DOMContentLoaded', function() {

  const videoOverlay = document.createElement('div');
  videoOverlay.id = 'video-overlay';
  document.getElementById('video-background').appendChild(videoOverlay);

  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var closeButton = document.getElementById('close-button');

  var terminalTextContent = [
      "Name: Trnguyen",
      "You IP: Loading...",
      "You System: Loading...",
      "Bio Loaded",
      "Press Enter To Continue",
  ];

  var currentIndex = 0;

  videoBackground.pause();

  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, currentIndex === 0 ? 10 : 50);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners();
              }
          }
      }

      if (currentIndex === 0) {
          terminalText.style.transform = 'scale(5)';
          terminalText.style.opacity = '0';
          terminalText.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
          void terminalText.offsetWidth;
          terminalText.style.transform = 'scale(1)';
          terminalText.style.opacity = '1';
      }

      typeChar();
  }

  function handleInput() {
      enterFullscreen();
      terminalContainer.style.display = 'none';
      document.getElementById('myVideo').play();
      document.getElementById('blurred-box').style.display = 'block';
      document.getElementById('music-controls').style.display = 'flex';
      removeEventListeners();
      document.body.classList.add('video-normal');
      window.MusicPlayer.start();
  }

  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput);
  }

  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput);
  }

  function enterFullscreen() {
    if (!document.fullscreenElement) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  }

  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  closeButton.addEventListener('click', function() {
      handleInput();
  });

  var userAgent = navigator.userAgent;

  function getFallbackOperatingSystem() {
      if (userAgent.match(/Windows/)) return "Windows";
      if (userAgent.match(/Macintosh/)) return "macOS";
      if (userAgent.match(/Android/)) return "Android";
      if (userAgent.match(/Linux/)) return "Linux";
      if (userAgent.match(/iPhone|iPad|iPod/)) return "iOS";
      return "Unknown";
  }

  async function getModernOperatingSystem() {
      return getFallbackOperatingSystem();
  }

  const ipPromise = fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data.ip)
      .catch(() => "Unable to fetch IP address");

  const osPromise = getModernOperatingSystem();

  Promise.all([ipPromise, osPromise])
      .then(([ipAddress, operatingSystem]) => {
          terminalTextContent[1] = "You IP: " + ipAddress;
          terminalTextContent[2] = "You System: " + operatingSystem;
          typeWriter();
      });

  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;
      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  terminalText.style.textAlign = 'center';

  // ❤️ TRÁI TIM ASCII
  function getAsciiArt() {
      return `

     ███████  ███████  
    ██████████████████ 
   ████████████████████
    ██████████████████ 
    ██████████████████ 
     ████████████████  
       ████████████    
         ████████      
           ███
`;
  }

  document.body.classList.remove('video-normal');
  videoOverlay.style.display = 'block';

});
