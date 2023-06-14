import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HearderGuerrero from './layout/HeaderGro';
import HeaderSectur from './layout/HeaderSectur';
import Footer from './layout/Footer';

import Login from './pages/administration/Login';
import UserPage from './pages/administration/users/UserPage';

import UpdateInsert_Hotel from './pages/administration/users/hotels_map/InsertUpdate';
import Select_Hotels from './pages/administration/users/hotels_map/ListHoteles';

import Select_Articles from './pages/administration/users/sectur_articles/ListArticles';
import UpdateInsert_Articles from './pages/administration/users/sectur_articles/InsertUpdate';

import MainPage_Sectur from './pages/main/MainPage';
import ArticlePage from './pages/main/ArticlePage';
import PageInfoArticle from './pages/main/sectur_articles/PageInfoArticle';
import Hotels_Map from './pages/main/hotels_map/MainPage';
import DirectoryPage from "./pages/main/DirectoryPage";
import LegalPage from "./pages/main/LegalPage";
import PlanningPage from "./pages/main/PlanningPage";
import TransparencyPage from "./pages/main/TransparencyPage";
import ErrorPage from './pages/main/ErrorPage';

import PrivateRouter from './helpers/PrivateRouter';

import './styles/index.css'

function App() {
  return (
    <BrowserRouter>
      <HearderGuerrero />
      <HeaderSectur />
      <Routes>
        <Route path='/' element={<MainPage_Sectur />} />
        <Route path='/Mapa' element={<Hotels_Map />} />
        <Route path='/Articulos' element={<ArticlePage />} />
        <Route path='/Informacion_articulo/:id' element={<PageInfoArticle />} />
        <Route path='/Directorio' element={<DirectoryPage />} />
        <Route path='/Planeacion' element={<PlanningPage />} />
        <Route path='/Transparencia' element={<TransparencyPage />} />
        <Route path='/Juridico' element={<LegalPage />} />

        <Route path='/iniciar_sesion' element={<Login />} />

        <Route element={<PrivateRouter />}>
          <Route path='/pagina_principal' element={<UserPage />} />

          <Route path='/agregar_hotel' element={<UpdateInsert_Hotel />} />
          <Route path='/consultar_hoteles' element={<Select_Hotels />} />
          <Route path='/actualizar_hotel/:id' element={<UpdateInsert_Hotel />} />

          <Route path='/consultar_articulos' element={<Select_Articles />} />
          <Route path='/agregar_articulo' element={<UpdateInsert_Articles />} />
          <Route path='/actualizar_articulo/:id' element={<UpdateInsert_Articles />} />
        </Route>

        <Route path='*' element={<ErrorPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
