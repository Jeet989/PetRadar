# PetRadar_Web

This repository contains the code of Web app for the project PETRADAR (Client Team - 4 and Development Team - 1). For this project we have used React JS Workflow for developing this application.

To access the backend of this application here is the link to that repository [PetRadar Backend](https://git.cs.dal.ca/jeet/petradar-fn/-/tree/clientBuild)

To access the web page of this application here is the link to that repository [PetRadar Frontend](https://git.cs.dal.ca/jeet/petradar-fn/-/tree/clientBuild)

## Installation for React Environment
Follow the steps for creating the development environment for this project:

### Step 1: Install Node Modules
- React JS requires Node.js to be installed on your machine. You can download it from the official Node.js website: [Node.js](https://nodejs.org/en/download/) Use the following code for installing node modules.
    -  The first command will add all the dependencies of node modules 
    -  By running the second command you can use second command to know the latest version of node modules
 
```sh
1. nvm install lts
```

```sh
2. node -v
```

### Step 2: Install a Code Editor:
- You can use any code editor of your choice. Some popular ones for React JS development include Visual Studio Code, Atom, and Sublime Text.

### Step 3: Install the latest version of react
- To install React, you can use the open your terminal and run the following command:

```sh
npm install react react-dom
```

OR

If you're using yarn:
```sh
yarn add react react-dom
```

Installing :

If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` or `yarn global remove create-react-app` to ensure that npx always uses the latest version. Finally, install the latest version of react by following the above mentioned commands.

Once the Environment is set-up in your system you can open the project and you can run the following commands in your terminal:

1. The below command will download all the dependencies present in package.json file to run the project:
```sh
npm install
```
2. The below command will start the web-app in your browser 
```sh
npm start
```
**Note**: If you directly run the `npm start` command then it will show the below image see **Figure 1** below because it will start running in local without data. As our Web-app is expecting the data from scanning the QR code, you need to scan the QR code to get the data.

![Demo Pet Details WebPage](https://i.postimg.cc/MZdw1y9v/Whats-App-Image-2023-04-09-at-7-47-41-PM.jpg)
        **Figure 1**

#### QR image:
- Once you scan the QR code(as shown in the **Figure 2**), it will direct you to the web-app page. The page will look as seen in **Figure 3**.

![QR image](https://i.postimg.cc/jqHQxYHr/Whats-App-Image-2023-04-09-at-8-46-01-PM.jpg)
  **Figure 2**


Pet-radar web is a page in mobile view for the people who find pets in their locality and once they scan the QR code, they will get directed to this web-page see Figure 3. Here, they will be able to see the pet image, name, gender, and age. Morever, there are 3 options given on the web-page and they will have the CTAs like Call pet owner, Near by facility and Pet history.

![Show Pet Details on Web Page](https://i.postimg.cc/L4B0b4Sg/Whats-App-Image-2023-04-09-at-7-03-58-PM-6.jpg)
    **Figure 3**

#### Functionality
- If an individual clicks on the Call pet owner button then they will be able to directly call the owner and can inform the pet owner about the pet that is found, see below image.

[![Phone Dialer](https://i.postimg.cc/vmb0y8Kk/Whats-App-Image-2023-04-09-at-8-45-22-PM.jpg)]

- The second button will help the individual direct to the google map and it will provide the location of all the nearby animal facilities, see below image. 

![Nearby Facilities](https://i.postimg.cc/xdsxfDMR/Whats-App-Image-2023-04-09-at-8-52-43-PM.jpg)

- The third button Pet history doesn't respond as the module for pet history is available but the API integration is yet to be implemented.


### Use Case Scenario


#### Onboarding Screen
[![Onboarding Screen](https://i.postimg.cc/cJ70kyLx/Whats-App-Image-2023-04-09-at-7-03-58-PM.jpg)](https://postimg.cc/qt7PgFKS)
<br />
Welcome Page of our App, see above figure. If you have installed our app for the first time you can start with the signup process. If you are already an existing user then you can click on the login button.
<br />
<br />

#### Signup Screen
[![Signup Screen](https://i.postimg.cc/d1tRLF7D/Whats-App-Image-2023-04-09-at-7-03-58-PM-1.jpg)](https://postimg.cc/WDCqHQwP)
<br />
If you are using our app for the first time then by clicking on the signup button on the landing page you will get navigated to the signup page, see above figure. You can signup by entering your email id and password.
<br />
<br />

#### Signup via Google Authentication
[![Signup via Google Authentication](https://i.postimg.cc/j52bvWwT/Whats-App-Image-2023-04-09-at-7-19-29-PM.jpg)](https://postimg.cc/f3GpRRfq)
<br />
There is also one more option for signup with Google as shown in above figure.
<br />
<br />

#### Login Page
[![Login Page](https://i.postimg.cc/qRjP3pjF/Whats-App-Image-2023-04-09-at-7-03-58-PM-3.jpg)](https://postimg.cc/PpvVGnGb)
<br />
If you are already our user you can select the login button from the landing page and the you will be directed to our login page see above figure. You can also login via the Google Authentication.
<br />
<br />

#### Creating User Profile
[![Creating User Profile](https://i.postimg.cc/Hs4hcYn9/Whats-App-Image-2023-04-09-at-7-03-58-PM-4.jpg)](https://postimg.cc/qzqLWd8N)
<br />
After signing up, you will be directed to create your profile in the app. Here you will be prompted to add your details like first name, last name, email (automatically fetched from signup), address, city, pin code, and phone number as shown in above figure.
<br />
<br />

#### Creating Pet Profile
[![Creating Pet Profile](https://i.postimg.cc/59HZKW0w/Whats-App-Image-2023-04-09-at-7-03-58-PM-5.jpg)](https://postimg.cc/NLcJLVRM)
<br />
Once user profile is registered you will be prompted to create your pet’s profile by entering the details as per the requirement as shown in above figure. Once all the details are filled up then you can click on save button.
<br />
<br />

#### Add Medical History
[![Adding Medical History](https://i.postimg.cc/XJKy4zNx/Whats-App-Image-2023-04-09-at-7-03-57-PM.jpg)](https://postimg.cc/bDJvRLt2)
<br />
Once the pet profile is created then it will be directed to adding the medical history for the pet. See above figure, it contains a form where the user can add the medical history of his own pet which also includes the Vet visit date as well the vaccination date of his pet.
<br />
<br />

#### Show Pet Details on Web Page
[![Show Pet Details on Web Page](https://i.postimg.cc/L4B0b4Sg/Whats-App-Image-2023-04-09-at-7-03-58-PM-6.jpg)](https://postimg.cc/Dm0gWT87)
[![Phone Dialer](https://i.postimg.cc/vmb0y8Kk/Whats-App-Image-2023-04-09-at-8-45-22-PM.jpg)](https://postimg.cc/jD3HQTt4)
<br />
If the person scans the QR code of a pet then it will pop up the pet details in the web page itself. The pet details will be displayed like this, see above figure. Here it will display the pet’s profile image, name, gender, and age. Here the person will get the call-to-action buttons for Calling pet owner, Nearby facilities and pet medical history for the pet. Here on pressing the call to owner the native phone's dialer is shown as shown in above figure.
<br />
<br />

#### Creating the post for lost pets
[![Creating the post for lost pets](https://i.postimg.cc/BbL5sCyv/Whats-App-Image-2023-03-21-at-1-39-01-PM.jpg)](https://postimg.cc/vxyxt5GR)
[![Whats-App-Image-2023-04-09-at-8-50-34-PM.jpg](https://i.postimg.cc/MZfZVzsh/Whats-App-Image-2023-04-09-at-8-50-34-PM.jpg)](https://postimg.cc/5j1MMWW3)
<br />
If the user losses his pet then he can upload a picture of his pet then he can upload picture of the pet and add a description along with selecting the location so that other registered users will get notified in that locality. See above figure, for the add post screen. Here the location will be selected based on the user's pin drop on the map.
<br />
<br />

#### Post Screen
[![Post Screen](https://i.postimg.cc/8CxCLL42/Whats-App-Image-2023-04-09-at-7-37-36-PM.jpg)](https://postimg.cc/TyqG6LZ0)
<br />
If multiple posts are made together then all the registered pet owners can see all the posts and recognize the latest pet updates about the locality. And if the owner finds his pet then he can also confirm that his pet is found from the above option, see above figure. Once the user confirms it the post will be disappeared from the feed screen automatically.
<br />
<br />

#### Pet Details Screen
[![Pet Details Screen](https://i.postimg.cc/VNW7CFz6/Whats-App-Image-2023-04-09-at-7-03-57-PM-1.jpg)](https://postimg.cc/nsMY8Bjb)
<br />
See above figure, it shows the pet details screen which consists of all the pet details like name, breed, gender, age, description, and pet image. Moreover, if you click on the ‘Show Medical Records’ button then it will direct you to the medical history of the pet. By clicking ‘Update details’ you will be redirected to the pet profile screen
<br />
<br />

#### Update Pet Details Screen
[![Update Pet Details Screen](https://i.postimg.cc/767SzH3N/Whats-App-Image-2023-04-09-at-7-03-57-PM-2.jpg)](https://postimg.cc/8JpFQVnF)
[![Update Pet Details Screen 2](https://i.postimg.cc/Nf5yWGVf/Whats-App-Image-2023-04-09-at-7-03-57-PM-4.jpg)](https://postimg.cc/CzpL80SW)
<br />
As it can be seen from above figure, we can edit the pet details if we have entered something wrong while registering the pet. Hereafter editing all the details of the pet you can scroll down the page and then there are two options available see above second figure. There are two options once you open the update pet details page. While selecting the ‘Show Pet QR Code’ a QR image will pop up and that will be a unique code for each registered pet. While scanning the QR code it will be directed to the web page as shown in above step of Show Pet Details on Web Page.
<br />
<br />

#### Pet Found or Not?
[![Pet Found or Not](https://i.postimg.cc/Nf1YzW4P/Whats-App-Image-2023-04-09-at-7-03-59-PM-1.jpg)](https://postimg.cc/bsNKGV4Q)
[![Pet QR Code](https://i.postimg.cc/jqHQxYHr/Whats-App-Image-2023-04-09-at-8-46-01-PM.jpg)](https://postimg.cc/8sCr43Xy)
<br />
If the user finds the pet then he can select the option ‘Found?’ and then they will get two options, see figure and they can update about the status of the pet. Once they select ‘Yes!!! Found It’ the post will be disappeared from the feed screen from all the registered users. Here a QR is also shown to the owners who are not the owner of that post/feed. This QR code helps them to easily contact the pet owner as shown in the above figure.
<br />
<br />

#### Profile Screen
[![Profile Screen](https://i.postimg.cc/xjXLMPRd/Whats-App-Image-2023-04-09-at-7-03-57-PM-3.jpg)](https://postimg.cc/vDd1dfCR)
<br />
If you click on the third icon it will direct you to the profile settings page, see above figure. Here, it shows the options of updating the ‘Personal Details’, ‘Your Posts’, update ‘Pet Details’, ‘Notification’ access, and ‘Delete Account’ options. If you are not using the app frequently then you can also click on the ‘Logout’ option and it will log out of your account.

##### [Presentation Link](https://git.cs.dal.ca/courses/2023-winter/csci-5308/group01/-/tree/production)
##### [Contribution Statement Link](https://git.cs.dal.ca/courses/2023-winter/csci-5308/group01/-/tree/production)
##### [Project Assessment Sheet Link](https://git.cs.dal.ca/courses/2023-winter/csci-5308/group01/-/tree/production)

### Development Team
- Group 1

### Contributors
- [Jeet Mehta](mailto:jt429386@dal.ca) Banner Id: B00945900
- [Sankeerth Rani](mailto:sn501304@dal.ca) Banner Id: B00932027
- [Dhruvin Dankara](mailto:dh793203@dal.ca) Banner Id: B00926164
- [Parshva Shah](mailto:pr371441@dal.ca) Banner Id: B00928689
- [Lokeshwar Tabjula](mailto:lk544219@dal.ca) Banner Id: B00936909

### TA
- [Anirudh Hosur](mailto:an516658@dal.ca)

## Refrences:
- “Download | Node.js,” Node.js, 2023. [Online]. Available: https://nodejs.org/en/download.         [Accessed: Apr. 09, 2023]
- “Start a New React Project – React,” React.dev, 2023. [Online]. Available: https://react.dev/learn/start-a-new-react-project. [Accessed: Apr. 09, 2023]
‌ 

