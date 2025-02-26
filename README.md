# VIA Outdoors

### Share your outdoor adventures!

# Description

VIA Outdoors is a forum that enables users to browse posts created by other users, like said posts and comment on them.

Each user's profile information can be edited - you can add/change your profile picture as well!

# Structure

### Home

![Home](/READMEimgs/image.png)

This is where users can browse posts and sort/filter them. You can click "Show More" to see the full post or "Delete" to directly delete it if it is your own post.

If you are logged in, you will see all posts and will be able to click "Show More". Also, you will be able to create a post from the Home page.

![Dropdown menu](/READMEimgs/image-9.png)

Clicking on your avatar will open a dropdown menu of options.

### Create Post

![Create Post](/READMEimgs/image-1.png)

Here you can set the title and content of the post you would like to create. Clicking on Create Post will upload the post and redirect you to Home. Clicking on Back will return you to the last page you were on.

### Single Post

![Single Post](/READMEimgs/image-5.png)

Clicking on any post's "Show More" button will redirect you to this page. You can find more information about the post and leave/view comments left on it.

### My Profile

![My Profile](/READMEimgs/image-2.png)

My profile shows you all the information about your profile and allows you to edit it. Here you also have the option to delete your profile.

### My Posts & My Comments

![My Posts](/READMEimgs/image-3.png)

![My Comments](/READMEimgs/image-4.png)

My posts is pretty self-explanatory, as is My Comments - they show the logged user's posts and comments.

### Admin Dashboard

![Admin Dashboard](/READMEimgs/image-7.png)

If you are an admin, you will be able to access the admin dashboard.

![Users](/READMEimgs/image-6.png)

![Posts](/READMEimgs/image-8.png)

When clicking on the admin dashboard, you are redirected to a page where you can select to see all users or all posts. There you can edit/remove posts and admin/unadmin/block/unblock/delete users.

# How to install locally

Since the page isn't hosted, you have to locally run the code. The database is handled by Firebase Realtime Database. 

Requirements: VSCode, Git Bash

### Step 1

![GitHub repo link](/READMEimgs/image-10.png)

Copy the github repo link or use the link below:

https://github.com/GIPHY-Web-Team-Project/VIA-Outdoor-Forum.git


### Step 2

Go in the directory you want to run the code in. Right-click on an empty space in that directory (not on any icon/folder/app) and select "Open Git Bash here".

### Step 3

![Empty Git Bash](/READMEimgs/image-11.png)

In the Git Bash Console, write

`git clone https://github.com/GIPHY-Web-Team-Project/VIA-Outdoor-Forum.git`

![Written Git Bash](/READMEimgs/image-12.png)

You can close the Git Bash Window after it is done.

### Step 4

Open the newly-created folder inside of Visual Studio Code and open a terminal with the directory set to the VIA-OUTDOOR-FORUM folder.

### Step 5

In the console, type:

`npm install`

and press Enter. When that is finished, type:

`npm run dev`

and wait for it to finish.

### Step 6

![console-finished](/READMEimgs/image-13.png)

Open the provided link in the console to view the website and interact with it!