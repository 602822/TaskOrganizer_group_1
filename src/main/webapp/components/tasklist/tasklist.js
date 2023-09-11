/**
  * TaskList
  * Manage view with list of tasks
  */
if (customElements.get('task-list') === undefined) {
    class TaskList extends HTMLElement {
		
		#shadow
		
		 tasks = [];
		 
		 #deleteCallback = null;
		 #updateCallback = null;

        constructor() {
			
			
            super();

            /**
             * Fill inn rest of code
             */
			
			
			
			this.#shadow = this.attachShadow({mode:"closed"})
			
			const div = document.createElement("div")
			
			this.#shadow.appendChild(div)
			
			this.#createCSS()
		
			
			}
			
			
		
			initTaskList() {
					for(let task of this.tasks) {
				this.showTask(task);
				const button = this.#shadow.querySelector(`button[id="${task.id}"]`)
		         button.addEventListener('click', () => {
		         
		         if(confirm(`Delete task ${task.title}`)) {
					 this.removeTask(task.id)
				 }
				 })
		         
		         
		         
		         
		         const dropDownList = this.#shadow.querySelector(`select[id="${task.id}"]`)
		         dropDownList.addEventListener('change', () => {
					const newStatus = dropDownList.value
					 if(confirm(`Set ${task.title} to ${newStatus}`)) {
						 if(newStatus !=="<Modify>") {
						 this.updateTask(task)
						 }
						 
						 
					 } 
				 })
				
			}
			}
			
			
			
	
				
		
        setTasks(newTasks) {
        this.tasks = newTasks;
    }

      

        /**
         * @public
         * @param {Array} list with all possible task statuses
         */
		
        setStatuseslist(allstatuses) {
          const div =  this.#shadow.querySelector("div")
        const dropDownLists =  div.querySelectorAll("select")
        
        for(let dropDown of dropDownLists) {
			allstatuses.forEach(status => {
				const option = document.createElement("option")
				option.textContent = status
				dropDown.appendChild(option)
				
			});
			
		}
        }

        /**
         * Add callback to run on change on change of status of a task, i.e. on change in the SELECT element
         * @public
         * @param {function} callback
         */
        changestatusCallback(callback) {
			this.#updateCallback = callback
			
        }

        /**
         * Add callback to run on click on delete button of a task
         * @public
         * @param {function} callback
         */
        deletetaskCallback(callback) {
            // Fill in code
            this.#deleteCallback = callback
        }

        /**
         * Add task at top in list of tasks in the view
         * @public
         * @param {Object} task - Object representing a task
         */
        showTask(task) {
            // Fill in code
        
          const div = this.#shadow.querySelector("div")
          
          let table =  div.querySelector("table")
        
        if(!table) {
			
		   table = document.createElement("table")
		   
		
		   
		   
			const tableHead = document.createElement("thead")
			
			
			const headerRow = document.createElement("tr")
			const titleHeader = document.createElement("th")
			titleHeader.textContent = "Task";
			titleHeader.id = "task"
			headerRow.appendChild(titleHeader)
			
			
			const statusHeader = document.createElement("th")
			statusHeader.textContent = "Status";
			statusHeader.id = "status"
			
			
			
			
			headerRow.appendChild(statusHeader)
			
			const tableHeadDiv = document.createElement("div")
			tableHeadDiv.className = "table-head"
			
			tableHeadDiv.appendChild(tableHead)
			
			tableHead.appendChild(headerRow)
			table.appendChild(tableHeadDiv);
			
			
			
			
			const tableBody = document.createElement("tbody")
			
			
			const tableBodyDiv = document.createElement("div")
			tableBodyDiv.className = 'table-body'
			
			table.appendChild(tableBodyDiv)
			
			tableBodyDiv.appendChild(tableBody)
			
		
			div.appendChild(table)
			
			
	
			
			
			
		}
		
		
		
		const tableBody = table.querySelector("tbody")
		const taskRow = document.createElement("tr")
		const titleData = document.createElement("td")
		titleData.textContent = task.title
		taskRow.appendChild(titleData)
		taskRow.id = task.id
		tableBody.appendChild(taskRow)
		
		const statusData = document.createElement("td")
		statusData.id = task.id
		statusData.textContent = task.status
		taskRow.appendChild(statusData)
		
		
		const dropDownList = document.createElement("select")
		dropDownList.id = task.id
		
		taskRow.appendChild(dropDownList)
		
		
		
		const button = document.createElement("button")
		button.textContent = "Remove"
		button.id = task.id
		taskRow.appendChild(button)
		
		this.toggleTableVisibility();
		
          
        }

        /**
         * Update the status of a task in the view
         * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
         */
        updateTask(task) {
            // Fill in code
            const dropDownList = this.#shadow.querySelector(`select[id="${task.id}"]`)
            const statusSelected = dropDownList.value
            
            task.status = statusSelected
            
            const statusDataElement = this.#shadow.querySelector(`td[id="${task.id}"]`)
            statusDataElement.textContent = statusSelected;
            this.#updateCallback(task.id, statusSelected)
            
            
        }

        /**
         * Remove a task from the view
         * @param {Integer} task - ID of task to remove
         */
        removeTask(id) {
		
			

			const index = this.tasks.findIndex(task => task.id === id)
		    this.tasks.splice(index,1);
		    
		    const taskRow = this.#shadow.querySelector(`tr[id="${id}"]`)
		    
		    if(taskRow) {
				taskRow.remove()
			}
			
			const length =  this.getNumtasks()
			
			console.log("Task Deleted")
			console.log("Number of Tasks " , length)
			
			this.toggleTableVisibility();
			this.#deleteCallback(id);
		    
		    
        }

        /**
         * @public
         * @return {Number} - Number of tasks on display in view
         */
        getNumtasks() {
         return this.tasks.length;
        }
        
        
      toggleTableVisibility () {
		  const table = this.#shadow.querySelector("table")
		 
		  
		  if(this.getNumtasks() === 0) {
			  table.style.display = 'none'
			 
		  } else {
			
			  table.style.display = 'table'
		  }
	  }
        
        
    #createCSS() {
		const style = `
		th {
			font-weight: bold;
		
			padding-left: 25px;
			padding-right: 40px;
			
			
		}
		
		.table-body {
			border-top : solid 2px black;
			border-bottom: solid 2px black;
		}
		
		select {
			margin-right : 10px;
			margin-left : 10px;
		}
		
		td {
			padding-right: 5px;
			padding-left: 5px;
			
		}
		
		button {
			color: white;
			background-color: #008CBA;
			border-radius: 4px;
			border: 2px solid black;	
		}
		
		button:hover {
			cursor: pointer;
			
		}
		
		
		
		`;
		
	const styleElement = document.createElement("style")
	styleElement.insertAdjacentHTML('beforeend', style)
	
	this.#shadow.appendChild(styleElement)
	
		
		
	}
		
	
        
        
    }
    customElements.define('task-list', TaskList);
}

