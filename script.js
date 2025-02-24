function createJobCard(job) {
  const jobLink = document.createElement("a");
  jobLink.href = "#";
  jobLink.className = "jobs__item rounded-md bg-white";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "absolute";

  if (job.logo) {
    const jobLogo = document.createElement("img");
    jobLogo.src = job.logo || "assets/logos/default-logo.svg";
    jobLogo.alt = `${job.company} logo`;
    jobLogo.className =
      "item__img rounded-2xl relative top-[-25px] left-[25px]";
    imageWrapper.appendChild(jobLogo);
  }

  const contentContainer = document.createElement("div");
  contentContainer.className =
    "item__content min-h-[228px] px-[25px] pt-12 pb-10 flex justify-center flex-col";

  const headingTop = document.createElement("h4");
  headingTop.className = "item__heading-top text-darkGrey font-light";
  if (job.postedAt && job.postedAt !== "N/A") {
    headingTop.innerHTML = `${job.postedAt} <span class="px-2">•</span> ${job.contract}`;
  } else {
    headingTop.textContent = job.contract || "";
  }

  console.log(job.postedAt);

  const headingMain = document.createElement("h2");
  headingMain.className = "item__heading-main font-bold py-2 text-md";
  headingMain.textContent = job.position;

  const headingSub = document.createElement("h4");
  headingSub.className = "item__heading-sub text-darkGrey font-light";
  headingSub.textContent = job.company;

  const country = document.createElement("p");
  country.className = "item__contry text-violet mt-auto font-semibold text-sm";
  country.textContent = job.location;

  contentContainer.appendChild(headingTop);
  contentContainer.appendChild(headingMain);
  contentContainer.appendChild(headingSub);
  contentContainer.appendChild(country);

  jobLink.appendChild(imageWrapper);
  jobLink.appendChild(contentContainer);

  return jobLink;
}

function getTimeElapsed(postedAt) {
  if (!postedAt || postedAt === "N/A") {
    return "N/A";
  }

  const now = new Date();
  const postedDate = new Date(postedAt);

  if (isNaN(postedDate.getTime())) {
    return "N/A";
  }

  const diffInSeconds = Math.floor((now - postedDate) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * 60;
  const secondsInDay = 60 * 60 * 24;
  const secondsInWeek = 60 * 60 * 24 * 7;
  const secondsInMonth = 60 * 60 * 24 * 30;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}m ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}h ago`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} days ago`;
  } else if (diffInSeconds < secondsInMonth) {
    const weeks = Math.floor(diffInSeconds / secondsInWeek);
    return `${weeks} weeks ago`;
  } else {
    const months = Math.floor(diffInSeconds / secondsInMonth);
    return `${months} months ago`;
  }
}

const API_URL = "https://jsearch.p.rapidapi.com/search";
const API_HEADERS = {
  "X-RapidAPI-Key": "53325f01b9msh60377af4363b71dp1e5360jsn71d45a97d198",
  "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
};

async function fetchJobs(query = "software engineer") {
  try {
    const response = await fetch(`${API_URL}?query=${query}&num_pages=1`, {
      method: "GET",
      headers: API_HEADERS,
    });
    if (!response.ok)
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function populateJobs(jobs) {
  const jobsContainer = document.querySelector(".jobs__items");
  jobsContainer.innerHTML = "";

  jobs.forEach((job) => {
    const jobData = {
      logo: job.employer_logo || "",
      company: job.employer_name,
      position: job.job_title,
      postedAt: getTimeElapsed(job.job_posted_at_datetime_utc),
      contract: job.job_employment_type || "N/A",
      location: job.job_country || "N/A",
    };

    const jobCard = createJobCard(jobData);
    jobsContainer.appendChild(jobCard);
  });
}

(async function init() {
  const jobs = await fetchJobs();
  populateJobs(jobs);
})();
