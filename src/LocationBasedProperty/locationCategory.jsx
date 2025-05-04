import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const locationCards = [
  {
    id: 1,
    location: "Dubai",
    image: "https://th.bing.com/th/id/OIP.ImjGjWP4GB6gJeo1WgEKnwHaE7?cb=iwc1&rs=1&pid=ImgDetMain",
    className: "col-span-1 row-span-2 h-[600px]",
  },
  {
    id: 2,
    location: "Dubai",
    image: "https://th.bing.com/th/id/OIP.xxCYFyPuSvttbDsAhcIB5QHaFH?cb=iwc1&w=827&h=571&rs=1&pid=ImgDetMain",
    className: "col-span-2 row-span-1 h-[290px]",
  },
  {
    id: 3,
    location: "Dubai",
    image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
    className: "col-span-1 row-span-1 h-[290px]",
  },
  {
    id: 4,
    location: "Dubai",
    image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg",
    className: "col-span-2 row-span-1 h-[290px]",
  },
  {
    id: 5,
    location: "Dubai",
    image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg",
    className: "col-span-1 row-span-1 h-[290px]",
  },
];

function LocationCategory() {
  return (
    <section className="w-full max-w-[1335px] mx-auto px-4 py-8">
      <h1 className="font-['Montserrat',Helvetica] font-semibold text-black text-[40px] leading-[60px] mb-8">
        Properties in your desired locations
      </h1>

      <div className="grid grid-cols-4 gap-4 w-full">
        {locationCards.map((card) => (
          <Card
            key={card.id}
            className={`rounded-[20px] overflow-hidden border-none ${card.className}`}
          >
            <CardContent className="p-0 h-full relative group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/70 hover:bg-white/70 text-gray-800 px-6 py-2 rounded-full">
                    <span className="font-['Montserrat',Helvetica] font-medium text-base">
                      {card.location}
                    </span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default LocationCategory;
