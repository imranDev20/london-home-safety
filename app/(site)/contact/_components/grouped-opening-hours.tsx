import React from "react";
import { OpeningDateTime } from "@prisma/client";

interface GroupedOpeningHoursProps {
  openingHours: OpeningDateTime[];
}

const GroupedOpeningHours: React.FC<GroupedOpeningHoursProps> = ({
  openingHours,
}) => {
  const sortedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  };

  const groupedHours = openingHours.reduce((acc, curr) => {
    const key = `${curr.openingTime}-${curr.closingTime}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(formatDay(curr.dayOfWeek));
    return acc;
  }, {} as Record<string, string[]>);

  const formatDayRange = (days: string[]) => {
    days.sort((a, b) => sortedDays.indexOf(a) - sortedDays.indexOf(b));
    if (days.length === 1) return days[0];
    if (days.length === 2) return days.join(" - ");
    const ranges = [];
    let start = days[0];
    let prev = days[0];
    for (let i = 1; i < days.length; i++) {
      if (sortedDays.indexOf(days[i]) - sortedDays.indexOf(prev) !== 1) {
        ranges.push(start === prev ? start : `${start} - ${prev}`);
        start = days[i];
      }
      prev = days[i];
    }
    ranges.push(start === prev ? start : `${start} - ${prev}`);
    return ranges.join(", ");
  };

  return (
    <div>
      {Object.entries(groupedHours).map(([hours, days], index) => (
        <p key={index} className="mb-1">
          <span className="font-normal">{formatDayRange(days)}:</span>{" "}
          {hours.replace("-", " - ")}
        </p>
      ))}
    </div>
  );
};

export default GroupedOpeningHours;
