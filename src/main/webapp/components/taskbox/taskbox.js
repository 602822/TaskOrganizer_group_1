const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/taskbox.css"/>

    <dialog>
       <!-- Modal content -->
        <span>&times;</span>
        <div>
            <div>Title:</div><div><input type="text" size="25" maxlength="80" placeholder="Task title" autofocus/></div>
            <div>Status:</div><div><select></select></div>
        </div>
        <p><button type="submit">Add task</button></p>
     </dialog>`;

/**
  * TaskBox
  * Manage view to add a new task
  */
class TaskBox extends HTMLElement {
	#shadow;
	#dialog;
	

        constructor() {
                super();

      const content = template.content.cloneNode(true);
      this.#shadow = this.attachShadow({mode : "closed"}); 
      this.#shadow.appendChild(content);
      
      this.#dialog = this.#shadow.querySelector('dialog');
     
      
      const taskview = document.querySelector('task-view');
   
   		const span = this.#shadow.querySelector('span');
   		span.addEventListener('click', () => {
			   this.close();
		   });
      
        }

        /**
         * Opens the modal box of view
         * @public
         */
        show() {

			this.#dialog.showModal();
		
        
        
        }

        /**
         * Set the list of possible task states
         * @public
         * @param{Array<Object>} statuslist
         */
        setStatuseslist(statuslist) {
        /**
         * Fill inn rest of code
         */
        }

        /**
         * Add callback to run at click on the "Add task" button
         * @public
         * @param {function} callback
         */
        newtaskCallback(callback) {
        /**
         * Fill inn rest of code
         */
        }

        /**
         * Closes the modal box
         * @public
         */
        close() {
        this.#dialog.close();
        }
}

customElements.define('task-box', TaskBox);
