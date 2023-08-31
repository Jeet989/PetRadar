# Pet Radar (Backend Application) - Group 1

This repository contains the code of backend application for the project PETRADAR (Client Team - 4 and Development Team - 1). For this project we have used Springboot, mysql & AWS for developing this application.

To access the Frontend (Mobile Application) of this application here is the link to that repository [PetRadar FrontEnd](https://git.cs.dal.ca/jeet/petradar-fn.git)

To access the web page of this application here is the link to that repository [PetRadar Web](https://git.cs.dal.ca/parshva/petradar_web.git)

## Requirements / Dependencies

For building and running the application you need:

- [JDK 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Maven 3](https://maven.apache.org)

## Installing Maven 3.8.7 and Java using OpenJDK 19.0.2:

## Windows:

- Download OpenJDK 19.0.2 from https://jdk.java.net/archive/ using the Windows ZIP archive.
- Extract the ZIP archive to a directory of your choice. For example, you can extract it to "C:\Program Files\Java\jdk-19.0.2".
- Set the JAVA_HOME environment variable to the installation directory of the JDK. To do this, open the Control Panel and go to System and Security -> System -> Advanced system settings -> Environment Variables. Under System Variables, click New and set the following values:

```
 Variable name: JAVA_HOME
 Variable value: C:\Program Files\Java\jdk-19.0.2
```

- Download Maven 3.8.7 from https://maven.apache.org/download.cgi.
- Extract the ZIP archive to a directory of your choice. For example, you can extract it to "C:\Program Files\Maven\apache-maven-3.8.7".
- Set the MAVEN_HOME environment variable to the installation directory of Maven. To do this, go to Environment Variables again and set the following values:

```
Variable name: MAVEN_HOME
Variable value: C:\Program Files\Maven\apache-maven-3.8.7
```

- Add the bin directories of both Java and Maven to the PATH environment variable. To do this, edit the PATH variable under System Variables and add the following values:

```
%JAVA_HOME%\bin;%MAVEN_HOME%\bin;
```

- Open a new command prompt and verify that both Java and Maven are installed correctly by running the following commands:

```shell
java --version
mvn --version
```

## MacOS:

- Download OpenJDK 19.0.2 from https://jdk.java.net/archive/ using the macOS DMG image.
- Double-click the DMG image to mount it.
- Double-click the PKG file to start the installation process.
- Follow the instructions in the installer to install OpenJDK. By default, it will be installed to /Library/Java/JavaVirtualMachines/jdk-19.0.2.jdk/Contents/Home/.
- Set the JAVA_HOME environment variable to the installation directory of the JDK. To do this, open Terminal and run the following command:

```shell
echo "export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-19.0.2.jdk/Contents/Home/" >> ~/.bash_profile
```

- Download Maven 3.8.7 from https://maven.apache.org/download.cgi.
- Extract the ZIP archive to a directory of your choice. For example, you can extract it to "/usr/local/apache-maven-3.8.7".
- Set the MAVEN_HOME environment variable to the installation directory of Maven. To do this, open Terminal and run the following command:

```shell
echo "export MAVEN_HOME=/usr/local/apache-maven-3.8.7" >> ~/.bash_profile
```

- Add the bin directories of both Java and Maven to the PATH environment variable. To do this, edit the ~/.bash_profile file and add the following values:

```
export PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH
```

- Save and close the file.
- Refresh the Terminal session by running the following command:

```
source ~/.bash_profile
```

- Verify that both Java and Maven are installed correctly by running the following commands:

```
java --version
mvn -version
```

## Running the application locally

Clone the project into your local machine.
Check out to \***\*\_\_\_\*\*** branch
Run the following command at the location where the pom.xml file is present that is (group01/Backend/)

```shell
mvn clean install compile
```

Then execute the following command to run the services

```shell
mvn spring-boot:run
```

You will be able to notice that the application has started to run on port 8085
To test if the services are up and running, click on the following link:
[Test Service](http://localhost:8085/user/message)

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

### Coverage Information

[![Code Coverage](https://i.postimg.cc/pr8vL7fK/Whats-App-Image-2023-04-09-at-10-45-09-PM.jpg)](https://postimg.cc/T5RFktHP)

### Unit Test Cases

[![Unit Test Cases](https://i.postimg.cc/httYC6XM/Whats-App-Image-2023-04-09-at-10-45-25-PM.jpg)](https://postimg.cc/Cz9J5vHf)

### Integration Test Suite

[![Integration Test Suite](https://i.postimg.cc/gJFNPT2C/Whats-App-Image-2023-04-09-at-11-15-05-PM.jpg)](https://postimg.cc/Ty0rVQm0)

### Development Team

- Group 1

### Contributors

- [Jeet Mehta](mailto:jt429386@dal.ca) Banner Id: B00945900
- [Sankeerth Rani](mailto:sn501304@dal.ca) Banner Id: B00932027
- [Dhruvin Dankhara](mailto:dh793203@dal.ca) Banner Id: B00926164
- [Parshva Shah](mailto:pr371441@dal.ca) Banner Id: B00928689
- [Lokeshwar Tabjula](mailto:lk544219@dal.ca) Banner Id: B00936909

### TA

- [Anirudh Hosur](mailto:an516658@dal.ca)
