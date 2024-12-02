import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";
const View = async ({ id }: { id: string }) => {
  const data = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_BY_ID_QUERY, { id });
    console.log('Data: ', data);
  
  const totalViews : number = data?.views || 0;

  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className="view-container">
      <div className="absolute -right-2 -top-2">
        <Ping />
      </div>
      <span className="view-text">
        <span className="font-bold">{totalViews} views</span>
      </span>
    </div>
  );
};

export default View;
