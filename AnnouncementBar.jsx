
import React from "react";

const festivalOffers = [
  // 2026 - Special 80% OFF
  { name: "Eid-ul-Fitr", date: "2026-03-21", discount: 80 },
  { name: "Bakra Eid", date: "2026-05-27", discount: 80 },
  { name: "Muharram", date: "2026-06-26", discount: 80 },
  { name: "Raksha Bandhan", date: "2026-08-28", discount: 80 },
  { name: "Dhanteras", date: "2026-11-06", discount: 80 },
  { name: "Diwali", date: "2026-11-08", discount: 80 },

  // 2026 - Other Festivals 60% OFF
  { name: "Holi", date: "2026-03-04", discount: 60 },
  { name: "Ram Navami", date: "2026-03-26", discount: 60 },
  { name: "Janmashtami", date: "2026-09-04", discount: 60 },
  { name: "Dussehra", date: "2026-10-20", discount: 60 },
  { name: "Christmas", date: "2026-12-25", discount: 60 },

  // 2027 - Special 80% OFF
  { name: "Eid-ul-Fitr", date: "2027-03-10", discount: 80 },
  { name: "Bakra Eid", date: "2027-05-17", discount: 80 },
  { name: "Muharram", date: "2027-06-16", discount: 80 },
  { name: "Raksha Bandhan", date: "2027-08-17", discount: 80 },
  { name: "Dhanteras", date: "2027-10-27", discount: 80 },
  { name: "Diwali", date: "2027-10-29", discount: 80 },

  // 2027 - Other Festivals 60% OFF
  { name: "Makar Sankranti", date: "2027-01-15", discount: 60 },
  { name: "Maha Shivratri", date: "2027-03-06", discount: 60 },
  { name: "Holi", date: "2027-03-22", discount: 60 },
  { name: "Ram Navami", date: "2027-04-15", discount: 60 },
  { name: "Buddha Purnima", date: "2027-05-20", discount: 60 },
  { name: "Janmashtami", date: "2027-08-25", discount: 60 },
  { name: "Ganesh Chaturthi", date: "2027-09-04", discount: 60 },
  { name: "Navratri", date: "2027-09-30", discount: 60 },
  { name: "Dussehra", date: "2027-10-09", discount: 60 },
  { name: "Chhath Puja", date: "2027-11-04", discount: 60 },
  { name: "Guru Nanak Jayanti", date: "2027-11-14", discount: 60 },
  { name: "Christmas", date: "2027-12-25", discount: 60 },
];

const getActiveFestival = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeFestivals = festivalOffers
    .map((festival) => {
      const festivalDate = new Date(`${festival.date}T00:00:00`);

      const startDate = new Date(festivalDate);
      startDate.setDate(startDate.getDate() - 10);

      const endDate = new Date(festivalDate);
      endDate.setDate(endDate.getDate() + 2);

      return {
        ...festival,
        distance: Math.abs(festivalDate - today),
        active: today >= startDate && today <= endDate,
      };
    })
    .filter((festival) => festival.active);

  // 80% OFF ko priority
  activeFestivals.sort((a, b) => {
    if (a.discount !== b.discount) {
      return b.discount - a.discount;
    }

    return a.distance - b.distance;
  });

  return activeFestivals[0] || null;
};

const AnnouncementBar = () => {
  const activeFestival = getActiveFestival();

  return (
    <>
      <div className="flex min-h-[42px] items-center justify-between gap-3 bg-[#064b46] px-5 py-2 text-sm text-white md:px-10">

        {/* LEFT CONTENT */}

        <div className="flex flex-wrap items-center gap-3 font-medium">

          {activeFestival ? (
            <>
              <p className="animate-pulse font-extrabold text-orange-400">
                🎉 {activeFestival.name} SPECIAL: {activeFestival.discount}% OFF
              </p>

              <span className="text-white/50">|</span>

              <p>🔥 Limited Time Offer!</p>
            </>
          ) : (
            <>
              <p className="text-orange-400">
                🎁 Free Shipping on Orders Above ₹999
              </p>

              <span className="text-white/50">|</span>

              <p>🚚 Easy Returns</p>

              <span className="hidden text-white/50 sm:block">|</span>

              <p className="hidden sm:block">
                🎉 Trusted by 1M+ Customers
              </p>
            </>
          )}

        </div>

        {/* RIGHT CONTENT */}

        <div className="hidden items-center gap-3 md:flex">

          <a href="#" className="transition hover:text-orange-400">
            Help
          </a>

          <span className="text-white/50">|</span>

          <a href="#" className="transition hover:text-orange-400">
            Track Order
          </a>

          <span className="text-white/50">|</span>

          <button className="transition hover:text-orange-400">
            English⌄
          </button>

        </div>
      </div>

      {/* BOTTOM LINE */}

      <div className="h-[2px] w-full bg-[#1b716a]" />
    </>
  );
};

export default AnnouncementBar;
