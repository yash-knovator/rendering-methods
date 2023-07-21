/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(pokemon);

  const getPokemon = async () => {
    try {
      const resp = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      setPokemon(await resp.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-yellow-400">
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2 className="py-4 text-4xl font-bold text-white">Pokemon List</h2>
      <div className="w-full grid grid-cols-4 gap-4">
        {loading ? (
          <h2 className="text-white text-2xl">Loading....</h2>
        ) : (
          pokemon.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <div className="w-full h-full border-2 border-white bg-white rounded-xl hover:border-red-600">
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                  className="flex justify-center items-center w-full h-full max-h-[300px] p-4"
                />
                <h3 className="w-full border-t-2 border-yellow-400 p-3">
                  {pokemon.name}
                </h3>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
