const uname_input = document.getElementById('username');
const cancel_btn = document.getElementById('cancel-btn');        
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let isCanceled = false;

uname_input.addEventListener('change',async (event)=>{
    isCanceled = false;
    const uname = event.target.value;
    cancel_btn.style.display='block'
    await delay(3000);
    cancel_btn.style.display="none"
    if (!isCanceled){
        console.log(isCanceled)
        getUserByUsername(uname);
    }
})
cancel_btn.addEventListener('click', (event)=>{
    console.log('취소')
    isCanceled = true;
});


//user 정보 가져오기
const baseURL = 'https://jsonplaceholder.typicode.com';
let user = {}
function getUserByUsername(username){
    fetch(`${baseURL}/users?username=${username}`)
        .then((response)=>response.json())
        .then((data)=>{
            const userId = data[0].id;
            user.userInfo = data[0];
            const result = Promise.all(
                [getUserPostByUserId(userId), getUserCommentsByUserId(userId), getUserTodosByUserId(userId)]
            ).then(([posts, comments, todos])=>{
                user.posts = posts;
                user.comments = comments;
                user.todos = todos;
                returnUserInfo();
            })
        })
    console.log(user);
}
function getUserPostByUserId(userId){
    return fetch(`${baseURL}/users/${userId}/posts`)
        .then((response)=>response.json())
        .then((data)=>{
            return data;
        })
}
function getUserCommentsByUserId(userId){
    return fetch(`${baseURL}/users/${userId}/comments`)
    .then((response)=>response.json())
    .then((data)=>{
        return data;
    })
}
function getUserTodosByUserId(userId){
    return fetch(`${baseURL}/users/${userId}/todos`)
        .then((response)=>response.json())
        .then((data)=>{
            return data;
        })
}
function returnUserInfo(){
    const rootElem = document.getElementById('userInfo');
    rootElem.innerHTML = `
        <p>userId: ${user.userInfo.id}</p>
        <p>name: ${user.userInfo.name}</p>
        <p>comments_cnt: ${user.comments.length}</p>
        <p>posts_cnt: ${user.posts.length}</p>
        <p>todos_cnt: ${user.todos.length}</p>`
}