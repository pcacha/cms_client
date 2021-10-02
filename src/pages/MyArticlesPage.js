import React, {Component} from 'react';
import MyArticleCard from "../components/MyArticleCard";
import * as apiCalls from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import handleError from "../shared/failureHandler";

class MyArticlesPage extends Component {

    state = {
        articles: [],
        pendingApiCall: false,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchMyArticles().then(response => {
            this.setState({articles: response.data, pendingApiCall: false});
        }).catch(error => {
            return handleError(error);
        });
    }

    render() {
        const {articles} = this.state;
        const reviewed = articles.filter(a => a.state === "REVIEWED").map(a => <MyArticleCard key={a.id} {...a} />);
        const accepted = articles.filter(a => a.state === "ACCEPTED").map(a => <MyArticleCard key={a.id} {...a} />);
        const rejected = articles.filter(a => a.state === "REJECTED").map(a => <MyArticleCard key={a.id} {...a} />);

        let content = <Spinner/>;

        if (!this.state.pendingApiCall) {
            if (reviewed.length === 0 && accepted.length === 0 && rejected.length === 0) {
                content = <h3>Nejsou zde žádné články</h3>;
            } else {
                content = (
                    <>
                        {reviewed}
                        {accepted}
                        {rejected}
                    </>);
            }
        }

        return (
            <div className="mx-auto mt-5 border rounded gray-noise-background container p-md-5 p-2">
                <h2 className="mb-5">Moje Články</h2>

                <div className="row mb-5">
                    <div className="col-12 col-md text-info font-weight-bold">
                        <h4 className="text-center">
                            <i className="fa fa-question-circle"/>
                            <br/>
                            Recenzováno
                        </h4>
                    </div>
                    <div className="col-12 col-md text-success font-weight-bold">
                        <h4 className="text-center">
                            <i className="fa fa-check-circle"/>
                            <br/>
                            Akceptováno
                        </h4>
                    </div>
                    <div className="col-12 col-md text-danger font-weight-bold">
                        <h4 className="text-center">
                            <i className="fa fa-times-circle"/>
                            <br/>
                            Zamítnuto
                        </h4>
                    </div>
                </div>

                {content}
            </div>
        );
    }
}

export default MyArticlesPage;