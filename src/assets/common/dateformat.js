
import moment from "moment";

export const ChangeFormatDate = (dateParams) => {
    //December 5, 2023, 11:00:37 AM
    const formattedDate = new Date(dateParams).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
    return formattedDate;
};


export const ExpectedDeliverydata = (value, date) => {
//   switch (value) {
//     case "1":
//       return (
//         moment(date)
//           .add(value - 1, "days")
//           .format("Do MMMM") +
//         " to " +
//         moment(date).add(value, "days").format("Do MMMM")
//       );
//     case "2":
//       return (
//         moment(date).add(2, "days").format("Do MMMM") +
//         " to " +
//         moment(date).add(4, "days").format("Do MMMM")
//       );
//     case "1":
//       return (
//         moment(date).add(2, "days").format("Do MMMM") +
//         " to " +
//         moment(date).add(4, "days").format("Do MMMM")
//       );
//     case "1":
//       return (
//         moment(date).add(2, "days").format("Do MMMM") +
//         " to " +
//         moment(date).add(4, "days").format("Do MMMM")
//       );
//     default:
//       return null; // or some default value if necessary
//   }
return (
        moment(date)
          .add(value - 1, "days")
          .format("Do MMMM") +
        " to " +
        moment(date).add(value, "days").format("Do MMMM")
      )
};


export const estimatedDeliveryTimes = (value) => {
  switch (value) {
    case "1":
      return "Fast deliver by 12 hours to 1 day";
    case "2":
      return "Fast deliver by 1 day to 2 days";
    case "3":
      return "Estimate deliver by 2 days to 3 days";
    case "4":
      return "Estimate deliver by 3 days to 4 days";
    case "5":
      return "Estimate deliver by 4 days to 5 days";
    case "6":
      return "Estimate deliver by 5 days to 6 days";
    case "7":
      return "Estimate deliver by 6 days to 7 days";
    case "8":
      return "Estimate deliver by in a week";
    default:
      return "Unknown delivery time";
  }
};
