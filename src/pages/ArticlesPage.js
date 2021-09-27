import React, {Component} from 'react';
import ArticleCard from "../components/ArticleCard";
import * as apiCalls from "../api/apiCalls";
import Spinner from "../components/Spinner";

class ArticlesPage extends Component {

    state = {
        articles: [],
        pendingApiCall: false,
    };

    componentDidMount() {
        this.setState({pendingApiCall: true})
        apiCalls.fetchArticles().then(response => {
            this.setState({articles: response.data, pendingApiCall: false});
        });
    }

    render() {

        const articles = this.state.articles.map(a =>
            <ArticleCard key={a.id} {...a} />
        );

        let content = <Spinner/>;
        if (!this.state.pendingApiCall) {
            content = this.state.articles.length === 0 ? <h3>Nejsou zde žádné články</h3> : articles;
        }

        return (
            <div className="mx-auto mt-5 border rounded p-2 p-md-5 gray-noise-background container">
                <h2 className="mb-5">Články</h2>
                {content}
            </div>
        );
    }
}

export default ArticlesPage;