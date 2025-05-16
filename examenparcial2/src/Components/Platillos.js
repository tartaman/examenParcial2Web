import { useState, useEffect } from 'react';
import PlatilloCard from './PlatilloCard';
import { useNavigate } from 'react-router-dom';

export default function Platillos({ categoria }) {
  const navigate = useNavigate();
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [ordenAscendente, setOrdenAscendente] = useState(true); // true = ascendente

  useEffect(() => {
    async function fetchPlatillos() {
      if (!categoria) return;
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
        const data = await response.json();
        setPlatillos(data.meals || []);
        setLoading(false);
        setBusqueda("");
        setOrdenAscendente(true); // reset orden cuando cambia categoria
      } catch {
        console.log("Error al cargar platillos");
      }
    }
    fetchPlatillos();
  }, [categoria]);

  if (loading) return <p>Cargando platillos...</p>;

  // Filtrado por búsqueda
  let platillosFiltrados = platillos.filter(plato =>
    plato.strMeal.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Ordenar según toggle
  platillosFiltrados.sort((a, b) => {
    if (a.strMeal < b.strMeal) return ordenAscendente ? -1 : 1;
    if (a.strMeal > b.strMeal) return ordenAscendente ? 1 : -1;
    return 0;
  });

  // Toggle del orden
  const toggleOrden = () => setOrdenAscendente(prev => !prev);

  return (
    <div style={{ position: 'relative' }}>
      <input
        className='inputPlatillos'
        placeholder='🔍Escribe tu platillo'
        onChange={(e) => setBusqueda(e.target.value)}
        value={busqueda}
      />
      <div className='containerplatillos custom-scrollbar'>
        {platillosFiltrados.map(plato => (
          <PlatilloCard
            key={plato.idMeal}
            img={plato.strMealThumb}
            name={plato.strMeal}
            onclick={() => navigate(`/platillo/${plato.idMeal}`)}
          />
        ))}
      </div>

      {/* Botón toggle orden - visible solo en móvil */}
      <button
        onClick={toggleOrden}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: 50,
          height: 50,
          fontSize: 12,
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          display: 'none', // lo controlamos con CSS @media
          zIndex: 1000,
        }}
        className="btn-orden-toggle"
        aria-label="Ordenar platillos"
        title={`Ordenar ${ordenAscendente ? 'descendente' : 'ascendente'}`}
      >
        {ordenAscendente ? 'A-Z' : 'Z-A'}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .btn-orden-toggle {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
