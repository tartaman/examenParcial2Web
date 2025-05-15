import '../styles/Home.css'
import Categories from '../Components/Categories';
import {useState, useEffect} from 'react'
function Home() {
    
    return (
        <div>
            <div className='Hero'>
            </div>
            <div>
                <Categories/>
                <div className='Food'>

                </div>
            </div>
        </div>
    )
}

export default Home;