import { useEffect, useState } from "react";
export default function Categories({ onCategoryClick, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
        setLoading(false);
      } catch {
        console.log("Error al encontrar categorias");
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorias...</p>;

  return (
    <div className="Categories custom-scrollbar">
        <h1 style={{textAlign:"center"}}>Categories</h1>
      {categories.map(cat => {
        const isActive = cat.strCategory === selectedCategory;
        return (
            <div
            key={cat.idCategory}
            className={`CategoryCard ${isActive ? "active" : ""}`}
            onClick={() => onCategoryClick(cat.strCategory)}
            >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                <p>{cat.strCategory}</p>
            </div>
        );
    })}
    </div>
  );
}
