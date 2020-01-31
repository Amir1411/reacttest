import React from 'react';

const userList = {
	user: [
		{
			"id": 1,
			"name": "test1",
			"age": "11",
			"gender": "male",
			"email": "test1@gmail.com",
			"phoneNo": "9415346313"
		},
		{
			"id": 2,
			"name": "test2",
			"age": "12",
			"gender": "male",
			"email": "test2@gmail.com",
			"phoneNo": "9415346314"
		},
		{
			"id": 3,
			"name": "test3",

			"age": "13",
			"gender": "male",
			"email": "test3@gmail.com",
			"phoneNo": "9415346315"
		},
		{
			"id": 4,
			"name": "test4",
			"age": "14",
			"gender": "male",
			"email": "test4@gmail.com",
			"phoneNo": "9415346316"
		},
		{
			"id": 5,
			"name": "test5",
			"age": "15",
			"gender": "male",
			"email": "test5@gmail.com",
			"phoneNo": "9415346317"
		},
		{
			"id": 6,
			"name": "test6",
			"age": "16",
			"gender": "male",
			"email": "test6@gmail.com",
			"phoneNo": "9415346318"
		}
	]
}
const UserList = (props) => {

	return (
		<div className="container">
			<div className="card">
				<div className="card-body">
					<table className="table">
						<thead className="thead-light">
							<tr>
								<th scope="col">id</th>
								<th scope="col">Name</th>
								<th scope="col">Age</th>
								<th scope="col">Gender</th>
								<th scope="col">Email</th>
								<th scope="col">Phone Number</th>
							</tr>
						</thead>
						<tbody>
							{userList && userList.user && userList.user.map((item, index) => {
								return (
									<tr key={index}>
										<th scope="row">{item.id}</th>
										<td>{item.name}</td>
										<td>{item.age}</td>
										<td>{item.gender}</td>
										<td>{item.email}</td>
										<td>{item.phoneNo}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
};

export default UserList;