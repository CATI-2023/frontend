import "./style.css";
import { useNavigate } from "react-router-dom";

export function ButtonInscrevaSe() {
  const navigate = useNavigate();

  return (
    <>
      {/* <a href="https://eva.faespe.org.br/xivcati/"> */}
      {/* <a href="#"> */}
      <button
        className="button-subscribe-second-section"
        onClick={() => {
          navigate("/login");
        }}
      >
        INSCREVA-SE AGORA
      </button>
      {/* </a> */}
    </>
  );
}
