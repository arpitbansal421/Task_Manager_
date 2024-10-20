![image](https://github.com/user-attachments/assets/f993254e-4ccc-4a24-9daf-390d2882f2c1)
Hi Have build this Task Manager using React.js, Tailwind Css, JavaScript, React hook. We can Schedule our Task on the Basis of Todo, Doing, Done
Also We priortize our Task and filter all high priority, low Priority Task.

**Steps for creation of Task Manager**
Initialize Project: I started by setting up a React.js project using create-react-app. This bootstrapped my application with the required dependencies.

Set Up State Management:

I used React’s useState hook to manage various states such as tasks, the task being dragged, task priority, and filters.
Separate states for TODO, DOING, and DONE tasks were created to organize the board.
Add Task Functionality: I implemented an input field for adding new tasks. On pressing Enter or clicking the "Add Task" button, tasks are created with a default priority and added to the TODO column.

Task Prioritization: Each task was given a priority (Low, Medium, or High), and I added dropdowns to allow changing priorities for each task dynamically.

Drag-and-Drop for Task Management: I added drag-and-drop functionality so that tasks can be moved between the TODO, DOING, and DONE columns. This involved using drag and drop events.

Task Filtering: I implemented dropdown filters that allow users to view tasks based on their priority in each column (TODO, DOING, DONE).

Task Editing and Deletion:

Tasks can be edited by clicking the ✏️ icon, which allows users to update task titles and priorities.
Tasks can be deleted by clicking the 🗑️ icon.
Filter and Sorting Logic: For filtering tasks by priority, I wrote a function that sorts tasks based on the selected priority and status (TODO, DOING, DONE).
