import iconePlay from "../../assets/inicio/seta.png";
import mascote from "../../assets/inicio/mascote.png";
import { tocarAudio } from "../../utils/audioPlayer";
import "./TelaInicial.css";

export default function TelaInicial({ onIniciarJogo }) {
  const handleJogar = () => {
    tocarAudio("01_boas_vindas");
    // Aguarda um instante ou já navega para o mapa de fases:
    if (onIniciarJogo) onIniciarJogo();
  };

  return (
    <div className="element-INCIO-playslabas">
      <div className="logo-playsilabas">
        <div className="group">
          <div className="smbolo-de-formas">
            <div className="ellipse" />
            <div className="quadrado" />
          </div>
        </div>
        <div className="frame">
          <div className="marca">PLAYSÍLABAS</div>
        </div>
      </div>

      <div className="fundo-mascote">
        <div className="div" />
      </div>

      <img
        className="mascote"
        alt="Mascote Kiko"
        src={mascote}
        onClick={() => tocarAudio("01_boas_vindas")}
        style={{ cursor: "pointer" }}
      />

      <div className="titulo-pag-inicial">
        <div className="t-tulo-do-jogo">PLAYSÍLABAS</div>
      </div>

      <div className="desc-pag-inicial">
        <div className="convite">
          VAMOS BRINCAR
          <br />
          COM OS SONS?
        </div>
      </div>

      <button
        type="button"
        className="botao-jogar"
        onClick={handleJogar}
        style={{ border: "none", cursor: "pointer" }}
      >
        <div className="text-wrapper">JOGAR</div>
        <img className="image" alt="Ícone de iniciar" src={iconePlay} />
      </button>

      <div className="lema-wrapper">
        <div className="lema">BRINCAR. OUVIR. DESCOBRIR.</div>
      </div>
    </div>
  );
}