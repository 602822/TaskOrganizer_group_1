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
#tasklist;


    constructor() {
        super();
		
      const content = template.content.cloneNode(true);
      this.#shadow = this.attachShadow({mode : "closed"}); 
      this.#shadow.appendChild(content);
      
      this.#url = this.getAttribute('data-serviceurl');
     this.#tasklist = this.#shadow.querySelector('task-list');
      
      const taskbox = this.#shadow.querySelector('task-box');
     const button = this.#shadow.querySelector('button');
     button.addEventListener('click', () => {
		
		taskbox.show(); 
	 });
	 taskbox.newtaskCallback(this.#saveTask.bind(this));
	 this.#tasklist.deletetaskCallback(this.#DELETETask.bind(this))
	 this.#tasklist.changestatusCallback(this.#updateTask.bind(this))
	 this.GetAndSetData();
	 
    }
    
   async GetAndSetData() {
    const taskBox = this.#shadow.querySelector('task-box'); 
    const taskList = this.#shadow.querySelector('task-list'); 

    try {

      const tasklistdata = await this.GetTaskList();
      
      if (Array.isArray(tasklistdata)) {
       taskList.setTasks(tasklistdata);
       taskList.initTaskList();
       
      } else {
        console.error("Task list data is not a valid array.");
      }
      
      const statusesdata = await this.getAllStatuses();
      
      if (Array.isArray(statusesdata)) {
        taskBox.setStatuseslist(statusesdata); 
        taskList.setStatuseslist(statusesdata); 
      } else {
        console.error("Statuses data is not a valid array.");
      }
    } catch (error) {
      console.error("Error setting data:", error);
    }
  }

     
 async getAllStatuses() {
    try {
        const response = await fetch(`${this.#url}/allstatuses`, { method: "GET" });

        if (response.ok) {
            const result = await response.json();
            if (result.responseStatus) {
                 
            return result.allstatuses;
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
                return result.tasks
   
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
	//	this.#tasklist.show(task)
		
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


async #DELETETask(id) {
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


async #updateTask(id, status) {
	try {
		const response = await fetch(this.#url + "/task/" + id, {
			method: "PUT",
			headers: {"Content-Type": "application/json; charset=utf-8"},
			body: JSON.stringify({"status": status})
		})
		
		const result = await response.json();
		
		
		if(response.ok) {
			console.log(`Updated the status to ${status} on task with id=${id}`)
			console.log(`${JSON.stringify(result)}`)
		} else {
			console.log("Error updating Task: ", result.message)
		}
		
	} catch(e) {
		console.log("Error message: " , e.message)
	}
}


}

customElements.define('task-view', TaskView);
