import PlainLayout from "@/components/master/Plain-Layout";
import NewsDetails from "@/components/news/NewsDetails";
import PopularList from "@/components/news/PopularList";
import React from "react";

async function getData(id) {
  let Details = await (
    await (await fetch(`${process.env.HOST}/api/news/details?id=${id} `)).json()
  )["data"];

  let Popular = await (
    await (
      await fetch(`${process.env.HOST}/api/news/type?type=Popular `)
    ).json()
  )["data"];

  return {
    Details: Details,
    Popular: Popular,
  };
}

const Page = async (props) => {
  let id = props.searchParams["id"];
  const data = await getData(id);
  return (
    <PlainLayout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-9 col-lg-9 col-sm-12 col-12 px-3">
            <div className="card">
              <NewsDetails details={data["Details"]} />
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
            <PopularList popular={data["Popular"]} />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default Page;
