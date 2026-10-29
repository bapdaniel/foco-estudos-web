import test from "node:test";
import assert from "node:assert/strict";

import { calcularProgresso, criarTarefa } from "../model.js";

test("cria uma tarefa válida", () => {
  assert.deepEqual(criarTarefa("  Estudar SQL  ", 30, 1), {
    id: 1,
    title: "Estudar SQL",
    minutes: 30,
    done: false,
  });
});

test("rejeita tempo inválido", () => {
  assert.throws(() => criarTarefa("Estudar", 2), /entre 5 e 480/);
});

test("calcula o progresso", () => {
  const tarefas = [{ done: true }, { done: false }, { done: true }];
  assert.deepEqual(calcularProgresso(tarefas), { completed: 2, total: 3 });
});

