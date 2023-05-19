"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LocalTicket } from "@interfaces/Tickets";
import Ticket from "./TicketBlock";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import dateComparer from "@utils/dateComparer";

interface dropDownProps {
  values?: string[];
  selected?: string;
  show?: boolean;
}

interface citiesInterface {
  data: {
    dep: string[];
    arr: string[];
  };
}

function page() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState<LocalTicket[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [cityFrom, setCityFrom] = useState();
  const [cityTo, setCityTo] = useState();

  const handleSearch = () => {
    fetchTicketsByCity();
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  const fetchUser = async () => {
    await axios
      .get("/api/users" + "?email=" + session?.user?.email)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBuyTicket = async (routeId: number, userId: number) => {
    await axios
      .post(
        "/api/tickets",
        {
          routeId,
          userId,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        alert(res.statusText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTickets = async () => {
    await axios
      .get("/api/tickets/all")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchTicketsByCity = async () => {
    await axios
      .get("/api/tickets?from=" + cityFrom + "&to=" + cityTo)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-stone-50 flex shadow-lg justify-evenly py-6 px-8 border-b">
        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-grey-700  border   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  "
            type="button"
          >
            From
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          ></div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <button
              onClick={handleSearch}
              className="bg-blue-500 py-2 px-4  font-semibold text-white shadow-md rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-grey-700  border   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  "
            type="button"
          >
            To
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className=" flex flex-col w-full min-h-screen ">
        {tickets ? (
          <div className="px-6 py-4">
            {tickets.map((ticket, index) => {
              return (
                <Ticket
                  ticket={ticket}
                  user={user}
                  key={index}
                  handleBuyTicket={handleBuyTicket}
                />
              );
            })}
          </div>
        ) : (
          <div>No tickets found</div>
        )}
      </div>
    </div>
  );
}

export default page;
