const get_records = async (url) => {
    try {
        let data = await fetch(url);
        let json_data = await data.json();
        return json_data;
    } catch (error) {
        console.log(error);
    }
};

const fetch_data = async ({ ...data }) => {
    // console.log(Object.keys(data));
    const { id, slug, url, title, content, image, thumbnail, status, category, publishedAt, updatedAt, userId } = data;
    console.log(post_details);

    return post_details.innerHTML = `<div class="flex flex-col items-start w-full justify-between gap-5">
    <img src=${image} alternative=${title} class="float-left w-1/2 border"/>
    <span class="flex items-center gap-5"><span><span class="text-gray-600">Post Id :</span> <span class="bg-gray-100 p-3 rounded-full w-fit cursor-pointer">${id}</span> </span>
    <span><span class="text-gray-600">User Id :</span>  <span class="bg-gray-100 p-3 rounded-full w-fit cursor-pointer">${userId}</span></span></span>
    <h2 class="text-4xl font-semibold text-gray-700">${title}</h2>
    <span class="flex gap-5 items-center">
    <span class="bg-gray-100 p-1 px-3 rounded-full w-fit cursor-pointer"><span class="text-gray-600">Published At : </span>  ${publishedAt.split(" ")[0]}</span>
    <span class="bg-gray-100 p-1 px-3 rounded-full w-fit cursor-pointer"><span class="text-gray-600">Updated At : </span>  ${updatedAt.split(" ")[0]}</span>
    <span class="bg-green-100 p-1 px-3 rounded-full w-fit cursor-pointer"><span class="text-gray-600 ">Status :</span> <span class="text-green-500">${status}</span></span>
    </span>
    <p class="text-2xl text-justify">${content}</p>
    <span class="bg-gray-100 p-1 px-3 rounded-full w-fit cursor-pointer">category : ${category}</span>
    <button class="whitespace-nowrap py-2 px-5 border text-justify cursor-pointer bg-[chartreuse]/50" onclick="fetch_comments(${id})">Show Comments</button>
    <ul id="comments_sec" class="col-span-12 py-2 px-5 text-justify list-decimal pl-5 flex flex-col gap-5"></ul>
    </div>`;
}

const fetch_comments = async (post_id) => {
    try {
        let json_comments = await get_records("https://jsonplaceholder.org/comments");
        let comment_section = ``;
        let filtered_comments = json_comments.filter(
            (ele) => ele.postId === post_id
        );
        filtered_comments.map((ele) => {
            let comment = `<li>${ele.comment}</li>`;
            comment_section += comment;
        });
        // console.log(comment_section);
        let comments_empty = `<div class="text-yellow-800">No Comments there</div>`;
        return (document.getElementById("comments_sec").innerHTML =
            filtered_comments.length > 0 ? comment_section : comments_empty);
    } catch (error) {
        console.log(error);
        return error;
    }
};

//immediate invoked function expression
(async () => {
    let post_details = document.getElementById("post_details");
    // console.log(+window.location.pathname.split("/").pop());
    const post_id = +window.location.pathname.split("/").pop();
    let post_url = `https://jsonplaceholder.org/posts/${post_id}`;
    // console.log(post_url);
    let post_data = await get_records(post_url);
    await fetch_data(post_data);
})();
