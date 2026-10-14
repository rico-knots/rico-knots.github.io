const project_section = document.querySelector("#project-list");

async function load_projects() {
  const res = await fetch("./assets/projects.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function init() {
  const projects = await load_projects();

  const ALL = "Alle";
  const all_tags = [ALL, ...new Set(projects.flatMap((p) => p.tags))];
  let active_tag = ALL;

  const filter_bar = document.querySelector(".project-filters");

  const render_filters = () => {
    filter_bar.innerHTML = all_tags
      .map(
        (tag) => `
        <button type="button"
          class="filter-chip${tag === active_tag ? " active" : ""}"
          data-tag="${tag}"
          aria-pressed="${tag === active_tag}">${tag}</button>`
      )
      .join("");
  };

  const render_projects = () => {
    const visible =
      active_tag === ALL
        ? projects
        : projects.filter((p) => p.tags.includes(active_tag));

    project_section.innerHTML = visible
      .map(
        (project) => `
        <div class="project">
          <div class="project-header">
            <h2 class="project-title">${project.name}</h2>
            <a href="${project.url}" target="_blank" class="project-link"><i class="fa-brands fa-github"></i></a>
          </div>
          <div class="content">
            <img src="${project.img}" alt="${project.name}"/>
            <p class="project-desc">${project.description}</p>
          </div>
          <div class="project-tags">
            ${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>`
      )
      .join("");
  };

  filter_bar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    active_tag = chip.dataset.tag;
    render_filters();
    render_projects();
  });

  render_filters();
  render_projects();
}

if (project_section) {
  init().catch((err) => {
    console.error("Failed to load projects:", err);
    project_section.textContent = "Projecten konden niet geladen worden.";
  });
}

// Riddle stuff
const riddle_element = document.querySelector(".riddle-title");
const riddle_input = document.querySelector(".riddle-input");
const submit_riddle_btn = document.querySelector(".submit_riddle");
const new_riddle_btn = document.querySelector(".new_riddle");

const api_url = "https://riddles-api-eight.vercel.app/";
const categories = ["funny", "math", "logic", "mystery", "science"];

let answer;

const random_cat = () =>
	categories[Math.floor(Math.random() * categories.length)];

if (riddle_element) {
	function new_riddle() {
		riddle_element.textContent = "Nieuwe riddle laden...";
		fetch(`${api_url}${random_cat()}`)
			.then((res) => res.json())
			.then((data) => {
				riddle_element.textContent = data.riddle;
				answer = data.answer;
				riddle_input.value = "";
				console.log(answer);
			})
			.catch(() => {
				riddle_element.textContent = "Kon geen riddle laden :(";
			});
	}

	new_riddle();

	new_riddle_btn.addEventListener("click", () => {
		new_riddle();
	});

	submit_riddle_btn.addEventListener("click", () => {
		if (!answer) return;
		const correct =
			riddle_input.value.trim().toLowerCase() ===
			answer.trim().toLowerCase();
		alert(`Je hebt het ${correct ? "goed!" : "fout :("}`);
		if (correct) {
			new_riddle();
		}
	});
}
