import React, {Component} from 'react';
import Layout from "./components/Layout"
import {Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {connect} from "react-redux";
import ArticlesPage from "./pages/ArticlesPage";
import NewArticlePage from "./pages/NewArticlePage";
import ProfilePage from "./pages/ProfilePage";
import MyArticlesPage from "./pages/MyArticlesPage";
import AssignedReviewsPage from "./pages/AssignedReviewsPage";
import ReviewPage from "./pages/ReviewPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import ArticleManagerPage from "./pages/ArticleManagerPage";
import UserManagerPage from "./pages/UserManagerPage";
import ReviewersOverviewPage from "./pages/ReviewersOverviewPage";
import ReviewsOverviewPage from "./pages/ReviewsOverviewPage";
import DecidePage from "./pages/DecidePage";

class App extends Component {

    render() {
        const {user} = this.props;

        let routes = (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/registrace" component={RegisterPage}/>
                <Route exact path="/clanky" component={ArticlesPage}/>
                {user.isLoggedIn && <Route exact path="/mojeUdaje" component={ProfilePage} />}
                {user.isAuthor && <Route exact path="/publikovat" component={NewArticlePage} />}
                {user.isAuthor && <Route exact path="/publikovat/:id" component={NewArticlePage} />}
                {user.isAuthor && <Route exact path="/mojeClanky" component={MyArticlesPage} />}
                {user.isReviewer && <Route exact path="/recenzovat" component={AssignedReviewsPage} />}
                {user.isReviewer && <Route exact path="/recenzovat/:id" component={ReviewPage} />}
                {user.isReviewer && <Route exact path="/mojeRecenze" component={MyReviewsPage} />}
                {user.isAdmin && <Route exact path="/spravceClanku" component={ArticleManagerPage} />}
                {user.isAdmin && <Route exact path="/spravceUzivatelu" component={UserManagerPage} />}
                {user.isAdmin && <Route exact path="/spravceClanku/recenzenti/:id" component={ReviewersOverviewPage} />}
                {user.isAdmin && <Route exact path="/spravceClanku/recenze/:id" component={ReviewsOverviewPage} />}
                {user.isAdmin && <Route exact path="/spravceClanku/rozhodnout/:id" component={DecidePage} />}
                <Redirect to="/"/>
            </Switch>
        );

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state,
    };
}

export default connect(mapStateToProps)(App);
