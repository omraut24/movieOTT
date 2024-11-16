import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./detail.css"; // Assuming you create a separate CSS file for styling

const Details = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
            );
            const data = await response.json();
            setMovie(data);
        };

        const fetchCast = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
            );
            const castData = await response.json();
            setCast(castData.cast);
        };

        fetchMovie();
        fetchCast();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="details-container">
                <div className="left-conatiner">
                    <div className="top-data">
                        <div className="poster">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                        <div className="info">
                            <h1>{movie.title}</h1>
                            <p className="rating">Rating: {movie.vote_average}</p>
                            <p className="runtime">
                                <div className="duration"> {movie.runtime} min </div>
                                &nbsp;&nbsp;
                                {movie.genres.map((genre) => genre.name).join(", ")}
                            </p>
                            <p className="release-date">
                                Release Date: {new Date(movie.release_date).toDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="bottom-data">
                        <div className="overview">
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="right-conatiner"> */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="right-img"
                />
                {/* </div> */}
            </div>
            <div className="Cast-conatainer">
                <p>Cast</p>
                <Swiper
                    direction="horizontal"
                    spaceBetween={10} // Adjust space between slides
                    slidesPerView={3} // Adjust number of visible slides
                    navigation // Adds navigation arrows
                    pagination={{ clickable: true }} // Adds pagination dots
                    breakpoints={{
                        // Responsive breakpoints
                        640: { slidesPerView: 2, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        1024: { slidesPerView: 6, spaceBetween: 20 },
                    }}
                >
                    {cast?.map((res) => (
                        <SwiperSlide key={res.id}>
                            <div key={movie.id} className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${res.profile_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <h2 className="movie-title">{res.original_name}</h2>
                                <p className="movie-rating">{res.character}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Details;
