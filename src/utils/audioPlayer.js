let audioAtual = null;

export function tocarAudio(nomeArquivo) {
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
  }

  audioAtual = new Audio(`/audios/${nomeArquivo}.mp3`);
  audioAtual.play().catch((err) => {
    console.warn("Reprodução bloqueada até a primeira interação:", err);
  });
}