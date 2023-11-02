# ebidir_frontend

This Conatins React-router-dom latest

```
ebidir_frontend
├─ package-lock.json
├─ package.json
├─ public
│  ├─ Abay.png
│  ├─ Abyssinia.jpg
│  ├─ Abyssinia1.jpg
│  ├─ Addis.png
│  ├─ Ahadu.png
│  ├─ amara1.jpg
│  ├─ AndroidRobot.jpg
│  ├─ atm1.jpg
│  ├─ atm1.png
│  ├─ Autumn.jpg
│  ├─ Awash_Bank_Final_logo1.jpg
│  ├─ Birhan.png
│  ├─ Buna.png
│  ├─ CBE.jpg
│  ├─ COOP.jpg
│  ├─ Dashen.png
│  ├─ Debube.jpg
│  ├─ Development.jpg
│  ├─ Enat.jpg
│  ├─ Financial Report on Blockchain Isometric 6 - FV - Illustration.jpg
│  ├─ GohBetoch.jpg
│  ├─ Hibret.jpg
│  ├─ Hijira.jpg
│  ├─ index.html
│  ├─ Lion.jpg
│  ├─ logo.png
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  ├─ National.jpg
│  ├─ nib.jpg
│  ├─ og1.jpg
│  ├─ OldBldg.jpg
│  ├─ OldRecord.jpg
│  ├─ Oromia.jpg
│  ├─ robots.txt
│  ├─ Shabelle.jpg
│  ├─ Sinquee.jpg
│  ├─ tim-cook.jpg
│  ├─ transparent.png
│  ├─ Tseday.jpg
│  ├─ Tsehay.jpg
│  ├─ Wegagen.jpg
│  ├─ white.png
│  ├─ WinterLake.jpg
│  ├─ ZamZam.jpg
│  └─ Zemen.jpg
├─ README.md
└─ src
   ├─ Actions
   │  ├─ BuildingAction.js
   │  ├─ CarAction.js
   │  ├─ EconomicAction.js
   │  ├─ LoanAction.js
   │  ├─ SystemAction.js
   │  └─ UserAction.js
   ├─ app
   │  ├─ App.css
   │  ├─ App.css.map
   │  ├─ App.scss
   │  ├─ components
   │  │  ├─ Admin
   │  │  │  ├─ AdminPages
   │  │  │  │  ├─ AdminLoanType.jsx
   │  │  │  │  ├─ AllUsersList.jsx
   │  │  │  │  ├─ AvailableBranches.jsx
   │  │  │  │  ├─ Banks.jsx
   │  │  │  │  ├─ companies.jsx
   │  │  │  │  ├─ DeactivatedUsers.jsx
   │  │  │  │  ├─ generatepdf.css
   │  │  │  │  ├─ logo.jpg
   │  │  │  │  ├─ logo.png
   │  │  │  │  ├─ PdfFunctions.jsx
   │  │  │  │  ├─ PDFGenerator.jsx
   │  │  │  │  └─ PersonalUsers.jsx
   │  │  │  └─ forms
   │  │  │     ├─ Admin.jsx
   │  │  │     ├─ Bank.jsx
   │  │  │     ├─ Company.jsx
   │  │  │     ├─ errorConstants.js
   │  │  │     ├─ forms.css
   │  │  │     ├─ handlelogoChange.jsx
   │  │  │     ├─ handleSacnnerCoponenet.jsx
   │  │  │     └─ Personal.jsx
   │  │  ├─ Bank
   │  │  │  ├─ BankData.jsx
   │  │  │  ├─ Bankinfo.jsx
   │  │  │  ├─ BLoanDetails.jsx
   │  │  │  ├─ Branch.jsx
   │  │  │  ├─ Branchlis.jsx
   │  │  │  ├─ LoanDetails.jsx
   │  │  │  ├─ LoanTypes.jsx
   │  │  │  └─ Modle.module.css
   │  │  ├─ Branch
   │  │  │  └─ BranchLoanTypes.jsx
   │  │  ├─ CodeSegments.js
   │  │  ├─ common
   │  │  │  ├─ BackdropLoader.jsx
   │  │  │  ├─ BranchLoader.jsx
   │  │  │  ├─ loader.css
   │  │  │  ├─ Loader.jsx
   │  │  │  └─ Profile
   │  │  │     ├─ BankProfile
   │  │  │     │  ├─ BankLeft.js
   │  │  │     │  ├─ BankNotification.jsx
   │  │  │     │  ├─ Bank_information.jsx
   │  │  │     │  ├─ Content.jsx
   │  │  │     │  └─ Profile.js
   │  │  │     ├─ CompanyProfile
   │  │  │     │  ├─ CompanyLeft.jsx
   │  │  │     │  ├─ companynotification.jsx
   │  │  │     │  ├─ Company_Additional_Information.jsx
   │  │  │     │  ├─ Company_Information.jsx
   │  │  │     │  ├─ Content.jsx
   │  │  │     │  └─ Profile.js
   │  │  │     ├─ Cover.jsx
   │  │  │     ├─ index.css
   │  │  │     ├─ index.js
   │  │  │     └─ PersonalProfile
   │  │  │        ├─ Actions.jsx
   │  │  │        ├─ Data.jsx
   │  │  │        └─ Profile.js
   │  │  ├─ dashboard
   │  │  │  ├─ AdminDashboard.js
   │  │  │  ├─ BankDashboard.jsx
   │  │  │  ├─ BranchDashboard.jsx
   │  │  │  ├─ dashboard.css
   │  │  │  ├─ dashboardData.js
   │  │  │  └─ UserDashboard.jsx
   │  │  ├─ error-pages
   │  │  │  ├─ Error404.js
   │  │  │  └─ Error500.js
   │  │  ├─ Profile
   │  │  │  ├─ BankProfile
   │  │  │  │  ├─ Actions.jsx
   │  │  │  │  ├─ BankLeft.js
   │  │  │  │  ├─ BankNotification.jsx
   │  │  │  │  ├─ BankProfile.css
   │  │  │  │  ├─ Bank_information.jsx
   │  │  │  │  └─ Profile.js
   │  │  │  ├─ BranchProfile
   │  │  │  │  ├─ Actions.jsx
   │  │  │  │  ├─ BranchProfile.css
   │  │  │  │  ├─ Branch_info.jsx
   │  │  │  │  ├─ Branch_left.jsx
   │  │  │  │  ├─ Branch_Notification.jsx
   │  │  │  │  └─ Profile.jsx
   │  │  │  ├─ CompanyProfile
   │  │  │  │  ├─ Actions.jsx
   │  │  │  │  ├─ CompanyLeft.jsx
   │  │  │  │  ├─ companynotification.jsx
   │  │  │  │  ├─ CompanyProfile.css
   │  │  │  │  ├─ Company_Additional_Information.jsx
   │  │  │  │  ├─ Company_Information.jsx
   │  │  │  │  ├─ Content.jsx
   │  │  │  │  └─ Profile.js
   │  │  │  ├─ Cover.jsx
   │  │  │  ├─ index.css
   │  │  │  ├─ index.js
   │  │  │  └─ PersonalProfile
   │  │  │     ├─ AccountSettings.jsx
   │  │  │     ├─ Actions.jsx
   │  │  │     ├─ CompanySettings.jsx
   │  │  │     ├─ Content.jsx
   │  │  │     ├─ Notifications.jsx
   │  │  │     ├─ Personalprofile.css
   │  │  │     ├─ Profile.js
   │  │  │     └─ Sidebar.jsx
   │  │  ├─ shared
   │  │  │  ├─ AdminSidebar.jsx
   │  │  │  ├─ BankSidebar.jsx
   │  │  │  ├─ CommonSidebar.jsx
   │  │  │  ├─ CompanySideBar.jsx
   │  │  │  ├─ footer.css
   │  │  │  ├─ Footer.js
   │  │  │  ├─ Navbar.css
   │  │  │  ├─ Navbar.js
   │  │  │  ├─ Notification.jsx
   │  │  │  ├─ Sidebar.css
   │  │  │  ├─ Spinner.js
   │  │  │  └─ UserSideBar.jsx
   │  │  └─ User
   │  │     ├─ BEconomic.jsx
   │  │     ├─ BLoan.jsx
   │  │     ├─ Building.jsx
   │  │     ├─ Buton.css
   │  │     ├─ Car.jsx
   │  │     ├─ Economic.jsx
   │  │     ├─ Loan.jsx
   │  │     ├─ model.json
   │  │     ├─ pages
   │  │     │  ├─ BankPage.jsx
   │  │     │  ├─ helpcenter.css
   │  │     │  ├─ HelpCenter.jsx
   │  │     │  ├─ Modal.module.css
   │  │     │  ├─ MyBLoans.jsx
   │  │     │  ├─ MyBLoansDetails.jsx
   │  │     │  ├─ MyCollaterals.jsx
   │  │     │  ├─ MyLoans.jsx
   │  │     │  ├─ MyLoansDetails.jsx
   │  │     │  └─ UserBanks.jsx
   │  │     ├─ PersonalInfo.jsx
   │  │     └─ UserDashboard.jsx
   │  ├─ Dataset
   │  │  ├─ DataCollections.js
   │  │  └─ Functions.js
   │  └─ user-pages
   │     ├─ authenticated_changepassword_form.jsx
   │     ├─ EmailSent.jsx
   │     ├─ Error404.js
   │     ├─ ForgetoldpasswordChangePassword.jsx
   │     ├─ ForgotPassword.jsx
   │     ├─ hidep.svg
   │     ├─ Login.css
   │     ├─ Login.jsx
   │     ├─ NewPassword.jsx
   │     ├─ OTP.css
   │     ├─ OTP.jsx
   │     ├─ ResetPassword.jsx
   │     └─ showp.svg
   ├─ App.js
   ├─ assets
   │  └─ images
   │     ├─ auth
   │     │  ├─ lockscreen-bg.jpg
   │     │  ├─ login-bg.jpg
   │     │  └─ register-bg.jpg
   │     ├─ brand_icons
   │     │  ├─ bitmap.jpg
   │     │  ├─ oval-copy.jpg
   │     │  └─ oval.jpg
   │     ├─ carousel
   │     │  ├─ banner_1.jpg
   │     │  ├─ banner_10.jpg
   │     │  ├─ banner_11.jpg
   │     │  ├─ banner_12.jpg
   │     │  ├─ banner_2.jpg
   │     │  ├─ banner_3.jpg
   │     │  ├─ banner_4.jpg
   │     │  ├─ banner_5.jpg
   │     │  ├─ banner_6.jpg
   │     │  ├─ banner_7.jpg
   │     │  ├─ banner_8.jpg
   │     │  └─ banner_9.jpg
   │     ├─ chat
   │     │  ├─ profile_image.jpg
   │     │  ├─ thumb_image1.jpg
   │     │  ├─ thumb_image2.jpg
   │     │  ├─ thumb_image3.jpg
   │     │  ├─ thumb_image4.jpg
   │     │  ├─ thumb_image5.jpg
   │     │  ├─ thumb_image6.jpg
   │     │  ├─ thumb_image7.jpg
   │     │  └─ thumb_image8.jpg
   │     ├─ dashboard
   │     │  ├─ circle.png
   │     │  ├─ circle.svg
   │     │  ├─ Group126@2x.png
   │     │  ├─ img_1.jpg
   │     │  ├─ img_2.jpg
   │     │  ├─ img_3.jpg
   │     │  ├─ img_4.jpg
   │     │  ├─ Img_5.jpg
   │     │  ├─ img_6.jpg
   │     │  └─ Rectangle.jpg
   │     ├─ e-bidir.svg
   │     ├─ email
   │     │  ├─ fb.png
   │     │  ├─ mail-image.jpg
   │     │  ├─ medium.png
   │     │  ├─ slack.png
   │     │  ├─ twitter.png
   │     │  └─ youtube.png
   │     ├─ faces
   │     │  ├─ face1.jpg
   │     │  ├─ face10.jpg
   │     │  ├─ face11.jpg
   │     │  ├─ face12.jpg
   │     │  ├─ face13.jpg
   │     │  ├─ face14.jpg
   │     │  ├─ face15.jpg
   │     │  ├─ face16.jpg
   │     │  ├─ face17.jpg
   │     │  ├─ face18.jpg
   │     │  ├─ face19.jpg
   │     │  ├─ face2.jpg
   │     │  ├─ face20.jpg
   │     │  ├─ face21.jpg
   │     │  ├─ face22.jpg
   │     │  ├─ face23.jpg
   │     │  ├─ face24.jpg
   │     │  ├─ face25.jpg
   │     │  ├─ face26.jpg
   │     │  ├─ face27.jpg
   │     │  ├─ face3.jpg
   │     │  ├─ face4.jpg
   │     │  ├─ face5.jpg
   │     │  ├─ face6.jpg
   │     │  ├─ face7.jpg
   │     │  ├─ face8.jpg
   │     │  └─ face9.jpg
   │     ├─ faces-clipart
   │     │  ├─ pic-1.png
   │     │  ├─ pic-2.png
   │     │  ├─ pic-3.png
   │     │  └─ pic-4.png
   │     ├─ favicon.png
   │     ├─ logo-mini.svg
   │     ├─ logo.svg
   │     ├─ product_images_2
   │     │  ├─ thumb_image1.jpg
   │     │  ├─ thumb_image10.jpg
   │     │  ├─ thumb_image11.jpg
   │     │  ├─ thumb_image12.jpg
   │     │  ├─ thumb_image2.jpg
   │     │  ├─ thumb_image3.jpg
   │     │  ├─ thumb_image4.jpg
   │     │  ├─ thumb_image5.jpg
   │     │  ├─ thumb_image6.jpg
   │     │  ├─ thumb_image7.jpg
   │     │  ├─ thumb_image8.jpg
   │     │  └─ thumb_image9.jpg
   │     ├─ samples
   │     │  ├─ 1280x768
   │     │  │  ├─ 1.jpg
   │     │  │  ├─ 10.jpg
   │     │  │  ├─ 11.jpg
   │     │  │  ├─ 12.jpg
   │     │  │  ├─ 13.jpg
   │     │  │  ├─ 14.jpg
   │     │  │  ├─ 15.jpg
   │     │  │  ├─ 2.jpg
   │     │  │  ├─ 3.jpg
   │     │  │  ├─ 4.jpg
   │     │  │  ├─ 5.jpg
   │     │  │  ├─ 6.jpg
   │     │  │  ├─ 7.jpg
   │     │  │  ├─ 8.jpg
   │     │  │  └─ 9.jpg
   │     │  ├─ 300x300
   │     │  │  ├─ 1.jpg
   │     │  │  ├─ 10.jpg
   │     │  │  ├─ 11.jpg
   │     │  │  ├─ 12.jpg
   │     │  │  ├─ 13.jpg
   │     │  │  ├─ 14.jpg
   │     │  │  ├─ 15.jpg
   │     │  │  ├─ 2.jpg
   │     │  │  ├─ 3.jpg
   │     │  │  ├─ 4.jpg
   │     │  │  ├─ 5.jpg
   │     │  │  ├─ 6.jpg
   │     │  │  ├─ 7.jpg
   │     │  │  ├─ 8.jpg
   │     │  │  └─ 9.jpg
   │     │  ├─ bootstrap-stack.png
   │     │  ├─ charts.jpg
   │     │  ├─ dashboard.jpg
   │     │  ├─ e-commerce.jpg
   │     │  ├─ editors.jpg
   │     │  ├─ email.jpg
   │     │  ├─ forms.jpg
   │     │  ├─ html5.png
   │     │  ├─ logo.svg
   │     │  ├─ modal.jpg
   │     │  ├─ popup.jpg
   │     │  ├─ weather.svg
   │     │  └─ widgets.jpg
   │     └─ success.png
   ├─ auth
   │  ├─ AuthProvider.js
   │  ├─ Layout.js
   │  ├─ RequireAuth.js
   │  └─ useAuth.js
   ├─ Constants
   │  ├─ BuildingConstants.js
   │  ├─ CarConstants.js
   │  ├─ EconomicConstants.js
   │  ├─ LoanConstants.js
   │  ├─ SystemConstants.js
   │  └─ UserConstants.js
   ├─ index.js
   ├─ Reducers
   │  ├─ BuildingReducer.js
   │  ├─ CarReducer.js
   │  ├─ EconomicReducer.js
   │  ├─ LoanReducer.js
   │  ├─ SystemReducer.js
   │  └─ UserReducer.js
   └─ store.js

```