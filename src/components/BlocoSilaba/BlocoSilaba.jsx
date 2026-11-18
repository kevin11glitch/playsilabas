import iconeAltoFalante from "../../assets/mapa/speaker.svg";
import { tocarAudio } from "../../utils/audioPlayer";
import "./BlocoSilaba.css";

export function BlocoSilaba({
  silaba,
  audioArquivo,
  variante = "opcao", // "fixa" | "opcao" | "encaixada"
  selecionado = false,
  errado = false,
  aoSelecionar,
}) {
  const handleClique = () => {
    if (audioArquivo) {
      tocarAudio(audioArquivo);
    }

    if (variante === "opcao" && aoSelecionar) {
      aoSelecionar(silaba);
    }
  };

  const handleDragStart = (e) => {
    if (variante !== "opcao") return;
    if (audioArquivo) tocarAudio(audioArquivo);
    if (aoSelecionar) aoSelecionar(silaba);
    e.dataTransfer.setData("text/plain", silaba);
  };

  return (
    <button
      type="button"
      className={`bloco-silaba ${variante} ${selecionado ? "selecionado" : ""} ${
        errado ? "animacao-erro" : ""
      }`}
      onClick={handleClique}
      draggable={variante === "opcao"}
      onDragStart={handleDragStart}
      aria-label={`Sílaba ${silaba}`}
    >
      <span className="bloco-silaba-texto">{silaba}</span>
      <img className="bloco-silaba-icone" alt="" src={iconeAltoFalante} />
    </button>
  );
}