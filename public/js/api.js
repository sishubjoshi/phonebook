class Api {
	constructor() {
		// this.base_url = 'http://localhost:5000';
		this.base_url = 'https://demoo-joshi.herokuapp.com';
		this.groups_url = 'https://demoo-joshi.herokuapp.com/groups';
		// this.groups_url = 'http://localhost:5000/groups';
	}

	async getContacts() {
		// console.log(this.base_url);
		const fetchContacts = await fetch(`${this.base_url}/contacts`);
		const contacts = await fetchContacts.json();
		// JSON.stringify()
		console.log(contacts);
		return {
			contacts
		};
	}

	async getContact(id) {
		const fetchContact = await fetch(`${this.base_url}/contacts/${id}`);
		const contact = await fetchContact.json();
		return {
			contact
		};
	}

	async addContact(contact) {
		console.log('ccccccccccccc');
		const contacts = await fetch(`${this.base_url}/contacts/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: contact.name,
				number: contact.number
			})
		});
		const newContact = await contacts.json();
		console.log(newContact);
		return {
			newContact
		};
	}

	async deleteContact(id) {
		const contact = await fetch(`${this.base_url}/contacts/delete/${id}`, {
			method: 'DELETE'
		});
		const newContact = await contact.json();
		return {
			newContact
		};
	}

	async updateContact(c_id, newcontact) {
		const fetchContact = await fetch(`${this.base_url}/contacts/update/${c_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newcontact)
		});

		const newContact = await fetchContact.json();
		console.log(newContact);
		return {
			newContact
		};
	}

	async getGroups() {
		const fetchGroups = await fetch(`${this.groups_url}`);
		const groups = await fetchGroups.json();
		// JSON.stringify()
		console.log(groups);
		return {
			groups
		};
	}
}
