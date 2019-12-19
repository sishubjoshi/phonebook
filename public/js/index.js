const api = new Api();
const ui = new UI();
class App {
	constructor() {
		this.name = document.getElementById('name-text');
		this.number = document.getElementById('number-text');
		this.nickname = document.getElementById('nickname-text');
		this.c_id = '';
		this.submit = document.getElementById('contact-submit');
		this.addButton = document.getElementById('addButton');
		this.groupButton = document.getElementById('groupButton');
		this.deleteButton = document.getElementById('deleteButton');
		this.add = true;
	}
	getData() {
		// console.log(api.base_url);
		api.getContacts().then((data) => this.displayContacts(data)).catch((err) => console.log(err));
	}

	displayContacts(contacts) {
		// console.log();

		ui.display(contacts);
	}

	updateContact(id) {
		this.add = false;
		api.getContact(id).then((data) => {
			this.name.value = data.contact.name;
			this.number.value = data.contact.number;
			this.c_id = data.contact._id;
		});
	}

	deleteContact(id) {
		if (confirm('Are you sure?'))
			api.deleteContact(id).then((data) => this.getData()).catch((err) => console.log(err));
	}

	getGroups() {
		api.getGroups().then((data) => ui.displayGroups(data)).catch((err) => console.log(err));
	}
}

const app = new App();

const onLoad = () => {
	app.getData();
};

app.addButton.addEventListener('click', () => {
	(app.name.value = ''), (app.number.value = ''), (app.nickname.value = '');
});

// app.groupButton.addEventListener('click', () => {
// 	app.getGroups();
// });
app.submit.addEventListener('click', (e) => {
	if (app.name.value !== '' && app.number.value !== '') {
		if (app.add) {
			const contact = {
				name: app.name.value,
				number: app.number.value,
				nickname: app.nickname.value
			};

			api.addContact(contact).then((data) => app.getData());
		} else {
			const contact = {
				name: app.name.value,
				number: app.number.value,
				nickname: app.nickname.value
			};
			api.updateContact(app.c_id, contact).then((data) => app.getData());
			app.add = true;
		}
	}
});
