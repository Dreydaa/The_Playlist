const ScrollingText = ({ title, artist, shouldScroll }) => {
  return (
    <div
      className={`playerInfo ${shouldScroll ? "scrolling" : ""}`}
    >
      <div className="text-wrapper">
        <h3>{title || "No track Selected"}</h3>
        <span className="separator">-</span>
        <h4>{artist || ""}</h4>
      </div>
    </div>
  );
};

export default ScrollingText;
