export default function PlatilloCard({img, name, onclick}) {
    return (
        <div className="PlatilloCard" onClick={onclick}>
            <img src={img} alt={name}/>
            <h4>{name}</h4>
        </div>
    )    
}