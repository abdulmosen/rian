import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeView from './components/HomeView';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [preSelectedServiceType, setPreSelectedServiceType] = useState<string>('');

  const onSelectServiceForBooking = (serviceTitle: string) => {
    setPreSelectedServiceType(serviceTitle);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <HomeView 
              setCurrentPage={setCurrentPage} 
              setPreSelectedServiceType={setPreSelectedServiceType} 
            />
          </>
        );
      case 'about':
        return <About />;
      case 'services':
        return <Services onSelectServiceForBooking={onSelectServiceForBooking} />;
      case 'contact':
        return (
          <Contact 
            preSelectedServiceType={preSelectedServiceType} 
            onSubmissionSuccess={() => setPreSelectedServiceType('')} 
          />
        );
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <HomeView 
              setCurrentPage={setCurrentPage} 
              setPreSelectedServiceType={setPreSelectedServiceType} 
            />
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-blue text-white selection:bg-gold/20 selection:text-gold">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
