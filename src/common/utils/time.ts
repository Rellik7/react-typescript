export function tempoParaSegundos(tempo: string) {
  const [horas = '0', minutos = '0', segundos = '0'] = tempo.split(':');

  const horasEmSgundos = Number(horas) * 3600;
  const minutosEmSegundos = Number(minutos) * 60;
  return horasEmSgundos + minutosEmSegundos + Number(segundos);
};

export function segundosParaTempo(tempo: number) {
  const horas = Math.trunc(tempo / 3600);
  const minutos = Math.trunc((tempo % 3600) / 60);
  const segundos = Math.trunc(tempo % 60);

  return `${horas.toLocaleString('pt-br', {minimumIntegerDigits: 2}).trim()}:${minutos.toLocaleString('pt-br', {minimumIntegerDigits: 2}).trim()}:${segundos.toLocaleString('pt-br', {minimumIntegerDigits: 2}).trim()}`;
}