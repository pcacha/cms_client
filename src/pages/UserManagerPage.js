import React, {Component} from 'react';
import * as apiCalls from "../api/apiCalls";
import Spinner from "../components/Spinner";
import UserManagerRow from "../components/UserManagerRow";

class UserManagerPage extends Component {

    state = {
        users: [],
        pendingApiCall: false,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchNonAdminUsers().then(response => {
            this.setState({users: response.data, pendingApiCall: false});
        });
    }

    onCheckboxChange = (id, action, value) => {
        const updatedUsers = [...this.state.users];
        let user = updatedUsers.find(u => u.id === id);
        switch(action) {
            case "author":
                user.isAuthor = value;
                apiCalls.setAuthor(id, value);
                break;
            case "reviewer":
                user.isReviewer = value;
                apiCalls.setReviewer(id, value);
                break;
            case "banned":
                user.isBanned = value;
                apiCalls.setBan(id, value);
                break;
        }
        this.setState({users: updatedUsers});
    }

    onDelete = (id) => {
        apiCalls.deleteUser(id);
        let updatedUsers = [...this.state.users];
        updatedUsers = updatedUsers.filter(u => u.id !== id);
        this.setState({users: updatedUsers});
    }

    render() {
        const {users, pendingApiCall} = this.state;


        let content = <Spinner/>;
        if (!pendingApiCall) {
            content = pendingApiCall.length === 0 ?
                <h3>Nejsou zde žádní uživatelé</h3>
                :
                <table className="table table-dark table-striped table-bordered table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Jméno</th>
                        <th scope="col">Datum Registrace</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Recenzent</th>
                        <th scope="col">Ban</th>
                        <th scope="col">Smazat</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(u => <UserManagerRow {...u} onCheckboxChange={this.onCheckboxChange} onDelete={this.onDelete} />)}
                    </tbody>
                </table>;
        }


        return (
            <div className="mx-auto mt-5 border rounded p-md-5 p-2 container gray-noise-background">
                <h2 className="mb-5">Správce Uživatelů</h2>

                {content}
            </div>
        );
    }
}

export default UserManagerPage;