# Pet Radar Mobile Application

This repository contains the code of mobile application for the project PETRADAR. For this project we have used Bare React Native Workflow for developing this application.

### These steps are for the users having OS as MAC

-  Open terminal
-  Install node `brew install node`
-  Install watchman `brew install watchman`
-  Install Java Development Kit `brew tap homebrew/cask-versions` `brew install --cask zulu11`
-  Install [Android Studio](https://developer.android.com/studio) . From here install the latest Android Studio 
-  While Installing the Android Studio make sure to check mark these items:
    - Android SDK
    - Android SDK Platform
    - Android Virtual Device
- Install Android SDK (Tiramisu SDK). 
    - Open Android Studio
    - Open Preferences Dialog
    - Inside that open Appearance & Behavior
    - Open System Settings
    - Open Android SDK
    - Now check mark 
        - `Android SDK Platform 33` 
        - `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image` or `(for Apple M1 Silicon) Google APIs ARM 64 v8a System Image`
- Now Select `SDK Tools` tab and check the box next to `Show Package Details`.
- Expand `Android SDK Build-Tools` then make sure that `33.0.0` is selected.
- Click `Apply` to download and install.
- Configure `ANDROID_HOME` environment variable.
- For Troubleshooting visit this official website: [React Native Troubleshooting](https://reactnative.dev/docs/environment-setup?guide=native&platform=android)
- Install yarn `brew install yarn`

### These steps are for the users having OS as WINDOWS

- Install [Nodejs](https://nodejs.org/en/download) . Here download the LTS version.
- Install [Java Development Kit](https://www.oracle.com/ca-en/java/technologies/downloads/) . Download JAVA 17.
- Install [Android Studio](https://developer.android.com/studio) . From here install the latest Android Studio.
- While installing Android Studio make sure to mark these checkboxes `Android SDK`, `Android SDK Platform`, `Android Virtual Device`
- Install Android SDK (Tiramisu SDK)
    - Open Android Studio
    - Open More Actions Dialog
    - Open SDK Manager
    - Now you will be on this path Appearance & Behavior -> System Settings -> Android SDK
    - Select SDK Platforms
    - Check `Show Package Details` from bottom right corner
    - Now expand `Android 13 (Tiramisu)`
    - Make sure following things are checked: `Android SDK Platform 33` and `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image`.
    - Now select `SDK Tools` check on `Show Package Details` 
    - Expand `Android SDK Build-Tools` and make sure `33.0.0` is selected.
- Configure `ANDROID_HOME` environment path
- For Troubleshooting visit this official website: [React Native Troubleshooting](https://reactnative.dev/docs/environment-setup?guide=native&platform=android&os=windows)
- Install yarn `brew install yarn`

### Dependencies used for developing this project

- Yarn 
- Nodejs
- Java
- NPM (Node Package Manager)

### Services used for developing this project

- Firebase
- Google Maps
- Onesignal
- Geolocation Service

### Notes for running app locally

- Clone this repository [PetRadar](https://git.cs.dal.ca/jeet/petradar-fn.git)
- Go inside project folder
- Checkout to development
- Run this command `yarn install --no-cache`
- Start the emulator from android studio or connect your device to the pc (make sure you use only ANDROID device as to use IOS device we need to buy the basic apple developer plan)
- Once device connected make sure you have android debugging enabled in mobile device. You can activate this via going to developer options in android device.
- Once everything is done run this command `yarn react-native run-android`

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
