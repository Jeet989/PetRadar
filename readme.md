# PetRadar

> PetRadar is a mobile based application which helps to find lost pets with their owners. Here the owner will create a post which will have a basic information about where the pet was last located and then the post will be shared with the other users via location based feeds. Once the owner posts the feed, all other users within that range will receive a push notification about the lost pet. Once a samaritan has found the pet they can scan the QR Code (generated at time of pet registration) and the owner can be notified about the pet being found by using the contact information provided by the owner at the time of registration.

## Key Features of the Application

- OAuth Authentication using Google
- Google Maps
- Location Based Feeds
- Push Notification Service
- QR Code
- Native Calling Feature

## Tools & Technologies Used

- [![React Native][ReactNative]][ReactNative-url]
- [![Spring Boot][SpringBoot]][SpringBoot-url]
- [![Google Maps][GoogleMaps]][GoogleMaps-url]
- [![OneSignal][OneSignal]][OneSignal-url]
- [![Firebase][Firebase]][Firebase-url]
- [![AWSS3][AWSS3]][AWSS3-url]

[ReactNative]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev/
[SpringBoot]: https://img.shields.io/badge/spring_boot-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white
[SpringBoot-url]: https://spring.io/projects/spring-boot
[GoogleMaps]: https://img.shields.io/badge/google_maps-%234285F4.svg?style=for-the-badge&logo=google-maps&logoColor=white
[GoogleMaps-url]: https://cloud.google.com/maps-platform
[OneSignal]: https://img.shields.io/badge/OneSignal-%2300B0FF.svg?style=for-the-badge&logo=OneSignal&logoColor=white
[OneSignal-url]: https://onesignal.com/
[Firebase]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[Firebase-url]: https://firebase.google.com/
[AWSS3]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWSS3-url]: https://aws.amazon.com/

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Java](https://www.java.com/en/)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)
- [AWS Account](https://aws.amazon.com/)
- [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [OneSignal API Key](https://onesignal.com/)
- [Firebase API Key](https://firebase.google.com/)

### Clone

- Clone this repo to your local machine using `git clone https://github.com/Jeet989/PetRadar.git`

### Setup

> Run the backend application

```shell
$ cd backend && mvn spring-boot:run
```

> Install npm packages

```shell
$ cd frontend && npm install
```

> Install pod dependencies

```shell
$ cd ios && pod install && cd ..
```

> Run the mobile application

```shell
$ npm react-native run-android
```

## Use Case Scenario

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

## Team

- [Jeet Mehta](https://github.com/Jeet989) - Banner Id: B00945900
- [Sankeerth Rani](https://github.com/) - Banner Id: B00932027
- [Dhruvin Dankhara](https://github.com/) - Banner Id: B00926164
- [Parshva Shah](https://github.com/) - Banner Id: B00928689
- [Lokeshwar Tabjula](https://github.com/lokeshwartabjula) - Banner Id: B00936909
