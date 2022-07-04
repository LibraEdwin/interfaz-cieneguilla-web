import React from 'react'

export default function Loader ({ text, isLoading }) {
  return (
    <>
    {isLoading && (
      <div className="login__send">
        <div className="login__loading"></div>
        <p>{text}</p>
      </div>
    )}
    <style jsx>{`
      .login__loading {
        width: 100%;
        height: 5px;
        background: linear-gradient(90deg, rgba(242,185,6,1) 0%, rgba(6,147,221,1) 35%, rgba(0,212,255,1) 100%);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        animation: animationSlide 2s linear infinite;
      }

      .login__send {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .login__send p {
        color: black;
        font-weight: 600;
        text-align: center;
      }

      @keyframes animationSlide {
        0%, 100% {
        transform: translateX(-100%);
        }

        25%, 75% {
          transform: translateX(0);
        }

        50% {
          transform: translateX(100%);
        }
      }
    `}</style>
    </>
  )
}
