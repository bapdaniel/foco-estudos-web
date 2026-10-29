export function criarTarefa(titulo, minutos, id = Date.now()) {
  const tituloLimpo = titulo.trim();
  const tempo = Number(minutos);
  if (!tituloLimpo || tempo < 5 || tempo > 480) {
    throw new Error("Informe um título e um tempo entre 5 e 480 minutos.");
  }
  return { id, title: tituloLimpo, minutes: tempo, done: false };
}

export function calcularProgresso(tasks) {
  return {
    completed: tasks.filter((task) => task.done).length,
    total: tasks.length,
  };
}

