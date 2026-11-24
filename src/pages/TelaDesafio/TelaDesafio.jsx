import { useState } from "react";
import mascote from "../../assets/mapa/mascoteMapa.png";
import iconeAltoFalante from "../../assets/mapa/speaker.svg";
import { BalaoMascote } from "../../components/BalaoMascote/BalaoMascote";
import { BlocoSilaba } from "../../components/BlocoSilaba/BlocoSilaba";
import { tocarAudio, tocarSequenciaAudios } from "../../utils/audioPlayer";
import "./TelaDesafio.css";

export default function TelaDesafio({ dadosFase, onVoltarMapa, onConcluirFase }) {
  const [silabaSelecionada, setSilabaSelecionada] = useState(null);
  const [silabasEncaixadas, setSilabasEncaixadas] = useState({});
  const [silabaErrada, setSilabaErrada] = useState(null);
  const [falaMascote, setFalaMascote] = useState({
    texto: dadosFase.falaInicial,
    audio: dadosFase.audioInicial,
    variante: "padrao",
  });

  const audioErroAtual = dadosFase.audioErro || "35_erro_generico";
  const falaErroAtual = dadosFase.falaErro || "QUASE LÁ! VAMOS OUVIR O SOM DO COMECINHO DE NOVO?";

  const listaLacunas = dadosFase.lacunas || [
    {
      posicao: dadosFase.posicaoLacuna ?? dadosFase.silabasFixas.length,
      silabaCorreta: dadosFase.silabaCorreta,
    },
  ];

  const faseConcluida = listaLacunas.every(
    (lacuna) => silabasEncaixadas[lacuna.posicao] === lacuna.silabaCorreta
  );

  const verificarResposta = (silabaParaTestar, posicaoAlvo) => {
    if (faseConcluida || !silabaParaTestar || silabasEncaixadas[posicaoAlvo]) return;

    const lacunaConfig = listaLacunas.find((l) => l.posicao === posicaoAlvo);
    if (!lacunaConfig) return;

    if (silabaParaTestar === lacunaConfig.silabaCorreta) {
      const novasEncaixadas = {
        ...silabasEncaixadas,
        [posicaoAlvo]: silabaParaTestar,
      };
      setSilabasEncaixadas(novasEncaixadas);
      setSilabaSelecionada(null);

      // Verifica se todas as lacunas da palavra já foram preenchidas
      const completouTudo = listaLacunas.every(
        (l) => novasEncaixadas[l.posicao] === l.silabaCorreta
      );

      if (completouTudo) {
        setFalaMascote({
          texto: dadosFase.falaAcerto,
          audio: dadosFase.audioAcerto,
          variante: "sucesso",
        });
        setTimeout(() => {
          tocarAudio(dadosFase.audioAcerto);
        }, 450);
      } else {
        setFalaMascote({
          texto: "ISSO MESMO! AGORA COMPLETE O OUTRO ESPAÇO!",
          audio: dadosFase.audioInicial,
          variante: "sucesso",
        });
      }
    } else {
      setSilabaErrada(silabaParaTestar);
      setSilabaSelecionada(null);
      setFalaMascote({
        texto: falaErroAtual,
        audio: audioErroAtual,
        variante: "dica",
      });
      setTimeout(() => {
        setSilabaErrada(null);
        tocarAudio(audioErroAtual);
      }, 500);
    }

  };

  const handleClicarCaixaDestino = (posicaoAlvo) => {
    if (silabaSelecionada) {
      verificarResposta(silabaSelecionada, posicaoAlvo);
    } else if (!silabasEncaixadas[posicaoAlvo]) {
      tocarAudio(dadosFase.audioInicial);
    }
  };

  const handleDrop = (e, posicaoAlvo) => {
    e.preventDefault();
    const silabaArrastada = e.dataTransfer.getData("text/plain");
    if (silabaArrastada) {
      verificarResposta(silabaArrastada, posicaoAlvo);
    }
  };

  // Monta a sequência intercalando sílabas fixas e lacunas nas posições exatas
  const totalSlots = dadosFase.silabasFixas.length + listaLacunas.length;
  const itensLinhaMontagem = [];
  let indiceFixa = 0;

  for (let pos = 0; pos < totalSlots; pos++) {
    const lacuna = listaLacunas.find((l) => l.posicao === pos);
    if (lacuna) {
      itensLinhaMontagem.push({ tipo: "lacuna", ...lacuna });
    } else {
      itensLinhaMontagem.push({
        tipo: "fixa",
        ...dadosFase.silabasFixas[indiceFixa],
      });
      indiceFixa++;
    }
  }

  const handleBotaoAvancar = () => {
    if (dadosFase.numero === 5) {
      tocarSequenciaAudios(["37_conclusao_trilha", "38_stopping"]);
    }
    onConcluirFase();
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
        <p className="p">{dadosFase.titulo}</p>
      </div>

      <div className="frame">
        <img
          className="group"
          alt={dadosFase.palavraCompleta}
          src={dadosFase.imagem}
        />
        <button
          type="button"
          className="OUVIR-PALAVRA"
          onClick={() => tocarAudio(dadosFase.audioPalavra)}
          style={{ border: "none", cursor: "pointer" }}
        >
          <img className="ALTO-FALANTE" alt="" src={iconeAltoFalante} />
          <div className="text-wrapper">OUVIR PALAVRA</div>
        </button>
      </div>

      <div className="div-wrapper">
        <div className="div">COMPLETE A PALAVRA</div>
      </div>

      <div
        className={`linha-montagem-palavra ${totalSlots === 4 ? "quatro-silabas" : ""
          }`}
      >
        {itensLinhaMontagem.map((item, index) => {
          if (item.tipo === "lacuna") {
            const silabaJaPreenchida = silabasEncaixadas[item.posicao];
            const opcaoObj = dadosFase.opcoes.find(
              (op) => op.silaba === silabaJaPreenchida
            );

            return (
              <div
                key={`lacuna-${item.posicao}`}
                className={`ESPAO-DA-SLABA-FINAL ${silabaSelecionada && !silabaJaPreenchida
                  ? "pronta-para-encaixe"
                  : ""
                  }`}
                onClick={() => handleClicarCaixaDestino(item.posicao)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, item.posicao)}
                style={{ cursor: silabaJaPreenchida ? "default" : "pointer" }}
              >
                {silabaJaPreenchida ? (
                  <BlocoSilaba
                    silaba={silabaJaPreenchida}
                    audioArquivo={opcaoObj?.audio}
                    variante="encaixada"
                  />
                ) : (
                  <div className="text-wrapper-3">?</div>
                )}
              </div>
            );
          }

          return (
            <BlocoSilaba
              key={`${item.silaba}-${index}`}
              silaba={item.silaba}
              audioArquivo={item.audio}
              variante="fixa"
            />
          );
        })}
      </div>

      <div className="text-wrapper-4">
        {silabaSelecionada
          ? `TOQUE NO "?" PARA ENCAIXAR "${silabaSelecionada}"`
          : "TOQUE OU ARRASTE"}
      </div>

      <div className="bandeja-de-slabas">
        {dadosFase.opcoes.map((item) => {
          const jaUsada = Object.values(silabasEncaixadas).includes(item.silaba);
          return (
            <BlocoSilaba
              key={item.silaba}
              silaba={item.silaba}
              audioArquivo={item.audio}
              variante="opcao"
              selecionado={silabaSelecionada === item.silaba}
              errado={silabaErrada === item.silaba}
              aoSelecionar={(silaba) => {
                if (!jaUsada) setSilabaSelecionada(silaba);
              }}
            />
          );
        })}
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
      {faseConcluida && (
        <button
          type="button"
          className="botao-avancar-fase"
          onClick={handleBotaoAvancar}
        >
          {dadosFase.numero === 5 ? "CONCLUIR TRILHA ›" : "PRÓXIMA FASE ›"}
        </button>
      )}



    </div>
  );
}