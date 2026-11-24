let audioAtual = null;

export function tocarAudio(nomeArquivo, aoTerminar = null) {
  if (!nomeArquivo) return;

  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
  }

  const audio = new Audio(`/audios/${nomeArquivo}.mp3`);
  audioAtual = audio;

  if (aoTerminar) {
    audio.onended = aoTerminar;
  }

  audio.play().catch((err) => {
    console.warn("Não foi possível reproduzir o áudio:", nomeArquivo, err);
  });
}

export function tocarSequenciaAudios(listaAudios) {
  if (!listaAudios || listaAudios.length === 0) return;

  const [primeiro, ...restante] = listaAudios;
  tocarAudio(primeiro, () => {
    if (restante.length > 0) {
      tocarSequenciaAudios(restante);
    }
  });
}