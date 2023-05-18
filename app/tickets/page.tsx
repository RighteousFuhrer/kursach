"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LocalTicket } from "@interfaces/Tickets";
import Ticket from "./TicketBlock";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import dateComparer from "@utils/dateComparer";

function page() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState<LocalTicket[]>([]);
  const [from, setFrom] = useState<string[]>([]);
  const [to, setTo] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [destinationCities, setDestinationCities] = useState("");
  const [arrivalCities, setArrivalCities] = useState("");

  const handleSwitch = () => {
    let temp = destinationCities;
    setDestinationCities(arrivalCities);
    setArrivalCities(temp);
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

  const fetchCities = async () => {
    await axios
      .get("/api/citiesData")
      .then((response) => {
        setFrom(response.data.dep);
        setTo(response.data.arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTickets();
    fetchCities();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-stone-50 flex shadow-lg justify-evenly py-6 px-8 border-b">
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            From
          </label>
          <select
            onChange={(e) => setArrivalCities(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:placeholder-gray-400 "
            value={arrivalCities}
          >
            {from.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <button
              onClick={handleSwitch}
              className="bg-blue-500 py-2 px-4  font-semibold text-white shadow-md rounded-lg hover:bg-blue-700"
            >
              Switch
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            To
          </label>
          <select
            onChange={(e) => setDestinationCities(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:placeholder-gray-400 "
          >
            {to.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
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
