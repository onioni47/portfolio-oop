
// 1. Project: 프로젝트 정보 관리
class Project {
    constructor(title, description, skills) {
        if (!title.trim() || !description.trim() || !skills.trim()) {
            throw new Error("모든 항목을 입력해야 합니다.");
        }

        this.title = title;
        this.description = description;
        this.skills = skills;
    }
}

// 2. ProjectManager: 프로젝트 목록 관리
class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        if (!(project instanceof Project)) {
            throw new Error("올바른 프로젝트가 아닙니다.");
        }

        this.projects.push(project);
        this.saveProjects();
    }

    saveProjects() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }

    loadProjects() {
        const data = JSON.parse(localStorage.getItem("projects")) || [];

        this.projects = data.map(
            item => new Project(item.title, item.description, item.skills)
        );
    }

    getProjects() {
        return [...this.projects];
    }
}

// 3. ProjectRenderer: 화면 표시 관리
class ProjectRenderer {
    constructor(manager) {
        this.manager = manager;
        this.list = document.getElementById("project-list");
    }

    render() {
        this.list.innerHTML = "";

        this.manager.getProjects().forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const skills = document.createElement("p");
            skills.className = "skills";
            skills.textContent = "Skills: " + project.skills;

            card.append(title, description, skills);
            this.list.appendChild(card);
        });
    }
}

// 4. 객체 생성 및 협력
const manager = new ProjectManager();
const renderer = new ProjectRenderer(manager);

// 기존 프로젝트 데이터
manager.loadProjects();

if (manager.getProjects().length === 0) {
    manager.addProject(new Project(
        "Cafe Waste Management",
        "A project about reducing cafe waste using sales and inventory data.",
        "Python, Pandas"
    ));

    manager.addProject(new Project(
        "Catch Recycling Game",
        "A team project creating a recycling game.",
        "HTML, CSS, JavaScript"
    ));
}

renderer.render();

// 5. 사용자 요청 처리
const form = document.getElementById("project-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const project = new Project(
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("skills").value
        );

        manager.addProject(project);
        renderer.render();
        form.reset();

    } catch (error) {
        alert(error.message);
    }
});
