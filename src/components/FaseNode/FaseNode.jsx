import cadeado from "../../assets/mapa/cadeado.svg";
import "./FaseNode.css";

export function FaseNode({ numero, status, onSelecionar }) {
  const clicavel = status === "concluida" || status === "ativa";

  const rotulos = {
    concluida: "FEITA!",
    ativa: "FASE LIBERADA!",
    bloqueada: `FASE ${numero}`,
  };

  return (
    <div className={`fase-node-wrapper fase-pos-${numero}`}>
      <button
        type="button"
        className={`fase-circulo ${status}`}
        disabled={!clicavel}
        onClick={() => clicavel && onSelecionar(numero)}
      >
        <span className="fase-numero">{numero}</span>

        {status === "bloqueada" && (
          <img className="lock" alt="Fase bloqueada" src={cadeado} />
        )}

        {status === "ativa" && <span className="fase-badge-jogar">JOGAR</span>}
      </button>

      <span className="fase-legenda">{rotulos[status]}</span>
    </div>
  );
}