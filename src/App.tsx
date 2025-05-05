import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { WellnessSpace } from './pages/WellnessSpace';
import { Aquafitness } from './pages/Aquafitness';
import { Events } from './pages/Events';
import { Babynage } from './pages/Babynage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { Tarifs } from './pages/Tarifs';
import { Horaires } from './pages/Horaires';
import { FAQ } from './pages/FAQ';
import { Blog } from './pages/Blog';
import { CentreCastelnau } from './pages/CentreCastelnau';
import { CentreMontpellier } from './pages/CentreMontpellier';
import { Acces } from './pages/Acces';
import { Contact } from './pages/Contact';
import { MentionsLegales } from './pages/MentionsLegales';
import { Confidentialite } from './pages/Confidentialite';
import { CGV } from './pages/CGV';
import { Accessibilite } from './pages/Accessibilite';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin route */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Public routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/espace-bien-etre" element={<WellnessSpace />} />
            <Route path="/aquafitness" element={<Aquafitness />} />
            <Route path="/events" element={<Events />} />
            <Route path="/babynage" element={<Babynage />} />
            
            {/* Information pages */}
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/horaires" element={<Horaires />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Centre pages */}
            <Route path="/centre/castelnau" element={<CentreCastelnau />} />
            <Route path="/centre/montpellier" element={<CentreMontpellier />} />
            <Route path="/acces" element={<Acces />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Legal pages */}
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/accessibilite" element={<Accessibilite />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;