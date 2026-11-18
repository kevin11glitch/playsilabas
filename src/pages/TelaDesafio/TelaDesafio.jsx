import { useState } from "react";
import mascote from "../../assets/mapa/mascoteMapa.png";
import imagemSapo from "../../assets/mapa/sapoDesafio.png";
import iconeAltoFalante from "../../assets/mapa/speaker.svg";
import { BalaoMascote } from "../../components/BalaoMascote/BalaoMascote";
import { BlocoSilaba } from "../../components/BlocoSilaba/BlocoSilaba";
import { tocarAudio } from "../../utils/audioPlayer";
import "./TelaDesafio.css";

const OPCOES_SAPO = [
  { silaba: "PO", audio: "07_silaba_po" },
  { silaba: "LA", audio: "09_silaba_la" },
  { silaba: "CO", audio: "08_silaba_co" },
];

export default function TelaDesafio({ onVoltarMapa, onConcluirFase }) {
  const [silabaSelecionada, setSilabaSelecionada] = useState(null);
  const [silabaEncaixada, setSilabaEncaixada] = useState(null);
  const [silabaErrada, setSilabaErrada] = useState(null);
  const [falaMascote, setFalaMascote] = useState({
    texto: "SA... QUAL SOM TERMINA A PALAVRA?",
    audio: "11_dica_wireframe_sapo",
    variante: "padrao",
  });

  const verificarResposta = (silabaParaTestar) => {
    if (silabaEncaixada || !silabaParaTestar) return;

    if (silabaParaTestar === "PO") {
      setSilabaEncaixada("PO");
      setSilabaSelecionada(null);
      setFalaMascote({
        texto: "MUITO BEM! SA-PO... SAPO!",
        audio: "18_acerto_sapo",
        variante: "sucesso",
      });
      setTimeout(() => {
        tocarAudio("18_acerto_sapo");
      }, 450);
    } else {
      setSilabaErrada(silabaParaTestar);
      setSilabaSelecionada(null);
      setFalaMascote({
        texto: "QUASE LÁ! VAMOS OUVIR O SOM DO COMECINHO DE NOVO?",
        audio: "16_erro_generico",
        variante: "dica",
      });
      setTimeout(() => {
        setSilabaErrada(null);
        tocarAudio("16_erro_generico");
      }, 500);
    }
  };

  // Quando clica na caixa tracejada (?)
  const handleClicarCaixaDestino = () => {
    if (silabaSelecionada) {
      verificarResposta(silabaSelecionada);
    } else if (!silabaEncaixada) {
      // Se clicar na caixa vazia sem ter escolhido um bloco antes, dá a dica sonora
      tocarAudio("11_dica_wireframe_sapo");
    }
  };

  // Quando arrasta e solta na caixa tracejada (?)
  const handleDrop = (e) => {
    e.preventDefault();
    const silabaArrastada = e.dataTransfer.getData("text/plain");
    if (silabaArrastada) {
      verificarResposta(silabaArrastada);
    }
  };

  return (
    <div className="element-DESAFIO-SAPO">
      <button
        type="button"
        className="VOLTAR-AO-INCIO"
        onClick={onVoltarMapa}
        style={{ border: "none", cursor: "pointer" }}
      >
        <div className="IN-CIO">‹  MAPA</div>
      </button>

      <div className="frame-6">
        <p className="p">FASE 2 · OS SONS</p>
      </div>

      {/* Card da Ilustração + Ouvir Palavra */}
      <div className="frame">
        <img className="group" alt="Ilustração Sapo" src={imagemSapo} />
        <button
          type="button"
          className="OUVIR-PALAVRA"
          onClick={() => tocarAudio("05_palavra_sapo")}
          style={{ border: "none", cursor: "pointer" }}
        >
          <img className="ALTO-FALANTE" alt="" src={iconeAltoFalante} />
          <div className="text-wrapper">OUVIR PALAVRA</div>
        </button>
      </div>

      <div className="div-wrapper">
        <div className="div">COMPLETE A PALAVRA</div>
      </div>

      {/* Sílaba Inicial Fixa (SA) */}
      <div className="SLABA-INICIAL-SA-wrapper">
        <BlocoSilaba silaba="SA" audioArquivo="06_silaba_sa" variante="fixa" />
      </div>

      {/* Espaço de Destino (Aceita clique após selecionar OU Drop) */}
      <div
        className={`ESPAO-DA-SLABA-FINAL ${
          silabaSelecionada && !silabaEncaixada ? "pronta-para-encaixe" : ""
        }`}
        onClick={handleClicarCaixaDestino}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ cursor: silabaEncaixada ? "default" : "pointer" }}
      >
        {silabaEncaixada ? (
          <BlocoSilaba
            silaba={silabaEncaixada}
            audioArquivo="07_silaba_po"
            variante="encaixada"
          />
        ) : (
          <div className="text-wrapper-3">?</div>
        )}
      </div>

      <div className="text-wrapper-4">
        {silabaSelecionada
          ? `TOQUE NO "?" PARA ENCAIXAR "${silabaSelecionada}"`
          : "TOQUE OU ARRASTE"}
      </div>

      {/* Bandeja de Sílabas */}
      <div className="bandeja-de-slabas">
        {OPCOES_SAPO.map((item) => (
          <BlocoSilaba
            key={item.silaba}
            silaba={item.silaba}
            audioArquivo={item.audio}
            variante="opcao"
            selecionado={silabaSelecionada === item.silaba}
            errado={silabaErrada === item.silaba}
            aoSelecionar={(silaba) => setSilabaSelecionada(silaba)}
          />
        ))}
      </div>

      <img
        className="group-2"
        alt="Mascote"
        src={mascote}
        onClick={() => tocarAudio(falaMascote.audio)}
        style={{ cursor: "pointer" }}
      />

      <BalaoMascote
        texto={falaMascote.texto}
        audioArquivo={falaMascote.audio}
        variante={falaMascote.variante}
        className="posicao-balao-desafio"
      />

      {silabaEncaixada && (
        <button
          type="button"
          className="botao-avancar-fase"
          onClick={onConcluirFase}
        >
          PRÓXIMA FASE ›
        </button>
      )}
    </div>
  );
}