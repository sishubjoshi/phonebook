class UI {
	constructor() {
		this.contact_area = document.querySelector('.contacts');
	}

	display(contacts) {
		console.log(contacts.contacts);
		let output = '';

		if (contacts.message) {
			output += `<div class="container">
                            <div class="card card-body">
                                <p class="lead ">Notes not added yet.</p>
                            </div>
                        </div> `;
			this.contact_area.innerHTML = output;
		} else {
			contacts.contacts.forEach((contact) => {
				// console.log(contact._id);
				output += `
                            <div class="card card-body m-2" key=${contact._id} >
                                <div class="row align-items-start">
                                    <div class="col-8">
                                        <p class="lead">${contact.name}</p>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-pencil-alt mr-2 col-6" style="font-size:18px; color:red;cursor:pointer" data-toggle="modal" id="addButton" data-target="#addNoteModal" onclick="app.updateContact('${contact._id}')"></i>
                                        <i class="fas fa-times" style="font-size:20px;cursor:pointer" id="deleteButton" onclick = "app.deleteContact('${contact._id}')"></i>
                                    </div>
                                </div>
                                <p>${contact.number}</p>
                                <i class="fas fa-pencil" style="font-size:18px"></i>    
                            </div>
                        `;
			});

			this.contact_area.innerHTML = output;
			// console.log(output);
		}
	}
}
