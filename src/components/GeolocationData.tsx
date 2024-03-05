import { FC, useEffect, useState } from "react";

export const GeolocationData: FC = () => {
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    const getPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
        },
        (error) => {
          setError(error);
        }
      );
    };

    const getGeolocation = () => {
      if ("permissions" in navigator) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((rs) => {
            if (rs.state === "denied") {
              setError(new GeolocationPositionError());
            } else {
              getPosition();
            }
          })
          .catch(() => {
            setError(new GeolocationPositionError());
          });
      } else {
        getPosition();
      }
    };
    
    getGeolocation();
  }, []);

  console.log({ position });

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center text-[30px] font-bold py-8">
        GEOLOCATION
      </h2>
      <div className="p-8">
        <div className="mt-4 font-bold text-red-700">POSITION</div>
        <pre className="bg-slate-800 p-4 text-slate-300 rounded-lg text-[13px]">{JSON.stringify(position ? {
          coords: {
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
          },
          timestamp: position?.timestamp,
        } : '', undefined, 2)}</pre>
        <div className="mt-4 font-bold text-red-700">ERROR</div>
        <pre>PERMISSION_DENIED: {error?.PERMISSION_DENIED}</pre>
        <pre>POSITION_UNAVAILABLE: {error?.POSITION_UNAVAILABLE}</pre>
        <pre>TIMEOUT: {error?.TIMEOUT}</pre>
        <pre>{error?.code}</pre>
        <pre>{error?.message}</pre>
      </div>
    </div>
  );
};
