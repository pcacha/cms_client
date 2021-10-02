import React, {Component} from 'react';
import MyReviewCard from "../components/MyReviewCard";
import * as apiCalls from "../apiCalls/apiCalls";
import Spinner from "../components/Spinner";
import handleError from "../shared/failureHandler";

class MyReviewsPage extends Component {

    state = {
        reviews: [],
        pendingApiCall: false,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchMyReviews().then(response => {
            this.setState({reviews: response.data, pendingApiCall: false});
        }).catch(error => {
            return handleError(error);
        });
    }

    render() {
        const {reviews} = this.state;
        const reviewCards = reviews.map(r => <MyReviewCard key={r.id} {...r} />);

        let content = <Spinner/>;

        if (!this.state.pendingApiCall) {
            if (reviewCards.length === 0) {
                content = <h3>Nejsou zde žádné recenze</h3>;
            } else {
                content = reviewCards;
            }
        }

        return (
            <div className="mx-auto mt-5 border rounded p-md-5 p-2 gray-noise-background container">
                <h2 className="mb-5">Moje Recenze</h2>

                {content}
            </div>
        );
    }
}

export default MyReviewsPage;