import React, {Component} from 'react';
import * as apiCalls from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import ReviewCard from "../components/ReviewCard";

class ReviewsOverviewPage extends Component {
    state = {
        reviews: [],
        pendingApiCall: false,
        id: this.props.match.params.id,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchArticleReviews(this.state.id).then(response => {
            this.setState({reviews: response.data, pendingApiCall: false});
        });
    }

    render() {

        const reviews = this.state.reviews.map(r =>
            <ReviewCard key={r.id} {...r} />
        );

        let content = <Spinner/>;
        if (!this.state.pendingApiCall) {
            content = this.state.reviews.length === 0 ? <h3>Nejsou zde žádné recenze</h3> : reviews;
        }

        return (
            <div className="mx-auto mt-5 border rounded p-2 p-md-5 gray-noise-background container">
                <h2 className="mb-5">Recenze Článku</h2>
                {content}
            </div>
        );
    }
}

export default ReviewsOverviewPage;