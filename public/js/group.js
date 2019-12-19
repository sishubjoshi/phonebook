class Group {
	constructor() {
		this.base_url = 'http://localhost:5000/contacts';
		// this.base_url = 'https://demoo-joshi.herokuapp.com/contacts';
		this.group_url = 'http://localhost:5000/groups';
		// this.group_url = 'https://demoo-joshi.herokuapp.com/groups';
		this.contact_list = [];
		this.contactSearch = document.getElementById('contactSearch');
		this.contactDisplay = document.querySelector('.list-contact');
		this.group_members = [];
		this.submit = document.getElementById('group-submit');
		this.contact_area = document.querySelector('.groups');
	}
	async getData() {
		const fetchContacts = await fetch(`${this.base_url}`);
		const contacts = await fetchContacts.json();
		// JSON.stringify()
		console.log(contacts);
		return contacts;
	}

	async addGroup(group) {
		const groups = await fetch(`${this.group_url}/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: group.name,
				members: group.members
			})
		});
		const newGroup = await groups.json();
		console.log(newGroup);
		return {
			newGroup
		};
	}
	async getGroups() {
		const fetchGroups = await fetch(`${this.group_url}/get`);
		const groups = await fetchGroups.json();
		// JSON.stringify()
		console.log(groups);
		return {
			groups
		};
	}
	displayGroups(groups) {
		console.log(groups.groups);
		let output = '';

		if (groups.message) {
			output += `<div class="container">
                            <div class="card card-body">
                                <p class="lead ">groups not added yet.</p>
                            </div>
                        </div> `;
			this.contact_area.innerHTML = output;
		} else {
			groups.groups.forEach((group) => {
				// console.log(contact._id);
				output += `
                            <div class="card card-body m-2" key=${group._id} >
                                <div class="row align-items-start">
                                    <div class="col-8">
                                        <p class="lead">${group.name}</p>
                                    </div>
                                    <div class="col-auto">
                                        ${group.members}
                                    </div>
                                </div>
                            </div>
                        `;
			});

			this.contact_area.innerHTML = output;
		}
	}
	setTo(contacts) {
		// console.log(contacts);
		contacts.map((item) => this.contact_list.push(item));
		let op = '';
		this.contact_list.forEach((item) => {
			op += `
				<p class="item-list" onclick="grp.addTo('${item._id}')">${item.name}</p>
			`;
		});
		this.contactDisplay.innerHTML = op;
		console.log(this.contact_list);
	}

	addTo(id) {
		// console.log(id);
		this.group_members.push(id);
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';

		// create text node and append to li
		li.appendChild(document.createTextNode(id));
		// create a new link element
		const link = document.createElement('a');

		// add class
		link.className = 'delete-item secondary-content';
		// add icon
		link.innerHTML = '<i class="fas fa-remove"></i>';
		// append the link to li
		li.appendChild(link);
		document.querySelector('.modal-footer').appendChild(li);
		console.log(this.group_members);
	}
}

const grp = new Group();

const onLoad = () => {
	grp.getGroups().then((data) => grp.displayGroups(data));
	grp.getData().then((data) => grp.setTo(data));
};

grp.contactSearch.addEventListener('keyup', (e) => {
	const key = e.target.value.toLowerCase();
	// console.log(grp.contact_list);
	document.querySelectorAll('.item-list').forEach((item) => {
		if (item.textContent.toLowerCase().indexOf(key) != -1) {
			item.style.display = 'block';
			// console.log(item.name);
		} else {
			item.style.display = 'none';
		}
	});
});
document.getElementById('addGroup').addEventListener('click', () => {
	// console.log('ggg');
	// api.getGroups().then((data) => console.log(data));
	document.getElementById('groupName').value = '';
	grp.group_members = [];
});

grp.submit.addEventListener('click', (e) => {
	e.preventDefault();
	let groupName = document.getElementById('groupName').value;
	const newgroup = {
		name: groupName,
		members: grp.group_members
	};
	grp.addGroup(newgroup);
	console.log(grp.group_members);
	document.getElementById('close-modal').click();
});
