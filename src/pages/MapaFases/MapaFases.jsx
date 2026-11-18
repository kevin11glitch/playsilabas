import mascoteMapa from "../../assets/mapa/mascoteMapa.png"; // ou group-3.png, conforme o nome que você salvou
import { BalaoMascote } from "../../components/BalaoMascote/BalaoMascote";
import { FaseNode } from "../../components/FaseNode/FaseNode";
import { tocarAudio } from "../../utils/audioPlayer";
import "./MapaFases.css";

const TOTAL_FASES = [1, 2, 3, 4, 5];

export function MapaFases({
  faseDesbloqueada = 2,
  onVoltarInicio,
  onSelecionarFase,
}) {
  const obterStatus = (numero) => {
    if (numero < faseDesbloqueada) return "concluida";
    if (numero === faseDesbloqueada) return "ativa";
    return "bloqueada";
  };

  return (
    <div className="element-MAPA-FASES">
      <button
        type="button"
        className="VOLTAR-AO-INCIO"
        onClick={onVoltarInicio}
        style={{ border: "none", cursor: "pointer" }}
      >
        <div className="IN-CIO">‹  INÍCIO</div>
      </button>

      <div className="frame">
        <div className="text-wrapper">NOSSA TRILHA</div>
      </div>

      <div className="div-wrapper">
        <div className="div">5 FASES PARA EXPLORAR</div>
      </div>

      {/* Campo da trilha componentizado */}
      <div className="campo-da-trilha-flex">
        <svg
          className="linha-trilha-svg"
          viewBox="0 0 832 160"
          fill="none"
        >
          <path
            d="M 52 125 L 234 55 L 416 125 L 598 55 L 780 125"
            stroke="#8FAF9F"
            strokeWidth="9"
            strokeDasharray="1 18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {TOTAL_FASES.map((num) => (
          <FaseNode
            key={num}
            numero={num}
            status={obterStatus(num)}
            onSelecionar={(numeroFase) => {
              tocarAudio("04_instrucao_geral");
              onSelecionarFase(numeroFase);
            }}
          />
        ))}
      </div>

      <img
        className="group"
        alt="Mascote"
        src={mascoteMapa}
        onClick={() => tocarAudio("02_selecao_fase")}
        style={{ cursor: "pointer" }}
      />


      <BalaoMascote
        texto="TOQUE NO NUMERO PARA ESCOLHER O SEU DESAFIO!"
        audioArquivo="02_selecao_fase"
        className="posicao-balao-mapa"
      />
    </div>
  );
}