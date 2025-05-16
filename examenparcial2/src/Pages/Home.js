import '../styles/Home.css'
import Categories from '../Components/Categories';
import {useState, useEffect} from 'react'
import Platillos from '../Components/Platillos';
function Home() {
    const [selectedCategory, setSelectedCategory] = useState("Beef");
    return (
        <div>
            <div className='Hero'>
                <h1>Cocina marítima</h1>
                <h3>Donde las conchas saben mejor</h3>
            </div>
            <div className='mainContainer'>
                <Categories onCategoryClick={setSelectedCategory} selectedCategory={selectedCategory}/>
                {selectedCategory && <Platillos categoria={selectedCategory} />}
            </div>
        </div>
    )
}

export default Home;