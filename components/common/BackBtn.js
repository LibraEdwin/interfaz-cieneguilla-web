import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const BackButton = (props) => {
  const { title, to } = props;

  return (
    <>
      <div className="container__back--btn">
        <Link href={to}>
          <img src="/images/back.svg" width="12px" height="20px" alt="back" />
        </Link>
        <Link href={to}>
          <span className="title__back--btn">{title}</span>
        </Link>
        {/* <span className="title__back--btn">{title}</span> */}
      </div>

      <style jsx>{
        /*css*/ `
          .container__back--btn {
            display: flex;
            align-items: center;
            // padding: 1rem 1.5rem;
            cursor: pointer;
          }

          .title__back--btn {
            font-size: 18px;
            font-weight: 700;
            padding-left: 1rem;
            color: var(--fourth-color);
            text-transform: uppercase;
          }

          @media screen and (min-width: 768px) {
            .container__back--btn {
              // padding: 1.5rem 2.5rem;
            }
          }

          @media screen and (min-width: 992px) {
            .container__back--btn {
              padding: 2rem 3rem;
            }
          }

          @media screen and (min-width: 1200px) {
            .container__back--btn {
              padding: 2rem 4rem;
            }
          }

          @media screen and (min-width: 1400px) {
            .container__back--btn {
              padding: 2rem 2rem;
            }
          }
        `
      }</style>
    </>
  );
};

BackButton.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default BackButton;
