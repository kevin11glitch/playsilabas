import { useState } from "react";
import { TelaInicial } from "./pages/TelaInicial/TelaInicial";
import { MapaFases } from "./pages/MapaFases/MapaFases";

export function App() {
  const [telaAtual, setTelaAtual] = useState("inicio");
  const [faseSelecionada, setFaseSelecionada] = useState(2);

  const abrirDesafio = (numeroFase) => {
    setFaseSelecionada(numeroFase);
    setTelaAtual("desafio");
  };

  return (
    <main>
      {telaAtual === "inicio" && (
        <TelaInicial onIniciarJogo={() => setTelaAtual("mapa")} />
      )}

      {telaAtual === "mapa" && (
        <MapaFases
          onVoltarInicio={() => setTelaAtual("inicio")}
          onSelecionarFase={abrirDesafio}
        />
      )}

      {telaAtual === "desafio" && (
        <div>
          {/* Aqui entrará a TelaDesafio (Fase {faseSelecionada}) */}
          <button onClick={() => setTelaAtual("mapa")}>Voltar ao Mapa</button>
        </div>
      )}
    </main>
  );
}

export default App;