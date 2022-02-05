import './styles/reset.css'
import './styles/App.scss'
import Footer from './components/footer'
import Header from './components/header'
import Sidebar from './components/sidebar';
import Main from './components/main';

function App() {
  return (
    <div className="app">
      <Header />
      <section className='app_content'>
        <Sidebar />
        <Main />
      </section>
      <Footer />
    </div>
  );
}

export default App
