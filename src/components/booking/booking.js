import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieService from "../../services/movieService";
import TheatreService from "../../services/theatreService";
import BookingService from "../../services/bookingService";

const Booking = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [theatreList, setTheatreList] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("Select Theatre");
  const [currentTheatre, setCurrentTheatre] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    getMovie(id);
    getTheatre();
  }, [id]);

  const getMovie = async (id) => {
    try {
      const response = await MovieService.getMovie(id);
      console.log(response);
      setMovie(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheatre = async () => {
    try {
      const response = await TheatreService.getTheatre();
      console.log(response);
      setTheatreList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectedTheatre = (theatreId, theatreName) => {
    setSelectedTheatre(theatreName);

    TheatreService.getTheatreById(theatreId)
      .then((response) => {
        console.log(response);
        setCurrentTheatre(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bookTicket = () => {
    if (ticketCount > 0) {
      const data = {
        ticketsCount: ticketCount,
        movieId: id,
        theatreId: currentTheatre.id,
      };

      BookingService.bookTicket(data)
        .then((response) => {
          console.log(response);
          toast.success(response.message, { autoClose: 5000 });
          setSelectedTheatre("Select Theatre");
          setTicketCount(0);
          setCurrentTheatre((prevTheatre) => ({
            ...prevTheatre,
            availableSeat: prevTheatre.availableSeat - ticketCount,
          }));
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data.message, { autoClose: 5000 });
        });
    }
  };

  const seatMaxValidation = (event) => {
    const value = Number(event.target.value);
    setTicketCount(value);

    if (value > currentTheatre.availableSeat) {
      toast.error(`${currentTheatre.availableSeat} seats available`, {
        autoClose: 5000,
      });
    }
  };

  const handelFormSubmit = (event) => {
    event.preventDefault();
    bookTicket();
  };

  return (
    <section id="booking">
      <div className="container">
        {!loading ? (
          <div className="row mt-5 pt-5 justify-content-center">
            <div className="col-md-4">
              <div className="card border-0 bg-secondary">
                <div className="card-body text-center">
                  <div>
                    <img
                      src={movie.movieImage}
                      className="img-fluid"
                      width="200"
                      height="200"
                      alt={movie.movieName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-secondary">
                <div className="card-body">
                  <h4 className="card-title">Book Ticket</h4>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm w-100 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {selectedTheatre}
                    </button>
                    <ul className="dropdown-menu my-1">
                      {theatreList.map((theatre) => (
                        <li key={theatre.id}>
                          <button
                            type="button"
                            className="dropdown-item"
                            //key={theatre.id}
                            onClick={() =>
                              updateSelectedTheatre(
                                theatre.id,
                                theatre.theatreName
                              )
                            }
                          >
                            {theatre.theatreName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {currentTheatre && (
                    <div>
                      <p className="mt-3">
                        Available:{" "}
                        <strong>{currentTheatre.availableSeat} seats</strong>
                      </p>
                      <form onSubmit={bookTicket}>
                        <div className="mt-3">
                          <label htmlFor="ticketCount" className="form-label">
                            Tickets Count
                          </label>
                          <input
                            className={`form-control form-control-sm ${ticketCount > currentTheatre.availableSeat
                              ? "is-invalid"
                              : ""
                              }`}
                            type="number"
                            id="ticketCount"
                            min="1"
                            max={currentTheatre.availableSeat}
                            value={ticketCount}
                            onChange={(e) => seatMaxValidation(e)}
                          />
                          {currentTheatre.availableSeat === 0 && (
                            <p className="text-danger fs-3 fw-bold mt-2">
                              SOLD OUT!!!
                            </p>
                          )}
                          {ticketCount > currentTheatre.availableSeat && (
                            <p className="text-danger fs-sm mt-1">
                              {currentTheatre.availableSeat} seats available
                            </p>
                          )}
                        </div>
                        {currentTheatre.availableSeat === 0 ?
                          (
                            <></>
                          ) : (
                            <>
                              <div className="mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-block w-100 btn-outline-primary btn-sm"
                                  onClick={handelFormSubmit}
                                >
                                  Book
                                </button>
                              </div>
                            </>
                          )
                        }
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-secondary">
                <div className="card-body text-center">
                  <div>
                    
                    <h3 className="mt-3">{movie.movieName}</h3>
                    <ul className="text-body list-unstyled mb-3">
                      <li className="mb-2">
                        <strong>Genre: </strong>
                        <span>{movie.genre}</span>
                      </li>
                      <li className="mb-2">
                        <strong>Languages: </strong>
                        {movie.languages &&
                          movie.languages
                            .split(",")
                            .map((language) => (
                              <span key={language}>{language}</span>
                            ))}
                      </li>
                      <li className="mb-2">
                        <strong>Description: </strong>
                        <span>{movie.description}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className="col-3 d-flex justify-content-center align-items-center">
              <div className="spinner-grow text-muted" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Booking;
