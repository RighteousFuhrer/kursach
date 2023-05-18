"use client";

import { BusRoute, BusTicket, Receipt, User } from "@prisma/client";
import { useState, useEffect } from "react";
import dateFormater from "@utils/dateFormater";
import durationFormater from "@utils/durationFormater";
import { LocalTicket } from "@interfaces/Tickets";
import dateComparer from "@utils/dateComparer";

interface TicketProps {
  user: User;
  ticket: LocalTicket;
}

function Ticket({ user, ticket }: TicketProps) {
  return (
    <div className="w-full flex box-border ">
      <div
        className={`w-full flex py-6 px-6 justify-between border-b border-gray-300 shadow-inner  ${
          dateComparer(new Date(Date.now()), ticket.arivalDate) < 1
            ? "bg-green-50"
            : "bg-gray-200"
        } box-border `}
      >
        <div className="flex-1 flex-col justify-center">
          <div className="text-center font-semibold truncate">
            {ticket.departureCity}
          </div>
          <div className="text-xs text-center text-gray-600">
            {dateFormater(new Date(ticket.departureDate))}
          </div>
        </div>
        <div className="flex-1 flex-col justify-center">
          <div className="text-center">Duration</div>
          <div className="text-sm text-center text-gray-600">
            {durationFormater(
              new Date(ticket.arivalDate),
              new Date(ticket.departureDate)
            )}
          </div>
        </div>
        <div className="flex-1 flex-col justify-center">
          <div className="text-center font-semibold truncate">
            {ticket.arrivalCity}
          </div>
          <div className="text-xs text-center text-gray-600">
            {dateFormater(new Date(ticket.arivalDate))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
