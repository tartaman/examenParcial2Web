import { useEffect, useState } from "react";
export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
                const data = await response.json()
                setCategories(data.categories)
                setLoading(false)
                console.log(data)
            } catch {
                console.log("Error al encontrar categorias")
            }
        }
        fetchCategories()
    }, [])
    if (loading) return <p>Cargando categorias...</p>

    return (
        <div className="Categories custom-scrollbar">
             {categories.map(cat => (
                <div key={cat.idCategory} className="CategoryCard">
                    <img
                        src={cat.strCategoryThumb}
                        alt={cat.strCategory}
                    />
                    <p>{cat.strCategory}</p>
                </div>
            ))}
        </div>
    )
}