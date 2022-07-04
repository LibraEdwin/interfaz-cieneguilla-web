import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const BackButtonTerms = (props) => {
  const { title, onClick } = props;

  return (
    <>
      <div className="container__back--btn" onClick={onClick}>
        <div>
          <img src="/images/back.svg" width="12px" height="20px" alt="back" />
          <span className="title__back--btn">{title}</span>
        </div>
      </div>

      <style jsx>{
        /*css*/ `
          .container__back--btn {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 1rem;
          }

          .title__back--btn {
            font-size: 18px;
            font-weight: 700;
            padding-left: 1rem;
            color: var(--fourth-color);
            text-transform: uppercase;
          }
        `
      }</style>
    </>
  );
};

BackButtonTerms.propTypes = {
  title: PropTypes.string
  // onClick: PropTypes.string.isRequired,
};

export default BackButtonTerms;
