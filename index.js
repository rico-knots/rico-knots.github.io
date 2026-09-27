const project_section = document.querySelector("#project-list");

const projects = [
	{
		name: "P2P Chess",
		description: "Peer 2 peer chess made with c sockets and OpenGL UI.",
		url: "https://github.com/rico-knots/p2pchess",
		img: "https://img.magnific.com/free-vector/chess_53876-25642.jpg?semt=ais_hybrid&w=740&q=80",
	},
	{
		name: "Infernum",
		description:
			"A hypixel skyblock client mod for minecraft version 1.8.9 and later 1.21.10 providing utilities around the kuudra boss fight.<br/>(Yes, the name refers to the terraria mod)",
		url: "https://github.com/rico-knots/infernum",
		img: "./assets/infernum.jpg",
	},
	{
		name: "Flappybird clone",
		description: "Simple flappybird clone made with python and pygame library.",
		url: "https://github.com/rico-knots/flappybird",
		img: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/0a/Flappy_Bird_icon.png/250px-Flappy_Bird_icon.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
	}
];

projects.forEach((project) => {
	project_section.innerHTML += `
	<div class="project">
    <div class="project-header">
      <h2 class="project-title">${project.name}</h2>
      <a href="${project.url}" target="_blank" class="project-link"><i class="fa-brands fa-github"></i></a>
    </div>
    <div class="content">
      <img src="${project.img}"/>
      <p class="project-desc">${project.description}</p>
    </div>
</div>
`;
});