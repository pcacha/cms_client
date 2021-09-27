import axios from "axios";

export const setAuthorizationHeader = ({token, isLoggedIn}) => {
    if(isLoggedIn) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const login = (credentials) => {
    return axios.post("/api/users/login", credentials);
}

export const signup = (user) => {
    return axios.post("/api/users/register", user);
}

export const fetchArticles = () => {
    return axios.get("/api/articles");
}

export const getFreshToken = (token) => {
    return axios.get("/api/users/token");
}

export const postArticle = (article) => {
    return axios.post("/api/articles", article);
}

export const updateUsername = (username) => {
    return axios.post("/api/users/updateName", {username});
}

export const updateUser = user => {
    return axios.post("/api/users/updateUser", user);
}

export const fetchMyArticles = () => {
    return axios.get("/api/articles/personal");
}

export const fetchArticleById = (id) => {
    return axios.get("/api/articles/" + id);
}

export const updateArticle = (article) => {
    return axios.put("/api/articles/update", article);
}

export const fetchAssignedReviews = () => {
    return axios.get("/api/reviews/assigned");
}

export const fetchReviewById = (id) => {
    return axios.get("/api/reviews/" + id);
}

export const updateReview = (review) => {
    return axios.post("/api/reviews/", review);
}

export const fetchMyReviews = () => {
    return axios.get("/api/reviews");
}

export const fetchNonAdminUsers = () => {
    return axios.get("/api/usermanager");
}

export const setAuthor = (id, value) => {
    return axios.put("/api/usermanager/author/" + id, {value});
}

export const setReviewer = (id, value) => {
    return axios.put("/api/usermanager/reviewer/" + id, {value});
}

export const setBan = (id, value) => {
    return axios.put("/api/usermanager/ban/" + id, {value});
}

export const deleteUser = (id) => {
    return axios.delete("/api/usermanager/delete/" + id);
}

export const fetchArticlesToReview = () => {
    return axios.get("/api/articlemanager");
}

export const addReviewer = (articleId, userId) => {
    return axios.post("/api/articlemanager/reviewer", {articleId, userId});
}

export const fetchArticleReviewers = (id) => {
    return axios.get("/api/articlemanager/reviewer/" + id);
}

export const fetchArticleReviews = (id) => {
    return axios.get("/api/articlemanager/reviews/" + id);
}

export const sendDecide = (decideModel) => {
    return axios.post("/api/articlemanager/decide", decideModel);
}