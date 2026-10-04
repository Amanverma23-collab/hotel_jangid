import React from "react";

export type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode;
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "compact";
  icon?: React.ReactNode;
};

export const PearlButton: React.FC<PearlButtonProps> = ({
  label,
  children,
  className = "",
  size = "default",
  icon,
  ...props
}) => {
  const content = children || label || "Pearl Button";

  return (
    <>
      <style>{`
        .pearl-button {
          --white: #ffe7ff;
          --bg: #080808;
          --radius: 100px;
          outline: none;
          cursor: pointer;
          border: 0;
          position: relative;
          border-radius: var(--radius);
          background-color: var(--bg);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow:
            inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.3),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
            0 1.5rem 2.5rem rgba(0, 0, 0, 0.25),
            0 0.5rem 1rem -0.4rem rgba(0, 0, 0, 0.6);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .pearl-button .wrap {
          border-radius: inherit;
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Size variants */
        .pearl-button.pearl-size-default .wrap {
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.92);
          padding: 20px 36px;
        }

        .pearl-button.pearl-size-lg .wrap {
          font-size: 25px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          padding: 32px 45px;
        }

        .pearl-button.pearl-size-compact .wrap {
          font-size: 15px;
          font-weight: 700;
          color: #FFFFFF;
          padding: 14px 24px;
          letter-spacing: 0.01em;
        }

        .pearl-button.pearl-size-sm .wrap {
          font-size: 13px;
          font-weight: 600;
          color: #FFFFFF;
          padding: 10px 18px;
        }

        .pearl-button .wrap p span.pearl-star-hover {
          display: none;
        }
        .pearl-button:hover .wrap p span.pearl-star-idle {
          display: none;
        }
        .pearl-button:hover .wrap p span.pearl-star-hover {
          display: inline-block;
          color: #E2B774;
        }

        .pearl-button .wrap p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 0;
          transition: all 0.25s ease;
          transform: translateY(1%);
          -webkit-mask-image: linear-gradient(to bottom, white 75%, rgba(255, 255, 255, 0.85));
                  mask-image: linear-gradient(to bottom, white 75%, rgba(255, 255, 255, 0.85));
          text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        }

        .pearl-button .wrap::before,
        .pearl-button .wrap::after {
          content: "";
          position: absolute;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        /* Inner dome highlight */
        .pearl-button .wrap::before {
          left: -15%;
          right: -15%;
          bottom: 25%;
          top: -100%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.14);
        }

        /* Top 3D curved gloss highlight reflection */
        .pearl-button .wrap::after {
          left: 4%;
          right: 4%;
          top: 10%;
          bottom: 42%;
          border-radius: 20px 20px 0 0;
          box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.9);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .pearl-button:hover:not(:disabled) {
          box-shadow:
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.45),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.65),
            0 2rem 2.8rem rgba(0, 0, 0, 0.35),
            0 0.8rem 1.2rem -0.4rem rgba(0, 0, 0, 0.8);
          transform: translateY(-1px);
        }

        .pearl-button:hover:not(:disabled) .wrap::before {
          transform: translateY(-6%);
          background-color: rgba(255, 255, 255, 0.18);
        }

        .pearl-button:hover:not(:disabled) .wrap::after {
          opacity: 0.6;
          transform: translateY(3%);
        }

        .pearl-button:hover:not(:disabled) .wrap p {
          transform: translateY(-3%);
        }

        .pearl-button:active:not(:disabled) {
          transform: translateY(2px) scale(0.99);
          box-shadow:
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
            0 1rem 1.5rem rgba(0, 0, 0, 0.25),
            0 0.5rem 0.8rem -0.4rem rgba(0, 0, 0, 0.8);
        }

        .pearl-button.w-full {
          width: 100%;
          display: flex;
        }

        .pearl-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          filter: grayscale(0.2);
        }
      `}</style>

      <button className={`pearl-button pearl-size-${size} ${className}`} {...props}>
        <div className="wrap">
          <p>
            {icon !== undefined ? (
              icon
            ) : !children ? (
              <>
                <span className="pearl-star-idle">✧</span>
                <span className="pearl-star-hover">✦</span>
              </>
            ) : null}
            {content}
          </p>
        </div>
      </button>
    </>
  );
};
