/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const id = Math.floor(Math.random() * 500);
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    revalidate: 2,
  };
}

export default function Details({ pokemon, id }) {
  return (
    <div className="min-h-screen w-full bg-yellow-400 p-4">
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div className="py-4 mb-2 w-full rounded-xl">
        <Link
          href="/"
          className="font-bold border-2 border-black text-black rounded-xl p-4"
        >
          Back to Home
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border-2 border-black space-y-6 w-full">
          <img
            className="max-h-[400px] p-4"
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
          <div className="border-t-2 border-black p-4">
            <div className="font-bold text-4xl mb-2">{pokemon.name}</div>
            <div className="mb-2 font-semibold italic">
              {pokemon.type.join(", ")}
            </div>
          </div>
        </div>
        <div>
          <table className="h-full bg-white w-full text-black table-fixed border-2 border-black">
            <thead className="text-left font-bold">
              <tr className="border-black border">
                <th className="border-r border-black p-2 py-6">Name</th>
                <th className="p-2 py-6">Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr
                  key={name}
                  className="border-black border-b border-x last:rounded-xl"
                >
                  <td className=" p-2 border-r border-black font-bold">
                    {name}
                  </td>
                  <td className=" p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
