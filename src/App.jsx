import { useState } from "react";
import { DADOS_FASES } from "./data/fases";
import MapaFases from "./pages/MapaFases/MapaFases";
import TelaDesafio from "./pages/TelaDesafio/TelaDesafio";
import TelaInicial from "./pages/TelaInicial/TelaInicial";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("inicial");
  const [faseDesbloqueada, setFaseDesbloqueada] = useState(2); 
  const [faseSelecionada, setFaseSelecionada] = useState(2);

  const handleSelecionarFase = (numeroFase) => {
    if (numeroFase > faseDesbloqueada) return;

    setFaseSelecionada(numeroFase);
    setTelaAtual("desafio");
  };

  const handleConcluirFase = () => {
    setFaseDesbloqueada((prev) => Math.max(prev, faseSelecionada + 1));
    setTelaAtual("mapa");
  };

  return (
    <>
      {telaAtual === "inicial" && (
        <TelaInicial onIniciarJogo={() => setTelaAtual("mapa")} />
      )}

      {telaAtual === "mapa" && (
        <MapaFases
          faseDesbloqueada={faseDesbloqueada}
          onVoltarInicio={() => setTelaAtual("inicial")}
          onSelecionarFase={handleSelecionarFase}
        />
      )}

      {telaAtual === "desafio" && (
        <TelaDesafio
          key={faseSelecionada} 
          dadosFase={DADOS_FASES[faseSelecionada] || DADOS_FASES[2]}
          onVoltarMapa={() => setTelaAtual("mapa")}
          onConcluirFase={handleConcluirFase}
        />
      )}
    </>
  );
}