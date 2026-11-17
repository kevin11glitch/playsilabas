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
          viewBox="0 0 860 160"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 60 120 Q 150 30, 245 55 T 430 120 T 615 55 T 800 120"
            stroke="#8FAF9F"
            strokeWidth="6"
            strokeDasharray="12 12"
            strokeLinecap="round"
          />
        </svg>

        {TOTAL_FASES.map((num) => (
          <FaseNode
            key={num}
            numero={num}
            status={obterStatus(num)}
            onSelecionar={onSelecionarFase}
          />
        ))}
      </div>

      {/* Imagem do Mascote clicável */}
      <img
        className="group"
        alt="Mascote"
        src={mascoteMapa}
        onClick={() => tocarAudio("02_selecao_fase")}
        style={{ cursor: "pointer" }}
      />

      {/* Balão de Fala Componentizado */}
      <BalaoMascote
        texto="SÓ 5 FASES. NO SEU TEMPO!"
        audioArquivo="02_selecao_fase"
        className="posicao-balao-mapa"
      />
    </div>
  );
}