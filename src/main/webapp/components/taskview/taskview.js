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
     
    }
    async getAllStauses () {
		
		try {
			const response = await fetch(`${this.#url}/allstatuses`, {method: "GET"});
			
			if(response.ok) {
				const allStatuses = response.headers.get("allstatuses");
				const responseStatus = response.headers.get("responseStatus");
				
			}
		}catch(e) {
			
		}
		
	}
}

customElements.define('task-view', TaskView);
