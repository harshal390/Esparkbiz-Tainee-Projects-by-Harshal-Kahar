const get_records = async (url) => {
  try {
    let data = await fetch(url);
    let json_data = await data.json();
    return json_data;
  } catch (error) {
    console.log(error);
  }
};

const fetch_data = async (data, initial_value, ending_value) => {
  let posts = `<div class="[&>*:nth-child(odd)]:bg-[chartreuse]/50 [&>*:nth-child(even)]:bg-[#00ffff]/50 grid grid-cols-12">
        <span class="py-2 px-5 border">Post ID :</span>
        <span class="py-2 px-5 border">User ID : </span>
        <span class="py-2 px-5 border">Status: </span>
        <span class="py-2 px-5 border">Category: </span>
        <span class="py-2 px-5 border">Published At: </span>
        <span class="py-2 px-5 border">Updated At: </span>
        <span class="py-2 px-5  border col-span-2">Title :</span>
        <span class="py-2 px-5  border">Image :</span>
        <p class="py-2 px-5  border col-span-2 text-lg"> Content : </p>
        <div></div>
        </div>`;

  data.slice(initial_value, ending_value).map((ele) => {
    const { id, slug, url, title, content, image, thumbnail, status, category, publishedAt, updatedAt, userId } = { ...ele };
    posts += `<div class="grid grid-cols-12 border text-sm">
            <span class="py-2 px-5"> ${id}</span>
            <span class="py-2 px-5 border">${userId} </span>
            <span class="py-2 px-5 border">${status} </span>
            <span class="py-2 px-5 border">${category} </span>
            <span class="py-2 px-5 border">${publishedAt} </span>
            <span class="py-2 px-5 border">${updatedAt} </span>
            <span class="py-2 px-5 border col-span-2">${title}</span>
           <span class="border"><img src=${image} class="border"/></span> 
            <p class="py-2 px-5 border col-span-2 text-justify text-xs"> ${slice_content(
      content,
      140
    )}...</p>
            <div class="py-2 px-5"> <a href="/spa/posts/${id}" class="whitespace-nowrap mt-5 py-2 px-5 border text-justify cursor-pointer bg-[chartreuse]/50"> View Details</a></div>
            </div>`;
    return;
  });
  //for displaying grid table to the ejs file
  return (post_content.innerHTML = posts);
};

const length_of_records = async (url) => {
  try {
    let data = await fetch(url);
    let json_data = await data.json();
    return json_data.length;
  } catch (error) {
    console.log(error);
  }
};

const slice_content = (contnet, max_length) => {
  let trimmedString = contnet.substring(0, max_length);
  trimmedString = trimmedString.substring(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );
  // console.log(trimmedString);
  return trimmedString;
};

(async () => {
  let records_arr = await get_records("https://jsonplaceholder.org/posts");
  let filtered_data = records_arr;
  let total_records = filtered_data.length;
  let particular_records = 6;
  let pages = Math.ceil(total_records / particular_records);
  let value = +sessionStorage.getItem("page-value")
    ? +sessionStorage.getItem("page-value")
    : 1;

  //buttons
  let prev = document.getElementById("prev");
  let next = document.getElementById("next");
  let double_prev = document.getElementById("double_prev");
  let double_next = document.getElementById("double_next");
  let count = document.getElementById("count");

  //searching button

  let search_btn = document.getElementById("search_btn");

  const filterPosts = async () => {
    let search_input = document.getElementById("search_input");
    let input_value = search_input.value.toLowerCase();
    filtered_data = records_arr.filter(
      (ele) =>
        ele.id == input_value ||
        ele.userId == input_value ||
        ele.content.toLowerCase().includes(input_value) ||
        ele.slug.toLowerCase().includes(input_value) ||
        ele.title.toLowerCase().includes(input_value) ||
        ele.status.toLowerCase().includes(input_value) ||
        ele.category.toLowerCase().includes(input_value) ||
        ele.publishedAt.toLowerCase().includes(input_value) ||
        ele.updatedAt.toLowerCase().includes(input_value)
    );
    // console.log(records_arr, filtered_data);
    await fetch_data(
      filtered_data,
      particular_records * value - particular_records,
      particular_records * value
    );
    total_records = filtered_data.length;
    pages = Math.ceil(total_records / particular_records);
    value = pages === 0 ? 0 : 1;
    // console.log(total_records, pages, value);
    sessionStorage.setItem("page-value", value);
    count.innerText = +value;
    check_condition();
    return true;
  };

  const check_condition = () => {
    prev.classList.remove("disable");
    double_prev.classList.remove("disable");
    next.classList.remove("disable");
    double_next.classList.remove("disable");
    //condition for disable button
    if (value == 0) {
      console.log(value);
      prev.classList.add("disable");
      double_prev.classList.add("disable");
      next.classList.add("disable");
      double_next.classList.add("disable");
    }
    if (value == 1) {
      console.log(value);
      prev.classList.add("disable");
      double_prev.classList.add("disable");
    }
    if (value == pages) {
      console.log(value);
      next.classList.add("disable");
      double_next.classList.add("disable");
    }
  };

  await fetch_data(
    filtered_data,
    particular_records * value - particular_records,
    particular_records * value
  );

  //update when page is refresing
  count.innerText = +value;
  check_condition();

  const nextPage = async () => {
    console.log("next click");
    if (value > 0 && value < pages) {
      ++value;
      await fetch_data(
        filtered_data,
        particular_records * value - particular_records,
        particular_records * value
      );
      count.innerText = value;
      sessionStorage.setItem("page-value", value);
      check_condition();
      return value;
    }
  };

  const prevPage = async () => {
    console.log("prev click");
    if (value <= pages && value > 1) {
      --value;
      await fetch_data(
        filtered_data,
        particular_records * value - particular_records,
        particular_records * value
      );
      count.innerText = value;
      sessionStorage.setItem("page-value", value);
      check_condition();
      return value;
    }
  };

  const startingPage = async () => {
    console.log("starting page");
    if (value <= pages && value > 1) {
      //reset value of page
      value = 1;
      await fetch_data(
        filtered_data,
        particular_records * value - particular_records,
        particular_records * value
      );
      count.innerText = value;
      sessionStorage.setItem("page-value", value);
      check_condition();
      return value;
    }
  };

  const endingPage = async () => {
    console.log("ending page");
    if (value > 0 && value < pages) {
      value = pages;
      await fetch_data(
        filtered_data,
        particular_records * value - particular_records,
        particular_records * value
      );
      count.innerText = value;
      sessionStorage.setItem("page-value", value);
      check_condition();
      return value;
    }
  };

  // event handling
  prev.addEventListener("click", () => prevPage());
  next.addEventListener("click", () => nextPage());
  double_prev.addEventListener("click", () => startingPage());
  double_next.addEventListener("click", () => endingPage());
  search_btn.addEventListener("click", () => filterPosts());
  document
    .getElementById("search_input")
    .addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        filterPosts();
      }
    });
})();
