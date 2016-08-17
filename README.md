###Going forward we are merging our branches into the 'working' branch.
- We will use the working branch to test our changes as a team before we merge working into master.
- Thus, master will always be functional and hopefully bug-free!

Note: This is easy to do, but also easy to forget. When you submit a pull request just be sure that your 'base' branch dropdown is set to 'working' and not 'master'.

----------

https://docs.google.com/spreadsheets/d/16IxZ8lJr8j_VHQySW8rdTueaeK7XSBh6oqZ1E0bHWhw/edit?usp=sharing

//////////////////////////

Using Git for Project:

Initial setup, only have to do once: "$ git clone [url]". This creates a new folder, so have to: "cd [new folder]" to navigate where you need to be.

To begin work on a new issue branch:

1.  In [master] (use "$ git checkout master" if not in [master] : "$ git pull origin master". This insures that you have the most up-to-date versions of the files.
2.  "$ git checkout -b [issue#_description]". This creates and switches you to the new branch which will be named something like "10_addCSStoInputs".
3.  Do your work. When done, use the usual add ., commit -m, and push origin [branchname].
4.  Go to GitHub, switch to your new branch, and create pull request.	

//////////////////////////

The Breakfast Club
Team Members: Gregory  Katchmar (launch driver), Cheryl Cruz, Jade Dhabolt, Nathan Pickard, Rosemary Joe

Problem Statement: Yelp doesn’t allow a method to see when restaurants are open at a future time

Scope: limited to weekend brunch restaurants

Project Pitch: app lets user input desired time, preferred neighborhood, maybe get browser location to show nearby restaurants (if doable), provides links to restaurant website, provide user opportunity to review app, use a Google Map of all locations and also filter by time and neighborhood, maybe have short cuisine/price description/photos?


First page: location awareness provides list of nearby restaurants (if user opts to allow), then provides user opportunity to launch refined search or Google Map
Second page: user can enter time and neighborhood to get a different set of restaurants
Third page: Google Map of the restaurants

All restaurants will be linked to their website

Store last user’s settings in local storage.

//////////////////////////

Final Project Rules and Process

For your final project, your task is to work with a team to build a web site that simulates a real-world product, service, or game.

Rules:

Your team must adhere to the following requirements.

There can be no more than 4 people per team.
Each person must make meaningful contributions in HTML, CSS, and JavaScript.
Your web site must have at least 3 interlinked pages and clear navigation.
Your web site must have at least 2 pages that accept and process user input.
Your web site's state must persist between page reloads.
Your web site must be deployed live on the Internet.

Process:

Here's the process that we'll be using for project week. 1. On the first day of project week, your team must submit a proposal to an instructor. 2. During project week, your team must work on-campus so we can help whenever your team is stuck. 3. On the last day of project week, your team must present your project in front of the class.

Here are some tips on how to organize your team during the launch phase.

Elect a Launch Driver who will be responsible for the following:
Driving the coding of the initial scaffolding phase.
Hosting the code under their GitHub account (or create a new GitHub organization for your team and an organizational repo for the project)
The rest of the team will be Launch Navigators and responsible for the following:
Navigating the coding of the initial scaffolding phase.
Staying one-step ahead of the Launch Driver by researching unfamiliar technology.
Once everyone is in agreement, here's how to launch a new project.
Build a basic file scaffold from scratch as a team.
Initialize a new git repository (in a personal or organization account).
Push it to GitHub and add your team members as Collaborators.
Make a plan, and get to work!

//////////////////////////

Class 15 - Project Week: Milestone 2

Development phase

Now that your project is launched, here's how to organize the development efforts of your team:

Use GitHub Issues or another project management tracker to manage and divide up the work between your team members.
Create new issues that'll take between 30 minutes - 4 hours to complete.
Use labels and milestones as your team sees fit, but leave all newly created issues unassigned.
Assign an issue to yourself when you commit to working on it.
Once assigned, create a branch using the following naming scheme:
Imagine issue #1 is titled "Add an about.html page".
The branch name would be 1_add_about_page.
Push the commits on your branch to GitHub regularly.
Create a Pull Request for your branch even if you're unsure if it'll be merged into master.
Ask someone else on your team to review the code in your Pull Request.
If changes are required, make them on your branch and push them to GitHub for another review.
Once satisfied, let the reviewer merge your Pull Request. Don't merge your own Pull Request.
This should be a huge day of productivity, with tons of code written and projects truly beginning to take shape. A few helpful safety tips:

Be deliberate and careful with Git. Stick to the plans and processes you set out Monday. Know that there will be glitches that happen, particularly merge conflicts. No worries, just resolve them as they appear.

Don't forget that pair programming is a great way to keep things moving forward and to keep everyone on the team engaged and fresh.

Get up from your laptops and walk around from time to time. Frequent breaks enhance productivity.

Have regular meetings with your teams, away from laptops, to discuss process and product and make sure everyone is comfortable and clear with how things are going.

Always keep the experience of your end user in mind. Deliberately take time to view your app as if you are seeing it for the very first time.

Most important: Be focused and relentless toward achieving your core functionality. By now you should have identified your biggest challenges and toughest problems. Solve them this morning if you have not solved them already. Do not get lured by the siren song of CSS and images and making things pretty. Save that for later unless your team is already solidly on the way to MVP.

