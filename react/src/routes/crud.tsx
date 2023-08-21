import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumberValueChangeEvent } from "primereact/inputnumber";

export default function Crud() {
	const initialFormData = {
		id: null,
		first_name: '',
		last_name: '',
		email: '',
		phone: '',	
	}

	const [users, setUsers] = useState()
	const [visible, setVisible] = useState(false)
	const [formData, setFormData] = useState(initialFormData)

	const fetchUsers = async () => {
		const res = await fetch('http://api.crud.localhost/users');

		setUsers(await res.json())
	}

	useEffect(() => {
		fetchUsers();
	}, [])

	const handleChange = (event: ChangeEvent<HTMLInputElement>|InputNumberValueChangeEvent) => {
		const { name, value } = event.target

		setFormData((previous) => ({ ...previous, [name]: value }))
	}

	const handleEditClick = async (id: number) => {
		const res = await fetch(`http://api.crud.localhost/users/${id}`)

		if (res.ok) {
			setFormData({...(await res.json())})

			setVisible(true);
		}
		
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const url = formData.id
			? `http://api.crud.localhost/users/${formData.id}`
			: 'http://api.crud.localhost/users'

		const res = await fetch(url, {
			method: formData.id ? 'PATCH' : 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(formData)
		})

		if (res.ok) {
			setFormData(initialFormData)

			setVisible(false)

			await fetchUsers()
		}
	}

	const handleDelete = async (id: number) => {
		const res = await fetch(`http://api.crud.localhost/users/${id}`, {
			method: 'DELETE',
		})

		if (res.ok) {
			await fetchUsers()
		}
	}

	return (
		<>
			<div className='flex justify-end py-4'>
				<Button label="Add New" severity='success' onClick={() => setVisible(true)} />
			</div>

			<DataTable
				value={users}
			>
				<Column header='ID' field='id' />
				<Column header='First Name' field='first_name' />
				<Column header='Last Name' field='last_name' />
				<Column header='Email' field='email' />
				<Column header='Phone Number' field='phone' />
				<Column header='Actions' body={(data) => (
					<div className='flex gap-4'>
						<Button label='Edit' severity='info' onClick={() => handleEditClick(data.id)} />
						<Button label='Delete' severity='danger' onClick={() => handleDelete(data.id)} />		
					</div>
				)} />
			</DataTable>

			<Dialog 
				header='User Form' 
				visible={visible} 
				onHide={() => setVisible(false)} 
				position='top' 
				style={{
					width: '30%'
				}}
				draggable={false}
			>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-8 py-6">
						<span className="p-float-label">
							<InputText type='text' className="w-full" name="first_name" value={formData.first_name} onChange={handleChange} />

							<label htmlFor="first_name">First Name</label>
						</span>

						<span className="p-float-label">
							<InputText type='text' className="w-full" name="last_name" value={formData.last_name} onChange={handleChange} />

							<label htmlFor="last_name">Last Name</label>
						</span>

						<span className="p-float-label">
							<InputText type='email' className="w-full" name="email" value={formData.email} onChange={handleChange} />

							<label htmlFor="email">Email Address</label>
						</span>

						<span className="p-float-label">
							<InputText className="w-full" name="phone" value={formData.phone} onChange={handleChange} />

							<label htmlFor="phone">Phone Number</label>
						</span>

						<Button type='submit' label='Submit' severity="success" />
					</div>
				</form>
			</Dialog>
		</>
	)
}
