"use client";

import { BusRoute, BusTicket, Receipt, User } from "@prisma/client";
import { useState, useEffect } from "react";
import dateFormater from "@utils/dateFormater";
import durationFormater from "@utils/durationFormater";
import { LocalTicket } from "@interfaces/Tickets";
import dateComparer from "@utils/dateComparer";

interface TicketProps {
  user: User | null;
  ticket: LocalTicket;
  handleBuyTicket(id: number, userId: number): void;
}

function Ticket({ ticket, handleBuyTicket, user }: TicketProps) {
  return (
    <div className="w-full flex py-2 px-6 box-border ">
      <div
        className={`w-full flex py-6 px-8 justify-between border-b bg-stone-50 border my-1 rounded-xl `}
      >
        <div className="flex-1 flex flex-col justify-center">
          <div className="text font-medium text-gray-600 text-center">
            <div>#{ticket.routeId}</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center font-semibold truncate">
            {ticket.departureCity}
          </div>
          <div className="text-xs text-center text-gray-600">
            {dateFormater(new Date(ticket.departureDate))}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center">Duration</div>
          <div className="text-sm text-center text-gray-600">
            {durationFormater(
              new Date(ticket.arivalDate),
              new Date(ticket.departureDate)
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center font-semibold truncate">
            {ticket.arrivalCity}
          </div>
          <div className="text-xs text-center text-gray-600">
            {dateFormater(new Date(ticket.arivalDate))}
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div>
            {user ? (
              <button
                onClick={() => handleBuyTicket(ticket.routeId, user.id)}
                className="bg-purple-500 shadow-lg rounded-md px-8 py-3 hover:bg-purple-700 text-lg font-semibold text-white"
              >
                <div>Buy for</div>
                <div>{ticket.price}</div>
              </button>
            ) : (
              <div className="text font-semibold text-gray-700 text-center">
                <div>Price</div>
                <div>{ticket.price}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
