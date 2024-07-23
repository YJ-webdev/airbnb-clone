// "use client";

// import React, { useMemo } from "react";

// const disabledDates = useMemo(() => {
//   let dates = [];

//   reservations.forEach((reservation) => {
//     const range = eachDayOfInterval({
//       start: new Date(reservation.startDate),
//       end: new Date(reservation.endDate),
//     });

//     dates = [...dates, ...range];
//   });

//   return dates;
// }, [reservations]);

// const [isLoading, setIsLoading] = useState(false);
// const [totalPrice, setTotalPrice] = useState(listing.price);

// export const Calender = () => {
//   return <div>Calender</div>;
// };
