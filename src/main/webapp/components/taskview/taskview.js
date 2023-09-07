import '../tasklist/tasklist.js';
import '../taskbox/taskbox.js';

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/taskview.css"/>

    <h1>Tasks</h1>

    <div id="message"><p>Waiting for server data.</p></div>
    <div id="newtask"><button type="button">New task</button></div>

    <!-- The task list -->
    <task-list></task-list>
            
    <!-- The Modal -->
    <task-box></task-box>`;

/**
  * TaskView
  * The full application view
  */
class TaskView extends HTMLElement {
#shadow;
#url;

    constructor() {
        super();
		
      const content = template.content.cloneNode(true);
      this.#shadow = this.attachShadow({mode : "closed"}); 
      this.#shadow.appendChild(content);
      
      this.#url = this.getAttribute('data-serviceurl');
      
      const taskbox = this.#shadow.querySelector('task-box');
     const button = this.#shadow.querySelector('button');
     button.addEventListener('click', () => {
		
		taskbox.show(); 
	 });
	 taskbox.newtaskCallback(this.#saveTask.bind(this));
     
    }
    async getAllStauses () {
		
		try {
			const response = await fetch(`${this.#url}/allstatuses`, {method: "GET"});
			
			if(response.ok) {
				const object = await response.json();
				
			}
		}catch(e) {
			
		}
		

	}
	
	async #saveTask(task) {
		// Lagre task på tjener
		// Hvis suksess
		this.#tasklist.show(task)
		
		try {
			const response = await fetch(this.#url + "/task", {
				method: "POST",
				headers: {"Content-Type": "application/json; charset=utf-8"},
				body: JSON.stringify({"title":task.title, "status":task.status})
				
			}) 
			try {
				const result = await response.json()
				if(response.ok) {
				console.log(`Server Response: '${JSON.stringify(result)}'`)
				}
			} catch(e) {
				console.log("Error Message: ", e.message)
			}
			
		} catch(e) {
			console.log("Error with the POST request: ", e.message)
		}
}
}

customElements.define('task-view', TaskView);
