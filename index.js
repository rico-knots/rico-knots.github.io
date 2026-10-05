const project_section = document.querySelector("#project-list");

const projects = [
	{
		name: "P2P Chess",
		description: "Peer 2 peer chess made with c sockets and OpenGL UI.",
		url: "https://github.com/rico-knots/p2pchess",
		img: "https://img.magnific.com/free-vector/chess_53876-25642.jpg?semt=ais_hybrid&w=740&q=80",
		tags: ["C", "Game"],
	},
	{
		name: "Infernum",
		description:
			"A hypixel skyblock client mod for minecraft version 1.8.9 and later 1.21.10 providing utilities around the kuudra boss fight.<br/>(Yes, the name refers to the terraria mod)",
		url: "https://github.com/rico-knots/infernum",
		img: "./assets/infernum.jpg",
		tags: ["Java", "Minecraft"],
	},
	{
		name: "Flappybird clone",
		description:
			"Simple flappybird clone made with python and pygame library.",
		url: "https://github.com/rico-knots/flappybird",
		img: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/0a/Flappy_Bird_icon.png/250px-Flappy_Bird_icon.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
		tags: ["Python", "Game"],
	},
];

if (project_section) {
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
