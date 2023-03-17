import { Navbar, Home, Footer, Services, Transactions } from "./components";

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="home-background">
        <Navbar />
        <Home />
        <Transactions />
      </div>
      <Footer />
    </div>
  );
}

export default App;
