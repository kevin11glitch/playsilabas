import { useState } from "react";
import TelaInicial from "./pages/TelaInicial/TelaInicial";
import { MapaFases } from "./pages/MapaFases/MapaFases.jsx";
import TelaDesafio from "./pages/TelaDesafio/TelaDesafio.jsx";
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
          <TelaDesafio 
            onVoltarMapa={()=> setTelaAtual("mapa")}
          />
        </div>
        
      )}
    </main>
  );
}

export default App;