import iconeAudio from "../../assets/mapa/speaker.svg";
import { tocarAudio } from "../../utils/audioPlayer";
import "./BalaoMascote.css";

export function BalaoMascote({
  texto,
  audioArquivo,
  variante = "padrao",
  className = "",
}) {
  const handleOuvir = () => {
    if (audioArquivo) {
      tocarAudio(audioArquivo);
    }
  };

  return (
    <button
      type="button"
      className={`balao-mascote-btn ${variante} ${className}`}
      onClick={handleOuvir}
      aria-label={`Ouvir fala do mascote: ${texto}`}
    >
      <img
        className="balao-mascote-icone"
        alt=""
        src={iconeAudio}
      />
      <p className="balao-mascote-texto">{texto}</p>
    </button>
  );
}