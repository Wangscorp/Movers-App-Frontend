import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <h1>Welcome to Movers App</h1>
      <p>Relocate with ease and efficiency.</p>
    </div>
  );
};

export default Home;