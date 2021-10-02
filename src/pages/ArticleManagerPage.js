import React, {Component} from 'react';
import * as apiCalls from "../apiCalls/apiCalls";
import ArticleToReviewCard from "../components/ArticleToReviewCard";
import Spinner from "../components/Spinner";

class ArticleManagerPage extends Component {

    state = {
        articles: [],
        pendingApiCall: false,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchArticlesToReview().then(response => {
            this.setState({articles: response.data, pendingApiCall: false});
        });
    }

    addReviewer = (articleId, userId) => {
        apiCalls.addReviewer(articleId, userId);
        let updatedArticles = [...this.state.articles];
        let articleGroup = updatedArticles.find(a => a.article.id === articleId);
        let updatedNotReviewers = [...articleGroup.notReviewers];
        updatedNotReviewers = updatedNotReviewers.filter(nr => nr.id !== userId);
        articleGroup.notReviewers = updatedNotReviewers;
        this.setState({articles: updatedArticles});
    }

    render() {
        const articles = this.state.articles.map(a =>
            <ArticleToReviewCard key={a.id} {...a} addReviewer={this.addReviewer} />
        );

        let content = <Spinner/>;
        if (!this.state.pendingApiCall) {
            content = this.state.articles.length === 0 ? <h3>Nejsou zde žádné články</h3> : articles;
        }
        return (
            <div className="mx-auto mt-5 border rounded p-md-5 p-2 container gray-noise-background">
                <h2 className="mb-5">Správce Článků</h2>

                {content}
            </div>
        );
    }
}

export default ArticleManagerPage;