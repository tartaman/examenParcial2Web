import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetallePlatillo() {
  const { id } = useParams();
  const [platillo, setPlatillo] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        setPlatillo(meal);

        // Extraer ingredientes y cantidades
        const nuevosIngredientes = [];
        for (let i = 1; i <= 20; i++) {
          const nombre = meal[`strIngredient${i}`];
          const cantidad = meal[`strMeasure${i}`];
          if (nombre && nombre.trim() !== "") {
            nuevosIngredientes.push({
              nombre,
              cantidad,
              id: i, 
            });
          }
        }

        setIngredientes(nuevosIngredientes);
      });
  }, [id]);

  const eliminarIngrediente = (idIngrediente) => {
    setIngredientes(prev => prev.filter(ing => ing.id !== idIngrediente));
  };

  if (!platillo) return <div>Cargando...</div>;

  return (
    <div>
      <h1 style={{textAlign:"center"}}>{platillo.strMeal}</h1>
      <div style={{display:"flex", justifyContent:"center"}}>
        <img src={platillo.strMealThumb} alt={platillo.strMeal} width="300"/>
      </div>

      <h2 style={{textAlign:"center"}}>Ingredientes</h2>
      <ul style={{display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center"}}>
        {ingredientes.map(ing => (
          <li style={{display:"flex", flexDirection:"column", alignContent:"center", gap:"1rem"}}  key={ing.id}>
            {ing.nombre} - {ing.cantidad}
            <button onClick={() => eliminarIngrediente(ing.id)} style={{ marginLeft: '10px' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2 style={{textAlign:"center"}}>Instrucciones</h2>
      <p style={{textAlign:"justify", padding:"1rem 2rem "}}>{platillo.strInstructions}</p>
    </div>
  );
}

export default DetallePlatillo;
