import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWI5YWU1MDQwNjNlZjkzZmNkNWIzMjc1M2QzZGEyMSIsIm5iZiI6MTc1NTg0OTc4My44OTc5OTk4LCJzdWIiOiI2OGE4MjQzN2VkYTllNWMyMWY2MGQ4YjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3ENbENadzXZEtZIQoboPYX3puRY2o8TTy6H_ec9nLT0'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?api_key=99b9ae504063ef93fcd5b32753d3da21`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])
  return (
    <div className='title-cards'>
      <h2 >{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link  to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>

    </div>
  )
}

export default TitleCards
