
const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="custom-loader"></div>
      <style jsx>{`
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .custom-loader {
          width: 50px;
          height: 50px;
          display: grid;
          border-radius: 50%;
          -webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
          background: linear-gradient(0deg, #1C43F480 50%, #1C43F4FF 0) center/4px 100%,
            linear-gradient(90deg, #1C43F440 50%, #1C43F4BF 0) center/100% 4px;
          background-repeat: no-repeat;
          animation: s3 1s infinite steps(12);
        }
        .custom-loader::before,
        .custom-loader::after {
          content: '';
          grid-area: 1/1;
          border-radius: 50%;
          background: inherit;
          opacity: 0.915;
          transform: rotate(30deg);
        }
        .custom-loader::after {
          opacity: 0.83;
          transform: rotate(60deg);
        }
        @keyframes s3 {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
