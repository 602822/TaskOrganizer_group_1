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
#statuslist
#tasklist

    constructor() {
        super();
		
      const content = template.content.cloneNode(true);
      this.#shadow = this.attachShadow({mode : "closed"}); 
      this.#shadow.appendChild(content);
      
      this.#url = this.getAttribute('data-serviceurl');
      this.#statuslist = [];
      this.#tasklist = [];
      
      const taskbox = this.#shadow.querySelector('task-box');
     const button = this.#shadow.querySelector('button');
     button.addEventListener('click', () => {
		
		taskbox.show(); 
	 });
	 taskbox.newtaskCallback(this.#saveTask.bind(this));
     
    }
 async getAllStatuses() {
    try {
        const response = await fetch(`${this.#url}/allstatuses`, { method: "GET" });

        if (response.ok) {
            const result = await response.json();
            if (result.responseStatus) {
                const statuses = result.statuses;
                console.log("All statuses:", statuses);
                
                this.#statuslist = statuses;
            } else {
                console.error("Statuses were not found in the database.");
               
            }
        } else {
            console.error(`Error, Server returned status code: ${response.status}`);
       
        }
    } catch (e) {
        console.error(`Error: ${e.message}`);
      
    }
}
async GetTaskList() {
	  try {
        const response = await fetch(`${this.#url}/tasklist`, { method: "GET" });

        if (response.ok) {
            const result = await response.json();
            if (result.responseStatus) {
                this.#tasklist = result.tasks
   
            } else {
			 console.log("The tasks was not found in the database")
			}
        } else {
			console.log(`Error, Server returned status code:${response.status}` )
			
		}
    } catch (e) {
        console.log(`Got error: ${e.message}`);
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


async DELETETask(id) {
    try {
        const response = await fetch(`${this.#url}/task/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const result = await response.json();
            if (result.responseStatus) {
                console.log(`Task with ID ${id} has been deleted.`);
            } else {
                console.log(`Failed to delete task with ID ${id}.`);
            }
        } else {
            console.log(`Error: status code ${response.status}`);
        }
    } catch (e) {
        console.log(`Got error: ${e.message}`);
    }
}


}

customElements.define('task-view', TaskView);
