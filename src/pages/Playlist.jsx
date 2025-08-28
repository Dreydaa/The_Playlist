import { useEffect, useRef } from "react";
import "../styles/style.css";
import "../Components/App";
import ScrollingText from "../Components/TitleScrolling";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  MicVocal,
  InfoIcon,
  Maximize,
  Volume2,
} from "lucide-react";
import { useAudioPlayer } from "../Components/useAudioPlayer";
import { useBackgroundEffects } from "../Components/backgroundsEffects";
import { playlist } from "../Components/playlistData"

function Playlist() {
  const {
    isPlaying,
    setCurrentTrackIndex,
    currentTrackIndex,
    currentTime,
    duration,
    currentTrack,
    shuffle,
    repeat,
    togglePlay,
    handleNext,
    handlePrevious,
    handletimeUpdate,
    toggleShuffle,
    toggleRepeat,
    audioRef,
  } = useAudioPlayer();

  const {
    activeEffect,
    setActiveEffect,
    getBackgroundStyle,
    isLoadingColor,
    getIconColor,
  } = useBackgroundEffects(currentTrack);

  const containerRef = useRef(null);
  const grayCircleRef = useRef(null);
  const coloredSquaresRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressbarRef = useRef(null);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const handleSquareClick = (index) => {
      // Assuming you have access to these from useAudioPlayer
      setCurrentTrackIndex(index % playlist.length);
      if (!isPlaying) {
        togglePlay();
      }

      console.log(`Image ${index} clicked!`);
    };

    class CircularScrollAnimation {
      constructor(
        container,
        grayCircle,
        coloredSquares,
        scrollIndicator,
        clickHandler
      ) {
        this.container = container;
        this.grayCircle = grayCircle;
        this.coloredSquaresContainer = coloredSquares;
        this.scrollIndicator = scrollIndicator;
        this.handleSquareClick = clickHandler;

        this.totalSquares = 100; // Reduced for better visibility
        this.angleStep = 3.60; // Evenly distribute
        this.radius = 4500; // More reasonable radius
        this.currentRotation = 0;
        /** */
        // Array of imported images
        this.imageUrls = [
          /* 00 */ "",
          /* 01 */ "",
          /* 02 */ "",
          /* 03 */ "",
          /* 04 */ "",
          /* 05 */ "",
          /* 06 */ "",
          /* 07 */ "",
          /* 08 */ "",
          /* 09 */ "",
          /* 10 */ "",
          /* 11 */ "",
          /* 12 */ "",
          /* 13 */ "",
          /* 14 */ "",
          /* 15 */ "",
          /* 16 */ "",
          /* 17 */ "",
          /* 18 */ "",
          /* 19 */ "",
          /* 20 */ "",
          /* 21 */ "",
          /* 22 */ "",
          /* 23 */ "",
          /* 24 */ "",
          /* 25 */ "",
          /* 26 */ "",
          /* 27 */ "",
          /* 28 */ "",
          /* 29 */ "",
          /* 30 */ "",
          /* 31 */ "",
          /* 32 */ "",
          /* 33 */ "",
          /* 34 */ "",
          /* 35 */ "",
          /* 36 */ "",
          /* 37 */ "",
          /* 38 */ "",
          /* 39 */ "",
          /* 40 */ "",
          /* 41 */ "",
          /* 42 */ "",
          /* 43 */ "",
          /* 44 */ "",
          /* 45 */ "",
          /* 46 */ "",
          /* 47 */ "",
          /* 48 */ "",
          /* 49 */ "",
          /* 50 */ "",
          /* 51 */ "",
          /* 52 */ "",
          /* 53 */ "",
          /* 54 */ "",
          /* 55 */ "",
          /* 56 */ "",
          /* 57 */ "",
          /* 58 */ "",
          /* 59 */ "",
          /* 60 */ "",
          /* 61 */ "",
          /* 62 */ "",
          /* 63 */ "",
          /* 64 */ "",
          /* 65 */ "",
          /* 66 */ "",
          /* 67 */ "",
          /* 68 */ "",
          /* 69 */ "",
          /* 70 */ "",
          /* 71 */ "",
          /* 72 */ "",
          /* 73 */ "",
          /* 74 */ "",
          /* 75 */ "",
          /* 76 */ "",
          /* 77 */ "",
          /* 78 */ "",
          /* 79 */ "",
          /* 80 */ "",
          /* 81 */ "",
          /* 82 */ "",
          /* 83 */ "",
          /* 84 */ "",
          /* 85 */ "",
          /* 86 */ "",
          /* 87 */ "",
          /* 88 */ "",
          /* 89 */ "",
          /* 90 */ "",
          /* 91 */ "",
          /* 92 */ "",
          /* 93 */ "",
          /* 94 */ "",
          /* 95 */ "",
          /* 96 */ "",
          /* 97 */ "",
          /* 98 */ "",
          /* 99 */ "",
        ];

        this.init();
      }

      init() {
        this.createGrayCircle();
        this.createImageSquares(); // Renamed from createColoredSquares
        this.handleScroll = this.handleScroll.bind(this);
        this.container.addEventListener("scroll", this.handleScroll);
        this.updateAnimation();
      }

      createGrayCircle() {
        const totalGraySquares = 72;
        const grayRadius = 180;

        for (let i = 0; i < totalGraySquares; i++) {
          const square = document.createElement("div");
          square.className = "gray-square";

          const angle = (i * 360) / totalGraySquares;
          const radian = (angle * Math.PI) / 180;
          const x = 200 + Math.cos(radian) * grayRadius;
          const y = 200 + Math.sin(radian) * grayRadius;

          square.style.left = `${x - 10}px`;
          square.style.top = `${y - 10}px`;
          square.style.transform = `rotate(${angle}deg)`;

          this.grayCircle.appendChild(square);
        }
      }

      createImageSquares() {
        for (let i = 0; i < this.totalSquares; i++) {
          const square = document.createElement("div");
          square.className = "image-square";
          square.id = `square-${i}`;

          const img = document.createElement("img");
          img.src = this.imageUrls[i % this.imageUrls.length];
          img.alt = `Album ${i + 1}`;
          img.className = "square-image";

          square.appendChild(img);

          const angle = i * this.angleStep;
          const radian = (angle * Math.PI) / 180;
          const x = 200 + Math.cos(radian) * this.radius;
          const y = 200 + Math.sin(radian) * this.radius;

          square.style.left = `${x - 50}px`; // Adjusted for better centering
          square.style.top = `${y - 50}px`;
          square.style.transform = "rotate(0deg)";

          square.dataset.initialAngle = angle;
          square.dataset.initialX = x;
          square.dataset.initialY = y;

          square.addEventListener("click", () => this.handleSquareClick(i));
          this.coloredSquaresContainer.appendChild(square);
        }
      }

      // Ajoutez cette méthode dans votre classe CircularScrollAnimation

      // handleSquareClick(index) {
      //   console.log(`Image ${index} cliquée!`);

      //   // Créer un carré de debug rouge
      //   const debugSquare = document.createElement("div");
      //   debugSquare.style.position = "fixed";
      //   debugSquare.style.top = "50%";
      //   debugSquare.style.left = "50%";
      //   debugSquare.style.transform = "translate(-50%, -50%)";
      //   debugSquare.style.width = "200px";
      //   debugSquare.style.height = "200px";
      //   debugSquare.style.backgroundColor = "red";
      //   debugSquare.style.border = "3px solid black";
      //   debugSquare.style.zIndex = "10000";
      //   debugSquare.style.display = "flex";
      //   debugSquare.style.alignItems = "center";
      //   debugSquare.style.justifyContent = "center";
      //   debugSquare.style.color = "white";
      //   debugSquare.style.fontSize = "20px";
      //   debugSquare.style.fontWeight = "bold";
      //   debugSquare.style.cursor = "pointer";
      //   debugSquare.textContent = `Image ${index}`;

      //   // Ajouter le carré au body
      //   document.body.appendChild(debugSquare);

      //   // Supprimer le carré après 3 secondes ou au clic
      //   const removeDebugSquare = () => {
      //     if (debugSquare.parentNode) {
      //       debugSquare.parentNode.removeChild(debugSquare);
      //     }
      //   };

      //   debugSquare.addEventListener("click", removeDebugSquare);
      //   setTimeout(removeDebugSquare, 3000);
      // }

      // Example helper methods
      playSpecialAnimation(index) {
        console.log(`Special animation for square ${index}`);
        // Add your animation logic here
      }

      showLastTrackModal() {
        console.log("Showing modal for last track");
        // Add modal display logic here
      }

      handleScroll() {
        const scrollTop = this.container.scrollTop;
        const maxScroll =
          this.container.scrollHeight - this.container.clientHeight;
        const scrollProgress = scrollTop / maxScroll;

        this.currentRotation = scrollProgress * 360; // Two full rotations
        this.updateAnimation();
      }

      updateAnimation() {
        this.grayCircle.style.transform = `rotate(${this.currentRotation}deg)`;

        const squares = this.coloredSquaresContainer.children;
        for (let i = 0; i < squares.length; i++) {
          const square = squares[i];
          const initialAngle = parseFloat(square.dataset.initialAngle);
          const currentAngle = initialAngle + this.currentRotation;
          const radian = (currentAngle * Math.PI) / 180;

          const x = 200 + Math.cos(radian) * this.radius;
          const y = 200 + Math.sin(radian) * this.radius;

          square.style.left = `${x - 50}px`;
          square.style.top = `${y - 50}px`;
        }
      }
    }

    const animation = new CircularScrollAnimation(
      containerRef.current,
      grayCircleRef.current,
      coloredSquaresRef.current,
      scrollIndicatorRef.current,
      handleSquareClick
    );

    return () => {
      containerRef.current?.removeEventListener(
        "scroll",
        animation.handleScroll
      );
    };
  }, [setCurrentTrackIndex, isPlaying, togglePlay, playlist.length]);

  return (
    <>
      <svg style={{ position: "absolute", width: "0", height: "0" }}>
        <filter id="noiseFilter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1"></feFuncR>
            <feFuncG type="linear" slope="1"></feFuncG>
            <feFuncB type="linear" slope="1"></feFuncB>
            <feFuncA type="linear" slope="0.27"></feFuncA>
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.5" intercept="-1.00" />
            <feFuncG type="linear" slope="1.5" intercept="-1.00" />
            <feFuncB type="linear" slope="1.5" intercept="-1.00" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
      </svg>

      <header></header>
      <section
        id="mixBackground"
        style={getBackgroundStyle()}
        className={`${activeEffect} ${isLoadingColor ? "loading" : ""}`}
      >
        <div className="container" id="scrollContainer" ref={containerRef}>
          <div className="scroll-content"></div>

          <div className="circle-container">
            <div
              className="gray-circle"
              id="grayCircle"
              ref={grayCircleRef}
            ></div>
            <div id="coloredSquares" ref={coloredSquaresRef}></div>
          </div>
        </div>

        {/* Front = Player pause play
                  right = Lyrics
                  left = Songs Info
                  Back = no idea  */}
        <div id="player">
          <div className="box">
            <div className="cube">
              <div className="side front">
                <nav>
                  <ol
                    className={activeEffect === "colored" ? "active" : ""}
                    onClick={() => setActiveEffect("colored")}
                    style={{ color: getIconColor() }}
                  >
                    Colored
                  </ol>
                  <ol
                    className={activeEffect === "blur" ? "active" : ""}
                    onClick={() => setActiveEffect("blur")}
                    style={{ color: getIconColor() }}
                  >
                    Blur
                  </ol>
                  <ol
                    className={activeEffect === "noise" ? "active" : ""}
                    onClick={() => setActiveEffect("noise")}
                    style={{ color: getIconColor() }}
                  >
                    Noise
                  </ol>
                </nav>

                <div className="playerCoverContainer">
                  <div className="playerCover">
                    {currentTrack.coverArt && (
                      <img
                        src={currentTrack.coverArt}
                        alt={`${currentTrack.title} cover`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="playerControlsContainer">
                  <div className="playerControls">
                    <div
                      className="playerInfo"
                      style={{ color: getIconColor() }}
                    >
                      <div className="scrolling-text">
                        <ScrollingText
                          title={currentTrack.title}
                          artist={currentTrack.artist}
                          shouldScroll={currentTrack.scrollText || false}
                        />
                      </div>
                    </div>
                    <div className="playerButtons">
                      <button
                        className="fullscreenButton"
                        style={{ color: getIconColor() }}
                      >
                        <Maximize size={24} />
                      </button>

                      <button
                        className={`repeatButton ${repeat ? "active" : ""}`}
                        onClick={toggleRepeat}
                        style={{ color: getIconColor() }}
                      >
                        <Repeat size={24} />
                      </button>

                      <button
                        className="prevButton"
                        onClick={handlePrevious}
                        style={{ color: getIconColor() }}
                      >
                        <SkipBack size={48} strokeWidth={1} />
                      </button>

                      <button
                        className="playButton"
                        onClick={togglePlay}
                        style={{ color: getIconColor() }}
                      >
                        {isPlaying ? (
                          <Pause size={64} strokeWidth={1} />
                        ) : (
                          <Play size={64} strokeWidth={1} />
                        )}
                      </button>

                      <button
                        className="nextButton"
                        onClick={handleNext}
                        style={{ color: getIconColor() }}
                      >
                        <SkipForward size={48} strokeWidth={1} />
                      </button>

                      <button
                        className={`shuffleButton ${shuffle ? "active" : ""}`}
                        onClick={toggleShuffle}
                        style={{ color: getIconColor() }}
                      >
                        <Shuffle size={24} />
                      </button>

                      <button
                        className="infoButton"
                        style={{ color: getIconColor() }}
                      >
                        <InfoIcon size={24} />
                      </button>
                    </div>

                    <div
                      className="timeDisplay"
                      style={{ color: getIconColor() }}
                    >
                      <span className="currentTime">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={(e) => {
                          const newTime = parseFloat(e.target.value);
                          audioRef.current.currentTime = newTime;
                          setCurrentTime(newTime);
                        }}
                        ref={progressbarRef}
                        className="progressBar"
                        style={{
                          background: `linear-gradient(to right,rgb(255, 255, 255) 0%,rgb(255, 255, 255) ${
                            (currentTime / duration) * 100
                          }%, ${getIconColor()} ${
                            (currentTime / duration) * 100
                          }%, ${getIconColor()} 100%)`,
                          backgroundColor: getIconColor(),
                          borderRadius: "2px",
                        }}
                      />
                      <span className="totalTime">{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="side back"></div>
              <div className="side right"></div>
              <div className="side left"></div>
              <div className="side2 top"></div>
              <div className="side2 bottom"></div>
            </div>
          </div>
        </div>
      </section>
      <audio ref={audioRef} />
    </>
  );
}

export default Playlist;
