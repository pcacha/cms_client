import React, {Component} from 'react';
import ArticleCard from "../components/ArticleCard";
import * as apiCalls from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import handleError from "../shared/failureHandler";

class AssignedReviewsPage extends Component {

    state = {
        articles: [],
        pendingApiCall: false,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchAssignedReviews().then(response => {
            this.setState({articles: response.data, pendingApiCall: false});
        }).catch(error => {
            return handleError(error);
        });
    }

    render() {

        const articles = this.state.articles.map(a =>
            <ArticleCard key={a.reviewId} {...a} toReview={true} />
        );

        let content = <Spinner/>;
        if (!this.state.pendingApiCall) {
            content = this.state.articles.length === 0 ? <h3>Nejsou přiděleny žádné recenze</h3> : articles;
        }

        return (
            <div className="mx-auto mt-5 border rounded p-2 p-md-5 gray-noise-background container">
                <h2 className="mb-5">Články pro recenzování</h2>
                {content}
            </div>
        );
    }
}

export default AssignedReviewsPage;