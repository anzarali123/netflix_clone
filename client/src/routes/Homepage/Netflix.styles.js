import styled from "styled-components";

export const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
        @media screen and (max-width: 1000px) {
          img {
            width: 70%;
          }
        }
        @media screen and (max-width: 642px) {
          img {
            width: 60%;
            margin-left: 3rem;
          }
        }
        @media screen and (max-width: 450px) {
          img {
            width: 300px;
            margin-left: 2rem;
          }
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
        @media screen and (max-width: 642px) {
          margin: 2rem;
          gap: 1rem;

          button {
            font-size: 1rem;
            padding-left: 1.5rem;
            padding-right: 2rem;
          }
        }
      }
    }
  }
`;
