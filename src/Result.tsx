import React, { useState } from "react";
import starSVG from "./star.svg";

export type IResult = {
  ID: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  departureAirport: string;
  departureDate: string;
  duration: number;
  adults: number;
  children: number;
  infants: number;
  price: number;
  overview: string;
};

const buildLengthCopy = (duration: number) =>
  duration === 1 ? `${duration} day` : `${duration} days`;

const formatPrice = (price: number) => `£${price.toFixed(2)}`;

function Result({
  name,
  location,
  image,
  rating,
  adults,
  children,
  infants,
  departureAirport,
  departureDate,
  duration,
  price,
  overview,
}: IResult) {
  const [showOverview, setShowOverview] = useState(false);

  return (
    <div className="Result">
      <div className="Result__row">
        <img className="Result__image" src={image} />
        <div className="Result__info">
          <h2 className="Result__title">{name}</h2>
          <div className="Result__subTitle">{location}</div>
          <Rating rating={rating} />
          <PassengerCopy
            adults={adults}
            children={children}
            infants={infants}
          />
          <p>
            <strong>{departureDate}</strong> for
            <strong> {buildLengthCopy(duration)}</strong>
          </p>
          <p>
            departing from <strong>{departureAirport}</strong>
          </p>
          <button>
            <div>Book Now</div>
            <div className="Result__cta">{formatPrice(price)}</div>
          </button>
        </div>
        <div
          className="Result__overlay"
          onClick={() => {
            setShowOverview(!showOverview);
          }}
        >
          <strong>Read {showOverview ? "less" : "more"}</strong> about this
          hotel
        </div>
      </div>
      {showOverview && (
        <div className="Result__overview">
          <div>Overview</div>
          <p>{overview}</p>
        </div>
      )}
    </div>
  );
}

export default Result;

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="ratings">
      {Array(rating)
        .fill(null)
        .map((r, i) => (
          <img key={i} className="rating" src={starSVG} />
        ))}
    </div>
  );
};

const PassengerCopy = ({
  adults,
  children,
  infants,
}: {
  adults: number;
  children: number;
  infants: number;
}) => {
  return (
    <p>
      <strong>{adults} </strong>
      {adults === 1 ? "Adult" : "Adults"}
      {children > 0 && (
        <>
          ,<strong> {children} </strong>{" "}
          {children === 1 ? "Child " : "Children "}
        </>
      )}
      {infants > 0 && (
        <>
          &<strong> {infants} </strong> {infants === 1 ? "Infant" : "Infants"}
        </>
      )}
    </p>
  );
};
