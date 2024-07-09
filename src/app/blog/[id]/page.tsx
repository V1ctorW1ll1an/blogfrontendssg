import React from "react";
import fm from "front-matter";
import Head from "next/head";
import { marked } from "marked";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export async function generateStaticParams() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`
  ).then((res) => res.json());

  return result.data.map((r: any) => ({
    id: r.id.toString(),
  }));
}

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getData(id);

  return (
    <>
      <div className={styles.post}>
        <h1>{data.id}</h1>
        <p>{data.attributes.title}</p>
      </div>
    </>
  );
}
