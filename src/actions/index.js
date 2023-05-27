import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async(dispatch, getState) => {
    await dispatch(fetchPosts());
    //console.log(getState());

    //const userIds = _.uniq(_.map(getState().posts, 'userId'));
    //userIds.forEach(id => dispatch(fetchUser(id)));

    //refactor loadash with _.chain
    _.chain(getState().posts).map('userId').uniq().forEach(userId => dispatch(fetchUser(userId))).value();


    //if you want to use the users result from network request use the following because you can't use async await syntax inside `forEach`
    //1.await Promise.all(userIds.map(id => dispatch(fetchUser(id)))); 
    //console.log(getState());
    //or 
    //2.//Promise.all(userIds.map(id => dispatch(fetchUser(id)))).then((r) => console.log(getState()));

};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });