import React from "react";
import parse from "html-react-parser";

const NewsDetails = (props) => {

  return (
    <div>
      <div className="container">
        <h4 className="my-3">{props.details[0]['title']}</h4>
        <hr className="" />
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <img className="w-100 mb-3" src={props.details[0]['img1']} />
            {parse(props.details[0]["long_des"])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
