import { Activity } from "../domain/Activity.ts";
import { ActivityList } from "../domain/ActivityList.ts";

const form = document.getElementById("activity-form") as HTMLFormElement | null;
const activityInput = document.getElementById(
  "activity",
) as HTMLInputElement | null;
const professorInput = document.getElementById(
  "professor",
) as HTMLSelectElement | null;
const timeInput = document.getElementById("time") as HTMLInputElement | null;
const activitiesContainer = document.getElementById("activities-list");
const emptyList = document.getElementById("empty-list");
const formMessage = document.getElementById("form-message");
const activities = new ActivityList();

function createActivityCard(activity: Activity): HTMLElement {
  const column = document.createElement("div");
  column.className = "col";

  const entry = document.createElement("div");
  entry.className = "card h-100 border-success-subtle shadow-sm";
  const content = document.createElement("div");
  content.className = "card-body";

  const title = document.createElement("h3");
  title.className = "card-title h5";
  title.textContent = activity.name;

  const professor = document.createElement("p");
  professor.className = "card-text text-secondary";
  professor.textContent = `Profesor/a: ${activity.professor}`;

  const time = document.createElement("p");
  time.className = "card-text text-success fw-semibold";
  time.textContent = `Horario: ${activity.time}`;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Eliminar";
  removeButton.className = "btn btn-danger";
  // agregar clase
  removeButton.addEventListener("click", () => {
    activities.remove(activity);
    renderActivities();
    showMessage(`${activity.name} eliminada.`, false);
    
  });

  content.append(title, professor, time, removeButton);
  entry.appendChild(content);
  column.appendChild(entry);
  return column;
}

function renderActivities(): void {
  const items = activities.getActivities();
  emptyList?.classList.toggle("d-none", items.length > 0);
  activitiesContainer?.replaceChildren(...items.map(createActivityCard));
}

function showMessage(message: string, isError: boolean): void {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.className = isError ? "mt-3 text-danger" : "mt-3 text-success";
}

if (form && activityInput && professorInput && timeInput) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const activity = new Activity(
        activityInput.value,
        professorInput.value,
        timeInput.value,
      );
      activities.add(activity);
      renderActivities();
      showMessage(`${activity.name} agregada correctamente.`, false);
      form.reset();
      activityInput.focus();
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "No se pudo agregar la clase.",
        true,
      );
    }
  });
}
