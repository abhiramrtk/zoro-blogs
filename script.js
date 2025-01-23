// Theme switcher functionality
const themeIcon = document.querySelector('#theme-icon i'); // Target the <i> tag inside the #theme-icon
const themeStylesheet = document.getElementById('theme-stylesheet');

themeIcon.addEventListener('click', () => {
  if (themeStylesheet.href.includes('light.css')) {
    themeStylesheet.href = 'dark.css';
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon'); // Show sun for dark mode
  } else {
    themeStylesheet.href = 'light.css';
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun'); // Show moon for light mode
  }
});



// Blog data and switching functionality
let blogs = [];
let currentBlogIndex = 0;

const blogTitle = document.getElementById('blog-title');
const blogContent = document.getElementById('blog-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Load blogs from JSON file
fetch('blogs.json')
  .then((response) => response.json())
  .then((data) => {
    blogs = data;
    displayBlog(currentBlogIndex);
  })
  .catch((error) => {
    console.error('Error loading blogs:', error);
    blogTitle.textContent = 'Error loading blogs.';
    blogContent.textContent = 'Please try again later.';
  });

function displayBlog(index) {
  if (blogs.length > 0) {
    blogTitle.textContent = blogs[index].title;
    blogContent.textContent = blogs[index].content;
  }
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
  if (blogs.length > 0) {
    currentBlogIndex = (currentBlogIndex - 1 + blogs.length) % blogs.length;
    displayBlog(currentBlogIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (blogs.length > 0) {
    currentBlogIndex = (currentBlogIndex + 1) % blogs.length;
    displayBlog(currentBlogIndex);
  }
});

// Create new blog functionality
const createBlogForm = document.getElementById('create-blog-form');

createBlogForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTitle = document.getElementById('title').value;
  const newContent = document.getElementById('content').value;

  blogs.push({ title: newTitle, content: newContent });

  alert('Blog published successfully!');
  createBlogForm.reset();
});
