import "../styles/Home.css";
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const handleNavigation = (destination) => {

    navigate(destination);
};

  return (
    <>
      <header>
        <ol>
          <a href="https://www.alanbultel.com/" target="_blank">
            alanbultel.com
          </a>
        </ol>
      </header>
      <section className="home">
        <h1>Welcome to The Playlist</h1>
        <h2 onClick={() => handleNavigation("/The_Playlist")} style={{ cursor: 'pointer' }}>
          Click and enjoy some music ...
        </h2>
      </section>
    </>
  );
}

export default Home;