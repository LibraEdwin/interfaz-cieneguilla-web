import React from 'react';

const HeaderButtonBars = props => {
  const {
    ...rest
  } = props;

  return (
    <>
      <button className="button-bars" {...rest}>
        <svg>
          <rect />
          <rect y="10" />
          <rect y="20" />
        </svg>
      </button>

      <style jsx>{`
        .button-bars {
          background: transparent;
          border: none;
          appearance: none;
          cursor: pointer;
          position: absolute;
          left: 1rem;
          padding: 0;
          font-size: 0;
        }

        .button-bars svg {
          fill: var(--main-color);
          width: 40px;
          height: 25px;
        }

        .button-bars svg rect {
          width: 40px;
          height: 5px;
        }

        @media screen and (min-width: 768px) {
          .button-bars {
            display: none;
          }
        }

        @media print {
          .button-bars {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderButtonBars;
