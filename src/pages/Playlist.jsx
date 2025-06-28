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
import { playlist } from "../Components/playlistData";

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

        this.totalSquares = 72; // Reduced for better visibility
        this.angleStep = 5; // Evenly distribute
        this.radius = 4500; // More reasonable radius
        this.currentRotation = 0;
        /** */
        // Array of imported images
        this.imageUrls = [
          /**1 */ "https://coverartarchive.org/release/79c806c8-546b-4d04-b03c-9e1d64b62589/25519071748.jpg",
          /**2 */ "https://coverartarchive.org/release/e1ed2868-a7cd-4f0d-869e-7d566c3b0b05/31078616861.jpg",
          /**3 */ "https://coverartarchive.org/release/c39794bb-1886-42d9-8a8e-a1be8ae8d5fa/5882590146.jpg",
          /** 4*/ "/cover/MANON.jpg",
          /**5 */ "/cover/GEMANO.jpg",
          /**6 */ "/cover/IDS.jpg",
          /**7 */ "/cover/Fallon.jpg",
          /**8 */ "https://coverartarchive.org/release/11506187-0013-4276-8c87-4a2e561af7d8/35691990856.png",
          /**9 */ "https://coverartarchive.org/release/4ea1844b-5c23-4446-bec0-9e1e2e4d7467/28616963008.png",
          /**10 */ "https://coverartarchive.org/release/00a2aacb-0110-4723-a019-96ccbb7341b8/25655353512.png",
          /** 11*/ "https://coverartarchive.org/release/0bbca21e-43f6-4da7-8f3c-cebaea81da31/41460529279.jpg",
          /**12 */ "https://coverartarchive.org/release/24f1c276-45b5-45bb-9b1a-466a1df0807a/30674193707.jpg",
          /** 13*/ "https://coverartarchive.org/release/0d8d50e3-6899-4bad-8780-3713f2b87e10/29709457239.png",
          /**14 */ "https://coverartarchive.org/release/375a06fe-2bec-46b2-8ccc-6240d8cf83b1/32325480027.jpg",
          /**15 */ "https://coverartarchive.org/release/d1907623-576f-48cb-b413-add073ad6374/31476560975.jpg",
          /**16 */ "https://coverartarchive.org/release/8793ef8f-f1c1-4c58-90dd-268cf6d35a71/25720578244.jpg",
          /**17 */ "https://coverartarchive.org/release/2a838b9c-d08b-481a-83f3-f78773c8517a/19971345741.jpg",
          /** 18*/ "https://coverartarchive.org/release/2da72cb7-16d4-4dca-8818-a355b074a977/21815634824.jpg",
          /** 19*/ "https://coverartarchive.org/release/2dd3f79c-8236-42db-89ae-97220ff5fd5c/32161737301.jpg",
          /**20 */ "https://coverartarchive.org/release/3c424172-b85a-4789-9016-bbf513968f91/39999845927.jpg",
          /**21 */ "https://coverartarchive.org/release-group/44e8e657-a89a-45c9-9ef1-32b188cff10a/front",
          /**22 */ "https://coverartarchive.org/release/4b15ffa5-1f4e-421a-ac86-9c6aa9b33801/42106514154.jpg",
          /**23 */ "https://coverartarchive.org/release/4c58e74b-499d-42b1-bb6f-147996762a50/20860723313.jpg",
          /**24 */ "https://coverartarchive.org/release/5c0f1145-2396-4fa2-bf45-5bbbf6c5f43e/30851900114.jpg",
          /**25 */ "https://coverartarchive.org/release/5f8cede1-d58d-49e3-a715-2cb5c3ddd6c7/33515113192.jpg",
          /**26 */ "https://coverartarchive.org/release/5fe133cb-d394-4089-a5e1-ec1e27bf4fe3/7179546566.jpg",
          /**27 */ "https://coverartarchive.org/release/6c7c539b-e160-4dd5-9175-25f99e5feb89/22805423693.jpg",
          /**28 */ "https://coverartarchive.org/release/6e5ca41d-e2d8-49da-8444-076790e2b2fe/29890851812.png",
          /**29 */ "https://coverartarchive.org/release/7d987f75-1495-4d39-baea-32910890c5b7/12481773329.png",
          /**30 */ "https://coverartarchive.org/release/7d4252c3-c700-40f5-b348-1c8ad16ed782/28072341687.jpg",
          /**31 */ "https://coverartarchive.org/release/8d7cbd0e-73e6-4915-94f7-8a79bea24709/35818706296.jpg",
          /**32 */ "https://coverartarchive.org/release/8fd6c91f-170b-4512-8b9a-3e1691218538/31695404825.jpg",
          /**33 */ "https://coverartarchive.org/release/e371b643-7f4a-4c1f-90be-3b33ff21896a/19949042088.jpg",
          /**34 */ "https://coverartarchive.org/release/9f20ef0b-2679-4fba-a79d-62e97f8baae6/26373058497.jpg",
          /**35 */ "https://coverartarchive.org/release/16dcd629-149e-49d4-8602-d343d4847b6e/16452836487.jpg",
          /** 36*/ "https://coverartarchive.org/release/33eed724-cd55-465a-9f50-b4afe3c7728e/20271298649.jpg",
          /**37 */ "https://coverartarchive.org/release/38db2f3a-e062-4b19-a93a-7979f5d088bc/10047912847.jpg",
          /**38 */ "https://coverartarchive.org/release/6a4c4d2b-d952-4e6c-af87-957eacaac0d7/21967008981.jpg",
          /**39 */ "https://coverartarchive.org/release/74e92c4b-fc16-41f4-b309-cd8ec45d98b9/13139431852.jpg",
          /**40 */ "https://coverartarchive.org/release/078b016f-fc07-4fe1-8752-52a42d916bb7/18888450284.jpg",
          /**41 */ "https://coverartarchive.org/release/81ed0543-827a-436d-9cc8-576e257e1d22/37503588754.jpg",
          /**42 */ "https://coverartarchive.org/release/03f03619-385a-4ed9-9974-cdcdf6404cf5/14949830669.jpg",
          /**43 */ "https://coverartarchive.org/release/785d7c67-a920-4cee-a871-8cd9896eb8aa/15880065101.jpg",
          /**44 */ "https://coverartarchive.org/release/b0f2f06b-09b5-44ba-9e5d-73a25944d3f1/26274757363.jpg",
          /**45 */ "https://coverartarchive.org/release/55687ea2-0140-4736-9bac-3e85b2155342/25777852124.jpg",
          /**46 */ "https://coverartarchive.org/release/329f6611-784a-4203-a86b-e8947f536d65/34997936292.jpg",
          /**47 */ "https://coverartarchive.org/release/374ae2bd-15f6-4ac4-9a5c-5022c5b7dfc1/19531112915.jpg",
          /**48 */ "https://coverartarchive.org/release/66bf6a99-013c-4987-886f-57c4ce0b116d/23666406150.jpg",
          /**49 */ "https://coverartarchive.org/release/3c506edb-a0fd-4a6e-9111-743dce63e4d0/11547633135.jpg",
          /**50 */ "https://coverartarchive.org/release/f9d5d3f9-9a8a-4994-8da0-8a4aae7a991f/27559174944.jpg",
          /**51 */ "https://coverartarchive.org/release/3153e24e-393f-4b63-9a84-c1632bc724e4/25160022671.jpg",
          /**52 */ "https://coverartarchive.org/release/4091ed0f-ea0d-4136-bb00-d8ccbb4fb1ea/40930503072.jpg",
          /**53 */ "https://coverartarchive.org/release/79427a1e-70a4-4bfd-97f2-d5e13b3d8aaa/33454133262.jpg",
          /**54 */ "https://coverartarchive.org/release/85734b0f-68d2-4cc8-b173-508618812905/31836689174.jpg",
          /**55 */ "https://coverartarchive.org/release/1395477c-a71e-4058-a893-d33dfcad6a4b/17799765239.jpg",
          /**56 */ "https://coverartarchive.org/release/7a629d52-6a61-3ea1-a0a0-dd50bdef63b4/835759071.jpg",
          /**57 */ "https://coverartarchive.org/release/82784744-65ed-4f32-b004-ba45cd726509/22387554802.jpg",
          /**58 */ "https://coverartarchive.org/release/73637128-e160-41e1-8563-65f6eb7c0f2b/37207177453.jpg",
          /**59 */ "https://coverartarchive.org/release/750859c2-fc36-407c-808d-e92d81c94f5d/29606436531.jpg",
          /**60 */ "https://coverartarchive.org/release/b637a34f-56dd-4f09-90ce-1018e5e59c82/35066052153.jpg",
          /**61 */ "https://coverartarchive.org/release/5e658ccb-cdfe-4e3c-91f7-79299ee45027/32488694384.jpg",
          /**62 */ "https://coverartarchive.org/release/13027e7b-340c-4478-8dda-df5fa4af3564/34355828522.jpg",
          /**63 */ "https://coverartarchive.org/release/c11cab74-3d93-40e3-bf23-72a840bf55f8/29212315568.jpg",
          /**64 */ "https://coverartarchive.org/release/d62467b8-ed96-498b-9ffb-bcaf1a24d0ec/23011160834.jpg",
          /**65 */ "https://coverartarchive.org/release/d4cafc2c-ad41-4eb3-bb17-8aee66aab277/26439841665.jpg",
          /**66 */ "https://coverartarchive.org/release/9f7f9e86-8c61-4ccc-997a-b06c3d9140f4/37713084492.jpg",
          /**67 */ "https://coverartarchive.org/release/e08fa6ba-bb7f-40db-939c-0480a6a32554/32706879574.jpg",
          /**68 */ "https://coverartarchive.org/release/ee33f54e-3a20-47ff-95cd-e0476498de45/29652301043.png",
          /**69 */ "https://coverartarchive.org/release/f3c1f76d-d436-4402-8888-1fdcf9e6cba8/27301517082.jpg",
          /**70 */ "https://coverartarchive.org/release/2a059e43-e66c-4d6d-9a4f-dea9a6919061/10112836421.jpg",
          /**71 */ "https://coverartarchive.org/release/fa65b0a4-fec9-4f21-8976-14184124a707/34127617731.jpg",
          /**72 */ "https://coverartarchive.org/release/fc6ef0f1-5dc9-4b30-bdad-22cb9db92220/20158533713.jpg",
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
                          }%, rgba(255, 255, 255, 0.50) ${
                            (currentTime / duration) * 100
                          }%, rgba(255, 255, 255, 0.50) 100%)`,
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
