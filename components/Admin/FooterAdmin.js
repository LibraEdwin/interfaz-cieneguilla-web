import React from 'react'
import Button from '../common/Button'

export default function FooterAdmin ({ buttons, data }) {
  return (
    <>
      <footer className="footer not-print">
        {buttons?.map((button) => {
          return (
            <div key={button.label}>
              <Button
                label={button.label}
                variant={button.variant}
                width={button.width}
                onClick={button.handleOnClick}
                disabled={button.disabled}
              />
            </div>
          )
        })}

      </footer>
      <style jsx>{`
        .footer {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          height: 100px;
          padding: 0px 12rem;
          justify-content: flex-end;

          position: fixed;
          width: 100%;
          bottom: 0;
        }
        
        @media print{
          .not-print{
            display: none
          }
        }
      `}</style>
    </>
  )
}
