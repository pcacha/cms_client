import React, {Component} from 'react';
import * as apiCalls from "../api/apiCalls";
import Spinner from "../components/Spinner";
import ReviewerCard from "../components/ReviewerCard";

class ReviewersOverviewPage extends Component {
    state = {
        reviewers: [],
        pendingApiCall: false,
        id: this.props.match.params.id,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchArticleReviewers(this.state.id).then(response => {
            this.setState({reviewers: response.data, pendingApiCall: false});
        });
    }

    render() {

        const reviewers = this.state.reviewers.map(r =>
            <ReviewerCard key={r.id} {...r} />
        );

        let content = <Spinner/>;
        if (!this.state.pendingApiCall) {
            content = this.state.reviewers.length === 0 ? <h3>Nejsou zde žádní recenzenti</h3> : reviewers;
        }

        return (
            <div className="mx-auto mt-5 border rounded p-2 p-md-5 gray-noise-background container">
                <h2 className="mb-5">Recenzenti Článku</h2>
                {content}
            </div>
        );
    }
}

export default ReviewersOverviewPage;