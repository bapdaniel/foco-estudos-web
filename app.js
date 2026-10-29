const STORAGE_KEY = "foco-estudos-tarefas";
const form = document.querySelector("#task-form");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const progress = document.querySelector("#progress");

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.done ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Concluir ${task.title}`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      save();
      render();
    });

    const info = document.createElement("div");
    info.className = "task-info";
    const title = document.createElement("strong");
    title.textContent = task.title;
    const time = document.createElement("small");
    time.textContent = `${task.minutes} minutos`;
    info.append(title, time);

    const remove = document.createElement("button");
    remove.className = "delete";
    remove.textContent = "Excluir";
    remove.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      save();
      render();
    });

    item.append(checkbox, info, remove);
    list.append(item);
  });

  const completed = tasks.filter((task) => task.done).length;
  progress.textContent = `${completed} de ${tasks.length} concluídas`;
  emptyState.hidden = tasks.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const minutes = Number(document.querySelector("#minutes").value);
  if (!title || minutes < 5) return;

  tasks.push({ id: Date.now(), title, minutes, done: false });
  save();
  form.reset();
  document.querySelector("#minutes").value = 30;
  render();
});

render();
